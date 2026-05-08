#!/usr/bin/env python3

with open("inputs/08.txt") as f:
    lines = f.readlines()

known_digits = {2: 1, 4: 4, 3: 7, 7: 8}
count = 0

for line in lines:
    inputs = line.split("|")[0].strip().split(" ")
    outputs = line.split("|")[1].strip().split(" ")
    combined = {"".join(sorted(c)) for c in inputs + outputs}
    guess = {}
    for digit in combined:
        try:
            guess[known_digits[len(digit)]] = digit
        except KeyError:
            continue

    top_segment = [c for c in guess[7] if c not in guess[1]][0]
    guess[6] = [digit for digit in combined if len(digit) == 6 and not all(s in digit for s in guess[1])][0]
    top_right_segment = [c for c in guess[1] if c not in guess[6]][0]
    guess[5] = [digit for digit in combined if len(digit) == 5 and top_right_segment not in digit][0]
    bottom_left_segment = [c for c in guess[6] if c not in guess[5]][0]
    guess[2] = [digit for digit in combined if len(digit) == 5 and bottom_left_segment in digit][0]
    guess[9] = [digit for digit in combined if len(digit) == 6 and bottom_left_segment not in digit][0]

    # just get the remaining
    guess[3] = [digit for digit in combined if len(digit) == 5 and digit not in guess.values()][0]
    guess[0] = [digit for digit in combined if len(digit) == 6 and digit not in guess.values()][0]

    inverted = {"".join(sorted(v)): str(k) for k, v in guess.items()}
    # sort
    output = [inverted["".join(sorted(digit))] for digit in outputs]
    num_output = int("".join(output))
    count += num_output


print(count)
