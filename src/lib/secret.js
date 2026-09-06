const enc = new TextEncoder();
const dec = new TextDecoder();
const fromB64 = (s) => Uint8Array.from(atob(s), (c) => c.charCodeAt(0));

export async function unlock(code, blob) {
  if (!blob?.ct || !code) return null;

  const base = await crypto.subtle.importKey(
    'raw', enc.encode(code), 'PBKDF2', false, ['deriveKey']
  );
  const key = await crypto.subtle.deriveKey(
    {
      name: 'PBKDF2',
      salt: fromB64(blob.salt),
      iterations: blob.iterations,
      hash: 'SHA-256',
    },
    base,
    { name: 'AES-GCM', length: 256 },
    false,
    ['decrypt']
  );

  try {
    const pt = await crypto.subtle.decrypt(
      { name: 'AES-GCM', iv: fromB64(blob.iv) },
      key,
      fromB64(blob.ct)
    );
    return dec.decode(pt);
  } catch {
    return null;
  }
}
