import { BASE } from '../lib/base'

// FF monogram mark only (the wordmark text was removed per KingFizzy: just the logo).
export default function BrandLogo() {
  return (
    <a href="#top" className="inline-flex items-center no-underline" aria-label="Fabbys Fashion, home">
      <img
        src={`${BASE}brand/ff-mark.svg`}
        alt="Fabbys Fashion"
        className="h-8 w-auto md:h-9"
        style={{ display: 'block' }}
      />
    </a>
  )
}
