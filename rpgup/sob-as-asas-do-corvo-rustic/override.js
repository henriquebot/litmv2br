/* RPG Up — Sob as Asas do Corvo — variante visual LitM/Rustic Fantasy */
(function(){
  document.documentElement.classList.add('corvo-rustic-variant');
  document.title='Gerador de Personagem — Sob as Asas do Corvo | Visual Rustic Fantasy | RPG Up';
  const src='https://raw.githubusercontent.com/henriquebot/litmv2br/main/rpgup/sob-as-asas-do-corvo/override.js?v='+Date.now();
  fetch(src,{cache:'no-store'}).then(r=>r.ok?r.text():'').then(code=>{
    if(!code)return;
    const s=document.createElement('script');
    s.textContent=code;
    document.body.appendChild(s);
  }).catch(()=>{});
})();