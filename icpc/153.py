import math

def permNum(s):
    if len(s) == 0:
        return 1
    else:
        ss = sorted(s)
        count_dic = {}
        for i in ss[1:]:
            if i not in count_dic:
                count_dic[i] = 0
            count_dic[i] += 1
        
        prod = 1
        for i in count_dic:
            prod *= count_dic[i]

        indexOfFirst = ss.index(s[0])
        permutations = math.factorial(len(s)) / (prod * indexOfFirst)
        return (permutations/len(s) * indexOfFirst) + permNum(s[1:])

print(permNum('bacaa'))
