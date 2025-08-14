function byId(id){return document.getElementById(id);}
function clickId(id){var el=byId(id);if(el)el.click();}
function typeValue(id,val){var el=byId(id);if(el){el.focus();el.value=val;el.dispatchEvent(new Event('input',{bubbles:true}));}}
function setSelectValue(id,label){var s=byId(id);if(!s)return;var o=Array.from(s.options).find(o=>o.label===label);if(o){s.value=o.value;s.dispatchEvent(new Event('change',{bubbles:true}));}}
function check(id){var el=byId(id);if(el&&!el.checked){el.checked=true;el.dispatchEvent(new Event('change',{bubbles:true}));}}

function act(p, s, blad, aant, kleur){
  if(p === "0"){
    if(s.includes("Beginstadium") || s.includes("Gevorderd stadium")) {
      clickId("newbutton");
      setSelectValue("treeflawselect", "Scheutlengte (Ernstig)");
      setSelectValue("intensityselect", s.includes("Gevorderd stadium") ? "Gevorderd stadium" : "Beginstadium");
      clickId("savewfbutton");
    }
    if (blad) {
      setTimeout(function(){
        clickId("newbutton");
        setSelectValue("treeflawselect", "Bladontwikkeling (Serieus)");
        typeValue("scope", "100");
        setSelectValue("intensityselect", s.includes("Gevorderd stadium") ? "Gevorderd stadium" : "Beginstadium");
        check("overlap");
        clickId("savewfbutton");
      }, 300);
    }
    setTimeout(function(){ clickId("inspectedbutton"); }, 600);
  } else {
    clickId("newbutton");
    setSelectValue("treeflawselect", "Afsterving (Ernstig)");
    typeValue("scope", p);
    setSelectValue("intensityselect", "Eindstadium");
    clickId("savewfbutton");

    if(s.includes("Beginstadium") || s.includes("Gevorderd stadium")) {
      clickId("newbutton");
      setSelectValue("treeflawselect", "Scheutlengte (Ernstig)");
      typeValue("scope", (100 - parseFloat(p)).toString());
      setSelectValue("intensityselect", s.includes("Gevorderd stadium") ? "Gevorderd stadium" : "Beginstadium");
      clickId("savewfbutton");
    }

    if (blad) {
      clickId("newbutton");
      setSelectValue("treeflawselect", "Bladontwikkeling (Serieus)");
      typeValue("scope", (100 - parseFloat(p)).toString());
      setSelectValue("intensityselect", s.includes("Gevorderd stadium") ? "Gevorderd stadium" : "Beginstadium");
      check("overlap");
      clickId("savewfbutton");
    }

    clickId("inspectedbutton");
  }

  if (aant !== "") {
    clickId("newbutton");
    setSelectValue("treeflawselect", "Aantasting (Serieus)");
    typeValue("scope", aant);
    setSelectValue("intensityselect", "Gevorderd stadium");
    check("overlap");
    clickId("savewfbutton");
  }

  if (kleur !== "") {
    clickId("newbutton");
    setSelectValue("treeflawselect", "Bladkleur (Serieus)");
    typeValue("scope", kleur);
    setSelectValue("intensityselect", "Gevorderd stadium");
    check("overlap");
    clickId("savewfbutton");
  }
}

var d=document,m=d.createElement("div");
m.style="position:fixed;top:20px;right:20px;background:white;padding:15px;border:1px solid #ccc;z-index:99999;font-family:sans-serif;box-shadow:0 2px 6px rgba(0,0,0,0.3);width:95vw;max-width:900px;";

// ✅ "Gebreken" header met zwarte onderlijn
m.innerHTML = `
  <div style='margin-left:auto;width:max-content;margin-bottom:0;'>
    <div style='background:black;color:white;padding:4px 8px;font-size:13px;font-weight:bold;'>Gebreken</div>
    <div style='height:1px;background:black;'></div>
  </div>`;

// Titel: Intensiteit scheutlengte
m.innerHTML += `<div style='margin-bottom:10px;'><span style='background-color:#007BFF;color:white;padding:4px 8px;font-weight:bold;border-radius:4px;'>Intensiteit scheutlengte</span></div>`;

// Stadium & bladontwikkeling
m.innerHTML += `
  <div style="display:flex;align-items:center;gap:20px;margin-bottom:10px;flex-wrap:wrap;">
    <label style="display:flex;align-items:center;gap:4px;"><input type="checkbox" id="begincheck"> Beginstadium</label>
    <label style="display:flex;align-items:center;gap:4px;"><input type="checkbox" id="gevorderdcheck" checked> Gevorderd stadium</label>
    <label style="display:flex;align-items:center;gap:4px;"><input type="checkbox" id="bladcheck"> Voeg bladontwikkeling toe</label>
  </div>
`;

// Titel: Omvang afsterving
m.innerHTML += `<div style='margin-bottom:5px;'><span style='background-color:#007BFF;color:white;padding:4px 8px;font-weight:bold;border-radius:4px;'>Omvang afsterving</span></div>`;

// Percentagetabel
m.innerHTML += "<table style='border-collapse:collapse;width:100%;table-layout:fixed;'><tbody>";

var pctRows = [
  [0,1,2,3,4,5,6,7],
  [8,9,10,11,12,13,15,20],
  [25,30,35,40,45,50,55,60],
  [65,70,75,80,85,90,95,100]
];

for (var r = 0; r < pctRows.length; r++) {
  m.innerHTML += "<tr>";
  for (var c = 0; c < 8; c++) {
    var p = pctRows[r][c];
    let cell = `<td style="padding:6px;text-align:center;width:12.5%;">`;
    if (p !== undefined) {
      var checked = p === 0 ? "checked" : "";
      var labelText = (p === 5 || p === 10) ? `<strong>${p}%</strong>` : `${p}%`;
      cell += `<label style="display:inline-block;font-size:14px;"><input type="radio" name="pct" value="${p}" ${checked} style="margin-right:4px;">${labelText}</label>`;
    }
    cell += `</td>`;
    m.innerHTML += cell;
  }
  m.innerHTML += "</tr>";
}
m.innerHTML += "</tbody></table>";

// Anders (%): naast label
m.innerHTML += `
  <div style='margin-top:5px;margin-bottom:5px;display:flex;align-items:center;gap:6px;'>
    <label for='customPct'>Anders (%):</label>
    <input type='number' id='customPct' min='0' max='100' style='width:60px;'>
  </div>
`;

// Omvang aantasting & bladkleur
m.innerHTML += `<div style='margin-bottom:5px;'><span style='background-color:#007BFF;color:white;padding:4px 8px;font-weight:bold;border-radius:4px;'>Omvang aantasting & bladkleur</span></div>`;

// Velden aantasting en bladkleur
m.innerHTML += "<div style='display:flex;gap:20px;margin-bottom:10px;flex-wrap:wrap;'>";
m.innerHTML += "<label>Aantasting (%): <input type='number' id='aantasting' min='0' max='100' style='width:60px;'></label>";
m.innerHTML += "<label>Bladkleur (%): <input type='number' id='bladkleur' min='0' max='100' style='width:60px;'></label>";
m.innerHTML += "</div><br>";

// Knoppen
var btnStart = d.createElement("button");
btnStart.textContent = "Start";
btnStart.style = "margin-right:10px;padding:5px 10px;background-color:#28a745;color:white;font-weight:bold;border:none;border-radius:4px;";
btnStart.onclick = function(){
  var pRadio = m.querySelector("input[name='pct']:checked");
  var pCustom = m.querySelector("#customPct");
  var blad = m.querySelector("#bladcheck").checked;
  var aant = m.querySelector("#aantasting").value.trim();
  var kleur = m.querySelector("#bladkleur").value.trim();
  var pVal = pRadio ? pRadio.value : (pCustom.value ? pCustom.value : null);
  var stages = [];
  if (byId("begincheck").checked) stages.push("Beginstadium");
  if (byId("gevorderdcheck").checked) stages.push("Gevorderd stadium");
  if(pVal){
    act(pVal, stages, blad, aant, kleur);
    d.body.removeChild(m);
  } else {
    alert("Selecteer percentage.");
  }
};

var btnCancel = d.createElement("button");
btnCancel.textContent = "Annuleer";
btnCancel.style = "padding:5px 10px;";
btnCancel.onclick = function(){d.body.removeChild(m);};

var closeBtn = d.createElement("button");
closeBtn.textContent = "×";
closeBtn.style="position:absolute;top:5px;right:10px;background:none;border:none;font-size:18px;cursor:pointer;";
closeBtn.onclick=function(){d.body.removeChild(m);};

m.appendChild(btnStart);
m.appendChild(btnCancel);
m.appendChild(closeBtn);
d.body.appendChild(m);

// Stadium exclusief selecteren
byId("begincheck").addEventListener("change", function(){
  if(this.checked) byId("gevorderdcheck").checked = false;
});
byId("gevorderdcheck").addEventListener("change", function(){
  if(this.checked) byId("begincheck").checked = false;
});
