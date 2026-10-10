"""Runs every piece of Python in the course content (called by tools/validate.mjs).

Checks: coding solutions pass their tests (and starters do not), buggy debug code fails while the fix passes,
predicted outputs match real output, dry-run tables match a line trace, completed blanks pass, lesson code runs.
"""
import contextlib
import io
import json
import re
import sys

sys.setrecursionlimit(5000)
data = json.load(open(sys.argv[1], encoding="utf-8"))
PRE = data["preludes"]
ok_count = {"code": 0, "predict": 0, "dryrun": 0, "blanks": 0, "debug": 0, "lesson": 0}


def fail(qid, msg):
    print(f"FAIL {qid}: {msg}")


def warn(qid, msg):
    print(f"WARN {qid}: {msg}")


def norm(s):
    s = str(s).replace("\r", "").strip()
    s = "\n".join(re.sub(r"\s+", " ", line.strip()) for line in s.split("\n"))
    s = s.replace('"', "'")
    return re.sub(r"\s*([,:;\[\](){}=+\-*/<>])\s*", r"\1", s)


def prelude(q):
    p = q.get("prelude") or ""
    return PRE.get(p, p)


def strip_marks(code):
    return re.sub(r"\s*#@\s*$", "", code.strip("\n").rstrip(), flags=re.M)


def same(got, exp, mode):
    if mode == "unordered":
        return sorted(map(repr, got)) == sorted(map(repr, exp))
    if mode == "groups":
        return sorted(sorted(map(repr, g)) for g in got) == sorted(sorted(map(repr, g)) for g in exp)
    if mode == "float":
        return abs(got - exp) < 1e-6
    if mode == "check":
        return bool(exp(got))
    return got == exp


def run_tests(q, code):
    """Returns list of failure strings (empty = all pass)."""
    ns = {"__name__": "__main__"}
    out = io.StringIO()
    try:
        with contextlib.redirect_stdout(out):
            if prelude(q):
                exec(prelude(q), ns)
            exec(code, ns)
            if q.get("post"):
                exec(q["post"], ns)
    except Exception as e:  # noqa: BLE001
        return [f"code raised {type(e).__name__}: {e}"]
    fails = []
    for t in q["tests"]:
        call, expected = t[0], t[1]
        mode = t[2] if len(t) > 2 and t[2] else ""
        try:
            with contextlib.redirect_stdout(out):
                got = eval(call, ns)
                exp = eval(expected, ns)
            if not same(got, exp, mode):
                fails.append(f"{call} -> {got!r}, expected {expected}")
        except Exception as e:  # noqa: BLE001
            fails.append(f"{call} raised {type(e).__name__}: {e}")
    return fails


def run_output(code, pre=""):
    ns = {"__name__": "__main__"}
    out = io.StringIO()
    err = None
    try:
        with contextlib.redirect_stdout(out):
            if pre:
                exec(pre, ns)
            exec(compile(code, "<predict>", "exec"), ns)
    except Exception as e:  # noqa: BLE001
        err = e
    return out.getvalue(), err


def dry_trace(q):
    code = q["code"]
    lines = code.strip("\n").split("\n")
    loop = next((i for i, l in enumerate(lines) if "#@" in l), None)
    if loop is None:
        loop = next((i for i, l in enumerate(lines) if re.match(r"\s*(for|while)\b", l)), None)
    if loop is None:
        return None, "no loop line found"
    target = loop + 1
    src = strip_marks(code)
    snaps, hits = [], [0]

    def snap(frame):
        row = []
        for col in q["cols"]:
            try:
                row.append(repr(eval(col, frame.f_globals, frame.f_locals)))
            except Exception:  # noqa: BLE001
                row.append("?")
        return row

    def tracer(frame, event, arg):
        if frame.f_code.co_filename != "<dry>":
            return None
        if event == "line" and frame.f_lineno == target:
            hits[0] += 1
            if hits[0] > 1:
                snaps.append(snap(frame))
        return tracer

    ns = {"__name__": "__main__"}
    if prelude(q):
        exec(prelude(q), ns)
    out = io.StringIO()
    sys.settrace(tracer)
    try:
        with contextlib.redirect_stdout(out):
            exec(compile(src, "<dry>", "exec"), ns)
    except Exception as e:  # noqa: BLE001
        sys.settrace(None)
        return None, f"raised {e!r}"
    sys.settrace(None)
    return snaps, None


def cell(s):
    return re.sub(r"^'(.*)'$", r"\1", norm(s))


for q in data["questions"]:
    qid, t = q["id"], q["type"]
    try:
        if t == "code":
            f = run_tests(q, q["solution"])
            if f:
                fail(qid, "solution: " + " | ".join(f[:3]))
            else:
                ok_count["code"] += 1
            if q.get("starter") is not None and q.get("kind") != "optimize" and not run_tests(q, q["starter"]):
                warn(qid, "starter code already passes every test")
            if q.get("brute"):
                f = run_tests(q, q["brute"]["code"])
                if f:
                    fail(qid, "brute: " + " | ".join(f[:2]))
        elif t == "predict":
            out, err = run_output(strip_marks(q["code"]), prelude(q))
            exp = q["opts"][q["a"]] if q.get("opts") and isinstance(q["a"], int) else q["a"]
            if err is not None:
                if type(err).__name__ not in str(exp):
                    fail(qid, f"code raised {err!r}; expected {exp!r}")
                else:
                    ok_count["predict"] += 1
            elif norm(out) != norm(exp) and not any(norm(out) == norm(a) for a in q.get("accept", [])):
                fail(qid, f"prints {out.strip()!r}, answer says {exp!r}")
            else:
                ok_count["predict"] += 1
                if q.get("opts"):
                    dup = [o for i, o in enumerate(q["opts"]) if i != q["a"] and norm(o) == norm(out)]
                    if dup:
                        fail(qid, f"another option also matches: {dup}")
        elif t == "dryrun":
            snaps, err = dry_trace(q)
            if err:
                fail(qid, err)
            elif len(snaps) != len(q["rows"]):
                fail(qid, f"trace has {len(snaps)} rows, table has {len(q['rows'])}: {snaps}")
            else:
                bad = [(i, j, snaps[i][j], q["rows"][i][j]) for i in range(len(snaps)) for j in range(len(q["cols"])) if cell(snaps[i][j]) != cell(q["rows"][i][j])]
                if bad:
                    fail(qid, f"cells differ (row, col, real, table): {bad[:4]}")
                else:
                    ok_count["dryrun"] += 1
        elif t == "blanks":
            parts = re.split(r"_{4,}", q["code"])
            filled = parts[0]
            for i, p in enumerate(parts[1:]):
                a = q["blanks"][i]
                filled += (a[0] if isinstance(a, list) else a) + p
            filled = filled.strip("\n")
            if q.get("tests"):
                f = run_tests(q, filled)
                if f:
                    fail(qid, "filled code: " + " | ".join(f[:3]))
                else:
                    ok_count["blanks"] += 1
            elif q.get("out") is not None:
                out, err = run_output(filled, prelude(q))
                if err or norm(out) != norm(q["out"]):
                    fail(qid, f"filled code printed {out!r} err={err!r}")
                else:
                    ok_count["blanks"] += 1
            else:
                compile(filled, qid, "exec")
                ok_count["blanks"] += 1
        elif t == "debug":
            if q.get("tests"):
                if not run_tests(q, q["code"]):
                    fail(qid, "buggy code passes every test (bug not caught)")
                if q.get("fix"):
                    f = run_tests(q, q["fix"])
                    if f:
                        fail(qid, "fix: " + " | ".join(f[:3]))
                    else:
                        ok_count["debug"] += 1
            elif q.get("fix"):
                compile(q["fix"], qid, "exec")
                ok_count["debug"] += 1
        elif q.get("code") and t in ("mcq", "complexity", "choose"):
            compile(strip_marks(q["code"]), qid, "exec")
    except SyntaxError as e:
        fail(qid, f"syntax error: {e}")

for item in data["lessonCode"]:
    code = item["code"].strip("\n")
    try:
        if item.get("compileOnly"):
            compile(code, item["where"], "exec")
        else:
            out, err = run_output(code, PRE.get(item.get("prelude") or "", ""))
            if err is not None:
                fail(item["where"], f"lesson code raised {err!r}")
                continue
        ok_count["lesson"] += 1
    except SyntaxError as e:
        fail(item["where"], f"syntax error: {e}")

print("OK verified in Python: " + ", ".join(f"{k} {v}" for k, v in ok_count.items()))
