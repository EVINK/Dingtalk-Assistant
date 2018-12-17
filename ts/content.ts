let alertWindowStyle = document.createElement('style')
alertWindowStyle.id = 'alertWindowStyle'

let dingTalkFullScreenStyle = document.createElement('style')
dingTalkFullScreenStyle.id = 'dingTalkFullScreenStyle'

let head = document.querySelector('head')
head.append(alertWindowStyle)
head.append(dingTalkFullScreenStyle)


function genFullscrrenDingtalk() {
    dingTalkFullScreenStyle.innerHTML = `
                            #layout-main {
                                width: 100%;
                                height: 100%;
                            }
                            #body {
                                height: 100%;
                            }
                            #layout-container {
                                display: block;
                            }
    `

}


function genRawDingtalkStyle() {
    dingTalkFullScreenStyle.innerHTML += `
                            #layout-main {
                                width: 1000px;
                            }
                            #body {
                                height: 542px;
                            }
                            #layout-container {
                                display: flex;
                            }
    `
}


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


// window.onload = () => {
// }


async function autoLogin() {
    // 拿到所有的btn
    let btns: any = document.querySelectorAll('button')
    for (let btn of btns) {
        if (btn.type == 'submit' &&
            btn.className == 'blue big ng-binding' &&
            btn.innerText == '登录') {

            let telInput: HTMLInputElement = null
            let pwdInput: HTMLInputElement = null

            // 拿到所有的input
            let inputs: any = document.querySelectorAll('input')
            for (let input of inputs) {
                if (input.type == 'text' &&
                    input.placeholder == '请输入手机号') {
                    telInput = input
                    continue
                }
                if (input.type == 'password' &&
                    input.name == 'verification' &&
                    input.placeholder == "请输入密码") {
                    pwdInput = input
                    continue
                }
            }

            if (!telInput || !pwdInput) {
                return console.error('telInput or pwdInput Not Found')
            }

            let telNum: string
            let passwd: string
            try {
                telNum = await storage.get('tel') as string
                passwd = await storage.get('passwd') as string
                passwd = window.atob(passwd)
            } catch (ex) {
                return console.log(ex)
            }
            telInput.value = telNum
            pwdInput.value = passwd

            let autoLoginScript = document.createElement('script')

            autoLoginScript.innerHTML = `
            const $scopePhone = angular.element(document.querySelector('phone-input>input')).scope()
            const $scopePwd = angular.element(document.querySelector('input.password')).scope()

            $scopePhone.$apply(() => {
                $scopePhone.phoneInput.telephone = $scopePhone.phone = document.querySelector('phone-input>input').value = ${telNum}
                $scopePhone.phoneInput.triggerChange()
            })

            $scopePwd.$apply(() => {
                $scopePwd.passwordLogin.telephone = ${telNum}
            })

            $scopePwd.$apply(() => {
                $scopePwd.passwordLogin.password = document.querySelector('input.password').value = '${passwd}'
                $scopePwd.passwordLogin.submitable = true
            })`

            let isAutoLogin = await storage.get('autoLogin')
            setTimeout(() => {
                document.body.append(autoLoginScript)
                if (isAutoLogin) {
                    btn.click()
                }
            }, 100)
        }
    }
}

/**
 * init content
 */
(async function init() {

    if (await storage.get('fullscreen')) {
        genFullscrrenDingtalk()
    } else {
        genRawDingtalkStyle()
    }

    genAlertWindow()

    // event
    chrome.runtime.onMessage.addListener(
        function (request, sender, sendResponse) {
            if (request.message.fullscreen === true)
                return genFullscrrenDingtalk()
            else if (request.message.fullscreen === false)
                genRawDingtalkStyle()

            else if (request.message.alert) {
                alert(request.message.alert)
            }

            sendResponse({
                result: "success"
            })
        })

    autoLogin()

})()