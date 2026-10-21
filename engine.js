// Rivet Math engine: cut length, seam count, edge distance and hole size from named shop rules of thumb (grip plus one and a half diameters for length, two diameters for edge distance, three for pitch, diameter plus clearance for the hole). Exact integers (hundredths of a mm), BigInt for the large cross-products, half-up on display only. The rules are named rules of thumb, not engineering verdicts; every number is the owner's own entry.
function _p(t, err, intDigits, places, lo, hi) {
  t = typeof t === "string" ? t.trim() : "";
  var m = new RegExp("^([0-9]{1," + intDigits + "})(?:\\.([0-9]{1," + places + "}))?$").exec(t);
  if (!m) throw new Error(err);
  var v = parseInt(m[1], 10) * Math.pow(10, places) + (m[2] ? parseInt(m[2].padEnd(places, "0"), 10) : 0);
  if (v < lo || v > hi) throw new Error(err);
  return v;
}
var _D = "the diameter must be from 0.01 to 100 mm with at most two decimal places";
var _G = "the grip must be from 0.01 to 1000 mm with at most two decimal places";
var _S = "the seam must be from 0.01 to 10000 mm with at most two decimal places";
var _M = "the margin must be from 0.01 to 1000 mm with at most two decimal places";
var _P = "the pitch must be from 0.01 to 1000 mm with at most two decimal places";
var _C = "the clearance must be from 0 to 10 mm with at most two decimal places";
var _SEAM = "the seam must be longer than twice the margin";
var _SPAN = "the pitch must be no longer than the seam between the margins";
function _dec(v, places) {
  if (v < 0) return "-" + _dec(-v, places);
  var base = Math.pow(10, places);
  var s = String(Math.floor(v / base)), f = String(v % base).padStart(places, "0").replace(/0+$/, "");
  return f ? s + "." + f : s;
}
function _dia(t) { return _p(t, _D, 3, 2, 1, 10000); }
function _grip(t) { return _p(t, _G, 4, 2, 1, 100000); }
function _seam(t) { return _p(t, _S, 5, 2, 1, 1000000); }
function _margin(t) { return _p(t, _M, 4, 2, 1, 100000); }
function _pitch(t) { return _p(t, _P, 4, 2, 1, 100000); }
function _clear(t) { return _p(t, _C, 2, 2, 0, 1000); }

function lengthTruth(dia, grip) {
  var d = _dia(dia), g = _grip(grip);
  var len200 = 2 * g + 3 * d; // hundredths * 2: grip + 1.5d
  var len100 = Math.floor((len200 + 1) / 2); // half-up to hundredths
  return "The cut length for a grip of " + _dec(g, 2) + " mm and rivets of " + _dec(d, 2) + " mm comes to " + _dec(len100, 2) + " mm by the grip-plus-one-and-a-half-diameters rule.";
}
function countTruth(seam, margin, pitch) {
  var s = _seam(seam), m = _margin(margin), p = _pitch(pitch);
  var usable = s - 2 * m;
  if (usable <= 0) throw new Error(_SEAM);
  if (p > usable) throw new Error(_SPAN);
  var n = Math.floor(usable / p) + 1;
  return "The seam of " + _dec(s, 2) + " mm with margins of " + _dec(m, 2) + " mm at a pitch of " + _dec(p, 2) + " mm takes " + n + " rivets.";
}
function edgeTruth(dia) {
  var d = _dia(dia);
  return "The rivet of " + _dec(d, 2) + " mm asks for an edge distance of " + _dec(2 * d, 2) + " mm and a pitch of " + _dec(3 * d, 2) + " mm by the two-diameter and three-diameter rules.";
}
function holeTruth(dia, clear) {
  var d = _dia(dia), c = _clear(clear);
  return "The hole for a rivet of " + _dec(d, 2) + " mm with a clearance of " + _dec(c, 2) + " mm comes to " + _dec(d + c, 2) + " mm.";
}
