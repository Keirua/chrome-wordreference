var lang = {
    'fr':'French',
    'en':'English',
    'de':'German',
    'it':'Italian',
    'es':'Spanish'
};

var matchingLang = {
    'fr': ['en', 'it', 'de'],
    'en': ['fr', 'de'],
    'de': [],
    'it': [],
    'es': []
};

function onSourceChange () {
    alert ("plop");
}

function fillDestinationSelect (sourceLang) {
    var destSelect = document.getElementById("destination");
    for (var i = 0;i < matchingLang[sourceLang].length; ++i){
        var option = document.createElement("option");
        var l = matchingLang[sourceLang][i];
        option.value = l;
        option.text = lang[l];
        destSelect.appendChild(option);
    }
}

function fillSelects (src, dst) {
    var sourceSelect = document.getElementById("source");
    for (var i in lang){
        if (lang.hasOwnProperty (i)){
            var option = document.createElement("option");
            option.value = i;
            option.text = lang[i];
            sourceSelect.appendChild(option);
        }
    }
    fillDestinationSelect (src);
}

function saveOption (name) {
    var elt = document.getElementById(name);
    var elt_value = elt.children[elt.selectedIndex].value;
    localStorage[name] 	  = elt_value;
}

function loadOption(name, defaultValue){
    var v = localStorage[name];

    return v ? v : defaultValue;
}

function setSelectValue(name, value){
    var select = document.getElementById(name);
    for (var i = 0; i < select.children.length; i++) {
      var child = select.children[i];
      if (child.value == value) {
        child.selected = "true";
        break;
      }
    }
}

function saveOptions() {
    saveOption ("source");
    saveOption ("destination");

    // Update status to let user know options were saved.
    var status = document.getElementById("status");
    status.innerHTML = "Options Saved.";
    setTimeout(function() {
    status.innerHTML = "";
    }, 750);
}

// Restores select box state to saved value from localStorage.
function loadOptions() {
    var src = loadOption ("source", 'en');
    var dst = loadOption ("destination", 'fr');
    fillSelects(src, dst);
    setSelectValue ("source", src);
    setSelectValue ("destination", dst);
}


document.addEventListener('DOMContentLoaded', loadOptions);
document.querySelector('#save').addEventListener('click', saveOptions);