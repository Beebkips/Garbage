import requests

# with open('dat2.txt') as f:
#     read_data = f.read()

# read_data = read_data.split('\n')
# print(read_data)

# l = []
# for a in read_data:
#     # print(a)
#     l.append(a.split(' (')[1].replace(' ', '').replace(')', '').lower())

# print(l)

# out = []
# for sec in l:
#     call = requests.get('https://www.washington.edu/students/timeschd/T/WIN2018/' + sec + '.html')
#     # print(call.text)
#     call = call.text.split('\n')
#     for w in call:
#         out.append(w)

# out = [a for a in out if 'sdb.admin.washington.edu/timeschd/uwnetid/sln.asp?' in a]
# print(out)

# with open('out.txt', 'a') as f:
#     for a in out:
#         f.write(a)

with open('out.txt') as f:
    read_data = f.read()

read_data = read_data.split('\n')
f = []
for a in read_data:
    temp = a.replace('><A', '<A')
    temp = temp.split(' ')
    temp = temp[temp.index('<A'):]
    temp = [a for a in temp if a != '']
    temp = temp[4:8]
    if temp[0] != 'to':
        f.append(temp)
# print(f)

sched = {}

days = ['M', 'T', 'W', 'Th', 'F']
# times = ['','1100-1220', '130-335','305-510']

# temp = []
# for a in f:
#     temp.append(a[1])
# print(set(temp))

for a in f:
    if a[2] + ' ' + a[3] not in sched:
        sched[a[2] + ' ' + a[3]] = []
    sched[a[2] + ' ' + a[3]].append(a[0] + ' ' + a[1])

# for key in sched.keys():
#     print(key)
#     print('\t', end='')
#     for i in sched[key]:
#         print(i, end=' ')
#     print()

q = True
while q:
    inp = input('Type <Room> <#>, q to quit: ')
    if inp == 'q':
        q = False
    inp = inp.upper()
    if inp in sched.keys():
        print(inp + ' ->')
        for i in sched[inp]:
            print(' - ' + i)