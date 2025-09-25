(function(){
  // ===== Helpers =====
  function byId(id){return document.getElementById(id);}
  function clickId(id){var el=byId(id);if(el)el.click();}
  function typeValue(id,val){var el=byId(id);if(el){el.focus();el.value=val;el.dispatchEvent(new Event('input',{bubbles:true}));}}
  function setSelectValue(id,label){
    var s=byId(id);
    if(!s)return;
    var o=Array.from(s.options).find(o=>o.label===label||o.text===label||o.textContent===label||o.value===label);
    if(o){s.value=o.value;s.dispatchEvent(new Event('change',{bubbles:true}));}
  }
  function check(id){var el=byId(id);if(el&&!el.checked){el.checked=true;el.dispatchEvent(new Event('change',{bubbles:true}));}}

  // ===== Snelkeuze helper =====
  var quickVals = [1,2,3,4,5,6,7,8,9,10,15,20,25,30,35,40,45,50,55,60,65,70,75,80,85,90,95,100];

  function quickPickBtnHtml(id){
    return `<button class="quickPickBtn" data-for="${id}" type="button" style="margin-left:4px;padding:2px 7px;border-radius:4px;border:1px solid #aaa;background:#f5f5f5;font-size:12px;cursor:pointer;">Kies snel</button>`;
  }

  // ===== UI =====
  var d=document,m=d.createElement("div");
  m.style="position:fixed;top:20px;right:20px;background:white;padding:20px 20px 18px 20px;border:1px solid #ccc;z-index:99999;font-family:sans-serif;box-shadow:0 2px 8px rgba(0,0,0,0.23);width:95vw;max-width:520px;";

  function row(label, inputId, extraHtml="") {
    return `<div style="display:flex;align-items:center;margin-bottom:10px;">
      <span style="width:245px;min-width:195px;font-size:15px;">${label}</span>
      <input type="number" id="${inputId}" min="0" max="100" style="width:62px;font-size:15px;" placeholder="%" autocomplete="off">
      ${quickPickBtnHtml(inputId)}
      ${extraHtml}
    </div>`;
  }

  m.innerHTML = `
    <div style='margin-left:auto;width:max-content;margin-bottom:0;'>
      <div style='background:black;color:white;padding:4px 8px;font-size:15px;font-weight:bold;'>Gras</div>
      <div style='height:1px;background:black;'></div>
    </div>
    <div style="margin-top:18px;">
      ${row('Bedekkingsgraad (Serieus) Eindstadium', 'eind')}
      ${row('Bedekkingsgraad (Serieus) Gevorderd stadium', 'gevorderd')}
      ${row('Groeiontwikkeling (Serieus) Gevorderd stadium', 'groeig', `<label style="margin-left:14px;font-size:13px;"><input type="checkbox" id="overlapg" checked style="margin-right:4px;">Overlap</label>`)}
      ${row('Bedekkingsgraad (Serieus) Beginstadium', 'begin')}
      ${row('Groeiontwikkeling (Serieus) Beginstadium', 'groeib', `<label style="margin-left:14px;font-size:13px;"><input type="checkbox" id="overlapb" checked style="margin-right:4px;">Overlap</label>`)}
    </div>
    <div style='margin-top:10px;margin-bottom:8px;font-size:12px;color:#666;'>Vul de gewenste percentages per rij in.<br>Standaard staan de percentages van groeiontwikkeling gelijk aan bedekkingsgraad (maar je mag ze aanpassen).</div>
    <div id="zonderGebreken" style="margin-top:5px;font-size:15px;font-weight:bold;">Zonder gebreken: 100%</div>
  `;

  // ===== Invulvelden koppelen aan elkaar =====
  function koppelGelijk(srcId, tgtId) {
    m.querySelector("#" + srcId).addEventListener("input", function() {
      var v = this.value;
      if(!m.querySelector("#" + tgtId).matches(":focus")) m.querySelector("#" + tgtId).value = v;
      updateZonderGebreken();
    });
  }
  koppelGelijk("gevorderd", "groeig");
  koppelGelijk("begin", "groeib");

  // ===== Update Zonder gebreken live =====
  function updateZonderGebreken() {
    var totaal = 0;
    ["eind", "gevorderd", "groeig", "begin", "groeib"].forEach(function(id){
      var v = parseFloat(m.querySelector("#"+id).value);
      if(!isNaN(v)) totaal += v;
    });
    var rest = Math.max(0, 100 - totaal);
    m.querySelector("#zonderGebreken").textContent = "Zonder gebreken: " + rest + "%";
  }
  ["eind", "gevorderd", "groeig", "begin", "groeib"].forEach(function(id){
    m.querySelector("#"+id).addEventListener("input", updateZonderGebreken);
  });
  updateZonderGebreken();

  // ======= Kies Snel functionaliteit =======
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
        input.focus();
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

  // ===== Knoppen =====
  var btnStart = d.createElement("button");
  btnStart.textContent = "Start";
  btnStart.style = "margin-right:10px;padding:6px 12px;background-color:#28a745;color:white;font-weight:bold;border:none;border-radius:4px;";
  btnStart.onclick = function(){
    var eind = m.querySelector("#eind").value.trim();
    var gev = m.querySelector("#gevorderd").value.trim();
    var groeiGev = m.querySelector("#groeig").value.trim();
    var overlapGev = m.querySelector("#overlapg").checked;
    var begin = m.querySelector("#begin").value.trim();
    var groeiBegin = m.querySelector("#groeib").value.trim();
    var overlapBegin = m.querySelector("#overlapb").checked;
    if(!eind && !gev && !groeiGev && !begin && !groeiBegin){
      alert("Vul ten minste één percentage in.");
      return;
    }
    actSjabloon(eind, gev, groeiGev, overlapGev, begin, groeiBegin, overlapBegin);
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
})();
