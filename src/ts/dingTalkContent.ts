class DingTalkContent {
    private dingTalkFullScreenStyle = document.createElement('style')

    private newMessageNotificationLock = false

    private notificationBanListKey = 'newMessageBanList'
    private globalNotificationLockKey = 'notificationLock'

    constructor() {
        this.dingTalkFullScreenStyle.id = 'dingTalkFullScreenStyle'
        generaPageContent.head.appendChild(this.dingTalkFullScreenStyle)
        this.init()
    }

    private async init() {
        this.initDingTalkStyle()
        DingTalkContent.checkLSPStatus()
        this.switchNightMode(true)

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

        const that = this

        async function handleNotiClass(target: HTMLElement) {
            if (target.querySelector('.unread-num.ng-scope')) {
                const parent = target.parentElement.parentElement
                const msg = parent.querySelector('.latest-msg span[ng-bind-html="convItem.conv.lastMessageContent|emoj"]')
                let name = parent.querySelector('.name-wrap .name-title.ng-binding')
                if (!msg.textContent || !name.textContent) return

                let banList = await StorageArea.get(that.notificationBanListKey) as Array<string> | null
                if (!banList) banList = []
                if (banList.indexOf(name.textContent) >= 0) return

                let msgContent = msg.textContent
                if (msgContent.length > 20) msgContent = `${msgContent.slice(0, 20)}...`

                return chrome.runtime.sendMessage({
                    chromeNotification: {
                        title: `钉钉 - ${name.textContent}`,
                        message: msgContent
                    }
                })
            }
        }

        const obs = new MutationObserver((mutations) => {
            mutations.forEach(async (m) => {
                if (await StorageArea.get(this.globalNotificationLockKey)) return
                if (this.newMessageNotificationLock) return
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
        const findContactDomInterval = setInterval(() => {
            const targetNode = document.querySelector('#sub-menu-pannel')
            if (targetNode) {
                clearInterval(findContactDomInterval)
                obs.observe(targetNode, config)
            }
        }, 1000)

    }

    private async initMessageSelector() {
        async function findFather(): Promise<Element> {
            return new Promise((resolve) => {
                const findFatherInterval = setInterval(() => {
                    const father = document.querySelector('#header')
                    if (father) {
                        clearInterval(findFatherInterval)
                        resolve(father)
                        return
                    }
                }, 1000)
            })
        }

        const father = await findFather()
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
        display: flex;
        flex-flow: row;
        justify-content: space-evenly;
        align-items: center;
        }
        div.contact-selector-area-EVINK a {
        color: white;
        cursor: pointer;
        }
        .contact-cover-box-EVINK {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: #00000033;
        overflow: hidden;
        }
        .contact-cover-box-EVINK::after, .contact-cover-box-EVINK::before{
        content: '';
        position: absolute;
        }
        .contact-cover-box-EVINK::before{ 
        left: 13px;
        width: 38px;
        height: 38px;
        border-radius: 50%;
        }
        .contact-cover-box-EVINK::after{ 
        left: 20px;
        width: 24px;
        height: 100%;
        }
        .contact-cover-box-hover-EVINK::after {
        top: 100%;
        background: no-repeat center/100% url("${chrome.extension.getURL('assets/imgs/notification-disable-red.svg')}");
        }
        .contact-cover-box-hover-EVINK::before {
        top: 100%;
        background: #000000ab;
        }
        .contact-cover-box-hover-EVINK:hover::before {
        top: 9px;
        }
        .contact-cover-box-hover-EVINK:hover::after {
        top: 0;
        }
        .contact-cover-box-permanent-EVINK::after {
        top: 0;
        background: no-repeat center/100% url("${chrome.extension.getURL('assets/imgs/notification-disable-white.svg')}");
        }
        .contact-cover-box-permanent-EVINK::before {
        top: 9px;
        background: #ff0000cf;
        }
        </style>
        `
        const btn = document.createElement('a')
        btnsArea.appendChild(btn)

        btn.style.display = 'flex'
        btn.style.justifyContent = 'center'
        btn.style.alignItems = 'center'
        let img = new Image()
        btn.appendChild(img)
        img.src = chrome.extension.getURL('assets/imgs/notification-setting.svg')
        img.style.width = '18px'
        const label = document.createElement('span')
        btn.appendChild(label)
        label.textContent = '通知设置'

        const finishBtn = document.createElement('a')
        img = new Image()
        finishBtn.appendChild(img)
        img.src = chrome.extension.getURL('assets/imgs/finish.svg')
        img.style.width = '26px'

        const cancelBtn = document.createElement('a')
        img = new Image()
        cancelBtn.appendChild(img)
        img.src = chrome.extension.getURL('assets/imgs/cancel.svg')
        img.style.width = '26px'

        let banList: Array<string> = []
        const coverList: Array<Element> = []

        btn.onclick = async (e: Event) => {
            if (await StorageArea.get(this.globalNotificationLockKey))
                return GeneralPageContent.alert('通知已被禁用，若要启用通知，请前往设置页')

            banList = await StorageArea.get(this.notificationBanListKey) as Array<string> | null
            if (!banList) banList = []

            const coverClassName = 'contact-cover-box-EVINK'
            if (document.querySelector(`.${coverClassName}`)) return

            const bannedCoverClassName = 'contact-cover-box-permanent-EVINK'
            const hoverClassName = 'contact-cover-box-hover-EVINK'

            btn.remove()
            btnsArea.appendChild(finishBtn)
            btnsArea.appendChild(cancelBtn)

            this.newMessageNotificationLock = true
            setTimeout(() => this.newMessageNotificationLock = false, 1000)

            let contacts = document.querySelectorAll(
                '#sub-menu-pannel .conv-lists-box.ng-isolate-scope conv-item div.conv-item:first-child'
            ) as any
            if (!contacts) {
                return sendMessage({bubble: '没有找到最近联系人'})
            }
            contacts = Array.from(contacts)
            for (const node of contacts) {
                const cover = document.createElement('div')
                node.appendChild(cover)
                cover.classList.add(coverClassName)

                let isBanned = false
                const contactName = node.querySelector('p.name span[ng-bind-html="convItem.conv.i18nTitle|emoj"]')

                if (banList.indexOf(contactName.textContent) >= 0) {
                    cover.classList.add(bannedCoverClassName)
                    isBanned = true
                } else {
                    cover.classList.add(hoverClassName)
                }

                cover.onclick = (e) => {
                    if (isBanned) {
                        cover.classList.remove(bannedCoverClassName)
                        cover.classList.add(hoverClassName)
                        const idx = banList.indexOf(contactName.textContent)
                        if (idx >= 0) banList.splice(idx, 1)
                        isBanned = false
                    } else {
                        cover.classList.remove(hoverClassName)
                        cover.classList.add(bannedCoverClassName)
                        banList.push(contactName.textContent)
                        isBanned = true
                    }
                    e.stopPropagation()
                }
                coverList.push(cover)
            }
        }

        const that = this

        function handleExit() {
            that.newMessageNotificationLock = true
            setTimeout(() => that.newMessageNotificationLock = false, 1000)
            banList = []
            for (const cover of coverList) {
                cover.remove()
            }
            btnsArea.appendChild(btn)
            finishBtn.remove()
            cancelBtn.remove()
        }

        finishBtn.onclick = () => {
            const data: { [key: string]: Array<string> } = {}
            data[this.notificationBanListKey] = banList
            StorageArea.set(data)
            handleExit()
        }
        cancelBtn.onclick = () => {
            handleExit()
        }
    }

    private switchNightMode(open?: boolean) {
        const id = 'dt-night-mode-EvinK'
        if (!open) {
            const sheet = document.querySelector(id)
            if (sheet) {
                return sheet.remove()
            }
        }

        // lightgreen
        const theme = {
            main: 'white',
            header: '#0e9d62',
            font: 'black',
            selectedFont: '#0e9c61',
            chatBoxHeader: '#0e9c6129',
            chatBoxTextAreaBg: 'transparent',
            chatBoxTextAreaFont: 'black',
            myMsgBubble: '#e9ffcf',
            msgBubble: '#e9ffcf',
        }
        // green
        // const theme = {
        //     main: '#122906',
        //     header: '#07462b',
        //     font: 'white',
        //     selectedFont: 'white',
        //     chatBoxHeader: '#07462b',
        //     chatBoxTextAreaBg: 'white',
        //     chatBoxTextAreaFont: 'black',
        //     myMsgBubble: '#446e0b',
        //     msgBubble: '#446e0b',
        // }
        // night
        // const theme = {
        //     main: '#020f2f',
        //     header: '#04236e',
        //     font: 'white',
        //     selectedFont: 'white',
        //     chatBoxHeader: '#04236e',
        //     chatBoxTextAreaBg: 'white',
        //     chatBoxTextAreaFont: 'black',
        //     myMsgBubble: '#0945ff',
        //     msgBubble: '#031a59',
        // }

        const nightModeShell = document.createElement('div')
        nightModeShell.id = id
        generaPageContent.head.appendChild(nightModeShell)
        nightModeShell.innerHTML += `
        <style>
        #content-pannel .content-pannel-head {
        background: ${theme.chatBoxHeader};  /* 聊天框header */
        color: ${theme.font};
        }
        #content-pannel .content-pannel-head {  
         border-bottom: 0 solid transparent; 
        }
        .main-chat.chat-items.ng-isolate-scope {
        background: ${theme.main}; /* 聊天框 */ 
        }
        .chat-item.me.responsive-box .content-area .msg-bubble-box .msg-bubble-area .msg-content-wrapper .msg-bubble {
        background: ${theme.myMsgBubble};
        border: 1px solid transparent;
        }
        .chat-item.responsive-box .content-area .msg-bubble-box .msg-bubble-area .msg-content-wrapper .msg-bubble {
        background: ${theme.msgBubble};
        color: ${theme.font};
        border: 1px solid transparent;
        }
        #header {
        /* header */
        border: 1px solid ${theme.header};
        }
        #header.lng-zh {
        /* header */
        background: url('https://g.alicdn.com/DingTalkWeb/web/3.8.7/assets/webpack-img/logo_cn.png') no-repeat 35px 18px scroll ${theme.header};
        }
        .search-bar-wraper .main-search-2 .select2-search-field input {
            background-color: white;
            border: 1px solid ${theme.main};
         }
         
         #menu-pannel .main-menus .menu-item.selected {
         color: ${theme.selectedFont};
         }
         #menu-pannel, #menu-pannel .profile {
         background: ${theme.main};
         border: 1px solid ${theme.main};
        }
        .conv-lists-box.ng-isolate-scope {
        background: ${theme.main};
        }
        #sub-menu-pannel.conv-list-pannel .conv-lists .conv-item:hover {
        background-color: ${theme.chatBoxHeader};
        }
        #sub-menu-pannel.conv-list-pannel .conv-lists .conv-item.active {
        background-color: ${theme.chatBoxHeader};
        }
        #sub-menu-pannel.conv-list-pannel .conv-lists .conv-item:hover .conv-item-content .title-wrap .name-wrap .name .name-title {
        color: ${theme.selectedFont};
        }
        #sub-menu-pannel.conv-list-pannel .conv-lists .conv-item.active .conv-item-content .title-wrap .name-wrap .name .name-title {
        color: ${theme.selectedFont};
        }
        #sub-menu-pannel.conv-list-pannel .conv-lists .conv-item .conv-item-content .title-wrap .name-wrap .name .name-title {
        color: ${theme.font};
        }
        #sub-menu-pannel {
        border-right: 0 solid transparent; 
        }
        
        .nocontent-logo {
        background: ${theme.main};
        }
        #content-pannel .nocontent-tips {
        background: ${theme.main};
        color: ${theme.font};
        }
        
        .conv-detail-pannel .send-msg-box-wrapper .action-area .send-message-button {
        background-color: ${theme.main};
        }
        .conv-detail-pannel .send-msg-box-wrapper {
        border-top: 0 solid transparent; 
        }
        .conv-detail-pannel .send-msg-box-wrapper .input-area {
        background: ${theme.main};
        }
        .conv-detail-pannel .send-msg-box-wrapper .input-area .msg-box .input-msg-box {
        /* 聊天框Text area */
        color: ${theme.chatBoxTextAreaFont};
        background-color: ${theme.chatBoxTextAreaBg};
        }
        .conv-detail-pannel .send-msg-box-wrapper .action-area {
        border-left: 0 solid transparent;
        }
         
        .chat-head .conv-operations .iconfont {
        color: ${theme.font};
        }       
        
        ::-webkit-scrollbar-track-piece {
        background-color: ${theme.main};
        }
        ::-webkit-scrollbar-thumb {
        background-color: white;
        }
        .conv-detail-pannel .content-pannel-body .chat-item.me .msg-bubble-area .text a {
        color: #38adff; 
        }
        </style>
        `
    }


}


new DingTalkContent();
