# Sudoku-Solver

Sudoku is a logic-based puzzle. It is a type of constraint satisfaction problem, where the solver is given a finite number of objects (the numerals 1-9) and a set of conditions stating how the objects must be placed in relation to one another. The puzzle consists of a 9×9 grid further divided into nine 3×3 sub-grids (also called boxes, blocks, regions, or sub-squares).

To play Sudoku, the player only needs to be familiar with the numbers from 1 to 9 and be able to think logically. The goal of this game is clear: to fill and complete the grid using the numbers from 1 to 9. The challenging part lays on the restrictions imposed on the player to be able to fill the grid.

![image](https://user-images.githubusercontent.com/91065041/182871217-b8846687-534f-4326-928d-9a0cd22c5c6b.png)


Rule 1 - Each row must contain the numbers from 1 to 9, without repetitions

Rule 2 - Each column must contain the numbers from 1 to 9, without repetitions

Rule 3 - The digits can only occur once per block (nonet)

Rule 4 - The sum of every single row, column and nonet must equal 45 (1+2+3+4+5+6+7+8+9= 45)



![image](https://user-images.githubusercontent.com/91065041/182871932-47ce8d38-8664-4a58-8ee6-e3e0d9b13464.png)

# Backtracking

Backtracking algorithm is a type of brute force search.

### Process:

- Searches for a blank cell row first, followed by column

- Once found a blank cell, begin testing for digits from 1-9 validity on the cells

- Once a valid number is found, assign the number to the cell and move to the next available cell (Repeat step 1)

- If no valid number is found, perform backtrack. Step back to the previous available cell to continue testing for more possible numbers

- Do this until it reaches the last cell. Then the puzzle will be solved. If no solution is found, return the same board untouched

## A Optimize Code - (C++) [Sudoku Solver.pdf](https://github.com/nikhilkumar99k/Sudoku-Solver/files/9260632/Sudoku.Solver.pdf)








