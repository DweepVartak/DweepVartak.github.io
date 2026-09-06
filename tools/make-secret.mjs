import { webcrypto as crypto } from 'node:crypto';

const [, , code, message] = process.argv;

if (!code || !message) {
  console.error('\nUsage: node tools/make-secret.mjs "<code>" "<message>"\n');
  process.exit(1);
}

const ITERATIONS = 250_000;
const enc = new TextEncoder();
const toB64 = (buf) => Buffer.from(buf).toString('base64');

const salt = crypto.getRandomValues(new Uint8Array(16));
const iv = crypto.getRandomValues(new Uint8Array(12));

const base = await crypto.subtle.importKey('raw', enc.encode(code), 'PBKDF2', false, ['deriveKey']);
const key = await crypto.subtle.deriveKey(
  { name: 'PBKDF2', salt, iterations: ITERATIONS, hash: 'SHA-256' },
  base,
  { name: 'AES-GCM', length: 256 },
  false,
  ['encrypt']
);
const ct = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, enc.encode(message));

console.log(`
export const secret = {
  len: ${code.length},                 // how many characters to watch for
  iterations: ${ITERATIONS},
  salt: "${toB64(salt)}",
  iv: "${toB64(iv)}",
  ct: "${toB64(ct)}",
};
`);

if (/^\d{1,5}$/.test(code)) {
  console.error(
    `NOTE: a ${code.length}-digit numeric code is ${10 ** code.length} possibilities — ` +
    `hidden from browsing, but brute-forceable by anyone determined.\n` +
    `Add a word to the code if you want it genuinely secret.\n`
  );
}
