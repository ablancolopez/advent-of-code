#!/usr/bin/env python3

with open("inputs/08.txt") as f:
    lines = f.readlines()

known_digits = [2, 3, 4, 7]
count = 0

for line in lines:
    outputs = line.split("|")[1].strip().split(" ")
    count += len([output for output in outputs if len(output) in known_digits])

print(count)
