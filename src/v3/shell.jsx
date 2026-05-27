// v3 Shell — Header with visual mega menu, footer, route table
// Uses CSS classes from src/v3/styles.css
const { useState, useEffect, useRef } = React;

// Map a mega-menu item slug (e.g. 'category-lighthouses', 'multi-galley-head')
// to a proper { page, params } pair the router can resolve.
const CATEGORY_ALIAS = { dog: 'dog-friendly', city: 'city-town' };
function resolveNavTarget(slug) {
  if (slug.startsWith('category-')) {
    const raw = slug.slice('category-'.length);
    return { page: 'category', params: { categoryId: CATEGORY_ALIAS[raw] || raw } };
  }
  if (slug.startsWith('multi-'))   return { page: 'multi',   params: { parentId:  slug.slice('multi-'.length)   } };
  if (slug.startsWith('project-')) return { page: 'project', params: { projectId: slug.slice('project-'.length) } };
  return { page: slug, params: {} };
}

// Mega-menu data: each top item has columns of links + a visual feature
// Navigation matches the wireframe spec: 3 mega groups + a Book Now CTA.
const NAV = [
  {
    id: 'explore', label: 'Explore & Stay',
    columns: [
      { title: 'Browse', items: [
        ['properties','All Properties'],
        ['availability','Availability Calendar'],
        ['categories','Categories'],
      ]},
      { title: 'Categories', items: [
        ['category-lighthouses','Lighthouses'],
        ['category-romantic','Romantic'],
        ['category-dog','Dog-Friendly'],
        ['category-groups','Groups'],
        ['category-city','City & Town'],
      ]},
      { title: 'Your Stay', items: [
        ['stay','How to Book'],
        ['stay','Catering & Dining'],
        ['stay','Booking Conditions'],
        ['faqs','FAQs'],
        ['gift','Gift Vouchers'],
      ]},
    ],
    feature: {
      img: 'assets/img-4.jpg',
      tag: 'Featured stay',
      eyebrow: 'New for 2026',
      title: "Wicklow Head Lighthouse",
      copy: "A working-era keeper's lookout above the Irish Sea — sleeps 4, dog-welcome, perfect for a long weekend.",
      cta: 'See the property',
      page: 'property', params: { id:'wicklow-head' }
    }
  },
  {
    id: 'support', label: 'Support & Learn',
    columns: [
      { title: 'Our work', items: [
        ['projects','Projects'],
        ['project-saunderscourt','Saunderscourt'],
      ]},
      { title: 'Get involved', items: [
        ['learn','Learning'],
        ['stories','News & Updates'],
        ['donate','Donate'],
      ]},
    ],
    feature: {
      img: 'assets/img-6.jpg', tag: 'Current project', eyebrow: 'Saunderscourt · 42% funded',
      title: "Saunderscourt Gate Lodges",
      copy: "A pair of 1820s octagonal lodges in Wexford — stabilised, now needing roofs, chimneys and interiors.",
      cta: 'Follow the project', page: 'project', params:{ projectId:'saunderscourt' }
    }
  },
  {
    id: 'about', label: 'About Us',
    columns: [
      { title: 'The trust', items: [
        ['about','Our Story'],
        ['team','Who We Are'],
        ['about','How We Work'],
      ]},
      { title: 'Governance', items: [
        ['governance','Governance & Funding'],
      ]},
      { title: 'Get in touch', items: [
        ['contact','Contact Us'],
      ]},
    ],
    feature: {
      img: 'assets/img-5.jpg', tag: 'About us', eyebrow: 'Charity Reg. 20028909 (ROI) · NIC101205 (NI)',
      title: "An all-island charity since 1992",
      copy: "We restore buildings too small for the state and too specific for the market — and let them as holidays to fund the next rescue.",
      cta: 'Our story', page: 'about'
    }
  },
];

// ─── Header component with mega menu ─────────────────────────────────────────
function HeaderV3({ setPage, openProp, transparent = false }) {
  const [open, setOpen] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileExp, setMobileExp] = useState(null);
  const closeTimer = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock body scroll while the mobile drawer is open
  useEffect(() => {
    document.body.classList.toggle('no-scroll', mobileOpen);
    return () => document.body.classList.remove('no-scroll');
  }, [mobileOpen]);

  const cancelClose = () => {
    if (closeTimer.current) { clearTimeout(closeTimer.current); closeTimer.current = null; }
  };
  const scheduleClose = () => {
    cancelClose();
    closeTimer.current = setTimeout(() => setOpen(null), 90);
  };
  const switchTo = (id) => { cancelClose(); setOpen(id); };
  const closeNow = () => { cancelClose(); setOpen(null); };
  const closeMobile = () => { setMobileOpen(false); setMobileExp(null); };

  const transparentNow = transparent && !scrolled && !open && !mobileOpen;
  // White logo when the header sits on a dark backdrop; green when it's light
  const LOGO_WHITE = 'assets/logo/landmark-landscape-white.svg';
  const LOGO_GREEN = 'assets/logo/landmark-landscape-green.svg';
  const headerCls = [
    'header',
    transparentNow ? '' : 'is-light',
    scrolled ? 'is-scrolled' : '',
  ].filter(Boolean).join(' ');

  const go = (page, params = {}) => { closeNow(); closeMobile(); setPage(page, params); };
  const goFeature = (f) => { closeNow(); closeMobile(); setPage(f.page, f.params || {}); };

  const activeGroup = open ? NAV.find(g => g.id === open) : null;

  return (
    <>
      <header className={headerCls} onMouseLeave={scheduleClose}>
        <div className="wrap">
          <a className="logo" onClick={() => go('home')}>
            <img className="logo__img" src={transparentNow ? LOGO_WHITE : LOGO_GREEN} alt="Irish Landmark Trust" width="357" height="74"/>
          </a>
          <nav className="nav">
            {NAV.map(g => (
              <button key={g.id}
                className={open === g.id ? 'is-open' : ''}
                onMouseEnter={() => switchTo(g.id)}
              >{g.label} <span className="caret">▾</span></button>
            ))}
          </nav>
          <div className="header__cta">
            <a className="btn btn--ghost btn--sm" onClick={() => go('gift')} style={{ borderColor: transparentNow ? 'rgba(251,248,246,.5)' : '', color: transparentNow ? 'var(--cream)' : '' }}>Gift Vouchers</a>
            <a className="btn btn--accent btn--sm" onClick={() => go('availability')}>Book Now</a>
            <button className="nav-toggle" onClick={() => setMobileOpen(true)} aria-label="Open menu">
              <span/><span/><span/>
            </button>
          </div>
        </div>
      </header>

      {/* Desktop backdrop */}
      <div className={'mega-bd ' + (open ? 'is-open' : '')} onClick={closeNow} />

      {/* Desktop mega panel — single shared container */}
      <div className={'mega ' + (open ? 'is-open' : '')}
        onMouseEnter={cancelClose} onMouseLeave={scheduleClose}>
        <div className="wrap">
          <div className="mega__inner" key={open || 'none'}>
            {activeGroup && <MegaContent group={activeGroup} onPick={go} onFeature={goFeature} />}
          </div>
        </div>
      </div>

      {/* Mobile drawer + backdrop */}
      <div className={'mobile-bd ' + (mobileOpen ? 'is-open' : '')} onClick={closeMobile}/>
      <aside className={'mobile-drawer ' + (mobileOpen ? 'is-open' : '')}>
        <div className="mobile-drawer__head">
          <a className="logo" onClick={() => go('home')}>
            <img className="logo__img" src={LOGO_GREEN} alt="Irish Landmark Trust" width="357" height="74"/>
          </a>
          <button className="x" onClick={closeMobile} aria-label="Close menu">✕</button>
        </div>
        <div className="mobile-drawer__body">
          {NAV.map(g => (
            <div key={g.id} className={'m-group ' + (mobileExp === g.id ? 'is-open' : '')}>
              <button onClick={() => setMobileExp(mobileExp === g.id ? null : g.id)}>
                {g.label} <span className="car">▾</span>
              </button>
              <div className="m-group__body">
                {g.columns.map((c, i) => (
                  <div key={i}>
                    <h5>{c.title}</h5>
                    <ul>
                      {c.items.map(([p, t], j) => {
                        const r = resolveNavTarget(p);
                        return (
                          <li key={j}><a onClick={() => go(r.page, r.params)}>{t}</a></li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}
          <div className="m-cta">
            <a className="btn btn--accent" onClick={() => go('availability')}>Book Now</a>
            <a className="btn btn--ghost" onClick={() => go('gift')}>Gift Vouchers</a>
          </div>
        </div>
      </aside>
    </>
  );
}

function MegaContent({ group, onPick, onFeature }) {
  // Groups with fewer than 3 link columns leave a gap — let the feature span 2
  const wide = group.columns.length < 3;
  return (
    <>
      {group.columns.map((c, i) => (
        <div className="mega__col" key={i} style={{ '--col': i }}>
          <h5>{c.title}</h5>
          <ul>
            {c.items.map(([p, t], j) => {
              const r = resolveNavTarget(p);
              return (
                <li key={j} style={{ '--i': j }}>
                  <a onClick={() => onPick(r.page, r.params)}>{t}</a>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
      <a className={'mega__feature' + (wide ? ' mega__feature--wide' : '')}
        onClick={() => onFeature(group.feature)}>
        <div className="mega__feature__img">
          <div className="mega__feature__tag">{group.feature.tag}</div>
          <img src={group.feature.img} alt=""/>
        </div>
        <div className="mega__feature__body">
          <span className="eyebrow">{group.feature.eyebrow}</span>
          <h4>{group.feature.title}</h4>
          <span className="arr-link">{group.feature.cta} →</span>
        </div>
      </a>
    </>
  );
}

// ─── Footer ──────────────────────────────────────────────────────────────────
function FooterV3({ setPage }) {
  return (
    <footer className="f">
      <div className="wrap">
        <div className="f__top">
          <div>
            <h4>Explore &amp; Stay</h4>
            <ul>
              <li><a onClick={()=>setPage('properties')}>All Properties</a></li>
              <li><a onClick={()=>setPage('availability')}>Availability Calendar</a></li>
              <li><a onClick={()=>setPage('category',{categoryId:'lighthouses'})}>Lighthouses</a></li>
              <li><a onClick={()=>setPage('category',{categoryId:'romantic'})}>Romantic</a></li>
              <li><a onClick={()=>setPage('category',{categoryId:'dog-friendly'})}>Dog-Friendly</a></li>
              <li><a onClick={()=>setPage('stay')}>Your Stay</a></li>
              <li><a onClick={()=>setPage('faqs')}>FAQs</a></li>
              <li><a onClick={()=>setPage('gift')}>Gift Vouchers</a></li>
            </ul>
          </div>
          <div>
            <h4>Support &amp; Learn</h4>
            <ul>
              <li><a onClick={()=>setPage('projects')}>Projects</a></li>
              <li><a onClick={()=>setPage('learn')}>Learning</a></li>
              <li><a onClick={()=>setPage('stories')}>News &amp; Updates</a></li>
              <li><a onClick={()=>setPage('donate')}>Donate</a></li>
            </ul>
          </div>
          <div>
            <h4>About Us</h4>
            <ul>
              <li><a onClick={()=>setPage('about')}>Our Story</a></li>
              <li><a onClick={()=>setPage('team')}>Who We Are</a></li>
              <li><a onClick={()=>setPage('governance')}>Governance &amp; Funding</a></li>
              <li><a onClick={()=>setPage('contact')}>Contact Us</a></li>
            </ul>
          </div>
          <div className="f__support">
            <h5>Support Our Work</h5>
            <p>Help us preserve Ireland's built heritage for future generations.</p>
            <a className="btn btn--accent btn--sm" onClick={()=>setPage('donate')}>Donate Now <span className="arr">→</span></a>
          </div>
        </div>
        <div className="f__bottom">
          <div>Privacy &nbsp;|&nbsp; Terms &nbsp;|&nbsp; Cookies &nbsp;|&nbsp; Accessibility &nbsp;|&nbsp; <a onClick={()=>setPage('contact')}>Contact Us</a></div>
          <div className="socials">
            <a>F</a><a>IG</a><a>YT</a><a>Newsletter</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ─── Property card (shared) ───────────────────────────────────────────────────
function Prop({ p, onClick, onImageClick }) {
  const D = window.ILT_DATA;
  const imgs = ['assets/img-1.jpg','assets/img-2.jpg','assets/img-3.jpg','assets/img-4.jpg','assets/img-5.jpg','assets/img-6.jpg','assets/hero-lighthouse.jpg'];
  const idx = (p.id.charCodeAt(0) + p.id.length) % imgs.length;
  return (
    <a className="prop" onClick={onClick}>
      <div className="prop__img" onClick={onImageClick ? (e)=>{ e.stopPropagation(); onImageClick(); } : undefined}>
        <img src={imgs[idx]} alt={p.name}/>
        <div className="prop__tag">{p.tag}</div>
        {p.dog && <div className="prop__dog">Dog Friendly</div>}
        {onImageClick && <span className="prop__gallery">⊕ Gallery</span>}
      </div>
      <div className="prop__body">
        <div className="prop__row">
          <h3 className="prop__name">{p.name}</h3>
          <div className="prop__price">from {window.ILT_CUR(p)}{p.from}</div>
        </div>
        <div className="prop__loc">{p.location}</div>
        <div className="prop__meta">
          <span>Sleeps {p.sleeps}</span>
          <span>{p.bedrooms} bed{p.bedrooms>1?'s':''}</span>
          <span>2-night min</span>
        </div>
      </div>
    </a>
  );
}

// ─── Preloader — fast image flicker → last image zooms into the hero bg ──────
// Ordered so the final frame is p1.jpg, which is also the hero background.
function Preloader() {
  const imgs = ['p2','p3','p4','p5','p6','p7','p8','p1'].map(n => `assets/stays/${n}.jpg`);
  const [idx, setIdx] = useState(0);
  const [phase, setPhase] = useState('flicker'); // flicker → zoom → reveal → gone

  useEffect(() => {
    document.body.classList.add('no-scroll');
    const FLICK = 160;
    let i = 0;
    const iv = setInterval(() => {
      i++;
      if (i >= imgs.length - 1) {
        clearInterval(iv);
        setIdx(imgs.length - 1);
        setTimeout(() => {                                          // wipe up + reveal hero
          setPhase('wipe');
          document.documentElement.classList.add('is-loaded');      // bg fade + element cascade
        }, FLICK + 240);
        setTimeout(() => {                                          // overlay removed
          setPhase('gone'); document.body.classList.remove('no-scroll');
        }, FLICK + 240 + 1650);
      } else setIdx(i);
    }, FLICK);
    return () => { clearInterval(iv); document.body.classList.remove('no-scroll'); };
  }, []);

  if (phase === 'gone') return null;

  return (
    <div className={'preloader' + (phase === 'wipe' ? ' is-wipe' : '')}>
      <div className="preloader__frame">
        {imgs.map((src, i) => <img key={i} src={src} alt="" className={i === idx ? 'is-active' : ''}/>)}
      </div>
    </div>
  );
}

Object.assign(window, { HeaderV3, FooterV3, Prop, NAV, Preloader });
