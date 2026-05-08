#!/usr/bin/env python3

with open("inputs/09.txt") as f:
    lines = f.readlines()

heightmap = [[int(i) for i in line.strip()] for line in lines]


def heightmap_get(x, y):
    if x < 0 or y < 0 or x >= len(heightmap) or y >= len(heightmap[x]):
        return None

    return heightmap[x][y]


def get_adjacents(x, y):
    adjacents = []
    adjacents.append(heightmap_get(x - 1, y))
    adjacents.append(heightmap_get(x + 1, y))
    adjacents.append(heightmap_get(x, y - 1))
    adjacents.append(heightmap_get(x, y + 1))

    return [adj for adj in adjacents if adj is not None]


count = 0

for i in range(0, len(heightmap)):
    for j in range(0, len(heightmap[i])):
        curr = heightmap_get(i, j)
        adj = get_adjacents(i, j)

        if curr < min(adj):
            count += curr + 1

print(count)
