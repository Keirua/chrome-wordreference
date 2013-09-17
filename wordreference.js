function onClickHandler(info, tab) {
    var selectionText = ( info.selectionText );
    var baseURL = 'http://www.wordreference.com/enfr/';
    var serviceCall = baseURL + encodeURIComponent(selectionText);
    chrome.tabs.create({'url':  serviceCall}, function(tab) {});
};

chrome.contextMenus.onClicked.addListener(onClickHandler);

chrome.runtime.onInstalled.addListener(function() {
    chrome.contextMenus.create({"title": "Wordreference it", "contexts":["selection"], "id": "contextWordref"});
});