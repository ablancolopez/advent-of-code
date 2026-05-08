#!/usr/bin/env python3

with open("inputs/07.txt") as f:
    line = f.readline()

crabs = [int(i) for i in line.split(",")]

fuel_spent = []
for i in range(min(crabs), max(crabs)):
    movements = [abs(c - i) for c in crabs]
    fuel_spent.append(sum([sum(range(0, i+1)) for i in movements]))

print(min(fuel_spent))
