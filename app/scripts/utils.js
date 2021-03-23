var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class StorageArea {
    static set(data) {
        chrome.storage.local.set(data);
    }
    static get(key) {
        return new Promise((resolve) => {
            chrome.storage.local.get(null, (result) => {
                resolve(result[key]);
            });
        });
    }
}
// this is sendMessage to current page
const sendMessage = (msg, callback) => {
    return new Promise((solve, reject) => __awaiter(void 0, void 0, void 0, function* () {
        const thisPage = yield getCurrentPage();
        chrome.tabs.sendMessage(thisPage.id, { message: msg }, callback);
    }));
};
function getCurrentPage() {
    return __awaiter(this, void 0, void 0, function* () {
        // @ts-ignore
        return new Promise(resolve => chrome.tabs.query({ currentWindow: true, active: true }, function (tabs) {
            const tab = tabs[0];
            resolve(tab);
        }));
    });
}
