/* RPG Up — Sob as Asas do Corvo
   Revisão de Power Tags + opções extraordinárias sutis.
   Mantido via ChatGPT/GitHub.
*/
(function(){
  if (window.RPGUP_CORVO_REVIEWED_TAGS) return;
  window.RPGUP_CORVO_REVIEWED_TAGS = true;

  function init(){
    const $ = id => document.getElementById(id);
    const safe = (v,f='') => (v||'').trim() || f;
    const activeTitle = id => {
      const n = document.querySelector('#'+id+' .choice.active strong');
      return n ? n.textContent.trim() : '';
    };
    const field = (i,k) => $('theme-'+i+'-'+k);

    const reviewed = {
      concept: {
        'Caçador ou mateiro':['seguir rastros em terreno selvagem','orientar-me por sinais da mata'],
        'Artesão ou ferreiro':['consertar objetos com ferramentas simples','identificar como algo foi feito'],
        'Curandeiro ou herbalista':['identificar ervas e preparados','estabilizar ferimentos e doenças comuns'],
        'Guarda ou vigia':['manter vigília por horas','conter uma briga sem perder o controle'],
        'Lavrador ou criador':['acalmar e conduzir animais','força e resistência do trabalho no campo'],
        'Mascate ou comerciante':['avaliar mercadorias e falsificações','negociar preço e troca'],
        'Músico ou contador de histórias':['prender a atenção com música ou histórias','lembrar lendas, versos e cantigas'],
        'Escriba ou estudioso':['encontrar informação em registros','cruzar detalhes de textos e relatos'],
        'Peregrino ou devoto':['conhecer ritos, tabus e costumes','manter a coragem pela fé'],
        'Andarilho ou fora-da-lei':['despistar perseguidores','improvisar abrigo ou ferramenta com pouco'],
        'Servo ou criado de casa importante':['passar despercebido em casas importantes','ler etiqueta e hierarquias sociais'],
        'Forasteiro recém-chegado':['comparar costumes de lugares diferentes','adaptar-me rapidamente a um lugar novo']
      },
      reason: {
        'Procurar alguém':['seguir pistas sobre uma pessoa','reconhecer hábitos e sinais de quem procuro'],
        'Fugir de alguma coisa':['perceber quando estou sendo seguido','esconder rastros e intenções'],
        'Conhecer o mundo':['fazer perguntas sem parecer uma ameaça','criar laços com desconhecidos'],
        'Cumprir uma missão':['manter o foco sob pressão','lembrar detalhes da promessa ou missão'],
        'Buscar conhecimento':['formular perguntas que revelam detalhes','reconhecer referências antigas'],
        'Encontrar uma nova vida':['adaptar-me a uma rotina nova','causar uma boa primeira impressão'],
        'Investigar um mistério':['perceber inconsistências','ligar pistas distantes'],
        'Acompanhar ou proteger alguém':['notar ameaças à pessoa protegida','interpor-me no momento certo'],
        'Buscar uma cura':['reconhecer sintomas e pistas de tratamento','suportar privações para continuar a busca'],
        'Escapar de mim mesmo':['reconhecer padrões dos meus velhos erros','recomeçar depois de falhar']
      },
      relation: {
        'Família':['conheço hábitos e sinais dos meus','rede de parentes e conhecidos nos Vales'],
        'Amor ou antiga paixão':['sei acalmar essa pessoa','uma promessa entre nós me mantém firme'],
        'Mentor ou mestre':['treinamento que meu mestre me ensinou','reconhecer técnicas e sinais do seu método'],
        'Amigo de infância':['confiança sem palavras','memórias e contatos que compartilhamos'],
        'Rival':['sei como meu rival pensa','competição aguça meu foco'],
        'Minha comunidade':['conheço costumes e rumores de vilas pequenas','rede de vizinhos e conhecidos'],
        'Alguém a quem devo':['conheço a rede de favores dessa pessoa','negociar prazo e contrapartida'],
        'Alguém que me deve':['sei quem pode me levar até essa pessoa','guardo provas da promessa feita'],
        'Mortimer Ramirez':['Mortimer me reconhece pelo nome','conheço hábitos e rotinas da caravana'],
        'Alguém que volta com a caravana todo ano':['reconheço seus hábitos e sinais','sei onde procurá-lo quando a caravana chega']
      },
      past: {
        'Uma dívida antiga':['negociar prazos e condições','conheço cobradores e redes de favores'],
        'Um erro que feriu alguém':['reconhecer sinais de desastre','agir rápido para tirar alguém do perigo'],
        'Uma acusação nunca esclarecida':['perceber quando alguém procura um culpado','guardar e organizar provas'],
        'Alguém desapareceu':['reconhecer hábitos e marcas de quem sumiu','seguir pistas ligadas ao desaparecimento'],
        'Uma promessa quebrada':['reconhecer quando alguém está prestes a desistir','sei o peso de juramentos'],
        'Um lugar ao qual não posso voltar':['sobreviver sem apoio conhecido','perceber quando não sou bem-vindo'],
        'Uma herança estranha':['reconhecer símbolos ligados à herança','proteger e esconder o que recebi'],
        'Um segredo de família':['perceber silêncios e meias-verdades','lembrar fragmentos de histórias antigas'],
        'Um antigo cativeiro ou controle':['reconhecer táticas de controle','achar saídas e pontos fracos de contenção'],
        'Um encontro com o impossível':['lembrar detalhes sobrenaturais','reconhecer sinais do mesmo tipo de fenômeno'],
        'Alguém partiu com a caravana e nunca voltou':['lembrar o que essa pessoa levou e deixou para trás','reconhecer pistas ligadas àquela partida'],
        'Uma promessa feita numa passagem anterior da caravana':['lembrar detalhes daquela promessa','reconhecer quem estava presente quando ela foi feita']
      },
      nature: {
        'Sou não-humano e isso é visível':['um sentido próprio da minha espécie','uma capacidade física que humanos não possuem'],
        'Sou não-humano, mas escondo isso':['manter meu disfarce convincente','uma habilidade própria da minha verdadeira natureza'],
        'Tenho sangue ou marca feérica':['perceber presença feérica','resistir a encantos que parecem familiares'],
        'Fui criado longe da sociedade':['sobreviver longe de vilas','conhecer costumes antigos ou incomuns'],
        'Fui tratado como curiosidade ou propriedade':['perceber quando alguém quer me usar','escapar de contenção ou vigilância']
      },
      viktor: {
        'Fugi dele':'reconhecer os métodos usados pelos homens de Viktor',
        'Minha família teve relação com ele':'minha família conhece a rede de Viktor',
        'Trabalhei para ele':'conheço rotinas e métodos de Viktor',
        'Procuro alguém ligado a ele':'seguir pistas que levam até a rede de Viktor',
        'Sei algo que não deveria':'carrego informação comprometedora sobre Viktor',
        'Sofri as consequências de suas ações':'reconheço sinais das ações de Viktor'
      }
    };

    const baseSuggestionProfiles={"concepts":{"Caçador ou mateiro":["Skill or Trade","Conhecedor das trilhas","confio mais na mata do que nas pessoas","Descobrir o que existe além das trilhas que conheço."],"Artesão ou ferreiro":["Skill or Trade","Mãos de ofício","não sei deixar um trabalho pela metade","Criar algo que sobreviva à minha antiga vida."],"Curandeiro ou herbalista":["Skill or Trade","Remédios dos Vales","assumo a dor dos outros como minha","Aprender uma cura que minha comunidade não conhece."],"Guarda ou vigia":["Skill or Trade","Olhos de vigia","vejo suspeitos antes de ver estranhos","Descobrir que tipo de pessoa sou quando ninguém me dá ordens."],"Lavrador ou criador":["Skill or Trade","Filho da terra","penso pequeno quando o mundo fica grande demais","Ver com meus próprios olhos o que existe além dos campos."],"Mascate ou comerciante":["Skill or Trade","Tudo tem seu preço","sempre calculo o que posso ganhar","Encontrar a oportunidade que nunca apareceria ficando em casa."],"Músico ou contador de histórias":["Skill or Trade","Histórias ao redor da fogueira","às vezes prefiro uma boa história à verdade","Voltar um dia com uma história que ninguém nos Vales conhece."],"Escriba ou estudioso":["Skill or Trade","Leitor do que foi escrito","preciso entender antes de deixar para lá","Encontrar uma resposta que meus livros não possuem."],"Peregrino ou devoto":["Devotion","Caminho de devoção","interpreto sinais onde talvez não existam","Descobrir o que minha fé exige de mim longe de casa."],"Andarilho ou fora-da-lei":["Circumstance","Sempre de passagem","demoro a confiar em qualquer autoridade","Encontrar um lugar onde eu não precise continuar fugindo."],"Servo ou criado de casa importante":["Skill or Trade","Conheço os bastidores","aprendi a engolir minha opinião","Viver uma história que finalmente seja minha."]},"reasons":{"Procurar alguém":["Devotion","Não vou parar de procurar","qualquer pista pode me fazer perder o rumo","Encontrar quem estou procurando — ou descobrir por que desapareceu."],"Fugir de alguma coisa":["Circumstance","Preciso pôr distância nisso","olho para trás mesmo quando não devo","Chegar longe o bastante para finalmente escolher meu próprio caminho."],"Conhecer o mundo":["Devotion","O mundo é maior que os Vales","subestimo perigos que nunca vi","Conhecer um lugar que antes existia apenas nas histórias."],"Cumprir uma missão":["Devotion","Eu dei minha palavra","minha promessa vem antes do meu conforto","Cumprir a missão que me colocou nesta estrada."],"Buscar conhecimento":["Devotion","Há algo que preciso entender","curiosidade antes da cautela","Descobrir a verdade por trás do mistério que me tirou de casa."],"Encontrar uma nova vida":["Devotion","Desta vez vai ser diferente","quero deixar problemas para trás sem resolvê-los","Construir uma vida que não pareça uma continuação da antiga."],"Investigar um mistério":["Devotion","Alguma coisa não fecha","não consigo ignorar uma pergunta aberta","Descobrir o que realmente está acontecendo nos Vales."],"Acompanhar ou proteger alguém":["Devotion","Não vai viajar sozinho","assumo riscos pelos outros","Garantir que a pessoa que acompanho chegue onde precisa chegar."],"Buscar uma cura":["Devotion","Existe uma cura em algum lugar","agarro-me a qualquer possibilidade de cura","Encontrar uma cura antes que seja tarde."],"Escapar de mim mesmo":["Past","Não quero ser quem eu era","meu passado sabe onde me ferir","Provar, principalmente para mim, que posso escolher diferente."]},"relations":{"Família":["People","Meu sangue, minha história","família sabe exatamente como me atingir","Descobrir o que minha família precisa de mim agora."],"Amor ou antiga paixão":["People","Uma pessoa que ainda importa","meu coração complica decisões simples","Descobrir o que ainda existe entre nós."],"Mentor ou mestre":["People","A voz do meu mestre","ainda busco aprovação que talvez nunca venha","Descobrir se devo seguir ou superar o caminho que me ensinaram."],"Amigo de infância":["People","Nós nos conhecemos desde antes","velhos hábitos voltam quando estamos juntos","Descobrir se nossa amizade sobrevive à estrada."],"Rival":["People","Sempre um passo à minha frente","não suporto parecer inferior","Descobrir se preciso vencer essa pessoa ou entendê-la."],"Minha comunidade":["People","Gente que me viu crescer","carrego a opinião da minha vila comigo","Voltar digno das histórias que contarão sobre mim."],"Alguém a quem devo":["People","Ainda estou em dívida","minha dívida pode falar mais alto que meu bom senso","Quitar a dívida sem criar outra pior."],"Alguém que me deve":["People","Ainda não terminamos","não sei deixar uma cobrança morrer","Conseguir o que me foi prometido — ou entender por que nunca veio."]},"pasts":{"Uma dívida antiga":["Past","Uma conta ainda aberta","a dívida sempre encontra um jeito de voltar","Encerrar essa dívida sem perder mais do que devo."],"Um erro que feriu alguém":["Past","Eu estava lá quando aconteceu","congelo quando algo lembra aquele dia","Encontrar uma forma de reparar o que ainda puder ser reparado."],"Uma acusação nunca esclarecida":["Past","Meu nome ficou manchado","fico defensivo quando duvidam de mim","Descobrir a verdade antes que o boato vire minha única história."],"Alguém desapareceu":["Past","O lugar vazio à mesa","qualquer semelhança reacende minha esperança","Descobrir o que realmente aconteceu."],"Uma promessa quebrada":["Past","Eu não cumpri minha palavra","promessas me atingem mais do que deveriam","Ter uma chance de fazer diferente quando outra promessa importar."],"Um lugar ao qual não posso voltar":["Past","A porta fechou atrás de mim","evito falar sobre de onde vim","Descobrir se quero voltar — e se ainda existe algo para voltar."],"Uma herança estranha":["Past","Algo foi deixado para mim","não sei por que fui escolhido","Descobrir o verdadeiro significado do que herdei."],"Um segredo de família":["Past","Na minha casa não se falava disso","tenho medo do que a verdade pode mudar","Descobrir o que minha família tentou esconder."],"Um antigo cativeiro ou controle":["Past","Ninguém volta a me prender","reajo mal quando tentam decidir por mim","Construir uma vida em que minhas escolhas sejam realmente minhas."],"Um encontro com o impossível":["Past","Eu vi algo que não devia existir","às vezes não confio nos meus próprios sentidos","Descobrir se aquilo foi real — e por que aconteceu comigo."]},"natures":{"Sou não-humano e isso é visível":["People","Estranho entre humanos","chamo atenção onde preferia passar despercebido"],"Sou não-humano, mas escondo isso":["People","Por trás do disfarce","meu disfarce falha sob pressão"],"Tenho sangue ou marca feérica":["Trait","Tocado pelo Feérico","o mundo feérico também me percebe"],"Fui criado longe da sociedade":["People","Criado fora das vilas","costumes comuns me confundem"],"Fui tratado como curiosidade ou propriedade":["Past","Nunca mais uma atração","reajo mal quando me tratam como coisa"]}};

    const subtleNatures = [
      {
        title:'Aprendi os Velhos Caminhos',
        hint:'ritos · presságios · tradição antiga',
        type:'Magic',
        theme:'Os Velhos Caminhos ainda lembram de mim',
        tags:['ler presságios em sinais naturais','realizar pequenos ritos de proteção'],
        weak:'os ritos exigem tempo, respeito e preparação',
        quest:'Descobrir quais partes dos Velhos Caminhos ainda são verdadeiras.'
      },
      {
        title:'Pratico bruxaria de soleira',
        hint:'amuletos · bênçãos · pequenas proteções',
        type:'Magic',
        theme:'Bruxaria de casa e caminho',
        tags:['preparar amuletos com coisas simples','benzer uma casa, caminho ou viajante'],
        weak:'preciso de ingredientes e alguns minutos de preparo',
        quest:'Descobrir até onde minha pequena bruxaria consegue me levar.'
      },
      {
        title:'Escuto espíritos inquietos',
        hint:'mortos · lugares · sussurros',
        type:'Magic',
        theme:'Vozes do outro lado',
        tags:['ouvir sussurros de espíritos','reconhecer um lugar assombrado'],
        weak:'os mortos também conseguem chamar minha atenção',
        quest:'Entender por que os espíritos começaram a falar comigo.'
      },
      {
        title:'Meus sonhos trazem presságios',
        hint:'sonhos · símbolos · coincidências',
        type:'Magic',
        theme:'Sonhos que deixam marcas',
        tags:['lembrar símbolos de sonhos proféticos','reconhecer quando um sonho se repete no mundo'],
        weak:'não sei distinguir um aviso verdadeiro de um medo meu',
        quest:'Descobrir o significado do sonho que continua voltando.'
      },
      {
        title:'A terra às vezes me responde',
        hint:'raízes · pedra · água · sensação',
        type:'Magic',
        theme:'A terra me conhece',
        tags:['sentir quando a terra foi perturbada','pedir ajuda discreta a raízes, pedras ou água'],
        weak:'meu vínculo enfraquece longe de solo vivo',
        quest:'Descobrir por que certos lugares parecem me reconhecer.'
      },
      {
        title:'Conheço runas antigas',
        hint:'marcas · selos · palavras velhas',
        type:'Magic',
        theme:'Runas que ainda guardam poder',
        tags:['ler runas antigas','traçar um selo simples de proteção ou aviso'],
        weak:'as runas exigem tempo e uma superfície adequada',
        quest:'Encontrar a origem das runas que aprendi a usar.'
      },
      {
        title:'Tenho um vínculo feérico discreto',
        hint:'favor · etiqueta · promessa',
        type:'Magic',
        theme:'Um favor do povo oculto',
        tags:['reconhecer regras e etiquetas feéricas','pedir um pequeno favor ao meu vínculo feérico'],
        weak:'todo favor feérico cria uma obrigação',
        quest:'Descobrir o que meu vínculo realmente espera de mim.'
      },
      {
        title:'Minha magia é pequena, mas real',
        hint:'truques · toque · percepção',
        type:'Magic',
        theme:'Pequenas coisas obedecem',
        tags:['mover, aquecer ou apagar pequenas coisas','sentir quando magia tocou um objeto ou lugar'],
        weak:'minha magia falha quando tento forçar demais',
        quest:'Descobrir se essa magia pequena pode se tornar algo maior.'
      },
      {
        title:'Meus sentidos são fora do comum',
        hint:'olfato · audição · percepção',
        type:'Trait',
        theme:'Sentidos além do comum',
        tags:['seguir um cheiro familiar','perceber mudanças sutis no ambiente'],
        weak:'sensível a cheiros, sons ou luzes fortes',
        quest:'Aprender a confiar nesses sentidos sem deixar que eles me dominem.'
      }
    ];

    let remoteNature = null;
    const userEdited=[false,false,false,false];

    const caravanProfiles={
      concept:{
        title:'Ajudante de estalagem ou hospedaria',
        hint:'hóspedes · rumores · festival',
        type:'Skill or Trade',
        theme:'Ouço mais do que pareço',
        tags:['lembrar rostos e pedidos de hóspedes','ouvir rumores sem chamar atenção'],
        weak:'às vezes sei coisas que seria melhor não saber',
        quest:'Descobrir o que existe além das histórias que ouvi de passagem.'
      },
      relations:[
        {
          title:'Mortimer Ramirez',
          hint:'líder da caravana · carismático · rosto conhecido',
          type:'People',
          theme:'Mortimer sempre volta a Lar dos Corvos',
          tags:['Mortimer me reconhece pelo nome','conheço hábitos e rotinas da caravana'],
          weak:'o carisma de Mortimer torna difícil desconfiar dele',
          quest:'Descobrir por que Mortimer parece prestar atenção em mim.'
        },
        {
          title:'Alguém que volta com a caravana todo ano',
          hint:'amizade · expectativa · festival anual',
          type:'People',
          theme:'Um rosto que sempre retorna',
          tags:['reconheço seus hábitos e sinais','sei onde procurá-lo quando a caravana chega'],
          weak:'espero que essa pessoa continue sendo quem eu lembro',
          quest:'Descobrir o que mudou desde a última passagem da caravana.'
        }
      ],
      pasts:[
        {
          title:'Alguém partiu com a caravana e nunca voltou',
          hint:'despedida · ausência · pergunta',
          type:'Past',
          theme:'A última vez que vi essa pessoa',
          tags:['lembrar o que essa pessoa levou e deixou para trás','reconhecer pistas ligadas àquela partida'],
          weak:'toda partida da caravana reabre essa ausência',
          quest:'Descobrir o que aconteceu depois que essa pessoa deixou Lar dos Corvos.'
        },
        {
          title:'Uma promessa feita numa passagem anterior da caravana',
          hint:'palavra dada · retorno · espera',
          type:'Past',
          theme:'Quando a caravana voltar',
          tags:['lembrar detalhes daquela promessa','reconhecer quem estava presente quando ela foi feita'],
          weak:'esperei por essa promessa por tempo demais',
          quest:'Descobrir se a promessa ainda vale depois de todos esses anos.'
        }
      ]
    };
    const customSource={concept:null,relation:null,past:null};

    const caravanSecretProfiles=[
      {
        title:'Tenho sangue do povo da caravana',
        hint:'ascendência · família · origem escondida',
        detail:'Parte da minha família veio do povo que viaja com a caravana — mas quase ninguém em Lar dos Corvos sabe disso.'
      }
    ];

    function suggestedThemeFor(index){
      function profile(group,title,tags){
        var m=baseSuggestionProfiles[group] && baseSuggestionProfiles[group][title];
        if(!m) return null;
        return {type:m[0],theme:m[1],tags:tags||[],weak:m[2],quest:m[3]||''};
      }

      if(index===0){
        if(customSource.concept){
          var cc=Object.assign({},customSource.concept);
          cc.theme=safe($("conceptCustom") && $("conceptCustom").value,cc.theme);
          return cc;
        }
        var ct=activeTitle("conceptChoices");
        var cp=profile("concepts",ct,reviewed.concept[ct]);
        if(!cp) return null;
        cp.theme=safe($("conceptCustom") && $("conceptCustom").value,cp.theme);
        return cp;
      }

      if(index===1){
        var rt=activeTitle("reasonChoices");
        var rp=profile("reasons",rt,reviewed.reason[rt]);
        if(!rp) return null;
        var rd=safe($("reasonCustom") && $("reasonCustom").value);
        if(rd) rp.quest="Levar esta decisão até o fim: "+rd;
        return rp;
      }

      if(index===2){
        if(customSource.relation){
          var cr=Object.assign({},customSource.relation);
          return cr;
        }
        var lt=activeTitle("relationChoices");
        var lp=profile("relations",lt,reviewed.relation[lt]);
        if(!lp) return null;
        var rn=safe($("relationName") && $("relationName").value);
        lp.theme=rn ? lt+": "+rn : lt;
        var ro=safe($("relationOpen") && $("relationOpen").value);
        if(ro) lp.quest="Descobrir o que fazer com este vínculo: "+ro;
        return lp;
      }

      if(index===3){
        var central=$("natureTheme") && $("natureTheme").checked;
        if(central){
          if(remoteNature) return Object.assign({},remoteNature);
          var nt=activeTitle("natureChoices");
          var nm=baseSuggestionProfiles.natures[nt];
          if(nm){
            return {
              type:nm[0],
              theme:nm[1],
              tags:reviewed.nature[nt]||[],
              weak:nm[2],
              quest:"Descobrir o que minha natureza significa quando eu finalmente estiver longe de onde cresci."
            };
          }
        }

        var pp=null;
        if(customSource.past){
          pp=Object.assign({},customSource.past);
        }else{
          var pt=activeTitle("pastChoices");
          pp=profile("pasts",pt,reviewed.past[pt]);
        }
        if(!pp) return null;

        var vt=activeTitle("viktorChoices");
        if(vt && vt!=="Não tenho vínculo com Viktor" && reviewed.viktor[vt]){
          pp.tags=(pp.tags||[]).slice();
          pp.tags[1]=reviewed.viktor[vt];
          pp.weak="meu vínculo com Viktor pode me alcançar";
        }
        return pp;
      }
      return null;
    }

    function refreshThemeFromSource(index){
      var t=suggestedThemeFor(index);
      if(!t) return;
      userEdited[index]=false;
      setFullTheme(index,t,true);
    }

    function refreshAllThemesFromSources(){
      [0,1,2,3].forEach(refreshThemeFromSource);
    }

    function setTags(i,tags,force){
      if(!force && userEdited[i]) return;
      if(field(i,'tag0')) field(i,'tag0').value=tags[0]||'';
      if(field(i,'tag1')) field(i,'tag1').value=tags[1]||'';
    }

    function setFullTheme(i,t,force){
      if(!force && userEdited[i]) return;
      if(field(i,'type')) field(i,'type').value=t.type;
      if(field(i,'title')) field(i,'title').value=t.theme;
      setTags(i,t.tags,true);
      if(field(i,'weak')) field(i,'weak').value=t.weak;
      if(field(i,'quest')) field(i,'quest').value=t.quest;
    }

    function syncCaravanCustom(force=false){
      const natureCentral=$('natureTheme') && $('natureTheme').checked;

      if(customSource.concept){
        const t=Object.assign({},customSource.concept);
        t.theme=safe($('conceptCustom') && $('conceptCustom').value,t.theme);
        setFullTheme(0,t,force);
        if($('outConcept')) $('outConcept').textContent=safe($('conceptCustom') && $('conceptCustom').value,t.title);
      }

      if(customSource.relation){
        const name=safe($('relationName') && $('relationName').value);
        const detail=safe($('relationOpen') && $('relationOpen').value);
        const shown=customSource.relation.title+(name?' — '+name:'');
        setFullTheme(2,customSource.relation,force);
        if($('outRelation')) $('outRelation').textContent=shown+(detail?' — '+detail:'');
      }

      if(customSource.past && !natureCentral){
        const detail=safe($('pastDetail') && $('pastDetail').value);
        setFullTheme(3,customSource.past,force);
        if($('outPast')) $('outPast').textContent=customSource.past.title+(detail?' — '+detail:'');
      }
    }

    function applyReviewed(force=false){
      const c=reviewed.concept[activeTitle('conceptChoices')];
      const r=reviewed.reason[activeTitle('reasonChoices')];
      const rel=reviewed.relation[activeTitle('relationChoices')];
      if(c) setTags(0,c,force);
      if(r) setTags(1,r,force);
      if(rel) setTags(2,rel,force);
      syncCaravanCustom(force);

      const natureCentral=$('natureTheme') && $('natureTheme').checked;
      if(remoteNature && natureCentral){
        setFullTheme(3,remoteNature,force);
        return;
      }

      if(natureCentral){
        const nt=reviewed.nature[activeTitle('natureChoices')];
        if(nt) setTags(3,nt,force);
        return;
      }

      const p=reviewed.past[activeTitle('pastChoices')];
      if(p){
        const tags=[...p];
        const vk=reviewed.viktor[activeTitle('viktorChoices')];
        if(vk) tags[1]=vk;
        setTags(3,tags,force);
      }
    }

    function applyRemoteNatureUI(){
      if(!remoteNature) return;
      const detail=safe($('natureDetail') && $('natureDetail').value);
      const block=$('natureBlock');
      const out=$('outNature');
      if(block) block.style.display='block';
      if(out) out.textContent=remoteNature.title+(detail?' — '+detail:'');
      if($('natureExtra')) $('natureExtra').classList.add('show');

      const opt=$('optionalNatureTheme');
      if(opt){
        const central=$('natureTheme') && $('natureTheme').checked;
        opt.classList.toggle('show',!central);
        const txt=$('optionalNatureText');
        if(txt) txt.textContent='Se “'+remoteNature.title+'” for central para você, considere transformar um dos quatro Themes em '+remoteNature.type+': “'+remoteNature.theme+'”, com Power Tags “'+remoteNature.tags[0]+'” e “'+remoteNature.tags[1]+'”, e Weakness “'+remoteNature.weak+'”.';
      }
      if($('natureTheme') && $('natureTheme').checked) setFullTheme(3,remoteNature,false);
    }

    function installCaravanHistoryOptions(){
      const conceptWrap=$('conceptChoices');
      const relationWrap=$('relationChoices');
      const pastWrap=$('pastChoices');

      function clearOnNativeChoice(wrap,key){
        if(!wrap || wrap.dataset.caravanClearBound) return;
        wrap.dataset.caravanClearBound='1';
        wrap.addEventListener('click',e=>{
          const b=e.target.closest('.choice');
          if(!b || b.dataset.caravanCustom) return;
          customSource[key]=null;
        });
      }

      function activateCustom(wrap,button,key,item,themeIndex){
        [...wrap.children].forEach(x=>x.classList.remove('active'));
        button.classList.add('active');
        customSource[key]=item;
        userEdited[themeIndex]=false;
        setFullTheme(themeIndex,item,true);
        syncCaravanCustom(true);
      }

      clearOnNativeChoice(conceptWrap,'concept');
      clearOnNativeChoice(relationWrap,'relation');
      clearOnNativeChoice(pastWrap,'past');

      if(conceptWrap){
        const existing=[...conceptWrap.querySelectorAll('.choice')].find(b=>{
          const s=b.querySelector('strong');
          return s && (s.textContent.trim()==='Forasteiro recém-chegado' || s.textContent.trim()===caravanProfiles.concept.title);
        });
        if(existing && !existing.dataset.caravanCustom){
          existing.dataset.caravanCustom='concept';
          existing.dataset.caravanReplaces='forasteiro';
          const strong=existing.querySelector('strong');
          const small=existing.querySelector('small');
          if(strong) strong.textContent=caravanProfiles.concept.title;
          if(small) small.textContent=caravanProfiles.concept.hint;
          existing.onclick=null;
          existing.addEventListener('click',()=>activateCustom(conceptWrap,existing,'concept',caravanProfiles.concept,0));
          if(existing.classList.contains('active')){
            customSource.concept=caravanProfiles.concept;
            setTimeout(()=>syncCaravanCustom(true),0);
          }
        }
      }

      function addChoice(wrap,item,key,themeIndex,kind){
        if(!wrap || [...wrap.querySelectorAll('.choice strong')].some(s=>s.textContent.trim()===item.title)) return;
        const b=document.createElement('button');
        b.type='button';
        b.className='choice';
        b.dataset.caravanCustom=kind;
        b.innerHTML='<strong>'+item.title+'</strong><small>'+item.hint+'</small>';
        b.addEventListener('click',()=>activateCustom(wrap,b,key,item,themeIndex));
        wrap.appendChild(b);
      }

      caravanProfiles.relations.forEach(x=>addChoice(relationWrap,x,'relation',2,'relation'));
      caravanProfiles.pasts.forEach(x=>addChoice(pastWrap,x,'past',3,'past'));
    }

    function installCaravanSecretOptions(){
      const wrap=$('secretChoices');
      if(!wrap) return false;

      caravanSecretProfiles.forEach(item=>{
        if([...wrap.querySelectorAll('.choice strong')].some(s=>s.textContent.trim()===item.title)) return;
        const b=document.createElement('button');
        b.type='button';
        b.className='choice';
        b.dataset.caravanSecret='1';
        b.innerHTML='<strong>'+item.title+'</strong><small>'+item.hint+'</small>';
        b.addEventListener('click',()=>{
          [...wrap.children].forEach(x=>x.classList.remove('active'));
          b.classList.add('active');
          const detail=$('secretDetail');
          if(detail && !detail.value.trim()) detail.value=item.detail;
          const out=$('outSecret');
          if(out) out.textContent=item.title+(detail&&detail.value.trim()?' — '+detail.value.trim():'');
        });
        wrap.appendChild(b);
      });
      return true;
    }

    function ensureCaravanOptions(){
      installCaravanHistoryOptions();
      installCaravanSecretOptions();
      addSubtleOptions();
    }

    function addSubtleOptions(){
      const wrap=$('natureChoices');
      if(!wrap || wrap.querySelector('[data-remote-nature]')) return;

      const step=wrap.closest('.step');
      if(step && !step.querySelector('.remote-nature-help')){
        const p=document.createElement('p');
        p.className='help remote-nature-help';
        p.textContent='O extraordinário não precisa ser grandioso: velhos ritos, presságios, pequenos dons e vínculos sobrenaturais discretos combinam muito bem com os Vales.';
        wrap.insertAdjacentElement('beforebegin',p);
      }

      subtleNatures.forEach((item,i)=>{
        const b=document.createElement('button');
        b.type='button';
        b.className='choice';
        b.dataset.remoteNature=String(i);
        b.innerHTML='<strong>'+item.title+'</strong><small>'+item.hint+'</small>';
        b.addEventListener('click',()=>{
          remoteNature=item;
          [...wrap.children].forEach(x=>x.classList.remove('active'));
          b.classList.add('active');
          userEdited[3]=false;
          if($('natureExtra')) $('natureExtra').classList.add('show');
          setTimeout(()=>{
            applyRemoteNatureUI();
            applyReviewed(false);
          },0);
        });
        wrap.appendChild(b);
      });

      [...wrap.querySelectorAll('.choice:not([data-remote-nature])')].forEach(b=>{
        b.addEventListener('click',()=>{
          remoteNature=null;
          userEdited[3]=false;
          setTimeout(()=>applyReviewed(false),0);
        });
      });
    }

    function readThemes(){
      return [0,1,2,3].map((i)=>({
        type:safe(field(i,'type')&&field(i,'type').value),
        title:safe(field(i,'title')&&field(i,'title').value),
        tags:[
          safe(field(i,'tag0')&&field(i,'tag0').value),
          safe(field(i,'tag1')&&field(i,'tag1').value)
        ].filter(Boolean),
        weak:safe(field(i,'weak')&&field(i,'weak').value),
        quest:safe(field(i,'quest')&&field(i,'quest').value)
      }));
    }

    function relationTitle(){
      const t=activeTitle('relationChoices');
      const n=safe($('relationName')&&$('relationName').value);
      return n ? t+': '+n : t;
    }

    function payload(){
      return {
        playerName:safe($('playerName')&&$('playerName').value),
        heroName:safe($('heroName')&&$('heroName').value),
        pronouns:safe($('pronouns')&&$('pronouns').value),
        concept:safe($('conceptCustom')&&$('conceptCustom').value,activeTitle('conceptChoices')),
        reason:activeTitle('reasonChoices'),
        reasonDetail:safe($('reasonCustom')&&$('reasonCustom').value),
        relationship:relationTitle(),
        relationshipDetail:safe($('relationOpen')&&$('relationOpen').value),
        past:activeTitle('pastChoices'),
        pastDetail:safe($('pastDetail')&&$('pastDetail').value),
        secret:activeTitle('secretChoices'),
        secretDetail:safe($('secretDetail')&&$('secretDetail').value),
        nature:remoteNature ? remoteNature.title : activeTitle('natureChoices'),
        natureDetail:safe($('natureDetail')&&$('natureDetail').value),
        viktor:activeTitle('viktorChoices'),
        viktorDetail:safe($('viktorDetail')&&$('viktorDetail').value),
        backpack:$('backpack') ? $('backpack').value : '',
        openQuestions:[...document.querySelectorAll('#openQuestions li')].map(x=>x.textContent.trim()),
        themes:readThemes(),
        website:''
      };
    }

    function summary(){
      const p=payload();
      return (p.heroName||'Meu personagem')+' — '+p.concept+'\n'+
        'Parte com a caravana para: '+(p.reason||'').toLowerCase()+'\n'+
        'Vínculo importante: '+p.relationship+'\n'+
        'Passado: '+p.past+'\n'+
        (p.nature && p.nature!=='Sou humano' ? 'Algo extraordinário: '+p.nature+'\n' : '')+
        '\nA caravana parte ao amanhecer. Faça seu personagem para Legend in the Mist — Sob as Asas do Corvo:';
    }

    async function submit(){
      const p=payload(),cfg=window.RPGUP_CORVO_CONFIG||{},s=$('finalStatus'),b=$('submitCharacter');
      if(!p.playerName){s.textContent='Preencha seu nome de jogador antes de enviar.';$('playerName').focus();return}
      if(!p.heroName){s.textContent='Dê um nome ao personagem antes de enviar.';$('heroName').focus();return}
      if(!cfg.restUrl){s.textContent='O envio ao mestre precisa da versão mais recente do plugin.';return}
      b.disabled=true;b.textContent='ENVIANDO...';s.textContent='Enviando personagem ao mestre...';
      try{
        const r=await fetch(cfg.restUrl,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(p)});
        const d=await r.json().catch(()=>({}));
        if(!r.ok) throw new Error(d.message||'Não foi possível enviar.');
        s.textContent=d.message||'Personagem enviado. O mestre foi avisado.';
        b.textContent='ENVIADO ✓';
      }catch(e){
        s.textContent=e.message||'Falha no envio.';
        b.disabled=false;b.textContent='ENVIAR PERSONAGEM AO MESTRE';
      }
    }

    async function copySummary(){
      const cfg=window.RPGUP_CORVO_CONFIG||{},txt=summary()+'\n'+(cfg.shareUrl||location.href);
      try{await navigator.clipboard.writeText(txt);$('finalStatus').textContent='Resumo + link copiados.'}
      catch(e){window.prompt('Copie o resumo:',txt)}
    }

    async function share(){
      const cfg=window.RPGUP_CORVO_CONFIG||{},txt=summary(),url=cfg.shareUrl||location.href;
      try{
        if(navigator.share){await navigator.share({title:'Sob as Asas do Corvo — meu personagem',text:txt,url});return}
        await navigator.clipboard.writeText(txt+'\n'+url);
        $('finalStatus').textContent='Resumo + link copiados para compartilhar.';
      }catch(e){
        if(e&&e.name==='AbortError')return;
        window.prompt('Copie e compartilhe:',txt+'\n'+url);
      }
    }

    const lead=document.querySelector('.lead');
    if(lead){
      lead.innerHTML='A última noite do festival em <strong>Lar dos Corvos</strong> está chegando ao fim. Quando as fogueiras apagarem, você deixará a vila para trás e seguirá estrada afora com a caravana que passa por aqui quase todos os anos. Este gerador ajuda a descobrir <strong>quem você é, o que está deixando para trás e por que decidiu partir agora</strong> — sem fechar sua história antes que ela comece.';
    }

    const guide=document.querySelector('.rules-guide');
    if(guide){
      guide.innerHTML='<strong>Como funciona:</strong> cada Theme começa com um <strong>Title Tag</strong> — que já conta como uma Power Tag — mais <strong>2 Power Tags</strong>, <strong>1 Weakness Tag</strong> e <strong>1 Quest</strong>. Uma boa Power Tag descreve algo que você consegue apontar na ficção e dizer “isso ajuda nesta ação”. Pode ser habilidade, traço, relação, passado, recurso ou equipamento. <strong>Teste rápido:</strong> se a frase servir para quase qualquer rolagem, ela está ampla demais.';
    }

    ensureCaravanOptions();
    [120,350,800,1600].forEach(ms=>setTimeout(ensureCaravanOptions,ms));

    const caravanObserver=new MutationObserver(()=>ensureCaravanOptions());
    ['conceptChoices','relationChoices','pastChoices','secretChoices','natureChoices'].forEach(id=>{
      const node=$(id);
      if(node) caravanObserver.observe(node,{childList:true,subtree:false});
    });

    function improveThemeResetUX(){
      const grid=$('themeGrid');
      if(!grid) return;

      grid.querySelectorAll('.theme-reset').forEach(btn=>{
        btn.textContent='Voltar à sugestão';
        btn.title='Desfaz suas edições manuais neste Theme e reaplica a sugestão criada pelo gerador a partir das escolhas atuais acima.';
        btn.setAttribute('aria-label','Voltar este Theme à sugestão do gerador');
        var cards=[...grid.querySelectorAll('.theme-card')];
        var idx=cards.indexOf(btn.closest('.theme-card'));
        btn.onclick=function(ev){
          if(ev) ev.preventDefault();
          if(idx>=0) refreshThemeFromSource(idx);
        };
      });

      const section=$('themeSection');
      if(section && !section.querySelector('.theme-restore-help')){
        const help=document.createElement('div');
        help.className='theme-restore-help';
        help.innerHTML='<strong>Editou um Theme e quer desfazer?</strong> Use <b>“Voltar à sugestão”</b> no card correspondente. O gerador reaplica título, Power Tags, Weakness e Quest sugeridos a partir das suas escolhas. <strong>As alterações manuais daquele Theme serão substituídas.</strong>';
        const guide=section.querySelector('.rules-guide');
        if(guide) guide.insertAdjacentElement('afterend',help);
        else {
          const head=section.querySelector('.theme-head');
          if(head) head.insertAdjacentElement('afterend',help);
        }
      }
    }

    improveThemeResetUX();
    const themeGrid=$('themeGrid');
    if(themeGrid){
      themeGrid.addEventListener('input',e=>{
        const m=(e.target.id||'').match(/^theme-(\d+)-/);
        if(m && e.isTrusted) userEdited[Number(m[1])]=true;
      });
      themeGrid.addEventListener('click',e=>{
        const card=e.target.closest('.theme-card');
        if(!card || !e.target.closest('.theme-reset')) return;
        const cards=[...themeGrid.querySelectorAll('.theme-card')];
        const i=cards.indexOf(card);
        if(i>=0){userEdited[i]=false;setTimeout(()=>{refreshThemeFromSource(i);applyRemoteNatureUI();},0)}
      });
    }

    const sourceMap=[
      ['conceptChoices',0],
      ['reasonChoices',1],
      ['relationChoices',2],
      ['pastChoices',3],
      ['viktorChoices',3]
    ];
    sourceMap.forEach(([id,i])=>{
      const n=$(id);
      if(n)n.addEventListener('click',()=>{
        userEdited[i]=false;
        setTimeout(()=>{
          refreshThemeFromSource(i);
          applyRemoteNatureUI();
        },0);
      });
    });

    const themeSourceInputs={
      conceptCustom:0,
      reasonCustom:1,
      relationName:2,
      relationOpen:2
    };
    ['conceptCustom','reasonCustom','relationName','relationOpen','pastDetail','secretDetail','natureDetail','viktorDetail'].forEach(id=>{
      const n=$(id);
      if(n)n.addEventListener('input',()=>setTimeout(()=>{
        if(Object.prototype.hasOwnProperty.call(themeSourceInputs,id)) refreshThemeFromSource(themeSourceInputs[id]);
        applyRemoteNatureUI();
        syncCaravanCustom(false);
      },0));
    });

    if($('natureTheme')) $('natureTheme').addEventListener('change',()=>{
      userEdited[3]=false;
      setTimeout(()=>{
        refreshThemeFromSource(3);
        applyRemoteNatureUI();
      },0);
    });

    if($('randomAll')) $('randomAll').addEventListener('click',()=>{
      userEdited.fill(false);
      setTimeout(()=>{
        ensureCaravanOptions();
        if(Math.random()<0.30){
          const item=subtleNatures[Math.floor(Math.random()*subtleNatures.length)];
          const index=subtleNatures.indexOf(item);
          const b=document.querySelector('#natureChoices [data-remote-nature="'+index+'"]');
          if(b) b.click();
        }else{
          remoteNature=null;
        }
        setTimeout(()=>refreshAllThemesFromSources(),20);
      },0);
    });

    if($('submitCharacter')) $('submitCharacter').onclick=submit;
    if($('shareCharacter')) $('shareCharacter').onclick=share;
    if($('copyCharacter')) $('copyCharacter').onclick=copySummary;

    applyReviewed(true);
    syncCaravanCustom(true);
    refreshAllThemesFromSources();
    improveThemeResetUX();

    const themeUxObserver=new MutationObserver(()=>improveThemeResetUX());
    if($('themeGrid')) themeUxObserver.observe($('themeGrid'),{childList:true,subtree:true});
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',()=>setTimeout(init,0));
  else setTimeout(init,0);
})();