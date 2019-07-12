chrome.tabs.onActivated.addListener(async (activeInfo) => {
    const dtId = await storage.get('dtId')
    if (dtId == activeInfo.tabId) {
        sendMessage({initDingTalkStyle: true})
    }
})


chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {

    if (message.storeDtId)
        storage.set({dtId: sender.tab.id})

    sendResponse({
        result: "success"
    })
})
