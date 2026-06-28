import React, { useEffect, useMemo, useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import heroAstypalaia from './assets/astypalaia-hero.png'
import portAstypalaia from './assets/astypalaia-port.png'

const supabase = createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY)

const LANG = [
  ['el','🇬🇷 Ελληνικά'],['en','🇬🇧 English'],['de','🇩🇪 Deutsch'],['fr','🇫🇷 Français'],['it','🇮🇹 Italiano'],['es','🇪🇸 Español']
]

const TEXT = {
  el: {
    home:'Αρχική', island:'Το Νησί', beaches:'Παραλίες', attractions:'Αξιοθέατα', restaurants:'Εστιατόρια', coffee:'Καφέ & Μπαρ', transport:'Μετακινήσεις', useful:'Χρήσιμες Πληροφορίες', emergency:'Χρήσιμα Τηλέφωνα', map:'Χάρτης', contact:'Επικοινωνία', events:'Ημερολόγιο Εκδηλώσεων', accommodation:'Διαμονή', reviews:'Αξιολογήστε μας', social:'Ακολουθήστε μας',
    welcome:'Καλωσήρθατε στα Saris Rooms!', intro:'Ο απόλυτος οδηγός για να γνωρίσετε την Αστυπάλαια και να απολαύσετε κάθε στιγμή της διαμονής σας.', islandDesc:'Γενικές πληροφορίες για την Αστυπάλαια', beachesDesc:'Ανακαλύψτε τις πιο όμορφες παραλίες', attractionsDesc:'Τα σημεία που δεν πρέπει να χάσετε', restaurantsDesc:'Προτάσεις για φαγητό στο νησί', coffeeDesc:'Τα καλύτερα στέκια για καφέ και ποτό', transportDesc:'Μετακινήσεις στο νησί, ταξί, ενοικιάσεις', usefulDesc:'Τηλέφωνα, φαρμακεία, κέντρα υγείας και άλλα', emergencyDesc:'Έκτακτα και χρήσιμα τηλέφωνα του νησιού', mapDesc:'Δείτε τον χάρτη της Αστυπάλαιας', eventsDesc:'Δείτε τις τοπικές εκδηλώσεις και πανηγύρια που θα πραγματοποιηθούν κατά τη διάρκεια της διαμονής σας.', seeEvents:'Δείτε το Ημερολόγιο', accommodationContact:'Επικοινωνία Καταλύματος', follow:'Ακολουθήστε μας', whatsapp:'Μήνυμα στο WhatsApp', sunny:'Ηλιοφάνεια', astypalaia:'Αστυπάλαια', back:'Πίσω', call:'Κλήση', directions:'Οδηγίες', open:'Άνοιγμα', wifi:'Wi‑Fi', check:'Check‑in / Check‑out', house:'Οδηγίες Διαμονής', admin:'Admin', login:'Σύνδεση', logout:'Αποσύνδεση', save:'Αποθήκευση', add:'Προσθήκη', delete:'Διαγραφή', saved:'Αποθηκεύτηκε', noContent:'Δεν υπάρχει ακόμη περιεχόμενο.', copy:'Αντιγραφή', copied:'Αντιγράφηκε', properties:'Κατάλυμα', places:'Περιεχόμενο', active:'Ενεργό', googleReviews:'Google Reviews', bookingReviews:'Booking Reviews', airbnbReviews:'Airbnb Reviews', instagram:'Instagram', facebook:'Facebook', tiktok:'TikTok', website:'Website', stayDesc:'Wi‑Fi, Check-in/out, κανόνες σπιτιού και χρήσιμες πληροφορίες', reviewDesc:'Google, Booking.com και Airbnb Reviews', socialDesc:'Instagram, Facebook, TikTok και WhatsApp', updated:'Τελευταία ενημέρωση', today:'σήμερα'
  },
  en: {
    home:'Home', island:'The Island', beaches:'Beaches', attractions:'Attractions', restaurants:'Restaurants', coffee:'Cafés & Bars', transport:'Transport', useful:'Useful Info', emergency:'Useful Phones', map:'Map', contact:'Contact', events:'Events Calendar', accommodation:'Stay', reviews:'Review us', social:'Follow us',
    welcome:'Welcome to Saris Rooms!', intro:'Your complete guide to discover Astypalaia and enjoy every moment of your stay.', islandDesc:'General information about Astypalaia', beachesDesc:'Discover the most beautiful beaches', attractionsDesc:'Places you should not miss', restaurantsDesc:'Food recommendations on the island', coffeeDesc:'Best spots for coffee and drinks', transportDesc:'Taxi, car rentals and transport', usefulDesc:'Phones, pharmacies, health center and more', emergencyDesc:'Emergency and useful island numbers', mapDesc:'View Astypalaia map', eventsDesc:'See local events and festivals during your stay.', seeEvents:'View Calendar', accommodationContact:'Property Contact', follow:'Follow us', whatsapp:'Message on WhatsApp', sunny:'Sunny', astypalaia:'Astypalaia', back:'Back', call:'Call', directions:'Directions', open:'Open', wifi:'Wi‑Fi', check:'Check‑in / Check‑out', house:'Stay Instructions', admin:'Admin', login:'Login', logout:'Logout', save:'Save', add:'Add', delete:'Delete', saved:'Saved', noContent:'No content yet.', copy:'Copy', copied:'Copied', properties:'Property', places:'Content', active:'Active', googleReviews:'Google Reviews', bookingReviews:'Booking Reviews', airbnbReviews:'Airbnb Reviews', instagram:'Instagram', facebook:'Facebook', tiktok:'TikTok', website:'Website', stayDesc:'Wi‑Fi, Check-in/out, κανόνες σπιτιού και χρήσιμες πληροφορίες', reviewDesc:'Google, Booking.com και Airbnb Reviews', socialDesc:'Instagram, Facebook, TikTok και WhatsApp', updated:'Τελευταία ενημέρωση', today:'σήμερα'
  }
}
function t(lang, key){ return TEXT[lang]?.[key] || TEXT.en[key] || TEXT.el[key] || key }

const DEFAULT_PROPERTY = {
  slug:'saris-rooms', name:'Saris Rooms', location:'Πέρα Γιαλός, Αστυπάλαια',
  welcome_title:'Καλωσήρθατε στα Saris Rooms!', welcome_text:'Ο απόλυτος οδηγός για να γνωρίσετε την Αστυπάλαια και να απολαύσετε κάθε στιγμή της διαμονής σας.',
  hero_image_url:'https://images.unsplash.com/photo-1603565816030-6b389eeb23cb?auto=format&fit=crop&w=1800&q=85',
  logo_url:'', wifi_name:'Saris Rooms WiFi', wifi_password:'', checkin:'15:00', checkout:'11:00',
  house_rules:'Παρακαλούμε σεβαστείτε τις ώρες κοινής ησυχίας.\nΚλείνετε τα κλιματιστικά όταν απουσιάζετε.\nΓια οποιαδήποτε ανάγκη επικοινωνήστε μαζί μας.',
  phone_1:'6979019645', phone_2:'', viber_phone:'306979019645', email:'saris.rooms.astypalaia@gmail.com',
  map_url:'https://www.google.com/maps/search/?api=1&query=Saris+Rooms+Pera+Gialos+Astypalaia',
  facebook_url:'', instagram_url:'', tiktok_url:'', website_url:'', google_review_url:'', booking_review_url:'', airbnb_review_url:'', active:true
}
const HERO_FALLBACK = heroAstypalaia
const PORT_IMAGE = portAstypalaia

const NAV = [
  ['home','🏠','home'],['accommodation','🛏️','accommodation'],['island','ⓘ','island'],['beaches','≋','beaches'],['attractions','📷','attractions'],['restaurants','🍴','restaurants'],['coffee','☕','coffee'],['transport','🚗','transport'],['useful','ⓘ','useful'],['emergency','112','emergency'],['map','🗺️','map'],['contact','📞','contact'],['reviews','⭐','reviews'],['social','📱','social']
]
const CARDS = [
  ['accommodation','🛏️','accommodation','stayDesc'],['island','i','island','islandDesc'],['beaches','≋','beaches','beachesDesc'],['attractions','📷','attractions','attractionsDesc'],['restaurants','🍴','restaurants','restaurantsDesc'],['coffee','☕','coffee','coffeeDesc'],['transport','🚗','transport','transportDesc'],['useful','i','useful','usefulDesc'],['emergency','112','emergency','emergencyDesc'],['map','🗺️','map','mapDesc'],['reviews','★','reviews','reviews'],['social','◎','social','social']
]
const CATEGORY_MAP = { island:['island'], beaches:['beaches'], attractions:['attractions','discover'], restaurants:['restaurants','souvlaki','pizza'], coffee:['coffee','bakery'], transport:['transport','rentals'], useful:['useful','airport','port','weather'], emergency:['emergency'] }

function cleanPhone(v=''){ return String(v||'').replace(/[^0-9+]/g,'') }
function normalizeCategory(c=''){ return String(c||'').trim().toLowerCase() }
function onlyWritableProperty(row){
  const keys=['slug','name','location','welcome_title','welcome_text','hero_image_url','logo_url','wifi_name','wifi_password','checkin','checkout','house_rules','phone_1','phone_2','viber_phone','email','map_url','facebook_url','instagram_url','tiktok_url','website_url','google_review_url','airbnb_review_url','booking_review_url','active']
  return Object.fromEntries(keys.map(k=>[k,row[k] ?? '']))
}
function onlyWritablePlace(row){
  return { category:normalizeCategory(row.category), name:row.name||'', description:row.description||'', phone:row.phone||'', map_url:row.map_url||'', url:row.url||'', sort_order:Number(row.sort_order||0), active:row.active!==false, is_global:true }
}

const WEATHER_CODES = {
  0:{el:'Αίθριος',en:'Clear',icon:'☀️'},1:{el:'Κυρίως αίθριος',en:'Mostly clear',icon:'🌤️'},2:{el:'Μερική συννεφιά',en:'Partly cloudy',icon:'⛅'},3:{el:'Συννεφιά',en:'Cloudy',icon:'☁️'},
  45:{el:'Ομίχλη',en:'Fog',icon:'🌫️'},48:{el:'Ομίχλη',en:'Fog',icon:'🌫️'},51:{el:'Ψιλόβροχο',en:'Drizzle',icon:'🌦️'},53:{el:'Ψιλόβροχο',en:'Drizzle',icon:'🌦️'},55:{el:'Ψιλόβροχο',en:'Drizzle',icon:'🌦️'},
  61:{el:'Βροχή',en:'Rain',icon:'🌧️'},63:{el:'Βροχή',en:'Rain',icon:'🌧️'},65:{el:'Δυνατή βροχή',en:'Heavy rain',icon:'🌧️'},80:{el:'Μπόρες',en:'Showers',icon:'🌦️'},81:{el:'Μπόρες',en:'Showers',icon:'🌦️'},82:{el:'Δυνατές μπόρες',en:'Heavy showers',icon:'🌧️'},95:{el:'Καταιγίδα',en:'Thunderstorm',icon:'⛈️'}
}
function useAstypalaiaWeather(lang){
  const [weather,setWeather]=useState({temp:null, label:null, icon:'☀️', time:null})
  useEffect(()=>{
    let cancelled=false
    async function run(){
      try{
        const r=await fetch('https://api.open-meteo.com/v1/forecast?latitude=36.55&longitude=26.35&current=temperature_2m,weather_code&timezone=Europe%2FAthens')
        const j=await r.json()
        const code=j?.current?.weather_code
        const meta=WEATHER_CODES[code]||WEATHER_CODES[0]
        if(!cancelled)setWeather({temp:Math.round(j.current.temperature_2m), label:meta[lang]||meta.el, icon:meta.icon, time:j.current.time})
      }catch(e){ if(!cancelled)setWeather({temp:null,label:lang==='en'?'Weather':'Καιρός',icon:'🌤️',time:null}) }
    }
    run()
    const id=setInterval(run,30*60*1000)
    return ()=>{cancelled=true; clearInterval(id)}
  },[lang])
  return weather
}
function fmtWeatherTime(value){
  if(!value)return ''
  try{return new Date(value).toLocaleTimeString('el-GR',{hour:'2-digit',minute:'2-digit'})}catch{return ''}
}

function groupedItems(places, key){
  const cats=CATEGORY_MAP[key]||[key]
  return places.filter(p=>p.active!==false && cats.includes(normalizeCategory(p.category))).sort((a,b)=>(a.sort_order||0)-(b.sort_order||0))
}

export default function App(){
  const [lang,setLang]=useState(localStorage.getItem('saris_lang')||'el')
  const L = ['el','en'].includes(lang) ? lang : 'el'
  const [screen,setScreen]=useState('home')
  const [property,setProperty]=useState(DEFAULT_PROPERTY)
  const [properties,setProperties]=useState([DEFAULT_PROPERTY])
  const [places,setPlaces]=useState([])
  const [admin,setAdmin]=useState(false)
  const [toast,setToast]=useState('')

  useEffect(()=>{ localStorage.setItem('saris_lang', L) },[L])
  useEffect(()=>{ load() },[])

  async function load(){
    try{
      const [{data:props,error:pe},{data:pls,error:ple}] = await Promise.all([
        supabase.from('properties').select('*').order('name'),
        supabase.from('guide_places').select('*').order('category').order('sort_order')
      ])
      if(pe) console.warn(pe); if(ple) console.warn(ple)
      if(props?.length){ setProperties(props); setProperty(props.find(p=>p.slug==='saris-rooms') || props[0]) }
      if(pls) setPlaces(pls)
    }catch(e){ console.warn(e) }
  }
  function copy(v){ navigator.clipboard?.writeText(v||''); setToast(t(L,'copied')); setTimeout(()=>setToast(''),1200) }
  if(admin) return <Admin lang={L} setAdmin={setAdmin} properties={properties} places={places} reload={load}/>
  return <div className="sr-app">
    <Sidebar lang={L} setLang={setLang} screen={screen} setScreen={setScreen} property={property}/>
    <main className="sr-main">
      {screen==='home' ? <Home lang={L} property={property} setScreen={setScreen}/> : <Section lang={L} screen={screen} property={property} places={places} setScreen={setScreen} copy={copy}/>}      
      <footer className="sr-footer">© 2025 Saris Rooms Astypalaia. Όλα τα δικαιώματα διατηρούνται.</footer>
    </main>
    <button className="admin-float" onClick={()=>setAdmin(true)}>Admin</button>
    {toast && <div className="toast">{toast}</div>}
  </div>
}

function Sidebar({lang,setLang,screen,setScreen,property}){
  return <aside className="sidebar">
    <div className="logoBlock">
      <div className="lineLogo">⌂</div>
      <div><h1>Saris Rooms</h1><b>ASTYPALAIA</b><p>Guest Guide</p></div>
    </div>
    <select className="langSelect" value={lang} onChange={e=>setLang(e.target.value)}>{LANG.map(([c,l])=><option key={c} value={c}>{l}</option>)}</select>
    <nav className="sideNav">{NAV.map(([id,ic,label])=><button key={id} className={screen===id?'active':''} onClick={()=>setScreen(id)}><span className={id==='emergency'?'redIcon':''}>{ic}</span>{t(lang,label)}</button>)}</nav>
    <div className="follow"><p>{t(lang,'follow')}</p><div><a href={property.facebook_url||'#'}>f</a><a className="ig" href={property.instagram_url||'#'}>◎</a><a className="wa" href={'https://wa.me/'+cleanPhone(property.viber_phone||property.phone_1)}>☘</a></div></div>
  </aside>
}
function Home({lang,property,setScreen}){
  const hero = HERO_FALLBACK
  const weather = useAstypalaiaWeather(lang)
  return <>
    <section className="heroPanel" style={{backgroundImage:`linear-gradient(90deg,rgba(2,20,55,.74),rgba(2,20,55,.22)),url(${hero})`}}>
      <div className="heroText"><h2>{property.welcome_title || t(lang,'welcome')}</h2><p>{property.welcome_text || t(lang,'intro')}</p></div>
      <div className="weatherBox"><div>{weather.icon} <strong>{weather.temp!==null?`${weather.temp}°C`:'--°C'}</strong></div><span>{weather.label||t(lang,'sunny')}</span><small>{t(lang,'astypalaia')}</small>{weather.time&&<em>↻ {t(lang,'updated')} {t(lang,'today')} {fmtWeatherTime(weather.time)}</em>}</div>
    </section>
    <section className="quickStrip">
      <button onClick={()=>setScreen('wifi')}>📶 Wi‑Fi</button><a href={property.map_url} target="_blank">📍 Directions</a><button onClick={()=>setScreen('contact')}>📞 Contact</button><button className="em" onClick={()=>setScreen('emergency')}>112 Emergency</button>
    </section>
    <section className="cardGrid">{CARDS.map(([id,icon,title,desc])=><button key={id} className="dashCard" onClick={()=>setScreen(id)}><span className={id==='emergency'?'bubble red':'bubble'}>{icon}</span><b>{t(lang,title)}</b><p>{t(lang,desc)}</p><em>›</em></button>)}</section>
    <section className="wideRows">
      <article className="wideCard helpCard"><h3>Χρειάζεστε βοήθεια;</h3><p>Επικοινωνήστε μαζί μας άμεσα μέσω WhatsApp.</p><a href={'https://wa.me/'+cleanPhone(property.viber_phone||property.phone_1)} target="_blank">Στείλτε μήνυμα ›</a></article>
      <article className="wideCard reviewMini"><h3>⭐ {t(lang,'reviews')}</h3><p>{t(lang,'reviewDesc')}</p><div className="miniBtns"><button onClick={()=>setScreen('reviews')}>Google / Booking / Airbnb</button></div></article>
      <article className="wideCard socialMini"><h3>📱 {t(lang,'social')}</h3><p>{t(lang,'socialDesc')}</p><div className="miniBtns"><button onClick={()=>setScreen('social')}>Instagram / Facebook / TikTok</button></div></article>
    </section>
    <section className="bottomGrid"><div className="contactCard"><h3>{t(lang,'accommodationContact')}</h3><a href={'tel:+30'+cleanPhone(property.phone_1)}>☎ +30 {property.phone_1}</a><a href={'mailto:'+property.email}>✉ {property.email||'saris.rooms.astypalaia@gmail.com'}</a><a href={'https://wa.me/'+cleanPhone(property.viber_phone||property.phone_1)} target="_blank">☏ {t(lang,'whatsapp')}</a></div><div className="portPhoto" style={{backgroundImage:`url(${PORT_IMAGE})`}} /></section>
  </>
}
function Section({lang,screen,property,places,setScreen,copy}){
  if(screen==='accommodation') return <DetailShell title={'🏨 '+t(lang,'accommodation')} lang={lang} setScreen={setScreen}><div className="stayGrid"><Info label="Wi‑Fi Network" value={property.wifi_name} copy={()=>copy(property.wifi_name)}/><Info label="Wi‑Fi Password" value={property.wifi_password||'—'} copy={()=>copy(property.wifi_password)}/><Info label="Check‑in" value={property.checkin}/><Info label="Check‑out" value={property.checkout}/></div><h3>🏠 {t(lang,'house')}</h3><ul className="cleanList">{String(property.house_rules||'').split('\n').map((x,i)=><li key={i}>{x}</li>)}</ul></DetailShell>
  if(screen==='wifi') return <DetailShell title="📶 Wi‑Fi" lang={lang} setScreen={setScreen}><Info label="Network" value={property.wifi_name} copy={()=>copy(property.wifi_name)}/><Info label="Password" value={property.wifi_password||'—'} copy={()=>copy(property.wifi_password)}/></DetailShell>
  if(screen==='check') return <DetailShell title={t(lang,'check')} lang={lang} setScreen={setScreen}><Info label="Check‑in" value={property.checkin}/><Info label="Check‑out" value={property.checkout}/></DetailShell>
  if(screen==='house') return <DetailShell title={t(lang,'house')} lang={lang} setScreen={setScreen}><ul className="cleanList">{String(property.house_rules||'').split('\n').map((x,i)=><li key={i}>{x}</li>)}</ul></DetailShell>
  if(screen==='contact') return <DetailShell title={t(lang,'contact')} lang={lang} setScreen={setScreen}><div className="contactActions"><a href={'tel:+30'+cleanPhone(property.phone_1)}>☎ +30 {property.phone_1}</a>{property.phone_2&&<a href={'tel:+30'+cleanPhone(property.phone_2)}>☎ +30 {property.phone_2}</a>}<a href={'https://wa.me/'+cleanPhone(property.viber_phone||property.phone_1)} target="_blank">WhatsApp</a><a href={'mailto:'+property.email}>Email</a><a href={property.map_url} target="_blank">{t(lang,'directions')}</a></div></DetailShell>
  if(screen==='reviews') return <DetailShell title={'⭐ '+t(lang,'reviews')} lang={lang} setScreen={setScreen}><div className="reviewGrid"><a className="reviewCard" href={property.google_review_url||'#'} target="_blank"><b>⭐ {t(lang,'googleReviews')}</b><span>{t(lang,'open')}</span></a><a className="reviewCard" href={property.booking_review_url||'#'} target="_blank"><b>🏨 {t(lang,'bookingReviews')}</b><span>{t(lang,'open')}</span></a><a className="reviewCard" href={property.airbnb_review_url||'#'} target="_blank"><b>🏡 {t(lang,'airbnbReviews')}</b><span>{t(lang,'open')}</span></a></div><h3 className="subTitle">📱 {t(lang,'social')}</h3><div className="reviewGrid socialGrid"><a className="reviewCard" href={property.instagram_url||'#'} target="_blank"><b>◎ {t(lang,'instagram')}</b><span>{t(lang,'open')}</span></a><a className="reviewCard" href={property.facebook_url||'#'} target="_blank"><b>f {t(lang,'facebook')}</b><span>{t(lang,'open')}</span></a><a className="reviewCard" href={property.tiktok_url||'#'} target="_blank"><b>♪ {t(lang,'tiktok')}</b><span>{t(lang,'open')}</span></a></div></DetailShell>
  if(screen==='social') return <DetailShell title={'📱 '+t(lang,'social')} lang={lang} setScreen={setScreen}><div className="contactActions socialActions"><a href={property.instagram_url||'#'} target="_blank">◎ {t(lang,'instagram')}</a><a href={property.facebook_url||'#'} target="_blank">f {t(lang,'facebook')}</a><a href={property.tiktok_url||'#'} target="_blank">♪ {t(lang,'tiktok')}</a><a href={'https://wa.me/'+cleanPhone(property.viber_phone||property.phone_1)} target="_blank">WhatsApp</a>{property.website_url&&<a href={property.website_url} target="_blank">🌐 {t(lang,'website')}</a>}</div></DetailShell>
  if(screen==='map') return <DetailShell title={t(lang,'map')} lang={lang} setScreen={setScreen}><a className="bigLink" href={property.map_url} target="_blank">📍 {t(lang,'directions')} Saris Rooms</a><a className="bigLink" href="https://www.google.com/maps/search/?api=1&query=Astypalaia" target="_blank">🗺️ {t(lang,'map')} Αστυπάλαιας</a></DetailShell>
  const titleMap = {island:'island', beaches:'beaches', attractions:'attractions', restaurants:'restaurants', coffee:'coffee', transport:'transport', useful:'useful', emergency:'emergency'}
  const items = groupedItems(places, screen)
  return <DetailShell title={t(lang,titleMap[screen]||screen)} lang={lang} setScreen={setScreen}>{items.length ? items.map(p=><Place key={p.id||p.name} p={p} lang={lang} danger={screen==='emergency'}/>) : <p className="empty">{t(lang,'noContent')}</p>}</DetailShell>
}
function DetailShell({title,lang,setScreen,children}){ return <section className="detail"><button className="back" onClick={()=>setScreen('home')}>← {t(lang,'back')}</button><h2>{title}</h2>{children}</section> }
function Info({label,value,copy}){ return <div className="info"><span>{label}</span><b>{value}</b>{copy&&<button onClick={copy}>Copy</button>}</div> }
function Place({p,lang,danger}){ return <article className="place"><div><h3>{p.name}</h3>{p.description&&<p>{p.description}</p>}</div><div className="placeBtns">{p.map_url&&<a href={p.map_url} target="_blank">📍 {t(lang,'map')}</a>}{p.phone&&<a className={danger?'danger':''} href={'tel:'+p.phone}>☎ {p.phone}</a>}{p.url&&<a href={p.url} target="_blank">{t(lang,'open')}</a>}</div></article> }

function Admin({lang,setAdmin,properties,places,reload}){
  const [email,setEmail]=useState(''), [password,setPassword]=useState(''), [user,setUser]=useState(null), [status,setStatus]=useState(''), [tab,setTab]=useState('properties')
  const [props,setProps]=useState(properties), [pls,setPls]=useState(places)
  useEffect(()=>{supabase.auth.getUser().then(({data})=>{ if(data.user) setUser(data.user) })},[])
  useEffect(()=>{setProps(properties);setPls(places)},[properties,places])
  async function login(){ const {data,error}=await supabase.auth.signInWithPassword({email,password}); if(error) setStatus(error.message); else setUser(data.user) }
  async function saveProp(r){ const id=r.id; const row=onlyWritableProperty(r); const q=id ? await supabase.from('properties').update(row).eq('id',id) : await supabase.from('properties').insert(row).select().single(); setStatus(q.error?q.error.message:t(lang,'saved')); await reload() }
  async function savePlace(r){ const id=r.id; const row=onlyWritablePlace(r); const q=id ? await supabase.from('guide_places').update(row).eq('id',id) : await supabase.from('guide_places').insert(row).select().single(); setStatus(q.error?q.error.message:t(lang,'saved')); await reload() }
  async function delPlace(r){ if(!confirm('Delete?')) return; if(r.id) await supabase.from('guide_places').delete().eq('id',r.id); setPls(pls.filter(x=>x!==r)); await reload() }
  if(!user) return <main className="adminPage"><section className="adminPanel"><button className="back" onClick={()=>setAdmin(false)}>← {t(lang,'back')}</button><h2>🔐 Admin</h2><input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)}/><input type="password" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)}/><button className="blueBtn" onClick={login}>{t(lang,'login')}</button>{status&&<p className="status">{status}</p>}</section></main>
  return <main className="adminPage"><section className="adminPanel wide"><button className="back" onClick={()=>{setAdmin(false);reload()}}>← {t(lang,'back')}</button><button className="logout" onClick={()=>supabase.auth.signOut().then(()=>setUser(null))}>{t(lang,'logout')}</button><h2>⚙️ Saris Rooms Admin</h2>{status&&<p className="status">{status}</p>}<div className="tabs"><button className={tab==='properties'?'on':''} onClick={()=>setTab('properties')}>{t(lang,'properties')}</button><button className={tab==='places'?'on':''} onClick={()=>setTab('places')}>{t(lang,'places')}</button></div>{tab==='properties'?<AdminProperties props={props} setProps={setProps} saveProp={saveProp} lang={lang}/>:<AdminPlaces pls={pls} setPls={setPls} savePlace={savePlace} delPlace={delPlace} lang={lang}/>}</section></main>
}
function AdminProperties({props,setProps,saveProp,lang}){ const keys=['name','slug','location','welcome_title','welcome_text','hero_image_url','logo_url','wifi_name','wifi_password','checkin','checkout','house_rules','phone_1','phone_2','viber_phone','email','map_url','facebook_url','instagram_url','tiktok_url','website_url','google_review_url','booking_review_url','airbnb_review_url']; return <div className="adminGrid">{props.map((r,i)=><div className="adminCard" key={r.id||i}>{keys.map(k=><label key={k}>{k}<textarea value={r[k]||''} onChange={e=>setProps(props.map((x,j)=>j===i?{...x,[k]:e.target.value}:x))}/></label>)}<button className="blueBtn" onClick={()=>saveProp(r)}>💾 {t(lang,'save')}</button></div>)}</div> }
function AdminPlaces({pls,setPls,savePlace,delPlace,lang}){ const keys=['category','name','description','phone','map_url','url','sort_order']; return <><button className="blueBtn" onClick={()=>setPls([{category:'useful',name:'Νέο σημείο',description:'',phone:'',map_url:'',url:'',sort_order:99,active:true,is_global:true},...pls])}>➕ {t(lang,'add')}</button><div className="adminGrid">{pls.map((r,i)=><div className="adminCard" key={r.id||i}>{keys.map(k=><label key={k}>{k}<textarea value={r[k]||''} onChange={e=>setPls(pls.map((x,j)=>j===i?{...x,[k]:e.target.value}:x))}/></label>)}<label className="checkLabel"><input type="checkbox" checked={r.active!==false} onChange={e=>setPls(pls.map((x,j)=>j===i?{...x,active:e.target.checked}:x))}/> {t(lang,'active')}</label><button className="blueBtn" onClick={()=>savePlace(r)}>💾 {t(lang,'save')}</button><button className="deleteBtn" onClick={()=>delPlace(r)}>🗑️ {t(lang,'delete')}</button></div>)}</div></> }
