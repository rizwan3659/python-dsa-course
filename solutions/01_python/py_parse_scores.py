"""Reference solution · py-parse-scores · Parse Score Lines

Complexity: O(total length of the text)

Approach: splitlines → partition(":") → strip → int in a try → keep the max
per name.

Common mistakes:
- Splitting on every colon (names could be followed by more colons).
- Letting one bad line crash the whole parse.

Follow-up challenge: Also return a list of the line numbers that were
skipped, for error reporting.
"""


def parse_scores(text):
    scores = {}
    for line in text.splitlines():
        if ":" not in line:
            continue
        name, _, raw = line.partition(":")
        name = name.strip()
        try:
            score = int(raw.strip())
        except ValueError:
            continue
        if name and (name not in scores or score > scores[name]):
            scores[name] = score
    return scores
