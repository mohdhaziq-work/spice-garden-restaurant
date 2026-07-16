/* Spice Garden — JavaScript */
document.addEventListener('DOMContentLoaded',()=>{
  // Sidebar
  const hamburger=document.getElementById('hamburger');
  const sidebar=document.getElementById('sidebar');
  const overlay=document.getElementById('sidebarOverlay');
  const closeBtn=document.getElementById('sidebarClose');
  function openSidebar(){sidebar.classList.add('open');overlay.classList.add('active');hamburger?.classList.add('open');document.body.style.overflow='hidden'}
  function closeSidebar(){sidebar.classList.remove('open');overlay.classList.remove('active');hamburger?.classList.remove('open');document.body.style.overflow=''}
  hamburger?.addEventListener('click',()=>sidebar.classList.contains('open')?closeSidebar():openSidebar());
  closeBtn?.addEventListener('click',closeSidebar);
  overlay?.addEventListener('click',closeSidebar);

  // Navbar scroll
  const navbar=document.getElementById('navbar');
  const btt=document.getElementById('backToTop');
  window.addEventListener('scroll',()=>{
    const y=window.scrollY;
    if(!navbar.classList.contains('scrolled')&&y>50)navbar.classList.add('scrolled');
    if(navbar.classList.contains('scrolled')&&y<=50)navbar.classList.remove('scrolled');
    btt?.classList.toggle('visible',y>500);
  },{passive:true});
  btt?.addEventListener('click',()=>window.scrollTo({top:0,behavior:'smooth'}));

  // Scroll Reveal
  const revealEls=document.querySelectorAll('[data-reveal]');
  const revealObs=new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        const d=parseInt(e.target.dataset.delay)||0;
        setTimeout(()=>e.target.classList.add('revealed'),d);
        revealObs.unobserve(e.target);
      }
    });
  },{threshold:.12});
  revealEls.forEach(el=>revealObs.observe(el));

  // Counter Animation
  const counters=document.querySelectorAll('[data-count]');
  const countObs=new IntersectionObserver(entries=>{
    entries.forEach(e=>{
      if(e.isIntersecting){
        const el=e.target;const t=parseInt(el.dataset.count);
        const dur=2000;const s=performance.now();
        (function u(n){const p=Math.min((n-s)/dur,1);el.textContent=Math.floor(t*(1-Math.pow(1-p,3))).toLocaleString('en-IN');p<1?requestAnimationFrame(u):el.textContent=t.toLocaleString('en-IN')})(s);
        countObs.unobserve(el);
      }
    });
  },{threshold:.5});
  counters.forEach(c=>countObs.observe(c));

  // Menu Filter
  const filterBtns=document.querySelectorAll('.filter-btn');
  const menuCards=document.querySelectorAll('.menu-card');
  filterBtns.forEach(btn=>{
    btn.addEventListener('click',()=>{
      filterBtns.forEach(b=>b.classList.remove('active'));
      btn.classList.add('active');
      const f=btn.dataset.filter;
      menuCards.forEach(card=>{
        const match=f==='all'||card.dataset.category===f;
        card.classList.toggle('hidden',!match);
        if(match){card.style.opacity='0';card.style.transform='translateY(16px)';setTimeout(()=>{card.style.transition='opacity .4s,transform .4s';card.style.opacity='1';card.style.transform='translateY(0)'},50)}
      });
    });
  });

  // Reservation Form
  const form=document.getElementById('reservationForm');
  form?.addEventListener('submit',e=>{
    e.preventDefault();
    const d=form.querySelector('#resDate');
    if(d){const sel=new Date(d.value);const today=new Date();today.setHours(0,0,0,0);if(sel<today){showToast('Please select a future date');return}}
    showToast('✅ Table reserved! We will confirm shortly.');
    form.reset();
  });
  if(document.getElementById('resDate')){document.getElementById('resDate').min=new Date().toISOString().split('T')[0]}

  // Toast
  function showToast(msg){const t=document.getElementById('toast');if(!t)return;t.textContent=msg;t.classList.add('show');setTimeout(()=>t.classList.remove('show'),3500)}
});
