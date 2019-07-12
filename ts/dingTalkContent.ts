let dingTalkFullScreenStyle = document.createElement('style')
dingTalkFullScreenStyle.id = 'dingTalkFullScreenStyle'

head.appendChild(dingTalkFullScreenStyle)

function genFullscreenDingtalk() {
    dingTalkFullScreenStyle.innerHTML = `
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


function genRawDingTalkStyle() {
    dingTalkFullScreenStyle.innerHTML += `
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


async function initDingTalkStyle() {
    if (await storage.get('fullscreen')) {
        genFullscreenDingtalk()
    } else {
        genRawDingTalkStyle()
    }
}

const canvas: HTMLCanvasElement = document.createElement('canvas')
const context = canvas.getContext('2d')
const image: HTMLImageElement = new Image();
image.setAttribute("crossOrigin", 'Anonymous')


function dom2svg() {
    let dom = document.body
    dom = dom.cloneNode(true) as HTMLElement

    const im = Array.from(document.querySelectorAll('script'))

    function removeScript(im) {
        if (!im)
            return
        // console.log(im)
        // im[0].parentNode.removeChild(im[0])
        im.innerHTML = ''
        im.shift()
        return removeScript(im)
    }

    removeScript(im)


    //
    // const imgs = Array.from(dom.querySelectorAll('img'))
    // for (const img of imgs) {
    //     draw(img)
    //     img.onload = () => {
    //         img.src = canvas.toDataURL()
    //     }
    // }
    //
    // console.log(dom)
    // image.src = 'data:image/svg+xml;charset=utf-8,<svg xmlns="http://www.w3.org/2000/svg" width="' + dom.offsetWidth + '" height="' + dom.offsetHeight + '"><foreignObject x="0" y="0" width="100%" height="100%">' +
    //     new XMLSerializer().serializeToString(dom).replace(/#/g, '%23').replace(/\n/g, '%0A') +
    //     document.querySelector('style').outerHTML +
    //     '</foreignObject></svg>'
    let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
    svg.setAttribute('xmlns', 'http://www.w3.org/2000/svg')
    svg.style.width = '100vw'
    svg.style.height = '100vh'
    svg.style.position = 'fixed'
    svg.style.top = '0'
    svg.style.left = '0'
    svg.style.zIndex = '9999999999'

    // svg.setAttributeNS("http://www.w3.org/2000/svg", "xmlns:xlink", "http://www.w3.org/2000/xlink");
    svg.innerHTML += `<foreignObject width="100%" height="100%"> ${dom.outerHTML}</foreignObject>`

    //  = '<svg xmlns="" width="200" height="200">' +
    // '<foreignObject width="100%" height="100%">' +
    // dom.outerText
    // '</foreignObject>' +
    // '</svg>'


    // document.body.appendChild(svg)

    // get svg data
    const xml = new XMLSerializer().serializeToString(svg)

    // make it base64
    const svg64 = btoa(unescape(encodeURIComponent(xml)))
    const b64Start = 'data:image/svg+xml;base64,'

    // set it as the source of the img element
    image.src = b64Start + svg64

    image.onload = () => {
        context.clearRect(0, 0, image.width, image.height)
        context.drawImage(image, 0, 0)
    }
    svg = image
    svg.style.width = '100vw'
    svg.style.height = '100vh'
    svg.style.position = 'fixed'
    svg.style.top = '0'
    svg.style.left = '0'
    svg.style.zIndex = '9999999999'

    document.body.appendChild(image)
    document.body.appendChild(canvas)


}

/**
 * init content
 */
(async function init() {

    initDingTalkStyle()

    // event
    chrome.runtime.onMessage.addListener(
        function (request, sender, sendResponse) {

            dom2svg()

            if (request.message.fullscreen === true)
                return genFullscreenDingtalk()
            else if (request.message.fullscreen === false)
                genRawDingTalkStyle()
            else if (request.message.initDingTalkStyle) {
                initDingTalkStyle()
            }

            sendResponse({
                result: "success"
            })
        })

    // 将ID发往background
    chrome.runtime.sendMessage({storeDtId: true})

})()
