let switchOfFullScreen = document.querySelector('#dingtalk-full-screen')

chrome.storage.local.get(null, (result) => {
    if (result.fullscreen === 'on') {
        switchOfFullScreen.className = 'on'
        sendMsgToContent('on')
    }
})

switchOfFullScreen.addEventListener('click', () => {
    if (switchOfFullScreen.className == 'on animation' || switchOfFullScreen.className == 'on') {
        switchOfFullScreen.className = 'off animation'
        sendMsgToContent('off')
        chrome.storage.local.set({ fullscreen: 'off' })
    } else {
        switchOfFullScreen.className = 'on animation'
        sendMsgToContent('on')
        chrome.storage.local.set({ fullscreen: 'on' })
    }
})

let screenShotBtn = document.querySelector('screen-shot')
screenShotBtn.addEventListener('click', () => {
    // alert('功能即将完成')
    return sendMsgToContent('alert:功能即将完成')
})

function sendMsgToContent(msg, callback) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { message: msg }, callback);
    });
}

let userInfoBox = document.querySelector('user-info-box')
let backToMain = document.querySelector('back-to-main')
backToMain.addEventListener('click', () => {
    userInfoBox.className = 'back-to-main'
})

let goToRight = document.querySelector('switch-to-right')
goToRight.addEventListener('click', () => {
    userInfoBox.className = 'go-to-user'
})

let saveUserinfoBtn = document.querySelector('#user-info-save-btn')
saveUserinfoBtn.addEventListener('click', () => {
    let tel = document.querySelector('#tel')
    let passwd = document.querySelector('#password')
    if (!tel.value || !passwd.value) {
        return sendMsgToContent('alert:手机号或者密码为空')
    }
    let check = document.querySelector('#user-info-save-check')
    if (!check.checked) {
        return sendMsgToContent('alert:请同意用户悉知')
    }
    chrome.storage.local.set({
        tel: tel.value,
        passwd: passwd.value,
    })
    return sendMsgToContent('alert:保存成功')
})
