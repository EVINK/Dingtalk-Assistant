import Cookie = chrome.cookies.Cookie;
import CookieChangeInfo = chrome.cookies.CookieChangeInfo;

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

function setCookiesToDingTalk({key, value, secure, url}: {
    key: string,
    value: string,
    secure?: boolean,
    url?: string
}, callback?: Function) {
    if (!secure) secure = false
    if (!url) url = 'https://dingtalk.com'
    const domain = url.slice('http://'.length)
    console.log('cookie url', url)
    console.log('cookie domain', domain)
    chrome.cookies.set({
        url: url,
        name: key,
        value: value,
        // domain: domain,
        path: '/',
        expirationDate: 1594913650,
        secure: secure,
        httpOnly: true,
    }, (cookies: Cookie) => {
        callback(cookies)
    })
}


setCookiesToDingTalk({key: 'EvinK', value: 'Handsome'}, (cookies: Cookie) => console.log(cookies))

setCookiesToDingTalk({
    key: 'deviceid',
    value: '2E1E13B4-B957-4B78-90A6-B443F5B02B3A'
}, (cookies: Cookie) => console.log(cookies))
setCookiesToDingTalk({key: 'deviceid_exist', value: 'true'}, (cookies: Cookie) => console.log(cookies))


chrome.cookies.get({name: "dt_s", storeId: "", url: 'https://dingtalk.com'}, function (cookie: Cookie) {
        console.log('get dt_s', cookie)
    }
)


setCookiesToDingTalk({
    key: 'dt_s',
    value: 'u-16228582-6c00aed625-b0b70b5-253bc3-1c10abaf-387532f4-d22c-4a85-ad0b-7c9964b7c5c5',
    secure: false,
}, (cookies: Cookie) => console.log(cookies))


chrome.cookies.get({name: "umdata_", storeId: "", url: 'https://ynuf.aliapp.org'}, function (cookie: Cookie) {
        console.log(cookie)
        // setCookiesToDingTalk({
        //     url: 'http://ynuf.aliapp.org',
        //     key: 'umdata_',
        //     value: 'G19CA1B9F1EEA473E23182F42B60D43E6C92CD7',
        // }, (cookies: Cookie) => console.log(cookies))


        chrome.cookies.set({
            url: 'https://*.aliapp.org',
            name: 'umdata_',
            value: 'G3A6C79FE88E6A236E7827C42A11201EAE57AAC',
            path: '/',
            expirationDate: 1594913650,

        }, (cookies: Cookie) => {
            console.log(cookies)
        })


    }
)

// setCookiesToDingTalk({
//     url: 'https://ynuf.aliapp.org',
//     key: 'cbc',
//     value: 'G6D649F60311DF72C2B6EF12A16B21B8746CB63',
// }, (cookies: Cookie) => console.log(cookies))
//


chrome.cookies.onChanged.addListener((changeInfo: CookieChangeInfo) => {
    if (changeInfo.cookie.domain == 'dingtalk.com') {
        console.log('cookies changes', changeInfo.cause)
        console.log(changeInfo)
    }


})



