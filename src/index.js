import { insertPriceTable } from './stonfi/prices';
import { insertSaveButton } from './stonfi/snapshots';
import { watchUrlChanges } from './stonfi/watchUrl';

function init() {
    insertPriceTable();
    insertSaveButton();
    watchUrlChanges();
}

window.addEventListener('load', function () {
    setTimeout(() => {
        init();
    }, 200);
});
