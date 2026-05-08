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
    "(": 1,
    "[": 2,
    "{": 3,
    "<": 4
}

corrupt_lines = []
for line in lines:
    stack = []
    for c in line:
        if c in "([{<":
            stack.append(c)
        else:
            e = expected[stack.pop()]
            if c != e:
                corrupt_lines.append(line)

scores = []
incomplete_lines = list(set(lines) - set(corrupt_lines))

for line in lines:
    stack = []
    for i, c in enumerate(line, start=1):
        # fill the stack
        if c in "([{<":
            stack.append(c)
        else:
            stack.pop()

        # end of line
        if i == len(line):
            remaining = reversed(stack)
            score = 0
            for r in remaining:
                score = score * 5
                score = score + points[r]
            scores.append(score)

answer = sorted(scores)[len(scores) // 2]
print(answer)
