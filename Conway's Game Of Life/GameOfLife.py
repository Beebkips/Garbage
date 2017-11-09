import pygame, queue, time, random


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

def update(array, w, h, squaresurface, blanksurface, screen, l):
    l2 = []
    tempArray = [[0 for x in range(w)] for y in range(h)]
    print(len(l))
    c = 0

    while(len(l) > 0):
        i, j = l.pop(0)
        counter = array[i][j] * -1
        if array[i][j] == 1:
            c += 1
        for x in range(-1, 2):
            for y in range(-1, 2):
                counter += array[(i + x) % w][(j + y) % h]
                if len(l2) == 0:
                    l2.append(((i + x) % w, (j + y) % h))
                if array[i][j] == 1:
                    sortedInsert(((i + x) % w, (j + y) % h), l2)

        if array[i][j] == 1:
            if counter < 2:
                tempArray[i][j] = 0
                screen.blit(blanksurface, (i * 5, j * 5))
            elif counter > 3:
                tempArray[i][j] = 0
                screen.blit(blanksurface, (i * 5, j * 5))
            else:
                tempArray[i][j] = 1
        else:
            if counter == 3:
                tempArray[i][j] = 1
                screen.blit(squaresurface, (i * 5, j * 5))

    print('c: ' + str(c))
    return tempArray, l2

def main():

    w = 100
    h = 100

    l = []

    cells = [[0 for x in range(w)] for y in range(h)]
    for i in range(w):
        for j in range(h):
            num = random.randrange(2)
            cells[i][j] = num
            if num == 1:
                l.append((i, j))
    l.sort()
    
    pygame.init()

    screenWidth = w * 5    
    screenHeight = h * 5
    screen = pygame.display.set_mode((screenWidth, screenHeight))
    screenrect = screen.get_rect()
    background = pygame.Surface(screen.get_size())
    background.fill((255,255,255))
    background = background.convert()
    screen.blit(background, (0,0))

    squaresurface = pygame.Surface((5, 5))
    squaresurface.fill((0, 0, 0))
    square = squaresurface.get_rect()

    redsurface = pygame.Surface((5, 5))
    redsurface.fill((255, 0, 0))
    red = redsurface.get_rect()

    blanksurface = pygame.Surface((5, 5))
    blanksurface.fill((255, 255, 255))

    run = True
    while run > 0:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                run = False
            elif event.type == pygame.KEYDOWN:
                if event.key == pygame.K_ESCAPE:
                    run = False
        cells, l = update(cells, w, h, squaresurface, blanksurface, screen, l)
        pygame.display.flip()
    pygame.quit()

if __name__ == '__main__':
    main()