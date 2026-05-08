#!/usr/bin/env python3

with open("inputs/03.txt") as f:
    lines = f.read().split()

from statistics import multimode


def transpose(lines):
    return [list(l) for l in zip(*lines)]


oxygen_rating = lines
for i in range(len(lines[0])):
    m = multimode(transpose(oxygen_rating)[i])
    m = m[0] if len(m) == 1 else "1"  # problem condition
    oxygen_rating = list(filter(lambda l: l[i] == m, oxygen_rating))
    if len(oxygen_rating) == 1:
        break

oxygen_rating = int(oxygen_rating[0], 2)

co2_rating = lines
for i in range(len(lines[0])):
    m = multimode(transpose(co2_rating)[i])
    m = m[0] if len(m) == 1 else "1"  # problem condition
    co2_rating = list(filter(lambda l: l[i] != m, co2_rating))
    if len(co2_rating) == 1:
        break

co2_rating = int(co2_rating[0], 2)

life_rating = oxygen_rating * co2_rating
print(life_rating)
