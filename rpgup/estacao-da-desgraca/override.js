/* RPG Up — A Estação da Desgraça
   Foto do tripulante + geração automática dos 4 temas de Legend in the Mist.
*/
(function(){
  if (window.RPGUP_ESTACAO_ENHANCED) return;
  window.RPGUP_ESTACAO_ENHANCED = true;

  function el(id){ return document.getElementById(id); }
  function value(id){ var n=el(id); return n ? (n.value || "").trim() : ""; }
  function safeText(s,f){ s=(s||"").trim(); return s || f; }
  function later(fn){ setTimeout(fn,0); }

  var portraitData = "";

  function installPortrait(){
    var callsign = el("callsign");
    var initials = el("initials");
    if (!callsign || !initials || el("portraitUpload")) return;

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
    choose.textContent = "Enviar foto do tripulante";

    var remove = document.createElement("button");
    remove.type = "button";
    remove.className = "action secondary";
    remove.textContent = "Remover foto";
    remove.style.display = "none";

    var help = document.createElement("div");
    help.className = "portrait-help";
    help.textContent = "A imagem fica apenas no navegador e entra no dossiê/PDF.";

    choose.addEventListener("click", function(){ input.click(); });
    initials.addEventListener("click", function(){ input.click(); });

    function clearPortrait(){
      portraitData = "";
      initials.classList.remove("has-portrait");
      initials.style.backgroundImage = "";
      remove.style.display = "none";
    }
    remove.addEventListener("click", clearPortrait);

    input.addEventListener("change", function(){
      var file = input.files && input.files[0];
      if (!file) return;
      if (!file.type || file.type.indexOf("image/") !== 0) return;

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
    {weak:"confio demais nos instrumentos",quest:"Manter os sistemas vivos quando o protocolo disser para desistir."},
    {weak:"teimoso com procedimentos",quest:"Consertar o que ninguém mais consegue salvar."},
    {weak:"me apego às máquinas",quest:"Provar que máquinas não são descartáveis quando tudo fica difícil."},
    {weak:"carrego a responsabilidade de todos",quest:"Não perder ninguém enquanto estiver sob meus cuidados."},
    {weak:"não consigo ignorar um sinal estranho",quest:"Nunca deixar um pedido de socorro sem resposta."},
    {weak:"questiono ordens que não fazem sentido",quest:"Entender o sistema antes que ele decida por mim."}
  ];

  var motiveProfiles = [
    {title:"Esse pagamento muda tudo",tags:["não volto de mãos vazias","faço as contas até no escuro"],weak:"preciso demais desse pagamento",quest:"Voltar com dinheiro suficiente para resolver o problema que me trouxe até aqui."},
    {title:"Ninguém me conhece aqui",tags:["sei desaparecer","não olho para trás"],weak:"fujo antes de encarar",quest:"Construir uma vida que não dependa do meu passado."},
    {title:"Meu grande salto",tags:["ambição calculada","aprendo rápido"],weak:"preciso provar meu valor",quest:"Fazer desta missão o trabalho que muda minha carreira."},
    {title:"Tenho alguém esperando",tags:["uma promessa me mantém de pé","sempre encontro um caminho de volta"],weak:"não consigo deixar os meus para trás",quest:"Voltar vivo para quem está me esperando."},
    {title:"Preciso saber",tags:["não deixo perguntas abertas","leio padrões onde ninguém olha"],weak:"curiosidade antes da cautela",quest:"Descobrir a resposta que tornou esta viagem impossível de recusar."},
    {title:"Contrato sem saída",tags:["aguentei coisa pior","funciono sob pressão"],weak:"não sei dizer não",quest:"Sair desta missão com mais liberdade do que quando entrei."}
  ];

  function leftProfile(txt){
    var s = (txt||"").toLowerCase();
    if (/filh|crian/.test(s)) return {title:"Prometi que voltaria",tags:["família acima de tudo","não quebro promessas"],weak:"qualquer criança me desmonta",quest:"Voltar para meu filho e cumprir o que prometi."};
    if (/companhe|espos|marid|namor/.test(s)) return {title:"Ainda somos nós",tags:["amor à distância","sei o que quero proteger"],weak:"culpa por ter vindo",quest:"Voltar e consertar o que deixei mal resolvido."};
    if (/mãe|mae|pai/.test(s)) return {title:"Antes que seja tarde",tags:["laços de família","promessa de retorno"],weak:"medo de chegar tarde demais",quest:"Voltar a tempo de cumprir minha promessa."};
    if (/irmã|irma|irmão|irmao/.test(s)) return {title:"Dívidas de família",tags:["família conhece meus defeitos","sempre pago o que devo"],weak:"velhas culpas voltam fácil",quest:"Voltar e acertar as contas com minha família."};
    if (/negócio|negocio|empresa|loja/.test(s)) return {title:"Tem algo meu lá fora",tags:["construí do zero","sei fazer render"],weak:"minha cabeça ainda está no trabalho",quest:"Voltar antes que tudo o que construí desapareça."};
    if (/investiga|processo|autoridade/.test(s)) return {title:"Pendências em casa",tags:["sei guardar segredos","leio intenções"],weak:"olho por cima do ombro",quest:"Voltar em posição de resolver o que deixei pendente."};
    return {title:"Ainda tenho para onde voltar",tags:["uma promessa me move","não esqueço de onde vim"],weak:"minha cabeça ainda está lá",quest:"Voltar e resolver o que deixei para trás."};
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

    if (/protocolo/.test(s)) return {title:"Quebro protocolo por um motivo",tags:["decido rápido",objectTag],weak:"autoridade não me convence",quest:"Provar que meu julgamento salva mais do que arrisca."};
    if (/insônia|insonia|criog/.test(s)) return {title:"Eu acordo com qualquer ruído",tags:["hipervigilante",objectTag],weak:"exaustão acumulada",quest:"Manter a cabeça no lugar até o fim desta missão."};
    if (/superior|ordem|insegur/.test(s)) return {title:"Não obedeço ordens ruins",tags:["instinto para perigo",objectTag],weak:"insubordinado",quest:"Nunca mais cumprir uma ordem que eu saiba que vai matar alguém."};
    if (/logs|apagar|evid/.test(s)) return {title:"Eu guardo recibos",tags:["memória documental",objectTag],weak:"desconfio de todo mundo",quest:"Garantir que a verdade sobreviva comigo."};
    if (/equipe|trabalho em equipe/.test(s)) return {title:"Melhor em crise do que em equipe",tags:["sangue frio",objectTag],weak:"difícil de conviver",quest:"Provar que consigo depender dos outros sem perder o controle."};
    if (/acidente|sobrevive/.test(s)) return {title:"Sobrevivi uma vez",tags:["reflexo de sobrevivente",objectTag],weak:"o acidente ainda volta",quest:"Não deixar que outra equipe passe pelo que eu passei."};
    if (/cópia|copia|manuais|rede interna/.test(s)) return {title:"Faço minha própria cópia",tags:["preparo redundâncias",objectTag],weak:"paranoia profissional",quest:"Nunca ficar sem a informação que pode me manter vivo."};
    if (/silêncio|silencio/.test(s)) return {title:"O silêncio me incomoda",tags:["percebo pequenos ruídos",objectTag],weak:"pânico no silêncio total",quest:"Descobrir por que o silêncio me assusta antes que ele me domine."};
    return {title:"Eu não embarco sem isso",tags:["funciono em crise",objectTag],weak:"não abandono o que considero meu",quest:"Voltar com aquilo que me lembra quem eu sou."};
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
    var rp=roleProfiles[ri] || {weak:"carrego responsabilidades demais",quest:"Fazer meu trabalho direito quando tudo começar a falhar."};
    var mp=motiveProfiles[mi] || motiveProfiles[0];
    var lp=leftProfile(value("leftBehind"));
    var ip=incidentProfile(value("incident"),value("object"));

    return [
      {type:"Origem · Skill or Trade",title:role,tags:roleTags,weak:rp.weak,quest:rp.quest},
      {type:"Origem · Devotion",title:mp.title,tags:mp.tags,weak:mp.weak,quest:mp.quest},
      {type:"Origem · People",title:lp.title,tags:lp.tags,weak:lp.weak,quest:lp.quest},
      {type:"Origem · Past",title:ip.title,tags:ip.tags,weak:ip.weak,quest:ip.quest}
    ];
  }

  function themeCard(t,i){
    var div=document.createElement("article");
    div.className="theme-card";
    div.innerHTML =
      '<div class="theme-card-top"><div><span class="theme-no">TEMA 0'+(i+1)+'</span><h3></h3></div><span class="theme-type"></span></div>'+
      '<div class="theme-row"><span class="theme-label">Tags de poder sugeridas</span><div class="theme-tags"></div></div>'+
      '<div class="theme-row"><span class="theme-label">Fraqueza</span><div class="theme-tags"><span class="theme-weakness"></span></div></div>'+
      '<div class="theme-row"><span class="theme-label">Quest</span><div class="theme-quest"></div></div>';
    div.querySelector("h3").textContent=t.title;
    div.querySelector(".theme-type").textContent=t.type;
    var tags=div.querySelector(".theme-tags");
    t.tags.forEach(function(x){ var s=document.createElement("span");s.className="theme-power";s.textContent=x;tags.appendChild(s); });
    div.querySelector(".theme-weakness").textContent=t.weak;
    div.querySelector(".theme-quest").textContent=t.quest;
    return div;
  }

  function installThemes(){
    if (el("litmThemesPanel")) return;
    var grid=document.querySelector(".grid");
    if (!grid) return;
    var panel=document.createElement("section");
    panel.id="litmThemesPanel";
    panel.className="themes-panel";
    panel.innerHTML =
      '<div class="themes-head"><strong>Anexo de Perfil // Legend in the Mist</strong><span>4 temas gerados automaticamente</span></div>'+
      '<p class="themes-intro">O dossiê abaixo transforma suas escolhas em uma ficha inicial jogável. As sugestões podem ser editadas com o mestre antes da sessão.</p>'+
      '<div class="theme-grid" id="litmThemeGrid"></div>';
    grid.insertAdjacentElement("afterend",panel);
  }

  function renderThemes(){
    installThemes();
    var g=el("litmThemeGrid");
    if (!g) return;
    g.innerHTML="";
    buildThemes().forEach(function(t,i){ g.appendChild(themeCard(t,i)); });
  }

  function themesText(){
    return buildThemes().map(function(t,i){
      return "TEMA "+(i+1)+" — "+t.title+"\nTipo: "+t.type+"\nTags de poder: "+t.tags.join(" • ")+"\nFraqueza: "+t.weak+"\nQuest: "+t.quest;
    }).join("\n\n");
  }

  function installCopyOverride(){
    var b=el("copy");
    if (!b) return;
    b.onclick=async function(){
      var name=safeText(value("name"),"[PENDENTE]");
      var role=safeText(value("roleCustom"), (getData() && getData().roles[getRoleIndex()] ? getData().roles[getRoleIndex()].name : "Especialista"));
      var motive=safeText(value("motiveCustom"), (getData() && getData().motives[getMotiveIndex()] ? getData().motives[getMotiveIndex()].text : ""));
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
    renderThemes();
  }

  installPortrait();
  installThemes();
  installCopyOverride();
  renderThemes();

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