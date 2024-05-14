export function insertSaveButton() {
    if (new RegExp("/pools/[^/]+").test(window.location.pathname)) {
        const mainElement = document.querySelector('main.flex-1');
        if (mainElement) {
            const header = mainElement.querySelector('header');
            if (header) {
                const saveBlock = document.createElement('div');
                saveBlock.id = 'saveBlock';
                saveBlock.style.width = '100%';
                saveBlock.style.backgroundColor = 'transparent';

                const saveButton = document.createElement('button');
                saveButton.id = 'pool.header.addLiquidity';
                saveButton.className = 'animate-ui-element-transition bg-buttonPrimary hover:bg-buttonPrimaryHover active:bg-buttonPrimaryHover text-white px-[20px] rounded-[12px] h-[48px] whitespace-nowrap flex items-center justify-center w-full';
                saveButton.addEventListener('click', saveResult);

                const buttonText = document.createElement('p');
                buttonText.className = 'font-medium typography-button2 truncate inline-flex items-center justify-center gap-[8px]';
                buttonText.textContent = 'Сохранить результат';
                saveButton.appendChild(buttonText);

                const resultTable = document.createElement('table');
                resultTable.id = 'resultTable';
                resultTable.style.width = '100%';
                resultTable.style.borderCollapse = 'collapse';
                resultTable.style.marginTop = '10px';

                const thead = document.createElement('thead');
                const headerRow = document.createElement('tr');
                const headers = ['Date', 'Pair'];

                headers.forEach(headerText => {
                    const th = document.createElement('th');
                    th.textContent = headerText;
                    th.style.border = '1px solid #dddddd';
                    th.style.textAlign = 'left';
                    th.style.padding = '8px';
                    headerRow.appendChild(th);
                });

                thead.appendChild(headerRow);
                resultTable.appendChild(thead);

                const tbody = document.createElement('tbody');
                resultTable.appendChild(tbody);

                saveBlock.appendChild(saveButton);
                saveBlock.appendChild(resultTable);
                header.parentNode.insertBefore(saveBlock, header.nextSibling);

                loadResults();
            }
        }
    }
}

function saveResult() {
    const currencyHeader = document.querySelector('h2.font-bold.typography-h2.truncate');
    if (currencyHeader) {
        const currencyText = currencyHeader.textContent;
        const date = new Date().toLocaleString();
        const result = {
            date: date,
            pair: currencyText
        };

        chrome.storage.local.get({ results: [] }, function (data) {
            data.results.push(result);
            chrome.storage.local.set({ results: data.results }, function () {
                addResultToTable(result);
            });
        });
    }
}

function loadResults() {
    chrome.storage.local.get({ results: [] }, function (data) {
        data.results.forEach(result => {
            addResultToTable(result);
        });
    });
}

function addResultToTable(result) {
    const tbody = document.getElementById('resultTable').querySelector('tbody');
    const row = document.createElement('tr');

    const dateCell = document.createElement('td');
    dateCell.textContent = result.date;
    dateCell.style.border = '1px solid #dddddd';
    dateCell.style.padding = '8px';

    const pairCell = document.createElement('td');
    pairCell.textContent = result.pair;
    pairCell.style.border = '1px solid #dddddd';
    pairCell.style.padding = '8px';

    row.appendChild(dateCell);
    row.appendChild(pairCell);

    tbody.appendChild(row);
}
