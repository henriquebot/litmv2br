/* RPG Up — MesaQuest live occupancy for landing */
(function(){
  if(window.RPGUP_MESAQUEST_LIVE_BOOTED) return;
  window.RPGUP_MESAQUEST_LIVE_BOOTED=true;

  const cfg=window.RPGUP_MESAQUEST_LIVE||{};
  if(!cfg.endpoint) return;

  const norm=u=>{
    try{
      const x=new URL(u,location.href);
      return (x.origin+x.pathname).replace(/\/+$/,'').toLowerCase();
    }catch(_){ return String(u||'').replace(/\/+$/,'').toLowerCase(); }
  };

  const escapeHtml=s=>String(s??'').replace(/[&<>"']/g,c=>({
    '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'
  }[c]));

  function findLink(item){
    const wanted=norm(item.url);
    return [...document.querySelectorAll('a[href]')].find(a=>norm(a.href)===wanted)||null;
  }

  function findCard(a){
    if(!a) return null;
    const selectors=[
      '[data-rpgup-mesa-card]',
      '.mesa-card','.table-card',
      '.swiper-slide','.splide__slide',
      'article','li',
      '[class*="mesa-card"]','[class*="table-card"]','[class*="game-card"]',
      '[class*="card"]'
    ];
    for(const s of selectors){
      const c=a.closest(s);
      if(c && c!==document.body && c!==document.documentElement) return c;
    }
    let n=a;
    for(let i=0;i<5&&n&&n.parentElement;i++,n=n.parentElement){
      if(n.parentElement.children.length>1) return n;
    }
    return a.parentElement;
  }

  function dots(item){
    if(item.capacity==null || item.filled==null) return '';
    const cap=Math.min(12,Math.max(0,Number(item.capacity)||0));
    const fill=Math.min(cap,Math.max(0,Number(item.filled)||0));
    let out='';
    for(let i=0;i<cap;i++) out+='<i class="'+(i<fill?'is-filled':'')+'"></i>';
    if(Number(item.capacity)>12) out+='<b>+'+(Number(item.capacity)-12)+'</b>';
    return out;
  }

  function occupancyText(item){
    if(item.capacity==null || item.filled==null) return item.statusText||'Consultar MesaQuest';
    if(item.full) return item.filled+'/'+item.capacity+' jogadores · Mesa completa';
    return item.filled+'/'+item.capacity+' jogadores · '+item.statusText;
  }

  function replaceStaleVacancyText(card,item){
    if(!card || item.capacity==null) return;
    const walker=document.createTreeWalker(card,NodeFilter.SHOW_TEXT,{
      acceptNode(node){
        if(!node.parentElement) return NodeFilter.FILTER_REJECT;
        if(node.parentElement.closest('.rpgup-live-vacancy')) return NodeFilter.FILTER_REJECT;
        const t=(node.nodeValue||'').trim();
        if(!t) return NodeFilter.FILTER_REJECT;
        if(
          /\b\d+\s*\/\s*\d+\s*(?:vagas?|jogadores?)/i.test(t) ||
          /\b\d+\s+vagas?\s*(?:abertas?|livres?|preenchidas?)?/i.test(t) ||
          /\b\d+\s+de\s+\d+\s+vagas?/i.test(t) ||
          /^mesa\s+completa$/i.test(t)
        ) return NodeFilter.FILTER_ACCEPT;
        return NodeFilter.FILTER_REJECT;
      }
    });
    const nodes=[];
    while(walker.nextNode()) nodes.push(walker.currentNode);
    nodes.slice(0,3).forEach((n,idx)=>{
      n.nodeValue=idx===0?occupancyText(item):'';
    });
  }

  function badge(item){
    const d=document.createElement('div');
    d.className='rpgup-live-vacancy'+(item.full?' is-full':item.open===1?' is-last':'');
    d.innerHTML=
      '<span class="rpgup-live-label">'+escapeHtml(item.full?'Mesa completa':item.statusText||'Vagas')+'</span>'+
      '<span class="rpgup-live-count">'+(item.capacity==null?'':escapeHtml(item.filled+'/'+item.capacity))+'</span>'+
      '<span class="rpgup-live-dots" aria-hidden="true">'+dots(item)+'</span>';
    return d;
  }

  function updateExisting(item){
    const a=findLink(item);
    if(!a) return false;
    const card=findCard(a);
    if(!card) return true;

    card.dataset.rpgupMesaLive=item.key||'1';
    card.classList.toggle('rpgup-mesa-full',!!item.full);
    replaceStaleVacancyText(card,item);

    const old=card.querySelector('.rpgup-live-vacancy');
    const fresh=badge(item);
    if(old) old.replaceWith(fresh);
    else{
      const target=card.querySelector('[class*="vaga"],[class*="slot"],[class*="status"],[class*="meta"]');
      if(target && target.parentElement) target.insertAdjacentElement('afterend',fresh);
      else card.appendChild(fresh);
    }
    return true;
  }

  function mesaquestCards(){
    return [...document.querySelectorAll('a[href*="mesaquest.com.br/mesas/"]')]
      .map(findCard).filter(Boolean)
      .filter((v,i,a)=>a.indexOf(v)===i)
      .filter(c=>!c.classList.contains('rpgup-live-created-card'));
  }

  function findContainer(){
    const cards=mesaquestCards();
    if(cards.length){
      // Prefer a shared parent that already contains more than one MesaQuest card.
      const counts=new Map();
      cards.forEach(c=>{
        let p=c.parentElement;
        for(let i=0;i<3&&p;i++,p=p.parentElement){
          counts.set(p,(counts.get(p)||0)+1);
        }
      });
      const ranked=[...counts.entries()].filter(([,n])=>n>=2).sort((a,b)=>b[1]-a[1]);
      if(ranked.length) return {parent:ranked[0][0],sample:cards[0]};
      return {parent:cards[0].parentElement,sample:cards[0]};
    }

    const headings=[...document.querySelectorAll('h1,h2,h3,h4')];
    const h=headings.find(x=>/(mesas|aventuras|próxima aventura|jogue comigo)/i.test(x.textContent||''));
    if(h){
      const section=h.closest('section,main,div');
      if(section) return {parent:section,sample:null};
    }
    return {parent:document.querySelector('main')||document.body,sample:null};
  }

  function createdCard(item,parent){
    const shell=document.createElement('article');
    shell.className='rpgup-live-created-card';
    shell.dataset.rpgupMesaLive=item.key||'1';

    const image=item.image
      ? 'style="background-image:linear-gradient(180deg,rgba(8,12,10,.08),rgba(8,12,10,.78)),url(\''+escapeHtml(item.image)+'\')"'
      : '';

    shell.innerHTML=
      '<a class="rpgup-live-card-link" href="'+escapeHtml(item.url)+'" target="_blank" rel="noopener">'+
        '<div class="rpgup-live-cover" '+image+'>'+
          '<span class="rpgup-live-kicker">'+escapeHtml(item.full?'MESA LOTADA':'MESA RPG UP')+'</span>'+
        '</div>'+
        '<div class="rpgup-live-body">'+
          '<h3>'+escapeHtml(item.title)+'</h3>'+
          '<p class="rpgup-live-source">Vagas sincronizadas com o MesaQuest</p>'+
        '</div>'+
      '</a>';
    shell.appendChild(badge(item));

    if(parent && parent.classList){
      if(parent.classList.contains('swiper-wrapper')) shell.classList.add('swiper-slide');
      if(parent.classList.contains('splide__list')) shell.classList.add('splide__slide');
    }
    return shell;
  }

  function ensureMissing(item){
    if(!item.showOnLanding) return;
    if(item.full && !item.keepWhenFull) return;
    if(findLink(item)) return;
    if(document.querySelector('[data-rpgup-mesa-live="'+CSS.escape(item.key||'')+'"]')) return;

    const {parent}=findContainer();
    if(!parent) return;
    const card=createdCard(item,parent);
    parent.appendChild(card);

    try{
      if(parent.swiper && typeof parent.swiper.update==='function') parent.swiper.update();
      const sw=parent.closest('.swiper');
      if(sw && sw.swiper && typeof sw.swiper.update==='function') sw.swiper.update();
    }catch(_){}
  }

  function apply(items){
    (items||[]).forEach(item=>{
      if(!item || !item.url) return;
      const found=updateExisting(item);
      if(!found) ensureMissing(item);
    });
  }

  let timer=null;
  async function refresh(){
    try{
      const u=cfg.endpoint+(cfg.endpoint.includes('?')?'&':'?')+'_='+Date.now();
      const r=await fetch(u,{cache:'no-store',credentials:'same-origin'});
      if(!r.ok) return;
      const data=await r.json();
      apply(data.items||[]);
      window.dispatchEvent(new CustomEvent('rpgup:mesaquest-updated',{detail:data}));
    }catch(_){}
  }

  function start(){
    refresh();
    setTimeout(refresh,1200); // catches carousels rendered just after DOMContentLoaded
    clearInterval(timer);
    timer=setInterval(refresh,Math.max(60000,Number(cfg.intervalMs)||300000));
    document.addEventListener('visibilitychange',()=>{if(!document.hidden) refresh();});
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',start,{once:true});
  else start();
})();