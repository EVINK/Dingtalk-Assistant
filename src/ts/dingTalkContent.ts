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
            this.newMessageListener()
            this.initMessageSelector()
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

    private newMessageListener() {

        function handleNotiClass(target: HTMLElement) {
            if (target.querySelector('.unread-num.ng-scope')) {
                const parent = target.parentElement.parentElement
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

        const obs = new MutationObserver((mutations) => {
            mutations.forEach((m) => {
                if (m.type === 'characterData') {
                    if (m.target.parentElement.className.indexOf('time') >= 0) return
                    const notiBox = m.target.parentElement.parentElement.parentElement
                    if (notiBox.className.indexOf('noti') >= 0) {
                        return handleNotiClass(notiBox)
                    }
                } else if ((m.target as HTMLElement).className.indexOf('noti') >= 0) {
                    return handleNotiClass(m.target as HTMLElement)
                }
            })

        })
        const config = {childList: true, subtree: true, characterData: true}
        const targetNode = document.querySelector('#sub-menu-pannel')
        obs.observe(targetNode, config)
    }

    private initMessageSelector() {
        const father = document.querySelector('#header')
        const btnsArea = document.createElement('div')
        btnsArea.classList.add('contact-selector-area-EVINK')
        father.appendChild(btnsArea)
        btnsArea.innerHTML += `
        <style>
        div.contact-selector-area-EVINK {
        position: absolute;
        top: 0;
        left: 130px;
        width: 100px;
        height: 100%;
        border: 1px solid;
        }
        </style>
        `
        const btn = document.createElement('a')
        btn.textContent = '通知设置'
        btnsArea.appendChild(btn)

        btn.onclick = (e: Event) => {
            let contacts = document.querySelectorAll(
                '#sub-menu-pannel .conv-lists-box.ng-isolate-scope conv-item'
            ) as any
            if(!contacts) {
                return sendMessage({bubble: '没有找到最近联系人'})
            }
            contacts = Array.from(contacts)
            for(const node of contacts) {
                const cover = document.createElement('div')
                node.appendChild(cover)
                cover.setAttribute('style', `
                
                `)
                console.log(node)
            }
        }






    }

}

new DingTalkContent();
