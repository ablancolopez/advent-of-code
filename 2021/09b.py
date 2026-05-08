#!/usr/bin/env python3

import copy
from functools import reduce

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


low_points = []

for i in range(0, len(heightmap)):
    for j in range(0, len(heightmap[i])):
        curr = heightmap_get(i, j)
        adj = get_adjacents(i, j)

        if curr < min(adj):
            low_points.append([i, j])


basins_size = []
basin_pointer = 0
def explore_basin(heightmap, x, y):
    if x < 0 or y < 0 or x >= len(heightmap) or y >= len(heightmap[x]) or heightmap[x][y] is None or heightmap[x][y] == 9:
        return

    heightmap[x][y] = None
    basins_size[basin_pointer] += 1
    explore_basin(heightmap, x+1, y)
    explore_basin(heightmap, x-1, y)
    explore_basin(heightmap, x, y+1)
    explore_basin(heightmap, x, y-1)


for point in low_points:
    basins_size.append(0)
    explore_basin(copy.deepcopy(heightmap), point[0], point[1])
    basin_pointer += 1

biggest_basins = sorted(basins_size)[-3:]
answer = reduce(lambda x, y: x*y, biggest_basins)
print(answer)
