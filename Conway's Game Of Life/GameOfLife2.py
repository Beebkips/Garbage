import pygame, queue, time, random

def sortedInsert(t, array):
    if len(array) == 0:
        array.append(t)
        return -1
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
        return -1
    elif t[0] == array[m][0]:
        return -1
    elif t[0] < array[m][0]:
        return sortedInsertR(t, array, l, m - 1)
    else:
        return sortedInsertR(t, array, m + 1, h)

def binSearch(t, array):
    if len(array) == 0:
        return 0
    return binSearchR(t, array, 0, len(array))

def binSearchR(t, array, l, h):
    m = (int)((h + l) / 2)
    # print(l, m, h)
    if h < l or len(array) == m:
        return 0
    elif t == array[m][0]:
        return array[m][1]
    elif t < array[m][0]:
        return binSearchR(t, array, l, m - 1)
    else:
        return binSearchR(t, array, m + 1, h)

def update(l, w, h, squaresurface, blanksurface, screen):
    temp = l
    print('>LEN: ' + str(len(l)))
    l2 = []
    c = 0

    while(len(l) > 0):
        ij, a = l.pop(0)
        i, j = ij[0], ij[1]
        # print(i, j, a)
        counter = a * -1
        if a == 1:
            c += 1
        for x in range(-1, 2):
            for y in range(-1, 2):
                r = binSearch(((i + x) % w, (j + y) % h), temp)
                counter += r

        if a == 1:
            if counter < 2 or counter > 3:
                screen.blit(blanksurface, (i * 5, j * 5))
            else:
                sortedInsert(((i, j), 1), l2)
                # for x in range(-1, 2):
                #     for y in range(-1, 2):
                #         sortedInsert((((i + x) % w, (j + y) % h), binSearch(((i + x) % w, (j + y) % h), temp)), l2)
        else:
            if counter == 3:
                sortedInsert(((i, j), 1), l2)
                # for x in range(-1, 2):
                #     for y in range(-1, 2):
                #         sortedInsert((((i + x) % w, (j + y) % h), binSearch(((i + x) % w, (j + y) % h), temp)), l2)
                screen.blit(squaresurface, (i * 5, j * 5))

    print('c: ' + str(c))
    l.extend(l2)
    # return l2

def main():

    w = 100
    h = 100

    l = []

    for i in range(w):
        for j in range(h):
            num = random.randrange(2)
            sortedInsert(((i, j), num), l)
    # print(l)
    
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
    squaresurface.fill((255, 0, 0))
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
        screen.blit(background, (0,0))
        update(l, w, h, squaresurface, blanksurface, screen)
        pygame.display.flip()
        # time.sleep(0.1)

    pygame.quit()

if __name__ == '__main__':
    main()