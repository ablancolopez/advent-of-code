#!/usr/bin/env python3

with open("inputs/06.txt") as f:
    line = f.readline()


class Lanternfish:
    def __init__(self, timer):
        self.timer = timer

    def gives_birth(self):
        return self.timer == 0

    def decrease(self):
        if self.timer == 0:
            self.timer = 6
        else:
            self.timer -= 1

    def newborn(self):
        return Lanternfish(8)


numbers = [int(number) for number in line.split(",")]
fishes = [Lanternfish(number) for number in numbers]

for day in range(80):
    newborns = [fish.newborn() for fish in fishes if fish.gives_birth()]
    for fish in fishes:
        fish.decrease()
    fishes += newborns

print(len(fishes))
