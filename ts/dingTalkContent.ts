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

            if (request.message.fullscreen)
                return genFullscreenDingtalk()
            else if (request.message.fullscreen === false)
                genRawDingTalkStyle()
            else if (request.message.initDingTalkStyle) {
                initDingTalkStyle()
            }

            sendResponse({
                result: "success"
            })
        })

    // 将ID发往background
    chrome.runtime.sendMessage({storeDtId: true})

})()
