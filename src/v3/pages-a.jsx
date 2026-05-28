// v3 Pages — listings, category, multi-property, property detail, availability, your-stay, faqs
const {useState:uS, useMemo:uM} = React;

const IMGS = ['assets/img-1.jpg','assets/img-2.jpg','assets/img-3.jpg','assets/img-4.jpg','assets/img-5.jpg','assets/img-6.jpg','assets/hero-lighthouse.jpg'];
const pick = (id, off=0) => IMGS[(id.charCodeAt(0) + id.length + off) % IMGS.length];

// ─── Booking calendar (property detail) ─────────────────────────────────────
const MONTH_NAMES = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const DOW = ['Mo','Tu','We','Th','Fr','Sa','Su'];
const dayKey = (d) => d.getFullYear()*10000 + d.getMonth()*100 + d.getDate();

function BookingCalendar({ propId, name, onBook }) {
  const today = new Date(); today.setHours(0,0,0,0);
  const [view, setView] = uS(new Date(today.getFullYear(), today.getMonth(), 1));
  const [start, setStart] = uS(null);
  const [end, setEnd] = uS(null);

  const y = view.getFullYear(), m = view.getMonth();
  const startWeekday = (new Date(y, m, 1).getDay() + 6) % 7;   // Monday-first
  const daysInMonth = new Date(y, m + 1, 0).getDate();
  const seed = (propId || '').charCodeAt(0) || 7;

  const cells = [];
  for (let i = 0; i < startWeekday; i++) cells.push(null);
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(y, m, d));

  const isPast = (d) => d < today;
  // deterministic "booked" days so it looks like real availability
  const isBooked = (d) => !isPast(d) && ((d.getDate() * seed) % 11 === 0);
  const isAvail = (d) => !isPast(d) && !isBooked(d);
  const same = (a, b) => a && b && dayKey(a) === dayKey(b);
  const inRange = (d) => start && end && d > start && d < end;

  const pickDay = (d) => {
    if (!isAvail(d)) return;
    if (!start || (start && end)) { setStart(d); setEnd(null); }
    else if (dayKey(d) <= dayKey(start)) { setStart(d); }
    else { setEnd(d); }
  };

  // months to offer in the dropdown: this month → +13
  const opts = [];
  for (let i = 0; i < 14; i++) { const dt = new Date(today.getFullYear(), today.getMonth() + i, 1); opts.push(dt); }

  const nights = start && end ? Math.round((end - start) / 86400000) : 0;
  const label = !start ? 'Select start date' : !end ? 'Select end date' : `Request ${nights} night${nights>1?'s':''} →`;

  return (
    <div className="bcal">
      <div className="bcal__head">{name}</div>
      <div className="bcal__body">
        <div className="bcal__nav">
          <button type="button" className="bcal__arrow" aria-label="Previous month" onClick={()=>setView(new Date(y, m-1, 1))}>‹</button>
          <div className="bcal__select">
            <select value={y*100+m} onChange={(e)=>{ const v=+e.target.value; setView(new Date(Math.floor(v/100), v%100, 1)); }}>
              {opts.map(dt => <option key={dayKey(dt)} value={dt.getFullYear()*100+dt.getMonth()}>{MONTH_NAMES[dt.getMonth()]} {dt.getFullYear()}</option>)}
            </select>
            <span className="bcal__caret">▾</span>
          </div>
          <button type="button" className="bcal__arrow" aria-label="Next month" onClick={()=>setView(new Date(y, m+1, 1))}>›</button>
        </div>
        <div className="bcal__grid bcal__dow">{DOW.map(d => <span key={d}>{d}</span>)}</div>
        <div className="bcal__grid">
          {cells.map((d, i) => d === null
            ? <span key={i} className="bcal__cell bcal__cell--empty"/>
            : <button key={i} type="button" disabled={!isAvail(d)}
                className={['bcal__cell',
                  isPast(d) ? 'is-past' : (isBooked(d) ? 'is-booked' : 'is-avail'),
                  (same(d,start)||same(d,end)) ? 'is-sel' : '',
                  inRange(d) ? 'is-range' : '',
                  same(d,start) ? 'is-start' : '', same(d,end) ? 'is-end' : ''
                ].filter(Boolean).join(' ')}
                onClick={()=>pickDay(d)}>{d.getDate()}</button>
          )}
        </div>
        <button type="button" className="bcal__cta" onClick={()=> (start && end) ? onBook(start, end) : null}>{label}</button>
      </div>
    </div>
  );
}

// ─── Interactive location map — Leaflet + clean 2-colour CARTO tiles ────────
function PropMap({ p }) {
  const ref = React.useRef(null);
  const [lat, lng] = p.coords || [];
  React.useEffect(() => {
    if (!p.coords || !window.L || !ref.current) return;
    const map = window.L.map(ref.current, { scrollWheelZoom:false, attributionControl:false }).setView([lat, lng], 11);
    window.L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
      maxZoom: 19, subdomains: 'abcd',
    }).addTo(map);
    // Brand-green circular pin
    window.L.marker([lat, lng], {
      icon: window.L.divIcon({ className:'prop-pin', html:'<span></span>', iconSize:[18,18], iconAnchor:[9,9] })
    }).addTo(map);
    map.getContainer().addEventListener('click', () => map.scrollWheelZoom.enable());
    return () => map.remove();
  }, [p.id]);

  if (!p.coords) return null;
  const big = `https://www.openstreetmap.org/?mlat=${lat}&mlon=${lng}#map=13/${lat}/${lng}`;
  return (
    <div className="prop-map">
      <div className="prop-map__head">Location <span>{p.location}</span></div>
      <div className="prop-map__frame" ref={ref}></div>
      <a className="prop-map__link" href={big} target="_blank" rel="noopener">Open larger map →</a>
    </div>
  );
}

// ─── FAQ accordion item (smooth height animation, rule divider) ─────────────
function FaqItem({ q, children }) {
  const [open, setOpen] = uS(false);
  return (
    <div className={'faq' + (open ? ' is-open' : '')}>
      <button className="faq__q" onClick={() => setOpen(o => !o)}>
        {q}<span className="plus">+</span>
      </button>
      <div className="faq__wrap"><div className="faq__body">{children}</div></div>
    </div>
  );
}

// ─── Page top hero ──────────────────────────────────────────────────────────
function PageTop({ crumb, eyebrow, title, lede, dark = false, action, bgImage }) {
  const hero = !!bgImage;
  const cls = hero ? 'page-top page-top--hero' : 'page-top ' + (dark ? 'page-top--dark' : 'page-top--cream');
  return (
    <section className={cls}>
      {hero && <><img className="page-top__bg" src={bgImage} alt=""/><div className="page-top__shade"/></>}
      <div className="wrap page-top__inner">
        <div className="page-top__text">
          {crumb && <div className="crumb">{crumb}</div>}
          <div className="eyebrow" style={{color: (dark||hero) ? 'var(--mint)' : 'var(--terracotta)'}}>{eyebrow}</div>
          <h1>{title}</h1>
          {lede && <p className="page-top__lede">{lede}</p>}
        </div>
        {action && <div className="page-top__action">{action}</div>}
      </div>
    </section>
  );
}

// ─── Property image gallery lightbox ────────────────────────────────────────
function PropGallery({ p, start = 0, onClose }) {
  const imgs = [0,1,2,3,4].map(o => pick(p.id, o));
  const [i, setI] = uS(typeof start === 'number' ? start : 0);
  const touch = React.useRef(null);
  const prev = () => setI(v => (v - 1 + imgs.length) % imgs.length);
  const next = () => setI(v => (v + 1) % imgs.length);
  React.useEffect(() => {
    document.body.classList.add('no-scroll');
    const onKey = (e) => { if (e.key === 'Escape') onClose(); if (e.key === 'ArrowLeft') prev(); if (e.key === 'ArrowRight') next(); };
    window.addEventListener('keydown', onKey);
    return () => { document.body.classList.remove('no-scroll'); window.removeEventListener('keydown', onKey); };
  }, []);
  const onTouchStart = (e) => { touch.current = e.touches[0].clientX; };
  const onTouchEnd = (e) => {
    if (touch.current == null) return;
    const dx = e.changedTouches[0].clientX - touch.current;
    if (dx > 50) prev(); else if (dx < -50) next();
    touch.current = null;
  };
  return (
    <div className="lightbox" onClick={onClose}>
      <button className="lightbox__close" onClick={onClose} aria-label="Close">✕</button>
      <div className="lightbox__stage" onClick={e=>e.stopPropagation()} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        <button className="lightbox__nav lightbox__nav--prev" onClick={prev} aria-label="Previous">‹</button>
        <img src={imgs[i]} alt={p.name}/>
        <button className="lightbox__nav lightbox__nav--next" onClick={next} aria-label="Next">›</button>
        <div className="lightbox__cap">{p.name} · {i+1} / {imgs.length}</div>
        <div className="lightbox__dots">
          {imgs.map((_,d)=>(<button key={d} className={'lightbox__dot'+(d===i?' is-on':'')} onClick={()=>setI(d)} aria-label={`Image ${d+1}`}/>))}
        </div>
      </div>
    </div>
  );
}

// ─── ALL PROPERTIES ─────────────────────────────────────────────────────────
function PropertiesPageV3({ setPage, openProp }) {
  const D = window.ILT_DATA;
  const [view, setView] = uS('grid');
  const [cat, setCat] = uS('all');
  const [dog, setDog] = uS(false);
  const [hovered, setHovered] = uS(null);
  const [showMap, setShowMap] = uS(false);
  const [gallery, setGallery] = uS(null);

  const filtered = uM(()=> D.props.filter(p => {
    if (cat !== 'all' && !p.categories.includes(cat)) return false;
    if (dog && !p.dog) return false;
    return true;
  }), [cat, dog]);

  // Project lat/lng to ireland-map svg coords
  const project = (lat, lng) => {
    const x = ((lng + 10.5) / (10.5 - 5.4)) * 100;
    const y = ((55.4 - lat) / (55.4 - 51.4)) * 100;
    return [x, y];
  };

  return (
    <div>
      <PageTop bgImage="assets/stays/p2.jpg" eyebrow="All Properties"
        title={<>Every <em className="di">Landmark</em>.</>}
        lede="33 restored buildings across the island."
        action={<a className="btn btn--ghost-w btn--sm" onClick={()=>setShowMap(s=>!s)}>{showMap ? 'Hide map' : 'View on map'} <span className="arr">→</span></a>}/>

      {/* Map row (toggled by "View on map") */}
      {showMap && (
      <section style={{padding:'56px 0', background:'var(--cream)'}}>
        <div className="wrap map-row">
          <div className="ireland-map">
            <svg viewBox="0 0 520 700" style={{position:'absolute',inset:0,width:'100%',height:'100%'}}>
              <path d="M 220 50 C 290 40, 340 60, 360 110 C 395 140, 410 180, 395 230 C 420 280, 400 330, 430 380 C 445 430, 420 490, 380 540 C 360 600, 310 640, 250 650 C 200 665, 150 640, 130 580 C 100 540, 85 480, 100 420 C 75 380, 90 320, 110 280 C 90 230, 100 170, 135 130 C 160 85, 190 55, 220 50 Z"
                fill="#E3EBD2" stroke="#93A496" strokeWidth="1.5" />
              <path d="M 200 155 L 340 150 L 365 200 L 200 210" fill="none" stroke="#1A5632" strokeWidth=".8" strokeDasharray="4 3" opacity=".4"/>
            </svg>
            {filtered.map((p,i) => {
              const [x,y] = project(p.coords[0], p.coords[1]);
              const active = hovered === p.id;
              return (
                <div key={p.id} className={'map-pin ' + (active ? 'is-hover' : '')}
                  style={{ left:`${x}%`, top:`${y}%` }}
                  onMouseEnter={()=>setHovered(p.id)} onMouseLeave={()=>setHovered(null)}
                  onClick={()=>openProp(p.id)}>
                  <div className="map-pin__dot"></div>
                  {active && (
                    <div className="map-pin__tip">
                      <div className="title">{p.name}</div>
                      <div className="sub">{p.location} · from {window.ILT_CUR(p)}{p.from}</div>
                    </div>
                  )}
                </div>
              );
            })}
            <div className="badge">{filtered.length} pins · drag-pan & zoom (preview)</div>
          </div>

          <div className="map-list">
            <div style={{fontFamily:'TT Norms Pro', fontSize:12, letterSpacing:'.2em', textTransform:'uppercase', color:'var(--sage)', marginBottom:14, padding:'0 12px'}}>{filtered.length} results · hover map pins to preview</div>
            {filtered.map((p,i) => (
              <a key={p.id} className={'map-list-item '+(hovered===p.id?'is-hover':'')}
                onClick={()=>openProp(p.id)}
                onMouseEnter={()=>setHovered(p.id)} onMouseLeave={()=>setHovered(null)}>
                <div className="map-list-item__img"><img src={pick(p.id,i)} alt=""/></div>
                <div>
                  <h4>{p.name}</h4>
                  <div className="meta">{p.location} · {p.tag}</div>
                </div>
                <div className="price">{window.ILT_CUR(p)}{p.from}</div>
              </a>
            ))}
          </div>
        </div>
      </section>
      )}

      {/* Filter bar */}
      <div className="filterbar">
        <div className="wrap">
          <button className={'pill '+(cat==='all'?'is-active':'')} onClick={()=>setCat('all')}><span className="pl">Category</span> All</button>
          {D.categories.filter(c=>c.id!=='itineraries').map(c => (
            <button key={c.id} className={'pill '+(cat===c.id?'is-active':'')} onClick={()=>setCat(c.id)}>{c.name}</button>
          ))}
          <button className={'pill '+(dog?'is-active':'')} onClick={()=>setDog(!dog)}>⚲ Dog-friendly</button>
          <div style={{flex:1}}/>
          <div className="view-toggle">
            <button className={view==='grid'?'is-active':''} onClick={()=>setView('grid')}>Grid</button>
            <button className={view==='list'?'is-active':''} onClick={()=>setView('list')}>List</button>
          </div>
        </div>
      </div>

      {/* Grid / list */}
      <section style={{padding:'48px 0 120px', background:'var(--cream)'}}>
        <div className="wrap">
          {view==='grid' ? (
            <div className="props">
              {filtered.map(p => <Prop key={p.id} p={p} onClick={()=>openProp(p.id)} onImageClick={()=>setGallery(p)}/>)}
            </div>
          ) : (
            <div className="props props--list" style={{display:'grid',gap:18, gridTemplateColumns:'1fr'}}>
              {filtered.map((p,i)=>(
                <a key={p.id} className="prop" onClick={()=>openProp(p.id)} style={{display:'grid', gridTemplateColumns:'320px 1fr auto'}}>
                  <div className="prop__img" style={{aspectRatio:'4/3'}} onClick={(e)=>{e.stopPropagation(); setGallery(p);}}>
                    <img src={pick(p.id,i)} alt=""/>
                    <div className="prop__tag">{p.tag}</div>
                    <span className="prop__gallery">⊕ Gallery</span>
                  </div>
                  <div className="prop__body">
                    <div className="prop__row"><h3 className="prop__name">{p.name}</h3></div>
                    <div className="prop__loc">{p.location}</div>
                    <p style={{fontFamily:'TT Norms Pro', fontSize:14, lineHeight:1.6, color:'var(--ink-soft)', marginTop:14, maxWidth:560}}>{p.blurb || 'A unique heritage stay, restored and let self-catering by the Irish Landmark Trust.'}</p>
                    <div className="prop__meta"><span>Sleeps {p.sleeps}</span><span>{p.bedrooms} beds</span>{p.dog && <span>Dog-friendly</span>}</div>
                  </div>
                  <div style={{padding:'28px 32px', textAlign:'right', display:'flex', flexDirection:'column', justifyContent:'space-between', alignItems:'flex-end'}}>
                    <div>
                      <div style={{fontFamily:'TT Norms Pro', fontSize:12, letterSpacing:'.18em', textTransform:'uppercase', color:'var(--sage)'}}>From</div>
                      <div style={{fontFamily:'Joane Stencil', fontSize:34, fontWeight:400}}>{window.ILT_CUR(p)}{p.from}</div>
                      <div style={{fontFamily:'TT Norms Pro', fontSize:12, color:'var(--sage)'}}>for 2 nights</div>
                    </div>
                    <a className="btn btn--ghost btn--sm">View property →</a>
                  </div>
                </a>
              ))}
            </div>
          )}
        </div>
      </section>

      {lightbox !== null && <PropGallery p={p} start={lightbox} onClose={()=>setLightbox(null)}/>}
    </div>
  );
}

// ─── CATEGORY ───────────────────────────────────────────────────────────────
function CategoryPageV3({ categoryId='lighthouses', setPage, openProp }) {
  const D = window.ILT_DATA;
  const cat = D.categories.find(c=>c.id===categoryId) || D.categories[0];
  const list = D.props.filter(p=>p.categories.includes(cat.id));

  return (
    <div>
      {/* Hero with feature image */}
      <section style={{position:'relative', minHeight:560, background:'var(--green-deep)', color:'var(--cream)', overflow:'hidden'}}>
        <div style={{position:'absolute',inset:0}}>
          <img src={pick(cat.id, 1)} alt="" style={{width:'100%',height:'100%',objectFit:'cover',opacity:.55}}/>
          <div style={{position:'absolute',inset:0, background:'linear-gradient(180deg,rgba(26,60,52,.4),rgba(26,60,52,.7))'}}/>
        </div>
        <div className="wrap" style={{position:'relative', padding:'180px 56px 90px'}}>
          <div className="crumb" style={{color:'var(--mint)'}}>Explore & Stay · Category</div>
          <h1 className="display" style={{fontSize:120, fontWeight:400, margin:'14px 0 20px', letterSpacing:'-.02em'}}>{cat.name}</h1>
          <p className="page-top__lede" style={{color:'rgba(251,248,246,.92)'}}>{cat.blurb}</p>
          <div className="eyebrow" style={{color:'var(--mint)', marginTop:36, opacity:.85}}>{list.length} properties · all island</div>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="two-col" style={{marginBottom:56}}>
            <div className="eyebrow" style={{color:'var(--terracotta)'}}>About this collection</div>
            <div>
              <p style={{fontFamily:'meno-banner', fontWeight:400, fontSize:22, lineHeight:1.55, margin:'0 0 16px'}}>
                Our {cat.name.toLowerCase()} collection brings together {list.length} properties that share a particular character.
              </p>
              <p style={{fontFamily:'TT Norms Pro', fontSize:15, lineHeight:1.75, color:'var(--ink-soft)', margin:0}}>
                Curated by our Bookings Office and House Managers. Each building has been fully restored and is let self-catering, with revenue feeding directly into the next building we save.
              </p>
            </div>
          </div>
          <div className="props" style={{gridTemplateColumns:'repeat(3, 1fr)'}}>
            {list.map(p => <Prop key={p.id} p={p} onClick={()=>openProp(p.id)}/>)}
          </div>

          {cat.id==='dog-friendly' && (
            <div className="split-cta" style={{marginTop:48}}>
              <div>
                <div className="eyebrow" style={{color:'var(--mint)'}}>Before you bring the dog</div>
                <h3>Read the dog policy.</h3>
              </div>
              <a className="btn btn--accent" onClick={()=>setPage('stay')}>Dog policy →</a>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

// ─── MULTI-PROPERTY (Galley Head) ───────────────────────────────────────────
function MultiPageV3({ parentId='galley', setPage, openProp }) {
  const D = window.ILT_DATA;
  const siblings = D.props.filter(p=>p.parent===parentId);
  const parentName = siblings[0]?.parentName || 'Galley Head';

  return (
    <div>
      <section style={{position:'relative', minHeight:620, background:'var(--green-deep)', color:'var(--cream)', overflow:'hidden'}}>
        <div style={{position:'absolute',inset:0}}>
          <img src="assets/img-5.jpg" alt="" style={{width:'100%',height:'100%',objectFit:'cover',opacity:.6}}/>
          <div style={{position:'absolute',inset:0, background:'linear-gradient(180deg,rgba(26,60,52,.35),rgba(26,60,52,.65))'}}/>
        </div>
        <div className="wrap" style={{position:'relative', padding:'180px 56px 90px'}}>
          <div className="crumb" style={{color:'var(--mint)'}}>Explore & Stay · Multi-property · Co. Cork</div>
          <h1 className="display" style={{fontSize:130, fontWeight:400, margin:'14px 0 20px', letterSpacing:'-.02em'}}>{parentName}.</h1>
          <p className="page-top__lede" style={{color:'rgba(251,248,246,.92)'}}>Two keepers' residences on a dramatic Cork headland, with the working lighthouse still sweeping between them each night.</p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="two-col" style={{marginBottom:72}}>
            <div>
              <div className="eyebrow" style={{color:'var(--terracotta)'}}>About the place</div>
              <h2 className="display" style={{fontSize:50, margin:'16px 0 0'}}>Not just the houses — <em className="di">the headland itself.</em></h2>
            </div>
            <div>
              <p style={{fontFamily:'Joane Stencil', fontSize:20, lineHeight:1.6, margin:'0 0 20px'}}>The Galley Head peninsula juts into the Atlantic between Clonakilty and Rosscarbery. Built in 1878, the lightstation once housed three keepers and their families; today the compound is ours to share.</p>
              <p style={{fontFamily:'TT Norms Pro', fontSize:15, lineHeight:1.75, color:'var(--ink-soft)', margin:0}}>From the gate, it's a ten-minute walk down to Red Strand and another twenty by car to the seafood restaurants of Clonakilty. Bookings for both cottages together are handled by our Bookings Office.</p>
            </div>
          </div>

          <div className="props" style={{gridTemplateColumns:'repeat(2, 1fr)', gap:32, marginBottom:48}}>
            {siblings.map(p => <Prop key={p.id} p={p} onClick={()=>openProp(p.id)}/>)}
          </div>

          <div className="split-cta">
            <div>
              <div className="eyebrow" style={{color:'var(--mint)'}}>Book the whole station</div>
              <h3>Want both houses, one party of eight?</h3>
              <p style={{fontFamily:'TT Norms Pro', fontSize:14, opacity:.85, margin:'8px 0 0', maxWidth:640}}>Our Bookings Office can coordinate combined dates — useful for reunions, big birthdays and small weddings.</p>
            </div>
            <a className="btn btn--accent" onClick={()=>setPage('stay')}>Contact Bookings →</a>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── PROPERTY DETAIL ────────────────────────────────────────────────────────
function PropertyDetailV3({ id='galley-keepers', setPage, openProp }) {
  const D = window.ILT_DATA;
  const p = D.props.find(x=>x.id===id) || D.props[0];
  const [tab, setTab] = uS('about');
  const [lightbox, setLightbox] = uS(null);   // image index, or null
  const primaryCat = D.categories.find(c=>c.id===p.categories[0]) || D.categories[0];
  const similar = D.props.filter(x => x.id!==p.id && x.categories.some(c=>p.categories.includes(c))).slice(0,3);

  return (
    <div>
      {/* Fullscreen hero with title + badges */}
      <section className="prop-hero">
        <img className="prop-hero__img" src={pick(p.id, 0)} alt={p.name}/>
        <div className="prop-hero__shade"/>
        <div className="wrap prop-hero__inner">
          <div className="crumb prop-hero__crumb">
            <a onClick={()=>setPage('properties')}>All properties</a>
            {p.parent && <> / <a onClick={()=>setPage('multi',{parentId:p.parent})}>{p.parentName}</a></>}
            {' / '}{p.name}
          </div>
          <h1 className="prop-hero__title">{p.name}</h1>
          <div className="prop-hero__badges">
            <span>{p.tag}</span>
            <span>{p.location}</span>
            <span>Sleeps {p.sleeps}</span>
            <span>{p.bedrooms} bedroom{p.bedrooms>1?'s':''}</span>
            <span>from {window.ILT_CUR(p)}{p.from}</span>
            {p.dog && <span className="is-dog">Dog friendly</span>}
          </div>
        </div>
      </section>

      {/* Gallery strip */}
      <section style={{padding:'40px 0 0', background:'var(--cream)'}}>
        <div className="wrap">
          <div className="pd-gallery">
            {[0,1,2,3,4].map(n => (
              <img key={n} src={pick(p.id, n)} alt={n===0?p.name:''} onClick={()=>setLightbox(n)}/>
            ))}
            <button className="pd-gallery__all" onClick={()=>setLightbox(0)}>⊕ View gallery</button>
          </div>
        </div>
      </section>

      <section style={{padding:'40px 0 120px', background:'var(--cream)'}}>
        <div className="wrap pd-main">
          <div>
            <p style={{fontFamily:'meno-banner', fontWeight: 400, fontSize:22, lineHeight:1.55, color:'var(--ink-soft)', margin:'0 0 28px', maxWidth:680}}>{p.blurb || `A ${p.tag.toLowerCase()} restored and let by the Irish Landmark Trust, sleeping ${p.sleeps} in ${p.bedrooms} bedrooms.`}</p>

            {/* Things you should know */}
            <div className="pd-tysk">
              <h3>Things you should know</h3>
              <ul>
                <li>Minimum stay: 2 nights (longer over peak dates)</li>
                <li>Self-catering — linen, towels and a welcome basket provided</li>
                {p.dog && <li><strong>Dog-friendly</strong> — one well-behaved dog welcome</li>}
                <li>Met on arrival by your local House Manager</li>
              </ul>
            </div>

            <div className="tabs">
              {[['about','About'],['amenities','Amenities'],['itinerary','Itinerary'],['reviews','Reviews'],['history','History'],['faqs','Property FAQs']].map(([k,l])=>(
                <button key={k} className={'tab '+(tab===k?'is-active':'')} onClick={()=>setTab(k)}>{l}</button>
              ))}
            </div>

            <div style={{minHeight:280}}>
              {tab==='about' && (
                <div>
                  <p style={{fontFamily:'meno-banner', fontSize:18, lineHeight:1.7, margin:'0 0 16px'}}>The {p.name} was restored by the Irish Landmark Trust in partnership with local craftspeople, using traditional lime mortars and salvaged timbers wherever possible. The interior is simply furnished — a working fire, generous kitchen, books instead of television.</p>
                  <p style={{fontFamily:'TT Norms Pro', fontSize:15, lineHeight:1.75, color:'var(--ink-soft)', margin:0}}>Your local House Manager will meet you on arrival to walk through the property and the quirks of an old building. Linen and towels provided; a welcome basket on the kitchen table.</p>
                </div>
              )}
              {tab==='amenities' && (
                <div style={{display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:14}}>
                  {['Working open fire','Full kitchen','Wi-Fi (limited)','Linen provided','Welcome basket','Off-road parking','Sea views','Garden / yard','Books & games'].map(a=>(
                    <div key={a} style={{fontFamily:'TT Norms Pro', fontSize:14, padding:'14px 0', borderBottom:'1px solid var(--line-warm)', display:'flex', gap:12, alignItems:'center'}}>
                      <span style={{color:'var(--terracotta)'}}>✓</span>{a}
                    </div>
                  ))}
                </div>
              )}
              {tab==='reviews' && (
                <div style={{display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:16}}>
                  {[
                    ['★★★★★','"A view so wild we didn\'t leave the house for two days."','— Aoife, 2025'],
                    ['★★★★★','"The House Manager left a lemon drizzle cake on the table. We wept."','— James & Rob, 2024'],
                    ['★★★★☆','"Limited signal — exactly what we came for."','— Niamh, 2024'],
                    ['★★★★★','"Fire was lit when we walked in. Everything else sort of sorted itself out."','— The Walshes, 2023'],
                  ].map((r,i)=>(
                    <div key={i} style={{background:'var(--cream-warm)', padding:'24px 28px'}}>
                      <div style={{color:'var(--terracotta)', letterSpacing:'2px'}}>{r[0]}</div>
                      <p style={{fontFamily:'meno-banner', fontWeight: 400, fontSize:18, lineHeight:1.45, margin:'10px 0'}}>{r[1]}</p>
                      <div className="eyebrow" style={{color:'var(--sage)'}}>{r[2]}</div>
                    </div>
                  ))}
                </div>
              )}
              {tab==='itinerary' && (
                <div style={{overflow:'hidden', position:'relative'}}>
                  <img src={pick(p.id,5)} alt="" style={{width:'100%', aspectRatio:'16/7', objectFit:'cover'}}/>
                  <div style={{position:'absolute',inset:0,background:'linear-gradient(180deg,rgba(26,60,52,.2),rgba(26,60,52,.7))', padding:48, color:'var(--cream)', display:'flex', flexDirection:'column', justifyContent:'flex-end'}}>
                    <div className="eyebrow" style={{color:'var(--mint)'}}>A week-long drive</div>
                    <h3 style={{fontFamily:'Joane Stencil', fontSize:38, margin:'8px 0', fontWeight:400}}>Seven Nights on the Wild Atlantic Way</h3>
                    <p style={{fontFamily:'meno-banner', fontWeight: 400, fontSize:17, opacity:.9, margin:0, maxWidth:560}}>Days 1–3 at {p.name}, then south through Clonakilty and on to the Beara peninsula.</p>
                  </div>
                </div>
              )}
              {tab==='history' && (
                <div>
                  <p style={{fontFamily:'meno-banner', fontSize:18, lineHeight:1.7, margin:'0 0 16px'}}>The {p.name} was first completed in the late 19th century. It fell out of use in the 1970s and came into our care in 2004, by which time the roof had given way.</p>
                  <p style={{fontFamily:'TT Norms Pro', fontSize:14, lineHeight:1.7, color:'var(--ink-soft)'}}>The full restoration is documented in our Projects archive. Read <a onClick={()=>setPage('projects')} style={{color:'var(--green)', textDecoration:'underline'}}>how we got here</a>.</p>
                </div>
              )}
              {tab==='faqs' && (
                <div style={{display:'grid', gap:10}}>
                  {['Is there a washing machine?','Can I arrive early?','What is the nearest petrol station?','Is there parking on site?'].map(q => (
                    <FaqItem key={q} q={q}>Property-specific answer lives here. For general booking questions see our <a onClick={()=>setPage('faqs')} style={{color:'var(--green)', textDecoration:'underline'}}>centralised FAQs</a>.</FaqItem>
                  ))}
                </div>
              )}
            </div>

            {/* Cross-links */}
            <div style={{marginTop:48, paddingTop:32, borderTop:'1px solid var(--line-warm)', display:'flex', gap:12, flexWrap:'wrap'}}>
              <a className="btn btn--ghost btn--sm" onClick={()=>setPage('category',{categoryId:primaryCat.id})}>Explore all our {primaryCat.name} properties</a>
              {p.parent && <a className="btn btn--ghost btn--sm" onClick={()=>setPage('multi',{parentId:p.parent})}>Back to {p.parentName}</a>}
              <a className="btn btn--ghost btn--sm" onClick={()=>setPage('properties')}>Back to all properties</a>
            </div>

            {/* Head Maintainer */}
            <div style={{marginTop:32, background:'var(--cream-warm)', border:'1px solid var(--line-warm)', padding:'24px 28px', display:'grid', gridTemplateColumns:'72px 1fr auto', gap:20, alignItems:'center'}}>
              <div style={{width:72, height:72, overflow:'hidden'}}>
                <img src={pick('siobhan',1)} alt="" style={{width:'100%',height:'100%',objectFit:'cover'}}/>
              </div>
              <div>
                <div className="eyebrow" style={{color:'var(--sage)'}}>Your House Manager</div>
                <div style={{fontFamily:'Joane Stencil', fontSize:22, fontWeight:500, marginTop:4}}>Siobhán Murphy</div>
                <div style={{fontFamily:'TT Norms Pro', fontSize:14, lineHeight:1.6, color:'var(--ink-soft)', marginTop:6, maxWidth:560}}>Siobhán has looked after this building for nine years. She lives nearby, meets every guest on arrival, and knows the headland better than anyone — ask her where to find the best swim.</div>
              </div>
              <a className="btn btn--ghost btn--sm" onClick={()=>setPage('team')}>Meet the team →</a>
            </div>
          </div>

          {/* Booking rail */}
          <aside className="book-rail">
            <div className="book-rail__price">
              <span className="n">{window.ILT_CUR(p)}{p.from}</span>
              <span className="u">from · 2 nights</span>
            </div>
            <div style={{fontFamily:'TT Norms Pro', fontSize:12, color:'var(--ink-soft)', marginBottom:20}}>30% non-refundable deposit on booking, balance 12 weeks before arrival.</div>

            <BookingCalendar propId={p.id} name={p.name} onBook={()=>setPage('availability')}/>
            <div style={{marginTop:16, paddingTop:16, borderTop:'1px solid var(--line-warm)', fontFamily:'TT Norms Pro', fontSize:12, lineHeight:1.7, color:'var(--ink-soft)'}}>
              <a onClick={()=>setPage('stay')} style={{textDecoration:'underline'}}>How to book</a> · <a onClick={()=>setPage('faqs')} style={{textDecoration:'underline'}}>FAQs</a><br/>
              <a onClick={()=>setPage('stay')} style={{textDecoration:'underline'}}>Booking conditions</a> · <a onClick={()=>setPage('gift')} style={{textDecoration:'underline'}}>Use a gift voucher</a>
            </div>
            <PropMap p={p}/>
          </aside>
        </div>
      </section>

      {/* Similar */}
      <section className="featured" style={{padding:'100px 0 130px'}}>
        <div className="wrap">
          <div className="intro">
            <div><div className="eyebrow" style={{color:'var(--green)'}}>You might also stay</div></div>
            <div>
              <h2 className="display" style={{color:'var(--green-deep)'}}>Similar <em className="di">properties</em>.</h2>
              <p className="intro__sub">Matched on capacity &amp; category — not random.</p>
            </div>
          </div>
          <div className="props" style={{gridTemplateColumns:'repeat(3, 1fr)'}}>
            {similar.map(sp => <Prop key={sp.id} p={sp} onClick={()=>openProp(sp.id)}/>)}
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── AVAILABILITY CALENDAR ──────────────────────────────────────────────────
function AvailabilityPageV3({ setPage, openProp }) {
  const D = window.ILT_DATA;
  const [region, setRegion] = uS('roi');
  const [month, setMonth] = uS(new Date().getMonth());
  const year = new Date().getFullYear();
  const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
  const list = D.props.filter(p=>p.region===region);
  const status = (pid, day) => {
    const seed = pid.length + day + month;
    const v = Math.abs((Math.sin(seed*12.9898)*43758.5453) % 1);
    if (v < 0.45) return 'booked';
    if (v < 0.55) return 'partial';
    return 'open';
  };
  const days = Array.from({length:31}, (_,i)=>i+1);

  return (
    <div>
      <PageTop crumb="Explore & Stay · New" eyebrow="Availability Calendar"
        title={<>Start with <em className="di">when</em>, not where.</>}
        lede="Every property's open nights for the month, side by side. Pick a colour, jump to the property."/>
      <section className="section section--sm">
        <div className="wrap">
          <div style={{display:'flex',alignItems:'center',gap:14,marginBottom:24,flexWrap:'wrap'}}>
            <div className="view-toggle">
              {[['roi','Republic of Ireland'],['ni','Northern Ireland']].map(([k,l])=>(
                <button key={k} className={region===k?'is-active':''} onClick={()=>setRegion(k)}>{l}</button>
              ))}
            </div>
            <div style={{flex:1}}/>
            <button className="pill" onClick={()=>setMonth((month-1+12)%12)}>‹</button>
            <div style={{fontFamily:'Joane Stencil', fontSize:26, minWidth:240, textAlign:'center'}}>{months[month]} <em className="di">{year}</em></div>
            <button className="pill" onClick={()=>setMonth((month+1)%12)}>›</button>
          </div>

          <div style={{display:'flex',gap:20,marginBottom:20, fontFamily:'TT Norms Pro', fontSize:12, letterSpacing:'.15em', textTransform:'uppercase', color:'var(--sage)'}}>
            {[['open','Available','var(--mint)'],['partial','Partial','var(--ochre)'],['booked','Booked','var(--line-warm)']].map(([k,l,c])=>(
              <div key={k} style={{display:'flex',alignItems:'center',gap:8}}>
                <div style={{width:14,height:14,borderRadius:3,background:c}}/>{l}
              </div>
            ))}
          </div>

          <div className="cal-grid">
            <div className="cal-grid__header">
              <div>Property</div>
              <div className="cal-days">{days.map(d=><div key={d} style={{textAlign:'center'}}>{d}</div>)}</div>
            </div>
            {list.map((p,i)=>(
              <div key={p.id} className="cal-grid__row" onClick={()=>openProp(p.id)}>
                <div>
                  <div style={{fontFamily:'Joane Stencil', fontSize:16, fontWeight:500}}>{p.name}</div>
                  <div className="eyebrow" style={{color:'var(--sage)', fontSize:12}}>{p.location}</div>
                </div>
                <div className="cal-days">
                  {days.map(d => <div key={d} className={'cal-day cal-day--'+status(p.id,d)}/>)}
                </div>
              </div>
            ))}
          </div>

          <div style={{marginTop:20, fontFamily:'TT Norms Pro', fontSize:13, color:'var(--ink-soft)', textAlign:'center'}}>
            Click any row to view and book · Bank Holidays &amp; Christmas have set minimum-night rules.
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── YOUR STAY ──────────────────────────────────────────────────────────────
function YourStayV3({ setPage }) {
  return (
    <div>
      <PageTop crumb="Explore & Stay · New" eyebrow="Your Stay / How to Book"
        title={<>Your stay, <em className="di">explained</em>.</>}
        lede="Everything you need to know before you book, what to expect on arrival, and who to call when the fire won't light."
        dark/>

      <section className="section">
        <div className="wrap two-col">
          <div className="eyebrow" style={{color:'var(--terracotta)'}}>How to book · 4 steps</div>
          <div style={{display:'grid',gap:36}}>
            {[
              ['01','Find your stay','Use the map, the category pages, or the availability calendar.'],
              ['02','Reserve online','Bookings under 12 weeks out are paid in full; beyond that, a 30% deposit holds it.'],
              ['03','Wait for confirmation',"Your booking isn't confirmed until our Bookings Office emails — usually within one working day."],
              ['04','Arrive & enjoy','Four days before arrival, agree a meet time with your local House Manager.'],
            ].map(([n,t,c])=>(
              <div key={n} style={{display:'grid', gridTemplateColumns:'90px 1fr', gap:24, paddingBottom:32, borderBottom:'1px solid var(--line-warm)'}}>
                <div style={{fontFamily:'Joane Stencil', fontWeight: 300, fontSize:64, color:'var(--terracotta)', lineHeight:1}}>{n}</div>
                <div>
                  <h3 style={{fontFamily:'Joane Stencil', fontSize:32, margin:'0 0 10px', fontWeight:400}}>{t}</h3>
                  <p style={{fontFamily:'TT Norms Pro', fontSize:15, lineHeight:1.7, color:'var(--ink-soft)', margin:0}}>{c}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{padding:'0 0 100px'}}>
        <div className="wrap">
          <div style={{background:'var(--cream-warm)', border:'1px solid var(--line-warm)', borderRadius:18, padding:56, display:'grid', gridTemplateColumns:'1fr 1fr', gap:56}}>
            <div>
              <h2 className="display" style={{fontSize:44, margin:'0 0 16px'}}>Need a <em className="di">person?</em></h2>
              <p style={{fontFamily:'meno-banner', fontWeight: 400, fontSize:18, lineHeight:1.55, margin:'0 0 22px', color:'var(--ink-soft)'}}>Our Bookings Office answers in working hours. Best for combined bookings, accessibility queries, or big parties.</p>
              <div style={{display:'grid', gap:12, fontFamily:'TT Norms Pro', fontSize:15}}>
                <div><strong>Email</strong><br/>bookings@irishlandmark.com</div>
                <div><strong>Phone</strong><br/>+353 1 670 4733</div>
                <div><strong>Hours</strong><br/>Mon–Fri, 9.30–17.00 IST</div>
              </div>
            </div>
            <div>
              <div className="eyebrow" style={{color:'var(--sage)', marginBottom:16}}>Jump to</div>
              <div style={{display:'grid', gap:10}}>
                {[['FAQs','faqs'],['Booking Conditions','stay'],['Dog Policy','stay'],['Gift Vouchers','gift'],['Catering & Dining','stay']].map(([l,p])=>(
                  <a key={l} onClick={()=>setPage(p)} style={{display:'flex',justifyContent:'space-between', padding:'18px 22px', background:'var(--cream)', border:'1px solid var(--line-warm)', borderRadius:10, fontFamily:'Joane Stencil', fontSize:18}}>
                    {l} <span style={{color:'var(--terracotta)'}}>→</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── FAQs ───────────────────────────────────────────────────────────────────
function FAQsPageV3() {
  const groups = {
    'Booking':[
      ['How far in advance can I book?','Up to 18 months in advance for most properties.'],
      ['Do I need to pay in full up front?','Bookings within 12 weeks of stay must be paid in full. Beyond 12 weeks, a 30% non-refundable deposit holds the booking.'],
      ['Can I change my dates?','No — date changes are treated as a cancellation.'],
      ['Can I pay by bank transfer?','Credit / debit card only (Visa or Mastercard).'],
    ],
    'Your Stay':[
      ['What time is check-in?','Arrival time is agreed with your House Manager at least 4 days before arrival.'],
      ['Is there Wi-Fi?','Some properties have Wi-Fi, many do not. Assume limited mobile signal — this is often the point.'],
      ['Are candles allowed?','No candles, no smoking inside any Irish Landmark property.'],
    ],
    'Dogs':[
      ['How many dogs?','Strictly one dog per property. A charge applies and must be booked in advance.'],
      ['Where can my dog sleep?','Please bring a crate/bed. Dogs are not permitted on furniture.'],
    ],
    'Accessibility':[
      ['Are properties wheelchair accessible?','Many are historic buildings with steps and narrow doorways. Each property page lists access details.'],
    ],
  };
  return (
    <div>
      <PageTop crumb="Explore & Stay · Centralised" eyebrow="Frequently Asked"
        title={<>Frequently <em className="di">asked</em>.</>}
        lede="One place, all the common questions — pulled out of individual property pages and organised by topic."/>
      <section className="section">
        <div className="wrap--narrow">
          {Object.entries(groups).map(([k,qs])=>(
            <div key={k} style={{marginBottom:56}}>
              <div className="eyebrow" style={{color:'var(--terracotta)', marginBottom:20}}>{k}</div>
              {qs.map(([q,a],i)=>(
                <FaqItem key={i} q={q}>{a}</FaqItem>
              ))}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

// ─── CATEGORIES INDEX (overview of all 6 collections) ──────────────────────
const CAT_IMG = {
  'lighthouses':  'assets/hero-lighthouse.jpg',
  'romantic':     'assets/img-6.jpg',
  'dog-friendly': 'assets/img-3.jpg',
  'groups':       'assets/img-2.jpg',
  'city-town':    'assets/img-1.jpg',
  'itineraries':  'assets/img-4.jpg',
};

function CategoriesIndexV3({ setPage }) {
  const D = window.ILT_DATA;
  const wrapRef = React.useRef(null);

  React.useEffect(() => {
    const root = wrapRef.current;
    if (!root) return;
    const cards = root.querySelectorAll('.cat-card');
    let raf = null;
    const tick = () => {
      raf = null;
      const vh = window.innerHeight;
      const isMobile = window.innerWidth < 900;
      cards.forEach(card => {
        if (isMobile) { card.style.transform = ''; return; }
        const speed = parseFloat(card.dataset.speed || '0');
        const rect = card.getBoundingClientRect();
        const center = rect.top + rect.height / 2;
        const offset = (vh / 2 - center) * speed;
        card.style.transform = `translateY(${offset.toFixed(1)}px)`;
      });
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(tick); };
    tick();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // Editorial layout: 12-col grid, varied spans, heights, and parallax speeds
  const LAYOUTS = [
    { span:'wide',   col:'1 / 8',  h:680, speed:-0.06, mt: 0   },
    { span:'narrow', col:'8 / 13', h:520, speed: 0.10, mt: 80  },
    { span:'narrow', col:'1 / 6',  h:560, speed: 0.08, mt: 40  },
    { span:'wide',   col:'6 / 13', h:720, speed:-0.07, mt: 0   },
    { span:'narrow', col:'1 / 7',  h:580, speed:-0.09, mt: 20  },
    { span:'narrow', col:'7 / 13', h:640, speed: 0.05, mt: 60  },
  ];

  return (
    <div>
      <PageTop
        crumb="Explore & Stay"
        eyebrow="Six curated collections"
        title={<>Browse by <em className="di">collection</em>.</>}
        lede="Pick the trip you want. Lighthouses on wild coasts, gate lodges built for two, country houses for the whole party — every collection is a different way into 33 restored heritage stays."
      />
      <section className="cat-section">
        <div className="wrap">
          <div className="cat-cards" ref={wrapRef}>
            {D.categories.map((c, i) => {
              const isItinerary = c.id === 'itineraries';
              const l = LAYOUTS[i % LAYOUTS.length];
              return (
                <a key={c.id}
                  className={'cat-card cat-card--' + l.span}
                  data-speed={l.speed}
                  style={{ gridColumn: l.col, height: l.h, marginTop: l.mt }}
                  onClick={() => setPage(isItinerary ? 'stories' : 'category', isItinerary ? {} : { categoryId: c.id })}>
                  <div className="cat-card__img"><img src={CAT_IMG[c.id]} alt={c.name}/></div>
                  <div className="cat-card__shade"/>
                  <div className="cat-card__shade cat-card__shade--hover"/>
                  <div className="cat-card__inner">
                    <div className="cat-card__top">
                      <span className="cat-card__count">{c.count} {isItinerary ? 'routes' : 'properties'}</span>
                    </div>
                    <div className="cat-card__bottom">
                      <h3 className="cat-card__name">{c.name}</h3>
                      <div className="cat-card__reveal">
                        <p className="cat-card__blurb">{c.blurb}</p>
                        <span className="cat-card__cta">{isItinerary ? 'Read the itineraries →' : 'Browse the collection →'}</span>
                      </div>
                    </div>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

Object.assign(window, { PageTop, PropertiesPageV3, CategoriesIndexV3, CategoryPageV3, MultiPageV3, PropertyDetailV3, AvailabilityPageV3, YourStayV3, FAQsPageV3, pick });
