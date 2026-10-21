import json, random
from fractions import Fraction

def dec2(n):  # n in hundredths
    if n < 0: return "-" + dec2(-n)
    w, f = divmod(n, 100)
    s = str(w); fs = str(f).zfill(2).rstrip("0")
    return s + "." + fs if fs else s

def length(d, g):
    l100 = Fraction(2*g + 3*d + 1, 2)  # half-up to hundredths
    l100 = l100.numerator // l100.denominator
    return (f"The cut length for a grip of {dec2(g)} mm and rivets of {dec2(d)} mm comes to {dec2(l100)} mm "
            f"by the grip-plus-one-and-a-half-diameters rule.")
def count(s, m, p):
    usable = s - 2*m
    n = usable // p + 1
    return (f"The seam of {dec2(s)} mm with margins of {dec2(m)} mm at a pitch of {dec2(p)} mm takes {n} rivets.")
def edge(d):
    return (f"The rivet of {dec2(d)} mm asks for an edge distance of {dec2(2*d)} mm and a pitch of {dec2(3*d)} mm "
            f"by the two-diameter and three-diameter rules.")
def hole(d, c):
    return f"The hole for a rivet of {dec2(d)} mm with a clearance of {dec2(c)} mm comes to {dec2(d+c)} mm."

random.seed(739)
cases = [
  dict(fn="length", args=["4","6"], expect=length(400,600)),
  dict(fn="count", args=["300","10","20"], expect=count(30000,1000,2000)),
  dict(fn="edge", args=["4"], expect=edge(400)),
  dict(fn="hole", args=["4","0.1"], expect=hole(400,10)),
]
for _ in range(25):
    d = random.randint(1,10000); g = random.randint(1,100000)
    cases.append(dict(fn="length", args=[dec2(d),dec2(g)], expect=length(d,g)))
for _ in range(25):
    m = random.randint(1,100000); p = random.randint(1,100000)
    usable = random.randint(p, 2*p + 200000)
    s = usable + 2*m
    if s > 1000000: s = 1000000; usable = s - 2*m
    if usable < p: continue
    cases.append(dict(fn="count", args=[dec2(s),dec2(m),dec2(p)], expect=count(s,m,p)))
for _ in range(20):
    d = random.randint(1,10000)
    cases.append(dict(fn="edge", args=[dec2(d)], expect=edge(d)))
for _ in range(20):
    d = random.randint(1,10000); c = random.randint(0,1000)
    cases.append(dict(fn="hole", args=[dec2(d),dec2(c)], expect=hole(d,c)))
errcases = [
  ["length", ["0","6"]], ["length", ["4","0"]], ["length", ["100.01","6"]], ["length", ["abc","6"]],
  ["count", ["300","150","20"]], ["count", ["300","10","300"]], ["count", ["0","10","20"]], ["count", ["300","10","0"]],
  ["edge", ["0"]], ["edge", ["100.01"]],
  ["hole", ["4","10.01"]], ["hole", ["0","0.1"]],
]
json.dump(dict(cases=cases, errors=errcases), open("expected.json","w"), indent=1)
print(len(cases), "cases,", len(errcases), "errcases")
