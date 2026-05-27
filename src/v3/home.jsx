// v3 Home — React port of the standalone v3 homepage
function HomeV3({ setPage, openProp }) {
  const D = window.ILT_DATA;
  const featured = ['wicklow-head','termon','kiln-wing','galley-keepers'].map(id => D.props.find(p=>p.id===id)).filter(Boolean);

  // Emanate the topographic lines when the mission section scrolls into view
  const topoRef = React.useRef(null);
  React.useEffect(() => {
    const el = topoRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => el.classList.toggle('is-visible', entry.isIntersecting),
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div>
      {/* HERO */}
      <section className="hero">
        <div className="hero__bg">
          <img src="assets/stays/p1.jpg" alt="Wicklow Head Lighthouse at sunrise"/>
        </div>
        <div className="hero__content">
          <div className="wrap">
            <div className="eyebrow hero__eyebrow">An all-island heritage charity · Est. 1992</div>
            <h1 className="display hero__title">
              <span className="hero__line"><span>Educating <em className="di">and Inspiring</em></span></span>
              <span className="hero__line"><span>one guest at a time.</span></span>
            </h1>
            <p className="hero__lede">Lighthouses, gate lodges, schoolhouses and keepers' cottages — restored, self-catering, and let as holidays to fund the next rescue.</p>

            <div className="search">
              <div className="search__cell"><div className="l">Dates</div><div className="v">Check in → Check out</div></div>
              <div className="search__cell"><div className="l">Guests</div><div className="v">2 adults</div></div>
              <label className="search__cell search__cell--toggle">
                <input type="checkbox" />
                <span className="search__toggle"><span className="dot"></span></span>
                <span className="search__toggle-label">Dog-friendly</span>
              </label>
              <button className="search__btn" onClick={()=>setPage('properties')} aria-label="Search">→</button>
            </div>
          </div>
        </div>
        <div className="late-card">
          <div className="late-card__flag"><span className="late-card__pulse"></span>Late availability</div>
          <div className="late-card__img"><img src="assets/img-4.jpg" alt="Wicklow Head Lighthouse"/></div>
          <div className="late-card__body">
            <div className="late-card__dates">This weekend · 2 nights left</div>
            <h4 className="late-card__name">Wicklow Head Lighthouse</h4>
            <div className="late-card__loc">Co. Wicklow · Sleeps 4 · Dog-friendly</div>
            <div className="late-card__row">
              <div className="late-card__price">from <strong>€540</strong></div>
              <button className="btn btn--accent btn--sm" onClick={()=>openProp('wicklow-head')}>Book now <span className="arr">→</span></button>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST — scrolling marquee */}
      <section className="trust">
        <div className="trust__track">
          {[0,1].map(dup => (
            <div className="trust__group" key={dup} aria-hidden={dup===1}>
              {['33 unique properties','34 years of restoration','All-island charity (ROI & NI)','Traditional crafts, local makers','Every stay funds the next rescue'].map((t,i)=>(
                <span className="trust__item" key={i}>{t}</span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* PILLARS */}
      <section className="section">
        <div className="wrap">
          <div className="intro">
            <div></div>
            <div>
              <h2 className="display">Browse, support, or simply <em className="di">get to know us</em>.</h2>
              <p className="intro__sub">We're a charity that runs as a holiday-let business — so the website does both jobs. Find the way in that fits why you're here.</p>
            </div>
          </div>
          <div className="pillars">
            {[
              ['01','Pillar one','Explore','& Stay','33 properties across the island. Browse by map, by category, or jump straight to availability. Every booking funds restoration.','See all properties →','properties','assets/hero-lighthouse.jpg','assets/video/explore.mp4'],
              ['02','Pillar two','Support','& Learn','Follow Saunderscourt, our flagship current project. Donate, volunteer, or sign up for our heritage skills programme.','See current projects →','projects','assets/img-6.jpg','assets/video/support.mp4'],
              ['03','Pillar three','About','us','Thirty-four years of saving what was nearly lost. Meet the team, read our governance, and see where the money goes.','Our story →','about','assets/img-5.jpg','assets/video/about.mp4'],
            ].map(([n,e,t,et,c,l,page,poster,video])=>(
              <a key={n} className="pillar" onClick={()=>setPage(page)}
                onMouseEnter={ev => { const v = ev.currentTarget.querySelector('video'); if (v) v.play().catch(()=>{}); }}
                onMouseLeave={ev => { const v = ev.currentTarget.querySelector('video'); if (v) { v.pause(); } }}>
                <video className="pillar__video" poster={poster} muted loop playsInline preload="none">
                  <source src={video} type="video/mp4"/>
                </video>
                <div className="pillar__overlay"/>
                <div className="pillar__num">{n}</div>
                <div className="pillar__content">
                  <div className="eyebrow pillar__eyebrow">{e}</div>
                  <h3>{t} <em className="di">{et}</em></h3>
                  <p>{c}</p>
                  <span className="pillar__link">{l}</span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* LABOUR OF LOVE */}
      <section className="labour">
        <svg className="topo topo--labour" viewBox="0 0 800 800" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <defs>
            <path id="topoBlobL" d="M400 140 C 545 128, 652 232, 656 360 C 660 472, 588 592, 468 646 C 378 686, 248 662, 184 560 C 118 470, 132 328, 192 244 C 252 164, 322 152, 400 140 Z"/>
          </defs>
          <g className="topo__g">
            {[1, 0.82, 0.64, 0.46, 0.28].map((s,i)=>(
              <use key={i} href="#topoBlobL" transform={`translate(400 400) scale(${s}) translate(-400 -400)`}/>
            ))}
          </g>
        </svg>
        <div className="wrap">
          <div className="labour__copy">
            <div className="eyebrow" style={{color:'var(--green)'}}>A labour of love</div>
            <h2 className="display">Behind every <em className="di">great building</em>, a great story.</h2>
            <p className="lead">As an educational charity we are passionate about knowledge-sharing with our community of heritage enthusiasts and guests.</p>
            <p>Our ability to restore heritage buildings depends on the survival of traditional craft skills and the people who carry them. Every stay you take helps keep both alive — and gives the next building a future.</p>
            <div style={{display:'flex', gap:14, marginTop:36}}>
              <a className="btn btn--dark" onClick={()=>setPage('about')}>Our history <span className="arr">→</span></a>
              <a className="btn btn--ghost" onClick={()=>setPage('about')}>How we work</a>
            </div>
          </div>
          <div className="collage">
            <svg className="collage__scribble" viewBox="0 0 200 80" fill="none">
              <path d="M 5 40 Q 50 5, 100 40 T 195 40" stroke="#1A5632" strokeWidth="2" fill="none" strokeLinecap="round"/>
            </svg>
            <img className="a" src="assets/img-5.jpg" alt=""/>
            <img className="b" src="assets/img-4.jpg" alt=""/>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="section">
        <div className="wrap">
          <div className="intro">
            <div><div className="eyebrow" style={{color:'var(--terracotta)'}}>Find your stay</div></div>
            <div>
              <h2 className="display">Find your perfect <em className="di">getaway</em>.</h2>
              <p className="intro__sub">Six curated collections — from working-era lighthouses on wild coasts to gate lodges built for two. Pick the one that matches the trip you want.</p>
            </div>
          </div>
          <div className="cats">
            {[
              ['lighthouses','Lighthouses','7 properties','assets/hero-lighthouse.jpg','cat--big'],
              ['dog-friendly','Dog-Friendly','9 properties','assets/img-3.jpg',''],
              ['city-town','City & Town','5 properties','assets/img-1.jpg',''],
              ['romantic','Romantic','8 properties','assets/img-6.jpg',''],
              ['groups','Groups','6 properties','assets/img-2.jpg',''],
            ].map(([id,n,c,img,cls])=>(
              <a key={id} className={'cat '+cls} onClick={()=>setPage('category',{categoryId:id})}>
                <img src={img} alt=""/>
                <div className="cat__label">
                  <div className="cat__count">{c}</div>
                  <div className="cat__name">{n}</div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* FEATURED */}
      <section className="featured">
        <div className="wrap">
          <div className="intro">
            <div><div className="eyebrow" style={{color:'var(--green)'}}>Curated stays</div></div>
            <div>
              <h2 className="display" style={{color:'var(--green-deep)'}}>Unique places, <em className="di" style={{color:'var(--green)'}}>handpicked</em> this season.</h2>
            </div>
          </div>
          <div className="props">
            {featured.map(p => <Prop key={p.id} p={p} onClick={()=>openProp(p.id)}/>)}
          </div>
          <div style={{textAlign:'center', marginTop:56}}>
            <a className="btn btn--ghost" onClick={()=>setPage('properties')}>View all 33 properties <span className="arr">→</span></a>
          </div>
        </div>
      </section>

      {/* MISSION */}
      <section className="mission">
        <svg className="topo" ref={topoRef} viewBox="0 0 800 800" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
          <defs>
            <path id="topoBlob" d="M400 140 C 545 128, 652 232, 656 360 C 660 472, 588 592, 468 646 C 378 686, 248 662, 184 560 C 118 470, 132 328, 192 244 C 252 164, 322 152, 400 140 Z"/>
          </defs>
          <g className="topo__wrap">
            <g className="topo__g">
              {[1, 0.82, 0.64, 0.46, 0.28].map((s,i)=>(
                <use key={i} href="#topoBlob" style={{'--i': 4 - i}} transform={`translate(400 400) scale(${s}) translate(-400 -400)`}/>
              ))}
            </g>
          </g>
        </svg>
        <div className="wrap">
          <div>
            <div className="eyebrow" style={{color:'var(--mint)'}}>Our work continues</div>
            <h2 className="display">A building <em className="di">saved</em> is a story <em className="di">kept</em>.</h2>
            <p className="mission__lede">Every stay and every donation goes directly into rescuing the next building. Saunderscourt — a pair of 1820s octagonal gate lodges in Wexford — is what we're saving now.</p>
            <div className="mission__stats">
              <div><div className="stat__n">33</div><div className="stat__l">Properties restored</div></div>
              <div><div className="stat__n">34</div><div className="stat__l">Years of work</div></div>
              <div><div className="stat__n">€2.4M</div><div className="stat__l">Saunderscourt goal</div></div>
            </div>
            <div className="mission__cta">
              <a className="btn btn--accent" onClick={()=>setPage('project',{projectId:'saunderscourt'})}>Follow Saunderscourt <span className="arr">→</span></a>
              <a className="btn btn--ghost-w" onClick={()=>setPage('donate')}>Donate</a>
            </div>
          </div>
          <div className="mission__img">
            <img src="assets/img-6.jpg" alt="Saunderscourt restoration"/>
            <div className="mission__badge">42% funded</div>
          </div>
        </div>
      </section>

      {/* STORIES */}
      <section className="stories">
        <div className="wrap">
          <div className="intro">
            <div><div className="eyebrow" style={{color:'var(--terracotta)'}}>Be inspired</div></div>
            <div>
              <h2 className="display">Stories from <em className="di">the buildings</em>.</h2>
              <p className="intro__sub">Itineraries, dog-friendly routes, lighthouse weeks — written by the people who stay.</p>
            </div>
          </div>
          <div className="stories__grid">
            {[
              ['assets/img-2.jpg','Destinations · 7 min read','Unique Stays on the Wild Atlantic Way','wild-atlantic-stays'],
              ['assets/img-3.jpg','Dog-Friendly · 6 min read','A Dog-Friendly Sligo Getaway','dog-friendly-sligo'],
              ['assets/img-1.jpg','Inspiration · 6 min read','The Best Lighthouses to Stay in This Year','best-lighthouses'],
            ].map(([img,m,t,slug])=>(
              <a key={slug} className="story" onClick={()=>setPage('story',{slug})}>
                <div className="story__img"><img src={img} alt=""/></div>
                <div className="story__meta">{m}</div>
                <h3>{t}</h3>
              </a>
            ))}
          </div>
          <div style={{textAlign:'center', marginTop:64}}>
            <a className="btn btn--ghost" onClick={()=>setPage('stories')}>View all stories <span className="arr">→</span></a>
          </div>
        </div>
      </section>

      {/* GIFT VOUCHERS */}
      <section className="gift">
        <div className="wrap gift__inner">
          <div className="gift__media">
            <img src="assets/stays/p3.jpg" alt="A Landmark gift"/>
            <div className="gift__voucher">
              <div className="gift__voucher__row">
                <span className="eyebrow" style={{color:'var(--terracotta)'}}>Gift Voucher</span>
                <span className="gift__voucher__brand">est. 1992</span>
              </div>
              <div className="gift__voucher__amt">€250</div>
              <div className="gift__voucher__foot">Redeemable against any of our 33 properties · No expiry</div>
            </div>
          </div>
          <div className="gift__body">
            <div className="eyebrow" style={{color:'var(--terracotta)'}}>Gift Vouchers</div>
            <h2 className="display">A stay, <em className="di">wrapped</em>.</h2>
            <p>Give a night in a lighthouse, or a week in a gate lodge — a present that makes memories and funds the next rescue. Choose an amount, or let them pick the place.</p>
            <div className="gift__amounts">
              {['€100','€250','€500','Any amount'].map((a,i)=>(
                <button key={a} className={'gift__chip'+(i===1?' is-active':'')} onClick={()=>setPage('gift')}>{a}</button>
              ))}
            </div>
            <a className="btn btn--accent" onClick={()=>setPage('gift')}>Buy a gift voucher <span className="arr">→</span></a>
          </div>
        </div>
      </section>

      {/* SUPPORT OUR HERITAGE — donate banner */}
      <section className="donateband">
        <div className="wrap">
          <div className="eyebrow" style={{color:'var(--mint)'}}>Support our heritage</div>
          <h2 className="display">Help us preserve <em className="di">Ireland's built heritage</em>.</h2>
          <p>Every booking and every donation goes directly into rescuing the next building for future generations.</p>
          <a className="btn btn--accent" onClick={()=>setPage('donate')}>Donate Now <span className="arr">→</span></a>
        </div>
      </section>

      {/* STAY IN TOUCH — newsletter */}
      <section className="newsband">
        <div className="wrap newsband__inner">
          <div>
            <div className="eyebrow" style={{color:'var(--terracotta)'}}>Stay in touch</div>
            <h2 className="display" style={{color:'var(--green-deep)'}}>Landmark stories, <em className="di">straight to your inbox</em>.</h2>
            <p>Quarterly. Project updates, availability alerts, the occasional book recommendation. Never anything else.</p>
          </div>
          <div>
            <div className="newsletter">
              <input type="email" placeholder="your@email"/>
              <button>Subscribe</button>
            </div>
            <div className="duo__consent">I agree to receive email marketing from the Irish Landmark Trust.</div>
          </div>
        </div>
      </section>
    </div>
  );
}

Object.assign(window, { HomeV3 });
