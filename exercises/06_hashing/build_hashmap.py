"""build-hashmap · Build a HashMap
Topic 6: Hash Tables · medium · Design / Build · build

Implement a hash map with separate chaining, without using Python’s dict or
set. Each bucket is a list of `[key, value]` pairs.

Requirements:
- `put(key, value)` inserts or overwrites
- `get(key)` → value, or -1 if missing
- `remove(key)` deletes if present
- Bucket = `hash(key) % len(self.buckets)`
- When `size / len(buckets) > 0.75`, double the buckets and re-insert
  everything
- Do not use dict or set

Examples:
    put, get, overwrite, remove
    2,000 keys: all found, and the table grew
    colliding keys share a bucket safely

Target complexity: O(1) average per operation

Check your work:   python dsa.py test build-hashmap
Stuck?             python dsa.py hint build-hashmap
"""


class MyHashMap:
    def __init__(self):
        self.buckets = [[] for _ in range(8)]
        self.size = 0

    def _bucket(self, key):
        return self.buckets[hash(key) % len(self.buckets)]

    def put(self, key, value):
        pass

    def get(self, key):
        pass

    def remove(self, key):
        pass

    def _resize(self):
        pass
