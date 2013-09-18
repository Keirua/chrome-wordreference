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
    'de': ['en'],
    'it': ['en'],
    'es': ['en']
};

var MainController = function ($scope) {
	this.scope = $scope;
	this.loadOptions();

	this.scope.saveOptions = _.bind (this.saveOptions, this);
	var me = this;
	$scope.$watch ('src', function (){
		var srcLang = $scope.src;
		var res = {};
		var foundDstLang = false;
		for (var i = 0;i < matchingLang[srcLang].length; ++i){
		    var l = matchingLang[srcLang][i];
		    res[l] = lang[l];
		    if (l == $scope.dst){
		    	foundDstLang = true;
		    }
		}
		$scope.destinationLang = res;
		if (!foundDstLang){
			$scope.dst = null;
		}
	});
}

MainController.prototype.loadOption = function(name, defaultValue){
    var v = localStorage[name];

    return v ? v : defaultValue;
}

MainController.prototype.saveOptions = function() {
	if (this.scope.src && this.scope.dst) {
		localStorage["source"] = 	  this.scope.src;
		localStorage["destination"] = this.scope.dst;

	    // Update status to let user know options were saved.
	    var status = document.querySelector("#status");
	    status.innerHTML = "Options Saved.";
	    setTimeout(function() {
	    	status.innerHTML = "";
	    }, 750);

	}
	else {
	    alert ("Can't save, one language is not set");
	}
}

// Restores select box state to saved value from localStorage.
MainController.prototype.loadOptions = function() {
    this.scope.src = this.loadOption ("source", 'en');
    this.scope.dst = this.loadOption ("destination", 'fr');
    this.fillSelects(this.scope.src, this.scope.dst);
}

MainController.prototype.fillDestinationSelect = function (srcLang) {
    var res = {};
    for (var i = 0;i < matchingLang[srcLang].length; ++i){
        var l = matchingLang[srcLang][i];
        res[l] = lang[l];
    }
    this.scope.destinationLang = res;
}

MainController.prototype.fillSelects = function (src, dst) {
    this.scope.sourceLang = lang;
    this.fillDestinationSelect (src);
}