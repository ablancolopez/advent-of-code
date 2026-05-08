#!/usr/bin/env python3

with open("inputs/01.txt") as f:
    lines = f.readlines()

delta = 0
measurements = list(map(int, lines))

for i in range(len(measurements) - 1):
    m0 = measurements[i]
    m1 = measurements[i + 1]
    if m1 > m0:
        delta += 1

print(delta)
