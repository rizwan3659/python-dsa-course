"""Reference solution · th-time-format · Seconds to H:MM:SS

Complexity: O(1) time, O(1) space

Approach: Decompose: whole hours, then whole minutes of what remains, then
seconds; format with :02d.

Common mistakes:
- Computing minutes as seconds // 60 (that includes the hours).
- Forgetting zero padding: "1:1:1".

Follow-up challenge: Parse the string back: "1:01:01" → 3661.
"""


def format_time(seconds):
    hours = seconds // 3600
    minutes = seconds % 3600 // 60
    secs = seconds % 60
    return f"{hours}:{minutes:02d}:{secs:02d}"
