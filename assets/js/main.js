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
