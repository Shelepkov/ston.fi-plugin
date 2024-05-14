// Объект замен
const currencyMap = {
    "ton": "toncoin"
};

window.addEventListener('load', function () {
    setTimeout(() => {
        insertPriceTable();
    }, 200);
});

function insertPriceTable() {
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
                // Парсим валюту из заголовка
                const currencyHeader = header.querySelector('h2.font-bold.typography-h2.truncate');
                if (currencyHeader) {
                    const currencyText = currencyHeader.textContent;
                    let currency = currencyText.split('/')[0].trim().toLowerCase();

                    // Заменяем валюту, если она есть в объекте замен, иначе используем исходное значение
                    currency = currencyMap[currency] || currency;

                    const newBlock = document.createElement('div');
                    newBlock.id = 'graph';
                    newBlock.style.width = '100%';
                    newBlock.style.backgroundColor = 'transparent';

                    // Создаем таблицу данных
                    const table = document.createElement('table');
                    table.style.width = '100%';
                    table.style.borderCollapse = 'collapse';

                    const thead = document.createElement('thead');
                    const headerRow = document.createElement('tr');
                    const headers = ['Time', `Price (${currency.toUpperCase()}/USD)`];

                    headers.forEach(headerText => {
                        const th = document.createElement('th');
                        th.textContent = headerText;
                        th.style.border = '1px solid #dddddd';
                        th.style.textAlign = 'left';
                        th.style.padding = '8px';
                        headerRow.appendChild(th);
                    });

                    thead.appendChild(headerRow);
                    table.appendChild(thead);

                    const tbody = document.createElement('tbody');

                    // Fetch price data from CoinGecko
                    fetch(`https://api.coingecko.com/api/v3/coins/${currency}/market_chart?vs_currency=usd&days=1`)
                        .then(response => response.json())
                        .then(data => {
                            let previousPrice = null;

                            data.prices.forEach(priceData => {
                                const date = new Date(priceData[0]);
                                const minutes = date.getMinutes();

                                // Проверяем, что данные каждые полчаса
                                if (minutes === 0 || minutes === 30) {
                                    const row = document.createElement('tr');

                                    const timeString = date.toLocaleTimeString();
                                    const price = priceData[1].toFixed(2);

                                    const timeCell = document.createElement('td');
                                    timeCell.textContent = timeString;
                                    timeCell.style.border = '1px solid #dddddd';
                                    timeCell.style.padding = '8px';

                                    const priceCell = document.createElement('td');
                                    priceCell.textContent = price;
                                    priceCell.style.border = '1px solid #dddddd';
                                    priceCell.style.padding = '8px';

                                    // Устанавливаем цвет строки в зависимости от роста или падения цены
                                    if (previousPrice !== null) {
                                        if (price > previousPrice) {
                                            row.style.backgroundColor = '#74D492'; // зеленый
                                        } else if (price < previousPrice) {
                                            row.style.backgroundColor = '#FE4747'; // красный
                                        }
                                    }

                                    row.appendChild(timeCell);
                                    row.appendChild(priceCell);

                                    tbody.appendChild(row);

                                    previousPrice = price;
                                }
                            });
                        });

                    table.appendChild(tbody);
                    newBlock.appendChild(table);
                    header.parentNode.insertBefore(newBlock, header.nextSibling);
                }
            }
        }
    }
}

// Проверка на изменение URL
let lastUrl = location.href;
new MutationObserver(() => {
    const url = location.href;
    if (url !== lastUrl) {
        lastUrl = url;
        setTimeout(() => {
            insertPriceTable();
        }, 200);
    }
}).observe(document, {subtree: true, childList: true});
