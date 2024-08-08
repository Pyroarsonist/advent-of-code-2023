const findHailsWithEqualVY = (hails) => {
  const map = {};
  for (const hail of hails) {
    map[hail.dy] ??= [];
    map[hail.dy].push(hail.id);
  }
  for (const foundHails of Object.values(map)) {
    if (foundHails.length === 3) {
      return foundHails.map((id) => hails.find((h) => h.id === id));
    }
  }

  return [];
};
export const getSum = (hails) => {
  const hailsWithEqualVY = findHailsWithEqualVY(hails);
  const { dx: vx0, dz: vz0 } = hailsWithEqualVY[0];
  const { dx: vx1, dy: vy1, dz: vz1 } = hailsWithEqualVY[1];
  const { dx: vx2, dy: vy2, dz: vz2 } = hailsWithEqualVY[2];

  const { x: x0, y: y0, z: z0 } = hailsWithEqualVY[0];
  const { x: x1, y: y1, z: z1 } = hailsWithEqualVY[1];
  const { x: x2, y: y2, z: z2 } = hailsWithEqualVY[2];

  const vxr1 = vx1 - vx0;
  const vzr1 = vz1 - vz0;
  const vxr2 = vx2 - vx0;
  const vzr2 = vz2 - vz0;

  const xr1 = x1 - x0;
  const yr1 = y1 - y0;
  const zr1 = z1 - z0;

  const xr2 = x2 - x0;
  const yr2 = y2 - y0;
  const zr2 = z2 - z0;

  let num =
    yr2 * xr1 * vzr1 - vxr1 * yr2 * zr1 + yr1 * zr2 * vxr1 - yr1 * xr2 * vzr1;
  let den = yr1 * (vzr1 * vxr2 - vxr1 * vzr2);
  const t2 = num / den;

  num = yr1 * xr2 + yr1 * vxr2 * t2 - yr2 * xr1;
  den = yr2 * vxr1;
  const t1 = num / den;

  const cx1 = x1 + t1 * vx1;
  const cy1 = y1 + t1 * vy1;
  const cz1 = z1 + t1 * vz1;

  const cx2 = x2 + t2 * vx2;
  const cy2 = y2 + t2 * vy2;
  const cz2 = z2 + t2 * vz2;

  const xm = (cx2 - cx1) / (t2 - t1);
  const ym = (cy2 - cy1) / (t2 - t1);
  const zm = (cz2 - cz1) / (t2 - t1);

  const xc = cx1 - xm * t1;
  const yc = cy1 - ym * t1;
  const zc = cz1 - zm * t1;

  return Math.trunc(xc + yc + zc);
};
