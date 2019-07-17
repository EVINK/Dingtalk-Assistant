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
var _this = this;
chrome.tabs.onActivated.addListener(function (activeInfo) { return __awaiter(_this, void 0, void 0, function () {
    var dtId;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4, storage.get('dtId')];
            case 1:
                dtId = _a.sent();
                if (dtId === activeInfo.tabId) {
                    sendMessage({ initDingTalkStyle: true });
                }
                return [2];
        }
    });
}); });
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.storeDtId) {
        storage.set({ dtId: sender.tab.id });
    }
    sendResponse({
        result: 'success'
    });
});
function setCookiesToDingTalk(_a, callback) {
    var key = _a.key, value = _a.value, secure = _a.secure, url = _a.url;
    if (!secure)
        secure = false;
    if (!url)
        url = 'https://dingtalk.com';
    var domain = url.slice('http://'.length);
    console.log('cookie url', url);
    console.log('cookie domain', domain);
    chrome.cookies.set({
        url: url,
        name: key,
        value: value,
        path: '/',
        expirationDate: 1594913650,
        secure: secure,
        httpOnly: true,
    }, function (cookies) {
        callback(cookies);
    });
}
setCookiesToDingTalk({ key: 'EvinK', value: 'Handsome' }, function (cookies) { return console.log(cookies); });
setCookiesToDingTalk({
    key: 'deviceid',
    value: '2E1E13B4-B957-4B78-90A6-B443F5B02B3A'
}, function (cookies) { return console.log(cookies); });
setCookiesToDingTalk({ key: 'deviceid_exist', value: 'true' }, function (cookies) { return console.log(cookies); });
chrome.cookies.get({ name: "dt_s", storeId: "", url: 'https://dingtalk.com' }, function (cookie) {
    console.log('get dt_s', cookie);
});
setCookiesToDingTalk({
    key: 'dt_s',
    value: 'u-16228582-6c00aed625-b0b70b5-253bc3-1c10abaf-387532f4-d22c-4a85-ad0b-7c9964b7c5c5',
    secure: false,
}, function (cookies) { return console.log(cookies); });
chrome.cookies.get({ name: "umdata_", storeId: "", url: 'https://ynuf.aliapp.org' }, function (cookie) {
    console.log(cookie);
    chrome.cookies.set({
        url: 'https://*.aliapp.org',
        name: 'umdata_',
        value: 'G3A6C79FE88E6A236E7827C42A11201EAE57AAC',
        path: '/',
        expirationDate: 1594913650,
    }, function (cookies) {
        console.log(cookies);
    });
});
chrome.cookies.onChanged.addListener(function (changeInfo) {
    if (changeInfo.cookie.domain == 'dingtalk.com') {
        console.log('cookies changes', changeInfo.cause);
        console.log(changeInfo);
    }
});
//# sourceMappingURL=background.js.map