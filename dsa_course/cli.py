"""Command line for the local practice track: python dsa.py <command>."""
from __future__ import annotations

import argparse
import sys

from dsa_course.catalog import ROOT, Catalog, Exercise, load_catalog
from dsa_course.progress import Progress
from dsa_course.runner import RunResult, explain, run_file

MARK = {"passed": "✓", "failing": "✗", "started": "~", "new": "·"}
DIFF = {"easy": "🟢", "medium": "🟡", "hard": "🔴"}


def rel(path) -> str:
    return path.relative_to(ROOT).as_posix()


def need(catalog: Catalog, exercise_id: str) -> Exercise:
    ex = catalog.find(exercise_id)
    if ex is None:
        raise SystemExit(f"No exercise '{exercise_id}'. Try: python dsa.py list")
    return ex


def cmd_list(args, catalog: Catalog, progress: Progress) -> None:
    for topic in catalog.topics:
        if args.topic and args.topic not in (topic.id, str(topic.n)):
            continue
        items = [e for e in catalog.in_topic(topic.id) if not args.difficulty or e.difficulty == args.difficulty]
        if not items:
            continue
        done = sum(progress.status(e) == "passed" for e in catalog.in_topic(topic.id))
        print(f"\n{topic.n:>2}. {topic.title}  ({done}/{len(catalog.in_topic(topic.id))} passed)")
        for e in items:
            kind = "" if e.kind == "code" else f"  [{e.kind}]"
            print(f"   {MARK[progress.status(e)]} {DIFF[e.difficulty]} {e.id:<28} {e.title}{kind}")
    print("\n✓ passed  ✗ tried, not passing yet  ~ edited  · not started")


def cmd_show(args, catalog: Catalog, progress: Progress) -> None:
    ex = need(catalog, args.id)
    print(f"{ex.id} · {ex.title}  ({ex.difficulty}, {ex.pattern})\n")
    print(ex.prompt, "\n\nExamples:")
    for t in ex.tests[:ex.visible]:
        print("   ", t.describe())
    print(f"\nYour file: {rel(ex.file)}   Status: {progress.status(ex)}")


def print_result(ex: Exercise, result: RunResult, reveal: bool) -> None:
    explained = set()
    if result.status in ("error", "timeout"):
        err = result.error
        where = f" (line {err['line']})" if err.get("line") else ""
        print(f"✗ Your file could not run: {err['type']}{where}: {err['message']}")
        if result.status == "timeout":
            print("  Hint: look for a loop whose condition never becomes false, or an approach that is far too slow.")
    for t in result.tests:
        if t.ok:
            print(f"  ✓ test {t.number}" + ("  (hidden)" if t.hidden else f": {t.case.describe()}"))
            continue
        if t.hidden and not reveal:
            print(f"  ✗ hidden test {t.number} failed  (python dsa.py test {ex.id} --reveal shows it)")
        else:
            print(f"  ✗ test {t.number}: {t.case.describe()}")
            if t.error:
                where = f" (line {t.error['line']})" if t.error.get("line") else ""
                print(f"      raised {t.error['type']}{where}: {t.error['message']}")
            else:
                print(f"      got {t.got}")
        why = explain(t)
        if why and why not in explained:
            explained.add(why)
            print(f"      → {why}")
    if result.output.strip():
        print("\nYour code printed:\n" + "\n".join("  | " + line for line in result.output.rstrip().splitlines()[:20]))
    ok, total = result.score
    if result.passed:
        print(f"\n✓ All {total} tests passed!")
        if ex.cx:
            print(f"  Now check your complexity against the target: {ex.cx}")
    elif total:
        print(f"\n{ok}/{total} tests passed.  Stuck? python dsa.py hint {ex.id}")


def cmd_test(args, catalog: Catalog, progress: Progress) -> None:
    ex = need(catalog, args.id)
    if not ex.file.exists():
        raise SystemExit(f"{rel(ex.file)} is missing. Restore it with: git checkout -- {rel(ex.file)}")
    print(f"Testing {rel(ex.file)} ...")
    result = run_file(ex)
    print_result(ex, result, args.reveal)
    progress.record_attempt(ex.id, result.passed)
    if not result.passed:
        sys.exit(1)


def cmd_hint(args, catalog: Catalog, progress: Progress) -> None:
    ex = need(catalog, args.id)
    if not ex.hints:
        print("This exercise has no hints. Re-read the examples and try a tiny input by hand.")
        return
    shown = progress.next_hint(ex.id, len(ex.hints))
    for i, hint in enumerate(ex.hints[:shown], 1):
        print(f"Hint {i}/{len(ex.hints)}: {hint}")
    if shown < len(ex.hints):
        print("\nRun the same command again for the next hint.")
    else:
        print(f"\nThat was the last hint. The reference solution: python dsa.py solution {ex.id}")


def cmd_solution(args, catalog: Catalog, progress: Progress) -> None:
    ex = need(catalog, args.id)
    if not args.yes:
        if not sys.stdin.isatty():
            raise SystemExit("Add --yes to show the solution.")
        answer = input("Looking at the solution ends this attempt. Have you tried, and read every hint? Type 'yes': ")
        if answer.strip().lower() != "yes":
            print("Good call. Keep going!")
            return
    progress.mark_solution_viewed(ex.id)
    print(ex.solution_file.read_text(encoding="utf-8"))
    print("Tip: close this, wait a day, and solve it again from a blank file.")


def cmd_progress(args, catalog: Catalog, progress: Progress) -> None:
    rows = progress.topic_summary(catalog)
    total = sum(r["total"] for r in rows)
    passed = sum(r["passed"] for r in rows)
    print(f"Overall: {passed}/{total} exercises passed ({100 * passed // max(total, 1)}%)\n")
    for r in rows:
        pct = 100 * r["passed"] // max(r["total"], 1)
        bar = "█" * (pct // 10) + "░" * (10 - pct // 10)
        print(f"  {r['topic'].n:>2}. {r['topic'].title:<28} {bar} {r['passed']:>3}/{r['total']:<3} {pct:>3}%")
    by_level = {}
    for e in catalog.exercises:
        b = by_level.setdefault(e.difficulty, [0, 0])
        b[1] += 1
        b[0] += progress.status(e) == "passed"
    print("\n  By difficulty: " + "   ".join(f"{DIFF[k]} {k} {by_level[k][0]}/{by_level[k][1]}"
                                          for k in ("easy", "medium", "hard") if k in by_level))
    weak = progress.weak_topics(catalog)
    if weak:
        print("\nRevise these topics (failing, or solved only with the solution/last hints):")
        for r in weak[:3]:
            print(f"  - {r['topic'].title}: {r['failing']} failing, {r['struggled']} struggled")
    cmd_next(args, catalog, progress)


def cmd_next(args, catalog: Catalog, progress: Progress) -> None:
    picks = progress.recommend(catalog)
    if not picks:
        print("\nEverything passed. Time for the Interview page in the browser course!")
        return
    print("\nUp next:")
    for e in picks:
        print(f"  {MARK[progress.status(e)]} {DIFF[e.difficulty]} {e.id:<28} {e.title}   → {rel(e.file)}")


def main(argv: list[str] | None = None) -> None:
    for stream in (sys.stdout, sys.stderr):
        try:
            stream.reconfigure(encoding="utf-8", errors="replace")  # Windows pipes default to cp1252
        except AttributeError:
            pass
    parser = argparse.ArgumentParser(prog="python dsa.py", description="Python DSA Lab: local practice track")
    sub = parser.add_subparsers(dest="command", required=True)
    p = sub.add_parser("list", help="list exercises and your status")
    p.add_argument("topic", nargs="?", help="topic id or number, e.g. arrays or 3")
    p.add_argument("--difficulty", choices=["easy", "medium", "hard"])
    sub.add_parser("show", help="print an exercise").add_argument("id")
    p = sub.add_parser("test", help="run the tests on your exercise file")
    p.add_argument("id")
    p.add_argument("--reveal", action="store_true", help="also show the inputs of hidden tests")
    sub.add_parser("hint", help="reveal the next hint").add_argument("id")
    p = sub.add_parser("solution", help="show the reference solution (after you have tried!)")
    p.add_argument("id")
    p.add_argument("--yes", action="store_true", help="skip the confirmation question")
    sub.add_parser("progress", help="your progress, weak topics and what to do next")
    sub.add_parser("next", help="suggest the next exercises")
    args = parser.parse_args(argv)
    handler = {"list": cmd_list, "show": cmd_show, "test": cmd_test, "hint": cmd_hint,
               "solution": cmd_solution, "progress": cmd_progress, "next": cmd_next}[args.command]
    handler(args, load_catalog(), Progress())
