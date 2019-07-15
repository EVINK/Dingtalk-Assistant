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
var switchOfFullScreen = document.querySelector('#dingtalk-full-screen');
var screenShotBtn = document.querySelector('screen-shot');
var userInfoBox = document.querySelector('user-info-box');
var goToRight = document.querySelector('switch-to-right');
var saveUserinfoBtn = document.querySelector('#user-info-save-btn');
var backToMain = document.querySelector('back-to-main');
(function event() {
    return __awaiter(this, void 0, void 0, function () {
        var fullscreen, userTel, switchToUserinfo, autoLoginSwitch, autoLogin;
        var _this = this;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, storage.get('fullscreen')];
                case 1:
                    fullscreen = _a.sent();
                    if (fullscreen) {
                        switchOfFullScreen.className = 'on';
                        sendMessage({ fullscreen: true });
                    }
                    switchOfFullScreen.addEventListener('click', function () { return __awaiter(_this, void 0, void 0, function () {
                        var data;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!(switchOfFullScreen.className == 'on animation' || switchOfFullScreen.className == 'on')) return [3, 1];
                                    switchOfFullScreen.className = 'off animation';
                                    sendMessage({ fullscreen: false });
                                    storage.set({ fullscreen: false });
                                    return [3, 3];
                                case 1:
                                    switchOfFullScreen.className = 'on animation';
                                    console.log(0);
                                    sendMessage({ fullscreen: true });
                                    console.log(1111111);
                                    storage.set({ fullscreen: true });
                                    console.log(22222);
                                    return [4, storage.get('fullscreen')];
                                case 2:
                                    data = _a.sent();
                                    console.log(data);
                                    _a.label = 3;
                                case 3: return [2];
                            }
                        });
                    }); });
                    screenShotBtn.addEventListener('click', function () { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            sendMessage({ snapshot: true });
                            return [2];
                        });
                    }); });
                    backToMain.addEventListener('click', function () {
                        userInfoBox.className = 'back-to-main';
                    });
                    goToRight.addEventListener('click', function () {
                        userInfoBox.className = 'go-to-user';
                    });
                    saveUserinfoBtn.addEventListener('click', function () {
                        var tel = document.querySelector('#tel');
                        var passwd = document.querySelector('#password');
                        if (!tel.value || !passwd.value) {
                            return sendMessage({ alert: '手机号或者密码为空' });
                        }
                        var onlyRememberCheck = document.querySelector('#only-remember');
                        var autoLogin = true;
                        if (onlyRememberCheck.checked) {
                            autoLogin = false;
                        }
                        var passwordStr = window.btoa(passwd.value);
                        storage.set({ tel: tel.value, passwd: passwordStr, });
                        storage.set({ autoLogin: autoLogin });
                        return sendMessage({ alert: '保存成功, 下次重新登录时将生效' });
                    });
                    return [4, storage.get('tel')];
                case 2:
                    userTel = _a.sent();
                    switchToUserinfo = document.querySelector('switch-to-right');
                    autoLoginSwitch = document.querySelector('#auto-login-switch');
                    if (!(userTel != undefined || userTel != null)) return [3, 4];
                    autoLoginSwitch.style.display = 'block';
                    return [4, storage.get('autoLogin')];
                case 3:
                    autoLogin = _a.sent();
                    if (autoLogin === true)
                        autoLoginSwitch.className = 'on';
                    switchToUserinfo.style.display = 'none';
                    return [3, 5];
                case 4:
                    switchToUserinfo.style.display = 'block';
                    autoLoginSwitch.style.display = 'none';
                    autoLoginSwitch.className = 'off';
                    _a.label = 5;
                case 5:
                    autoLoginSwitch.addEventListener('click', function () { return __awaiter(_this, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            if (autoLoginSwitch.className == 'on animation' || autoLoginSwitch.className == 'on') {
                                autoLoginSwitch.className = 'off animation';
                                storage.set({ autoLogin: false });
                            }
                            else {
                                autoLoginSwitch.className = 'on animation';
                                storage.set({ autoLogin: true });
                            }
                            return [2];
                        });
                    }); });
                    return [2];
            }
        });
    });
})();
//# sourceMappingURL=popup.js.map