import { useEffect, useRef, useState } from 'react';
import { heartsFromElement } from '../lib/doodleBurst';
import { secret } from '../data/content';
import { unlock } from '../lib/secret';

const frames = Object.entries(
  import.meta.glob('../assets/frames/*.png', { eager: true, query: '?url', import: 'default' })
)
  .sort((a, b) => parseInt(a[0].match(/(\d+)\.png$/)[1], 10) - parseInt(b[0].match(/(\d+)\.png$/)[1], 10))
  .map(([, url]) => url);

const SLOW = 90;
const FAST = 30;
const REACH = 560;

const SAYS = [
  'woof',
  '*tail intensifies*',
  'biscuit?',
  'hire him',
  'woof woof',
  'hire him',
  'woof woof woof',
  'happy happy',
  'zzz',
];

export default function Tuppy() {
  const imgRef = useRef(null);
  const boxRef = useRef(null);
  const delayRef = useRef(SLOW);
  const boostUntilRef = useRef(0);
  const [says, setSays] = useState(null);

  const [bubbleText, setBubbleText] = useState('woof');

  useEffect(() => {
    frames.forEach((src) => { const i = new Image(); i.src = src; });
  }, []);

  useEffect(() => {
    const onMove = (e) => {
      const el = boxRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const d = Math.hypot(e.clientX - (r.left + r.width / 2), e.clientY - (r.top + r.height / 2));
      const t = Math.max(0, Math.min(1, 1 - d / REACH));
      delayRef.current = SLOW + (FAST - SLOW) * (t * t);
    };
    window.addEventListener('pointermove', onMove, { passive: true });
    return () => window.removeEventListener('pointermove', onMove);
  }, []);

  useEffect(() => {
    let raf, f = 0, last = 0;
    const tick = (now) => {
      const delay = now < boostUntilRef.current ? FAST : delayRef.current;
      if (now - last >= delay) {
        last = now;
        f = (f + 1) % frames.length;
        if (imgRef.current) imgRef.current.src = frames[f];
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    const len = secret?.len ?? 0;
    if (!len || !secret?.ct) return undefined;
    let buf = '';
    let busy = false;

    const onKey = async (e) => {
      const t = e.target;
      if (t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA' || t.isContentEditable)) return;
      if (e.key.length !== 1) return;

      buf = (buf + e.key).slice(-len);
      if (buf.length < len || busy) return;

      busy = true;
      const msg = await unlock(buf, secret);
      busy = false;
      if (!msg) return;

      buf = '';
      setSays(msg);
      boostUntilRef.current = performance.now() + 5000;
      heartsFromElement(boxRef.current);
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (!says) return undefined;
    setBubbleText(says);
    const t = setTimeout(() => setSays(null), SAYS.includes(says) ? 1600 : 5000);
    return () => clearTimeout(t);
  }, [says]);

  return (
    <>
      <div className={`bubble${says ? ' show' : ''}`}>{bubbleText}</div>
      <div
        className="tuppy"
        ref={boxRef}
        role="img"
        aria-label="Tuppy, a hand-drawn dog, lying down"
        onClick={() => setSays(SAYS[(Math.random() * SAYS.length) | 0])}
      >
        <img ref={imgRef} src={frames[0]} alt="" />
      </div>
    </>
  );
}
