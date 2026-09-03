const header = document.querySelector('.header');

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
  'Corporate & Commercial': ['Practical legal solutions for complex commercial environments.', 'Corporate governance, mergers, acquisitions, joint ventures and commercial contracts.', 'linear-gradient(135deg,#4b3a3c,#c79f8c)'],
  'Dispute Resolution': ['Strategic representation when the stakes are high.', 'Commercial litigation, arbitration, mediation and contentious regulatory matters.', 'linear-gradient(135deg,#3f3744,#a78ca1)'],
  'Banking & Finance': ['Clear counsel across sophisticated financial transactions.', 'Finance, secured lending, project finance, restructuring and financial regulation.', 'linear-gradient(135deg,#594248,#d5ad92)'],
  'Real Estate': ['Advice for assets, developments and investments that matter.', 'Acquisitions, developments, leasing, construction and real estate finance.', 'linear-gradient(135deg,#53615a,#c5d3c7)'],
  'Employment': ['Practical guidance across the employment lifecycle.', 'Employment contracts, executive matters, workplace disputes and advisory.', 'linear-gradient(135deg,#634d55,#d3a69b)'],
  'Energy & Infrastructure': ['Counsel for projects that power growth.', 'Project development, infrastructure transactions, concessions and regulatory matters.', 'linear-gradient(135deg,#4c4658,#b9a9cf)'],
  'Technology & IP': ['Legal thinking for a rapidly changing digital world.', 'Technology transactions, intellectual property, data and digital regulation.', 'linear-gradient(135deg,#4d5960,#b8c9cf)'],
  'Tax': ['Clear advice where tax and strategy intersect.', 'Tax structuring, transaction support, advisory and disputes.', 'linear-gradient(135deg,#63584a,#d8c7a5)'],
  'Regulatory': ['Confident navigation through evolving rules.', 'Regulatory strategy, licensing, compliance and government-facing matters.', 'linear-gradient(135deg,#5a4558,#c5a2bc)']
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
    bg.style.backgroundImage = data[2];
  }));
}
