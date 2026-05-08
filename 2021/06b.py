#!/usr/bin/env python3

with open("inputs/06.txt") as f:
    line = f.readline()


def next_day(curr):
    next = [0] * 9

    for i in range(len(curr) - 1):
        next[i] = curr[i + 1]

    next[6] += curr[0]
    next[8] += curr[0]

    return next


fishes = [0] * 9

for number in line.split(","):
    fishes[int(number)] += 1

for day in range(256):
    fishes = next_day(fishes)


print(sum(fishes))
