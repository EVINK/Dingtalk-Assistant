// 切换全屏开关
let switchOfFullScreen = document.querySelector('#dingtalk-full-screen')
// 截图按钮
let screenShotBtn = document.querySelector('screen-shot')
// 用户信息盒子
let userInfoBox = document.querySelector('user-info-box')
// 前往用户信息盒子的按钮
let goToRight = document.querySelector('switch-to-right')
// 保存用户信息的按钮
let saveUserinfoBtn = document.querySelector('#user-info-save-btn')
// 返回主页按钮
let backToMain = document.querySelector('back-to-main');

(async function event() {
    let fullscreen = await storage.get('fullscreen')
    if (fullscreen) {
        switchOfFullScreen.className = 'on'
        sendMessage({fullscreen: true})
    }

    switchOfFullScreen.addEventListener('click', async () => {
        if (switchOfFullScreen.className == 'on animation' || switchOfFullScreen.className == 'on') {
            switchOfFullScreen.className = 'off animation'
            sendMessage({fullscreen: false})
            storage.set({fullscreen: false})
        } else {
            switchOfFullScreen.className = 'on animation'
            console.log(0)
            sendMessage({fullscreen: true})
            console.log(1111111)
            storage.set({fullscreen: true})
            console.log(22222)
            const data = await storage.get('fullscreen')
            console.log(data)
        }
    })

    screenShotBtn.addEventListener('click', async () => {
        // console.log('about to send msg')
        // return sendMessage({ alert: '功能即将完成' })

        // console.log(chrome.runtime.id)
        // console.log(chrome.tabs)

        // chrome.tabs.({}, (stream)=>{
        //     console.log(stream)
        // })

        // 截图 (当前网页)
        // chrome.tabs.captureVisibleTab(null, {}, function (image) {
        //     console.log(image);
        // });

        // 录屏
        // const thisPage = await getCurrentPage()
        // chrome.desktopCapture.chooseDesktopMedia(['screen', 'window', 'tab'], thisPage, (streamId) => {
        //     console.log(streamId)
        // })

        sendMessage({snapshot: true})

        return
    })

    backToMain.addEventListener('click', () => {
        userInfoBox.className = 'back-to-main'
    })

    goToRight.addEventListener('click', () => {
        userInfoBox.className = 'go-to-user'
    })

    saveUserinfoBtn.addEventListener('click', () => {
        let tel: HTMLInputElement = document.querySelector('#tel')
        let passwd: HTMLInputElement = document.querySelector('#password')
        if (!tel.value || !passwd.value) {
            return sendMessage({alert: '手机号或者密码为空'})
        }
        let onlyRememberCheck: HTMLInputElement = document.querySelector('#only-remember')
        let autoLogin = true
        if (onlyRememberCheck.checked) {
            autoLogin = false
        }

        let passwordStr = window.btoa(passwd.value)
        storage.set({tel: tel.value, passwd: passwordStr,})
        storage.set({autoLogin})
        return sendMessage({alert: '保存成功, 下次重新登录时将生效'})
    })

    let userTel = await storage.get('tel')

    let switchToUserinfo: HTMLElement = document.querySelector('switch-to-right')
    let autoLoginSwitch: HTMLElement = document.querySelector('#auto-login-switch')

    if (userTel != undefined || userTel != null) {
        autoLoginSwitch.style.display = 'block'
        let autoLogin = await storage.get('autoLogin')
        if (autoLogin === true) autoLoginSwitch.className = 'on'
        switchToUserinfo.style.display = 'none'
    } else {
        switchToUserinfo.style.display = 'block'
        autoLoginSwitch.style.display = 'none'
        autoLoginSwitch.className = 'off'
    }

    autoLoginSwitch.addEventListener('click', async () => {
        if (autoLoginSwitch.className == 'on animation' || autoLoginSwitch.className == 'on') {
            autoLoginSwitch.className = 'off animation'
            storage.set({autoLogin: false})
        } else {
            autoLoginSwitch.className = 'on animation'
            storage.set({autoLogin: true})
        }
    })

})()
