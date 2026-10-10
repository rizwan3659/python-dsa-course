"""Reference solution · build-hashmap · Build a HashMap

Complexity: O(1) average per operation

Approach: Array of buckets; each bucket is a short list scanned linearly.
Resizing keeps chains short.
"""


class MyHashMap:
    def __init__(self):
        self.buckets = [[] for _ in range(8)]
        self.size = 0

    def _bucket(self, key):
        return self.buckets[hash(key) % len(self.buckets)]

    def put(self, key, value):
        bucket = self._bucket(key)
        for pair in bucket:
            if pair[0] == key:          # existing key: overwrite
                pair[1] = value
                return
        bucket.append([key, value])     # new key (maybe a collision: chain it)
        self.size += 1
        if self.size / len(self.buckets) > 0.75:
            self._resize()

    def get(self, key):
        for k, v in self._bucket(key):
            if k == key:
                return v
        return -1

    def remove(self, key):
        bucket = self._bucket(key)
        for i, (k, v) in enumerate(bucket):
            if k == key:
                bucket.pop(i)
                self.size -= 1
                return

    def _resize(self):
        old = self.buckets
        self.buckets = [[] for _ in range(len(old) * 2)]
        for bucket in old:
            for k, v in bucket:
                self._bucket(k).append([k, v])
