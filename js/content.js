let alertWindow = document.createElement('style')
alertWindow.innerHTML += `
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
    z-index: 999;
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
let head = document.querySelector('head')
head.append(alertWindow)


function fullscrrenDingtalk() {
    let styleEle = document.createElement('style')
    styleEle.innerHTML += `
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
    head.append(styleEle)
}

function rawDingtalk() {
    let styleEle = document.createElement('style')
    styleEle.innerHTML += `
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
    head.append(styleEle)
}


chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.message == "on") {
            fullscrrenDingtalk()
        } else if (request.message == "off") {
            rawDingtalk()
        } else if (request.message.indexOf("alert") > -1) {
            alert(request.message.substring(request.message.indexOf("alert:") + 6))
        }
        sendResponse({
            result: "success"
        })
    });



function alert(tips) {
    generationPopWin(tips, function (cf, cancel, win, back_win) {
        $(cancel).hide();
        $(cf).click(function () {
            $(back_win).hide();
        });
    });
}

function generationPopWin(tips, callback) {
    if (callback === void 0) {
        callback = null;
    }
    var _a = generateErrorWindow("提示", tips),
        win = _a[0],
        back_win = _a[1],
        hasWin = _a[2];
    if (hasWin) {
        $(back_win).show();
        return;
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
    if (callback) {
        callback(confirm, cancel, win, back_win);
    }
}

function generateErrorWindow(p_title_error, p_tips) {
    var back_win = document.getElementById("back_win");
    var win, hasWin;
    if (back_win) {
        var tips = document.getElementById("p_tips");
        var title = document.getElementById("p_title_error");
        title.innerHTML = p_title_error;
        tips.innerHTML = p_tips;
        var win_1 = document.getElementById("win");
        hasWin = true;
    } else {
        var body = document.getElementById("body");
        if (!body)
            body = document.getElementsByTagName("body")[0];
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
        body.appendChild(back_win);
        back_win.appendChild(win);
        title.innerHTML = p_title_error;
        tips.innerHTML = p_tips;
        win.appendChild(title);
        win.appendChild(tips);
        $(back_win).show();
        $("#back_win").click(function (e) {
            if ($(e.target).closest("#win").length == 0) {
                $(this).hide();
            }
        });
        hasWin = false;
    }
    return [win, back_win, hasWin];
}

function generateBigWindow(p_title_error, url) {
    var body = document.getElementById("body");
    var back_win = document.createElement("div");
    var win = document.createElement("div");
    var iframe = document.createElement("iframe");
    var title = document.createElement("p");
    var closeWinBtn = document.createElement("div");
    back_win.id = "back_BigWin";
    back_win.className = "back_win";
    win.id = "BigWin";
    win.className = "win";
    title.id = "p_title_BigWin";
    closeWinBtn.id = "BigWin_close";
    closeWinBtn.className = "win_close_btn";
    iframe.id = "big_iframe";
    iframe.className = "big_iframe";
    iframe.src = url;
    iframe.scrolling = "Yes";
    win.appendChild(closeWinBtn);
    win.appendChild(title);
    win.appendChild(iframe);
    back_win.appendChild(win);
    body.appendChild(back_win);
    title.innerHTML = p_title_error;
    startDrag(win);
    return win;
}

window.a = null

window.onload = () => {
    // 拿到所有的btn
    let btns = document.querySelectorAll('button')
    for (let btn of btns) {
        if (btn.type == 'submit' &&
            btn.className == 'blue big ng-binding' &&
            btn.innerText == '登录') {
            // btn.removeAttribute('disabled');
            window.a = btn

            let telInput = null
            let pwdInput = null


            // 拿到所有的input
            let inputs = document.querySelectorAll('input')
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
                    console.log(pwdInput);
                    // let e = new Event("keydown");
                    // e.key = "a";    // just enter the char you want to send
                    // e.keyCode = e.key.charCodeAt(0);
                    // e.keyCode = 65;
                    // e.which = e.keyCode;
                    // e.altKey = false;
                    // e.ctrlKey = false;
                    // e.shiftKey = false;
                    // e.metaKey = false;
                    // // e.bubbles = true;
                    // pwdInput.dispatchEvent(e);
                    // pwdInput.value = "a"

                    continue
                }
            }



            if (!telInput || !pwdInput) {
                return null
            }

            setTimeout(() => {
                console.log(window.angular);
            }, 100)

            chrome.storage.local.get(null, (result) => {
                if (!result.tel)
                    return null
                telInput.value = result.tel

                if (!result.passwd)
                    return null
                pwdInput.value = result.passwd
                // $(btn).trigger("click");
                console.log(btn);
                let script = document.createElement('script')
                script.innerHTML = ` const $scopePhone = angular.element(document.querySelector('phone-input>input')).scope()
                const $scopePwd = angular.element(document.querySelector('input.password')).scope()
                $scopePhone.$apply(() => {
                    $scopePhone.phoneInput.telephone = $scopePhone.phone = document.querySelector('phone-input>input').value = ${result.tel}
                    $scopePhone.phoneInput.triggerChange()
                })
                $scopePwd.$apply(() => {
                    $scopePwd.passwordLogin.telephone = ${result.tel}
                })

                $scopePwd.$apply(() => {
                    $scopePwd.passwordLogin.password = document.querySelector('input.password').value = '${result.passwd}'
                    $scopePwd.passwordLogin.submitable = true
                })`

                setTimeout(() => {
                    document.body.append(script)
                }, 100)

                // let e = new Event("keydown");
                // // e.key = "a";    // just enter the char you want to send
                // // e.keyCode = e.key.charCodeAt(0);
                // e.keyCode = 8;
                // e.which = e.keyCode;
                // e.altKey = false;
                // e.ctrlKey = false;
                // e.shiftKey = false;
                // e.metaKey = false;
                // // e.bubbles = true;
                // pwdInput.dispatchEvent(e);
                // $(pwdInput).focus()
                // var e = jQuery.Event("keydown");
                // e.which = 65; // # Some key code value
                // $(pwdInput).trigger(e);


                // $(pwdInput).trigger("click");
                setTimeout(() => {
                    $(btn).click()
                }, 100)
            })
        }
    }
}