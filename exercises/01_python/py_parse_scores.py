"""py-parse-scores · Parse Score Lines
Topic 1: Python for DSA · medium · Python basics

The text has one `name:score` per line. Return a dict from name to integer
score. Skip blank or malformed lines (no colon, or a score that is not an
integer). Surrounding spaces should be ignored. If a name appears again,
keep the higher score.

Examples:
    parse_scores("ann:5\\nbob: 7")  ->  {"ann": 5, "bob": 7}
    parse_scores("")  ->  {}
    parse_scores("ann:5\\nbad line\\nbob:x\\n\\ncy:3")  ->  {"ann": 5, "cy": 3}

(2 more hidden tests run when you check your work.)

Constraints:
- 0 ≤ number of lines ≤ 10^4

Target complexity: O(total length of the text)

Check your work:   python dsa.py test py-parse-scores
Stuck?             python dsa.py hint py-parse-scores
"""


def parse_scores(text):
    # your code here
    pass
