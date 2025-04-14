let timeSpent = {};
let currentTabId = null;
let timer = null;

const productiveWebsites = ["github.com", "stackoverflow.com", "codepen.io"];
const unproductiveWebsites = ["facebook.com", "twitter.com", "instagram.com"];

chrome.tabs.onActivated.addListener(activeInfo => {
    if (currentTabId !== null) {
        clearInterval(timer);
        updateTimeSpent(currentTabId);
    }
    currentTabId = activeInfo.tabId;
    startTimer(activeInfo.tabId);
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tabId === currentTabId) {
        const url = new URL(tab.url);
        const domain = url.hostname;
        if (!timeSpent[domain]) {
            timeSpent[domain] = { productive: 0, unproductive: 0, time: 0 };
        }
    }
});

function startTimer(tabId) {
    timer = setInterval(() => {
        if (currentTabId === tabId) {
            const url = new URL(tab.url);
            const domain = url.hostname;
            timeSpent[domain].time++;
            classifyWebsite(domain);
        }
    }, 1000);
}

function classifyWebsite(domain) {
    if (productiveWebsites.includes(domain)) {
        timeSpent[domain].productive++;
    } else if (unproductiveWebsites.includes(domain)) {
        timeSpent[domain].unproductive++;
    }
}

function updateTimeSpent(tabId) {
    const url = new URL(tab.url);
    const domain = url.hostname;
    // Save timeSpent to storage
    chrome.storage.local.set({ timeSpent });
}

chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.local.set({ timeSpent: {} });
});
function updateTimeSpent(tabId) {
    const url = new URL(tab.url);
    const domain = url.hostname;

    // Save timeSpent to backend
    fetch('http://localhost:5000/api/time', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            domain: domain,
            time: timeSpent[domain].time,
            productive: timeSpent[domain].productive,
            unproductive: timeSpent[domain].unproductive
        })
    });
}