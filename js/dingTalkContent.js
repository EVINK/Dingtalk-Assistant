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
var dingTalkFullScreenStyle = document.createElement('style');
dingTalkFullScreenStyle.id = 'dingTalkFullScreenStyle';
head.appendChild(dingTalkFullScreenStyle);
function genFullscreenDingtalk() {
    dingTalkFullScreenStyle.innerHTML = "\n                            #layout-main {\n                                width: 100%;\n                                height: 100%;\n                            }\n                            #body {\n                                height: 100%;\n                            }\n                            #layout-container {\n                                display: block;\n                            }\n    ";
}
function genRawDingTalkStyle() {
    dingTalkFullScreenStyle.innerHTML += "\n                            #layout-main {\n                                width: 1000px;\n                            }\n                            #body {\n                                height: 542px;\n                            }\n                            #layout-container {\n                                display: flex;\n                            }\n    ";
}
function initDingTalkStyle() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4, storage.get('fullscreen')];
                case 1:
                    if (_a.sent()) {
                        genFullscreenDingtalk();
                    }
                    else {
                        genRawDingTalkStyle();
                    }
                    return [2];
            }
        });
    });
}
var canvas = document.createElement('canvas');
var context = canvas.getContext('2d');
var image = new Image();
image.setAttribute("crossOrigin", 'Anonymous');
function dom2svg() {
    var dom = document.body;
    dom = dom.cloneNode(true);
    var im = Array.from(document.querySelectorAll('script'));
    function removeScript(im) {
        if (!im)
            return;
        im.innerHTML = '';
        im.shift();
        return removeScript(im);
    }
    removeScript(im);
    var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    svg.style.width = '100vw';
    svg.style.height = '100vh';
    svg.style.position = 'fixed';
    svg.style.top = '0';
    svg.style.left = '0';
    svg.style.zIndex = '9999999999';
    svg.innerHTML += "<foreignObject width=\"100%\" height=\"100%\"> " + dom.outerHTML + "</foreignObject>";
    var xml = new XMLSerializer().serializeToString(svg);
    var svg64 = btoa(unescape(encodeURIComponent(xml)));
    var b64Start = 'data:image/svg+xml;base64,';
    image.src = b64Start + svg64;
    image.onload = function () {
        context.clearRect(0, 0, image.width, image.height);
        context.drawImage(image, 0, 0);
    };
    svg = image;
    svg.style.width = '100vw';
    svg.style.height = '100vh';
    svg.style.position = 'fixed';
    svg.style.top = '0';
    svg.style.left = '0';
    svg.style.zIndex = '9999999999';
    document.body.appendChild(image);
    document.body.appendChild(canvas);
}
(function init() {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            initDingTalkStyle();
            chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
                dom2svg();
                if (request.message.fullscreen === true)
                    return genFullscreenDingtalk();
                else if (request.message.fullscreen === false)
                    genRawDingTalkStyle();
                else if (request.message.initDingTalkStyle) {
                    initDingTalkStyle();
                }
                sendResponse({
                    result: "success"
                });
            });
            chrome.runtime.sendMessage({ storeDtId: true });
            return [2];
        });
    });
})();
//# sourceMappingURL=dingTalkContent.js.map