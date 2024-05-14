import { insertPriceTable } from './prices';
import { insertSaveButton } from './snapshots';

export function watchUrlChanges() {
    let lastUrl = location.href;

    new MutationObserver(() => {
        const url = location.href;
        if (url !== lastUrl) {
            lastUrl = url;
            setTimeout(() => {
                insertPriceTable();
                insertSaveButton();
            }, 200);
        }
    }).observe(document, { subtree: true, childList: true });
}
