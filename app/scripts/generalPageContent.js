var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class GeneralPageContent {
    constructor() {
        this.head = document.querySelector('head');
        this.alertWindowStyle = document.createElement('style');
        this.bubbleWin = document.createElement('div');
        this.genGlobalNotiWins();
        const self = this;
        // event
        chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
            return __awaiter(this, void 0, void 0, function* () {
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
            });
        });
    }
    genGlobalNotiWins() {
        return __awaiter(this, void 0, void 0, function* () {
            this.alertWindowStyle.id = 'alertWindowStyle';
            this.head.appendChild(this.alertWindowStyle);
            this.bubbleWin.id = 'bubbleWin-EvinK';
            document.body.appendChild(this.bubbleWin);
            this.settings = (yield StorageArea.get('settings'));
            if (!this.settings) {
                this.settings = {
                    banGlobalStyle: true,
                    banSnapshotShortcut: true,
                    snapshotShortcut: null,
                    msgClickedAction: 'focus',
                };
            }
            if (!this.settings.banGlobalStyle) {
                this.alertWindowStyle.innerHTML += `
            ::-webkit-scrollbar {
                width: 5px;
                height: 3px;
            }

            ::-webkit-scrollbar-track-piece {
                background-color: white;
            }

            ::-webkit-scrollbar-thumb {
                height: 50px;
                background-color: #3173FD;
                border-radius: 3px;
            }
            `;
            }
            this.alertWindowStyle.innerHTML += `
            /* js generateWindow */

            .win {
                background: black;
            }

            #back_win,
            .back_win {
                height: 100vh;
                width: 100vw;
                background: rgba(0, 0, 0, 0.8);
                position: fixed;
                top: 0;
                z-index: ${GeneralPageContent.highestZIndex};
                display: none;
                text-align: center;
            }

            #win,
            .win {
                height: 80%;
                width: 70%;
                background: white;
                position: relative;
                top: 50%;
                display: inline-block;
                text-align: center;
            }

            #win {
                top: 35%;
                left: 50%;
                width: 300px;
                max-height: 200px;
                border-radius: 5px;
                transform: translate3D(-50%, -35%, 0);
                display: flex;
                flex-flow: column;
                justify-content: space-between;
            }

            #p_title_error {
                margin: 0 auto;
                color: #484545;
                height: auto;
                text-align: center;
                border-bottom: 1px solid #cfcfcf;
                width: 70%;
                line-height: 35px;
            }

            #p_tips {
                display: block;
                text-align: center;
                color: black;
                height: auto;
                padding: 2px 40px;
                line-height: 25px;
                overflow-y: scroll;
                overflow-x: hidden;
            }

            #btn_div {
                width: 100%;
                display: flex;
                flex-flow: row;
                justify-content: center;
                align-items: center;
            }

            #win_confirm,
            #win_cancel {
                display: inline;
                width: 50px;
                height: 33px;
                border-radius: 2px;
                border: none;
                margin: 0 10px 0 10px;
                font-family: 微软雅黑;
                cursor: pointer;
            }

            #win_confirm {
                color: white;
                background: #279a50;
                margin: 15px 0;
                white-space: nowrap;
            }

            #win_confirm:hover {
                background: #218344;
            }


            @keyframes bubble-on {
                0% {

                }
                7% {
                   right: -10px;
                }
                92% {
                   right: -10px;
                }
                100% {
                   right: -100%;
                }
            }

            #bubbleWin-EvinK {
                display: flex;
                flex-flow: column;
                justify-content: center;
                align-items: center;
            }

            .bubble-EvinK {
                position: fixed;
                top: 0;
                right: -100%;
                z-index: 2147483645;
                width: 300px;
                height: 60px;
                background: #000000a6;
                border-radius: 10px;
                display: flex;
                flex-flow: column;
                justify-content: center;
                text-align: left;
                color: white;
                padding: 0 20px;
            }

            .bubble-EvinK.bubble-on {
                animation: bubble-on ${GeneralPageContent.bubbleTime}s;
            }
        `;
            function handleCustomShortcuts(shortcuts, e) {
                if (!shortcuts)
                    return;
                if (shortcuts && !shortcuts.length)
                    return;
                const idx = shortcuts.indexOf(e.key);
                if (idx >= 0)
                    shortcuts.splice(idx, 1);
                else
                    return;
                return handleCustomShortcuts(shortcuts, e);
            }
            // shortcut of snapshot
            if (!this.settings.banSnapshotShortcut) {
                // deep clone
                let shortcuts = JSON.parse(JSON.stringify(this.settings.snapshotShortcut));
                document.onkeydown = (e) => {
                    if (!shortcuts) {
                        let isCtrlPressed = false;
                        let isAltPressed = false;
                        if (e.ctrlKey)
                            isCtrlPressed = true;
                        if (e.altKey)
                            isAltPressed = true;
                        if (e.key === 'å' || e.key === 'a' || e.key === 'A' || e.key === 'Å') {
                            // 兼容mac
                            if (isCtrlPressed && isAltPressed) {
                                chrome.runtime.sendMessage({ snapshot: true });
                            }
                        }
                    }
                    else {
                        setTimeout(() => shortcuts = JSON.parse(JSON.stringify(this.settings.snapshotShortcut)), 500);
                        handleCustomShortcuts(shortcuts, e);
                        if (shortcuts.length == 0) {
                            chrome.runtime.sendMessage({ snapshot: true });
                            shortcuts = JSON.parse(JSON.stringify(this.settings.snapshotShortcut));
                        }
                    }
                };
            }
        });
    }
    static alert(msg) {
        GeneralPageContent.generationPopWin(msg, function (confirmBtn, cancelBtn, win, back_win) {
            cancelBtn.style.display = 'none';
            confirmBtn.onclick = () => {
                back_win.style.display = 'none';
            };
        });
    }
    static generationPopWin(msg, callback) {
        let data = GeneralPageContent.generateErrorWindow("提示", msg);
        let win = data[0];
        let back_win = data[1];
        let hasWin = data[2];
        if (hasWin) {
            let confirm = document.querySelector('#win_confirm');
            confirm.style.display = 'block';
            return back_win.style.display = 'block';
        }
        let btn_div = document.createElement("div");
        let confirm = document.createElement("button");
        let cancel = document.createElement("button");
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
    static generateErrorWindow(titleStr, content) {
        let back_win = document.getElementById("back_win");
        let win;
        let hasWin;
        if (back_win) {
            let tips = document.getElementById("p_tips");
            let title = document.getElementById("p_title_error");
            title.innerHTML = titleStr;
            tips.innerHTML = content;
            hasWin = true;
        }
        else {
            back_win = document.createElement("div");
            win = document.createElement("div");
            let title = document.createElement("p");
            let tips = document.createElement("p");
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
                let winRect = document.querySelector('#win').getBoundingClientRect();
                let targetLeft = winRect.left;
                let targetRight = winRect.right;
                let targetTop = winRect.top;
                let targetBottom = winRect.bottom;
                if (!(targetLeft < e.clientX && e.clientX < targetRight) ||
                    !(targetTop < e.clientY && e.clientY < targetBottom)) {
                    e.target.style.display = 'none';
                }
            };
            hasWin = false;
        }
        return [win, back_win, hasWin];
    }
    genBubbleMsg(msg) {
        // const closeBtn = new Image()
        // closeBtn.src = chrome.extension.getURL('assets/imgs/close.svg')
        // this.bubbleWin.appendChild(closeBtn)
        const bubble = document.createElement('div');
        bubble.classList.add('bubble-EvinK');
        const bubbleChild = document.createElement('p');
        bubble.appendChild(bubbleChild);
        this.bubbleWin.appendChild(bubble);
        setTimeout(() => {
            bubble.remove();
        }, GeneralPageContent.bubbleTime * 1000);
        const bubbleOnClass = 'bubble-on';
        const bubbleLength = this.bubbleWin.querySelectorAll(`.${bubbleOnClass}`).length;
        bubble.style.top = `${bubbleLength * 65}px`;
        bubbleChild.innerText = `通知: ${msg}`;
        bubble.classList.add(bubbleOnClass);
    }
    createSnapshot(imageData) {
        const img = new Image();
        img.src = imageData;
        img.onload = () => {
            const imgCanvas = document.createElement('canvas');
            imgCanvas.width = img.width;
            imgCanvas.height = img.height;
            imgCanvas.style.position = 'fixed';
            imgCanvas.style.top = '0';
            imgCanvas.style.left = '0';
            imgCanvas.style.zIndex = (GeneralPageContent.highestZIndex - 1).toString();
            imgCanvas.style.width = `${window.innerWidth}px`;
            imgCanvas.style.height = '100vh';
            const ctx = imgCanvas.getContext('2d');
            ctx.drawImage(img, 0, 0, img.width, img.height);
            new Snapshot(imgCanvas);
        };
    }
}
GeneralPageContent.highestZIndex = 2147483645;
GeneralPageContent.bubbleTime = 5;
const generaPageContent = new GeneralPageContent();
