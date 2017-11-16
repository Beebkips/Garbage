import random

s = ''
for i in range(48, 58, 1):
    s += chr(i)
for i in range(65, 91, 1):
    s += chr(i)

print(s)

id1 = ''
for i in range(9):
    id1 += random.choice(s)

id2 = ''
for i in range(9):
    id2 += random.choice(s)

print (id1, id2)

hashids = ''
for i in range(9):
    h = (s.index(id1[i]) + s.index(id2[i])) % 36
    print(h)
    hashids = hashids + s[h]

print(hashids)