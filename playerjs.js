
/* VortexVault Player v6 - FIX SENSIBILIDAD
   - Antes: un toque lateral adelantaba 10s (muy sensible)
   - Ahora: SOLO doble click / doble tap en los lados adelanta/atrase 10s. Un toque simple no hace nada.
   - Mantiene: color adaptativo, calidad Original, subtitulos No Hay Subtitulos, sin mute auto
*/
(function(){
  const ID='vvp-style-v6';
  if(document.getElementById(ID)) document.getElementById(ID).remove();
  const s=document.createElement('style'); s.id=ID;
  s.textContent=`
    .vvp{position:relative;width:100%;height:100%;background:#000;border-radius:16px;overflow:hidden;--a:var(--accent,#22c55e);font-family:Inter,sans-serif;outline:none;user-select:none}
    .vvp video{width:100%;height:100%;display:block;object-fit:contain;background:#000}
    .vvp-poster{position:absolute;inset:0;background:#0f1015 center/cover no-repeat;z-index:2;transition:opacity .35s}
    .vvp-poster.hide{opacity:0;pointer-events:none}
    .vvp-big{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%) scale(.85);z-index:3;width:68px;height:68px;border-radius:50%;background:var(--a);display:flex;align-items:center;justify-content:center;cursor:pointer;opacity:0;pointer-events:none;transition:.3s cubic-bezier(.34,1.56,.64,1);box-shadow:0 8px 24px rgba(0,0,0,.4)}
    .vvp.paused .vvp-big{opacity:1;pointer-events:auto;transform:translate(-50%,-50%) scale(1)}
    .vvp.playing .vvp-big{opacity:0!important;pointer-events:none!important}
    .vvp-big svg{fill:#fff;width:26px;height:26px;margin-left:2px}
    .vvp-top{position:absolute;top:0;left:0;right:0;z-index:4;padding:11px 12px;display:flex;justify-content:space-between;align-items:center;gap:10px;background:linear-gradient(to bottom,rgba(0,0,0,.82),transparent);opacity:0;transition:.25s;pointer-events:none}
    .vvp:hover .vvp-top,.vvp.paused .vvp-top{opacity:1}
    .vvp.playing .vvp-top{opacity:0}
    .vvp:hover.playing .vvp-top{opacity:1}
    .vvp-title-top{font-weight:800;font-size:12.5px;color:#fff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;max-width:64%;text-shadow:0 1px 5px rgba(0,0,0,.8)}
    .vvp-badge{font-size:10px;font-weight:900;background:var(--a);color:#0f1015;padding:5px 11px;border-radius:9999px;flex-shrink:0}
    .vvp-ctrl{position:absolute;bottom:0;left:0;right:0;z-index:4;padding:6px 10px 10px;background:linear-gradient(to top,rgba(0,0,0,.92) 0%,rgba(0,0,0,.35) 65%,transparent);opacity:0;transition:opacity .25s}
    .vvp:hover .vvp-ctrl,.vvp.paused .vvp-ctrl,.vvp.show-ctrl .vvp-ctrl{opacity:1}
    .vvp-bar{height:20px;display:flex;align-items:center;cursor:pointer;touch-action:none}
    .vvp-track{width:100%;height:3px;background:rgba(255,255,255,.28);border-radius:9999px;position:relative}
    .vvp-bar:hover .vvp-track,.vvp-bar.drag .vvp-track{height:5px}
    .vvp-fill{position:absolute;left:0;top:0;height:100%;background:var(--a);border-radius:9999px;width:0%}
    .vvp-dot{position:absolute;top:50%;transform:translate(-50%,-50%);width:12px;height:12px;background:#fff;border-radius:50%;left:0%;opacity:0}
    .vvp-bar:hover .vvp-dot,.vvp-bar.drag .vvp-dot{opacity:1}
    .vvp-row{display:flex;justify-content:space-between;align-items:center;margin-top:6px}
    .vvp-l,.vvp-r{display:flex;align-items:center;gap:7px}
    .vvp-btn{width:36px;height:36px;border-radius:50%;border:1px solid rgba(255,255,255,.12);background:rgba(255,255,255,.08);color:#fff;display:flex;align-items:center;justify-content:center;cursor:pointer;backdrop-filter:blur(8px);transition:.18s}
    .vvp-btn:hover{background:rgba(255,255,255,.16)}
    .vvp-btn:active{transform:scale(.92)}
    .vvp-btn.main{background:var(--a);border-color:var(--a);color:#0f1015;width:38px;height:38px}
    .vvp-btn.main svg{fill:#0f1015}
    .vvp-btn svg{width:18px;height:18px;fill:currentColor}
    .vvp-time{font-size:12px;font-weight:800;color:#fff;display:flex;gap:4px;align-items:center}
    .vvp-time b{color:rgba(255,255,255,.45)}
    .vvp-zones{position:absolute;inset:0;z-index:2;display:flex}
    .vvp-zone{flex:1;position:relative}
    .vvp-zone.center{flex:1.2}
    .vvp-hint{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%) scale(.8);background:rgba(0,0,0,.82);color:#fff;padding:8px 14px;border-radius:9999px;font-size:13px;font-weight:800;display:flex;align-items:center;gap:6px;opacity:0;pointer-events:none;transition:.22s;backdrop-filter:blur(8px);border:1px solid rgba(255,255,255,.12)}
    .vvp-hint.show{opacity:1;transform:translate(-50%,-50%) scale(1)}
    .vvp-menu{position:absolute;right:10px;bottom:52px;z-index:20;background:#181a20;border:1px solid rgba(255,255,255,.10);border-radius:16px;padding:8px;min-width:230px;display:none;flex-direction:column;box-shadow:0 16px 40px rgba(0,0,0,.6)}
    .vvp-menu.open{display:flex;animation:pop .2s}
    @keyframes pop{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
    .vvp-sec{padding:4px 0}
    .vvp-sec-label{font-size:10px;font-weight:900;letter-spacing:.9px;color:#94a3b8;padding:8px 12px 4px;text-transform:uppercase}
    .vvp-opt{padding:10px 12px;border-radius:10px;font-size:13px;font-weight:600;color:#cbd5e1;display:flex;justify-content:space-between;align-items:center;cursor:pointer}
    .vvp-opt:hover{background:#222632;color:#fff}
    .vvp-opt.active{background:var(--a);color:#0f1015;font-weight:800}
    .vvp-divider{height:1px;background:rgba(255,255,255,.08);margin:4px 0}
    .vvp-load{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);z-index:5;width:40px;height:40px;border:3px solid rgba(255,255,255,.2);border-top-color:var(--a);border-radius:50%;animation:rot .7s linear infinite;display:none}
    @keyframes rot{to{transform:translate(-50%,-50%) rotate(360deg)}}
  `;
  document.head.appendChild(s);

  window.Playerjs = class {
    constructor(cfg){
      this.container=document.getElementById(cfg.id);
      if(!this.container) return;
      this._build();
      if(cfg.file) this.load(cfg.file, cfg.title||'', cfg.poster||'', !!cfg.autoplay);
      this._watchColor();
    }
    _watchColor(){
      const apply=()=>{
        const rs=getComputedStyle(document.documentElement);
        const a=rs.getPropertyValue('--accent').trim()||'#22c55e';
        const g=rs.getPropertyValue('--accent-glow').trim()||'rgba(34,197,94,.5)';
        this.container.style.setProperty('--a', a);
        this.container.style.setProperty('--glow', g);
      };
      apply();
      new MutationObserver(apply).observe(document.documentElement,{attributes:true,attributeFilter:['style']});
      const picker=document.getElementById('colorPicker');
      if(picker && !picker._vvp){ picker._vvp=true; picker.addEventListener('change', ()=>setTimeout(apply,30)); }
    }
    _build(){
      this.container.innerHTML=''; this.container.className='vvp paused';
      this.poster=document.createElement('div'); this.poster.className='vvp-poster';
      this.video=document.createElement('video'); this.video.playsInline=true; this.video.preload='metadata';
      this.big=document.createElement('div'); this.big.className='vvp-big'; this.big.innerHTML='<svg viewBox="0 0 24 24"><path d="M8 5.14v14l11-7-11-7z"/></svg>';
      this.top=document.createElement('div'); this.top.className='vvp-top'; this.top.innerHTML='<div class="vvp-title-top"></div><div class="vvp-badge">VORTEXVAULT</div>';
      this.loader=document.createElement('div'); this.loader.className='vvp-load';

      const zones=document.createElement('div'); zones.className='vvp-zones';
      zones.innerHTML=`
        <div class="vvp-zone left"><div class="vvp-hint left-hint"><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M11 18V6l-8.5 6 8.5 6zm.5-6l8.5 6V6l-8.5 6z"/></svg><span>-10s</span></div></div>
        <div class="vvp-zone center"></div>
        <div class="vvp-zone right"><div class="vvp-hint right-hint"><span>+10s</span><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M4 18l8.5-6L4 6v12zm9-12v12l8.5-6L13 6z"/></svg></div></div>
      `;

      const ctrl=document.createElement('div'); ctrl.className='vvp-ctrl';
      ctrl.innerHTML=`
        <div class="vvp-bar"><div class="vvp-track"><div class="vvp-fill"></div><div class="vvp-dot"></div></div></div>
        <div class="vvp-row">
          <div class="vvp-l">
            <button class="vvp-btn main" data-a="play"><svg class="ic-play" viewBox="0 0 24 24"><path d="M8 5.14v14l11-7-11-7z"/></svg><svg class="ic-pause" viewBox="0 0 24 24" style="display:none"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg></button>
            <button class="vvp-btn" data-a="mute"><svg class="ic-vol" viewBox="0 0 24 24"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z"/></svg><svg class="ic-mute" viewBox="0 0 24 24" style="display:none"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71z"/></svg></button>
            <div class="vvp-time"><span class="cur">0:00</span><b>/</b><span class="tot">0:00</span></div>
          </div>
          <div class="vvp-r">
            <button class="vvp-btn" data-a="pip"><svg viewBox="0 0 24 24"><path d="M19 7H5c-1.1 0-2 .9-2 2v6c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V9c0-1.1-.9-2-2-2zm0 8H5V9h14v6zM7 10h5v4H7z"/></svg></button>
            <button class="vvp-btn" data-a="settings"><svg viewBox="0 0 24 24"><path d="M19.14 12.94c.04-.3.06-.61.06-.94 0-.32-.02-.64-.07-.94l2.03-1.58a.49.49 0 00.12-.61l-1.92-3.32a.488.488 0 00-.59-.22l-2.39.96c-.5-.38-1.03-.7-1.62-.94L14.4 2.81a.49.49 0 00-.42-.29h-3.96a.49.49 0 00-.42.29l-.58 2.5c-.59.24-1.13.57-1.62.94l-2.39-.96a.488.488 0 00-.59.22L2.5 8.84c-.12.21-.08.47.12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 00-.12.61l1.92 3.32c.12.21.37.3.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.58 2.5c.05.23.24.4.42.4h3.96c.23 0 .43-.16.42-.4l-.58-2.5c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.09.47 0 .59-.22l1.92-3.32a.49.49 0 00-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/></svg></button>
            <button class="vvp-btn" data-a="fs"><svg class="ic-fs" viewBox="0 0 24 24"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/></svg><svg class="ic-fs2" viewBox="0 0 24 24" style="display:none"><path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"/></svg></button>
          </div>
        </div>
        <div class="vvp-menu">
          <div class="vvp-sec"><div class="vvp-sec-label">Calidad</div><div class="vvp-opt active" data-q="original"><span>Original</span><span>✓</span></div></div>
          <div class="vvp-divider"></div>
          <div class="vvp-sec"><div class="vvp-sec-label">Subtitulos</div><div class="vvp-opt" data-sub="none"><span>No Hay Subtitulos</span></div></div>
          <div class="vvp-divider"></div>
          <div class="vvp-sec"><div class="vvp-sec-label">Velocidad de reproduccion</div><div class="vvp-opt" data-s="0.5"><span>0.5x</span></div><div class="vvp-opt" data-s="0.75"><span>0.75x</span></div><div class="vvp-opt active" data-s="1"><span>Normal</span><span>✓</span></div><div class="vvp-opt" data-s="1.25"><span>1.25x</span></div><div class="vvp-opt" data-s="1.5"><span>1.5x</span></div><div class="vvp-opt" data-s="2"><span>2x</span></div></div>
        </div>
      `;

      this.container.append(this.poster,this.video,zones,this.big,this.top,this.loader,ctrl);
      this.bar=ctrl.querySelector('.vvp-bar'); this.fill=ctrl.querySelector('.vvp-fill'); this.dot=ctrl.querySelector('.vvp-dot');
      this.cur=ctrl.querySelector('.cur'); this.tot=ctrl.querySelector('.tot');
      this.playBtn=ctrl.querySelector('[data-a="play"]'); this.muteBtn=ctrl.querySelector('[data-a="mute"]');
      this.menu=ctrl.querySelector('.vvp-menu'); this.titleTop=this.top.querySelector('.vvp-title-top');
      this.leftZone=zones.querySelector('.left'); this.rightZone=zones.querySelector('.right'); this.centerZone=zones.querySelector('.center');
      this.leftHint=zones.querySelector('.left-hint'); this.rightHint=zones.querySelector('.right-hint');

      // PLAY/PAUSE solo centro y botones
      const toggle=()=>this.toggle();
      this.big.addEventListener('click', toggle);
      this.playBtn.addEventListener('click', toggle);
      this.centerZone.addEventListener('click', toggle);

      // MUTE
      this.muteBtn.addEventListener('click', ()=>{ this.video.muted=!this.video.muted; this._volUI(); });

      // PROGRESS DRAG
      let drag=false;
      const pctFromX=(cx)=>{ const r=this.bar.getBoundingClientRect(); return Math.max(0,Math.min(1,(cx-r.left)/r.width)); };
      this.bar.addEventListener('mousedown', e=>{ drag=true; this.bar.classList.add('drag'); this._seek(pctFromX(e.clientX)); });
      this.bar.addEventListener('touchstart', e=>{ drag=true; this.bar.classList.add('drag'); this._seek(pctFromX(e.touches[0].clientX)); e.preventDefault(); }, {passive:false});
      window.addEventListener('mousemove', e=>{ if(drag) this._seek(pctFromX(e.clientX)); });
      window.addEventListener('touchmove', e=>{ if(drag) this._seek(pctFromX(e.touches[0].clientX)); }, {passive:false});
      window.addEventListener('mouseup', ()=>{ drag=false; this.bar.classList.remove('drag'); });
      window.addEventListener('touchend', ()=>{ drag=false; this.bar.classList.remove('drag'); });

      // TIMEUPDATE
      this.video.addEventListener('timeupdate', ()=>{
        if(drag) return;
        const p=(this.video.currentTime/this.video.duration)*100||0;
        this.fill.style.width=p+'%'; this.dot.style.left=p+'%';
        this.cur.textContent=this._fmt(this.video.currentTime);
      });
      this.video.addEventListener('loadedmetadata', ()=>{ this.tot.textContent=this._fmt(this.video.duration); this.poster.classList.add('hide'); });
      this.video.addEventListener('waiting', ()=>this.loader.style.display='block');
      this.video.addEventListener('canplay', ()=>this.loader.style.display='none');
      this.video.addEventListener('playing', ()=>this.loader.style.display='none');
      this.video.addEventListener('play', ()=>{
        this.container.classList.remove('paused'); this.container.classList.add('playing');
        this.playBtn.querySelector('.ic-play').style.display='none'; this.playBtn.querySelector('.ic-pause').style.display='block';
        this.poster.classList.add('hide');
      });
      this.video.addEventListener('pause', ()=>{
        this.container.classList.add('paused'); this.container.classList.remove('playing');
        this.playBtn.querySelector('.ic-play').style.display='block'; this.playBtn.querySelector('.ic-pause').style.display='none';
      });

      // --- DOBLE CLICK/TAP PARA 10s (fix sensibilidad) ---
      const showHint=(el)=>{
        el.classList.add('show');
        clearTimeout(el._t); el._t=setTimeout(()=>el.classList.remove('show'),700);
      };
      const doSeek = (dir)=>{
        if(dir<0) this.video.currentTime=Math.max(0,this.video.currentTime-10);
        else this.video.currentTime=Math.min(this.video.duration||Infinity,this.video.currentTime+10);
        showHint(dir<0?this.leftHint:this.rightHint);
        this.container.classList.add('show-ctrl'); clearTimeout(this._hideT); this._hideT=setTimeout(()=>this.container.classList.remove('show-ctrl'),2000);
      };

      // Doble click en zonas (PC)
      this.leftZone.addEventListener('dblclick', (e)=>{ e.stopPropagation(); doSeek(-1); });
      this.rightZone.addEventListener('dblclick', (e)=>{ e.stopPropagation(); doSeek(1); });

      // Doble tap en móvil (tap rápido 2 veces en <300ms)
      const makeDoubleTap = (el, dir)=>{
        let last=0;
        el.addEventListener('touchend', (e)=>{
          const now=Date.now();
          if(now-last<300){ e.preventDefault(); doSeek(dir); last=0; }
          else last=now;
        }, {passive:false});
        // click simple en móvil NO hace seek (solo doble)
        el.addEventListener('click', (e)=>{
          // evita que un click simple accidental haga seek
          if(e.detail===2){ // doble click nativo
            doSeek(dir);
          }
        });
      };
      makeDoubleTap(this.leftZone,-1);
      makeDoubleTap(this.rightZone,1);

      // SETTINGS
      ctrl.querySelector('[data-a="settings"]').addEventListener('click', e=>{ e.stopPropagation(); this.menu.classList.toggle('open'); });
      this.menu.querySelectorAll('[data-s]').forEach(el=>{
        el.addEventListener('click', ()=>{
          this.video.playbackRate=parseFloat(el.dataset.s);
          this.menu.querySelectorAll('[data-s]').forEach(x=>{ x.classList.remove('active'); x.innerHTML='<span>'+x.textContent.replace('✓','').trim()+'</span>'; });
          el.classList.add('active'); el.innerHTML='<span>'+el.textContent.replace('✓','').trim()+'</span><span>✓</span>';
          this.menu.classList.remove('open');
        });
      });
      this.menu.querySelectorAll('[data-q],[data-sub]').forEach(el=>el.addEventListener('click', ()=>this.menu.classList.remove('open')));
      document.addEventListener('click', e=>{ if(!e.target.closest('.vvp-menu') && !e.target.closest('[data-a="settings"]')) this.menu.classList.remove('open'); });

      ctrl.querySelector('[data-a="fs"]').addEventListener('click', ()=>this._fs());
      ctrl.querySelector('[data-a="pip"]').addEventListener('click', async()=>{ try{ if(document.pictureInPictureElement) await document.exitPictureInPicture(); else await this.video.requestPictureInPicture(); }catch(e){} });
      this.video.addEventListener('dblclick', (e)=>{
        // si el dblclick fue en zona lateral ya hicimos seek, no hacer fullscreen
        const r=this.container.getBoundingClientRect();
        const x=e.clientX-r.left;
        if(x<r.width*0.3 || x>r.width*0.7) return;
        this._fs();
      });
    }
    _seek(p){ if(!isNaN(this.video.duration)) this.video.currentTime=p*this.video.duration; this.fill.style.width=(p*100)+'%'; this.dot.style.left=(p*100)+'%'; }
    _volUI(){
      const vol=this.container.querySelector('.ic-vol'), mute=this.container.querySelector('.ic-mute');
      if(this.video.muted||this.video.volume===0){ vol.style.display='none'; mute.style.display='block'; } else { vol.style.display='block'; mute.style.display='none'; }
    }
    toggle(){
      if(this.video.paused){ this.video.muted=false; this.video.play().catch(()=>{ this.video.muted=true; this._volUI(); this.video.play().catch(()=>{}); }); }
      else this.video.pause();
    }
    _fs(){
      const btn=this.container.querySelector('[data-a="fs"]');
      if(!document.fullscreenElement){ this.container.requestFullscreen().catch(()=>{}); btn.querySelector('.ic-fs').style.display='none'; btn.querySelector('.ic-fs2').style.display='block'; }
      else{ document.exitFullscreen(); btn.querySelector('.ic-fs').style.display='block'; btn.querySelector('.ic-fs2').style.display='none'; }
    }
    _fmt(s){ if(isNaN(s)||!isFinite(s)) return '0:00'; const h=Math.floor(s/3600), m=Math.floor((s%3600)/60), sec=Math.floor(s%60).toString().padStart(2,'0'); if(h>0) return `${h}:${String(m).padStart(2,'0')}:${sec}`; return `${Math.floor(s/60)}:${sec}`; }
    load(file,title,poster,autoplay){
      this.video.src=file; this.video.load();
      this.titleTop.textContent=title||'';
      if(poster){ this.poster.style.backgroundImage=`url('${poster}')`; this.poster.classList.remove('hide'); } else this.poster.classList.add('hide');
      if(autoplay){ this.video.muted=false; this._volUI(); setTimeout(()=>this.video.play().catch(()=>{}),120); }
    }
    api(a,v){ if(a==='play'){ if(v) this.load(v,this.titleTop.textContent,'',true); else this.video.play().catch(()=>{}); } if(a==='pause') this.video.pause(); }
  };
})();