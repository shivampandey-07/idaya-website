const dialog=document.querySelector('#enquiry');let selection='';document.querySelectorAll('[data-enquire]').forEach(button=>button.addEventListener('click',()=>{selection=button.dataset.enquire;document.querySelector('#enquiry-caption').textContent='Your interest: '+selection;document.querySelector('#copy-status').textContent='';dialog.showModal()}));document.querySelector('.close').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()}});document.querySelector('#copy').addEventListener('click',async()=>{const message=buildEnquiry();try{await navigator.clipboard.writeText(message);document.querySelector('#copy-status').textContent='Copied. Open Instagram and paste this into your message to IDAYA.'}catch{document.querySelector('#copy-status').textContent='Please copy this message: '+message}});
const film=document.querySelector('#hero-video');
let filmVisible=true;
film.muted=true;
/* The film runs by itself wherever it is allowed to. Where it is not - iOS
   refuses autoplay outright in Low Power Mode, and there is no way to talk it
   round - we do not ask the visitor to press anything. We retry on their first
   touch instead: beginning to scroll grants the activation play() needs, so on
   a handset the film starts as soon as they touch the screen, which is both
   immediate and invisible. Listening capture-side means a touch that lands on a
   link counts too. */
const GESTURES=['touchstart','touchend','pointerdown','click','keydown'];
const dropGestures=()=>GESTURES.forEach(g=>removeEventListener(g,onGesture,true));
function onGesture(){film.play().then(dropGestures).catch(()=>{});}
GESTURES.forEach(g=>addEventListener(g,onGesture,true));
film.addEventListener('playing',dropGestures);
const resumeFilm=()=>{if(filmVisible&&!document.hidden)film.play().catch(()=>{});};
resumeFilm();
new IntersectionObserver(entries=>{filmVisible=entries[0].isIntersecting;if(!filmVisible)film.pause();else resumeFilm();},{threshold:.1}).observe(film);
document.addEventListener('visibilitychange',()=>{if(document.hidden)film.pause();else resumeFilm();});
/* A source that fails still shows its poster, so leave the element visible and
   stop waiting for a gesture that has nothing to start. */
film.addEventListener('error',dropGestures);

/* Shared enquiry text: the clipboard copy and the WhatsApp deep link must not drift apart. */
const WA_NUMBER='918287746401';
function buildEnquiry(){return 'Hello IDAYA! I am interested in '+(selection||'your collections')+'. Preferred size: '+document.querySelector('#size').value+'. '+document.querySelector('#note').value+' Could you share available options and pricing?';}
const waSend=document.querySelector('#wa-send');
const syncWa=()=>{waSend.href='https://api.whatsapp.com/send?phone='+WA_NUMBER+'&text='+encodeURIComponent(buildEnquiry());};
document.querySelector('#size').addEventListener('change',syncWa);
document.querySelector('#note').addEventListener('input',syncWa);
document.querySelectorAll('[data-enquire]').forEach(b=>b.addEventListener('click',syncWa));
waSend.addEventListener('click',syncWa);
syncWa();

/* Instagram embeds: defer the third-party script until the first grid nears view.
   Both the collection cards and the showcase are embeds now, so whichever the
   visitor reaches first pulls embed.js in for both. */
const igGrids=document.querySelectorAll('.products, .ig-grid');
if(igGrids.length){const obs=new IntersectionObserver((entries,o)=>{if(entries.some(e=>e.isIntersecting)){o.disconnect();const sc=document.createElement('script');sc.async=true;sc.src='https://www.instagram.com/embed.js';document.body.appendChild(sc);}},{rootMargin:'500px'});igGrids.forEach(el=>obs.observe(el));}

/* Header lifts off the page once it is no longer at the top of the document. */
const hdr=document.querySelector('header');
if(hdr){const stick=()=>hdr.classList.toggle('stuck',window.scrollY>4);addEventListener('scroll',stick,{passive:true});stick();}

/* Reveal-on-scroll: each marked element animates once, then stops being watched. */
const revealables=document.querySelectorAll('[data-reveal]');
if(revealables.length){
  if(!('IntersectionObserver' in window)||matchMedia('(prefers-reduced-motion: reduce)').matches){
    revealables.forEach(el=>el.classList.add('in'));
  }else{
    const ro=new IntersectionObserver((entries)=>{entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('in');ro.unobserve(e.target);}});},{rootMargin:'0px 0px -6% 0px',threshold:.06});
    revealables.forEach(el=>ro.observe(el));
  }
}

/* Failsafe: nothing stays invisible because an observer never fired. */
addEventListener('load',()=>setTimeout(()=>{
  document.querySelectorAll('[data-reveal]:not(.in)').forEach(el=>{
    if(el.getBoundingClientRect().top < innerHeight*1.4) el.classList.add('in');
  });
},1200));
