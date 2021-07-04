import math
import numpy as np
import matplotlib.pyplot as plt


def hlike(r):
    return 1.0/(math.sqrt(math.pi)) * math.exp(-r)


def sto(r):
    z = 0.8
    return 1/math.sqrt(math.pi) * math.exp(-z*r)


def gto(r):
    return 1/math.sqrt(math.pi) * math.exp(-r*r)


x = np.linspace(0, 6, 100)
y1 = [hlike(r) for r in x]
y2 = [sto(r) for r in x]
y3 = [gto(r) for r in x]

plt.plot(x, y1, color='black', label='H-like')
plt.plot(x, y2, color='blue', label='STO')
plt.plot(x, y3, color='red', label='GTO')
plt.xlabel('r')
plt.legend()
plt.savefig('orbs.png')
