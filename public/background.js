chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (tab.url.includes("ston.fi") && changeInfo.status === "complete") {
        chrome.scripting.executeScript({
            target: {tabId: tabId},
            files: ['combined.js']
        });
    }
});

chrome.webNavigation.onHistoryStateUpdated.addListener(function(details) {
    if (details.url.includes("ston.fi")) {
        chrome.scripting.executeScript({
            target: {tabId: details.tabId},
            files: ['combined.js']
        });
    }
});
