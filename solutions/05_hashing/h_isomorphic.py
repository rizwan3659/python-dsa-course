"""Reference solution · h-isomorphic · Isomorphic Strings

Complexity: O(n) time

Approach: Two dicts (s→t and t→s).
"""


def is_isomorphic(s, t):
    if len(s) != len(t):
        return False
    st, ts = {}, {}
    for a, b in zip(s, t):
        if st.setdefault(a, b) != b or ts.setdefault(b, a) != a:
            return False
    return True
