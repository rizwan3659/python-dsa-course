# Project 4: Contact Search with a Trie

**Concepts:** tries, DFS, dictionaries · **Topics:** 16 · **Time:** 2 hours

A phone's contact list must show matches while you type. Store names in a trie so every keystroke is fast.

## Requirements

`ContactBook()` with (names are case-insensitive: store and compare them in lower case):

| Method | Behaviour |
|---|---|
| `add(name, phone)` | Add or update a contact. |
| `phone(name)` | The number, or `None`. |
| `count_prefix(prefix)` | How many contacts start with `prefix` (O(len(prefix)) once built). |
| `search(prefix, limit=None)` | Matching names in alphabetical order, at most `limit` of them. |
| `delete(name)` | Remove a contact; `True` if it existed. Counts must stay correct. |
| `search_number(digits)` | Names whose phone number **contains** `digits`, alphabetical (a second index). |

## Milestones

1. `add`, `phone`, `count_prefix` (`TestMilestone1`).
2. `search` with alphabetical order and `limit` (`TestMilestone2`).
3. `delete` and `search_number` (`TestMilestone3`).

## Think about it

- Store a counter in every node: how many names pass through it. Then `count_prefix` never has to walk the subtree.
- Visiting children in sorted order during DFS gives alphabetical results for free. Stop as soon as you have `limit` names.

## Extensions

- Rank suggestions by how often each contact is called.
- Allow one typo in the prefix (search neighbouring branches with a "mistakes left" counter).
