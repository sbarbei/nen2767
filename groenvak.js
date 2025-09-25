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

function actSjabloon(
  afsterEind, afsterGev, afsterBegin,
  eind, gev, begin, groeiEind, groeiGev, overlapGev, groeiBegin, overlapBegin
) {
  // Afsterving (Ernstig)
  if(afsterEind) {
    clickId("newbutton");
    setSelectValue("plantflawselect", "Afsterving (Ernstig)");
    typeValue("scope", afsterEind);
    setSelectValue("intensityselect", "Eindstadium");
    clickId("savewfbutton");
  }
  if(afsterGev) {
    clickId("newbutton");
    setSelectValue("plantflawselect", "Afsterving (Ernstig)");
    typeValue("scope", afsterGev);
    setSelectValue("intensityselect", "Gevorderd stadium");
    clickId("savewfbutton");
  }
  if(afsterBegin) {
    clickId("newbutton");
    setSelectValue("plantflawselect", "Afsterving (Ernstig)");
    typeValue("scope", afsterBegin);
    setSelectValue("intensityselect", "Beginstadium");
    clickId("savewfbutton");
  }
  // Bedekkingsgraad (Serieus)
  if(eind) {
    clickId("newbutton");
    setSelectValue("plantflawselect", "Bedekkingsgraad (Serieus)");
    typeValue("scope", eind);
    setSelectValue("intensityselect", "Eindstadium");
    clickId("savewfbutton");
  }
  if(gev) {
    clickId("newbutton");
    setSelectValue("plantflawselect", "Bedekkingsgraad (Serieus)");
    typeValue("scope", gev);
    setSelectValue("intensityselect", "Gevorderd stadium");
    clickId("savewfbutton");
  }
  if(begin) {
    clickId("newbutton");
    setSelectValue("plantflawselect", "Bedekkingsgraad (Serieus)");
    typeValue("scope", begin);
    setSelectValue("intensityselect", "Beginstadium");
    clickId("savewfbutton");
  }
  // Groeiontwikkeling (Serieus)
  if(groeiEind) {
    clickId("newbutton");
    setSelectValue("plantflawselect", "Groeiontwikkeling (Serieus)");
    typeValue("scope", groeiEind);
    setSelectValue("intensityselect", "Eindstadium");
    clickId("savewfbutton");
  }
  if(groeiGev) {
    clickId("newbutton");
    setSelectValue("plantflawselect", "Groeiontwikkeling (Serieus)");
    typeValue("scope", groeiGev);
    setSelectValue("intensityselect", "Gevorderd stadium");
    if(overlapGev) check("overlap");
    clickId("savewfbutton");
  }
  if(groeiBegin) {
    clickId("newbutton");
    setSelectValue("plantflawselect", "Groeiontwikkeling (Serieus)");
    typeValue("scope", groeiBegin);
    setSelectValue("intensityselect", "Beginstadium");
    if(overlapBegin) check("overlap");
    clickId("savewfbutton");
  }
}

// ==== UI ====
var d=document,m=d.createElement("div");
m.style="position:fixed;top:20px;right:20px;background:white;padding:18px 15px 15px 15px;border:1px solid #ccc;z-index:99999;font-family:sans-serif;box-shadow:0 2px 6px rgba(0,0,0,0.3);width:95vw;max-width:670px;";

m.innerHTML = `
  <div style='margin-left:auto;width:max-content;margin-bottom:0;'>
    <div style='background:black;color:white;padding:4px 8px;font-size:14px;font-weight:bold;'>Groenvak</div>
    <div style='height:1px;background:black;'></div>
  </div>
  <table style="width:100%;margin-top:18px;font-size:15px;">
    <tr><td colspan="3" style="font-size:14px;color:#444;font-weight:bold;padding-top:6px;">Afsterving (Ernstig)</td></tr>
    <tr>
      <td>Eindstadium</td>
      <td><input type='number' id='afsterEind' min='0' max='100' style='width:60px;' placeholder="%" autocomplete="off"></td>
      <td></td>
    </tr>
    <tr>
      <td>Gevorderd stadium</td>
      <td><input type='number' id='afsterGev' min='0' max='100' style='width:60px;' placeholder="%" autocomplete="off"></td>
      <td></td>
    </tr>
    <tr>
      <td>Beginstadium</td>
      <td><input type='number' id='afsterBegin' min='0' max='100' style='width:60px;' placeholder="%" autocomplete="off"></td>
      <td></td>
    </tr>
    <tr><td colspan="3"><div style="height:12px;"></div></td></tr>
    <tr><td colspan="3" style="font-size:14px;color:#444;font-weight:bold;">Bedekkingsgraad (Serieus)</td></tr>
    <tr>
      <td>Eindstadium</td>
      <td><input type='number' id='eind' min='0' max='100' style='width:60px;' placeholder="%" autocomplete="off"></td>
      <td></td>
    </tr>
    <tr>
      <td>Gevorderd stadium</td>
      <td><input type='number' id='gevorderd' min='0' max='100' style='width:60px;' placeholder="%" autocomplete="off"></td>
      <td></td>
    </tr>
    <tr>
      <td>Beginstadium</td>
      <td><input type='number' id='begin' min='0' max='100' style='width:60px;' placeholder="%" autocomplete="off"></td>
      <td></td>
    </tr>
    <tr><td colspan="3"><div style="height:12px;"></div></td></tr>
    <tr><td colspan="3" style="font-size:14px;color:#444;font-weight:bold;">Groeiontwikkeling (Serieus)</td></tr>
    <tr>
      <td>Eindstadium</td>
      <td><input type='number' id='groeiEind' min='0' max='100' style='width:60px;' placeholder="%" autocomplete="off"></td>
      <td></td>
    </tr>
    <tr>
      <td>Gevorderd stadium</td>
      <td><input type='number' id='groeig' min='0' max='100' style='width:60px;' placeholder="%" autocomplete="off"></td>
      <td><label style="font-size:13px;"><input type="checkbox" id="overlapg" style="margin-right:4px;">Overlap</label></td>
    </tr>
    <tr>
      <td>Beginstadium</td>
      <td><input type='number' id='groeib' min='0' max='100' style='width:60px;' placeholder="%" autocomplete="off"></td>
      <td><label style="font-size:13px;"><input type="checkbox" id="overlapb" style="margin-right:4px;">Overlap</label></td>
    </tr>
    <tr><td colspan="3"><div style="height:10px;"></div></td></tr>
    <tr>
      <td colspan="3" style="font-size:16px;color:#0a0;font-weight:bold;">
        <span id="zonderGebreken">Zonder gebreken: 100%</span>
      </td>
    </tr>
  </table>
  <div style='margin-top:12px;margin-bottom:8px;font-size:12px;color:#666;'>Vul de gewenste percentages per rij in. <br>Voor groeiontwikkeling moet je nu altijd handmatig het percentage invullen.</div>
`;

// Functie om het percentage zonder gebreken te berekenen
function updateZonderGebreken() {
  // Alle input-ids die meetellen voor de optelsom
  var ids = [
    'afsterEind', 'afsterGev', 'afsterBegin',
    'eind', 'gevorderd', 'begin',
    'groeiEind', 'groeig', 'groeib'
  ];
  var totaal = 0;
  ids.forEach(function(id) {
    var el = m.querySelector("#"+id);
    var val = el ? el.value.trim() : '';
    if(val) totaal += parseFloat(val.replace(',','.'))||0;
  });
  var zonder = 100 - totaal;
  var tekst = "Zonder gebreken: " + (zonder < 0 ? 0 : zonder.toFixed(1).replace('.0','')) + "%";
  var el = m.querySelector("#zonderGebreken");
  if(el) el.textContent = tekst;
}

// Koppel update aan elke input
["afsterEind","afsterGev","afsterBegin","eind","gevorderd","begin","groeiEind","groeig","groeib"].forEach(function(id){
  m.querySelector("#"+id).addEventListener("input", updateZonderGebreken);
});
updateZonderGebreken(); // direct initieel uitvoeren

var btnStart = d.createElement("button");
btnStart.textContent = "Start";
btnStart.style = "margin-right:10px;padding:6px 12px;background-color:#28a745;color:white;font-weight:bold;border:none;border-radius:4px;";
btnStart.onclick = function(){
  var afsterEind = m.querySelector("#afsterEind").value.trim();
  var afsterGev = m.querySelector("#afsterGev").value.trim();
  var afsterBegin = m.querySelector("#afsterBegin").value.trim();

  var eind = m.querySelector("#eind").value.trim();
  var gev = m.querySelector("#gevorderd").value.trim();
  var begin = m.querySelector("#begin").value.trim();

  var groeiEind = m.querySelector("#groeiEind").value.trim();
  var groeiGev = m.querySelector("#groeig").value.trim();
  var overlapGev = m.querySelector("#overlapg").checked;
  var groeiBegin = m.querySelector("#groeib").value.trim();
  var overlapBegin = m.querySelector("#overlapb").checked;

  if(
    !afsterEind && !afsterGev && !afsterBegin &&
    !eind && !gev && !begin &&
    !groeiEind && !groeiGev && !groeiBegin
  ){
    alert("Vul ten minste één percentage in.");
    return;
  }
  actSjabloon(
    afsterEind, afsterGev, afsterBegin,
    eind, gev, begin, groeiEind, groeiGev, overlapGev, groeiBegin, overlapBegin
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
