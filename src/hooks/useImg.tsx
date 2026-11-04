/**
 * <Img> — komponen gambar dengan auto-fallback.
 *
 * Cara pakai:
 *   <Img src="/images/home/bg.jpg" fallback="https://..." alt="..." />
 *
 * `fallback` bersifat opsional. Jika file lokal tidak ada dan tidak ada
 * fallback, gambar tidak tampil (alt text tetap muncul untuk aksesibilitas).
 */

import { useState } from 'react'

interface ImgProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string
  fallback?: string   // ← opsional, tidak wajib diisi
  alt: string
}

export function Img({ src, fallback, alt, ...rest }: ImgProps) {
  const [url, setUrl] = useState(src)
  const [errored, setErrored] = useState(false)

  return (
    <img
      src={url}
      alt={alt}
      loading="lazy"
      onError={() => {
        if (!errored && fallback && url !== fallback) {
          setErrored(true)
          setUrl(fallback)
        }
      }}
      {...rest}
    />
  )
}
