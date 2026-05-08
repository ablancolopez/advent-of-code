#!/usr/bin/env python3

with open("inputs/10.txt") as f:
    lines = [line.strip() for line in f.readlines()]

expected = {
    "(":")",
    "[": "]",
    "{": "}",
    "<": ">"
}

points = {
    ")": 3,
    "]": 57,
    "}": 1197,
    ">": 25137
}

answer = 0

for line in lines:
    stack = []
    for c in line:
        if c in "([{<":
            stack.append(c)
        else:
            e = expected[stack.pop()]
            if c != e:
                answer += points[c]

print(answer)
