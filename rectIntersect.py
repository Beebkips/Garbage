import pygame, random, time

def sort(a):
    l = []
    xmin = 300
    xmax = 0
    for i in range(4):
        if a[i][0] > xmax:
            xmax = i
        if a[i][0] < xmin:
            xmin = i

    b = a[xmax]
    l.append(b)
    a.remove(b)

    b = a[xmin]
    l.append(b)
    a.remove(b)

    ymin = 300
    ymax = 0
    for i in range(2):
        if a[i][1] > ymax:
            ymax = i
        if a[i][1] < ymin:
            ymin = i

    b = a[ymax]
    l.append(b)
    a.remove(b)

    b = a[ymin]
    l.append(b)
    a.remove(b)

    # print(xmin, ymin, xmax, ymax)
    return l

def randomPoly():
    pass
def main():

    w = 250
    h = 250

    pygame.init()

    screen = pygame.display.set_mode((w, h))
    screenrect = screen.get_rect()
    background = pygame.Surface(screen.get_size())
    background.fill((255,255,255))
    background = background.convert()
    screen.blit(background, (0,0))

    run = True
    while run:
        for event in pygame.event.get():
            if event.type == pygame.QUIT:
                run = False
            elif event.type == pygame.KEYDOWN:
                if event.key == pygame.K_ESCAPE:
                    run = False
        screen.blit(background, (0,0))
        p1 = []
        p2 = []
        for i in range(4):
            do = True
            while do:
                x = random.randrange(10)
                y = random.randrange(10)
                if (x * 25, y * 25) not in p1:
                    do = False
                    p1.append((x * 25,y * 25))


        for i in range(4):
            do = True
            while do:
                x = random.randrange(10)
                y = random.randrange(10)
                if (x,y) not in p2:
                    do = False
                    p2.append((x * 25,y * 25))

        p1 = sort(p1)
        p2 = sort(p2)
        print(p1, p2)
        pygame.draw.polygon(screen, (0, 0, 255), p1, 1)
        pygame.draw.polygon(screen, (255, 0, 0), p2, 1)
        p3 = p1.extend(p2)
        # p3 = sort(p3)

        pygame.display.flip()
        time.sleep(0.1)
    pygame.quit()

if __name__ == '__main__':
    main()

pygame.draw.polygon()