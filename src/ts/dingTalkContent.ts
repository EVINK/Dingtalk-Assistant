import { GeneralPageContent, generaPageContent } from "./generalPageContent"
import { sendMessage, StorageArea } from "./utils"

class DingTalkContent {
    private dingTalkFullScreenStyle = document.createElement('style')

    private notificationBanListKey = 'newMessageBanList'
    private globalNotificationLockKey = 'notificationLock'

    private contactsMap: ContactMap = {}

    constructor() {
        this.dingTalkFullScreenStyle.id = 'dingTalkFullScreenStyle'
        generaPageContent.head.appendChild(this.dingTalkFullScreenStyle)
        this.init()
        // this.getLatestContacts()
    }

    private async init() {
        this.initDingTalkStyle()
        DingTalkContent.checkLSPStatus()
        this.switchTheme()

        const self = this
        // event
        chrome.runtime.onMessage.addListener(
            async function (request, sender, sendResponse) {
                if (request.message.fullScreen) {
                    self.genFullScreenDingTalk()
                } else if (request.message.fullScreen === false) {
                    self.genRawDingTalkStyle()
                } else if (request.message.initDingTalkStyle) {
                    self.initDingTalkStyle()
                } else if (request.message.checkLSPStatus) {
                    DingTalkContent.checkLSPStatus()
                } else if (request.message.theme) {
                    self.switchTheme(request.message.theme)
                } else if (request.message.clickNotification) {
                    const sender = await StorageArea.get('lastMsgSender') as string
                    const node = self.contactsMap[sender]
                    if (node) node.click()
                }

                sendResponse({
                    result: 'success'
                })
            })

        window.onload = () => {
            this.newMessageListener()
            this.initMessageSelector()
        }

        // 向background请求: 存放当前Tab的ID
        chrome.runtime.sendMessage({ storeDtId: true })
    }

    private genFullScreenDingTalk() {
        this.dingTalkFullScreenStyle.innerHTML = `
                            #layout-main {
                                width: 100%;
                                height: 100%;
                            }
                            #body {
                                /* height: 100%; */
                                height: -webkit-calc(100% - 60px);
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
        // const content = `
        //     var loginStatusKeep = setInterval(function () {
        //         if (window.sessionStorage.getItem('EvinK') === 'Handsome') {
        //             var element = document.createElement('div');
        //             element.id = 'LSPScript-finished-EvinK';
        //             document.body.appendChild(element);
        //             return clearInterval(loginStatusKeep);
        //         }
        //         var wkToken = window.sessionStorage.getItem('wk_token');
        //         if (!wkToken) return;
        //         wkToken = JSON.parse(wkToken);
        //         // if (wkToken.isAutoLogin) return clearInterval(loginStatusKeep);
        //         if (wkToken.isAutoLogin) {
        //             window.sessionStorage.setItem('EvinK', 'Handsome');
        //             return location.reload();
        //         }
        //         wkToken.isAutoLogin = true;
        //         // console.log(JSON.stringify(wkToken));
        //         window.sessionStorage.setItem('wk_token', JSON.stringify(wkToken));
        //     }, 1000)
        // `
        const script = document.createElement('script')
        script.id = scriptID
        script.setAttribute('src', chrome.runtime.getURL('scripts/inject.js'))
        // script.innerHTML += content
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

        function msgWatch(mutations: MutationRecord[]) {
            mutations.forEach(async (m) => {
                if (await StorageArea.get(that.globalNotificationLockKey)) return

                const indicator = m.target.parentElement
                if (!indicator || indicator.tagName !== 'EM' || indicator.className !== 'ng-binding') {
                    return console.info('indicator not found, if dingtalk-assistant notify stop working, this maybe a problem')
                }

                const contact = indicator.parentElement.parentElement.parentElement.parentElement
                if (!contact) return console.error('contact not found, this may cause dingtalk-assistant notify stop working')


                const name = contact.querySelector(
                    '.title-wrap.info .name-wrap .name span.name-title.ng-binding[ng-bind-html="convItem.conv.i18nTitle|emoj"]'
                )
                const msg = contact.querySelector('p.latest-msg span[ng-bind-html="convItem.conv.lastMessageContent|emoj"]')


                let banList = await StorageArea.get(that.notificationBanListKey) as Array<string> | null
                if (!banList) banList = []
                if (banList.includes(name.textContent)) return


                let title
                if (m.target.textContent.toString() === '1') title = `钉钉 - ${name.textContent}`
                else title = `钉钉 - ${name.textContent} (${m.target.textContent})`
                if (!(name.textContent in that.contactsMap)) that.contactsMap[name.textContent] = contact
                return chrome.runtime.sendMessage({
                    chromeNotification: { title, message: msg.textContent, },
                    sender: name.textContent,
                })
            })
        }

        // function contactWatch(mutations: MutationRecord[], contacts: Array<Element>) {
        //     console.log('childList changes', mutations.length, mutations)
        //     for (let m of mutations) {
        //         const children = Array.from((m.target as Element).children)
        //         if (!children || !contacts) break
        //         if (m.removedNodes.length > 0) {
        //             // 删除联系人操作
        //             contacts = children
        //         }
        //         else if (m.addedNodes.length > 0) {
        //             // 新出现在列表中的联系人
        //             // TODO
        //             console.log('addNodes', m.addedNodes)
        //             contacts = children
        //         }
        //     }
        // }

        // contacts 列表
        let findContactsRetryCount = 0
        const findContacts = (timeout: number) => setTimeout(() => {
            findContactsRetryCount++
            if (findContactsRetryCount > 10) timeout = 100 * findContactsRetryCount
            if (findContactsRetryCount > 30) {
                generaPageContent.genBubbleMsg('无法获得联系人列表')
                setTimeout(() => generaPageContent.genBubbleMsg('钉钉助手可能无法正常工作'), 300)
                return console.error('无法获得联系人列表，钉钉助手可能无法正常工作，您可以在反馈页面中向我提供详细信息')
            }

            const contactsSelectors = Array.from(document.querySelectorAll('#sub-menu-pannel div.conv-lists.ng-scope'))
            if (!contactsSelectors) return findContacts(timeout)
            for (let s of contactsSelectors) {
                if (s.childElementCount > 0) {
                    let contacts = Array.from(s.children)
                    new MutationObserver(msgWatch).observe(s, { characterData: true, subtree: true })
                    // new MutationObserver((mutations) => { contactWatch(mutations, contacts) }).observe(s, { childList: true })
                    return
                }
            }
            return findContacts(timeout)

        }, timeout)
        findContacts(600)

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
        background: no-repeat center/100% url("${chrome.runtime.getURL('assets/imgs/notification-disable-red.svg')}");
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
        background: no-repeat center/100% url("${chrome.runtime.getURL('assets/imgs/notification-disable-white.svg')}");
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
        img.src = chrome.runtime.getURL('assets/imgs/notification-setting.svg')
        img.style.width = '18px'
        const label = document.createElement('span')
        btn.appendChild(label)
        label.textContent = '通知设置'

        const finishBtn = document.createElement('a')
        img = new Image()
        finishBtn.appendChild(img)
        img.src = chrome.runtime.getURL('assets/imgs/finish.svg')
        img.style.width = '26px'

        const cancelBtn = document.createElement('a')
        img = new Image()
        cancelBtn.appendChild(img)
        img.src = chrome.runtime.getURL('assets/imgs/cancel.svg')
        img.style.width = '26px'

        let banList: string[] = []
        const coverList: Element[] = []

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

            let contacts = document.querySelectorAll(
                '#sub-menu-pannel .conv-lists-box.ng-isolate-scope conv-item div.conv-item:first-child'
            ) as any
            if (!contacts) {
                return sendMessage({ bubble: '没有找到最近联系人' })
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

        function handleExit() {
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

    private async switchTheme(theme_str?: string) {
        const id = 'dt-night-mode-EvinK'
        const sheet = document.querySelector(id)
        if (sheet) sheet.remove()
        if (!theme_str) {
            theme_str = await StorageArea.get('theme') as string | null || 'original'
        }

        let theme
        switch (theme_str) {
            case 'night':
                theme = {
                    main: '#020f2f',
                    header: '#04236e',
                    font: 'white',
                    selectedFont: 'white',
                    chatBoxHeader: '#04236e',
                    chatBoxTextAreaBg: 'white',
                    chatBoxTextAreaFont: 'black',
                    myMsgBubble: '#0945ff',
                    msgBubble: '#031a59',
                }
                break
            case 'dark-green':
                theme = {
                    main: '#122906',
                    header: '#07462b',
                    font: 'white',
                    selectedFont: 'white',
                    chatBoxHeader: '#07462b',
                    chatBoxTextAreaBg: 'white',
                    chatBoxTextAreaFont: 'black',
                    myMsgBubble: '#446e0b',
                    msgBubble: '#446e0b',
                }
                break
            case 'light-green':
                theme = {
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
                break
            default:
                return
        }

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

    public getLatestContacts(): Promise<Array<Element>> {
        return new Promise((resolve, reject) => {
            const findContactDomInterval = setInterval(() => {
                const contacts = Array.from(document.querySelectorAll(
                    '#sub-menu-pannel conv-item div.list-item.conv-item.context-menu.ng-isolate-scope'
                ))
                if (contacts) {
                    clearInterval(findContactDomInterval)
                    // console.log(contacts)
                    for (let contact of contacts) {
                        console.log(contact.querySelector('.avatar-wrap div'))
                        const avatarWrapper: HTMLElement = contact.querySelector('.avatar-wrap .user-avatar')
                        if (avatarWrapper && avatarWrapper.style.backgroundImage) {
                            console.log(avatarWrapper.style.backgroundImage)
                        }

                    }
                    resolve(contacts)
                }
            }, 1000)
        })
    }

}


new DingTalkContent()
