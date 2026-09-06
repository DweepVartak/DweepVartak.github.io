const files = import.meta.glob(
  ['../assets/work/*', '../assets/life/*'],
  { eager: true, query: '?url', import: 'default' }
);

export const asset = (src) => (src ? files[`../assets/${src}`] ?? null : null);

export const isVideo = (src) => /\.(mp4|webm|mov)$/i.test(src || '');
