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
var DingTalkContent = (function () {
    function DingTalkContent() {
        this.dingTalkFullScreenStyle = document.createElement('style');
        this.dingTalkFullScreenStyle.id = 'dingTalkFullScreenStyle';
        generaPageContent.head.appendChild(this.dingTalkFullScreenStyle);
        this.init();
    }
    DingTalkContent.prototype.init = function () {
        return __awaiter(this, void 0, void 0, function () {
            var self;
            var _this = this;
            return __generator(this, function (_a) {
                this.initDingTalkStyle();
                DingTalkContent.checkLSPStatus();
                self = this;
                chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
                    if (request.message.fullScreen) {
                        self.genFullScreenDingTalk();
                    }
                    else if (request.message.fullScreen === false) {
                        self.genRawDingTalkStyle();
                    }
                    else if (request.message.initDingTalkStyle) {
                        self.initDingTalkStyle();
                    }
                    else if (request.message.checkLSPStatus) {
                        DingTalkContent.checkLSPStatus();
                    }
                    sendResponse({
                        result: 'success'
                    });
                });
                chrome.runtime.sendMessage({ storeDtId: true });
                window.onload = function () {
                    _this.initMessageListener();
                };
                return [2];
            });
        });
    };
    DingTalkContent.prototype.genFullScreenDingTalk = function () {
        this.dingTalkFullScreenStyle.innerHTML = "\n                            #layout-main {\n                                width: 100%;\n                                height: 100%;\n                            }\n                            #body {\n                                height: 100%;\n                            }\n                            #layout-container {\n                                display: block;\n                            }\n    ";
    };
    DingTalkContent.prototype.genRawDingTalkStyle = function () {
        this.dingTalkFullScreenStyle.innerHTML += "\n                            #layout-main {\n                                width: 1000px;\n                            }\n                            #body {\n                                height: 542px;\n                            }\n                            #layout-container {\n                                display: flex;\n                            }\n    ";
    };
    DingTalkContent.prototype.initDingTalkStyle = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, StorageArea.get('fullScreen')];
                    case 1:
                        if (_a.sent()) {
                            this.genFullScreenDingTalk();
                        }
                        else {
                            this.genRawDingTalkStyle();
                        }
                        return [2];
                }
            });
        });
    };
    DingTalkContent.checkLSPStatus = function () {
        return __awaiter(this, void 0, void 0, function () {
            var scriptID, content, script, loopLSPStatus_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, StorageArea.get('loginStatusPersistence')];
                    case 1:
                        if (!(_a.sent()))
                            return [2];
                        scriptID = 'LSPScript-of-EVINK';
                        if (document.querySelector("#" + scriptID))
                            return [2];
                        content = "\n            var loginStatusKeep = setInterval(function () {\n                if (window.sessionStorage.getItem('EvinK') === 'Handsome') {\n                    var element = document.createElement('div');\n                    element.id = 'LSPScript-finished-EvinK';\n                    document.body.appendChild(element);\n                    return clearInterval(loginStatusKeep); \n                }\n                var wkToken = window.sessionStorage.getItem('wk_token');\n                if (!wkToken) return;\n                wkToken = JSON.parse(wkToken);\n                // if (wkToken.isAutoLogin) return clearInterval(loginStatusKeep);\n                if (wkToken.isAutoLogin) {\n                    window.sessionStorage.setItem('EvinK', 'Handsome');\n                    return location.reload();\n                }\n                wkToken.isAutoLogin = true;\n                // console.log(JSON.stringify(wkToken));\n                window.sessionStorage.setItem('wk_token', JSON.stringify(wkToken));\n            }, 1000)\n        ";
                        script = document.createElement('script');
                        script.id = scriptID;
                        script.innerHTML += content;
                        document.body.appendChild(script);
                        return [4, StorageArea.get('loginStatusPersistence')];
                    case 2:
                        if (_a.sent()) {
                            loopLSPStatus_1 = setInterval(function () {
                                if (document.querySelector('#LSPScript-finished-EvinK')) {
                                    generaPageContent.genBubbleMsg('登录状态已保存');
                                    return clearInterval(loopLSPStatus_1);
                                }
                            }, 1000);
                        }
                        return [2];
                }
            });
        });
    };
    DingTalkContent.prototype.initMessageListener = function () {
        var obs = new MutationObserver(function (mutations) {
            mutations.forEach(function (m) {
                if (m.type === 'characterData') {
                    if (m.target.parentElement.className.indexOf('time'))
                        return;
                    var msgBox = m.target.parentElement.parentElement.parentElement;
                    var name_1 = msgBox.querySelector('.title-wrap.info .name-wrap p.name .name-title.ng-binding');
                    var msg = msgBox.querySelector('.latest-msg-info .latest-msg span[ng-bind-html="convItem.conv.lastMessageContent|emoj"]');
                    return chrome.runtime.sendMessage({
                        chromeNotification: {
                            title: "\u9489\u9489 - " + name_1.textContent,
                            message: msg.textContent
                        }
                    });
                }
                if (m.target.className === 'noti') {
                    if (m.target.querySelector('.unread-num.ng-scope')) {
                        var parent_1 = m.target.parentElement.parentElement;
                        var msg = parent_1.querySelector('.latest-msg span[ng-bind-html="convItem.conv.lastMessageContent|emoj"]');
                        var name_2 = parent_1.querySelector('.name-wrap .name-title.ng-binding');
                        return chrome.runtime.sendMessage({
                            chromeNotification: {
                                title: "\u9489\u9489 - " + name_2.textContent,
                                message: msg.textContent
                            }
                        });
                    }
                }
            });
        });
        var config = { childList: true, subtree: true, characterData: true };
        var targetNode = document.querySelector('#sub-menu-pannel');
        obs.observe(targetNode, config);
    };
    return DingTalkContent;
}());
new DingTalkContent();
//# sourceMappingURL=dingTalkContent.js.map