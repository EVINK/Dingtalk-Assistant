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

        window.onload = () => {
            this.initMessageListener()
        }
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
                if (window.sessionStorage.getItem('EvinK') === 'Handsome') {
                    var element = document.createElement('div');
                    element.id = 'LSPScript-finished-EvinK';
                    document.body.appendChild(element);
                    return clearInterval(loginStatusKeep); 
                }
                var wkToken = window.sessionStorage.getItem('wk_token');
                if (!wkToken) return;
                wkToken = JSON.parse(wkToken);
                // if (wkToken.isAutoLogin) return clearInterval(loginStatusKeep);
                if (wkToken.isAutoLogin) {
                    window.sessionStorage.setItem('EvinK', 'Handsome');
                    return location.reload();
                }
                wkToken.isAutoLogin = true;
                // console.log(JSON.stringify(wkToken));
                window.sessionStorage.setItem('wk_token', JSON.stringify(wkToken));
            }, 1000)
        `
        const script = document.createElement('script')
        script.id = scriptID
        script.innerHTML += content
        document.body.appendChild(script)
        // notification
        if (await StorageArea.get('loginStatusPersistence')) {
            const loopLSPStatus = setInterval(() => {
                if (document.querySelector('#LSPScript-finished-EvinK')) {
                    generaPageContent.genBubbleMsg('登录状态已保存')
                    return clearInterval(loopLSPStatus)
                }
            }, 1000)
        }
    }

    private initMessageListener() {

        const obs = new MutationObserver((mutations) => {
            mutations.forEach((m) => {
                if (m.type === 'characterData') {
                    if (m.target.parentElement.className.indexOf('time')) return
                    const msgBox = m.target.parentElement.parentElement.parentElement
                    const name = msgBox.querySelector('.title-wrap.info .name-wrap p.name .name-title.ng-binding')
                    const msg = msgBox.querySelector('.latest-msg-info .latest-msg span[ng-bind-html="convItem.conv.lastMessageContent|emoj"]')
                    return chrome.runtime.sendMessage({
                        chromeNotification: {
                            title: `钉钉 - ${name.textContent}`,
                            message: msg.textContent
                        }
                    })
                }

                if ((m.target as HTMLElement).className === 'noti') {
                    if ((m.target as HTMLElement).querySelector('.unread-num.ng-scope')) {
                        let parent = m.target.parentElement.parentElement
                        const msg = parent.querySelector('.latest-msg span[ng-bind-html="convItem.conv.lastMessageContent|emoj"]')
                        let name = parent.querySelector('.name-wrap .name-title.ng-binding')
                        return chrome.runtime.sendMessage({
                            chromeNotification: {
                                title: `钉钉 - ${name.textContent}`,
                                message: msg.textContent
                            }
                        })
                    }
                }
            })

        })
        const config = {childList: true, subtree: true, characterData: true}
        const targetNode = document.querySelector('#sub-menu-pannel')
        obs.observe(targetNode, config)
    }

}

new DingTalkContent();





