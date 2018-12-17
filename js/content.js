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
var alertWindowStyle = document.createElement('style');
alertWindowStyle.id = 'alertWindowStyle';
var dingTalkFullScreenStyle = document.createElement('style');
dingTalkFullScreenStyle.id = 'dingTalkFullScreenStyle';
var head = document.querySelector('head');
head.append(alertWindowStyle);
head.append(dingTalkFullScreenStyle);
function genFullscrrenDingtalk() {
    dingTalkFullScreenStyle.innerHTML = "\n                            #layout-main {\n                                width: 100%;\n                                height: 100%;\n                            }\n                            #body {\n                                height: 100%;\n                            }\n                            #layout-container {\n                                display: block;\n                            }\n    ";
}
function genRawDingtalkStyle() {
    dingTalkFullScreenStyle.innerHTML += "\n                            #layout-main {\n                                width: 1000px;\n                            }\n                            #body {\n                                height: 542px;\n                            }\n                            #layout-container {\n                                display: flex;\n                            }\n    ";
}
function genAlertWindow() {
    alertWindowStyle.innerHTML += "\n    /* js generateWindow */\n\n    .win {\n        background: black;\n    }\n\n    #back_win,\n    .back_win {\n        height: 100vh;\n        width: 100vw;\n        background: rgba(0, 0, 0, 0.8);\n        /* opacity\u4F1A\u4F7F\u5B50\u5143\u7D20\u900F\u660E  */\n        position: fixed;\n        top: 0;\n        z-index: 9999;\n        display: none;\n        text-align: center;\n    }\n\n    #win,\n    .win {\n        height: 80%;\n        width: 70%;\n        background: white;\n        position: relative;\n        top: 50%;\n        display: inline-block;\n        text-align: center;\n    }\n\n    #win {\n        top: 35%;\n        height: auto;\n        width: 300px;\n        border-radius: 5px;\n        transform: translate3D(0, -35%, 0);\n    }\n\n    #p_title_error {\n        margin: 0 auto;\n        color: #ae0000;\n        height: auto;\n        font-size: 1.5em;\n        text-align: center;\n        padding: 5px 0 5px 0;\n        border-bottom: 1px solid #cfcfcf;\n        width: 70%;\n        line-height: 50px;\n    }\n\n    #p_tips {\n        display: block;\n        text-align: center;\n        color: black;\n        height: auto;\n        padding: 0 0 50px 0;\n        margin: 55px 15px;\n    }\n\n    #btn_div {\n        height: auto;\n        display: block;\n        position: absolute;\n        bottom: 10px;\n        left: 50%;\n        transform: translate3D(-50%, 0, 0);\n    }\n\n    #win_confirm,\n    #win_cancel {\n        display: inline;\n        width: 50px;\n        height: 33px;\n        border-radius: 2px;\n        border: none;\n        margin: 0 10px 0 10px;\n        font-family: \u5FAE\u8F6F\u96C5\u9ED1;\n        cursor: pointer;\n    }\n\n    #win_confirm {\n        color: white;\n        background: #279a50;\n        margin: 15px 0;\n    }\n\n    #win_confirm:hover {\n        background: #218344;\n    }\n    ";
}
function alert(msg) {
    generationPopWin(msg, function (confirmBtn, cancelBtn, win, back_win) {
        cancelBtn.style.display = 'none';
        confirmBtn.onclick = function () {
            back_win.style.display = 'none';
        };
    });
}
function generationPopWin(msg, callback) {
    var data = generateErrorWindow("提示", msg);
    var win = data[0];
    var back_win = data[1];
    var hasWin = data[2];
    if (hasWin) {
        var confirm_1 = document.querySelector('#win_confirm');
        confirm_1.style.display = 'block';
        return back_win.style.display = 'block';
    }
    var btn_div = document.createElement("div");
    var confirm = document.createElement("button");
    var cancel = document.createElement("button");
    btn_div.id = "btn_div";
    confirm.id = "win_confirm";
    confirm.innerText = "确定";
    cancel.id = "win_cancel";
    cancel.innerText = "取消";
    btn_div.appendChild(confirm);
    btn_div.appendChild(cancel);
    win.appendChild(btn_div);
    if (callback)
        callback(confirm, cancel, win, back_win);
}
function generateErrorWindow(titleStr, content) {
    var back_win = document.getElementById("back_win");
    var win;
    var hasWin;
    if (back_win) {
        var tips = document.getElementById("p_tips");
        var title = document.getElementById("p_title_error");
        title.innerHTML = titleStr;
        tips.innerHTML = content;
        hasWin = true;
    }
    else {
        back_win = document.createElement("div");
        win = document.createElement("div");
        var title = document.createElement("p");
        var tips = document.createElement("p");
        back_win.id = "back_win";
        back_win.className = "back_win";
        win.id = "win";
        win.className = "win";
        title.id = "p_title_error";
        tips.id = "p_tips";
        document.body.appendChild(back_win);
        back_win.appendChild(win);
        title.innerHTML = titleStr;
        tips.innerHTML = content;
        win.appendChild(title);
        win.appendChild(tips);
        back_win.style.display = 'block';
        back_win.onclick = function (e) {
            var winRect = document.querySelector('#win').getBoundingClientRect();
            var targetLeft = winRect.left;
            var targetRight = winRect.right;
            var targetTop = winRect.top;
            var targetBottom = winRect.bottom;
            if (!(targetLeft < e.clientX && e.clientX < targetRight) ||
                !(targetTop < e.clientY && e.clientY < targetBottom)) {
                e.target.style.display = 'none';
            }
        };
        hasWin = false;
    }
    return [win, back_win, hasWin];
}
function autoLogin() {
    return __awaiter(this, void 0, void 0, function () {
        var btns, _loop_1, _i, btns_1, btn, state_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    btns = document.querySelectorAll('button');
                    _loop_1 = function (btn) {
                        var telInput, pwdInput, inputs, _i, inputs_1, input, telNum, passwd, ex_1, autoLoginScript_1, isAutoLogin_1;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!(btn.type == 'submit' &&
                                        btn.className == 'blue big ng-binding' &&
                                        btn.innerText == '登录')) return [3, 7];
                                    telInput = null;
                                    pwdInput = null;
                                    inputs = document.querySelectorAll('input');
                                    for (_i = 0, inputs_1 = inputs; _i < inputs_1.length; _i++) {
                                        input = inputs_1[_i];
                                        if (input.type == 'text' &&
                                            input.placeholder == '请输入手机号') {
                                            telInput = input;
                                            continue;
                                        }
                                        if (input.type == 'password' &&
                                            input.name == 'verification' &&
                                            input.placeholder == "请输入密码") {
                                            pwdInput = input;
                                            continue;
                                        }
                                    }
                                    if (!telInput || !pwdInput) {
                                        return [2, { value: console.error('telInput or pwdInput Not Found') }];
                                    }
                                    telNum = void 0;
                                    passwd = void 0;
                                    _a.label = 1;
                                case 1:
                                    _a.trys.push([1, 4, , 5]);
                                    return [4, storage.get('tel')];
                                case 2:
                                    telNum = (_a.sent());
                                    return [4, storage.get('passwd')];
                                case 3:
                                    passwd = (_a.sent());
                                    passwd = window.atob(passwd);
                                    return [3, 5];
                                case 4:
                                    ex_1 = _a.sent();
                                    return [2, { value: console.log(ex_1) }];
                                case 5:
                                    telInput.value = telNum;
                                    pwdInput.value = passwd;
                                    autoLoginScript_1 = document.createElement('script');
                                    autoLoginScript_1.innerHTML = "\n            const $scopePhone = angular.element(document.querySelector('phone-input>input')).scope()\n            const $scopePwd = angular.element(document.querySelector('input.password')).scope()\n\n            $scopePhone.$apply(() => {\n                $scopePhone.phoneInput.telephone = $scopePhone.phone = document.querySelector('phone-input>input').value = " + telNum + "\n                $scopePhone.phoneInput.triggerChange()\n            })\n\n            $scopePwd.$apply(() => {\n                $scopePwd.passwordLogin.telephone = " + telNum + "\n            })\n\n            $scopePwd.$apply(() => {\n                $scopePwd.passwordLogin.password = document.querySelector('input.password').value = '" + passwd + "'\n                $scopePwd.passwordLogin.submitable = true\n            })";
                                    return [4, storage.get('autoLogin')];
                                case 6:
                                    isAutoLogin_1 = _a.sent();
                                    setTimeout(function () {
                                        document.body.append(autoLoginScript_1);
                                        if (isAutoLogin_1) {
                                            btn.click();
                                        }
                                    }, 100);
                                    _a.label = 7;
                                case 7: return [2];
                            }
                        });
                    };
                    _i = 0, btns_1 = btns;
                    _a.label = 1;
                case 1:
                    if (!(_i < btns_1.length)) return [3, 4];
                    btn = btns_1[_i];
                    return [5, _loop_1(btn)];
                case 2:
                    state_1 = _a.sent();
                    if (typeof state_1 === "object")
                        return [2, state_1.value];
                    _a.label = 3;
                case 3:
                    _i++;
                    return [3, 1];
                case 4: return [2];
            }
        });
    });
}
(function init() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, storage.get('fullscreen')];
                case 1:
                    if (_a.sent()) {
                        genFullscrrenDingtalk();
                    }
                    else {
                        genRawDingtalkStyle();
                    }
                    genAlertWindow();
                    chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
                        if (request.message.fullscreen === true)
                            return genFullscrrenDingtalk();
                        else if (request.message.fullscreen === false)
                            genRawDingtalkStyle();
                        else if (request.message.alert) {
                            alert(request.message.alert);
                        }
                        sendResponse({
                            result: "success"
                        });
                    });
                    autoLogin();
                    return [2];
            }
        });
    });
})();
//# sourceMappingURL=content.js.map