document.getElementById('refresh').addEventListener('click', loadAnalytics);

function loadAnalytics() {
    chrome.storage.local.get('timeSpent', (data) => {
        const analyticsDiv = document.getElementById('analytics');
        analyticsDiv.innerHTML = '';
        const timeSpent = data.timeSpent || {};
        
        for (const domain in timeSpent) {
            const time = timeSpent[domain].time;
            const productive = timeSpent[domain].productive;
            const unproductive = timeSpent[domain].unproductive;
            analyticsDiv.innerHTML += `<p>${domain}: ${time} seconds (Productive: ${productive}, Unproductive: ${unproductive})</p>`;
        }
    });
}

// Load analytics on popup open
loadAnalytics();