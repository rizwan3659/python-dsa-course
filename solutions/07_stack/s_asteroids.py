"""Reference solution · s-asteroids · Asteroid Collision

Complexity: O(n) time

Approach: Stack of survivors; resolve collisions against the top.
"""


def asteroid_collision(asteroids):
    stack = []
    for a in asteroids:
        alive = True
        while alive and a < 0 and stack and stack[-1] > 0:
            if stack[-1] < -a:
                stack.pop()             # the right-mover explodes, keep checking
            elif stack[-1] == -a:
                stack.pop()             # both explode
                alive = False
            else:
                alive = False           # the incoming left-mover explodes
        if alive:
            stack.append(a)
    return stack
