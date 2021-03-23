var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
new Vue({
    el: '#app',
    data: {
        fullScreen: true,
        loginStatusPersistence: true,
        fsSwitchAnimation: false,
        lspSwitchAnimation: false,
        menuOn: false,
        menuClicked: false,
        version: undefined,
        snapshotShortcut: ['Ctrl', 'Alt', 'A'],
        theme: 'original',
    },
    methods: {
        onFullScreen() {
            this.fullScreen = true;
            this.fsSwitchAnimation = true;
            StorageArea.set({ fullScreen: true });
            sendMessage({ fullScreen: true });
        },
        offFullScreen() {
            this.fullScreen = false;
            this.fsSwitchAnimation = true;
            StorageArea.set({ fullScreen: false });
            sendMessage({ fullScreen: false });
        },
        keepLoginStatus() {
            this.loginStatusPersistence = true;
            this.lspSwitchAnimation = true;
            StorageArea.set({ loginStatusPersistence: true });
            sendMessage({ bubble: '设置完成' });
            sendMessage({ checkLSPStatus: true });
        },
        notKeepLoginStatus() {
            this.loginStatusPersistence = false;
            this.lspSwitchAnimation = true;
            StorageArea.set({ loginStatusPersistence: false });
            sendMessage({ bubble: '设置完成，下次重新登陆后将生效' });
        },
        clickMenu() {
            this.menuOn = !this.menuOn;
            this.menuClicked = true;
        },
        snapshot() {
            // 截图 (当前网页)
            return chrome.tabs.captureVisibleTab(null, {}, function (image) {
                sendMessage({ snapshot: image });
            });
            // 录屏
            // const thisPage = await getCurrentPage()
            // chrome.desktopCapture.chooseDesktopMedia(['screen', 'window', 'tab'], thisPage, (streamId) => {
            //     console.log(streamId)
            // })
        },
        openSettingPage() {
            chrome.tabs.create({ url: chrome.extension.getURL('setting.html') });
        },
        themeChanged() {
            sendMessage({ theme: this.theme });
            StorageArea.set({ theme: this.theme });
            if (this.theme === 'original')
                sendMessage({ bubble: '请刷新网页钉钉' });
        },
    },
    mounted() {
        return __awaiter(this, void 0, void 0, function* () {
            const manifestData = chrome.runtime.getManifest();
            this.version = manifestData.version;
            this.fullScreen = (yield StorageArea.get('fullScreen')) || false;
            this.loginStatusPersistence = (yield StorageArea.get('loginStatusPersistence')) || false;
            const settings = yield StorageArea.get('settings');
            if (settings) {
                if (settings.banSnapshotShortcut)
                    this.snapshotShortcut = [];
                else
                    this.snapshotShortcut = settings.snapshotShortcut;
            }
            this.theme = (yield StorageArea.get('theme')) || 'original';
        });
    }
});
