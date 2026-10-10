"""Reference solution · py-d4 · Nobody is excellent
"""


def label(score):
    if score >= 90:
        return "excellent"
    elif score >= 50:
        return "pass"
    return "fail"
