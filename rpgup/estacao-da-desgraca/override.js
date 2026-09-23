/* RPG Up — A Estação da Desgraça
   Foto do tripulante + editor dos 4 temas de Legend in the Mist.
*/
(function(){
  if (window.RPGUP_ESTACAO_ENHANCED) return;
  window.RPGUP_ESTACAO_ENHANCED = true;

  function el(id){ return document.getElementById(id); }
  function value(id){ var n=el(id); return n ? (n.value || "").trim() : ""; }
  function safeText(s,f){ s=(s||"").trim(); return s || f; }
  function later(fn){ setTimeout(fn,0); }

  var portraitData = "";
  var themeDirty = {};

  function installPortrait(){
    var callsign = el("callsign");
    var initials = el("initials");
    if (!callsign || !initials || el("portraitUpload")) return;

    initials.setAttribute("title","Clique para anexar a foto do tripulante");
    initials.setAttribute("role","button");
    initials.setAttribute("tabindex","0");
    initials.setAttribute("aria-label","Clique para anexar a foto do tripulante");

    var label = document.createElement("label");
    label.setAttribute("for","portraitUpload");
    label.textContent = "Foto de identificação";

    var input = document.createElement("input");
    input.type = "file";
    input.id = "portraitUpload";
    input.className = "portrait-upload";
    input.accept = "image/*";

    var controls = document.createElement("div");
    controls.className = "portrait-controls";

    var choose = document.createElement("button");
    choose.type = "button";
    choose.className = "action secondary";
    choose.textContent = "Anexar foto";

    var remove = document.createElement("button");
    remove.type = "button";
    remove.className = "action secondary";
    remove.textContent = "Remover foto";
    remove.style.display = "none";

    controls.appendChild(choose);
    controls.appendChild(remove);

    var help = document.createElement("div");
    help.className = "portrait-help";
    help.textContent = "Clique no quadro da ficha ou em “Anexar foto”. A imagem fica apenas no navegador e entra no PDF.";

    function openPicker(){ input.click(); }
    choose.addEventListener("click", openPicker);
    initials.addEventListener("click", openPicker);
    initials.addEventListener("keydown", function(e){
      if(e.key==="Enter" || e.key===" "){ e.preventDefault(); openPicker(); }
    });

    function clearPortrait(){
      portraitData = "";
      input.value = "";
      initials.classList.remove("has-portrait");
      initials.style.backgroundImage = "";
      remove.style.display = "none";
    }
    remove.addEventListener("click", clearPortrait);

    input.addEventListener("change", function(){
      var file = input.files && input.files[0];
      if (!file || !file.type || file.type.indexOf("image/") !== 0) return;

      var reader = new FileReader();
      reader.onload = function(ev){
        var img = new Image();
        img.onload = function(){
          var max = 1000;
          var scale = Math.min(1, max / Math.max(img.width,img.height));
          var c = document.createElement("canvas");
          c.width = Math.max(1, Math.round(img.width * scale));
          c.height = Math.max(1, Math.round(img.height * scale));
          var ctx = c.getContext("2d");
          ctx.drawImage(img,0,0,c.width,c.height);
          try { portraitData = c.toDataURL("image/jpeg",0.88); }
          catch(e){ portraitData = ev.target.result; }
          initials.style.backgroundImage = "url('" + portraitData + "')";
          initials.classList.add("has-portrait");
          remove.style.display = "";
        };
        img.src = ev.target.result;
      };
      reader.readAsDataURL(file);
    });

    callsign.insertAdjacentElement("afterend", help);
    callsign.insertAdjacentElement("afterend", controls);
    callsign.insertAdjacentElement("afterend", input);
    callsign.insertAdjacentElement("afterend", label);
  }

  var roleProfiles = [
    {weak:"confio demais nos instrumentos",quest:"Manter os sistemas vivos quando o protocolo disser para desistir.",tag:"improviso sob pressão"},
    {weak:"teimoso com procedimentos",quest:"Consertar o que ninguém mais consegue salvar.",tag:"ferramenta certa para o problema errado"},
    {weak:"me apego às máquinas",quest:"Provar que máquinas não são descartáveis quando tudo fica difícil.",tag:"leio comportamento de máquinas"},
    {weak:"carrego a responsabilidade de todos",quest:"Não perder ninguém enquanto estiver sob meus cuidados.",tag:"protocolos de emergência"},
    {weak:"não consigo ignorar um sinal estranho",quest:"Nunca deixar um pedido de socorro sem resposta.",tag:"rastreio de sinais impossíveis"},
    {weak:"questiono ordens que não fazem sentido",quest:"Entender o sistema antes que ele decida por mim.",tag:"encontro brechas no sistema"}
  ];

  var motiveProfiles = [
    {title:"Esse pagamento muda tudo",tags:["não volto de mãos vazias","faço as contas até no escuro","aguento mais um turno"],weak:"preciso demais desse pagamento",quest:"Voltar com dinheiro suficiente para resolver o problema que me trouxe até aqui."},
    {title:"Ninguém me conhece aqui",tags:["sei desaparecer","não olho para trás","aprendi a recomeçar"],weak:"fujo antes de encarar",quest:"Construir uma vida que não dependa do meu passado."},
    {title:"Meu grande salto",tags:["ambição calculada","aprendo rápido","faço meu nome"],weak:"preciso provar meu valor",quest:"Fazer desta missão o trabalho que muda minha carreira."},
    {title:"Tenho alguém esperando",tags:["uma promessa me mantém de pé","sempre encontro um caminho de volta","sei o que preciso proteger"],weak:"não consigo deixar os meus para trás",quest:"Voltar vivo para quem está me esperando."},
    {title:"Preciso saber",tags:["não deixo perguntas abertas","leio padrões onde ninguém olha","vou até o fim de uma pista"],weak:"curiosidade antes da cautela",quest:"Descobrir a resposta que tornou esta viagem impossível de recusar."},
    {title:"Contrato sem saída",tags:["aguentei coisa pior","funciono sob pressão","sei sobreviver a gente difícil"],weak:"não sei dizer não",quest:"Sair desta missão com mais liberdade do que quando entrei."}
  ];

  function leftProfile(txt){
    var s = (txt||"").toLowerCase();
    if (/filh|crian/.test(s)) return {title:"Prometi que voltaria",tags:["família acima de tudo","não quebro promessas","guardo cada lembrança"],weak:"qualquer criança me desmonta",quest:"Voltar para meu filho e cumprir o que prometi."};
    if (/companhe|espos|marid|namor/.test(s)) return {title:"Ainda somos nós",tags:["amor à distância","sei o que quero proteger","não desisto fácil de alguém"],weak:"culpa por ter vindo",quest:"Voltar e consertar o que deixei mal resolvido."};
    if (/mãe|mae|pai/.test(s)) return {title:"Antes que seja tarde",tags:["laços de família","promessa de retorno","carrego conselhos antigos"],weak:"medo de chegar tarde demais",quest:"Voltar a tempo de cumprir minha promessa."};
    if (/irmã|irma|irmão|irmao/.test(s)) return {title:"Dívidas de família",tags:["família conhece meus defeitos","sempre pago o que devo","sei quando alguém está escondendo algo"],weak:"velhas culpas voltam fácil",quest:"Voltar e acertar as contas com minha família."};
    if (/negócio|negocio|empresa|loja/.test(s)) return {title:"Tem algo meu lá fora",tags:["construí do zero","sei fazer render","não abandono o que construí"],weak:"minha cabeça ainda está no trabalho",quest:"Voltar antes que tudo o que construí desapareça."};
    if (/investiga|processo|autoridade/.test(s)) return {title:"Pendências em casa",tags:["sei guardar segredos","leio intenções","tenho cuidado com registros"],weak:"olho por cima do ombro",quest:"Voltar em posição de resolver o que deixei pendente."};
    return {title:"Ainda tenho para onde voltar",tags:["uma promessa me move","não esqueço de onde vim","sempre penso na volta"],weak:"minha cabeça ainda está lá",quest:"Voltar e resolver o que deixei para trás."};
  }

  function incidentProfile(txt,obj){
    var s=(txt||"").toLowerCase();
    var objectTag = "meu objeto pessoal";
    var o=(obj||"").toLowerCase();
    if (/foto/.test(o)) objectTag="fotografia dobrada";
    else if (/ferrament|chave/.test(o)) objectTag="ferramenta de confiança";
    else if (/gravador/.test(o)) objectTag="gravador analógico";
    else if (/carta/.test(o)) objectTag="carta lacrada";
    else if (/relóg|relog/.test(o)) objectTag="relógio de casa";
    else if (/caderno/.test(o)) objectTag="caderno de campo";
    else if (/brinquedo/.test(o)) objectTag="pequeno mecanismo";

    if (/protocolo/.test(s)) return {title:"Quebro protocolo por um motivo",tags:["decido rápido",objectTag,"sei quando a regra atrapalha"],weak:"autoridade não me convence",quest:"Provar que meu julgamento salva mais do que arrisca."};
    if (/insônia|insonia|criog/.test(s)) return {title:"Eu acordo com qualquer ruído",tags:["hipervigilante",objectTag,"sono leve demais"],weak:"exaustão acumulada",quest:"Manter a cabeça no lugar até o fim desta missão."};
    if (/superior|ordem|insegur/.test(s)) return {title:"Não obedeço ordens ruins",tags:["instinto para perigo",objectTag,"bato de frente quando preciso"],weak:"insubordinado",quest:"Nunca mais cumprir uma ordem que eu saiba que vai matar alguém."};
    if (/logs|apagar|evid/.test(s)) return {title:"Eu guardo recibos",tags:["memória documental",objectTag,"sempre deixo uma cópia"],weak:"desconfio de todo mundo",quest:"Garantir que a verdade sobreviva comigo."};
    if (/equipe|trabalho em equipe/.test(s)) return {title:"Melhor em crise do que em equipe",tags:["sangue frio",objectTag,"funciono quando tudo dá errado"],weak:"difícil de conviver",quest:"Provar que consigo depender dos outros sem perder o controle."};
    if (/acidente|sobrevive/.test(s)) return {title:"Sobrevivi uma vez",tags:["reflexo de sobrevivente",objectTag,"reconheço sinais de desastre"],weak:"o acidente ainda volta",quest:"Não deixar que outra equipe passe pelo que eu passei."};
    if (/cópia|copia|manuais|rede interna/.test(s)) return {title:"Faço minha própria cópia",tags:["preparo redundâncias",objectTag,"manual offline na cabeça"],weak:"paranoia profissional",quest:"Nunca ficar sem a informação que pode me manter vivo."};
    if (/silêncio|silencio/.test(s)) return {title:"O silêncio me incomoda",tags:["percebo pequenos ruídos",objectTag,"noto quando algo para de funcionar"],weak:"pânico no silêncio total",quest:"Descobrir por que o silêncio me assusta antes que ele me domine."};
    return {title:"Eu não embarco sem isso",tags:["funciono em crise",objectTag,"sempre guardo um plano B"],weak:"não abandono o que considero meu",quest:"Voltar com aquilo que me lembra quem eu sou."};
  }

  function getRoleIndex(){
    try { return typeof selectedRole !== "undefined" ? selectedRole : 0; } catch(e){ return 0; }
  }
  function getMotiveIndex(){
    try { return typeof selectedMotive !== "undefined" ? selectedMotive : 0; } catch(e){ return 0; }
  }
  function getData(){
    try { return typeof DATA !== "undefined" ? DATA : null; } catch(e){ return null; }
  }

  function buildThemes(){
    var d=getData();
    var ri=getRoleIndex(), mi=getMotiveIndex();
    var customRole=value("roleCustom");
    var role = customRole || (d && d.roles && d.roles[ri] ? d.roles[ri].name : "Especialista de estação");
    var roleTags = d && d.roles && d.roles[ri] ? d.roles[ri].tags.slice(0,2) : ["especialista treinado","improviso sob pressão"];
    if (customRole) roleTags=["especialista treinado","improviso sob pressão"];
    var rp=roleProfiles[ri] || {weak:"carrego responsabilidades demais",quest:"Fazer meu trabalho direito quando tudo começar a falhar.",tag:"improviso sob pressão"};
    roleTags.push(rp.tag);

    var mp=motiveProfiles[mi] || motiveProfiles[0];
    var lp=leftProfile(value("leftBehind"));
    var ip=incidentProfile(value("incident"),value("object"));

    return [
      {type:"Origem · Skill or Trade",title:role,tags:roleTags.slice(0,3),weak:rp.weak,quest:rp.quest},
      {type:"Origem · Devotion",title:mp.title,tags:mp.tags.slice(0,3),weak:mp.weak,quest:mp.quest},
      {type:"Origem · People",title:lp.title,tags:lp.tags.slice(0,3),weak:lp.weak,quest:lp.quest},
      {type:"Origem · Past",title:ip.title,tags:ip.tags.slice(0,3),weak:ip.weak,quest:ip.quest}
    ];
  }

  function fieldId(i,key){ return "litm-theme-"+i+"-"+key; }
  function isDirty(i,key){ return !!themeDirty[i+":"+key]; }
  function markDirty(i,key){ themeDirty[i+":"+key]=true; }

  function setSuggested(i,key,val,force){
    var n=el(fieldId(i,key));
    if (!n) return;
    if (force || !isDirty(i,key)) n.value = val || "";
  }

  function themeCard(t,i){
    var div=document.createElement("article");
    div.className="theme-card";
    div.dataset.themeIndex=String(i);
    div.innerHTML =
      '<div class="theme-card-top">'+
        '<div style="flex:1;min-width:0"><span class="theme-no">TEMA 0'+(i+1)+'</span></div>'+
        '<button type="button" class="theme-reset">Restaurar sugestões</button>'+
      '</div>'+
      '<div class="theme-row" style="border-top:0;margin-top:0;padding-top:0"><label class="theme-label" for="'+fieldId(i,"title")+'">Título do tema</label><input class="theme-editor theme-title-input" id="'+fieldId(i,"title")+'"></div>'+
      '<div class="theme-row"><label class="theme-label" for="'+fieldId(i,"type")+'">Tipo / Themebook</label><input class="theme-editor theme-type-input" id="'+fieldId(i,"type")+'"></div>'+
      '<div class="theme-row"><span class="theme-label">Tags de poder</span><div class="theme-tag-grid">'+
        '<input class="theme-editor" id="'+fieldId(i,"tag0")+'" placeholder="Tag 1">'+
        '<input class="theme-editor" id="'+fieldId(i,"tag1")+'" placeholder="Tag 2">'+
        '<input class="theme-editor" id="'+fieldId(i,"tag2")+'" placeholder="Tag 3">'+
      '</div><div class="theme-hint">As sugestões são um ponto de partida. Edite livremente.</div></div>'+
      '<div class="theme-row"><label class="theme-label" for="'+fieldId(i,"weak")+'">Fraqueza</label><input class="theme-editor" id="'+fieldId(i,"weak")+'"></div>'+
      '<div class="theme-row"><label class="theme-label" for="'+fieldId(i,"quest")+'">Quest</label><textarea class="theme-editor" id="'+fieldId(i,"quest")+'"></textarea></div>';

    ["title","type","tag0","tag1","tag2","weak","quest"].forEach(function(key){
      var n=div.querySelector("#"+fieldId(i,key));
      if (n) n.addEventListener("input",function(){ markDirty(i,key); });
    });

    div.querySelector(".theme-reset").addEventListener("click",function(){
      ["title","type","tag0","tag1","tag2","weak","quest"].forEach(function(key){ delete themeDirty[i+":"+key]; });
      applyThemeSuggestions(i,t,true);
    });
    return div;
  }

  function applyThemeSuggestions(i,t,force){
    setSuggested(i,"title",t.title,force);
    setSuggested(i,"type",t.type,force);
    setSuggested(i,"tag0",t.tags[0]||"",force);
    setSuggested(i,"tag1",t.tags[1]||"",force);
    setSuggested(i,"tag2",t.tags[2]||"",force);
    setSuggested(i,"weak",t.weak,force);
    setSuggested(i,"quest",t.quest,force);
  }

  function installThemes(){
    if (el("litmThemesPanel")) return;
    var grid=document.querySelector(".grid");
    if (!grid) return;
    var panel=document.createElement("section");
    panel.id="litmThemesPanel";
    panel.className="themes-panel";
    panel.innerHTML =
      '<div class="themes-head"><strong>Anexo de Perfil // Legend in the Mist</strong><span>4 temas personalizáveis</span></div>'+
      '<p class="themes-intro">As escolhas do dossiê preenchem sugestões automáticas. Você pode editar o título, o tipo, as tags, a fraqueza e a Quest de cada tema antes de copiar ou imprimir.</p>'+
      '<div class="themes-toolbar"><button type="button" class="action secondary" id="litmRestoreAll">Restaurar todas as sugestões</button></div>'+
      '<div class="theme-grid" id="litmThemeGrid"></div>';
    grid.insertAdjacentElement("afterend",panel);

    var g=el("litmThemeGrid");
    buildThemes().forEach(function(t,i){
      g.appendChild(themeCard(t,i));
      applyThemeSuggestions(i,t,true);
    });

    el("litmRestoreAll").addEventListener("click",function(){
      themeDirty={};
      refreshThemeSuggestions(true);
    });
  }

  function refreshThemeSuggestions(force){
    installThemes();
    buildThemes().forEach(function(t,i){ applyThemeSuggestions(i,t,!!force); });
  }

  function readThemes(){
    var fallback=buildThemes();
    return fallback.map(function(t,i){
      return {
        type:safeText(value(fieldId(i,"type")),t.type),
        title:safeText(value(fieldId(i,"title")),t.title),
        tags:[
          safeText(value(fieldId(i,"tag0")),t.tags[0]||""),
          safeText(value(fieldId(i,"tag1")),t.tags[1]||""),
          safeText(value(fieldId(i,"tag2")),t.tags[2]||"")
        ].filter(Boolean),
        weak:safeText(value(fieldId(i,"weak")),t.weak),
        quest:safeText(value(fieldId(i,"quest")),t.quest)
      };
    });
  }

  function themesText(){
    return readThemes().map(function(t,i){
      return "TEMA "+(i+1)+" — "+t.title+"\nTipo: "+t.type+"\nTags de poder: "+t.tags.join(" • ")+"\nFraqueza: "+t.weak+"\nQuest: "+t.quest;
    }).join("\n\n");
  }

  function installCopyOverride(){
    var b=el("copy");
    if (!b) return;
    b.onclick=async function(){
      var name=safeText(value("name"),"[PENDENTE]");
      var d=getData(), ri=getRoleIndex(), mi=getMotiveIndex();
      var role=safeText(value("roleCustom"), (d && d.roles && d.roles[ri] ? d.roles[ri].name : "Especialista"));
      var motive=safeText(value("motiveCustom"), (d && d.motives && d.motives[mi] ? d.motives[mi].text : ""));
      var out =
        "A ESTAÇÃO DA DESGRAÇA — DOSSIÊ DE CONTRATADO\n\n"+
        "NOME: "+name+"\n"+
        "IDENTIFICAÇÃO DE EQUIPE: "+safeText(value("callsign"),name.split(" ").slice(-1)[0])+"\n"+
        "FUNÇÃO: "+role+"\n\n"+
        "POR QUE ACEITOU A MISSÃO:\n"+motive+"\n\n"+
        "O QUE FICOU PARA TRÁS:\n"+safeText(value("leftBehind"),"Não informado.")+"\n\n"+
        "REGISTRO INTERNO:\n"+safeText(value("incident"),"Não informado.")+"\n\n"+
        "OBJETO PESSOAL:\n"+safeText(value("object"),"Não informado.")+"\n\n"+
        "=== 4 TEMAS — LEGEND IN THE MIST ===\n\n"+themesText()+"\n\nGerado pelo RPG Up.";
      try{
        await navigator.clipboard.writeText(out);
        b.textContent="Copiado ✓";
        setTimeout(function(){b.textContent="Copiar dossiê";},1400);
      }catch(e){
        window.prompt("Copie o dossiê:",out);
      }
    };
  }

  function keepPortrait(){
    var initials=el("initials");
    if (!initials || !portraitData) return;
    initials.style.backgroundImage="url('"+portraitData+"')";
    initials.classList.add("has-portrait");
  }

  function refresh(){
    keepPortrait();
    refreshThemeSuggestions(false);
  }

  installPortrait();
  installThemes();
  installCopyOverride();
  refreshThemeSuggestions(true);

  var generate=el("generate");
  if (generate) generate.textContent="Gerar personagem + 4 temas";

  ["name","callsign","roleCustom","motiveCustom","leftBehind","incident","object"].forEach(function(id){
    var n=el(id);
    if (n) n.addEventListener("input",function(){ later(refresh); });
  });
  ["roles","motives","randomLeft","randomIncident","randomAll","generate"].forEach(function(id){
    var n=el(id);
    if (n) n.addEventListener("click",function(){ later(refresh); });
  });

  var mo=new MutationObserver(function(){ keepPortrait(); });
  var initials=el("initials");
  if (initials) mo.observe(initials,{childList:true,characterData:true,subtree:true});
})();