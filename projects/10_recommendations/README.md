# Project 10: Simple Recommendation Engine

**Concepts:** graphs, BFS, counting with dictionaries · **Topics:** 6, 17 · **Time:** 2–3 hours

A small social app wants "people you may know" and "you might like" features. Users are nodes; friendships are undirected edges; users also like items.

## Requirements

`SocialGraph()` with:

| Method | Behaviour |
|---|---|
| `add_friendship(a, b)` | Undirected friendship (ignore `a == b` and duplicates). |
| `like(user, item)` | The user likes an item. |
| `friends(user)` | Sorted list of friends. |
| `degrees(a, b)` | Degrees of separation: 0 for the same user, 1 for friends, 2 for friends of friends, …; −1 if not connected. |
| `people_you_may_know(user, k=3)` | Non-friends (not the user) ranked by number of mutual friends, ties alphabetical; only people with ≥ 1 mutual friend. |
| `recommend_items(user, k=3)` | Items the user has not liked, scored by how many of the user's friends like them; ties alphabetical; only scores ≥ 1. |
| `similar_users(user, k=3)` | Other users ranked by Jaccard similarity of liked items (shared / union, highest first, ties alphabetical), only similarity > 0. |

## Milestones

1. Graph building, `friends`, `degrees` (BFS) (`TestMilestone1`).
2. `people_you_may_know` and `recommend_items` (`TestMilestone2`).
3. `similar_users` (`TestMilestone3`).

## Think about it

- Mutual friends of `user` and `x` = friends of `x` that are also friends of `user`. Count them by walking two levels of the graph instead of comparing every pair of users.
- Users who are not in the graph yet should not crash anything.

## Extensions

- Weight item scores by friend similarity.
- Find "communities": connected components after removing weak ties.
