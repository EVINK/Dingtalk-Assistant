import { sendMessage, StorageArea } from "./utils"

const f = document.querySelector('#popup') as HTMLIFrameElement

window.addEventListener('message', async function (e) {
    const data = e.data

    if (!data.fn) return
    switch (data.fn) {
        case 'getManifestData':
            f.contentWindow.postMessage({ data: chrome.runtime.getManifest(), id: data.id }, '*')
            break
        case 'storageSet':
            StorageArea.set(data.data)
            f.contentWindow.postMessage({ id: data.id }, '*')
            break
        case 'storageGet':
            const v = await StorageArea.get(data.key)
            f.contentWindow.postMessage({ data: v, id: data.id }, '*')
            break
        case 'sendMessage':
            sendMessage(data.msg, data.cb)
            f.contentWindow.postMessage({ id: data.id }, '*')
            break
        case 'openPage':
            f.contentWindow.postMessage({ id: data.id }, '*')
            chrome.tabs.create({ url: chrome.runtime.getURL(data.url) })
            break
        case 'snapshot':
            f.contentWindow.postMessage({ id: data.id }, '*')
            chrome.tabs.captureVisibleTab(null, {}, function (image) {
                sendMessage({ snapshot: image })
            })
            break
        default:
            f.contentWindow.postMessage({ id: data.id }, '*')
            break
    }


})
