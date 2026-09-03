const header=document.querySelector('.header');
window.addEventListener('scroll',()=>{if(header)header.classList.toggle('scrolled',scrollY>40)});
const menuBtn=document.querySelector('.menu-btn'); const mobile=document.querySelector('.mobile-menu');
if(menuBtn&&mobile){menuBtn.addEventListener('click',()=>{mobile.classList.toggle('open');document.body.classList.toggle('is-locked')});mobile.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{mobile.classList.remove('open');document.body.classList.remove('is-locked')}))}
const obs=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')}),{threshold:.12});document.querySelectorAll('.reveal').forEach(el=>obs.observe(el));
const rows=document.querySelectorAll('.practice-row'); const panel=document.querySelector('.practice-panel');
const practiceData={
 'Corporate & Commercial':['Practical legal solutions for complex commercial environments.','Corporate governance, mergers, acquisitions, joint ventures and commercial contracts.','linear-gradient(135deg,#25231e,#9d8563)'],
 'Dispute Resolution':['Strategic representation when the stakes are high.','Commercial litigation, arbitration, mediation and contentious regulatory matters.','linear-gradient(135deg,#171817,#6c6b63)'],
 'Banking & Finance':['Clear counsel across sophisticated financial transactions.','Finance, secured lending, project finance, restructuring and financial regulation.','linear-gradient(135deg,#30271f,#b0926c)'],
 'Real Estate':['Advice for assets, developments and investments that matter.','Acquisitions, developments, leasing, construction and real estate finance.','linear-gradient(135deg,#292b29,#9a9b90)'],
 'Employment':['Practical guidance across the employment lifecycle.','Employment contracts, executive matters, workplace disputes and advisory.','linear-gradient(135deg,#27231e,#89775e)']};
if(rows.length&&panel){const title=panel.querySelector('h3'),desc=panel.querySelector('p'),tag=panel.querySelector('.eyebrow'),bg=panel.querySelector('.practice-panel-image');rows.forEach(r=>r.addEventListener('mouseenter',()=>{rows.forEach(x=>x.classList.remove('active'));r.classList.add('active');const d=practiceData[r.dataset.practice]||practiceData['Corporate & Commercial'];tag.textContent=r.dataset.practice;title.textContent=d[0];desc.textContent=d[1];bg.style.backgroundImage=d[2]}))}
