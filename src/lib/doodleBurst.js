const NS = 'http://www.w3.org/2000/svg';

const COLORS = ['#2E7D7D', '#9A4A46', '#3D6E8C', '#B5763A', '#333333'];

const SHAPES = [
  '<path d="M1 7c2.5-5 5.5 5 8 0s5.5-5 8 0"/>',
  '<path d="M9 1v16M2.5 5l13 8M15.5 5l-13 8"/>',
  '<path d="M1 12a8 8 0 0 1 16 0"/>',
  '<circle cx="9" cy="9" r="3.6"/>',
  '<path d="M4 3l5 6-5 6M15 3l-5 6 5 6"/>',
  '<path d="M2 9c0-4.5 5.5-4.5 5.5 0s5.5 4.5 8.5 0"/>',
  '<path d="M9 1.5l2.1 5.4 5.4 2.1-5.4 2.1L9 16.5l-2.1-5.4L1.5 9l5.4-2.1z"/>',
];

const pick = (a) => a[(Math.random() * a.length) | 0];

function spawn(x, y) {
  const svg = document.createElementNS(NS, 'svg');
  const size = 10 + Math.random() * 9;

  svg.setAttribute('viewBox', '0 0 18 18');
  svg.setAttribute('width', size);
  svg.setAttribute('height', size);
  svg.setAttribute('fill', 'none');
  svg.setAttribute('stroke', pick(COLORS));
  svg.setAttribute('stroke-width', '2');
  svg.setAttribute('stroke-linecap', 'round');
  svg.setAttribute('stroke-linejoin', 'round');
  svg.setAttribute('class', 'doodle');
  svg.innerHTML = pick(SHAPES);
  document.body.appendChild(svg);

  const angle = -Math.PI / 2 + (Math.random() - 0.5) * 2.3;
  const speed = 3.4 + Math.random() * 4.6;
  let vx = Math.cos(angle) * speed;
  let vy = Math.sin(angle) * speed;
  let px = x, py = y;
  let rot = Math.random() * 360;
  const vr = (Math.random() - 0.5) * 24;
  let life = 0;
  const MAX = 60 + Math.random() * 26;

  (function step() {
    life += 1;
    vy += 0.23;
    vx *= 0.99;
    vy *= 0.99;
    px += vx;
    py += vy;
    rot += vr;

    const t = life / MAX;
    svg.style.transform =
      `translate(${px - size / 2}px, ${py - size / 2}px) rotate(${rot}deg)`;
    svg.style.opacity = Math.max(0, 1 - t * t);

    if (life < MAX) requestAnimationFrame(step);
    else svg.remove();
  })();
}

export function burst(x, y) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const n = 13 + ((Math.random() * 5) | 0);
  for (let i = 0; i < n; i += 1) spawn(x, y);
}

export function burstFromElement(el) {
  if (!el) return;
  const r = el.getBoundingClientRect();
  burst(r.left + r.width / 2, r.top + r.height / 2);
}

const HEART = '<path d="M9 15.6S2.6 11.3 2.6 7.4A3.7 3.7 0 0 1 9 5.2a3.7 3.7 0 0 1 6.4 2.2c0 3.9-6.4 8.2-6.4 8.2z"/>';
const HEART_COLORS = ['#9A4A46', '#E5989B', '#B5763A'];

function floatHeart(x, y) {
  const NS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(NS, 'svg');
  const size = 12 + Math.random() * 14;
  const color = HEART_COLORS[(Math.random() * HEART_COLORS.length) | 0];
  const filled = Math.random() < 0.45;

  svg.setAttribute('viewBox', '0 0 18 18');
  svg.setAttribute('width', size);
  svg.setAttribute('height', size);
  svg.setAttribute('fill', filled ? color : 'none');
  svg.setAttribute('stroke', color);
  svg.setAttribute('stroke-width', filled ? '1' : '1.6');
  svg.setAttribute('stroke-linejoin', 'round');
  svg.setAttribute('class', 'doodle');
  svg.innerHTML = HEART;
  document.body.appendChild(svg);

  let px = x + (Math.random() - 0.5) * 70;
  let py = y + (Math.random() - 0.5) * 30;
  let vy = -(0.5 + Math.random() * 0.55);
  const sway = 0.35 + Math.random() * 0.6;
  const phase = Math.random() * Math.PI * 2;
  const spin = (Math.random() - 0.5) * 10;
  let rot = (Math.random() - 0.5) * 30;
  let life = 0;
  const MAX = 240 + Math.random() * 90;

  (function step() {
    life += 1;
    vy *= 0.995;
    py += vy;
    px += Math.sin(life / 26 + phase) * sway;
    rot += spin * 0.03;

    const t = life / MAX;
    svg.style.transform =
      `translate(${px - size / 2}px, ${py - size / 2}px) rotate(${rot}deg)`;
    svg.style.opacity = t < 0.15 ? t / 0.15 : Math.max(0, 1 - (t - 0.15) / 0.85);

    if (life < MAX) requestAnimationFrame(step);
    else svg.remove();
  })();
}

export function hearts(x, y, n = 14) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  for (let i = 0; i < n; i += 1) {
    setTimeout(() => floatHeart(x, y), i * 150);
  }
}

export function heartsFromElement(el) {
  if (!el) return;
  const r = el.getBoundingClientRect();
  hearts(r.left + r.width / 2, r.top + r.height * 0.35);
}
