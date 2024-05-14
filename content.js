if (window.location.host === "ston.fi") {
    alert("hi");
    const currentTime = new Date().toISOString();
    chrome.storage.local.set({"lastVisited": currentTime}, function() {
        console.log("The time has been saved: " + currentTime);
    });
}

if (window.location.pathname.startsWith('/pools/')) {
    const header = document.querySelector('header._pool-overview_2m9pv_1.grid.gap-x-7.xl\\:grid-cols-\\[640px_auto\\]');

    if (header) {
        const newBlock = document.createElement('div');
        newBlock.id = 'graph';
        newBlock.style.width = '100%';
        newBlock.style.height = '400px';
        newBlock.style.backgroundColor = 'red';

        header.parentNode.insertBefore(newBlock, header.nextSibling);
    }
}
