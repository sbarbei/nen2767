function byId(id){return document.getElementById(id);}
function clickId(id){var el=byId(id);if(el)el.click();}
function typeValue(id,val){var el=byId(id);if(el){el.focus();el.value=val;el.dispatchEvent(new Event('input',{bubbles:true}));}}
function setSelectValue(id,label){var s=byId(id);if(!s)return;var o=Array.from(s.options).find(o=>o.label===label);if(o){s.value=o.value;s.dispatchEvent(new Event('change',{bubbles:true}));}}
function check(id){var el=byId(id);if(el&&!el.checked){el.checked=true;el.dispatchEvent(new Event('change',{bubbles:true}));}}

function act(p, s, blad){
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
    return;
  }

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

var d=document,m=d.createElement("div");
m.style="position:fixed;top:20px;right:20px;background:white;padding:15px;border:1px solid #ccc;z-index:99999;font-family:sans-serif;box-shadow:0 2px 6px rgba(0,0,0,0.3);width:95vw;max-width:600px;";
m.innerHTML="<h3>Selecteer opties</h3>";

// Percentagetabel (4 kolommen)
m.innerHTML += "<div><strong>Percentage:</strong><br><table style='width:100%'><tr>";
var percentColumns = [['0','4','8','20','40','60'],['1','5','9','25','45','65'],['2','6','10','30','50'],['3','7','15','35','55']];
percentColumns.forEach(function(col){
  m.innerHTML += "<td style='vertical-align:top;'>";
  col.forEach(function(p){
    m.innerHTML += "<label><input type='radio' name='pct' value='"+p+"'> "+p+"%</label><br>";
  });
  m.innerHTML += "</td>";
});
m.innerHTML += "</tr></table><label>Anders: <input type='number' id='customPct' min='0' max='100' style='width:60px;'>%</label></div><br>";

// Stadium
m.innerHTML += "<div><strong>Stadium:</strong><br>";
["Beginstadium","Gevorderd stadium"].forEach(function(val){
  m.innerHTML += "<label><input type='radio' name='stadium' value='"+val+"'> "+val+"</label><br>";
});
m.innerHTML += "</div><br>";

// Bladontwikkeling
m.innerHTML += "<div><label><input type='checkbox' id='bladcheck'> Voeg bladontwikkeling toe</label></div><br>";

// Knoppen
var btnStart = d.createElement("button");
btnStart.textContent = "Start";
btnStart.style = "margin-right:10px;padding:5px 10px;";
btnStart.onclick = function(){
  var pRadio = m.querySelector("input[name='pct']:checked");
  var pCustom = m.querySelector("#customPct");
  var s = m.querySelector("input[name='stadium']:checked");
  var blad = m.querySelector("#bladcheck").checked;
  var pVal = pRadio ? pRadio.value : (pCustom.value ? pCustom.value : null);
  if(pVal && s){
    act(pVal, s.value, blad);
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
