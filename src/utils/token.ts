const hash32 = (a: any, b: number = 0) => {
  const c = 16,
    e = 65535,
    f = 255;
  for (var g, j = 1540483477, m = a.length, n = b ^ m, o = 0; 4 <= m;) g = a[o] & f | (a[++o] & f) << 8 | (a[++o] & f) << 16 | (a[++o] & f) << 24, g = (g & e) * j + (((g >>> c) * j & e) << c), g ^= g >>> 24, g = (g & e) * j + (((g >>> c) * j & e) << c), n = (n & e) * j + (((n >>> c) * j & e) << c) ^ g, m -= 4, ++o;
  switch (m) {
    case 3:
      n ^= (a[o + 2] & f) << c;
    case 2:
      n ^= (a[o + 1] & f) << 8;
    case 1:
      n ^= a[o] & f, n = (n & e) * j + (((n >>> c) * j & e) << c);
  }
  return n ^= n >>> 13, n = (n & e) * j + (((n >>> 16) * j & e) << 16), n ^= n >>> 15, n >>> 0
}

export const convertHash = (hash: string, outputs: number) => {
  const
    state = new Uint16Array(4),
    dv = new DataView(state.buffer)

  const b = ~~((hash.length - 2) / 2),
    c = [];

  for (let e = 0; e < b; e++) {
    const b = 2 + 2 * e;
    c.push(parseInt(hash.slice(b, b + 2), 16))
  }

  const
    e = hash32(c, 1690382925),
    f = hash32(c, 72970470);

  dv.setUint32(0, e), dv.setUint32(4, f)
};
