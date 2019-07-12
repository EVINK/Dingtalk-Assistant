function genAlertWindow() {
    alertWindowStyle.innerHTML += `
    /* js generateWindow */

    .win {
        background: black;
    }

    #back_win,
    .back_win {
        height: 100vh;
        width: 100vw;
        background: rgba(0, 0, 0, 0.8);
        /* opacity会使子元素透明  */
        position: fixed;
        top: 0;
        z-index: 9999;
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
        height: auto;
        width: 300px;
        border-radius: 5px;
        transform: translate3D(0, -35%, 0);
    }

    #p_title_error {
        margin: 0 auto;
        color: #ae0000;
        height: auto;
        font-size: 1.5em;
        text-align: center;
        padding: 5px 0 5px 0;
        border-bottom: 1px solid #cfcfcf;
        width: 70%;
        line-height: 50px;
    }

    #p_tips {
        display: block;
        text-align: center;
        color: black;
        height: auto;
        padding: 0 0 50px 0;
        margin: 55px 15px;
    }

    #btn_div {
        height: auto;
        display: block;
        position: absolute;
        bottom: 10px;
        left: 50%;
        transform: translate3D(-50%, 0, 0);
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
    }

    #win_confirm:hover {
        background: #218344;
    }
    `
}


function alert(msg: string) {
    generationPopWin(msg, function (
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


function generationPopWin(msg: string, callback?: (
    confirmBtn: HTMLButtonElement,
    cancelBtn: HTMLButtonElement,
    win: HTMLDivElement,
    back_win: HTMLDivElement
) => void) {
    let data = generateErrorWindow("提示", msg)
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


function generateErrorWindow(titleStr: string, content: string) {
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

let head: HTMLHeadElement = document.querySelector('head')
let alertWindowStyle = document.createElement('style')
alertWindowStyle.id = 'alertWindowStyle'
head.appendChild(alertWindowStyle)
console.log('init genral script');

/**
 * init content
 */
(async function init() {
    genAlertWindow()
    // event
    chrome.runtime.onMessage.addListener(
        function (request, sender, sendResponse) {
            console.log('on message on other page')
            console.log(request.message)
            if (request.message.alert) {
                alert(request.message.alert)
            }

            sendResponse({
                result: "success"
            })
        })

})()
