const dialog=document.querySelector('#enquiry');let selection='';document.querySelectorAll('[data-enquire]').forEach(button=>button.addEventListener('click',()=>{selection=button.dataset.enquire;document.querySelector('#enquiry-caption').textContent='Your interest: '+selection;document.querySelector('#copy-status').textContent='';dialog.showModal()}));document.querySelector('.close').addEventListener('click',()=>dialog.close());dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)dialog.close()}});document.querySelector('#copy').addEventListener('click',async()=>{const message=buildEnquiry();try{await navigator.clipboard.writeText(message);document.querySelector('#copy-status').textContent='Copied. Open Instagram and paste this into your message to IDAYA.'}catch{document.querySelector('#copy-status').textContent='Please copy this message: '+message}});
const film=document.querySelector('#hero-video');
const reducedMotion=window.matchMedia('(prefers-reduced-motion: reduce)');
let filmVisible=true;
film.muted=true;
const resumeFilm=()=>{if(!reducedMotion.matches&&filmVisible&&!document.hidden)film.play().catch(()=>{});};
if(reducedMotion.matches){film.autoplay=false;film.pause();}else{resumeFilm();}
reducedMotion.addEventListener('change',e=>{if(e.matches)film.pause();else resumeFilm();});
new IntersectionObserver(entries=>{filmVisible=entries[0].isIntersecting;if(!filmVisible)film.pause();else resumeFilm();},{threshold:.1}).observe(film);
document.addEventListener('visibilitychange',()=>{if(document.hidden)film.pause();else resumeFilm();});
film.addEventListener('error',()=>{film.style.visibility='hidden';});

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
