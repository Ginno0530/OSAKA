const clock=document.querySelector('#osaka-clock');
function tick(){if(!clock)return;clock.textContent=new Intl.DateTimeFormat('ja-JP',{timeZone:'Asia/Tokyo',hour:'2-digit',minute:'2-digit',second:'2-digit',hour12:false}).format(new Date())}
tick();setInterval(tick,1000);

const stage=document.querySelector('.particles');
if(stage){for(let i=0;i<44;i++){const p=document.createElement('i');p.className='particle';p.style.left=Math.random()*100+'%';p.style.top=35+Math.random()*80+'%';p.style.setProperty('--d',8+Math.random()*16+'s');p.style.setProperty('--o',.2+Math.random()*.65);p.style.animationDelay=-Math.random()*18+'s';stage.appendChild(p)}}

const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
const items=document.querySelectorAll('.reveal');
if(reduced){items.forEach(x=>x.classList.add('visible'))}else{const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.13});items.forEach(x=>observer.observe(x))}

const glow=document.querySelector('.cursor-glow');
if(glow&&!reduced){addEventListener('pointermove',e=>{glow.style.left=e.clientX+'px';glow.style.top=e.clientY+'px'},{passive:true})}

const menuButton=document.querySelector('.menu-button');
const globalNav=document.querySelector('.global-nav');
if(menuButton&&globalNav){menuButton.addEventListener('click',()=>{const open=globalNav.classList.toggle('open');document.body.classList.toggle('menu-open',open);menuButton.setAttribute('aria-expanded',String(open));menuButton.textContent=open?'CLOSE':'MENU'});globalNav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{globalNav.classList.remove('open');document.body.classList.remove('menu-open');menuButton.setAttribute('aria-expanded','false');menuButton.textContent='MENU'}))}

const counter=document.querySelector('#yen-counter');
if(counter&&!reduced){const target=12480;let started=false;const counterObserver=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting&&!started){started=true;const start=performance.now();const duration=1100;function frame(now){const t=Math.min(1,(now-start)/duration);const eased=1-Math.pow(1-t,3);counter.textContent=Math.floor(target*eased).toLocaleString('ja-JP');if(t<1)requestAnimationFrame(frame)}requestAnimationFrame(frame);counterObserver.disconnect()}}),{threshold:.55});counterObserver.observe(counter)}

const header=document.querySelector('.site-header');
addEventListener('scroll',()=>{if(header)header.style.boxShadow=scrollY>18?'0 12px 40px rgba(0,0,0,.18)':'none'},{passive:true});