function saveOption (name) {
	var elt = document.getElementById(name);
	var elt_value = elt.children[elt.selectedIndex].value;
	localStorage[name] 	  = elt_value;
}

function loadOption(name, defaultValue){
	var v = localStorage[name];
	if (!v) {
	  v = defaultValue;
	}
	return v;
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
  
  setSelectValue ("source", src);
  setSelectValue ("destination", dst);
}


document.addEventListener('DOMContentLoaded', loadOptions);
document.querySelector('#save').addEventListener('click', saveOptions);