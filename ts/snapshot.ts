import disable = chrome.browserAction.disable;

class Snapshot {

    private static bgCoverId: string = 'bgCover'
    private static highestZIndex: number = 2147483645
    private static father = document.createElement('div') as HTMLDivElement

    private cover: HTMLDivElement
    private coverLeft: HTMLDivElement
    private coverRight: HTMLDivElement
    private coverTop: HTMLDivElement
    private coverBottom: HTMLDivElement

    private previewBox: HTMLDivElement
    private statusBar: HTMLDivElement
    private previewBoxToolsBar: HTMLDivElement

    private isClickBegun = false

    public constructor() {
        console.log('init snapshot js')
        document.body.append(Snapshot.father)
        this.genBgCover()
        this.event()

    }

    private genCoverStyle(data: { top?: number, left?: number, width?: number, height?: number }) {
        let top = data.top
        let left = data.left
        const width = data.width
        const height = data.height
        if (!top) {
            top = 0
        }
        if (!left) {
            left = 0
        }
        let realWidth: string
        let realHeight: string
        if (!width) {
            realWidth = '100vw'
        } else {
            realWidth = `${width}px`
        }
        if (!height) {
            realHeight = `${document.body.clientHeight}px`
        } else {
            realHeight = `${height}px`
        }

        return `
            margin: 0;
            padding: 0;
            position: fixed;
            top: ${top}px;
            left: ${left}px;
            width: ${realWidth};
            height: ${realHeight};
            background: #0000008f;
            z-index: ${Snapshot.highestZIndex};
            `
    }

    private genBgCover() {
        if (!this.previewBox) {
            let element = document.getElementById(Snapshot.bgCoverId) as HTMLDivElement
            if (element) {
                return element
            }
            element = document.createElement('div') as HTMLDivElement
            element.id = Snapshot.bgCoverId
            element.setAttribute('style',
                `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: ${document.body.clientHeight}px;
            background: #0000008f;
            z-index: ${Snapshot.highestZIndex + 2};
            cursor: crosshair;
            `)
            Snapshot.father.append(element)
            this.cover = element
        } else {
            if (this.cover.style.background) {
                this.cover.style.removeProperty('background')
            }

            const coverLeftId = `${Snapshot.bgCoverId}-left`
            const coverRightId = `${Snapshot.bgCoverId}-right`
            const coverTopId = `${Snapshot.bgCoverId}-top`
            const coverBottomId = `${Snapshot.bgCoverId}-bottom`

            this.coverLeft = document.getElementById(coverLeftId) as HTMLDivElement
            this.coverRight = document.getElementById(coverRightId) as HTMLDivElement
            this.coverTop = document.getElementById(coverTopId) as HTMLDivElement
            this.coverBottom = document.getElementById(coverBottomId) as HTMLDivElement
            if (!this.coverLeft) {
                this.coverLeft = document.createElement('div') as HTMLDivElement
                this.coverLeft.id = coverLeftId
                Snapshot.father.append(this.coverLeft)
            }
            if (!this.coverRight) {
                this.coverRight = document.createElement('div') as HTMLDivElement
                this.coverRight.id = coverRightId
                Snapshot.father.append(this.coverRight)
            }
            if (!this.coverTop) {
                this.coverTop = document.createElement('div') as HTMLDivElement
                this.coverTop.id = coverTopId
                Snapshot.father.append(this.coverTop)
            }

            if (!this.coverBottom) {
                this.coverBottom = document.createElement('div') as HTMLDivElement
                this.coverBottom.id = coverBottomId
                Snapshot.father.append(this.coverBottom)
            }

            const rightWidth = document.body.clientWidth - this.previewBox.offsetLeft - this.previewBox.offsetWidth

            this.coverLeft.setAttribute('style', this.genCoverStyle({
                width: this.previewBox.offsetLeft
            }))
            this.coverRight.setAttribute('style', this.genCoverStyle({
                left: this.previewBox.offsetLeft + this.previewBox.offsetWidth,
                width: rightWidth,
            }))
            this.coverTop.setAttribute('style', this.genCoverStyle({
                left: this.previewBox.offsetLeft,
                height: this.previewBox.offsetTop,
                width: document.body.clientWidth - this.previewBox.offsetLeft - rightWidth
            }))
            this.coverBottom.setAttribute('style', this.genCoverStyle({
                left: this.previewBox.offsetLeft,
                top: this.previewBox.offsetTop + this.previewBox.offsetHeight,
                height: document.body.clientHeight - this.previewBox.offsetTop - this.previewBox.offsetHeight,
                width: document.body.clientWidth - this.previewBox.offsetLeft - rightWidth,
            }))

        }
    }

    private genPreviewBox(x: number, y: number) {
        this.previewBox = document.createElement('div') as HTMLDivElement
        this.previewBox.setAttribute('startX', x.toString())
        this.previewBox.setAttribute('startY', y.toString())

        this.previewBox.setAttribute('id', 'dt-preview')
        this.previewBox.setAttribute('style', `
        width: 1px;
        height: 1px;
        border: 2px dashed gray;
        background: transparent;
        position: fixed;
        top: ${y}px;
        left: ${x}px;
        z-index: ${Snapshot.highestZIndex + 1};
        cursor: move;
        `)
        Snapshot.father.append(this.previewBox)

        this.statusBar = document.createElement('div')
        this.previewBox.append(this.statusBar)

        this.statusBar.setAttribute('style', `
        position: absolute;
        top: -25px;
        left: 0;
        display: inline-block;
        text-indent: 10px;
        width: 87px;
        line-height: 22px;
        background: black;
        color: white;
        border-radius: 10px;
        `)
        this.statusBar.innerText = '(1, 1)'

        this.previewBoxToolsBar = document.createElement('div') as HTMLDivElement
        this.previewBox.append(this.previewBoxToolsBar)
        this.previewBoxToolsBar.setAttribute('style', `
        position: absolute;
        bottom: -35px;
        right: 0;
        display: block;
        min-width: 200px;
        width: 70%;
        height: 35px;
        background: black;
        color: white;
        border-radius: 10px;
        `)

    }

    private event() {

        if (this.cover) {

            this.cover.addEventListener('mousedown', (e: MouseEvent) => {

                if (!this.isClickBegun) {
                    this.isClickBegun = true
                    this.genPreviewBox(e.pageX, e.pageY)
                    this.genBgCover()
                }

            })

            this.cover.onmousemove = (e: MouseEvent) => {
                if (this.previewBox && this.isClickBegun) {
                    const x = parseInt(this.previewBox.getAttribute('startX'))
                    const y = parseInt(this.previewBox.getAttribute('startY'))

                    const offsetX = e.pageX - x
                    const offsetY = e.pageY - y

                    let pattern = 0

                    if (offsetX < 0) {
                        this.previewBox.style.left = `${x - Math.abs(offsetX)}px`
                        pattern += 1
                    }
                    if (offsetY < 0) {
                        this.previewBox.style.top = `${y - Math.abs(offsetY)}px`
                        pattern += 1
                    }

                    this.previewBox.style.width = `${Math.abs(offsetX)}px`
                    this.previewBox.style.height = `${Math.abs(offsetY)}px`

                    if (this.statusBar) {
                        this.statusBar.innerText = `(${Math.abs(offsetX)}, ${Math.abs(offsetY)})`
                    }

                    this.genBgCover()

                }
            }

            this.cover.onmouseup = (e: MouseEvent) => {
                // 重新设定 startX 和 startY
                const x = parseInt(this.previewBox.getAttribute('startX'))
                const y = parseInt(this.previewBox.getAttribute('startY'))

                const offsetX = e.pageX - x
                const offsetY = e.pageY - y

                if (offsetX < 0) {
                    this.previewBox.setAttribute('startX', e.pageX.toString())
                }
                if (offsetY < 0) {
                    this.previewBox.setAttribute('startY', e.pageY.toString())
                }

                // 移除cover
                this.isClickBegun = false
                this.cover.remove()

                // event
                // tslint:disable-next-line
                this.previewBox.onmousedown = (e: MouseEvent) => {
                    // console.log('mounsedown')
                    this.previewBox.setAttribute('mouseDownX', e.pageX.toString())
                    this.previewBox.setAttribute('mouseDownY', e.pageY.toString())
                    this.previewBox.setAttribute('mouseDown', '1')
                }

                this.previewBox.onmousemove = (e: MouseEvent) => {
                    if (this.previewBox.getAttribute('mouseDown') !== '1') {
                        return
                    }

                    // console.log(this.previewBox.getAttribute('mouseDown'))

                    const startX = parseInt(this.previewBox.getAttribute('startX'))
                    const startY = parseInt(this.previewBox.getAttribute('startY'))

                    const mode = 'move'
                    // if (Math.round(e.pageY / 10) === Math.round(startY / 10)) {
                    //     // this.previewBox.style.cursor = 'ns-resize'
                    //     // mode = 'resize'
                    // } else {
                    //     this.previewBox.style.cursor = 'move'
                    //     mode = 'move'
                    // }

                    const offsetX = parseInt(this.previewBox.getAttribute('mouseDownX'))
                    const offsetY = parseInt(this.previewBox.getAttribute('mouseDownY'))
                    if (!offsetX || !offsetY) {
                        return
                    }

                    // 窗体移动
                    if (mode === 'move') {
                        const leftOffset = startX + e.pageX - offsetX
                        const topOffset = startY + e.pageY - offsetY

                        this.previewBox.style.top = `${topOffset}px`
                        this.previewBox.style.left = `${leftOffset}px`

                        this.genBgCover()
                    } else if (mode === 'resize') {
                        // const height =  startY + e.pageY - offsetY
                        //
                        // this.previewBox.style.top = `${e.pageY}px`
                        // this.previewBox.style.left = `${e.pageX}px`
                        // this.previewBox.style.height = `${height}px`
                        // // this.previewBox.style.height
                        //
                        //
                        //
                        // this.genBgCover()
                    }

                }

                this.previewBox.onmouseup = (e: MouseEvent) => {
                    this.previewBox.setAttribute('mouseDown', '0')
                    // 更新 startX startY
                    const offsetX = parseInt(this.previewBox.getAttribute('mouseDownX'))
                    const offsetY = parseInt(this.previewBox.getAttribute('mouseDownY'))
                    if (!offsetX || !offsetY) {
                        return
                    }

                    const startX = parseInt(this.previewBox.getAttribute('startX'))
                    const startY = parseInt(this.previewBox.getAttribute('startY'))

                    const leftOffset = startX + e.pageX - offsetX
                    const topOffset = startY + e.pageY - offsetY

                    this.previewBox.setAttribute('startX', leftOffset.toString())
                    this.previewBox.setAttribute('startY', topOffset.toString())
                }

                this.previewBox.onmouseenter = () => {
                    this.previewBox.style.cursor = 'move'
                }

                this.previewBox.onmouseleave = () => {
                    this.previewBox.setAttribute('mouseDown', '0')
                }

            }

        }

    }

    private destroySnapshot() {
    }

}
