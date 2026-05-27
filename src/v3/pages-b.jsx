// v3 Pages — projects, project detail, about, team, governance, donate, gift, contact, stories, learn

// ─── PROJECTS LANDING ───────────────────────────────────────────────────────
function ProjectsPageV3({ setPage }) {
  return (
    <div>
      <PageTop crumb="Support & Learn · Projects" eyebrow="Rolling restoration programme"
        title={<>Rescuing, <em className="di">one roof at a time.</em></>}
        lede="Some buildings are mid-restoration right now; others are fully recovered and let as holidays — their income feeds the next rescue."
        dark/>

      <section className="section">
        <div className="wrap">
          <div className="intro">
            <div><div className="eyebrow" style={{color:'var(--terracotta)'}}>Currently underway</div></div>
            <div>
              <h2 className="display">Current <em className="di">projects</em>.</h2>
              <p className="intro__sub">One flagship, two in earlier stages, more in the pipeline — together they're what your stays are paying for.</p>
            </div>
          </div>

          <div style={{display:'grid', gridTemplateColumns:'1.4fr 1fr', gap:40, marginBottom:64}}>
            <a onClick={()=>setPage('project',{projectId:'saunderscourt'})} style={{cursor:'pointer'}}>
              <div style={{aspectRatio:'16/9', borderRadius:14, overflow:'hidden'}}>
                <img src="assets/img-6.jpg" alt="" style={{width:'100%',height:'100%',objectFit:'cover'}}/>
              </div>
              <div className="eyebrow" style={{color:'var(--terracotta)', marginTop:20}}>Flagship · Co. Wexford</div>
              <h3 style={{fontFamily:'Joane Stencil', fontSize:46, margin:'10px 0 12px', fontWeight:400}}>Saunderscourt Gate Lodges</h3>
              <p style={{fontFamily:'meno-banner', fontWeight: 400, fontSize:18, lineHeight:1.5, color:'var(--ink-soft)', margin:'0 0 20px', maxWidth:600}}>A pair of octagonal 1820s gate lodges, structurally stabilised in 2024 and now being brought back to letting standard.</p>
              <div>
                <div style={{height:8, background:'var(--cream-warm)', borderRadius:99, overflow:'hidden'}}>
                  <div style={{height:'100%', width:'42%', background:'var(--terracotta)'}}/>
                </div>
                <div className="eyebrow" style={{color:'var(--sage)', marginTop:10}}>€1.01m of €2.4m raised · 42%</div>
              </div>
            </a>

            <div style={{display:'grid', gap:18, alignContent:'start'}}>
              {[['Wicklow Head Interior','Co. Wicklow','In planning','assets/img-4.jpg'],['Termon Outbuildings','Co. Donegal','Feasibility','assets/img-2.jpg']].map(([t,l,s,img])=>(
                <div key={t} style={{background:'var(--cream-warm)', border:'1px solid var(--line-warm)', borderRadius:14, padding:'18px 20px', display:'grid', gridTemplateColumns:'120px 1fr', gap:18}}>
                  <div style={{aspectRatio:'4/3', borderRadius:8, overflow:'hidden'}}>
                    <img src={img} alt="" style={{width:'100%',height:'100%',objectFit:'cover'}}/>
                  </div>
                  <div>
                    <div className="eyebrow" style={{color:'var(--sage)'}}>{l} · {s}</div>
                    <h4 style={{fontFamily:'Joane Stencil', fontSize:22, margin:'6px 0 0', fontWeight:500}}>{t}</h4>
                  </div>
                </div>
              ))}
              <div style={{background:'var(--cream-warm)', border:'1px dashed var(--line)', borderRadius:14, padding:24, fontFamily:'TT Norms Pro', fontSize:14, lineHeight:1.6, color:'var(--ink-soft)'}}>
                <div className="eyebrow" style={{color:'var(--sage)', marginBottom:8}}>In the pipeline</div>
                Buildings we've been approached about but not yet taken on. Placeholder list managed by the ILT team.
              </div>
            </div>
          </div>

          <div style={{borderTop:'1px solid var(--line-warm)', paddingTop:56}}>
            <div className="eyebrow" style={{color:'var(--terracotta)', marginBottom:14}}>Completed</div>
            <h2 className="display" style={{fontSize:44, margin:'0 0 32px'}}>Already saved — <em className="di">and now letting.</em></h2>
            <div style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:32}}>
              {['Killee Cottage','Goggin Cottage','Schoolhouse at Annaghmore'].map((n,i)=>(
                <a key={n} style={{cursor:'pointer'}}>
                  <div style={{aspectRatio:'4/3', borderRadius:14, overflow:'hidden'}}>
                    <img src={IMGS[(i+2)%IMGS.length]} alt="" style={{width:'100%',height:'100%',objectFit:'cover'}}/>
                  </div>
                  <div className="eyebrow" style={{color:'var(--terracotta)', marginTop:14}}>Completed · now letting</div>
                  <h4 style={{fontFamily:'Joane Stencil', fontSize:26, margin:'6px 0 10px', fontWeight:400}}>{n}</h4>
                  <a style={{fontFamily:'TT Norms Pro', fontSize:12, fontWeight:600, color:'var(--green-deep)', borderBottom:'1px solid var(--green-deep)', paddingBottom:2}}>Stay here now →</a>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── PROJECT DETAIL (Saunderscourt) ─────────────────────────────────────────
function ProjectDetailV3({ projectId='saunderscourt', setPage }) {
  return (
    <div>
      <section style={{position:'relative', minHeight:640, background:'var(--green-deep)', color:'var(--cream)', overflow:'hidden'}}>
        <div style={{position:'absolute',inset:0}}>
          <img src="assets/img-6.jpg" alt="" style={{width:'100%',height:'100%',objectFit:'cover',opacity:.55}}/>
          <div style={{position:'absolute',inset:0, background:'linear-gradient(180deg,rgba(26,60,52,.35),rgba(26,60,52,.7))'}}/>
        </div>
        <div className="wrap" style={{position:'relative', padding:'180px 56px 90px'}}>
          <div className="crumb" style={{color:'var(--mint)'}}>Current Project · Co. Wexford</div>
          <h1 className="display" style={{fontSize:140, fontWeight:400, margin:'14px 0 20px', letterSpacing:'-.025em'}}>Saunderscourt<em className="di" style={{fontSize:'.9em'}}>.</em></h1>
          <p className="page-top__lede" style={{color:'rgba(251,248,246,.92)'}}>Two octagonal gate lodges, 1820, in a sycamore drive outside Enniscorthy. Roofs gone, floors gone — but the stone still true.</p>
        </div>
      </section>

      {/* Sticky fund stripe */}
      <div className="fund-stripe">
        <div className="wrap">
          <div>
            <div className="eyebrow" style={{color:'var(--mint)', opacity:.7}}>Fundraising</div>
            <div className="fund-bar">
              <div className="amt">€1,012,400</div>
              <div className="track"><div style={{width:'42%'}}></div></div>
              <div className="goal">of €2.4m goal</div>
            </div>
          </div>
          <a className="btn btn--accent" onClick={()=>setPage('donate')}>Donate</a>
          <a className="btn btn--ghost-w btn--sm">Share</a>
        </div>
      </div>

      <section className="section">
        <div className="wrap">
          <div className="two-col" style={{marginBottom:80}}>
            <div>
              <div className="eyebrow" style={{color:'var(--terracotta)'}}>Road to launch</div>
              <h2 className="display" style={{fontSize:44, margin:'16px 0 0'}}>The plan, <em className="di">in plain English.</em></h2>
            </div>
            <div>
              <p style={{fontFamily:'Joane Stencil', fontSize:20, lineHeight:1.6, margin:'0 0 20px'}}>We began at Saunderscourt in late 2024, working with Wexford County Council and a team of conservation specialists. The structural stabilisation is complete. What remains is the delicate part — roofs, chimneys, interiors — and it needs funding.</p>
              <p style={{fontFamily:'TT Norms Pro', fontSize:15, lineHeight:1.75, color:'var(--ink-soft)', margin:0}}>Once complete, both lodges will be let as self-catering holiday accommodation, with revenue ring-fenced to seed the next rescue.</p>
            </div>
          </div>

          {/* Timeline */}
          <div style={{marginBottom:80}}>
            <div className="eyebrow" style={{color:'var(--terracotta)', marginBottom:24}}>Property history &amp; timeline</div>
            <div className="timeline">
              {[
                ['c.1820','Built','Designed as matched octagonal gate lodges for the Saunders estate.'],
                ['1910','Occupied','Census records show the head gardener\'s family in the south lodge.'],
                ['1972','Abandoned','Both lodges fall out of use; roofs begin to fail within the decade.'],
                ['2024','Taken on','Gifted to the Trust; emergency stabilisation begins.'],
                ['2026','Opens','Projected opening for the first holiday guests — date depends on funding.'],
              ].map(([y,t,c])=>(
                <div key={y}>
                  <div className="yr">{y}</div>
                  <div className="t">{t}</div>
                  <div className="c">{c}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Plans */}
          <div style={{marginBottom:80}}>
            <div className="eyebrow" style={{color:'var(--terracotta)', marginBottom:20}}>Project plans</div>
            <div style={{display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:24}}>
              {[
                ['Structural','Re-bedding the stone, new slate roofs, replacement chimney pots in clay.'],
                ['Interior','Timber floors, lime-plaster walls, one bedroom per lodge, contemporary bathrooms.'],
                ['Grounds','Clearing the avenue, re-establishing the orchard, new path and lighting.'],
              ].map(([t,c])=>(
                <div key={t} style={{padding:'28px', background:'var(--cream-warm)', border:'1px solid var(--line-warm)', borderRadius:14}}>
                  <h4 style={{fontFamily:'Joane Stencil', fontSize:26, margin:'0 0 12px', fontWeight:400}}>{t}</h4>
                  <p style={{fontFamily:'TT Norms Pro', fontSize:14, lineHeight:1.7, color:'var(--ink-soft)', margin:0}}>{c}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Goals + donor recognition */}
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:32, marginBottom:80}}>
            <div style={{background:'var(--green-deep)', color:'var(--cream)', borderRadius:14, padding:40}}>
              <div className="eyebrow" style={{color:'var(--mint)', opacity:.7, marginBottom:16}}>Fundraising goals</div>
              <div style={{display:'grid', gap:16}}>
                {[['Stabilisation',100,'Complete'],['Roofs & chimneys',68,'In progress'],['Interiors',12,'Needs funding'],['Grounds',0,'Not started']].map(([t,pct,s])=>(
                  <div key={t}>
                    <div style={{display:'flex',justifyContent:'space-between',marginBottom:6, fontFamily:'TT Norms Pro', fontSize:13}}>
                      <span>{t}</span><span style={{opacity:.6, fontFamily:'TT Norms Pro', fontSize:12}}>{s}</span>
                    </div>
                    <div style={{height:6, background:'rgba(255,255,255,.1)', borderRadius:99}}>
                      <div style={{width:`${pct}%`, height:'100%', background:'var(--terracotta)', borderRadius:99}}/>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{background:'var(--cream-warm)', border:'1px solid var(--line-warm)', borderRadius:14, padding:40}}>
              <div className="eyebrow" style={{color:'var(--terracotta)', marginBottom:16}}>Donor recognition</div>
              <div>
                {[
                  ['Keystone','€50,000+','The Heritage Council · Private donor'],
                  ['Lintel','€10,000–€49,999',"O'Brien Family Trust · M. Kenny"],
                  ['Threshold','€2,500–€9,999','Eight donors listed in annual report'],
                  ['Landmarker','€250–€2,499','Published annually with consent'],
                ].map(([t,b,l])=>(
                  <div key={t} className="donor-row">
                    <div className="tier">{t}</div>
                    <div className="band">{b}</div>
                    <div className="listed">{l}</div>
                  </div>
                ))}
              </div>
              <div style={{display:'flex', gap:10, marginTop:20}}>
                <a className="btn btn--dark btn--sm" onClick={()=>setPage('donate')}>Donate →</a>
                <a className="btn btn--ghost btn--sm">Fundraising policy</a>
              </div>
            </div>
          </div>

          {/* Updates */}
          <div>
            <div className="eyebrow" style={{color:'var(--terracotta)', marginBottom:20}}>Project updates</div>
            <div style={{display:'grid', gap:18}}>
              {[
                ['11 Feb 2026','Roof timbers arrive','Oak king posts and rafters delivered by Coillte — milled from Wicklow estate trees felled last spring.'],
                ['04 Dec 2025','Grant announced','The Heritage Council confirms a €180,000 matched-funding commitment, bringing us past the halfway mark.'],
                ['22 Sep 2025','Stabilisation complete','Structural works signed off. The lodges are now watertight and stable for the winter.'],
              ].map(([d,t,c])=>(
                <div key={d} style={{display:'grid', gridTemplateColumns:'160px 1fr', gap:28, padding:'18px 0', borderBottom:'1px solid var(--line-warm)'}}>
                  <div className="eyebrow" style={{color:'var(--sage)'}}>{d}</div>
                  <div>
                    <h4 style={{fontFamily:'Joane Stencil', fontSize:22, margin:'0 0 6px', fontWeight:500}}>{t}</h4>
                    <p style={{fontFamily:'TT Norms Pro', fontSize:14, lineHeight:1.7, color:'var(--ink-soft)', margin:0}}>{c}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── ABOUT ──────────────────────────────────────────────────────────────────
function AboutPageV3({ setPage }) {
  return (
    <div>
      <PageTop crumb="About us · Our story" eyebrow="Since 1992"
        title={<>Saved, <em className="di">shared</em>, sustained.</>}
        lede="A charity with a simple idea: if we let the building pay for its own rescue, the rescue doesn't end."
        dark/>

      <section className="section">
        <div className="wrap">
          <div className="two-col">
            <div>
              <div className="eyebrow" style={{color:'var(--terracotta)'}}>Since 1992</div>
              <h2 className="display" style={{fontSize:50, margin:'16px 0 0'}}>Thirty-four <em className="di">years</em> in.</h2>
            </div>
            <div>
              <p style={{fontFamily:'Joane Stencil', fontSize:22, lineHeight:1.55, margin:'0 0 20px'}}>We were set up as an independent charity to rescue buildings that were too small to qualify for state funding and too specific to fit into the commercial market. Gate lodges. Schoolhouses. Lighthouse keepers' cottages.</p>
              <p style={{fontFamily:'TT Norms Pro', fontSize:15, lineHeight:1.75, color:'var(--ink-soft)', margin:'0 0 20px'}}>The model has stayed the same for over three decades. We take on a building, restore it using traditional materials and local craftspeople, and then let it as self-catering holiday accommodation. Guests become part of the conservation story.</p>
              <p style={{fontFamily:'TT Norms Pro', fontSize:15, lineHeight:1.75, color:'var(--ink-soft)', margin:0}}>Today we care for 33 buildings. Our work is guided by four principles: <strong>Built Heritage</strong>, <strong>Conservation</strong>, <strong>Education</strong>, <strong>Sustainable Tourism</strong>.</p>
            </div>
          </div>

          <div style={{display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:24, marginTop:80}}>
            {[
              ['Built Heritage',"The fabric of Ireland's past — at a scale the state can't always take on."],
              ['Conservation','Traditional materials, repair not replace, always respecting architectural integrity.'],
              ['Education','Learning programmes, skills apprenticeships, and open days every summer.'],
              ['Sustainable Tourism',"Stays that fund the building's upkeep — and the next one."],
            ].map(([t,c],i)=>(
              <div key={t} style={{padding:'28px 0', borderTop:'2px solid var(--terracotta)'}}>
                <div className="eyebrow" style={{color:'var(--sage)'}}>Principle 0{i+1}</div>
                <h4 style={{fontFamily:'Joane Stencil', fontSize:26, margin:'10px 0', fontWeight:400}}>{t}</h4>
                <p style={{fontFamily:'TT Norms Pro', fontSize:14, lineHeight:1.65, color:'var(--ink-soft)', margin:0}}>{c}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={{padding:'0 0 100px'}}>
        <div className="wrap">
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:32}}>
            {[
              ['Who We Are','team','The head-office team, House Managers, and the craftspeople we work with on every site.'],
              ['Governance & Funding','governance','Board of Trustees, policies, accounts and strategic plan — transparent by design.'],
            ].map(([t,p,c])=>(
              <a key={t} onClick={()=>setPage(p)} style={{background:'var(--green-deep)', color:'var(--cream)', borderRadius:14, padding:'48px 44px', cursor:'pointer', display:'block'}}>
                <div className="eyebrow" style={{color:'var(--mint)', opacity:.7}}>Keep reading</div>
                <h3 className="display" style={{fontSize:42, margin:'10px 0 14px'}}>{t} →</h3>
                <p style={{fontFamily:'TT Norms Pro', fontSize:15, lineHeight:1.7, opacity:.85, margin:0, maxWidth:440}}>{c}</p>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── TEAM ───────────────────────────────────────────────────────────────────
function TeamPageV3() {
  const team = [
    ["Niamh O'Sullivan",'Director','20 years in conservation'],
    ['Grace Kavanagh','Head of Comms & Marketing','joined 2021'],
    ['Aidan Daly','Head of Buildings','craftsperson first'],
    ['Aoife Byrne','Bookings Manager','knows every House Manager by name'],
    ['Rory MacMahon','Development Officer','fundraising & partnerships'],
    ['Lena Fox','Learning & Education Lead','heritage skills programme'],
  ];
  const managers = Array.from({length:8}, (_,i)=>[`House Manager ${i+1}`, 'Local guardian']);
  return (
    <div>
      <PageTop crumb="About us · Who we are" eyebrow="Head office & House Managers"
        title={<>A small team, <em className="di">a long list.</em></>}
        lede="The people in Dublin who keep the lights on, and the local House Managers who actually meet you on arrival."/>

      <section className="section">
        <div className="wrap">
          <div className="eyebrow" style={{color:'var(--terracotta)', marginBottom:20}}>Head office</div>
          <h2 className="display" style={{fontSize:50, margin:'0 0 48px'}}>The <em className="di">Dublin team</em>.</h2>
          <div className="team-grid">
            {team.map(([n,r,m],i)=>(
              <div key={n} className="team-card">
                <div className="ph"><img src={IMGS[i%IMGS.length]} alt="" style={{width:'100%',height:'100%',objectFit:'cover',filter:'grayscale(.2) saturate(.85)'}}/></div>
                <h4>{n}</h4>
                <div className="role">{r}</div>
                <div className="more">{m}</div>
              </div>
            ))}
          </div>

          <div style={{marginTop:90}}>
            <div className="eyebrow" style={{color:'var(--terracotta)', marginBottom:20}}>Across the island</div>
            <h2 className="display" style={{fontSize:50, margin:'0 0 24px'}}>Local <em className="di">House Managers</em>.</h2>
            <p style={{fontFamily:'meno-banner', fontWeight: 400, fontSize:19, color:'var(--ink-soft)', maxWidth:720, margin:'0 0 40px'}}>Each property has a local guardian who lives nearby, meets every guest, keeps the building in good order, and knows where to send you for a good lunch.</p>
            <div style={{display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:18}}>
              {managers.map(([n,r],i)=>(
                <div key={n} style={{background:'var(--cream-warm)', border:'1px solid var(--line-warm)', padding:18, borderRadius:10, display:'flex', gap:14, alignItems:'center'}}>
                  <div style={{width:50, height:50, borderRadius:'50%', overflow:'hidden', flexShrink:0}}>
                    <img src={IMGS[(i+2)%IMGS.length]} alt="" style={{width:'100%',height:'100%',objectFit:'cover',filter:'grayscale(.3)'}}/>
                  </div>
                  <div>
                    <div style={{fontFamily:'Joane Stencil', fontSize:16, fontWeight:500}}>{n}</div>
                    <div className="eyebrow" style={{color:'var(--sage)', fontSize:12, marginTop:3}}>{r}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── GOVERNANCE ─────────────────────────────────────────────────────────────
function GovernancePageV3() {
  const accounts = [2019,2020,2021,2022,2023,2024,2025];
  return (
    <div>
      <PageTop crumb="About us · Governance" eyebrow="Board · policies · accounts · plan"
        title={<>Transparent <em className="di">by design</em>.</>}
        lede="All in one place, updated annually, downloadable as PDF."
        dark/>

      <section className="section">
        <div className="wrap">
          <div style={{marginBottom:80}}>
            <div className="eyebrow" style={{color:'var(--terracotta)'}}>Board of Trustees</div>
            <h2 className="display" style={{fontSize:44, margin:'14px 0 32px'}}>Governance rests with <em className="di">eight trustees</em>, meeting quarterly.</h2>
            <div style={{display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:18}}>
              {['Dr. Emer Ryan (Chair)','Prof. Colm Healy','Sinead Lucey','Tomás Burke','Caroline Wade','Fergal Moriarty','Dr. Catríona Nolan','Paul Clifford'].map((n,i)=>(
                <div key={n} style={{background:'var(--cream-warm)', border:'1px solid var(--line-warm)', borderRadius:10, padding:18, display:'flex', gap:14, alignItems:'center'}}>
                  <div style={{width:44, height:44, borderRadius:'50%', overflow:'hidden'}}>
                    <img src={IMGS[(i+1)%IMGS.length]} alt="" style={{width:'100%',height:'100%',objectFit:'cover',filter:'grayscale(.2)'}}/>
                  </div>
                  <div style={{fontFamily:'Joane Stencil', fontSize:15, fontWeight:500, lineHeight:1.2}}>{n}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="policy-grid" style={{marginBottom:80}}>
            {[
              ['Fundraising Policy',"How we raise money — and what we won't accept."],
              ['Pricing / Value Statement','Why stays cost what they cost, and where revenue goes.'],
              ['Sustainability Policy','Carbon, materials, and our approach to low-impact restoration.'],
              ['Educational / Housing Policy','Our position on heritage housing, apprenticeships and schools.'],
              ['Strategic Plan 2024–2027','Our next five-year direction — embedded PDF, fully searchable.'],
              ['Safeguarding','Policies for guests, volunteers and staff.'],
            ].map(([t,c])=>(
              <div key={t} className="policy-card">
                <div>
                  <h4>{t}</h4>
                  <p>{c}</p>
                </div>
                <a className="btn btn--ghost btn--sm">PDF</a>
              </div>
            ))}
          </div>

          <div>
            <div className="eyebrow" style={{color:'var(--terracotta)', marginBottom:14}}>Annual accounts</div>
            <h3 className="display" style={{fontSize:36, margin:'0 0 28px'}}>Seven years, <em className="di">downloadable</em>.</h3>
            <div style={{display:'grid', gridTemplateColumns:'repeat(7,1fr)', gap:10}}>
              {accounts.map(y=>(
                <div key={y} style={{padding:'24px 16px', background:'var(--cream-warm)', border:'1px solid var(--line-warm)', borderRadius:10, textAlign:'center', cursor:'pointer'}}>
                  <div style={{fontFamily:'Joane Stencil', fontWeight: 300, fontSize:32, fontWeight:300}}>{y}</div>
                  <div className="eyebrow" style={{color:'var(--sage)', marginTop:6, fontSize:12}}>ROI · NI PDFs</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── DONATE ─────────────────────────────────────────────────────────────────
function DonatePageV3({ setPage }) {
  const [amt,setAmt] = React.useState(100);
  return (
    <section style={{background:'var(--green-deep)', color:'var(--cream)', minHeight:'calc(100vh - 71px)', paddingTop:140}}>
      <div className="wrap" style={{padding:'80px 56px', display:'grid', gridTemplateColumns:'1fr 1fr', gap:80, alignItems:'center'}}>
        <div>
          <div className="eyebrow" style={{color:'var(--terracotta)'}}>Support & Learn</div>
          <h1 className="display" style={{fontSize:110, lineHeight:.95, margin:'14px 0 20px', fontWeight:400, letterSpacing:'-.02em'}}>Give the past <em className="di">a future</em>.</h1>
          <p style={{fontFamily:'meno-banner', fontWeight: 400, fontSize:22, opacity:.88, margin:0, maxWidth:560}}>100% of donations go directly into restoration. Saunderscourt is our current priority.</p>
          <a onClick={()=>setPage('projects')} style={{fontFamily:'TT Norms Pro', fontSize:12, fontWeight:600, color:'var(--cream)', borderBottom:'1px solid var(--cream)', paddingBottom:2, marginTop:28, display:'inline-block'}}>See current projects →</a>
        </div>
        <div style={{background:'var(--cream)', color:'var(--ink)', borderRadius:18, padding:48}}>
          <div className="eyebrow" style={{color:'var(--terracotta)', marginBottom:12}}>Make a donation</div>
          <h2 className="display" style={{fontSize:40, margin:'0 0 20px'}}>Choose an <em className="di">amount</em></h2>
          <div style={{display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:10, marginBottom:14}}>
            {[25,50,100,250,500,1000].map(v=>(
              <button key={v} onClick={()=>setAmt(v)} style={{padding:'14px 0', fontFamily:'Joane Stencil', fontSize:22, background:amt===v?'var(--green-deep)':'var(--cream)', color:amt===v?'var(--cream)':'var(--ink)', border:'1px solid var(--line)', borderRadius:10, fontWeight:500}}>€{v}</button>
            ))}
          </div>
          <input type="number" value={amt} onChange={e=>setAmt(+e.target.value)} style={{width:'100%', padding:'16px 18px', fontFamily:'Joane Stencil', fontSize:22, border:'1px solid var(--line)', borderRadius:10, marginBottom:20, background:'var(--cream)'}}/>
          <label style={{display:'flex', alignItems:'flex-start', gap:10, marginBottom:20, fontFamily:'TT Norms Pro', fontSize:13, color:'var(--ink-soft)', lineHeight:1.5}}>
            <input type="checkbox" defaultChecked style={{marginTop:3, accentColor:'var(--terracotta)'}}/>Make it monthly — ongoing restoration needs ongoing support.
          </label>
          <button className="btn btn--accent" style={{width:'100%', justifyContent:'center', padding:'18px 26px'}}>Donate €{amt}</button>
          <div className="eyebrow" style={{color:'var(--sage)', marginTop:16, textAlign:'center'}}>Tax-efficient · ROI CHY 12942 · Gift Aid eligible</div>
        </div>
      </div>
    </section>
  );
}

// ─── GIFT ───────────────────────────────────────────────────────────────────
function GiftPageV3() {
  return (
    <div>
      <section style={{padding:'160px 0 100px'}}>
        <div className="wrap" style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:80, alignItems:'center'}}>
          <div>
            <div className="eyebrow" style={{color:'var(--terracotta)'}}>Gift Vouchers</div>
            <h1 className="display" style={{fontSize:96, lineHeight:.98, margin:'14px 0 20px', fontWeight:400, letterSpacing:'-.02em'}}>A stay, <em className="di">wrapped</em>.</h1>
            <p style={{fontFamily:'meno-banner', fontWeight: 400, fontSize:22, lineHeight:1.5, color:'var(--ink-soft)', margin:'0 0 30px'}}>Give a night in a lighthouse. Or a week in a gatelodge. A voucher redeemable against any of our 33 properties.</p>
            <div style={{display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:10, marginBottom:20}}>
              {[100,200,500,1000].map(v=>(
                <div key={v} style={{padding:'18px 0', border:'1px solid var(--line)', textAlign:'center', background:'var(--cream-warm)', cursor:'pointer'}}>
                  <div style={{fontFamily:'Joane Stencil', fontSize:28}}>€{v}</div>
                </div>
              ))}
            </div>
            <button className="btn btn--accent">Buy a voucher <span className="arr">→</span></button>
            <div style={{fontFamily:'TT Norms Pro', fontSize:13, color:'var(--ink-soft)', marginTop:18}}>Corporate gifting available · bulk discounts for orders over 20 vouchers.</div>
          </div>
          <div style={{aspectRatio:'4/5', overflow:'hidden'}}>
            <img src="assets/img-4.jpg" alt="" style={{width:'100%',height:'100%',objectFit:'cover'}}/>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── CONTACT ────────────────────────────────────────────────────────────────
function ContactPageV3() {
  return (
    <div>
      <PageTop eyebrow="Contact" title={<>Get in <em className="di">touch</em>.</>}
        lede="Bookings, donations, press, or just a question about an old door — we'd love to hear from you."/>
      <section className="section">
        <div className="wrap">
          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:60}}>
            <div style={{display:'grid', gap:30, fontFamily:'TT Norms Pro', fontSize:16, lineHeight:1.7}}>
              <div><strong style={{fontFamily:'Joane Stencil', fontSize:22, fontWeight:500}}>Bookings</strong><br/>bookings@irishlandmark.com<br/>+353 1 670 4733</div>
              <div><strong style={{fontFamily:'Joane Stencil', fontSize:22, fontWeight:500}}>General enquiries</strong><br/>info@irishlandmark.com</div>
              <div><strong style={{fontFamily:'Joane Stencil', fontSize:22, fontWeight:500}}>Development / donations</strong><br/>rory@irishlandmark.com</div>
              <div><strong style={{fontFamily:'Joane Stencil', fontSize:22, fontWeight:500}}>Head office</strong><br/>25 Eustace Street<br/>Temple Bar, Dublin 2<br/>D02 WX58</div>
            </div>
            <form style={{background:'var(--cream-warm)', border:'1px solid var(--line-warm)', borderRadius:14, padding:'36px 40px', display:'grid', gap:16}}>
              {[['Name','text'],['Email','email'],['Subject','text']].map(([l,t])=>(
                <label key={l}>
                  <div className="eyebrow" style={{color:'var(--sage)', marginBottom:6}}>{l}</div>
                  <input type={t} style={{width:'100%', padding:'12px 16px', fontFamily:'TT Norms Pro', fontSize:15, background:'var(--cream)', border:'1px solid var(--line)', borderRadius:10, outline:'none'}}/>
                </label>
              ))}
              <label>
                <div className="eyebrow" style={{color:'var(--sage)', marginBottom:6}}>Message</div>
                <textarea rows="5" style={{width:'100%', padding:'12px 16px', fontFamily:'TT Norms Pro', fontSize:15, background:'var(--cream)', border:'1px solid var(--line)', borderRadius:10, outline:'none', resize:'vertical'}}/>
              </label>
              <button type="button" className="btn btn--accent" style={{justifySelf:'start'}}>Send</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── STORIES ────────────────────────────────────────────────────────────────
// Shared journal data — used by the listing and the article template
const STORIES = [
  { slug:'dog-friendly-sligo', title:'A Dog-Friendly Sligo Getaway', cat:'Dog-Friendly · Guides', tag:'Dog-Friendly', author:'Aoife Byrne', date:'12 May 2026', read:6,
    dek:'Wide empty strands, woodland paths and a turf fire to come home to — why Sligo might be the best long weekend you and the dog will have all year.' },
  { slug:'saunderscourt-progress', title:'Progress at Saunderscourt Gate Lodges', cat:'News', tag:'News', author:'Aidan Daly', date:'2 May 2026', read:4,
    dek:'The roofs are on. A field update from Wexford on our flagship restoration — what changed this spring, and what comes next.' },
  { slug:'loop-head-7-nights', title:'7 Nights at Loop Head Lighthouse', cat:'Guides', tag:'Guides', author:'Rory MacMahon', date:'24 Apr 2026', read:8,
    dek:'A week at the edge of Clare: where to walk, where to eat, and how to fill seven slow evenings under one of Ireland’s great lights.' },
  { slug:'romantic-weekend', title:'A Romantic Couples Weekend in Ireland', cat:'Romantic Escapes', tag:'Romantic', author:'Grace Kavanagh', date:'18 Apr 2026', read:5,
    dek:'Gate lodges built for two, a fire, and nowhere in particular to be. Our pick of the most intimate stays on the island.' },
  { slug:'heritage-week-2025', title:'National Heritage Week 2025', cat:'News', tag:'News', author:'Niamh O’Sullivan', date:'9 Apr 2026', read:3,
    dek:'Open days, free tours and craft demonstrations across our buildings this August. Here’s where to find us.' },
  { slug:'wild-atlantic-stays', title:'Unique Stays on the Wild Atlantic Way', cat:'Destinations', tag:'Destinations', author:'Rory MacMahon', date:'1 Apr 2026', read:7,
    dek:'Three lightkeepers’ houses, one extraordinary coast road. How to string them into a single unforgettable drive.' },
  { slug:'best-lighthouses', title:'The Best Lighthouses to Stay in This Year', cat:'Inspiration', tag:'Inspiration', author:'Aoife Byrne', date:'21 Mar 2026', read:6,
    dek:'From Antrim to Clare, the keepers’ houses our guests return to again and again — and what makes each one worth the trip.' },
  { slug:'heritage-skills', title:'Inside the All-Ireland Heritage Skills Programme', cat:'Learning', tag:'Learning', author:'Lena Fox', date:'14 Mar 2026', read:5,
    dek:'Lime mortar, sash windows and hand-cut slate — meet the apprentices keeping the trades that keep our buildings standing.' },
  { slug:'tullymurry-4-stars', title:'Tullymurry House Awarded Four Stars', cat:'News', tag:'News', author:'Grace Kavanagh', date:'6 Mar 2026', read:3,
    dek:'A milestone for our largest Down property. What the rating means, and why it matters for the buildings still to come.' },
];
const storyImg = (slug) => IMGS[(slug.charCodeAt(0) + slug.length) % IMGS.length];

function StoriesPageV3({ setPage }) {
  const cats = ['All','Destinations','Dog-Friendly','Guides','Inspiration','Learning','News','Romantic'];
  const [active, setActive] = React.useState(0);
  const filtered = active === 0 ? STORIES : STORIES.filter(s => s.cat.toLowerCase().includes(cats[active].toLowerCase()));
  const open = (s) => setPage('story', { slug: s.slug });
  return (
    <div>
      <PageTop crumb="Stories & News" eyebrow="The journal"
        title={<>Stories from <em className="di">the buildings</em>.</>}
        lede="Itineraries, dog-friendly routes, lighthouse weeks, project updates — written by the people who stay."/>
      <div style={{background:'var(--cream)', borderBottom:'1px solid var(--line-warm)', padding:'24px 0'}}>
        <div className="wrap" style={{display:'flex', gap:8, flexWrap:'wrap'}}>
          {cats.map((c,i)=>(<button key={c} className={'pill '+(active===i?'is-active':'')} onClick={()=>setActive(i)}>{c}</button>))}
        </div>
      </div>
      <section className="section">
        <div className="wrap">
          <div style={{display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:32}}>
            {filtered.map((s,i)=>(
              <a key={s.slug} className="story" onClick={()=>open(s)}>
                <div className="story__img" style={{aspectRatio: i%3===1?'4/3.5':(i%3===2?'4/4.5':'4/5')}}>
                  <img src={storyImg(s.slug)} alt=""/>
                </div>
                <div className="story__meta">{s.cat} · {s.read} min read</div>
                <h3>{s.title}</h3>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── ARTICLE / BLOG POST TEMPLATE ────────────────────────────────────────────
function StoryDetailV3({ slug='dog-friendly-sligo', setPage }) {
  const story = STORIES.find(s => s.slug === slug) || STORIES[0];
  const related = STORIES.filter(s => s.slug !== story.slug).slice(0, 3);
  const topic = story.title.replace(/^(A|The|7|National)\s+/, '');
  return (
    <div>
      <section className="article-hero">
        <div className="wrap">
          <div className="crumb"><a onClick={()=>setPage('stories')}>Stories &amp; News</a> &nbsp;/&nbsp; {story.cat}</div>
          <div className="eyebrow" style={{color:'var(--terracotta)'}}>{story.cat}</div>
          <h1>{story.title}</h1>
          <p className="article-dek">{story.dek}</p>
          <div className="article-byline">
            <div className="article-byline__av"/>
            <div>
              <div className="article-byline__name">By {story.author}</div>
              <div className="article-byline__meta">{story.date} · {story.read} min read</div>
            </div>
          </div>
        </div>
      </section>

      <div className="wrap">
        <figure className="article-figure"><img src={storyImg(story.slug)} alt={story.title}/></figure>
      </div>

      <article className="article-body">
        <p className="lead-para">{story.dek}</p>

        <p>There is a particular kind of quiet you only find in a building that has stood for two hundred years. It settles over you in the first hour — a sense that the walls have seen more weather than you ever will, and intend to see plenty more. {topic} begins, as most of our favourite stays do, with that quiet.</p>

        <p>The Irish Landmark Trust looks after places the wider world had nearly given up on: lightkeepers’ houses on exposed headlands, gate lodges no bigger than a generous sitting room, schoolhouses and mills and follies. Each one was rescued because it was worth rescuing, restored with traditional materials and trades, and then — crucially — opened up so people can actually stay in it. This is one of those stories.</p>

        <h2>Why it’s worth the trip</h2>
        <p>Lorem ipsum aside, the appeal here is genuinely simple. You get a building with a real past, a setting most hotels would sell their lobby for, and the rare luxury of having the whole place to yourself. No corridors, no key cards, no breakfast buffet — just a front door that is, for a few nights, entirely yours.</p>
        <p>Our House Managers live locally and meet every guest on arrival. They’ll point you to the good beach over the obvious one, the pub with the fire lit, the walk that looks like nothing on the map and turns out to be the whole reason you came. Ask them anything; knowing the answer is the part of the job they like best.</p>

        <blockquote>“A building saved is a story kept — and every guest who stays writes the next chapter of it.”</blockquote>

        <h2>What to expect</h2>
        <ul>
          <li>A fully self-catering stay — bring the food, we’ll supply the setting (and a very good kitchen).</li>
          <li>Heritage interiors furnished in keeping with the building, never themed or twee.</li>
          <li>A welcome folder of local knowledge written by the people who live there.</li>
          <li>Two-night minimum stays, with longer weeks rewarding the slow traveller.</li>
        </ul>

        <p>Every booking does double duty: it gives you somewhere extraordinary to sleep, and it funds the next rescue. The income from stays like this one is quite literally how the next roof goes back on. It is, we think, the most enjoyable way anyone has ever supported a building conservation charity.</p>

        <h2>Before you go</h2>
        <p>Pack layers, charge nothing in particular, and leave a little room in the schedule for doing absolutely nothing. The best part of {topic} is rarely on the itinerary — it’s the second cup of tea by the window while the weather does something dramatic outside.</p>
        <p>When you’re ready, the whole collection is a click away. Find dates, pick a building, and come write the next chapter.</p>

        <div className="article-cta">
          <a className="btn btn--accent" onClick={()=>setPage('properties')}>Browse all properties <span className="arr">→</span></a>
          <a className="btn btn--ghost" onClick={()=>setPage('stories')}>Back to all stories</a>
        </div>
      </article>

      <section className="section--sm" style={{background:'var(--cream-warm)', borderTop:'1px solid var(--line-warm)'}}>
        <div className="wrap">
          <div className="eyebrow" style={{color:'var(--terracotta)', marginBottom:24}}>Keep reading</div>
          <div style={{display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:32}}>
            {related.map(s=>(
              <a key={s.slug} className="story" onClick={()=>setPage('story',{slug:s.slug})}>
                <div className="story__img" style={{aspectRatio:'4/3'}}><img src={storyImg(s.slug)} alt=""/></div>
                <div className="story__meta">{s.cat} · {s.read} min read</div>
                <h3>{s.title}</h3>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

// ─── LEARN ──────────────────────────────────────────────────────────────────
function LearnPageV3() {
  return (
    <div>
      <PageTop crumb="Support & Learn" eyebrow="Learning programme"
        title={<>Learning with <em className="di">Landmark</em>.</>}
        lede="As an educational charity we run seminars, webinars and an annual Heritage Skills Programme for apprentice craftspeople."/>
      <section className="section">
        <div className="wrap">
          <div style={{display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:28}}>
            {[
              ['Heritage Skills Programme','Annual apprenticeship · applications open September'],
              ['Open Days','Every August during National Heritage Week'],
              ['Webinars & Seminars','Quarterly · free · recorded for later'],
            ].map(([t,m],i)=>(
              <div key={t} style={{background:'var(--cream-warm)', border:'1px solid var(--line-warm)', borderRadius:14, overflow:'hidden'}}>
                <div style={{aspectRatio:'4/3'}}><img src={IMGS[(i+4)%IMGS.length]} alt="" style={{width:'100%',height:'100%',objectFit:'cover'}}/></div>
                <div style={{padding:'24px 28px'}}>
                  <div className="eyebrow" style={{color:'var(--terracotta)'}}>{m}</div>
                  <h3 style={{fontFamily:'Joane Stencil', fontSize:26, margin:'8px 0 0', fontWeight:400}}>{t}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

Object.assign(window, { ProjectsPageV3, ProjectDetailV3, AboutPageV3, TeamPageV3, GovernancePageV3, DonatePageV3, GiftPageV3, ContactPageV3, StoriesPageV3, StoryDetailV3, LearnPageV3 });
