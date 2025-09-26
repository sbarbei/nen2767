document.title = "Groenvak";

function byId(id){return document.getElementById(id);}
function clickId(id){var el=byId(id);if(el)el.click();}
function typeValue(id,val){var el=byId(id);if(el){el.focus();el.value=val;el.dispatchEvent(new Event('input',{bubbles:true}));}}
function setSelectValue(id,label){
  var s=byId(id);
  if(!s)return;
  var o=Array.from(s.options).find(o=>o.label===label || o.text===label || o.textContent===label || o.value===label);
  if(o){s.value=o.value;s.dispatchEvent(new Event('change',{bubbles:true}));}
}
function check(id){var el=byId(id);if(el&&!el.checked){el.checked=true;el.dispatchEvent(new Event('change',{bubbles:true}));}}

// Trage, betrouwbare versie van actSjabloon – wacht tussen elke regel met invullen!
function actSjabloon(
  afsterEind, afsterGev, afsterBegin,
  eind, gev, overlapGev, begin, overlapBegin,
  groeiGev, overlapGroeiGev, groeiBegin, overlapGroeiBegin
) {
  const acties = [];

  // Afsterving (Ernstig)
  if(afsterEind) acties.push(function(next){
    clickId("newbutton");
    setTimeout(()=>{ setSelectValue("plantflawselect", "Afsterving (Ernstig)");
      setTimeout(()=>{ typeValue("scope", afsterEind);
        setTimeout(()=>{ setSelectValue("intensityselect", "Eindstadium");
          setTimeout(()=>{ clickId("savewfbutton"); next(); }, 100);
        }, 100);
      }, 100);
    }, 100);
  });
  if(afsterGev) acties.push(function(next){
    clickId("newbutton");
    setTimeout(()=>{ setSelectValue("plantflawselect", "Afsterving (Ernstig)");
      setTimeout(()=>{ typeValue("scope", afsterGev);
        setTimeout(()=>{ setSelectValue("intensityselect", "Gevorderd stadium");
          setTimeout(()=>{ clickId("savewfbutton"); next(); }, 100);
        }, 100);
      }, 100);
    }, 100);
  });
  if(afsterBegin) acties.push(function(next){
    clickId("newbutton");
    setTimeout(()=>{ setSelectValue("plantflawselect", "Afsterving (Ernstig)");
      setTimeout(()=>{ typeValue("scope", afsterBegin);
        setTimeout(()=>{ setSelectValue("intensityselect", "Beginstadium");
          setTimeout(()=>{ clickId("savewfbutton"); next(); }, 100);
        }, 100);
      }, 100);
    }, 100);
  });

  // Bedekkingsgraad (Serieus)
  if(eind) acties.push(function(next){
    clickId("newbutton");
    setTimeout(()=>{ setSelectValue("plantflawselect", "Bedekkingsgraad (Serieus)");
      setTimeout(()=>{ typeValue("scope", eind);
        setTimeout(()=>{ setSelectValue("intensityselect", "Eindstadium");
          setTimeout(()=>{ clickId("savewfbutton"); next(); }, 100);
        }, 100);
      }, 100);
    }, 100);
  });
  if(gev) acties.push(function(next){
    clickId("newbutton");
    setTimeout(()=>{ setSelectValue("plantflawselect", "Bedekkingsgraad (Serieus)");
      setTimeout(()=>{ typeValue("scope", gev);
        setTimeout(()=>{ setSelectValue("intensityselect", "Gevorderd stadium");
          setTimeout(()=>{
            if(overlapGev) check("overlap");
            setTimeout(()=>{ clickId("savewfbutton"); next(); }, 100);
          }, 100);
        }, 100);
      }, 100);
    }, 100);
  });
  if(begin) acties.push(function(next){
    clickId("newbutton");
    setTimeout(()=>{ setSelectValue("plantflawselect", "Bedekkingsgraad (Serieus)");
      setTimeout(()=>{ typeValue("scope", begin);
        setTimeout(()=>{ setSelectValue("intensityselect", "Beginstadium");
          setTimeout(()=>{
            if(overlapBegin) check("overlap");
            setTimeout(()=>{ clickId("savewfbutton"); next(); }, 100);
          }, 100);
        }, 100);
      }, 100);
    }, 100);
  });

  // Groeiontwikkeling (Serieus)
  if(groeiGev) acties.push(function(next){
    clickId("newbutton");
    setTimeout(()=>{ setSelectValue("plantflawselect", "Groeiontwikkeling (Serieus)");
      setTimeout(()=>{ typeValue("scope", groeiGev);
        setTimeout(()=>{ setSelectValue("intensityselect", "Gevorderd stadium");
          setTimeout(()=>{
            if(overlapGroeiGev) check("overlap");
            setTimeout(()=>{ clickId("savewfbutton"); next(); }, 100);
          }, 100);
        }, 100);
      }, 100);
    }, 100);
  });
  if(groeiBegin) acties.push(function(next){
    clickId("newbutton");
    setTimeout(()=>{ setSelectValue("plantflawselect", "Groeiontwikkeling (Serieus)");
      setTimeout(()=>{ typeValue("scope", groeiBegin);
        setTimeout(()=>{ setSelectValue("intensityselect", "Beginstadium");
          setTimeout(()=>{
            if(overlapGroeiBegin) check("overlap");
            setTimeout(()=>{ clickId("savewfbutton"); next(); }, 100);
          }, 100);
        }, 100);
      }, 100);
    }, 100);
  });

  // Voer acties na elkaar uit met telkens 500ms tussen elk (pas aan als nodig)
  function runActie(i){
    if(i<acties.length) acties[i](function(){ setTimeout(()=>runActie(i+1), 500); });
  }
  runActie(0);
}

var d=document,m=d.createElement("div");
m.style="position:fixed;top:20px;right:20px;background:white;padding:18px 15px 15px 15px;border:1px solid #ccc;z-index:99999;font-family:sans-serif;box-shadow:0 2px 6px rgba(0,0,0,0.3);width:95vw;max-width:670px;";

var quickVals = [1,2,3,4,5,6,7,8,9,10,15,20,25,30,35,40,45,50,55,60,65,70,75,80,85,90,95,100];

function quickPickBtnHtml(id){
  return `<button class="quickPickBtn" data-for="${id}" style="margin-left:3px;padding:2px 6px 2px 6px;border-radius:4px;border:1px solid #aaa;background:#f5f5f5;font-size:13px;cursor:pointer;">Kies snel</button>`;
}
function inputWithBtn(id, overlapId) {
  return `<span style="white-space:nowrap;display:inline-flex;align-items:center;">
    <input type='number' id='${id}' min='0' max='100' style='width:58px;margin-left:2px;' placeholder="%" autocomplete="off">
    ${quickPickBtnHtml(id)}
    ${overlapId ? `<label style="font-size:13px;margin-left:9px;"><input type="checkbox" id="${overlapId}" style="margin-right:4px;">Overlap</label>` : ""}
  </span>`;
}

m.innerHTML = `
  <div style='margin-left:auto;width:max-content;margin-bottom:0;'>
    <div style='background:black;color:white;padding:4px 8px;font-size:14px;font-weight:bold;'>Groenvak</div>
    <div style='height:1px;background:black;'></div>
  </div>
  <table style="width:100%;margin-top:8px;font-size:15px;border-collapse:separate;border-spacing:0 1px;">
    <tr><td colspan="2" style="font-size:14px;color:#444;font-weight:bold;padding-top:3px;">Afsterving (Ernstig)</td></tr>
    <tr><td style="padding-right:5px;">Eindstadium</td><td>${inputWithBtn('afsterEind')}</td></tr>
    <tr><td style="padding-right:5px;">Gevorderd stadium</td><td>${inputWithBtn('afsterGev')}</td></tr>
    <tr><td style="padding-right:5px;">Beginstadium</td><td>${inputWithBtn('afsterBegin')}</td></tr>
    <tr><td colspan="2"><div style="height:2px;"></div></td></tr>
    <tr><td colspan="2" style="font-size:14px;color:#444;font-weight:bold;">Bedekkingsgraad (Serieus)</td></tr>
    <tr><td style="padding-right:5px;">Eindstadium</td><td>${inputWithBtn('eind')}</td></tr>
    <tr><td style="padding-right:5px;">Gevorderd stadium</td><td>${inputWithBtn('gevorderd','overlapGev')}</td></tr>
    <tr><td style="padding-right:5px;">Beginstadium</td><td>${inputWithBtn('begin','overlapBegin')}</td></tr>
    <tr><td colspan="2"><div style="height:2px;"></div></td></tr>
    <tr><td colspan="2" style="font-size:14px;color:#444;font-weight:bold;">Groeiontwikkeling (Serieus)</td></tr>
    <tr><td style="padding-right:5px;">Gevorderd stadium</td><td>${inputWithBtn('groeig','overlapGroeiGev')}</td></tr>
    <tr><td style="padding-right:5px;">Beginstadium</td><td>${inputWithBtn('groeib','overlapGroeiBegin')}</td></tr>
    <tr><td colspan="2"><div style="height:2px;"></div></td></tr>
    <tr>
      <td colspan="2" style="font-size:16px;color:#0a0;font-weight:bold;">
        <span id="zonderGebreken">Zonder gebreken: 100%</span>
      </td>
    </tr>
  </table>
  <div style='margin-top:5px;margin-bottom:4px;font-size:12px;color:#666;'>Vul de gewenste percentages per rij in.<br>Alleen de rijen waarvan Overlap uit staat tellen mee als “zonder gebreken”.</div>
`;

// Alleen tellen als overlap uit staat:
function updateZonderGebreken() {
  var ids = [
    {id: 'afsterEind'},
    {id: 'afsterGev'},
    {id: 'afsterBegin'},
    {id: 'eind'},
    {id: 'gevorderd', overlap: 'overlapGev'},
    {id: 'begin', overlap: 'overlapBegin'},
    {id: 'groeig', overlap: 'overlapGroeiGev'},
    {id: 'groeib', overlap: 'overlapGroeiBegin'}
  ];
  var totaal = 0;
  ids.forEach(function(obj) {
    var el = m.querySelector("#"+obj.id);
    var val = el ? el.value.trim() : '';
    if(typeof obj.overlap === "string") {
      var overlapChecked = m.querySelector("#"+obj.overlap) ? m.querySelector("#"+obj.overlap).checked : false;
      if(overlapChecked) return;
    }
    if(val) totaal += parseFloat(val.replace(',','.'))||0;
  });
  var zonder = 100 - totaal;
  var tekst = "Zonder gebreken: " + (zonder < 0 ? 0 : zonder.toFixed(1).replace('.0','')) + "%";
  var el = m.querySelector("#zonderGebreken");
  if(el) el.textContent = tekst;
}
["afsterEind","afsterGev","afsterBegin","eind","gevorderd","begin","groeig","groeib",
 "overlapGev","overlapBegin","overlapGroeiGev","overlapGroeiBegin"
].forEach(function(id){
  var field = m.querySelector("#"+id);
  if(field) field.addEventListener("input", updateZonderGebreken);
  if(field && field.type === "checkbox") field.addEventListener("change", updateZonderGebreken);
});
updateZonderGebreken();

function makeQuickPickPopup(input, btn) {
  var old = document.getElementById("quickPickPop");
  if(old) document.body.removeChild(old);

  var pop = document.createElement("div");
  pop.id = "quickPickPop";
  var rect = btn.getBoundingClientRect();
  pop.style = "position:absolute;z-index:999999;top:"+(rect.bottom+window.scrollY+3)+"px;left:"+(rect.left+window.scrollX)+"px;background:#fff;border:1px solid #aaa;padding:8px 12px 6px 12px;box-shadow:0 2px 12px rgba(0,0,0,0.16);border-radius:6px;";
  pop.innerHTML = "<div style='font-size:13px;color:#222;margin-bottom:5px;'>Kies percentage:</div>";
  quickVals.forEach(function(val){
    var b = document.createElement("button");
    b.textContent = val;
    b.style = "margin:3px 3px 4px 0;padding:4px 10px;border-radius:5px;border:1px solid #aaa;background:#f3f3f3;font-size:15px;cursor:pointer;";
    b.onclick = function(){
      input.value = val;
      input.dispatchEvent(new Event("input", {bubbles:true}));
      document.body.removeChild(pop);
    };
    pop.appendChild(b);
  });
  setTimeout(function(){
    function closePop(e){
      if(!pop.contains(e.target) && e.target!==btn){
        document.body.removeChild(pop);
        document.removeEventListener('mousedown',closePop,true);
      }
    }
    document.addEventListener('mousedown',closePop,true);
  },50);
  document.body.appendChild(pop);
}

setTimeout(function() {
  var btns = m.querySelectorAll(".quickPickBtn");
  btns.forEach(function(btn){
    var inputId = btn.getAttribute("data-for");
    var input = m.querySelector("#"+inputId);
    btn.onclick = function(e){
      e.preventDefault();
      makeQuickPickPopup(input, btn);
    };
  });
},10);

var btnStart = d.createElement("button");
btnStart.textContent = "Start";
btnStart.style = "margin-right:10px;padding:6px 12px;background-color:#28a745;color:white;font-weight:bold;border:none;border-radius:4px;";
btnStart.onclick = function(){
  var afsterEind = m.querySelector("#afsterEind").value.trim();
  var afsterGev = m.querySelector("#afsterGev").value.trim();
  var afsterBegin = m.querySelector("#afsterBegin").value.trim();

  var eind = m.querySelector("#eind").value.trim();
  var gev = m.querySelector("#gevorderd").value.trim();
  var overlapGev = m.querySelector("#overlapGev").checked;
  var begin = m.querySelector("#begin").value.trim();
  var overlapBegin = m.querySelector("#overlapBegin").checked;

  var groeiGev = m.querySelector("#groeig").value.trim();
  var overlapGroeiGev = m.querySelector("#overlapGroeiGev").checked;
  var groeiBegin = m.querySelector("#groeib").value.trim();
  var overlapGroeiBegin = m.querySelector("#overlapGroeiBegin").checked;

  if(
    !afsterEind && !afsterGev && !afsterBegin &&
    !eind && !gev && !begin &&
    !groeiGev && !groeiBegin
  ){
    alert("Vul ten minste één percentage in.");
    return;
  }
  actSjabloon(
    afsterEind, afsterGev, afsterBegin,
    eind, gev, overlapGev, begin, overlapBegin,
    groeiGev, overlapGroeiGev, groeiBegin, overlapGroeiBegin
  );
  d.body.removeChild(m);
};

var btnCancel = d.createElement("button");
btnCancel.textContent = "Annuleer";
btnCancel.style = "padding:6px 12px;";
btnCancel.onclick = function(){d.body.removeChild(m);};

var closeBtn = d.createElement("button");
closeBtn.textContent = "×";
closeBtn.style="position:absolute;top:5px;right:10px;background:none;border:none;font-size:19px;cursor:pointer;";
closeBtn.onclick=function(){d.body.removeChild(m);};

m.appendChild(btnStart);
m.appendChild(btnCancel);
m.appendChild(closeBtn);
d.body.appendChild(m);
