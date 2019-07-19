class DingTalkContent {
    private dingTalkFullScreenStyle = document.createElement('style')

    constructor() {
        this.dingTalkFullScreenStyle.id = 'dingTalkFullScreenStyle'
        generaPageContent.head.appendChild(this.dingTalkFullScreenStyle)
        this.init()
    }

    private async init() {
        this.initDingTalkStyle()
        DingTalkContent.checkLSPStatus()

        const self = this
        // event
        chrome.runtime.onMessage.addListener(
            function (request, sender, sendResponse) {
                if (request.message.fullScreen) {
                    self.genFullScreenDingTalk()
                } else if (request.message.fullScreen === false) {
                    self.genRawDingTalkStyle()
                } else if (request.message.initDingTalkStyle) {
                    self.initDingTalkStyle()
                } else if (request.message.checkLSPStatus) {
                    DingTalkContent.checkLSPStatus()
                }

                sendResponse({
                    result: 'success'
                })
            })

        // 向background请求: 存放当前Tab的ID
        chrome.runtime.sendMessage({storeDtId: true})
    }

    private genFullScreenDingTalk() {
        this.dingTalkFullScreenStyle.innerHTML = `
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

    private genRawDingTalkStyle() {
        this.dingTalkFullScreenStyle.innerHTML += `
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

    private async initDingTalkStyle() {
        if (await StorageArea.get('fullScreen')) {
            this.genFullScreenDingTalk()
        } else {
            this.genRawDingTalkStyle()
        }
    }

    private static async checkLSPStatus() {
        if (!await StorageArea.get('loginStatusPersistence')) return
        const scriptID = 'LSPScript-of-EVINK'
        if (document.querySelector(`#${scriptID}`)) return
        const content = `
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
        const script = document.createElement('script')
        script.id = scriptID
        script.innerHTML += content
        document.body.appendChild(script)
    }
}

new DingTalkContent()
