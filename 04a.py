#!/usr/bin/env python3

import numpy as np
from sys import exit

with open("inputs/04.txt") as f:
    lines = f.readlines()


class Bingo:
    def __init__(self, board):
        self.board = np.array(board)
        self.marked = np.zeros((5, 5))

    def mark(self, number):
        self.marked[self.board == number] = 1

    def score(self):
        return np.sum(self.board[self.marked == 0])

    def win(self):
        return self.marked.all(axis=0).any() or self.marked.all(axis=1).any()

    def __repr__(self):
        return np.array_repr(self.board) + "\n" + np.array_repr(self.marked)


sequence = list(map(int, lines[0].split(",")))
bingos = []
bingo = []
for i, line in enumerate(lines):
    if i == 0:
        continue

    line = line.strip().split()
    if not line:
        continue

    bingo.append(list(map(int, line)))
    if len(bingo) == 5:
        bingos.append(Bingo(bingo))
        bingo = []


for number in sequence:
    for bingo in bingos:
        bingo.mark(number)
        if bingo.win():
            print(bingo.score() * number)
            exit(0)
