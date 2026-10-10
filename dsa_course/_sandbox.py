"""Child process that runs one exercise's tests. Started by runner.py; never imported.

It reads a JSON job on stdin and writes a JSON result on stdout. Running student code here, in a
separate process with a time limit (and a memory limit where the OS supports it), means an infinite
loop or a crash cannot hang or kill the checker. It is a safety net for your own code on your own
machine, not a sandbox for untrusted code.
"""
import contextlib
import io
import json
import sys

MAX_REPR = 300
MAX_OUTPUT = 2000


def limit_memory(megabytes):
    try:
        import resource  # not available on Windows
        limit = megabytes * 1024 * 1024
        resource.setrlimit(resource.RLIMIT_AS, (limit, limit))
    except (ImportError, ValueError, OSError):
        pass


def short_repr(value):
    text = repr(value)
    return text if len(text) <= MAX_REPR else text[:MAX_REPR] + "..."


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


def error_info(exc):
    tb = exc.__traceback__
    line = None
    while tb is not None:  # deepest frame inside the student's file
        if tb.tb_frame.f_code.co_filename == JOB["filename"]:
            line = tb.tb_lineno
        tb = tb.tb_next
    if isinstance(exc, SyntaxError) and exc.filename == JOB["filename"]:
        line = exc.lineno
    return {"type": type(exc).__name__, "message": str(exc), "line": line}


def main():
    result = {"loaded": False, "error": None, "tests": [], "output": ""}
    out = io.StringIO()
    ns = {"__name__": "__exercise__"}
    try:
        with contextlib.redirect_stdout(out):
            if JOB["prelude"]:
                exec(JOB["prelude"], ns)
            exec(compile(JOB["code"], JOB["filename"], "exec"), ns)
            if JOB["post"]:
                exec(JOB["post"], ns)
        result["loaded"] = True
    except BaseException as exc:  # noqa: BLE001 - report everything, including SystemExit
        result["error"] = error_info(exc)
    if result["loaded"]:
        for test in JOB["tests"]:  # one shared namespace, in order, like the browser runner
            row = {"ok": False, "got": None, "error": None}
            try:
                with contextlib.redirect_stdout(out):
                    got = eval(test["call"], ns)
                    exp = eval(test["expected"], ns)
                    row["got"] = short_repr(got)
                    row["ok"] = same(got, exp, test["mode"])
            except BaseException as exc:  # noqa: BLE001
                row["error"] = error_info(exc)
            result["tests"].append(row)
    result["output"] = out.getvalue()[:MAX_OUTPUT]
    sys.stdout.write(json.dumps(result))


if __name__ == "__main__":
    JOB = json.loads(sys.stdin.buffer.read().decode("utf-8"))
    sys.stdout.reconfigure(encoding="utf-8")
    sys.path.insert(0, JOB["root"])  # for `from dsa_course.preludes... import ...`
    sys.setrecursionlimit(5000)
    limit_memory(JOB["memory_mb"])
    main()
