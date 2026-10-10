# Project 2: Browser History

**Concepts:** stacks · **Topics:** 7 · **Time:** 1–2 hours

Build the back/forward buttons of a web browser, then "reopen closed tab".

## Requirements

`BrowserHistory(homepage)` with:

| Method | Behaviour |
|---|---|
| `current()` | The page being shown. |
| `visit(url)` | Go to a new page. This **clears** the forward history. |
| `back(steps)` | Go back up to `steps` pages (stop at the first page). Return the current page. |
| `forward(steps)` | Go forward up to `steps` pages. Return the current page. |
| `can_back()` / `can_forward()` | Whether the buttons are enabled. |
| `history(limit)` | The last `limit` pages visited by `visit` (most recent first), including revisits, ignoring back/forward. |

`Tabs()` with:

| Method | Behaviour |
|---|---|
| `open(url)` | Open a tab, return its integer id (0, 1, 2, …). |
| `close(tab_id)` | Close a tab. Closing an unknown or closed tab returns `False`. |
| `reopen()` | Reopen the most recently closed tab (with its old id); return its url, or `None`. |
| `open_tabs()` | Urls of open tabs in order of id. |

## Milestones

1. `visit`, `current`, `back`, `forward` (`TestMilestone1`).
2. `can_back`, `can_forward`, `history` (`TestMilestone2`).
3. `Tabs` with reopen (`TestMilestone3`).

## Think about it

- Two stacks (back and forward) make every operation O(steps). Why does `visit` clear the forward stack?
- "Most recently closed" is last-in, first-out. Which structure is that?

## Extensions

- Limit the back history to 50 pages with a `deque(maxlen=50)`.
- Make `history` O(limit) even after millions of visits.
