let dingTalkFullScreenStyle = document.createElement('style')
dingTalkFullScreenStyle.id = 'dingTalkFullScreenStyle'

head.appendChild(dingTalkFullScreenStyle)

function genFullscreenDingtalk() {
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

function genRawDingTalkStyle() {
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

// 登录持久化
const script = `
var loginStatusKeep = setInterval(function () {
    window.sessionStorage.setItem('EvinK', 'Handsome');
    window.sessionStorage.setItem('wk_device_id', '4c903cc83a1f42e6b6b4ae9bbf46b958');
    var wkToken = window.sessionStorage.getItem('wk_token');
    if (!wkToken) {
        return clearInterval(loginStatusKeep)
    }
    wkToken = JSON.parse(wkToken);
    if (wkToken.isAutoLogin) {
        return clearInterval(loginStatusKeep)
    }
    wkToken.isAutoLogin = true;
    console.log(JSON.stringify(wkToken));
    window.sessionStorage.setItem('wk_token', JSON.stringify(wkToken));
}, 1000)
`

const s = document.createElement('script')
s.innerHTML += script
document.body.appendChild(s)


async function initDingTalkStyle() {
    if (await storage.get('fullscreen')) {
        genFullscreenDingtalk()
    } else {
        genRawDingTalkStyle()
    }
}


/**
 * init content
 */
(async function init() {
    initDingTalkStyle()
    // event
    chrome.runtime.onMessage.addListener(
        function (request, sender, sendResponse) {

            if (request.message.fullscreen) {
                return genFullscreenDingtalk()
            } else if (request.message.fullscreen === false) {
                genRawDingTalkStyle()
            } else if (request.message.initDingTalkStyle) {
                initDingTalkStyle()
            }

            sendResponse({
                result: 'success'
            })
        })

    // 将ID发往background
    chrome.runtime.sendMessage({storeDtId: true})

})()
