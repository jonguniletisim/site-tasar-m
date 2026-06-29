"use strict";
const API={get:async function(p){return(await fetch(p,{credentials:"include"})).json();},post:async function(p,d){return(await fetch(p,{method:"POST",credentials:"include",headers:{"Content-Type":"application/json"},body:JSON.stringify(d)})).json();}};


// ════ DATA ════
const EFFECTS=[
  {id:'ef-none',l:'Yok',bg:'#ffffff18'},
  {id:'ef-glow',l:'Altın',bg:'#f0b429'},
  {id:'ef-purple',l:'Mor',bg:'#7c3aed'},
  {id:'ef-green',l:'Yeşil',bg:'#22c55e'},
  {id:'ef-gradient',l:'Gradyan',bg:'linear-gradient(90deg,#f0b429,#f87171,#7c3aed)'},
];
const TAGS=[{id:'premium',l:'PREMIUM'},{id:'new',l:'YENİ'},{id:'hot',l:'HOT'},{id:'vip',l:'VIP'},{id:'',l:'Yok'}];
const THEMES=[
  {id:'night',l:'🌙 Gece',c:'#f0b429',bg:'#08080e'},
  {id:'royal',l:'👑 Royal',c:'#e8333a',bg:'#0a0005'},
  {id:'emerald',l:'💚 Emerald',c:'#00c878',bg:'#020d08'},
  {id:'galaxy',l:'🌌 Galaxy',c:'#9b59e8',bg:'#060310'},
  {id:'platinum',l:'💎 Platinum',c:'#c8d0e0',bg:'#0a0a10'},
];

// Admin giriş bilgileri (backend'e geçince .env'e taşı)
const ADMIN_USER='admin';
const ADMIN_PASS='slotmaster2026';

let sponsors=[
  {id:1,active:true,bannerActive:false,bannerImg:"",name:'CASİBOM',bonus:'%100 Hoşgeldin · 1.000₺\'ye kadar',link:'#',ef:'ef-glow',tag:'premium',img:'https://abidin11.com/uploads/sponsors/img_69d9987b9d9bf6.55381307.png'},
  {id:2,active:true,bannerActive:false,bannerImg:"",name:'MARSBAHİS',bonus:'250₺ Min. Yatırım · Kural yok',link:'#',ef:'ef-none',tag:'hot',img:'https://abidin11.com/uploads/sponsors/sponsor_20260624_044446_065a2b39.png'},
  {id:3,active:true,bannerActive:false,bannerImg:"",name:'MİSTYCASİNO',bonus:'1.000₺ Deneme Bonusu',link:'#',ef:'ef-purple',tag:'new',img:'https://abidin11.com/uploads/sponsors/img_69d9970b8e2518.50293830.png'},
  {id:4,active:true,bannerActive:false,bannerImg:"",name:'GRANDBET',bonus:'%300 Hoşgeldin Bonusu',link:'#',ef:'ef-gradient',tag:'',img:'https://abidin11.com/uploads/sponsors/sponsor_20260615_192812_5c053f93.png'},
  {id:5,active:true,bannerActive:false,bannerImg:"",name:'SOSABET',bonus:'Kural Yok · 5dk Çekim',link:'#',ef:'ef-none',tag:'vip',img:'https://abidin11.com/uploads/sponsors/sponsor_20260624_164853_0887eea5.png'},
  {id:6,active:true,bannerActive:false,bannerImg:"",name:'21.COM',bonus:'%30 Nakit İade · Özel Üyelik',link:'#',ef:'ef-green',tag:'',img:'https://abidin11.com/uploads/sponsors/sponsor_20260602_120243_c7fe8c00.png'},
];
let wins=[
  {id:1,user:'Ke***',game:'Gates of Olympus 1000',mul:'15.000x',img:'https://www.ppreplaylink.net/game_pic/vs20olympx.jpg',link:'https://www.ppreplaylink.net/kdrbAFKIkT',sponsor:'CASİBOM',date:'28.06.2026'},
  {id:2,user:'Ah***',game:'Sugar Rush 1000',mul:'12.717x',img:'https://www.ppreplaylink.net/game_pic/vs20sugarrushx.jpg',link:'https://www.ppreplaylink.net/AE6jQjtGQ2',sponsor:'MARSBAHİS',date:'27.06.2026'},
  {id:3,user:'Me***',game:'Starlight Princess 1000',mul:'12.000x',img:'https://www.ppreplaylink.net/game_pic/vs20starlightx.jpg',link:'https://www.ppreplaylink.net/U2flX7Gqo4',sponsor:'MİSTYCASİNO',date:'26.06.2026'},
  {id:4,user:'Bu***',game:'Sweet Bonanza 1000',mul:'5.008x',img:'https://www.ppreplaylink.net/game_pic/vs20fruitswx.jpg',link:'https://www.ppreplaylink.net/BTxlrNNnOK',sponsor:'',date:'25.06.2026'},
  {id:5,user:'Ta***',game:'Wild West Gold',mul:'8.900x',img:'https://www.ppreplaylink.net/game_pic/vs40wildwest.jpg',link:'#',sponsor:'GRANDBET',date:'24.06.2026'},
  {id:6,user:'Se***',game:'Big Bass Splash 1000',mul:'4.200x',img:'https://www.ppreplaylink.net/game_pic/vs10bbsplashx.jpg',link:'#',sponsor:'',date:'23.06.2026'},
  {id:7,user:'Yi***',game:'Gates of Olympus Super',mul:'5.233x',img:'https://www.ppreplaylink.net/game_pic/vs20olympgold.jpg',link:'https://www.ppreplaylink.net/1elOPD1xii',sponsor:'',date:'22.06.2026'},
  {id:8,user:'Em***',game:'Starlight Princess 1000',mul:'15.000x',img:'https://www.ppreplaylink.net/game_pic/vs20starlightx.jpg',link:'https://www.ppreplaylink.net/O9QDeIgaD7',sponsor:'SOSABET',date:'21.06.2026'},
  {id:9,user:'?',game:'Yükleniyor...',mul:'?',img:'https://www.ppreplaylink.net/game_pic/vs20fruitswx.jpg',link:'https://www.ppreplaylink.net/pW5cfkxX7h',sponsor:'',date:'29.06.2026',pf:true},
  {id:10,user:'?',game:'Yükleniyor...',mul:'?',img:'https://www.ppreplaylink.net/game_pic/vs20fruitswx.jpg',link:'https://www.ppreplaylink.net/2n9c1OQKgr',sponsor:'',date:'29.06.2026',pf:true},
  {id:11,user:'?',game:'Yükleniyor...',mul:'?',img:'https://www.ppreplaylink.net/game_pic/vs20fruitswx.jpg',link:'https://www.ppreplaylink.net/awHuFE3587',sponsor:'',date:'29.06.2026',pf:true},
  {id:12,user:'?',game:'Yükleniyor...',mul:'?',img:'https://www.ppreplaylink.net/game_pic/vs20fruitswx.jpg',link:'https://www.ppreplaylink.net/UPIQ7HhMqX',sponsor:'',date:'29.06.2026',pf:true},
  {id:13,user:'?',game:'Yükleniyor...',mul:'?',img:'https://www.ppreplaylink.net/game_pic/vs20fruitswx.jpg',link:'https://www.ppreplaylink.net/OMd2QT3q81',sponsor:'',date:'29.06.2026',pf:true},
];
let pending=[];
let users=[];
let socChannels=[]; // {id,name,url,icon,inNav,inFloat}
let nextId=300,selEf='ef-none',selTag='',selSocEmoji='📱';

// ════ RENDER SITE ════
function spTag(tag){
  if(!tag)return'';
  const m={premium:'PREMIUM',new:'YENİ',hot:'HOT',vip:'VIP'};
  return m[tag]||'';
}
function renderSponsors(){
  var active=sponsors.filter(function(s){return s.active!==false;});
  // Banner
  var ba=document.getElementById('sponsor-banner-area');
  var bannerSp=sponsors.find(function(s){return s.bannerActive&&(s.bannerImg||s.img);});
  if(ba){
    if(bannerSp){
      var bimg=bannerSp.bannerImg||bannerSp.img;
      ba.style.display='block';
      ba.innerHTML='<a href="'+bannerSp.link+'" target="_blank" onclick="spClick('+bannerSp.id+',\''+bannerSp.link+'\')"><img src="'+bimg+'" style="width:100%;height:auto;max-height:200px;object-fit:cover;display:block;border-radius:8px;cursor:pointer;" alt="'+bannerSp.name+'"></a>';
    } else {
      ba.style.display='none';ba.innerHTML='';
    }
  }
  document.getElementById('sp-grid').innerHTML=active.map(function(s,i){
    var ribbon=s.tag?'<div class="spc-ribbon rb-'+s.tag+'"><span>'+spTag(s.tag)+'</span></div>':'';
    var bonus=s.bonus?'<div class="spc-bonus">'+s.bonus+'</div>':'';
    return '<div class="spc '+s.ef+(s.tag?' has-'+s.tag:'')+'" onclick="spClick('+s.id+',\''+s.link+'\')" >'+
      '<div class="spc-topbar"></div>'+
      '<div class="spc-logo">'+
        '<img class="spc-img" src="'+(s.img||'')+'" onerror="this.parentElement.style.background=\'#1a1a28\'" alt="'+s.name+'">'+
        '<div class="spc-sweep"></div>'+
        ribbon+
      '</div>'+
      '<div class="spc-body">'+
        bonus+
        '<button class="spc-btn" onclick="event.stopPropagation();spClick('+s.id+',\''+s.link+'\')">Siteye Git</button>'+
      '</div>'+
    '</div>';
  }).join('');
}

function renderWinsHome(){
  var grid=document.getElementById('wins-grid');
  if(!grid)return;
  grid.innerHTML=wins.slice(0,8).map(function(w){
    return '<div class="wc" onclick="openRep('+w.id+')">'+
      '<div class="wc-iw">'+
        '<img class="wc-img" src="'+w.img+'" onerror="this.style.opacity=\'.1\'" alt="">'+
        '<div class="wc-sweep"></div>'+
        '<div class="wc-badge">'+w.mul+'</div>'+
      '</div>'+
      '<div class="wc-body">'+
        '<div class="wc-game">'+w.game+'</div>'+
        '<div class="wc-mul">'+w.mul+'</div>'+
        '<div class="wc-user">'+w.user+'</div>'+
        '<div class="wc-play">&#9654; Replay İzle</div>'+
      '</div>'+
    '</div>';
  }).join('');
}

function renderWinsPage(){
  document.getElementById('wp-cnt').textContent=wins.length+' kazanç';
  document.getElementById('wp-grid').innerHTML=wins.map(function(w){
    var spBadge=w.sponsor?'<div class="wpc-sp">'+w.sponsor+'</div>':'';
    var spBtn=w.sponsor?
      '<button class="wpc-now" onclick="window.open(\''+getSponsorLink(w.sponsor)+'\',\'_blank\')">Şimdi Oyna</button>':
      '<button class="wpc-now" onclick="window.open(\''+(sponsors[0]?sponsors[0].link:'#')+'\',\'_blank\')">Şimdi Oyna</button>';
    return '<div class="wpc">'+
      '<div class="wpc-iw">'+
        '<img class="wpc-img" src="'+w.img+'" onerror="this.style.opacity=\'.1\'" alt="">'+
        '<div class="wpc-sweep"></div>'+
        '<div class="wpc-badge">'+w.mul+'</div>'+
        spBadge+
      '</div>'+
      '<div class="wpc-body">'+
        '<div class="wpc-game">'+w.game+'</div>'+
        '<div class="wpc-meta">'+w.user+(w.date?' · '+w.date:'')+'</div>'+
        '<div class="wpc-mul">'+w.mul+'</div>'+
        '<div class="wpc-btns">'+
          '<button class="wpc-replay" onclick="openRep('+w.id+')">&#9654; Replay</button>'+
          spBtn+
        '</div>'+
      '</div>'+
    '</div>';
  }).join('');
}

function buildTicker(){
  var tkEl=document.getElementById('tk-track');
  if(!tkEl)return;
  tkEl.classList.remove('go');
  var base=wins.map(function(w){
    return '<div class="tki" onclick="openRep('+w.id+')">'+
      '<div class="tki-in">'+
        '<div class="tki-iw">'+
          '<img class="tki-img" src="'+w.img+'" onerror="this.style.opacity=\'.1\'" alt="">'+
          '<div class="tki-badge">'+w.mul+'</div>'+
        '</div>'+
        '<div class="tki-info">'+
          '<div class="tki-game">'+w.game+'</div>'+
          '<div class="tki-user">'+w.user+'</div>'+
        '</div>'+
        '<div class="tki-mul">'+w.mul+'</div>'+
      '</div>'+
    '</div>';
  }).join('');
  tkEl.innerHTML=base+base+base+base;
  void tkEl.offsetWidth;
  tkEl.classList.add('go');
}

function getSponsorLink(name){const s=sponsors.find(x=>x.name===name);return s?s.link:'#';}

function renderSocialBtns(){
  // Nav social btns
  const navTg=document.getElementById('nav-tg');
  const navIg=document.getElementById('nav-ig');
  navTg.style.display='none';navIg.style.display='none';
  // Float row
  const fr=document.getElementById('fbtn-row');
  fr.innerHTML='';
  socChannels.filter(c=>c.active).forEach(c=>{
    if(c.inNav){
      // add to nav center dynamically
    }
    if(c.inFloat){
      const b=document.createElement('button');
      b.className='fsocbtn';
      b.style.background=c.color||'#333';
      b.style.color='#fff';
      b.innerHTML=c.icon;
      b.title=c.name;
      b.onclick=()=>window.open(c.url,'_blank');
      fr.appendChild(b);
    }
  });
}

function renderFooter(){
  var fl=document.getElementById('flinks');
  if(!fl)return;
  fl.innerHTML=socChannels.filter(function(ch){return ch.active!==false;}).map(function(ch){
    return '<a href="'+ch.url+'" target="_blank" style="color:var(--g);font-size:11px;">'+(ch.icon||'')+'&nbsp;'+ch.name+'</a>';
  }).join('');
}

// ════ NAVIGATION ════
function goHome(){
  document.getElementById('home-page').style.display='block';
  document.getElementById('wins-page').style.display='none';
  document.getElementById('users-page').style.display='none';
  scrollTo(0,0);
}
function goWins(){
  document.getElementById('home-page').style.display='none';
  document.getElementById('wins-page').style.display='block';
  document.getElementById('users-page').style.display='none';
  renderWinsPage();scrollTo(0,0);
}
function gotoAdmin(){
  document.getElementById('site-view').style.display='none';
  document.getElementById('admin-view').style.display='block';
  document.getElementById('fbwrap').style.display='none';
  rAdmSponsors();rPending();rWinsAdm();rUsers();rThemes();rSocGrid();
  renderSponsorDropdown();updateJpCurr();
  renderEfPicker();renderTagPicker();
  if(typeof renderPopupSpPicks==='function')renderPopupSpPicks();
}
function gotoSite(){
  document.getElementById('admin-view').style.display='none';
  document.getElementById('site-view').style.display='block';
  document.getElementById('fbwrap').style.display='flex';
}

// ════ MENU ════
function toggleMenu(){document.getElementById('ndrop').classList.toggle('open');}
function closeMenu(){document.getElementById('ndrop').classList.remove('open');}
document.addEventListener('click',e=>{if(!e.target.closest('#hbg-btn')&&!e.target.closest('#ndrop'))closeMenu();});
function openSoc(type){
  const c=socChannels.find(x=>x.type===type);
  if(c)window.open(c.url,'_blank');
}

// ════ MODALS ════
function openM(id){document.getElementById('m-'+id).classList.add('open');}
function closeM(id){
  document.getElementById('m-'+id).classList.remove('open');
  if(id==='register'){document.getElementById('reg-form').style.display='block';document.getElementById('reg-suc').style.display='none';document.getElementById('reg-err').style.display='none';}
  if(id==='forgot'){document.getElementById('forgot-form').style.display='block';document.getElementById('forgot-suc').style.display='none';document.getElementById('forgot-err').style.display='none';}
  if(id==='submit'){document.getElementById('submit-form').style.display='block';document.getElementById('submit-suc').style.display='none';document.getElementById('sub-err').style.display='none';document.getElementById('mprev').style.display='none';}
}
function switchM(from,to){closeM(from);setTimeout(()=>openM(to),150);}
function openSubmit(){closeM('submit');document.getElementById('m-url').value='';document.getElementById('m-game').value='';document.getElementById('m-mul').value='';openM('submit');}

// ════ AUTH ════
function doLogin(){
  const u=document.getElementById('login-u').value.trim();
  const p=document.getElementById('login-p').value;
  const e=document.getElementById('login-err');
  if(!u||!p){e.textContent='Kullanıcı adı ve şifre gerekli.';e.style.display='block';return;}
  // Admin kontrolü
  if(u===ADMIN_USER&&p===ADMIN_PASS){
    e.style.display='none';closeM('login');
    toast('Admin girişi başarılı ✓');
    setTimeout(()=>{gotoAdmin();},300);
    return;
  }
  // Üye kontrolü
  const f=users.find(x=>x.u===u&&x.p===p);
  if(!f){e.textContent='Hatalı kullanıcı adı veya şifre.';e.style.display='block';return;}
  e.style.display='none';
  currentUser={id:f.id,u:f.u};
  closeM('login');
  toast('Hoş geldin, '+u+' ✓');
}
function doRegister(){
  const u=document.getElementById('reg-u').value.trim();
  const ph=document.getElementById('reg-ph').value.trim();
  const p=document.getElementById('reg-p').value;
  const p2=document.getElementById('reg-p2').value;
  const e=document.getElementById('reg-err');
  if(!u||!ph||!p){e.textContent='Tüm alanları doldurun.';e.style.display='block';return;}
  if(p.length<6){e.textContent='Şifre en az 6 karakter.';e.style.display='block';return;}
  if(p!==p2){e.textContent='Şifreler eşleşmiyor.';e.style.display='block';return;}
  if(users.find(x=>x.u===u)){e.textContent='Bu kullanıcı adı alınmış.';e.style.display='block';return;}
  users.push({id:nextId++,u,ph,p,date:new Date().toLocaleDateString('tr-TR'),clicks:{}});
  e.style.display='none';
  document.getElementById('reg-form').style.display='none';
  document.getElementById('reg-suc').style.display='block';
  rUsers();
}
function doForgot(){
  const u=document.getElementById('forg-u').value.trim();
  const ph=document.getElementById('forg-ph').value.trim();
  const e=document.getElementById('forgot-err');
  if(!u||!ph){e.textContent='Tüm alanları doldurun.';e.style.display='block';return;}
  const f=users.find(x=>x.u===u&&x.ph===ph);
  if(!f){e.textContent='Bu bilgilerle kayıtlı hesap bulunamadı.';e.style.display='block';return;}
  e.style.display='none';document.getElementById('forgot-form').style.display='none';document.getElementById('forgot-suc').style.display='block';
}

// ════ REPLAY ════
function openRep(id){
  const w=wins.find(x=>x.id===id);if(!w)return;
  document.getElementById('rep-title').textContent=w.game;
  document.getElementById('rep-mul-hd').textContent=w.mul;
  document.getElementById('rep-user-hd').textContent=w.user;
  document.getElementById('rep-user-ft').textContent=w.user+' · '+w.mul;
  document.getElementById('rep-ext').href=w.link;
  document.getElementById('rep-load').style.display='block';
  const ifr=document.getElementById('rep-iframe');
  ifr.src='';ifr.onload=()=>{document.getElementById('rep-load').style.display='none';};
  if(w.link&&w.link.includes('ppreplaylink'))ifr.src=w.link;
  else document.getElementById('rep-load').textContent='Replay linki mevcut değil.';
  document.getElementById('rep-wrap').classList.add('open');
  document.body.style.overflow='hidden';
}
function closeRep(){document.getElementById('rep-wrap').classList.remove('open');document.getElementById('rep-iframe').src='';document.body.style.overflow='';}

// ════ SUBMIT WIN ════
async function fetchReplay(){
  var url=document.getElementById('m-url').value.trim();
  if(!url||!url.includes('ppreplaylink')){showSubErr('Geçerli bir ppreplaylink.net linki gir.');return;}
  setFetchLoad(true);
  document.getElementById('sub-err').style.display='none';
  document.getElementById('mprev').style.display='none';
  try{
    // Önce backend proxy ile dene (API gerektirmez)
    var r=await fetch('/api/replay/analyze',{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify({url:url})
    });
    var d=await r.json();
    if(d.ok&&d.game){
      fillSub(d.game,d.multiplier||'',d.imageUrl||'');
    } else {
      // Backend yoksa (lokal test) - sadece URL'den slug çek
      var slug=url.split('/').pop();
      fillSub('Oyun bilgisi yüklenemedi','',
        'https://www.ppreplaylink.net/game_pic/vs20fruitswx.jpg');
      showSubErr('Bilgiler yüklenemedi — manuel girebilirsiniz.');
    }
  }catch(e){
    // Lokal test modunda doğrudan Anthropic'e bağlan
    try{
      var r2=await fetch('/api/replay/analyze',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({model:'claude-sonnet-4-6',max_tokens:200,
          messages:[{role:'user',content:'ppreplaylink URL: '+url+'\nSadece JSON: {"game":"oyun adı","multiplier":"5008x","imageUrl":"https://www.ppreplaylink.net/game_pic/vs20fruitswx.jpg"}'}]})
      });
      var d2=await r2.json();
      var txt=d2.content.map(function(i){return i.text||'';}).join('').replace(/```json|```/g,'').trim();
      var p=JSON.parse(txt);
      fillSub(p.game||'',p.multiplier||'',p.imageUrl||'');
    }catch(e2){
      fillSub('','','');
      showSubErr('Analiz yapılamadı — oyun adını manuel girebilirsiniz.');
    }
  }finally{
    setFetchLoad(false);
  }
}


function fillSub(g,m,img){
  const ge=document.getElementById('m-game'),me=document.getElementById('m-mul');
  ge.value=g;me.value=m;
  if(g){ge.classList.add('af');me.classList.add('af');ge.removeAttribute('readonly');me.removeAttribute('readonly');}
  document.getElementById('mprev-t').textContent=g||'Bilinmiyor';
  document.getElementById('mprev-m').textContent=m||'—';
  const pi=document.getElementById('mprev-img');
  if(img){pi.src=img;pi.style.display='block';}else{pi.style.display='none';}
  document.getElementById('mprev').style.display='block';
}
function submitWin(){
  const url=document.getElementById('m-url').value.trim();
  const user=document.getElementById('m-user').value.trim();
  if(!url||!user){showSubErr('Link ve kullanıcı adı zorunlu.');return;}
  pending.push({id:nextId++,user,game:document.getElementById('m-game').value||'Bilinmiyor',mul:document.getElementById('m-mul').value||'—',img:document.getElementById('mprev-img').src||'',link:url,tg:document.getElementById('m-tg').value||'—',sponsor:'',date:new Date().toLocaleDateString('tr-TR'),siteV:'',prizeEl:false});
  document.getElementById('submit-form').style.display='none';
  document.getElementById('submit-suc').style.display='block';
  updatePendBadge();
}
function setLoad(v){document.getElementById('mload').style.display=v?'block':'none';document.getElementById('fetch-btn').disabled=v;}
function setFetchLoad(v){
  var statusEl=document.getElementById('fetch-status');
  if(statusEl)statusEl.innerHTML=v?'<span class="spin"></span>Analiz ediliyor...':'';
}
function showSubErr(m){const e=document.getElementById('sub-err');e.textContent=m;e.style.display='block';}

// ════ AUTO FETCH WINS ════
async function fetchWinMeta(w){
  try{
    const r=await fetch('/api/replay/analyze',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({model:'claude-sonnet-4-6',max_tokens:250,messages:[{role:'user',content:`ppreplaylink URL: ${w.link}\nFormat: "OYUN_ADI ÇARPANx Win". Kullanıcı adı URL'den çıkarılamıyorsa boş bırak.\nSadece JSON: {"game":"oyun","multiplier":"5008x","imageUrl":"https://www.ppreplaylink.net/game_pic/vs20fruitswx.jpg","username":""}`}]})});
    const d=await r.json();
    const p=JSON.parse(d.content.map(i=>i.text||'').join('').replace(/```json|```/g,'').trim());
    w.game=p.game||w.game;w.mul=p.multiplier||w.mul;w.img=p.imageUrl||w.img;
    if(p.username&&p.username!=='')w.user=p.username;
    w.pf=false;
    renderWinsHome();buildTicker();
  }catch(e){w.pf=false;}
}
function initFetches(){wins.filter(w=>w.pf).forEach((w,i)=>setTimeout(()=>fetchWinMeta(w),i*1300+1000));}

// ════ ADMIN RENDERS ════
let dragSrcIdx=null;
function rAdmSponsors(){
  document.getElementById('sp-badge').textContent=sponsors.length+' sponsor';
  document.getElementById('sp-adm-list').innerHTML=sponsors.map(function(s,i){
    var efOpts=EFFECTS.map(function(e){return '<option value="'+e.id+'"'+(s.ef===e.id?' selected':'')+'>'+e.l+'</option>';}).join('');
    var activeChk=s.active!==false?'checked':'';
    var bannerChk=s.bannerActive?'checked':'';
    return '<div class="sp-adm-row" draggable="true" data-idx="'+i+'"'+
      ' ondragstart="dsDragStart(event,'+i+')"'+
      ' ondragover="dsDragOver(event,'+i+')"'+
      ' ondrop="dsDrop(event,'+i+')"'+
      ' ondragend="dsDragEnd(event)">'+
      '<div class="sp-drag">&#8943;</div>'+
      '<div class="sp-rank">#'+(i+1)+'</div>'+
      '<img class="sp-adm-img" src="'+(s.img||'')+'" onerror="this.style.opacity=\'.2\'" alt="">'+
      '<div class="sp-adm-info">'+
        '<div class="sp-adm-name">'+s.name+'</div>'+
        '<div class="sp-adm-bonus">'+(s.bonus||'')+'</div>'+
      '</div>'+
      '<div class="sp-adm-acts">'+
        '<label title="Aktif/Pasif" style="display:flex;align-items:center;gap:4px;cursor:pointer;">'+
          '<input type="checkbox" '+activeChk+' onchange="toggleSpActive('+s.id+',this.checked)" style="accent-color:var(--g);width:14px;height:14px;">'+
          '<span style="font-size:9px;color:var(--mu);">Aktif</span>'+
        '</label>'+
        '<label title="Banner" style="display:flex;align-items:center;gap:4px;cursor:pointer;">'+
          '<input type="checkbox" '+bannerChk+' onchange="toggleSpBanner('+s.id+',this.checked)" style="accent-color:#e8333a;width:14px;height:14px;">'+
          '<span style="font-size:9px;color:var(--mu);">Banner</span>'+
        '</label>'+
        '<select class="efsel" onchange="chSpEf('+s.id+',this.value)">'+efOpts+'</select>'+
        '<button class="bico" onclick="openEditSp('+s.id+')" title="Duzenle">&#9999;&#65039;</button>'+
        '<button class="bico" onclick="moveSp('+i+',-1)">&#8593;</button>'+
        '<button class="bico" onclick="moveSp('+i+',1)">&#8595;</button>'+
        '<button class="bdang" onclick="delSp('+s.id+')">Sil</button>'+
      '</div>'+
    '</div>';
  }).join('');
}

// Drag & drop
function dsDragStart(e,idx){dragSrcIdx=idx;e.currentTarget.classList.add('dragging');e.dataTransfer.effectAllowed='move';}
function dsDragOver(e,idx){e.preventDefault();e.dataTransfer.dropEffect='move';if(idx!==dragSrcIdx){document.querySelectorAll('.sp-adm-row').forEach((r,i)=>r.classList.toggle('drag-over',i===idx));}}
function dsDrop(e,idx){e.preventDefault();if(dragSrcIdx!==null&&dragSrcIdx!==idx){const moved=sponsors.splice(dragSrcIdx,1)[0];sponsors.splice(idx,0,moved);renderSponsors();rAdmSponsors();}dragSrcIdx=null;}
function dsDragEnd(e){e.currentTarget.classList.remove('dragging');document.querySelectorAll('.sp-adm-row').forEach(r=>r.classList.remove('drag-over'));dragSrcIdx=null;}

// Sponsor logo preview
function previewSpLogo(url,pfx){
  const img=document.getElementById(pfx+'-prev');
  const ph=document.getElementById(pfx+'-prev-ph');
  if(url&&img){img.src=url;img.style.display='block';if(ph)ph.style.display='none';}
}
function handleSpFile(inp,pfx){
  const f=inp.files[0];if(!f)return;
  const r=new FileReader();
  r.onload=e=>{
    const url=e.target.result;
    document.getElementById(pfx+'-img').value=url;
    previewSpLogo(url,pfx);
  };
  r.readAsDataURL(f);
}

// Edit sponsor
let selEfEdit='ef-none',selTagEdit='';
function openEditSp(id){
  const s=sponsors.find(x=>x.id===id);if(!s)return;
  document.getElementById('edit-sp-id').value=id;
  document.getElementById('esp-name').value=s.name;
  document.getElementById('esp-link').value=s.link;
  document.getElementById('esp-bonus').value=s.bonus;
  document.getElementById('esp-img').value=s.img||'';
  const prevImg=document.getElementById('esp-prev');
  if(prevImg){prevImg.src=s.img||'';prevImg.style.display=s.img?'block':'none';}
  selEfEdit=s.ef||'ef-none';selTagEdit=s.tag||'';
  renderEfPickerEdit();renderTagPickerEdit();
  openM('sp-edit');
}
function saveEditSponsor(){
  const id=parseInt(document.getElementById('edit-sp-id').value);
  const s=sponsors.find(x=>x.id===id);if(!s)return;
  s.name=document.getElementById('esp-name').value.trim()||s.name;
  s.link=document.getElementById('esp-link').value.trim()||s.link;
  s.bonus=document.getElementById('esp-bonus').value.trim();
  s.img=document.getElementById('esp-img').value.trim();
  s.ef=selEfEdit;s.tag=selTagEdit;
  renderSponsors();rAdmSponsors();renderSponsorDropdown();closeM('sp-edit');toast('Sponsor güncellendi ✓');
}
function renderEfPickerEdit(){
  const el=document.getElementById('ef-picker-edit');if(!el)return;
  el.innerHTML=EFFECTS.map(e=>`<div class="efopt${selEfEdit===e.id?' sel':''}" onclick="selEfEditFn('${e.id}')"><div class="efbar" style="background:${e.bg}"></div>${e.l}</div>`).join('');
}
function renderTagPickerEdit(){
  const el=document.getElementById('tag-picker-edit');if(!el)return;
  el.innerHTML=TAGS.map(t=>`<button class="tgbtn${selTagEdit===t.id?' sel':''}" data-t="${t.id}" onclick="selTgEdit('${t.id}')">${t.l}</button>`).join('');
}
function selEfEditFn(id){selEfEdit=id;renderEfPickerEdit();}
function selTgEdit(t){selTagEdit=t;renderTagPickerEdit();}

// Nav logo
function setLogoMode(mode){
  document.getElementById('logo-txt-mode').style.display=mode==='txt'?'block':'none';
  document.getElementById('logo-img-mode').style.display=mode==='img'?'block':'none';
  document.getElementById('logo-mode-txt').style.borderColor=mode==='txt'?'var(--g)':'#3a3a55';
  document.getElementById('logo-mode-img').style.borderColor=mode==='img'?'var(--g)':'#3a3a55';
  if(mode==='txt'){
    document.getElementById('nlogo-img').style.display='none';
    document.getElementById('nlogo-txt').style.display='';
    document.getElementById('prev-logo-img').style.display='none';
    document.getElementById('prev-logo-txt').style.display='';
  }
}
function previewNavLogo(url){
  if(!url)return;
  const img=document.getElementById('nlogo-img');
  const txt=document.getElementById('nlogo-txt');
  const pImg=document.getElementById('prev-logo-img');
  const pTxt=document.getElementById('prev-logo-txt');
  img.src=url;img.style.display='block';txt.style.display='none';
  pImg.src=url;pImg.style.display='block';pTxt.style.display='none';
}
function handleNavLogoFile(inp){
  const f=inp.files[0];if(!f)return;
  const r=new FileReader();
  r.onload=e=>{document.getElementById('set-logo-url').value=e.target.result;previewNavLogo(e.target.result);};
  r.readAsDataURL(f);
}

function rPending(){
  var cnt=pending.length;
  updatePendBadge();
  var el=document.getElementById('pend-list');
  if(!el)return;
  document.getElementById('pend-badge').textContent=cnt+' bekliyor';
  if(!cnt){el.innerHTML='<div class="empty">Bekleyen kazanc yok</div>';return;}
  var spOpts=sponsors.map(function(s){return '<option value="'+s.name+'">'+s.name+'</option>';}).join('');
  el.innerHTML=pending.map(function(p){
    var vBadge=p.siteV?'<div style="grid-column:1/-1;background:#22c55e12;border:1px solid #22c55e30;border-radius:6px;padding:6px 10px;color:#4ade80;font-size:11px;">&#10003; '+p.siteV+' uzerinde oynandigi dogrulandi</div>':'';
    var pBadge=p.prizeEl?'<div style="grid-column:1/-1;background:#f0b42912;border:1px solid #f0b42930;border-radius:6px;padding:6px 10px;color:var(--g);font-size:11px;">&#127942; Odule hak kazaniyor ('+p.mul+')</div>':'';
    return '<div class="prow" id="pr-'+p.id+'">'+
      '<div class="prow-top">'+
        '<img class="prow-img" src="'+(p.img||'')+'" onerror="this.style.opacity=\'.2\'" alt="">'+
        '<div><div class="prow-game">'+p.game+'</div><div class="prow-mul">'+p.mul+'</div></div>'+
      '</div>'+
      '<div class="prow-det">'+
        '<div class="prow-det-item"><span class="prow-det-k">Kullanici</span><span class="prow-det-v">'+p.user+'</span></div>'+
        '<div class="prow-det-item"><span class="prow-det-k">Tarih</span><span class="prow-det-v">'+p.date+'</span></div>'+
        '<div class="prow-det-item" style="grid-column:1/-1;"><span class="prow-det-k">Replay</span><span class="prow-det-v"><a href="'+p.link+'" target="_blank" style="color:var(--g);word-break:break-all;font-size:10px;">'+p.link+'</a></span></div>'+
        vBadge+pBadge+
      '</div>'+
      '<div class="prow-acts">'+
        '<button class="bappr" onclick="approvePend('+p.id+')">&#10003; Onayla</button>'+
        '<button class="brej" onclick="rejectPend('+p.id+')">&#10005; Reddet</button>'+
        '<select class="ainp" style="max-width:130px;font-size:12px;" onchange="setPendSp('+p.id+',this.value)"><option value="">— Sponsor —</option>'+spOpts+'</select>'+
        '<button class="bsec" onclick="markVerif('+p.id+')" style="font-size:11px;padding:7px 10px;">&#10003; Dogru</button>'+
        '<button class="bsec" onclick="markPrize('+p.id+')" style="font-size:11px;padding:7px 10px;">&#127942; Odul</button>'+
      '</div>'+
    '</div>';
  }).join('');
}

function rWinsAdm(){
  var el=document.getElementById('wadm-list');
  if(!el)return;
  document.getElementById('wins-badge').textContent=wins.length+' kazanc';
  el.innerHTML=wins.map(function(w,i){
    var sp=w.sponsor?'<span style="color:var(--g);">'+w.sponsor+'</span>':'';
    return '<div class="wadm-row">'+
      '<img class="wadm-img" src="'+w.img+'" onerror="this.style.opacity=\'.1\'" alt="">'+
      '<div style="flex:1;min-width:0;">'+
        '<div class="wadm-game">'+w.game+' <span class="wadm-mul">'+w.mul+'</span></div>'+
        '<div class="wadm-meta">'+w.user+(w.sponsor?' · '+w.sponsor:'')+' · <a href="'+w.link+'" target="_blank" style="color:var(--g);font-size:10px;">Replay &#8599;</a></div>'+
      '</div>'+
      '<div style="display:flex;gap:5px;flex-shrink:0;">'+
        '<button class="bico" onclick="mvWin('+i+',-1)">&#8593;</button>'+
        '<button class="bico" onclick="mvWin('+i+',1)">&#8595;</button>'+
        '<button class="bdang" onclick="delWin('+w.id+')">Sil</button>'+
      '</div>'+
    '</div>';
  }).join('');
}

function rUsers(){
  var q=(document.getElementById('user-search')?document.getElementById('user-search').value:'').toLowerCase();
  var fil=q?users.filter(function(u){return u.u.toLowerCase().includes(q)||u.ph.includes(q);}):users;
  var el=document.getElementById('users-adm-list');
  if(el)document.getElementById('users-badge').textContent=users.length+' uye';
  if(!el)return;
  if(!users.length){el.innerHTML='<div class="empty">Henuz kayitli uye yok</div>';return;}
  el.innerHTML=fil.map(function(u){
    var clicks=u.clicks?Object.entries(u.clicks).sort(function(a,b){return b[1]-a[1];}).slice(0,3).map(function(e){return e[0]+' ('+e[1]+'x)';}).join(', '):'—';
    return '<div class="user-row">'+
      '<div class="user-av">'+u.u[0].toUpperCase()+'</div>'+
      '<div style="flex:1;min-width:0;">'+
        '<div class="user-name">'+u.u+'</div>'+
        '<div class="user-meta">'+u.ph+' · Kayit: '+u.date+'</div>'+
        '<div style="font-size:10px;color:var(--g);margin-top:2px;">Tiklamalar: '+clicks+'</div>'+
      '</div>'+
      '<button class="bdang" onclick="delUser('+u.id+')">Sil</button>'+
    '</div>';
  }).join('');
}
function renderUsersAdm(){rUsers();}
function renderUsersAdmin(){rUsers();}
function getMostClicked(u){
  if(!u.clicks||!Object.keys(u.clicks).length)return'—';
  return Object.entries(u.clicks).sort((a,b)=>b[1]-a[1]).slice(0,1).map(([k,v])=>k+' ('+v+'x)').join('');
}

function rThemes(){
  document.getElementById('theme-grid').innerHTML=THEMES.map(t=>`
    <button class="theme-card${document.body.className.includes('theme-'+t.id)?' active':''}" onclick="applyTheme('${t.id}')">
      <div class="theme-preview" style="background:linear-gradient(135deg,${t.bg},${t.c})"></div>
      <span class="theme-name">${t.l}</span>
    </button>`).join('');
}

function rSocGrid(){
  var el=document.getElementById('soc-grid');
  if(!el)return;
  if(!socChannels.length){el.innerHTML='<div class="empty">Henüz kanal eklenmedi</div>';renderFooter();return;}
  el.innerHTML=socChannels.map(function(ch,i){
    return '<div class="soc-item">'+
      '<div class="soc-icon-el">'+(ch.icon||'🌐')+'</div>'+
      '<div class="soc-info">'+
        '<div class="soc-name">'+ch.name+'</div>'+
        '<div class="soc-url">'+ch.url+'</div>'+
      '</div>'+
      '<div style="display:flex;flex-direction:column;gap:6px;align-items:center;">'+
        '<label class="tgl"><input type="checkbox"'+(ch.active?' checked':'')+' onchange="toggleSoc('+ch.id+',this.checked)"><span class="tsl"></span></label>'+
        '<button class="bdang" onclick="delSoc('+ch.id+')" style="padding:4px 8px;font-size:10px;">Sil</button>'+
      '</div>'+
    '</div>';
  }).join('');
  renderFooter();
}

function renderEfPicker(){
  document.getElementById('ef-picker').innerHTML=EFFECTS.map(e=>`
    <div class="efopt${selEf===e.id?' sel':''}" onclick="selEfFn('${e.id}')">
      <div class="efbar" style="background:${e.bg}"></div>${e.l}
    </div>`).join('');
}
function renderTagPicker(){
  document.getElementById('tag-picker').innerHTML=TAGS.map(t=>`
    <button class="tgbtn${selTag===t.id?' sel':''}" data-t="${t.id}" onclick="selTg('${t.id}')">${t.l}</button>`).join('');
}
function renderSponsorDropdown(){
  const s=document.getElementById('mw-sponsor');
  if(!s)return;
  s.innerHTML='<option value="">— Seçiniz —</option>'+sponsors.map(sp=>`<option value="${sp.name}">${sp.name}</option>`).join('');
}

// ════ ADMIN ACTIONS ════

function toggleSpActive(id,val){
  var s=sponsors.find(function(x){return x.id===id;});
  if(s){s.active=val;renderSponsors();rAdmSponsors();toast(s.name+' '+(val?'aktif':'pasif')+' edildi');}
}
function toggleSpBanner(id,val){
  sponsors.forEach(function(s){s.bannerActive=false;});
  if(val){
    var s=sponsors.find(function(x){return x.id===id;});
    if(s){s.bannerActive=true;if(!s.bannerImg)s.bannerImg=s.img;}
  }
  renderSponsors();rAdmSponsors();
  toast(val?'Banner aktif edildi':'Banner kaldırıldı');
}

function chSpEf(id,ef){const s=sponsors.find(x=>x.id===id);if(s){s.ef=ef;renderSponsors();}}
function moveSp(i,d){const j=i+d;if(j<0||j>=sponsors.length)return;[sponsors[i],sponsors[j]]=[sponsors[j],sponsors[i]];renderSponsors();rAdmSponsors();}
function delSp(id){sponsors=sponsors.filter(s=>s.id!==id);renderSponsors();rAdmSponsors();renderSponsorDropdown();toast('Sponsor silindi');}
function selEfFn(id){selEf=id;renderEfPicker();}
function selTg(t){selTag=t;renderTagPicker();}

// Logo modal
function openLogoModal(){openM('logo');}
function handleLogoFile(inp){
  const f=inp.files[0];if(!f)return;
  const r=new FileReader();
  r.onload=e=>{previewLogoUrl(e.target.result);document.getElementById('logo-url-inp').value=e.target.result;};
  r.readAsDataURL(f);
}
function previewLogoUrl(url){
  if(!url)return;
  const img=document.getElementById('logo-prev-img');
  const ph=document.getElementById('logo-prev-placeholder');
  const wrap=document.getElementById('nsp-img-preview');
  img.src=url;img.style.display='block';ph.style.display='none';
  // also update sponsor preview
  document.getElementById('nsp-img').value=url;
  if(wrap){wrap.style.display='block';document.getElementById('nsp-img-prev-img').src=url;}
}
function confirmLogo(){
  const url=document.getElementById('logo-url-inp').value.trim();
  const name=document.getElementById('logo-name-inp').value.trim();
  if(!url){toast('Görsel URL gerekli','err');return;}
  document.getElementById('nsp-img').value=url;
  if(name)document.getElementById('nsp-name').value=name;
  // preview
  const wrap=document.getElementById('nsp-img-preview');
  if(wrap){wrap.style.display='block';document.getElementById('nsp-img-prev-img').src=url;}
  closeM('logo');toast('Logo seçildi ✓');
}

function addSponsor(){
  const name=document.getElementById('nsp-name').value.trim();
  const link=document.getElementById('nsp-link').value.trim()||'#';
  const bonus=document.getElementById('nsp-bonus').value.trim();
  const img=document.getElementById('nsp-img').value.trim();
  if(!name){toast('Site adı zorunlu','err');return;}
  sponsors.push({id:nextId++,name,link,bonus,img,ef:selEf,tag:selTag});
  ['nsp-name','nsp-link','nsp-bonus','nsp-img'].forEach(id=>{const el=document.getElementById(id);if(el)el.value='';});
  const prev=document.getElementById('nsp-prev');if(prev){prev.src='';prev.style.display='none';}
  const ph=document.getElementById('nsp-prev-ph');if(ph)ph.style.display='';
  renderSponsors();rAdmSponsors();renderSponsorDropdown();closeM('sp-add');toast('Sponsor eklendi ✓');
}

function mvWin(i,d){const j=i+d;if(j<0||j>=wins.length)return;[wins[i],wins[j]]=[wins[j],wins[i]];renderWinsHome();buildTicker();rWinsAdm();}
function delWin(id){wins=wins.filter(w=>w.id!==id);renderWinsHome();buildTicker();rWinsAdm();toast('Kazanç silindi');}
function addWinManual(){
  const user=document.getElementById('mw-user').value.trim();
  const mul=document.getElementById('mw-mul').value.trim();
  const game=document.getElementById('mw-game').value.trim();
  const img=document.getElementById('mw-img').value.trim();
  const link=document.getElementById('mw-link').value.trim()||'#';
  const sponsor=document.getElementById('mw-sponsor').value;
  if(!user||!game){toast('Kullanıcı ve oyun adı zorunlu','err');return;}
  wins.unshift({id:nextId++,user,mul,game,img,link,sponsor,date:new Date().toLocaleDateString('tr-TR')});
  ['mw-user','mw-mul','mw-game','mw-img','mw-link'].forEach(id=>document.getElementById(id).value='');
  renderWinsHome();buildTicker();rWinsAdm();toast('Kazanç eklendi ✓');
}

function approvePend(id){
  const p=pending.find(x=>x.id===id);
  if(p){wins.unshift({id:nextId++,user:p.user,game:p.game,mul:p.mul,img:p.img,link:p.link,sponsor:p.sponsor,date:p.date});pending=pending.filter(x=>x.id!==id);renderWinsHome();buildTicker();rPending();rWinsAdm();toast('Kazanç onaylandı ✓');}
}
function rejectPend(id){pending=pending.filter(x=>x.id!==id);rPending();toast('Reddedildi');}
function setPendSp(id,v){const p=pending.find(x=>x.id===id);if(p)p.sponsor=v;}
function markVerif(id){const p=pending.find(x=>x.id===id);if(p){p.siteV=p.sponsor||sponsors[0]?.name||'';rPending();toast('Doğrulandı ✓');}}
function markPrize(id){const p=pending.find(x=>x.id===id);if(p){p.prizeEl=true;rPending();toast('Ödüle hak kazandırıldı 🏆');}}
function delUser(id){users=users.filter(u=>u.id!==id);rUsers();}
function updatePendBadge(){const c=pending.length;document.getElementById('pb-m').textContent=c;document.getElementById('pb-s').textContent=c;}

// Social channels
function openSocModal(){document.getElementById('soc-name-inp').value='';document.getElementById('soc-url-inp').value='';document.getElementById('soc-icon-inp').value='';openM('soc');}
function setSocEmoji(btn,emoji){selSocEmoji=emoji;document.getElementById('soc-icon-inp').value=emoji;document.querySelectorAll('#soc-emoji-pick button').forEach(b=>b.style.borderColor='#3a3a55');btn.style.borderColor='var(--g)';}
function addSocChannel(){
  const name=document.getElementById('soc-name-inp').value.trim();
  const url=document.getElementById('soc-url-inp').value.trim();
  const icon=document.getElementById('soc-icon-inp').value||selSocEmoji;
  const inNav=document.getElementById('soc-innav').checked;
  const inFloat=document.getElementById('soc-infloat').checked;
  if(!name||!url){toast('Ad ve link zorunlu','err');return;}
  socChannels.push({id:nextId++,name,url,icon,inNav,inFloat,active:true,color:'#333',type:name.toLowerCase()});
  closeM('soc');rSocGrid();renderSocialBtns();renderFooter();toast('Kanal eklendi ✓');
}
function toggleSoc(id,v){const c=socChannels.find(x=>x.id===id);if(c){c.active=v;renderSocialBtns();renderFooter();rSocGrid();}}
function delSoc(id){socChannels=socChannels.filter(c=>c.id!==id);rSocGrid();renderSocialBtns();renderFooter();toast('Kanal silindi');}

// ════ SETTINGS ════
function applySettings(){
  const v=k=>document.getElementById(k)?.value||'';
  const name=v('set-name');
  if(name){
    const t=document.getElementById('nlogo-txt');
    const pt=document.getElementById('prev-logo-txt');
    ['ml-logo','mr-logo'].forEach(id=>{const el=document.getElementById(id);if(el)el.textContent=name;});
    if(t)t.textContent=name;
    if(pt)pt.textContent=name;
    document.getElementById('ptag').textContent=name;
  }
  if(v('set-title'))document.getElementById('ptag').textContent=v('set-title');
  if(v('set-legal'))document.getElementById('flegal').textContent=v('set-legal');
}
function applyZoom(v){document.documentElement.style.setProperty('--zoom',v);document.getElementById('zoom-val').textContent=Math.round(v*100)+'%';}
function resetZoom(){document.getElementById('zoom-sl').value=1;applyZoom(1);}
function applyColor(c){
  document.documentElement.style.setProperty('--g',c);
  const r=parseInt(c.slice(1,3),16),gr=parseInt(c.slice(3,5),16),b=parseInt(c.slice(5,7),16);
  document.documentElement.style.setProperty('--g2',`#${Math.max(0,r-28).toString(16).padStart(2,'0')}${Math.max(0,gr-28).toString(16).padStart(2,'0')}${Math.max(0,b-28).toString(16).padStart(2,'0')}`);
}
function applyTheme(name){
  ['night','royal','emerald','galaxy','platinum'].forEach(t=>document.body.classList.remove('theme-'+t));
  document.body.classList.add('theme-'+name);
  try{localStorage.setItem('sm_theme',name);}catch(e){}
  rThemes();toast('Tema: '+name);
}
function setSpCols(n){
  // Store col count, override desktop media query
  const grid=document.getElementById('sp-grid');
  if(grid){grid.setAttribute('data-cols',n);grid.style.setProperty('grid-template-columns',`repeat(${n},minmax(0,1fr))`);}
  toast(n+' sütun ayarlandı ✓');
}
function toggleGif(){
  const on=document.getElementById('gif-toggle').checked;
  document.getElementById('gif-banner').style.display=on?'block':'none';
}
function updateGifUrl(){const u=document.getElementById('gif-url-inp').value.trim();if(u)document.getElementById('gif-img').src=u;}

// switchTab tek tanımı yukarıda

// ════ JACKPOT ════
(function(){
  const K='sm_jp_v1';
  function load(){try{const d=JSON.parse(localStorage.getItem(K)||'{}');return d.v>0?d.v:init();}catch(e){return init();}}
  function init(){return Math.floor(800000+(new Date().getDay()*180000)+Math.random()*200000);}
  function save(v){try{localStorage.setItem(K,JSON.stringify({v,ts:Date.now()}));}catch(e){}}
  let jp=load(),kr=Math.floor(Math.random()*100),disp=jp,af=null;
  window.resetJp=function(s){jp=s||100000;kr=0;disp=jp;save(jp);render();toast('Sayaç sıfırlandı ✓');};
  function fmt(n,k){return'₺'+Math.floor(Math.abs(n)).toLocaleString('tr-TR')+','+(k<10?'0':'')+k;}
  function render(){const el=document.getElementById('jp-nav');if(el)el.textContent=fmt(disp,kr);}
  function animTo(nv){if(af)cancelAnimationFrame(af);function step(){if(disp<nv){disp+=Math.max(1,Math.floor((nv-disp)*0.12));if(disp>nv)disp=nv;render();af=requestAnimationFrame(step);}else{af=null;}}af=requestAnimationFrame(step);}
  render();
  function getDT(){const d=new Date();const s=d.getFullYear()*10000+d.getMonth()*100+d.getDate();return Math.floor(100000+(((s*1103515245+12345)&0x7fffffff)/0x7fffffff)*500000);}
  function tick(){const h=new Date().getHours();const m=h<3?.25:h<8?.5:h<12?.85:h<18?1.45:h<22?1.2:.65;jp+=Math.max(20,Math.floor((getDT()/288)*m*(0.65+Math.random()*0.7)));save(jp);animTo(jp);}
  setTimeout(()=>{tick();setInterval(tick,5*60*1000);},8000);
  function krtick(){kr=Math.floor(Math.random()*100);render();setTimeout(krtick,1800+Math.random()*2200);}
  setTimeout(krtick,1200);
  function shimmer(){const el=document.getElementById('jp-nav');if(el){el.style.textShadow='0 0 24px #ffe066ff,0 0 10px #f0b429cc';setTimeout(()=>{el.style.textShadow='0 0 12px #ffe066cc,0 0 4px #f0b429aa';},350);}setTimeout(shimmer,3500+Math.random()*4500);}
  setTimeout(shimmer,1800);
  window.updateJpCurr=function(){try{const d=JSON.parse(localStorage.getItem(K)||'{}');const el=document.getElementById('jp-curr');if(el&&d.v)el.textContent=fmt(d.v,kr);}catch(e){}};
})();
function adminResetJp(){const v=parseInt(document.getElementById('jp-start').value)||100000;if(window.resetJp)window.resetJp(v);}
function updateJpCurr(){if(window.updateJpCurr)window.updateJpCurr();}

// ════ POPUP ════
let popupSettings={active:false,title:'🔥 ÖZEL FIRSAT',sub:'En iyi bonus sitelerini kaçırma!',logo:'',sponsors:[]};
let popSlideIdx=0,popSlideTimer=null;

function renderPopupSpPicks(){
  const el=document.getElementById('popup-sp-picks');if(!el)return;
  el.innerHTML=sponsors.map((s,i)=>`
    <div style="display:flex;align-items:center;gap:8px;background:#1a1a28;border-radius:7px;padding:8px 10px;">
      <img src="${s.img||''}" style="width:32px;height:32px;border-radius:5px;object-fit:cover;background:#2a2a40;" onerror="this.style.opacity='.2'" alt="">
      <span style="font-size:12px;color:#d0d0e8;flex:1;">${s.name}</span>
      <label class="tgl" style="transform:scale(.8);"><input type="checkbox" class="popup-sp-cb" data-id="${s.id}" ${popupSettings.sponsors.includes(s.id)?'checked':''}><span class="tsl"></span></label>
    </div>`).join('');
}

function savePopupSettings(){
  popupSettings.active=document.getElementById('popup-active-toggle').checked;
  popupSettings.title=document.getElementById('popup-title').value||'🔥 ÖZEL FIRSAT';
  popupSettings.sub=document.getElementById('popup-sub').value||'';
  popupSettings.logo=document.getElementById('popup-logo').value||'';
  popupSettings.sponsors=[];
  document.querySelectorAll('.popup-sp-cb:checked').forEach(cb=>{
    const id=parseInt(cb.dataset.id);
    if(popupSettings.sponsors.length<3)popupSettings.sponsors.push(id);
  });
  try{localStorage.setItem('sm_popup',JSON.stringify(popupSettings));}catch(e){}
  toast('Popup kaydedildi ✓');
}

function buildPopupSlides(){
  const spList=popupSettings.sponsors.map(id=>sponsors.find(s=>s.id===id)).filter(Boolean);
  if(!spList.length)spList.push(...sponsors.slice(0,3));
  const sl=document.getElementById('popup-slides');
  const dt=document.getElementById('popup-dots');
  if(!sl||!dt)return;
  sl.innerHTML=spList.map(s=>`
    <div style="min-width:100%;padding:24px 20px 16px;text-align:center;flex-shrink:0;">
      ${popupSettings.logo?`<img src="${popupSettings.logo}" style="max-height:60px;max-width:200px;object-fit:contain;margin:0 auto 16px;display:block;" alt="" onerror="this.style.display='none'">`:''}
      <div style="font-family:Bebas Neue,sans-serif;font-size:20px;color:#ffe066;letter-spacing:1px;margin-bottom:6px;">${popupSettings.title}</div>
      ${popupSettings.sub?`<div style="font-size:12px;color:#c0b080;margin-bottom:18px;">${popupSettings.sub}</div>`:''}
      <div style="background:#0a0a12;border:1px solid #f0b42930;border-radius:12px;overflow:hidden;margin-bottom:16px;">
        <img src="${s.img||''}" style="width:100%;height:140px;object-fit:cover;display:block;" onerror="this.style.display='none'" alt="${s.name}">
        <div style="padding:12px 14px;">
          <div style="font-family:Bebas Neue,sans-serif;font-size:22px;color:#fff;margin-bottom:4px;">${s.name}</div>
          <div style="font-size:12px;color:#c8c8d8;margin-bottom:12px;">${s.bonus||''}</div>
          <button onclick="window.open('${s.link}','_blank');closePopup();" style="width:100%;background:var(--g);color:#000;border:none;border-radius:8px;padding:12px;font-size:14px;font-weight:700;cursor:pointer;">Siteye Git →</button>
        </div>
      </div>
    </div>`).join('');
  dt.innerHTML=spList.map((_,i)=>`<div class="pop-dot" data-i="${i}" onclick="goPopSlide(${i})" style="width:8px;height:8px;border-radius:50%;background:${i===0?'var(--g)':'#3a3a55'};cursor:pointer;transition:background .2s;"></div>`).join('');
  popSlideIdx=0;
  if(spList.length>1){
    if(popSlideTimer)clearInterval(popSlideTimer);
    popSlideTimer=setInterval(()=>goPopSlide((popSlideIdx+1)%spList.length),3500);
  }
}
function goPopSlide(i){
  popSlideIdx=i;
  const sl=document.getElementById('popup-slides');
  if(sl)sl.style.transform=`translateX(-${i*100}%)`;
  document.querySelectorAll('.pop-dot').forEach((d,j)=>d.style.background=j===i?'var(--g)':'#3a3a55');
}
function showPopup(){
  if(sessionStorage.getItem('popup_shown'))return;
  if(!popupSettings.active)return;
  buildPopupSlides();
  const ov=document.getElementById('popup-overlay');
  if(ov){ov.style.display='flex';}
}
function closePopup(){
  const ov=document.getElementById('popup-overlay');
  if(ov)ov.style.display='none';
  if(popSlideTimer){clearInterval(popSlideTimer);popSlideTimer=null;}
  sessionStorage.setItem('popup_shown','1');
}
function previewPopup(){
  savePopupSettings();
  sessionStorage.removeItem('popup_shown');
  buildPopupSlides();
  const ov=document.getElementById('popup-overlay');
  if(ov)ov.style.display='flex';
}

// ════ CACHE & SAVE ════
function clearCache(){
  if(!confirm('Jackpot hariç tüm veriler silinecek. Devam?'))return;
  const jpKey='sm_jp_v1';
  const jpVal=localStorage.getItem(jpKey);
  localStorage.clear();
  if(jpVal)localStorage.setItem(jpKey,jpVal);
  toast('Cache temizlendi');
  setTimeout(()=>location.reload(),800);
}
function saveAll(){
  // Save all admin settings to localStorage
  const data={
    theme:document.body.className.match(/theme-(\w+)/)?.[1]||'night',
    siteName:document.getElementById('set-name')?.value||'',
    siteTitle:document.getElementById('set-title')?.value||'',
    legal:document.getElementById('set-legal')?.value||'',
    sponsors:JSON.parse(JSON.stringify(sponsors)),
    wins:JSON.parse(JSON.stringify(wins)),
    socChannels:JSON.parse(JSON.stringify(socChannels)),
    popupSettings:JSON.parse(JSON.stringify(popupSettings)),
    adminMsg:document.getElementById('admin-submit-text')?.value||'',
    zoom:document.getElementById('zoom-sl')?.value||'1',
  };
  try{localStorage.setItem('sm_admin_save',JSON.stringify(data));}catch(e){toast('Kaydetme başarısız (çok büyük)','err');return;}
  const el=document.getElementById('save-status');
  if(el){el.style.display='block';setTimeout(()=>el.style.display='none',3000);}
  toast('Tüm ayarlar kaydedildi ✓');
}
function loadSaved(){
  try{
    const raw=localStorage.getItem('sm_admin_save');
    if(!raw)return;
    const d=JSON.parse(raw);
    if(d.theme)applyTheme(d.theme);
    if(d.sponsors&&d.sponsors.length)sponsors=d.sponsors;
    if(d.wins&&d.wins.length)wins=d.wins;
    if(d.socChannels)socChannels=d.socChannels;
    if(d.popupSettings)popupSettings=d.popupSettings;
    if(d.adminMsg){const el=document.getElementById('admin-submit-msg');if(el&&d.adminMsg){el.textContent=d.adminMsg;el.style.display='block';}}
    if(d.zoom)applyZoom(d.zoom);
    renderSponsors();renderWinsHome();buildTicker();renderSocialBtns();renderFooter();
  }catch(e){}
}

// ════ SUBMIT FORM UPDATES ════
function saveAdminMsg(){
  const msg=document.getElementById('admin-submit-text').value.trim();
  const el=document.getElementById('admin-submit-msg');
  if(el){if(msg){el.textContent=msg;el.style.display='block';}else{el.style.display='none';}}
  try{const d=JSON.parse(localStorage.getItem('sm_admin_save')||'{}');d.adminMsg=msg;localStorage.setItem('sm_admin_save',JSON.stringify(d));}catch(e){}
  toast('Mesaj kaydedildi ✓');
}

// Auto fetch on paste (no button needed)
let fetchDebounce=null;
function autoFetchOnPaste(url){
  if(!url||!url.includes('ppreplaylink'))return;
  if(fetchDebounce)clearTimeout(fetchDebounce);
  fetchDebounce=setTimeout(()=>fetchReplay(),600);
}

// Update sponsor dropdown in submit form
function updateSubmitSponsorDrop(){
  const el=document.getElementById('m-sponsor-sel');
  if(!el)return;
  el.innerHTML='<option value="">— Sponsor seç (isteğe bağlı) —</option>'+sponsors.map(s=>`<option value="${s.name}">${s.name}</option>`).join('');
}

// Popup sponsor picks render when opening settings
function onOpenSettings(){
  renderPopupSpPicks();
  // Load saved admin msg
  try{const d=JSON.parse(localStorage.getItem('sm_admin_save')||'{}');if(d.adminMsg&&document.getElementById('admin-submit-text'))document.getElementById('admin-submit-text').value=d.adminMsg;}catch(e){}
  // Load popup settings to form
  try{
    const el_title=document.getElementById('popup-title');const el_sub=document.getElementById('popup-sub');const el_logo=document.getElementById('popup-logo');const el_tog=document.getElementById('popup-active-toggle');
    if(el_title)el_title.value=popupSettings.title||'';
    if(el_sub)el_sub.value=popupSettings.sub||'';
    if(el_logo)el_logo.value=popupSettings.logo||'';
    if(el_tog)el_tog.checked=popupSettings.active;
  }catch(e){}
}

// Route
if(window.location.hash==='#admin'||window.location.pathname.includes('/admin'))gotoAdmin();
window.addEventListener('hashchange',()=>{if(window.location.hash==='#admin')gotoAdmin();else gotoSite();});

// Update submitWin to use new simplified form
function submitWin(){
  const url=document.getElementById('m-url').value.trim();
  if(!url){showSubErr('Replay linki zorunlu.');return;}
  const sponsor=document.getElementById('m-sponsor-sel')?.value||'';
  const nameInp=document.getElementById('m-user');
  const loggedUser=window._currentUser||null;
  const uname=loggedUser?loggedUser.u:(nameInp?.value.trim()||'Anonim');
  pending.push({
    id:nextId++,user:uname,
    game:document.getElementById('mprev-t')?.textContent||'—',
    mul:document.getElementById('mprev-m')?.textContent||'—',
    img:document.getElementById('mprev-img')?.src||'',
    link:url,tg:'—',sponsor,
    date:new Date().toLocaleDateString('tr-TR'),
    siteV:'',prizeEl:false,loggedIn:!!loggedUser
  });
  document.getElementById('submit-form').style.display='none';
  document.getElementById('submit-suc').style.display='block';
  updatePendBadge();
}

// Admin tab switch - TEK TANIM
function switchTab(el){
  var panel=el.getAttribute('data-p')||el.getAttribute('data-panel')||'';
  if(!panel)return;
  document.querySelectorAll('.stab,.mtab').forEach(function(t){t.classList.remove('active');});
  document.querySelectorAll('.apanel').forEach(function(p){p.classList.remove('active');});
  document.querySelectorAll('[data-p="'+panel+'"],[data-panel="'+panel+'"]').forEach(function(t){t.classList.add('active');});
  var pEl=document.getElementById(panel);
  if(pEl)pEl.classList.add('active');
  if(panel==='p-settings'){try{updateJpCurr();}catch(e){}try{onOpenSettings();}catch(e){}}
  if(panel==='p-sp'||panel==='p-sponsors'){try{renderEfPicker();}catch(e){}try{renderTagPicker();}catch(e){}}
}

function toast(msg,type){const t=document.getElementById('toast');if(!t)return;t.textContent=msg;t.style.background=type==='err'?'#ef4444':'#22c55e';t.style.color=type==='err'?'#fff':'#000';t.classList.add('show');setTimeout(()=>t.classList.remove('show'),2500);}

// INIT
(function(){
  try{const t=localStorage.getItem('sm_theme');if(t)applyTheme(t);else applyTheme('night');}catch(e){applyTheme('night');}
  loadSaved();
})();
renderSponsors();renderWinsHome();buildTicker();renderSocialBtns();renderFooter();initFetches();
updateSubmitSponsorDrop();
// Show popup after short delay
setTimeout(()=>showPopup(),1800);
