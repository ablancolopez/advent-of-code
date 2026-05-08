#!/usr/bin/env python3

with open("inputs/02.txt") as f:
    lines = f.readlines()

horizontal, depth, aim = 0, 0, 0
commands = [l.split()[0] for l in lines]
values = [int(l.split()[1]) for l in lines]

for command, value in zip(commands, values):
    if command == "forward":
        horizontal += value
        depth += aim * value
    if command == "up":
        aim -= value
    if command == "down":
        aim += value

print(horizontal * depth)
