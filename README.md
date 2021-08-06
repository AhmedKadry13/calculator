# calculator
The calculator web app is a standard calculator that does basic arithmatic operation

app uses Infix notation: X + Y
Operators are written in-between their operands. This is the usual way of calculations and applying operator precedence

The app uses 2 stacks one for operators and the other for operands

The process is 

1 . Pop-out two values from the operand stack, let’s say it is A and B.
2 . Pop-out operation from operator stack. let’s say it is ‘+’.
3 . Do  A + B and push the result to the operand stack.

The algorithm :

1 . Iterate through given expression, one character at a time
  a . If the character is an operand, push it to the operand stack.
  b . If the character is an operator,
      I . If the operator stack is empty then push it to the operator stack.
      II . Else If the operator stack is not empty,
          1 . If the operator’s precedence is greater than or equal to the precedence of the operators stack peek, 
              then push the character to the operator stack.
          2 . If the character’s precedence is less than the precedence of the operators stack peek, 
               then do Process (as explained above) until character’s precedence is less or stack is not empty.
3 . Do the process until operators stack is empty.
4 . return the peek of the oprands stack as the result 

Note: 
Since subtract has the same precedence as addition, an early minus coud yeild wrong calculations
for example : 2 - 3 * 6 + 5
after calculating 3 * 6 = 18 and pushing value to operands stack after, we push + in operators stack, 
then we push 5. when we do the process we would have 18 + 5 = 23 calculated first, then 2- 23 = -21
which is wrong result.

My solution is replacing ervery "-" in the expresion to " + -1 *"
Applying the solution to the example above we have -18 +5 = -13, then we have 2 + -13 = -11
yeilding the right solution.

        
