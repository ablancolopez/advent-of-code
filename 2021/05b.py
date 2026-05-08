#!/usr/bin/env python3

from collections import Counter
from itertools import chain
import re

with open("inputs/05.txt") as f:
    lines = f.readlines()


class Line:
    def __init__(self, line):
        match = re.search(r"(\d+),(\d+) -> (\d+),(\d+)", line)
        self.x1 = int(match.group(1))
        self.y1 = int(match.group(2))
        self.x2 = int(match.group(3))
        self.y2 = int(match.group(4))

    def __repr__(self) -> str:
        return f"{self.x1}, {self.x2} -> {self.y1}, {self.y2}"

    def points(self):
        p = []

        if self.x1 == self.x2:
            for i in range(min([self.y1, self.y2]), max([self.y1, self.y2]) + 1):
                p.append((self.x1, i))

        if self.y1 == self.y2:
            for i in range(min([self.x1, self.x2]), max([self.x1, self.x2]) + 1):
                p.append((i, self.y1))

        if self.x1 != self.x2 and self.y1 != self.y2:
            xd = 1 if self.x2 - self.x1 > 0 else -1
            yd = 1 if self.y2 - self.y1 > 0 else -1

            for x, y in zip(
                range(self.x1, self.x2 + xd, xd), range(self.y1, self.y2 + yd, yd)
            ):
                p.append((x, y))

        return p


points = [Line(line).points() for line in lines]
points = chain.from_iterable(points)
count = Counter(points)
s = sum([1 for c in count.values() if c > 1])
print(s)
