const header = document.querySelector('.header');
const isInnerPage = !!document.querySelector('.page-hero');
if (header && isInnerPage) header.classList.add('scrolled');

const syncHeader = () => {
  if (header) header.classList.toggle('scrolled', window.scrollY > 32);
};
window.addEventListener('scroll', syncHeader, { passive: true });
syncHeader();

const menuBtn = document.querySelector('.menu-btn');
const mobile = document.querySelector('.mobile-menu');
if (menuBtn && mobile) {
  menuBtn.addEventListener('click', () => {
    const open = mobile.classList.toggle('open');
    document.body.classList.toggle('is-locked', open);
    menuBtn.setAttribute('aria-expanded', String(open));
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && mobile.classList.contains('open')) {
      mobile.classList.remove('open');
      document.body.classList.remove('is-locked');
      menuBtn.setAttribute('aria-expanded', 'false');
    }
  });
  mobile.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    mobile.classList.remove('open');
    document.body.classList.remove('is-locked');
    menuBtn.setAttribute('aria-expanded', 'false');
  }));
}

const obs = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

const rows = document.querySelectorAll('.practice-row');
const panel = document.querySelector('.practice-panel');
const practiceData = {
  'Corporate & Commercial': ['Practical legal solutions for complex commercial environments.', 'Corporate governance, mergers, acquisitions, joint ventures and commercial contracts.', 'https://images.pexels.com/photos/7876155/pexels-photo-7876155.jpeg?cs=srgb&dl=pexels-karola-g-7876155.jpg&fm=jpg'],
  'Dispute Resolution': ['Strategic representation when the stakes are high.', 'Commercial litigation, arbitration, mediation and contentious regulatory matters.', 'https://images.pexels.com/photos/8112153/pexels-photo-8112153.jpeg?cs=srgb&dl=pexels-pavel-danilyuk-8112153.jpg&fm=jpg'],
  'Banking & Finance': ['Clear counsel across sophisticated financial transactions.', 'Finance, secured lending, project finance, restructuring and financial regulation.', 'https://images.pexels.com/photos/7841457/pexels-photo-7841457.jpeg?cs=srgb&dl=pexels-rdne-7841457.jpg&fm=jpg'],
  'Real Estate': ['Advice for assets, developments and investments that matter.', 'Acquisitions, developments, leasing, construction and real estate finance.', 'https://images.pexels.com/photos/8112171/pexels-photo-8112171.jpeg?cs=srgb&dl=pexels-pavel-danilyuk-8112171.jpg&fm=jpg'],
  'Employment': ['Practical guidance across the employment lifecycle.', 'Employment contracts, executive matters, workplace disputes and advisory.', 'https://images.pexels.com/photos/7841846/pexels-photo-7841846.jpeg?cs=srgb&dl=pexels-rdne-7841846.jpg&fm=jpg'],
  'Energy & Infrastructure': ['Counsel for projects that power growth.', 'Project development, infrastructure transactions, concessions and regulatory matters.', 'https://images.pexels.com/photos/1593978/pexels-photo-1593978.jpeg?cs=srgb&dl=pexels-pixabay-1593978.jpg&fm=jpg'],
  'Technology & IP': ['Legal thinking for a rapidly changing digital world.', 'Technology transactions, intellectual property, data and digital regulation.', 'https://images.pexels.com/photos/5669602/pexels-photo-5669602.jpeg?cs=srgb&dl=pexels-sora-shimazaki-5669602.jpg&fm=jpg'],
  'Tax': ['Clear advice where tax and strategy intersect.', 'Tax structuring, transaction support, advisory and disputes.', 'https://images.pexels.com/photos/8112178/pexels-photo-8112178.jpeg?cs=srgb&dl=pexels-pavel-danilyuk-8112178.jpg&fm=jpg'],
  'Regulatory': ['Confident navigation through evolving rules.', 'Regulatory strategy, licensing, compliance and government-facing matters.', 'https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg?cs=srgb&dl=pexels-sora-shimazaki-5668858.jpg&fm=jpg']
};

if (rows.length && panel) {
  const title = panel.querySelector('h3');
  const desc = panel.querySelector('p');
  const tag = panel.querySelector('.eyebrow');
  const bg = panel.querySelector('.practice-panel-image');
  rows.forEach(row => row.addEventListener('mouseenter', () => {
    rows.forEach(x => x.classList.remove('active'));
    row.classList.add('active');
    const key = row.dataset.practice || 'Corporate & Commercial';
    const data = practiceData[key] || practiceData['Corporate & Commercial'];
    tag.textContent = key;
    title.textContent = data[0];
    desc.textContent = data[1];
    bg.style.backgroundImage = `linear-gradient(180deg,rgba(45,32,40,.02),rgba(45,32,40,.12)), url("${data[2]}")`;
  }));
}

/* =========================================================
   LUXURY MOTION SYSTEM — GLOBAL INTERACTIONS
   ========================================================= */
(function(){
  const root = document.documentElement;
  const body = document.body;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Reading progress.
  const progress = document.createElement('div');
  progress.className = 'scroll-progress';
  body.appendChild(progress);
  const updateProgress = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    progress.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
  };
  window.addEventListener('scroll', updateProgress, {passive:true});
  window.addEventListener('resize', updateProgress);
  updateProgress();

  // Pointer spotlight — desktop only.
  if (!reduce && window.matchMedia('(pointer:fine)').matches) {
    const glow = document.createElement('div');
    glow.className = 'cursor-glow';
    body.appendChild(glow);
    body.classList.add('has-pointer');
    let tx=0,ty=0,cx=0,cy=0;
    window.addEventListener('pointermove', e => { tx=e.clientX; ty=e.clientY; }, {passive:true});
    const tick = () => {
      cx += (tx-cx)*.12; cy += (ty-cy)*.12;
      glow.style.left = cx+'px'; glow.style.top = cy+'px';
      requestAnimationFrame(tick);
    };
    tick();
  }

  // Active navigation item.
  const path = location.pathname.replace(/\\/g,'/');
  document.querySelectorAll('.navlinks a').forEach(link => {
    const href = link.getAttribute('href') || '';
    if (!href || href.startsWith('#')) return;
    const resolved = new URL(href, location.href).pathname;
    if (resolved === path || (path.endsWith('/') && resolved === path+'index.html')) link.classList.add('is-active');
  });

  // Magnetic buttons.
  if (!reduce && window.matchMedia('(pointer:fine)').matches) {
    document.querySelectorAll('.btn').forEach(btn => {
      btn.addEventListener('pointermove', e => {
        const r=btn.getBoundingClientRect();
        const x=(e.clientX-r.left-r.width/2)*.10;
        const y=(e.clientY-r.top-r.height/2)*.12;
        btn.style.transform=`translate(${x}px,${y}px)`;
      });
      btn.addEventListener('pointerleave',()=>btn.style.transform='');
    });
  }

  // Soft image parallax inside larger visual frames.
  if (!reduce && window.matchMedia('(pointer:fine)').matches) {
    document.querySelectorAll('.image-frame,.practice-panel').forEach(card => {
      card.addEventListener('pointermove', e => {
        const r=card.getBoundingClientRect();
        const rx=((e.clientY-r.top)/r.height-.5)*-2;
        const ry=((e.clientX-r.left)/r.width-.5)*2;
        card.style.transform=`perspective(1200px) rotateX(${rx}deg) rotateY(${ry}deg)`;
      });
      card.addEventListener('pointerleave',()=>card.style.transform='');
    });
  }

  // Add stagger values to reveal elements when a page has many of them.
  document.querySelectorAll('.reveal').forEach((el,i)=>{
    if (!el.style.transitionDelay && i<12) el.style.transitionDelay = `${Math.min(i*45,420)}ms`;
  });

  // Elegant page exit on internal navigation.
  if (!reduce) {
    document.querySelectorAll('a[href]').forEach(a=>{
      const href=a.getAttribute('href');
      if(!href || href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:') || a.target==='_blank') return;
      a.addEventListener('click', e=>{
        const url=new URL(href,location.href);
        if(url.origin!==location.origin) return;
        e.preventDefault();
        body.classList.add('page-leaving');
        setTimeout(()=>location.href=url.href,220);
      });
    });
  }
})();
