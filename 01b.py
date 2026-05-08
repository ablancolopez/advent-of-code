#!/usr/bin/env python3

with open("inputs/01.txt") as f:
    lines = f.readlines()

delta = 0
measurements = list(map(int, lines))

for i in range(len(measurements) - 3):
    m0 = measurements[i]
    m1 = measurements[i + 1]
    m2 = measurements[i + 2]
    m3 = measurements[i + 3]
    if m1 + m2 + m3 > m0 + m1 + m2:
        delta += 1

print(delta)
