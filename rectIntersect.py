import pygame, random, time

def intersect(p1, p2):
    return (p1[0] < p2[2] and p1[2] > p2[0] and p1[1] > p2[3] and p1[3] < p2[1])

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

        p1 = []
        p1.append(random.randrange(w//2))
        p1.append(random.randrange(h//2))
        p1.append(random.randrange(p1[0], w))
        p1.append(random.randrange(p1[1], h))

        p2 = []
        p2.append(random.randrange(w//2))
        p2.append(random.randrange(h//2))
        p2.append(random.randrange(p2[0], w))
        p2.append(random.randrange(p2[1], h))

        rect1 = pygame.Surface((p1[2] - p1[0], p1[3] - p1[1]))
        rect1.fill((255, 0, 0))
        rect2 = pygame.Surface((p2[2] - p2[0], p2[3] - p2[1]))
        rect2.fill((0, 0, 255))

        if intersect(p1, p2):
            background.fill((255, 200, 200))
        else:
            background.fill((200, 255, 200))

        screen.blit(background, (0,0))
        screen.blit(rect1, (p1[0], p1[1]))
        screen.blit(rect2, (p2[0], p2[1]))
        pygame.display.flip()
        time.sleep(0.1)
    pygame.quit()

if __name__ == '__main__':
    main()