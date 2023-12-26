# Sudoku-Solver
### [Try this](https://nikhilkumar99k.github.io/Sudoku-Solver/)

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

### Solution 1 (Backtraking)

#### Explanation:

- Here for every empty position, we’ll try every char from 1 to 9 & check if the char is valid for that position.

- We’re using the bool function solve, where at any moment we get a possible solution it will return the function without checking the following possible solutions. And if there’s no solution, it’ll simply backtrack & remove the element.

- Before putting any char we’ll check if that is valid for the position using the valid function. There are 3 things to check:

1. Check the row: if(board[i][col] == c) return false;

2. Check the column: if(board[row][i] == c) return false;

3. Check 3*3 matrix: if(board[3*(row/3)+(i/3)][3*(col/3)+(i%3)] == c) return false;


```
#include <iostream>
#include <vector>
#include <map>
using namespace std;
bool isValid(vector<vector<char>> &mat, int r, int c, int x)
{
    for (int i = 0; i < 9; i++)
    {
        if (mat[r][i] == x + '0' || mat[i][c] == x + '0' || mat[3 * (r / 3) + i / 3][3 * (c / 3) + i % 3] == x + '0')
            return false;
    }
    return true;
}
bool solve(vector<vector<char>> &mat)
{
    for (int i = 0; i < 9; i++)
    {
        for (int j = 0; j < 9; j++)
        {
            if (mat[i][j] == '.')
            {
                for (int x = 1; x <= 9; x++)
                {
                    if (isValid(mat, i, j, x))
                    {
                        mat[i][j] = x + '0';
                        if (solve(mat))
                            return true;
                        else
                            mat[i][j] = '.';
                    }
                }
                return false;
            }
        }
    }
    return true;
}
void print(vector<vector<char>> &mat)
{
    cout << endl;
    for (int i = 0; i < 9; i++)
    {
        for (int j = 0; j < 9; j++)
        {
            cout << mat[i][j] << " ";
        }
        cout << endl;
    }
}
int main()
{
    vector<vector<char>> mat = {{'.', '.', '.', '7', '.', '.', '.', '.', '.'},
                                {'1', '.', '.', '.', '.', '.', '.', '.', '.'},
                                {'.', '.', '.', '4', '3', '.', '2', '.', '.'},
                                {'.', '.', '.', '.', '.', '.', '.', '.', '6'},
                                {'.', '.', '.', '5', '.', '9', '.', '.', '.'},
                                {'.', '.', '.', '.', '.', '.', '4', '1', '8'},
                                {'.', '.', '.', '.', '8', '1', '.', '.', '.'},
                                {'.', '.', '2', '.', '.', '.', '.', '5', '.'},
                                {'.', '4', '.', '.', '.', '.', '3', '.', '.'}};
    print(mat);
    solve(mat);
    print(mat);
    return 0;
}
```

### Solution 2 (Backtraking + Maping)

#### Explanation:

- We create 3 hashmap array, each contain 9 hashmap, each hashmap represent does number x appear in this row / column / grid.
- put numbers 1-9 iteratively in empty blocks.
- Then we go through the board, if number didn't appear, add that number into the corresponding hashmap, if appeared, return false.
- And undo the change and do iterative backtracking.

```
#include <iostream>
#include <vector>
#include <map>
using namespace std;

bool found = false;
void helper(int r, int c,
            vector<vector<char>> &mat,
            map<pair<int, int>, map<int, int>> &v,
            vector<map<int, int>> &vx,
            vector<map<int, int>> &vy)
{
    if (r == 9)
    {
        found = true;
        return;
    }
    if (c == 9)
    {
        helper(r + 1, 0, mat, v, vx, vy);
        return;
    }
    if (mat[r][c] != '.')
    {
        helper(r, c + 1, mat, v, vx, vy);
        return;
    }
    int rv = r / 3, cv = c / 3;
    for (int i = 1; i <= 9; i++)
    {
        if (!v[{rv, cv}][i] && !vx[r][i] && !vy[c][i])
        {
            v[{rv, cv}][i] = 1;
            vx[r][i] = 1;
            vy[c][i] = 1;
            mat[r][c] = i + '0';
            helper(r, c + 1, mat, v, vx, vy);
            if (found)
            {
                return;
            }
            v[{rv, cv}][i] = 0;
            vx[r][i] = 0;
            vy[c][i] = 0;
            mat[r][c] = '.';
        }
    }
    return;
}
void solveSudoku(vector<vector<char>> &mat)
{
    map<pair<int, int>, map<int, int>> v;
    vector<map<int, int>> vx(9);
    vector<map<int, int>> vy(9);
    for (int i = 0; i < 9; i++)
    {
        for (int j = 0; j < 9; j++)
        {
            if (mat[i][j] != '.')
            {
                v[{i / 3, j / 3}][mat[i][j] - '0'] = 1;
                vx[i][mat[i][j] - '0'] = 1;
                vy[j][mat[i][j] - '0'] = 1;
            }
        }
    }
    helper(0, 0, mat, v, vx, vy);
    return;
}
void print(vector<vector<char>> &mat)
{
    cout << endl;
    for (int i = 0; i < 9; i++)
    {
        for (int j = 0; j < 9; j++)
        {
            cout << mat[i][j] << " ";
        }
        cout << endl;
    }
}
int main()
{
    vector<vector<char>> mat = {{'.', '1', '6', '.', '3', '7', '4', '.', '.'},
                                {'8', '.', '.', '4', '.', '.', '.', '.', '6'},
                                {'.', '5', '7', '.', '6', '.', '3', '.', '.'},
                                {'5', '.', '.', '.', '.', '.', '9', '.', '4'},
                                {'.', '.', '.', '9', '8', '3', '.', '.', '.'},
                                {'2', '.', '9', '.', '.', '.', '.', '.', '7'},
                                {'.', '.', '1', '.', '9', '.', '6', '2', '.'},
                                {'3', '.', '.', '.', '.', '1', '.', '.', '9'},
                                {'.', '.', '2', '3', '7', '.', '5', '8', '.'}};
    print(mat);
    solveSudoku(mat);
    print(mat);
    return 0;
}

```


