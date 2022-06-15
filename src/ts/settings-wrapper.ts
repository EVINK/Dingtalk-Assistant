import { sendMessage, StorageArea } from "./utils"

const f = document.querySelector('#settings') as HTMLIFrameElement

window.addEventListener('message', async function (e) {
    const data = e.data

    if (!data.fn) return
    switch (data.fn) {
        case 'storageSet':
            StorageArea.set(data.data)
            f.contentWindow.postMessage({ id: data.id }, '*')
            break
        case 'storageGet':
            const v = await StorageArea.get(data.key)
            f.contentWindow.postMessage({ data: v, id: data.id }, '*')
            break
        default:
            f.contentWindow.postMessage({ id: data.id }, '*')
            break
    }


})
