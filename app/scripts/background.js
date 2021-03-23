var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
chrome.tabs.onActivated.addListener((activeInfo) => __awaiter(void 0, void 0, void 0, function* () {
    const dtId = yield StorageArea.get('dtId');
    const theme = (yield StorageArea.get('theme')) || 'original';
    if (dtId === activeInfo.tabId) {
        sendMessage({ initDingTalkStyle: true });
        sendMessage({ checkLSPStatus: true });
        sendMessage({ theme });
    }
}));
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => __awaiter(void 0, void 0, void 0, function* () {
    if (message.storeDtId) {
        StorageArea.set({ dtId: sender.tab.id });
        chrome.windows.getCurrent({}, (window) => {
            StorageArea.set({ dtWindowId: window.id });
        });
    }
    else if (message.snapshot) {
        chrome.tabs.captureVisibleTab(null, {}, function (image) {
            sendMessage({ snapshot: image });
        });
    }
    else if (message.chromeNotification) {
        Notify.sendChromeNotification(message.chromeNotification);
        StorageArea.set({ lastMsgSender: message.sender });
    }
    sendResponse({
        result: 'success'
    });
}));
class Notify {
    constructor() {
        this.event();
    }
    static sendChromeNotification(data) {
        return __awaiter(this, void 0, void 0, function* () {
            if (Notify.lastNotificationId)
                yield this.clearChromeNotification();
            if (!data.type)
                data.type = 'basic';
            if (!data.iconUrl)
                data.iconUrl = chrome.extension.getURL('icon.png');
            return new Promise((resolve) => {
                chrome.notifications.create(null, Object.assign({}, data), (nid) => {
                    if (chrome.runtime.lastError)
                        return console.log(chrome.runtime.lastError.message);
                    Notify.lastNotificationId = nid;
                    resolve(nid);
                });
            });
        });
    }
    static clearChromeNotification() {
        return new Promise((resolve) => {
            chrome.notifications.clear(Notify.lastNotificationId, (wasCleared) => __awaiter(this, void 0, void 0, function* () {
                resolve(wasCleared);
            }));
        });
    }
    event() {
        chrome.notifications.onClicked.addListener((notificationId) => __awaiter(this, void 0, void 0, function* () {
            const settings = yield StorageArea.get('settings');
            if (settings && settings.msgClickedAction === 'close') {
                return Notify.clearChromeNotification();
            }
            const dtId = yield StorageArea.get('dtId');
            const windowId = yield StorageArea.get('dtWindowId');
            if (!dtId || !windowId)
                return;
            chrome.windows.update(windowId, { focused: true });
            chrome.tabs.update(dtId, { active: true });
            sendMessage({ clickNotification: true });
        }));
    }
}
Notify.lastNotificationId = undefined;
new Notify();
