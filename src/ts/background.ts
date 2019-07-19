chrome.tabs.onActivated.addListener(async (activeInfo) => {
    const dtId = await StorageArea.get('dtId')
    if (dtId === activeInfo.tabId) {
        sendMessage({initDingTalkStyle: true})
        sendMessage({checkLSPStatus: true})
    }
})

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.storeDtId) {
        StorageArea.set({dtId: sender.tab.id})
    }

    sendResponse({
        result: 'success'
    })
})

