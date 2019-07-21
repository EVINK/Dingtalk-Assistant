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
var GeneralPageContent = (function () {
    function GeneralPageContent() {
        this.head = document.querySelector('head');
        this.alertWindowStyle = document.createElement('style');
        this.bubbleWin = document.createElement('div');
        this.alertWindowStyle.id = 'alertWindowStyle';
        this.head.appendChild(this.alertWindowStyle);
        this.bubbleWin.id = 'bubbleWin-EvinK';
        document.body.appendChild(this.bubbleWin);
        this.genAlertWindow();
        var self = this;
        chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (request.message.alert) {
                        GeneralPageContent.alert(request.message.alert);
                    }
                    else if (request.message.bubble) {
                        self.genBubbleMsg(request.message.bubble);
                    }
                    else if (request.message.snapshot) {
                        self.createSnapshot(request.message.snapshot);
                    }
                    sendResponse({
                        result: 'success'
                    });
                    return [2];
                });
            });
        });
        document.onkeydown = function (e) {
            var isCtrlPressed = false;
            var isAltPressed = false;
            if (e.ctrlKey)
                isCtrlPressed = true;
            if (e.altKey)
                isAltPressed = true;
            if (e.key === 'å' || e.key === 'a' || e.key === 'A' || e.key === 'Å') {
                if (isCtrlPressed && isAltPressed) {
                    chrome.runtime.sendMessage({ snapshot: true });
                }
            }
        };
    }
    GeneralPageContent.prototype.genAlertWindow = function () {
        this.alertWindowStyle.innerHTML += "\n            ::-webkit-scrollbar {\n                width: 5px;\n                height: 3px;\n            }\n        \n            ::-webkit-scrollbar-track-piece {\n                background-color: white;\n            }\n        \n            ::-webkit-scrollbar-thumb {\n                height: 50px;\n                background-color: #3173FD;\n                border-radius: 3px;\n            }\n        \n            /* js generateWindow */\n        \n            .win {\n                background: black;\n            }\n        \n            #back_win,\n            .back_win {\n                height: 100vh;\n                width: 100vw;\n                background: rgba(0, 0, 0, 0.8);\n                position: fixed;\n                top: 0;\n                z-index: " + GeneralPageContent.highestZIndex + ";\n                display: none;\n                text-align: center;\n            }\n        \n            #win,\n            .win {\n                height: 80%;\n                width: 70%;\n                background: white;\n                position: relative;\n                top: 50%;\n                display: inline-block;\n                text-align: center;\n            }\n        \n            #win {\n                top: 35%;\n                left: 50%;\n                width: 300px;\n                max-height: 200px;\n                border-radius: 5px;\n                transform: translate3D(-50%, -35%, 0);\n                display: flex;\n                flex-flow: column;\n                justify-content: space-between;\n            }\n        \n            #p_title_error {\n                margin: 0 auto;\n                color: #484545;\n                height: auto;\n                text-align: center;\n                border-bottom: 1px solid #cfcfcf;\n                width: 70%;\n                line-height: 35px;\n            }\n        \n            #p_tips {\n                display: block;\n                text-align: center;\n                color: black;\n                height: auto;\n                padding: 2px 40px;\n                line-height: 25px;\n                overflow-y: scroll;\n                overflow-x: hidden;\n            }\n        \n            #btn_div {\n                width: 100%;\n                display: flex;\n                flex-flow: row;\n                justify-content: center;\n                align-items: center;\n            }\n        \n            #win_confirm,\n            #win_cancel {\n                display: inline;\n                width: 50px;\n                height: 33px;\n                border-radius: 2px;\n                border: none;\n                margin: 0 10px 0 10px;\n                font-family: \u5FAE\u8F6F\u96C5\u9ED1;\n                cursor: pointer;\n            }\n        \n            #win_confirm {\n                color: white;\n                background: #279a50;\n                margin: 15px 0;\n                white-space: nowrap;\n            }\n        \n            #win_confirm:hover {\n                background: #218344;\n            }\n            \n            \n            @keyframes bubble-on {\n                0% {\n                    \n                }\n                7% {\n                   right: -10px;\n                }\n                92% {\n                   right: -10px;\n                }\n                100% {\n                   right: -100%; \n                }\n            }\n            \n            #bubbleWin-EvinK {\n                display: flex;\n                flex-flow: column;\n                justify-content: center;\n                align-items: center;\n            }\n            \n            .bubble-EvinK {\n                position: fixed;\n                top: 0;\n                right: -100%;\n                z-index: 2147483645;\n                width: 300px;\n                height: 60px;\n                background: #000000a6;\n                border-radius: 10px;\n                display: flex;\n                flex-flow: column;\n                justify-content: center;\n                text-align: left;\n                color: white;\n                padding: 0 20px;\n            }\n            \n            .bubble-EvinK.bubble-on {\n                animation: bubble-on " + GeneralPageContent.bubbleTime + "s;\n            }\n        ";
    };
    GeneralPageContent.alert = function (msg) {
        GeneralPageContent.generationPopWin(msg, function (confirmBtn, cancelBtn, win, back_win) {
            cancelBtn.style.display = 'none';
            confirmBtn.onclick = function () {
                back_win.style.display = 'none';
            };
        });
    };
    GeneralPageContent.generationPopWin = function (msg, callback) {
        var data = GeneralPageContent.generateErrorWindow("提示", msg);
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
    };
    GeneralPageContent.generateErrorWindow = function (titleStr, content) {
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
    };
    GeneralPageContent.prototype.genBubbleMsg = function (msg) {
        var bubble = document.createElement('div');
        bubble.classList.add('bubble-EvinK');
        var bubbleChild = document.createElement('p');
        bubble.appendChild(bubbleChild);
        this.bubbleWin.appendChild(bubble);
        setTimeout(function () {
            bubble.remove();
        }, GeneralPageContent.bubbleTime * 1000);
        var bubbleOnClass = 'bubble-on';
        var bubbleLength = this.bubbleWin.querySelectorAll("." + bubbleOnClass).length;
        bubble.style.top = bubbleLength * 65 + "px";
        bubbleChild.innerText = "\u901A\u77E5: " + msg;
        bubble.classList.add(bubbleOnClass);
    };
    GeneralPageContent.prototype.createSnapshot = function (imageData) {
        var img = new Image();
        img.src = imageData;
        img.onload = function () {
            var imgCanvas = document.createElement('canvas');
            imgCanvas.style.position = 'fixed';
            imgCanvas.style.top = '0';
            imgCanvas.style.left = '0';
            imgCanvas.style.zIndex = (GeneralPageContent.highestZIndex - 1).toString();
            imgCanvas.width = img.width;
            imgCanvas.height = img.height;
            var dpr = window.devicePixelRatio || 1;
            var ctx = imgCanvas.getContext('2d');
            ctx.drawImage(img, 0, 0, img.width * dpr, img.height * dpr);
            new Snapshot(imgCanvas);
        };
    };
    GeneralPageContent.highestZIndex = 2147483645;
    GeneralPageContent.bubbleTime = 5;
    return GeneralPageContent;
}());
var generaPageContent = new GeneralPageContent();
//# sourceMappingURL=generalPageContent.js.map