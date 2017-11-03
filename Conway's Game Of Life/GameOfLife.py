import pygame, queue, time, random


def sortedInsert(t, array):
    return sortedInsertR(t, array, 0, len(array))

def sortedInsertR(t, array, l, h):
    m = (int)((h + l) / 2)
    # print(l, m, h)
    if h < l:
        array.insert(l, t)
        # print(l, m, h)
        # print(' >> INSERTING: ' + str(t) + ' AT: ' + str(m))
        # print('IN: ' + str(array))
        return -1
    elif len(array) == m:
        array.insert(len(array) - 1, t)
    elif t == array[m]:
        return -1
    elif t < array[m]:
        return sortedInsertR(t, array, l, m - 1)
    else:
        return sortedInsertR(t, array, m + 1, h)

def update(array, w, h, squaresurface, blanksurface, screen):
    tempArray = [[0 for x in range(w)] for y in range(h)]
    for i in range(w):
        for j in range(h):
            counter = array[i][j] * -1
            for x in range(-1, 2):
                for y in range(-1, 2):
                    counter += array[(i + x) % w][(j + y) % h]
            if array[i][j] == 1:
                if counter < 2:
                    tempArray[i][j] = 0
                    screen.blit(blanksurface, (i * 5, j * 5))
                elif counter > 3:
                    tempArray[i][j] = 0
                    screen.blit(blanksurface, (i * 5, j * 5))
                else:
                    tempArray[i][j] = 1
                    # screen.blit(squaresurface, (i * 5, j * 5))
            else:
                if counter == 3:
                    tempArray[i][j] = 1
                    screen.blit(squaresurface, (i * 5, j * 5))

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
                # if array[i][j] == 1 and ((i + x) % w, (j + y) % h) not in l2:
                if len(l2) == 0:
                    l2.append(((i + x) % w, (j + y) % h))
                # elif array[i][j] == 1 and binSearch(((i + x) % w, (j + y) % h), l2) == -1:
                #     l2.append(((i + x) % w, (j + y) % h))
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
                # screen.blit(squaresurface, (i * 5, j * 5))
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
    # print(l)

    # cells[0][0] = 1
    # cells[1][0] = 1
    # cells[0][1] = 1
    # cells[1][1] = 1
    # l.append((0,0))
    # l.append((0,1))
    # l.append((1,0))
    # l.append((1,1))
    
    pygame.init()

    screenWidth = w * 5    
    screenHeight = h * 5
    # print(aniDotWidth, aniDotHeight)
    screen = pygame.display.set_mode((screenWidth, screenHeight))
    screenrect = screen.get_rect()
    background = pygame.Surface(screen.get_size())
    background.fill((255,255,255))
    background = background.convert()
    screen.blit(background, (0,0))

    squaresurface = pygame.Surface((5, 5))
    squaresurface.fill((0, 0, 0))
    square = squaresurface.get_rect()

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
        # draw(cells, w, h)
        # cells = update(cells, w, h, squaresurface, blanksurface, screen)
        cells, l = update(cells, w, h, squaresurface, blanksurface, screen, l)
        # l.sort()
        pygame.display.flip()
        # time.sleep(0.1)

    pygame.quit()

# def main():
#     a = [0 for i in range(100)]
#     for i in range(100):
#         a[i] = random.randrange(1000)
#     a.sort()
#     print(a)
#     for num in a:
#         print('NUM: ' + str(num) + ' IS AT: ' + str(binSearch(num, a)))

# def draw(array, w, h):
#     for i in range(w):
#         for j in range(h):
#             print(array[i][j], end='')
#         print()
#     print()

if __name__ == '__main__':
    main()