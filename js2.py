def js(a):
    n = len(a)
    j = [0 for i in range(n)]
    r = [0 for i in range(n)]
    j[0] = a[0]
    r[0] = 1
    j[1] = a[0] + a[1]
    r[1] = 2
    j[2] = max(j[1], a[1] + a[2])
    if j[1] > a[1] + a[2]:
        r[2] = 0
    else:
        r[2] = 2
    for i in range(3, n):
        b = j[i - 3] + a[i] + a[i - 1]
        c = j[i - 2] + a[i]
        d = j[i - 1]
        j[i] = max(b, c, d)
        # print(j[i], b, c, d)
        if j[i] == b:
            r[i] = 2
        elif j[i] == c:
            r[i] = 1[]
        else:
            r[i] = 0
    # print(j)
    return j, r

def rec(a):
    s = []
    i = len(a) - 1
    while i > 0:
        if a[i] == 2:
            s.append(i)
            s.append(i - 1)
            i -= 3
        elif a[i] == 1:
            s.append(i)
            i -= 2
        else:
            i -= 1
    return s

a = [5, 9, 12, 7, 5, 13, 7, 5, 4, 9, 8, 7, 5, 8, 4, 3, 5, 10, 4, 6, 8, 12, 5, 6, 3, 7, 16, 2, 2, 16]
j, r = js(a)
print(j, r)
b = rec(r)
print(b)
t = 0
for i in b:
    t += a[i]
print(t)