"""s-simplify-path · Simplify Unix Path
Topic 7: Stack · medium · Stack

Simplify an absolute Unix path: `.` is the current folder, `..` goes up,
repeated slashes count as one.

`"/a/./b/../../c/"` → `"/c"`

Examples:
    simplify_path("/home/")  ->  "/home"
    simplify_path("/../")  ->  "/"
    simplify_path("/home//foo/")  ->  "/home/foo"

(1 more hidden test run when you check your work.)

Target complexity: O(n) time

Check your work:   python dsa.py test s-simplify-path
Stuck?             python dsa.py hint s-simplify-path
"""


def simplify_path(path):
    pass
