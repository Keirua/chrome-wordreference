function onClickHandler(info, tab) {
    var selectionText = ( info.selectionText );

    var src_lang = localStorage["source"] ? localStorage["source"] : 'en';
    var dst_lang = localStorage["destination"] ? localStorage["destination"] : 'fr';

    var baseURL = 'http://www.wordreference.com/'
    var serviceCall = baseURL + src_lang + dst_lang + '/' + encodeURIComponent(selectionText);
    chrome.tabs.create({'url':  serviceCall}, function(tab) {});
};

chrome.contextMenus.onClicked.addListener(onClickHandler);

chrome.runtime.onInstalled.addListener(function() {
    chrome.contextMenus.create({"title": "Wordreference it", "contexts":["selection"], "id": "contextWordref"});
});