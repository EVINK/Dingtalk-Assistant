chrome.tabs.onActivated.addListener(async (activeInfo) => {
    const dtId = await storage.get('dtId')
    if (dtId === activeInfo.tabId) {
        sendMessage({initDingTalkStyle: true})
    }
})

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

    if (message.storeDtId) {
        storage.set({dtId: sender.tab.id})
    }

    sendResponse({
        result: 'success'
    })
})

async function setCookiesToDingTalk(key: string, value: string) {
    return new Promise((resolve, reject) => {
        chrome.cookies.set({
            url: 'https://dingtalk.com',
            name: key,
            value: value,
            domain: 'dingtalk.com'
        }, (cookie) => {
            resolve(cookie)
        })
    })
}

chrome.cookies.set({
    url: 'https://dingtalk.com',
    name: 'EvinK',
    value: 'handsome',
    domain: 'dingtalk.com'
}, (cookie) => {
    console.log(cookie)
})

chrome.cookies.set({
    url: 'https://dingtalk.com',
    name: 'deviceid',
    value: '10955752-AE22-4F9A-BDF7-C01259234CCF',
    domain: 'dingtalk.com'
}, (cookie) => {
    console.log(cookie)
})

chrome.cookies.set({
    url: 'https://dingtalk.com',
    name: 'deviceid_exist',
    value: 'true',
    domain: 'dingtalk.com'
}, (cookie) => {
    console.log(cookie)
})
