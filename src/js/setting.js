var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
        page: 'general',
        notificationLock: false,
        settings: {},
        bubbleWin: document.createElement('div'),
        versionCheck: true,
    },
    methods: {
        routeTo: function (page, clearData) {
            this.page = page;
            if (clearData) {
                this.syncData();
            }
        },
        syncData: function () {
            return __awaiter(this, void 0, void 0, function () {
                var settings, _a;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0: return [4, StorageArea.get('settings')];
                        case 1:
                            settings = _b.sent();
                            if (settings) {
                                this.settings = settings;
                            }
                            else {
                                this.settings = {
                                    banGlobalStyle: true,
                                    banSnapshotShortcut: false,
                                    snapshotShortcut: ['Ctrl', 'Alt', 'a'],
                                    msgClickedAction: 'focus',
                                };
                            }
                            _a = this;
                            return [4, StorageArea.get('notificationLock')];
                        case 2:
                            _a.notificationLock = (_b.sent());
                            return [2];
                    }
                });
            });
        },
        saveSettings: function () {
            var _this = this;
            if (!this.settings.banSnapshotShortcut && this.settings.snapshotShortcut.length <= 0) {
                this.genBubbleMsg('设置未保存');
                setTimeout(function () { return _this.genBubbleMsg('截图快捷键不是一个合法值'); }, 300);
                setTimeout(function () { return _this.genBubbleMsg('如无需使用快捷键，建议直接禁用'); }, 600);
                return;
            }
            StorageArea.set({ settings: this.settings });
            StorageArea.set({ notificationLock: this.notificationLock });
            this.genBubbleMsg('设置已保存');
        },
        cancelSettings: function () {
            this.syncData();
        },
        genBubbleMsg: function (msg) {
            var bubble = document.createElement('div');
            bubble.classList.add('bubble-EvinK');
            var bubbleChild = document.createElement('p');
            bubble.appendChild(bubbleChild);
            this.bubbleWin.appendChild(bubble);
            setTimeout(function () {
                bubble.remove();
            }, 5000);
            var bubbleOnClass = 'bubble-on';
            var bubbleLength = this.bubbleWin.querySelectorAll("." + bubbleOnClass).length;
            bubble.style.top = bubbleLength * 65 + "px";
            bubbleChild.innerText = "\u901A\u77E5: " + msg;
            bubble.classList.add(bubbleOnClass);
        },
        setSnapshotShortcut: function (e) {
            var _this = this;
            if (this.settings.banSnapshotShortcut)
                return;
            this.settings.snapshotShortcut = [];
            e.target.onkeydown = function (e) {
                e.preventDefault();
                if (!e.key.trim())
                    return;
                if (_this.settings.snapshotShortcut.indexOf(e.key.trim()) >= 0)
                    return;
                _this.settings.snapshotShortcut.push(e.key.trim());
            };
        },
    },
    mounted: function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                this.syncData();
                this.bubbleWin.id = 'bubbleWin-EvinK';
                document.body.appendChild(this.bubbleWin);
                return [2];
            });
        });
    }
});
function fixBg() {
    var widht = document.body.clientWidth;
    var height = document.body.clientHeight;
    var WHRate = 3840 / 2160;
    if (widht / height > WHRate)
        document.body.style.backgroundSize = '100vw auto';
    else
        document.body.style.backgroundSize = 'auto 100vh';
}
fixBg();
window.onresize = function () {
    fixBg();
};
//# sourceMappingURL=setting.js.map