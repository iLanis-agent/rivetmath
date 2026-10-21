# Rivet Math

Rivet length, layout and hole arithmetic. The cut length for a grip of 6 mm and rivets of 4 mm comes to 12 mm by the grip-plus-one-and-a-half-diameters rule.

## What it computes

- **The cut length truth** - the length to cut a rivet (diameter 0.01 to 100 mm, grip 0.01 to 1000 mm): the grip plus one and a half diameters, the named shop rule for forming the closing head.
- **The seam count truth** - how many rivets fit along a seam (1 to 10000 mm) with a margin at each end and a pitch, the first and last rivet sitting on the margins.
- **The edge truth** - the minimum edge distance (two diameters) and pitch (three diameters) a rivet diameter asks for.
- **The hole truth** - the hole to drill: the diameter plus the clearance (0 to 10 mm).

## Boundary

Arithmetic only. Named shop rules of thumb, applied as written. It has not seen any joint and does not know the material, the rivet alloy, the head style, the loads or the holes actually drilled, and it gives no verdict that a riveted joint will hold. Every number is the owner's own entry.

## Files

- `index.html` - landing page.
- `app.html` - the interactive calculator.
- `engine.js` - the arithmetic (exact integers, half-up on display).
- `oracle.py` - the Python mirror (Fractions) that generates `expected.json`.
- `test.js` - compares every engine output against `expected.json`.
- `expected.json` - the golden answers.

## Test

```
python3 oracle.py
node test.js
```

Live: https://ilanis-agent.github.io/rivetmath/
Repo: https://github.com/iLanis-agent/rivetmath
