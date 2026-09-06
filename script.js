const canvas = document.getElementById('autumnCanvas');
const ctx = canvas.getContext('2d');
let width, height, leaves = [], mouseX = 0, mouseY = 0;
const symbols = ['🍂','🍁','🍃'];
function resize(){width=canvas.width=innerWidth; height=canvas.height=innerHeight;}
function makeLeaf(reset=false){return {x:Math.random()*width,y:reset?-30:Math.random()*height,size:10+Math.random()*15,speed:.35+Math.random()*1.1,drift:(Math.random()-.5)*.8,rotation:Math.random()*6.28,spin:(Math.random()-.5)*.025,symbol:symbols[Math.floor(Math.random()*symbols.length)],alpha:.35+Math.random()*.5};}
function setup(){resize();leaves=[];for(let i=0;i<Math.min(55,Math.floor(width/22));i++)leaves.push(makeLeaf());}
function draw(){ctx.clearRect(0,0,width,height);leaves.forEach(l=>{l.y+=l.speed;l.x+=l.drift+Math.sin(l.y*.012)*.35;l.rotation+=l.spin;if(l.y>height+30){Object.assign(l,makeLeaf(true));l.x=Math.random()*width}ctx.save();ctx.globalAlpha=l.alpha;ctx.translate(l.x+(mouseX-l.x)*.012,l.y+(mouseY-l.y)*.008);ctx.rotate(l.rotation);ctx.font=`${l.size}px serif`;ctx.fillText(l.symbol,-l.size/2,l.size/2);ctx.restore()});requestAnimationFrame(draw);}
addEventListener('resize',setup);addEventListener('mousemove',e=>{mouseX=e.clientX;mouseY=e.clientY});setup();draw();
const menu=document.getElementById('menu'),nav=document.getElementById('nav');menu.addEventListener('click',()=>{nav.classList.toggle('open')});nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
document.getElementById('top').addEventListener('click',()=>scrollTo({top:0,behavior:'smooth'}));

// Category filtering for menu.html
const filterBtns = document.querySelectorAll('.filter-btn');
const menuItems = document.querySelectorAll('.menu-item');
if (filterBtns.length > 0) {
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.category;
      menuItems.forEach(item => {
        if (cat === 'all' || item.dataset.category === cat) {
          item.style.display = 'flex';
          setTimeout(() => item.classList.add('visible'), 20);
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}

// Sign up form on index.html
const signupForm = document.getElementById('menuSignupForm');
if (signupForm) {
  signupForm.addEventListener('submit', (e) => {
    const emailInput = document.getElementById('signupEmail');
    if (emailInput && emailInput.value) {
      localStorage.setItem('brewHavenUserEmail', emailInput.value);
    }
  });
}

