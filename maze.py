import random, pygame, time
import operator

class n(object):
    def __init__(self, x, y, s):
        self.x = x
        self.y = y
        self.s = s
        self.h = (self.s * 2 - self.x - self.y) * -1
        self.h = self.s
        # self.h = self.x + self.y
        c = int(255 * ((self.y + self.x)/500)) 
        self.color = (255 - c, c, 0)
        # self.color = ((self.s/2) % 255, (255 - self.s/2) % 255, 0)

    def __cmp__(self, other):
        if other.h > self.h:
            return -1
        if other.x > self.x:
            return -1
        if other.y > self.y:
            return -1
        return 1

def sortedInsert(t, array):
    return sortedInsertR(t, array, 0, len(array))

def sortedInsertR(t, array, l, h):
    m = (int)((h + l) / 2)
    if h < l:
        array.insert(l, t)
        return -1
    elif len(array) == m:
        array.insert(len(array) - 1, t)
    elif t == array[m]:
        return -1
    elif t < array[m]:
        return sortedInsertR(t, array, l, m - 1)
    else:
        return sortedInsertR(t, array, m + 1, h)

W = 250
H = 250

w = 2
h = 2

pygame.init()

screenWidth = (W + 1) * w 
screenHeight = (H + 1) * h
screen = pygame.display.set_mode((screenWidth, screenHeight))
screenrect = screen.get_rect()
background = pygame.Surface(screen.get_size())
background.fill((0,0,0))
background = background.convert()
screen.blit(background, (0,0))

wallSurface = pygame.Surface((w, h))
wallSurface.fill((0, 0, 0))
wallD = wallSurface.get_rect()

cellSurface = pygame.Surface((w, h))
cellSurface.fill((255, 255, 255))
cellD = cellSurface.get_rect()

vs = []

def sortedInsert(t, array):
    return sortedInsertR(t, array, 0, len(array))

def sortedInsertR(t, array, l, h):
    m = (int)((h + l) / 2)
    if h < l:
        array.insert(l, t)
    elif len(array) == m:
        array.insert(len(array) - 1, t)
    elif t == array[m]:
        return -1
    elif t < array[m]:
        return sortedInsertR(t, array, l, m - 1)
    else:
        return sortedInsertR(t, array, m + 1, h)

def addWalls(cell, cells, walls):
    if cell[0] - 1 > 0 and cells[cell[0] - 1][cell[1]] == 0 and sortedInsert((cell[0] - 1, cell[1]), vs) != -1:
        walls.append((cell[0] - 1, cell[1]))
    if cell[0] + 1 < W - 1 and cells[cell[0] + 1][cell[1]] == 0 and sortedInsert((cell[0] + 1, cell[1]), vs) != -1:
        walls.append((cell[0] + 1, cell[1]))
    if cell[1] - 1 > 0 and cells[cell[0]][cell[1] - 1] == 0 and sortedInsert((cell[0], cell[1] - 1), vs) != -1:
        walls.append((cell[0], cell[1] - 1))
    if cell[1] + 1 < H - 1 and cells[cell[0]][cell[1] + 1] == 0 and sortedInsert((cell[0], cell[1] + 1), vs) != -1:
        walls.append((cell[0], cell[1] + 1))

def checkWall(wall, cells, walls):
    # print(wall)
    if not (wall[1] - 1 < 1 or wall[1] + 1 > W - 1):
        l = cells[wall[0]][wall[1] - 1]
        r = cells[wall[0]][wall[1] + 1]
        # print(l, r, l != r)
        if (l == 1 or r == 1) and l != r:
            if l == 1:
                cells[wall[0]][wall[1] + 1] = 1
                cells[wall[0]][wall[1]] = 1
                addWalls((wall[0], wall[1] + 1), cells, walls)
                screen.blit(cellSurface, (wall[0] * w, (wall[1] + 1) * h))
                screen.blit(cellSurface, (wall[0] * w, wall[1] * h))
            else:
                cells[wall[0]][wall[1] - 1] = 1
                cells[wall[0]][wall[1]] = 1
                addWalls((wall[0], wall[1] - 1), cells, walls)  
                screen.blit(cellSurface, (wall[0] * w, (wall[1] - 1) * h)) 
                screen.blit(cellSurface, (wall[0] * w, wall[1] * h))

    if not (wall[0] - 1 < 1 or wall[0] + 1 > W - 1):
        u = cells[wall[0] + 1][wall[1]]
        d = cells[wall[0] - 1][wall[1]]
        if (u == 1 or d == 1) and u != d:
            if d == 1:
                cells[wall[0] + 1][wall[1]] = 1
                cells[wall[0]][wall[1]] = 1
                addWalls((wall[0] + 1, wall[1]), cells, walls)
                screen.blit(cellSurface, ((wall[0] + 1) * w, wall[1] * h))
                screen.blit(cellSurface, (wall[0] * w, wall[1] * h))
            else:
                cells[wall[0] - 1][wall[1]] = 1
                cells[wall[0]][wall[1]] = 1
                addWalls((wall[0] - 1, wall[1]), cells, walls)
                screen.blit(cellSurface, ((wall[0] - 1) * w, wall[1] * h))
                screen.blit(cellSurface, (wall[0] * w, wall[1] * h))
    

cells = [[0 for i in range(W)] for i in range(H)]

walls = []

cells[1][1] = 1
addWalls((1,1), cells, walls)
screen.blit(cellSurface, (w,h))

# x = random.randrange(1, 100)
# y = random.randrange(1, 100)
# cells[x][y] = 1
# addWalls((x,y), cells, walls)
# screen.blit(cellSurface, (x * 5, y * 5))


while len(walls) > 0:
    wall = random.choice(walls)
    checkWall(wall, cells, walls)
    walls.remove(wall)
    pygame.display.flip()

with open('out.txt', 'w') as f:
    for i in range(W):
        for j in range(H):
            print(cells[i][j], end='', file=f)  # Python 3.x
        print('', file=f)

mc = pygame.Surface((w,h))
mc.fill((255, 0, 0))

def mazeSolver(maze):
    vs = []
    l = []
    check = True
    l.append(n(1, 1, 0))
    while(len(l) != 0 and check):
        t = []
        cur = l.pop()
        mc.fill(cur.color)
        screen.blit(mc, (cur.x * w, cur.y * h))
        pygame.display.flip()
        # print(cur.x, cur.y, cur.s, cur.h)
        if cur.x == W - 1 and cur.y == H - 1:
            check = False
        if cur.x - 1 > 0 and sortedInsert((cur.x - 1, cur.y), vs) != -1 and maze[cur.x - 1][cur.y] == 1:
            l.append(n(cur.x - 1, cur.y, cur.s + 1))
        if cur.x + 1 < W and sortedInsert((cur.x + 1, cur.y), vs) != -1 and maze[cur.x + 1][cur.y] == 1:
            l.append(n(cur.x + 1, cur.y, cur.s + 1))
        if cur.y - 1 > 0 and sortedInsert((cur.x, cur.y - 1), vs) != -1 and maze[cur.x][cur.y - 1] == 1:
            l.append(n(cur.x, cur.y - 1, cur.s + 1))
        if cur.y + 1 < H and sortedInsert((cur.x, cur.y + 1), vs) != -1 and maze[cur.x][cur.y + 1] == 1:
            l.append(n(cur.x, cur.y + 1, cur.s + 1))
        # for node in t:
        #     if node.h + 10 > cur.h:
        #         l.append(node)
        if len(l) == 0:
            check = False
        l = sorted(l, key = lambda x: (x.h, x.x, x.y), reverse=False)

mazeSolver(cells)

# time.sleep(1)
time.sleep(3)