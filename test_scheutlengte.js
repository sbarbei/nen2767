function byId(id){return document.getElementById(id);}
function clickId(id){var el=byId(id);if(el)el.click();}
function typeValue(id,val){var el=byId(id);if(el){el.focus();el.value=val;el.dispatchEvent(new Event('input',{bubbles:true}));}}
function setSelectValue(id,label){var s=byId(id);if(!s)return;var o=Array.from(s.options).find(o=>o.label===label);if(o){s.value=o.value;s.dispatchEvent(new Event('change',{bubbles:true}));}}
function check(id){var el=byId(id);if(el&&!el.checked){el.checked=true;el.dispatchEvent(new Event('change',{bubbles:true}));}}

function act(p, s, blad, aant, kleur){
  if(p === "0"){
    clickId("newbutton");
    setSelectValue("treeflawselect", "Scheutlengte (Ernstig)");
    setSelectValue("intensityselect", s);
    clickId("savewfbutton");

    if (blad) {
      setTimeout(function(){
        clickId("newbutton");
        setSelectValue("treeflawselect", "Bladontwikkeling (Serieus)");
        typeValue("scope", "100");
        setSelectValue("intensityselect", s);
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

    clickId("newbutton");
    setSelectValue("treeflawselect", "Scheutlengte (Ernstig)");
    typeValue("scope", (100 - parseFloat(p)).toString());
    setSelectValue("intensityselect", s);
    clickId("savewfbutton");

    if (blad) {
      clickId("newbutton");
      setSelectValue("treeflawselect", "Bladontwikkeling (Serieus)");
      typeValue("scope", (100 - parseFloat(p)).toString());
      setSelectValue("intensityselect", s);
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
m.style="position:fixed;top:20px;right:20px;background:white;padding:15px;border:1px solid #ccc;z-index:99999;font-family:sans-serif;box-shadow:0 2px 6px rgba(0,0,0,0.3);width:95vw;max-width:600px;";
m.innerHTML="<h3>Selecteer opties</h3>";

// Percentages
m.innerHTML += "<div><strong>Percentage:</strong><br>";
var percents = [0,1,2,3,4,5,6,7,8,9,10,11,15,20,25,30,35,40,45,50,55,60,65,70];
for (var i = 0; i < percents.length; i += 4) {
  m.innerHTML += "<div style='display:flex;gap:10px;margin-bottom:5px;'>";
  for (var j = i; j < i + 4 && j < percents.length; j++) {
    var p = percents[j];
    var checked = (p === 0) ? "checked" : "";
    var labelText = (p === 5 || p === 10) ? "<strong>" + p + "%</strong>" : p + "%";
    m.innerHTML += "<label style='flex:1;'><input type='radio' name='pct' value='"+p+"' "+checked+"> "+labelText+"</label>";
  }
  m.innerHTML += "</div>";
}
m.innerHTML += "</div>";
m.innerHTML += "<div style='margin-top:10px;'><label>Anders: <input type='number' id='customPct' min='0' max='100' style='width:60px;'>%</label></div><br>";

// Stadium
m.innerHTML += "<div><strong>Stadium:</strong><br>";
["Beginstadium","Gevorderd stadium"].forEach(function(val){
  var checked = (val === "Gevorderd stadium") ? "checked" : "";
  m.innerHTML += "<label><input type='radio' name='stadium' value='"+val+"' "+checked+"> "+val+"</label><br>";
});
m.innerHTML += "</div><br>";

// Bladontwikkeling
m.innerHTML += "<div><label><input type='checkbox' id='bladcheck'> Voeg bladontwikkeling toe</label></div><br>";

// Aantasting + Bladkleur naast elkaar
m.innerHTML += "<div><strong>Aantasting & Bladkleur (optioneel):</strong></div>";
m.innerHTML += "<div style='display:flex;gap:20px;margin-top:5px;margin-bottom:10px;'>";
m.innerHTML += "<label>Aantasting (%): <input type='number' id='aantasting' min='0' max='100' style='width:60px;'></label>";
m.innerHTML += "<label>Bladkleur (%): <input type='number' id='bladkleur' min='0' max='100' style='width:60px;'></label>";
m.innerHTML += "</div><br>";

// Knoppen
var btnStart = d.createElement("button");
btnStart.textContent = "Start";
btnStart.style = "margin-right:10px;padding:5px 10px;background-color:#007BFF;color:white;font-weight:bold;border:none;border-radius:4px;";
btnStart.onclick = function(){
  var pRadio = m.querySelector("input[name='pct']:checked");
  var pCustom = m.querySelector("#customPct");
  var s = m.querySelector("input[name='stadium']:checked");
  var blad = m.querySelector("#bladcheck").checked;
  var aant = m.querySelector("#aantasting").value.trim();
  var kleur = m.querySelector("#bladkleur").value.trim();
  var pVal = pRadio ? pRadio.value : (pCustom.value ? pCustom.value : null);
  if(pVal && s){
    act(pVal, s.value, blad, aant, kleur);
    d.body.removeChild(m);
  } else {
    alert("Selecteer percentage en stadium.");
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
