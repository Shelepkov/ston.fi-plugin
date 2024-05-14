window.addEventListener('load', function () {
    setTimeout(() => {
        if (window.location.host === "app.ston.fi") {
            const currentTime = new Date().toISOString();
            chrome.storage.local.set({"lastVisited": currentTime}, function () {
                console.log("The time has been saved: " + currentTime);
            });
        }

        if (new RegExp("/pools/[^/]+").test(window.location.pathname)) {
            const mainElement = document.querySelector('main.flex-1');
            if (mainElement) {
                const header = mainElement.querySelector('header');
                if (header) {
                    const newBlock = document.createElement('div');
                    newBlock.id = 'graph';
                    newBlock.style.width = '100%';
                    newBlock.style.height = 'fit-content';
                    newBlock.style.backgroundColor = 'transparent';

                    // Добавляем iframe с графиком
                    newBlock.innerHTML = `
                        <iframe style="aspect-ratio: 1200 / 630; width:100%; height:fit-content;" 
                            src="https://www.coindesk.com/embedded-chart/C7NCKfdWrfbfn" 
                            width="100%" frameborder="0" scrolling="no"></iframe>
                    `;

                    header.parentNode.insertBefore(newBlock, header.nextSibling);
                }
            }
        }
    }, 2000);
});
