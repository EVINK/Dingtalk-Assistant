class GeneralPageContent {

    private static highestZIndex: number = 2147483645
    private static bubbleTime: number = 5

    public head: HTMLHeadElement = document.querySelector('head') as HTMLHeadElement
    private alertWindowStyle = document.createElement('style') as HTMLStyleElement
    private bubbleWin = document.createElement('div') as HTMLDivElement


    constructor() {
        this.alertWindowStyle.id = 'alertWindowStyle'
        this.head.appendChild(this.alertWindowStyle)
        this.bubbleWin.id = 'bubbleWin-EvinK'
        document.body.appendChild(this.bubbleWin)
        this.genAlertWindow()

        const self = this
        // event
        chrome.runtime.onMessage.addListener(
            async function (request, sender, sendResponse) {
                if (request.message.alert) {
                    GeneralPageContent.alert(request.message.alert)
                } else if (request.message.bubble) {
                    self.genBubbleMsg(request.message.bubble as string)
                } else if (request.message.snapshot) {
                    self.createSnapshot(request.message.snapshot)
                }

                sendResponse({
                    result: 'success'
                })
            })
        // shortcut of snapshot
        document.onkeydown = (e) => {
            let isCtrlPressed = false
            let isAltPressed = false
            if (e.ctrlKey) isCtrlPressed = true
            if (e.altKey) isAltPressed = true
            if (e.key === 'å' || e.key === 'a' || e.key === 'A' || e.key === 'Å') {
                // 兼容mac
                if (isCtrlPressed && isAltPressed) {
                    chrome.runtime.sendMessage({snapshot: true})
                }
            }
        }
    }

    private genAlertWindow() {
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
        `
    }


    public static alert(msg: string) {
        GeneralPageContent.generationPopWin(msg, function (
            confirmBtn: HTMLButtonElement,
            cancelBtn: HTMLButtonElement,
            win: HTMLDivElement,
            back_win: HTMLDivElement) {
            cancelBtn.style.display = 'none'
            confirmBtn.onclick = () => {
                back_win.style.display = 'none'
            }

        })
    }


    private static generationPopWin(msg: string, callback?: (
        confirmBtn: HTMLButtonElement,
        cancelBtn: HTMLButtonElement,
        win: HTMLDivElement,
        back_win: HTMLDivElement
    ) => void) {
        let data = GeneralPageContent.generateErrorWindow("提示", msg)
        let win: HTMLDivElement = data[0] as HTMLDivElement
        let back_win = data[1] as HTMLDivElement
        let hasWin = data[2] as boolean
        if (hasWin) {
            let confirm: HTMLButtonElement = document.querySelector('#win_confirm')
            confirm.style.display = 'block'
            return back_win.style.display = 'block'
        }
        let btn_div = document.createElement("div")
        let confirm = document.createElement("button")
        let cancel = document.createElement("button")
        btn_div.id = "btn_div"
        confirm.id = "win_confirm"
        confirm.innerText = "确定"
        cancel.id = "win_cancel"
        cancel.innerText = "取消"
        btn_div.appendChild(confirm)
        btn_div.appendChild(cancel)
        win.appendChild(btn_div)
        if (callback)
            callback(confirm, cancel, win, back_win)
    }


    private static generateErrorWindow(titleStr: string, content: string) {
        let back_win: HTMLDivElement = document.getElementById("back_win") as HTMLDivElement
        let win: HTMLDivElement
        let hasWin: boolean
        if (back_win) {
            let tips = document.getElementById("p_tips")
            let title: any = document.getElementById("p_title_error") as HTMLParagraphElement
            title.innerHTML = titleStr
            tips.innerHTML = content
            hasWin = true
        } else {
            back_win = document.createElement("div")
            win = document.createElement("div")
            let title: any = document.createElement("p")
            let tips = document.createElement("p")
            back_win.id = "back_win"
            back_win.className = "back_win"
            win.id = "win"
            win.className = "win"
            title.id = "p_title_error"
            tips.id = "p_tips"
            document.body.appendChild(back_win)
            back_win.appendChild(win)
            title.innerHTML = titleStr
            tips.innerHTML = content
            win.appendChild(title)
            win.appendChild(tips)
            back_win.style.display = 'block'
            back_win.onclick = function (e: any) {

                let winRect: any = document.querySelector('#win').getBoundingClientRect()
                let targetLeft = winRect.left
                let targetRight = winRect.right
                let targetTop = winRect.top
                let targetBottom = winRect.bottom

                if (!(targetLeft < e.clientX && e.clientX < targetRight) ||
                    !(targetTop < e.clientY && e.clientY < targetBottom)
                ) {
                    e.target.style.display = 'none'
                }
            }

            hasWin = false
        }
        return [win as HTMLDivElement, back_win, hasWin]
    }


    public genBubbleMsg(msg: string) {
        const closeBtn = new Image()
        closeBtn.src = chrome.extension.getURL('assets/imgs/close.svg')
        this.bubbleWin.appendChild(closeBtn)

        const bubble = document.createElement('div') as HTMLDivElement
        bubble.classList.add('bubble-EvinK')
        const bubbleChild = document.createElement('p') as HTMLParagraphElement
        bubble.appendChild(bubbleChild)
        this.bubbleWin.appendChild(bubble)

        // setTimeout(() => {
        //     bubble.remove()
        // }, GeneralPageContent.bubbleTime * 1000)
        const bubbleOnClass = 'bubble-on'
        const bubbleLength = this.bubbleWin.querySelectorAll(`.${bubbleOnClass}`).length
        bubble.style.top = `${bubbleLength * 65}px`
        bubbleChild.innerText = `通知: ${msg}`
        bubble.classList.add(bubbleOnClass)
    }

    private createSnapshot(imageData: string) {
        const img = new Image()
        img.src = imageData
        img.onload = () => {
            const imgCanvas = document.createElement('canvas') as HTMLCanvasElement

            imgCanvas.width = img.width
            imgCanvas.height = img.height
            imgCanvas.style.position = 'fixed'
            imgCanvas.style.top = '0'
            imgCanvas.style.left = '0'
            imgCanvas.style.zIndex = (GeneralPageContent.highestZIndex - 1).toString()
            imgCanvas.style.width = `${window.innerWidth}px`
            imgCanvas.style.height = '100vh'

            const ctx = imgCanvas.getContext('2d')
            ctx.drawImage(img, 0, 0, img.width, img.height)


            new Snapshot(imgCanvas)
        }


    }

}

const generaPageContent = new GeneralPageContent()
