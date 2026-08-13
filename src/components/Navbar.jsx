import BrandLogo from './BrandLogo'
import ShopMenu from './ShopMenu'

// Left: brand. Centre: the SHOP control, which expands in place into the menu
// (absolute, so it overlays and never pushes content). Right: a single quiet
// ecommerce hint (the bag), not an invented menu (section 4).
export default function Navbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-30">
      <nav className="mx-auto grid max-w-[1600px] grid-cols-[1fr_auto_1fr] items-center px-5 py-5 md:px-10 md:py-7">
        <div className="justify-self-start">
          <BrandLogo />
        </div>
        <div className="justify-self-center">
          <ShopMenu />
        </div>
        <div className="justify-self-end">
          <a
            href="#bag"
            className="inline-flex items-center gap-2 no-underline"
            style={{ fontSize: 'var(--text-nav)', letterSpacing: '0.12em', color: 'var(--color-ink-soft)' }}
          >
            <span className="hidden sm:inline">BAG</span>
            <span
              className="inline-flex h-6 min-w-6 items-center justify-center rounded-full px-1.5"
              style={{ border: '1px solid var(--color-line)', fontSize: '0.72rem' }}
            >
              0
            </span>
          </a>
        </div>
      </nav>
    </header>
  )
}
