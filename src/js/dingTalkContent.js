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
        this.newMessageNotificationLock = false;
        this.notificationBanListKey = 'newMessageBanList';
        this.globalNotificationLockKey = 'notificationLock';
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
                this.switchNightMode(true);
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
                    _this.newMessageListener();
                    _this.initMessageSelector();
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
    DingTalkContent.prototype.newMessageListener = function () {
        var _this = this;
        var that = this;
        function handleNotiClass(target) {
            return __awaiter(this, void 0, void 0, function () {
                var parent_1, msg, name_1, banList, msgContent;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (!target.querySelector('.unread-num.ng-scope')) return [3, 2];
                            parent_1 = target.parentElement.parentElement;
                            msg = parent_1.querySelector('.latest-msg span[ng-bind-html="convItem.conv.lastMessageContent|emoj"]');
                            name_1 = parent_1.querySelector('.name-wrap .name-title.ng-binding');
                            if (!msg.textContent || !name_1.textContent)
                                return [2];
                            return [4, StorageArea.get(that.notificationBanListKey)];
                        case 1:
                            banList = _a.sent();
                            if (!banList)
                                banList = [];
                            if (banList.indexOf(name_1.textContent) >= 0)
                                return [2];
                            msgContent = msg.textContent;
                            if (msgContent.length > 20)
                                msgContent = msgContent.slice(0, 20) + "...";
                            return [2, chrome.runtime.sendMessage({
                                    chromeNotification: {
                                        title: "\u9489\u9489 - " + name_1.textContent,
                                        message: msgContent
                                    }
                                })];
                        case 2: return [2];
                    }
                });
            });
        }
        var obs = new MutationObserver(function (mutations) {
            mutations.forEach(function (m) { return __awaiter(_this, void 0, void 0, function () {
                var notiBox;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4, StorageArea.get(this.globalNotificationLockKey)];
                        case 1:
                            if (_a.sent())
                                return [2];
                            if (this.newMessageNotificationLock)
                                return [2];
                            if (m.type === 'characterData') {
                                if (m.target.parentElement.className.indexOf('time') >= 0)
                                    return [2];
                                notiBox = m.target.parentElement.parentElement.parentElement;
                                if (notiBox.className.indexOf('noti') >= 0) {
                                    return [2, handleNotiClass(notiBox)];
                                }
                            }
                            else if (m.target.className.indexOf('noti') >= 0) {
                                return [2, handleNotiClass(m.target)];
                            }
                            return [2];
                    }
                });
            }); });
        });
        var config = { childList: true, subtree: true, characterData: true };
        var findContactDomInterval = setInterval(function () {
            var targetNode = document.querySelector('#sub-menu-pannel');
            if (targetNode) {
                clearInterval(findContactDomInterval);
                obs.observe(targetNode, config);
            }
        }, 1000);
    };
    DingTalkContent.prototype.initMessageSelector = function () {
        return __awaiter(this, void 0, void 0, function () {
            function findFather() {
                return __awaiter(this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        return [2, new Promise(function (resolve) {
                                var findFatherInterval = setInterval(function () {
                                    var father = document.querySelector('#header');
                                    if (father) {
                                        clearInterval(findFatherInterval);
                                        resolve(father);
                                        return;
                                    }
                                }, 1000);
                            })];
                    });
                });
            }
            function handleExit() {
                that.newMessageNotificationLock = true;
                setTimeout(function () { return that.newMessageNotificationLock = false; }, 1000);
                banList = [];
                for (var _i = 0, coverList_1 = coverList; _i < coverList_1.length; _i++) {
                    var cover = coverList_1[_i];
                    cover.remove();
                }
                btnsArea.appendChild(btn);
                finishBtn.remove();
                cancelBtn.remove();
            }
            var father, btnsArea, btn, img, label, finishBtn, cancelBtn, banList, coverList, that;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4, findFather()];
                    case 1:
                        father = _a.sent();
                        btnsArea = document.createElement('div');
                        btnsArea.classList.add('contact-selector-area-EVINK');
                        father.appendChild(btnsArea);
                        btnsArea.innerHTML += "\n        <style>\n        div.contact-selector-area-EVINK {\n        position: absolute;\n        top: 0;\n        left: 130px;\n        width: 100px;\n        height: 100%;\n        display: flex;\n        flex-flow: row;\n        justify-content: space-evenly;\n        align-items: center;\n        }\n        div.contact-selector-area-EVINK a {\n        color: white;\n        cursor: pointer;\n        }\n        .contact-cover-box-EVINK {\n        position: absolute;\n        top: 0;\n        left: 0;\n        width: 100%;\n        height: 100%;\n        background: #00000033;\n        overflow: hidden;\n        }\n        .contact-cover-box-EVINK::after, .contact-cover-box-EVINK::before{\n        content: '';\n        position: absolute;\n        }\n        .contact-cover-box-EVINK::before{ \n        left: 13px;\n        width: 38px;\n        height: 38px;\n        border-radius: 50%;\n        }\n        .contact-cover-box-EVINK::after{ \n        left: 20px;\n        width: 24px;\n        height: 100%;\n        }\n        .contact-cover-box-hover-EVINK::after {\n        top: 100%;\n        background: no-repeat center/100% url(\"" + chrome.extension.getURL('assets/imgs/notification-disable-red.svg') + "\");\n        }\n        .contact-cover-box-hover-EVINK::before {\n        top: 100%;\n        background: #000000ab;\n        }\n        .contact-cover-box-hover-EVINK:hover::before {\n        top: 9px;\n        }\n        .contact-cover-box-hover-EVINK:hover::after {\n        top: 0;\n        }\n        .contact-cover-box-permanent-EVINK::after {\n        top: 0;\n        background: no-repeat center/100% url(\"" + chrome.extension.getURL('assets/imgs/notification-disable-white.svg') + "\");\n        }\n        .contact-cover-box-permanent-EVINK::before {\n        top: 9px;\n        background: #ff0000cf;\n        }\n        </style>\n        ";
                        btn = document.createElement('a');
                        btnsArea.appendChild(btn);
                        btn.style.display = 'flex';
                        btn.style.justifyContent = 'center';
                        btn.style.alignItems = 'center';
                        img = new Image();
                        btn.appendChild(img);
                        img.src = chrome.extension.getURL('assets/imgs/notification-setting.svg');
                        img.style.width = '18px';
                        label = document.createElement('span');
                        btn.appendChild(label);
                        label.textContent = '通知设置';
                        finishBtn = document.createElement('a');
                        img = new Image();
                        finishBtn.appendChild(img);
                        img.src = chrome.extension.getURL('assets/imgs/finish.svg');
                        img.style.width = '26px';
                        cancelBtn = document.createElement('a');
                        img = new Image();
                        cancelBtn.appendChild(img);
                        img.src = chrome.extension.getURL('assets/imgs/cancel.svg');
                        img.style.width = '26px';
                        banList = [];
                        coverList = [];
                        btn.onclick = function (e) { return __awaiter(_this, void 0, void 0, function () {
                            var coverClassName, bannedCoverClassName, hoverClassName, contacts, _loop_1, _i, contacts_1, node;
                            var _this = this;
                            return __generator(this, function (_a) {
                                switch (_a.label) {
                                    case 0: return [4, StorageArea.get(this.globalNotificationLockKey)];
                                    case 1:
                                        if (_a.sent())
                                            return [2, GeneralPageContent.alert('通知已被禁用，若要启用通知，请前往设置页')];
                                        return [4, StorageArea.get(this.notificationBanListKey)];
                                    case 2:
                                        banList = (_a.sent());
                                        if (!banList)
                                            banList = [];
                                        coverClassName = 'contact-cover-box-EVINK';
                                        if (document.querySelector("." + coverClassName))
                                            return [2];
                                        bannedCoverClassName = 'contact-cover-box-permanent-EVINK';
                                        hoverClassName = 'contact-cover-box-hover-EVINK';
                                        btn.remove();
                                        btnsArea.appendChild(finishBtn);
                                        btnsArea.appendChild(cancelBtn);
                                        this.newMessageNotificationLock = true;
                                        setTimeout(function () { return _this.newMessageNotificationLock = false; }, 1000);
                                        contacts = document.querySelectorAll('#sub-menu-pannel .conv-lists-box.ng-isolate-scope conv-item div.conv-item:first-child');
                                        if (!contacts) {
                                            return [2, sendMessage({ bubble: '没有找到最近联系人' })];
                                        }
                                        contacts = Array.from(contacts);
                                        _loop_1 = function (node) {
                                            var cover = document.createElement('div');
                                            node.appendChild(cover);
                                            cover.classList.add(coverClassName);
                                            var isBanned = false;
                                            var contactName = node.querySelector('p.name span[ng-bind-html="convItem.conv.i18nTitle|emoj"]');
                                            if (banList.indexOf(contactName.textContent) >= 0) {
                                                cover.classList.add(bannedCoverClassName);
                                                isBanned = true;
                                            }
                                            else {
                                                cover.classList.add(hoverClassName);
                                            }
                                            cover.onclick = function (e) {
                                                if (isBanned) {
                                                    cover.classList.remove(bannedCoverClassName);
                                                    cover.classList.add(hoverClassName);
                                                    var idx = banList.indexOf(contactName.textContent);
                                                    if (idx >= 0)
                                                        banList.splice(idx, 1);
                                                    isBanned = false;
                                                }
                                                else {
                                                    cover.classList.remove(hoverClassName);
                                                    cover.classList.add(bannedCoverClassName);
                                                    banList.push(contactName.textContent);
                                                    isBanned = true;
                                                }
                                                e.stopPropagation();
                                            };
                                            coverList.push(cover);
                                        };
                                        for (_i = 0, contacts_1 = contacts; _i < contacts_1.length; _i++) {
                                            node = contacts_1[_i];
                                            _loop_1(node);
                                        }
                                        return [2];
                                }
                            });
                        }); };
                        that = this;
                        finishBtn.onclick = function () {
                            var data = {};
                            data[_this.notificationBanListKey] = banList;
                            StorageArea.set(data);
                            handleExit();
                        };
                        cancelBtn.onclick = function () {
                            handleExit();
                        };
                        return [2];
                }
            });
        });
    };
    DingTalkContent.prototype.switchNightMode = function (open) {
        var id = 'dt-night-mode-EvinK';
        if (!open) {
            var sheet = document.querySelector(id);
            if (sheet) {
                return sheet.remove();
            }
        }
        var theme = {
            main: '#020f2f',
            header: '#04236e',
            font: 'white',
            selectedFont: 'white',
            chatBoxHeader: '#04236e',
            chatBoxTextAreaBg: 'white',
            chatBoxTextAreaFont: 'black',
            myMsgBubble: '#0945ff',
            msgBubble: '#031a59',
        };
        var nightModeShell = document.createElement('div');
        nightModeShell.id = id;
        generaPageContent.head.appendChild(nightModeShell);
        nightModeShell.innerHTML += "\n        <style>\n        #content-pannel .content-pannel-head {\n        background: " + theme.chatBoxHeader + ";  /* \u804A\u5929\u6846header */\n        color: " + theme.font + ";\n        }\n        #content-pannel .content-pannel-head {  \n         border-bottom: 0 solid transparent; \n        }\n        .main-chat.chat-items.ng-isolate-scope {\n        background: " + theme.main + "; /* \u804A\u5929\u6846 */ \n        }\n        .chat-item.me.responsive-box .content-area .msg-bubble-box .msg-bubble-area .msg-content-wrapper .msg-bubble {\n        background: " + theme.myMsgBubble + ";\n        border: 1px solid transparent;\n        }\n        .chat-item.responsive-box .content-area .msg-bubble-box .msg-bubble-area .msg-content-wrapper .msg-bubble {\n        background: " + theme.msgBubble + ";\n        color: " + theme.font + ";\n        border: 1px solid transparent;\n        }\n        #header {\n        /* header */\n        border: 1px solid " + theme.header + ";\n        }\n        #header.lng-zh {\n        /* header */\n        background: url('https://g.alicdn.com/DingTalkWeb/web/3.8.7/assets/webpack-img/logo_cn.png') no-repeat 35px 18px scroll " + theme.header + ";\n        }\n        .search-bar-wraper .main-search-2 .select2-search-field input {\n            background-color: " + theme.font + ";\n            border: 1px solid " + theme.main + ";\n         }\n         \n         #menu-pannel .main-menus .menu-item.selected {\n         color: " + theme.selectedFont + ";\n         }\n         #menu-pannel, #menu-pannel .profile {\n         background: " + theme.main + ";\n         border: 1px solid " + theme.main + ";\n        }\n        .conv-lists-box.ng-isolate-scope {\n        background: " + theme.main + ";\n        }\n        #sub-menu-pannel.conv-list-pannel .conv-lists .conv-item:hover {\n        background-color: " + theme.chatBoxHeader + ";\n        }\n        #sub-menu-pannel.conv-list-pannel .conv-lists .conv-item.active {\n        background-color: " + theme.chatBoxHeader + ";\n        }\n        #sub-menu-pannel.conv-list-pannel .conv-lists .conv-item:hover .conv-item-content .title-wrap .name-wrap .name .name-title {\n        color: " + theme.selectedFont + ";\n        }\n        #sub-menu-pannel.conv-list-pannel .conv-lists .conv-item.active .conv-item-content .title-wrap .name-wrap .name .name-title {\n        color: " + theme.selectedFont + ";\n        }\n        #sub-menu-pannel.conv-list-pannel .conv-lists .conv-item .conv-item-content .title-wrap .name-wrap .name .name-title {\n        color: " + theme.font + ";\n        }\n        #sub-menu-pannel {\n        border-right: 0 solid transparent; \n        }\n        \n        .nocontent-logo {\n        background: " + theme.main + ";\n        }\n        #content-pannel .nocontent-tips {\n        background: " + theme.main + ";\n        color: " + theme.font + ";\n        }\n        \n        .conv-detail-pannel .send-msg-box-wrapper .action-area .send-message-button {\n        background-color: " + theme.main + ";\n        }\n        .conv-detail-pannel .send-msg-box-wrapper {\n        border-top: 0 solid transparent; \n        }\n        .conv-detail-pannel .send-msg-box-wrapper .input-area {\n        background: " + theme.main + ";\n        }\n        .conv-detail-pannel .send-msg-box-wrapper .input-area .msg-box .input-msg-box {\n        /* \u804A\u5929\u6846Text area */\n        color: " + theme.chatBoxTextAreaFont + ";\n        background-color: " + theme.chatBoxTextAreaBg + ";\n        }\n        .conv-detail-pannel .send-msg-box-wrapper .action-area {\n        border-left: 0 solid transparent;\n        }\n         \n        .chat-head .conv-operations .iconfont {\n        color: " + theme.font + ";\n        }       \n        \n        ::-webkit-scrollbar-track-piece {\n        background-color: " + theme.main + ";\n        }\n        ::-webkit-scrollbar-thumb {\n        background-color: white;\n        }\n        </style>\n        ";
    };
    return DingTalkContent;
}());
new DingTalkContent();
//# sourceMappingURL=dingTalkContent.js.map