#!/usr/bin/env python3

with open("inputs/03.txt") as f:
    lines = f.readlines()

from statistics import mode

transpose_lines = [list(l) for l in zip(*lines)]
gamma_rate = "".join(map(mode, transpose_lines))
gamma_rate = int(gamma_rate, 2)
epsilon_rate = ~gamma_rate & 0xFFF  # 0x1F for test

print(gamma_rate * epsilon_rate)
