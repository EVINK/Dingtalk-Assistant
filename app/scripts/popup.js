var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
    },
    methods: {
        onFullScreen: function () {
            this.fullScreen = true;
            this.fsSwitchAnimation = true;
            StorageArea.set({ fullScreen: true });
            sendMessage({ fullScreen: true });
        },
        offFullScreen: function () {
            this.fullScreen = false;
            this.fsSwitchAnimation = true;
            StorageArea.set({ fullScreen: false });
            sendMessage({ fullScreen: false });
        },
        keepLoginStatus: function () {
            this.loginStatusPersistence = true;
            this.lspSwitchAnimation = true;
            StorageArea.set({ loginStatusPersistence: true });
            sendMessage({ bubble: '设置完成' });
            sendMessage({ checkLSPStatus: true });
        },
        notKeepLoginStatus: function () {
            this.loginStatusPersistence = false;
            this.lspSwitchAnimation = true;
            StorageArea.set({ loginStatusPersistence: false });
            sendMessage({ bubble: '设置完成，下次重新登陆后将生效' });
        },
        clickMenu: function () {
            this.menuOn = !this.menuOn;
            this.menuClicked = true;
        },
        snapshot: function () {
            return sendMessage({ bubble: '功能即将完成' });
        },
    },
    mounted: function () {
        return __awaiter(this, void 0, void 0, function () {
            var manifestData, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        manifestData = chrome.runtime.getManifest();
                        this.version = manifestData.version;
                        _a = this;
                        return [4, StorageArea.get('fullScreen')];
                    case 1:
                        _a.fullScreen = (_c.sent()) || false;
                        _b = this;
                        return [4, StorageArea.get('loginStatusPersistence')];
                    case 2:
                        _b.loginStatusPersistence = (_c.sent()) || false;
                        return [2];
                }
            });
        });
    }
});
//# sourceMappingURL=popup.js.map