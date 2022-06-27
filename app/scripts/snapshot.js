class Snapshot {
    constructor(canvas) {
        this.father = document.createElement('div');
        this.isClickBegun = false;
        this.father.id = 'snapshot-unique-of-this-window-EvinK';
        if (document.getElementById(this.father.id))
            return;
        this.canvas = canvas;
        this.father.appendChild(this.canvas);
        document.body.append(this.father);
        this.genBgCover();
        this.event();
    }
    genCoverStyle(data) {
        let top = data.top;
        let left = data.left;
        const width = data.width;
        const height = data.height;
        if (!top) {
            top = 0;
        }
        if (!left) {
            left = 0;
        }
        let realWidth;
        let realHeight;
        if (width === undefined || width === null) {
            realWidth = '100vw';
        }
        else {
            realWidth = `${width}px`;
        }
        if (height === undefined || height === null) {
            realHeight = `${document.body.clientHeight}px`;
        }
        else {
            realHeight = `${height}px`;
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
            `;
    }
    genBgCover() {
        if (!this.previewBox) {
            let element = document.getElementById(Snapshot.bgCoverId);
            if (element) {
                return element;
            }
            element = document.createElement('div');
            element.id = Snapshot.bgCoverId;
            element.setAttribute('style', `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: ${document.body.clientHeight}px;
            background: #0000008f;
            z-index: ${Snapshot.highestZIndex + 2};
            cursor: crosshair;
            `);
            this.father.append(element);
            this.cover = element;
        }
        else {
            if (this.cover.style.background) {
                this.cover.style.removeProperty('background');
            }
            const coverLeftId = `${Snapshot.bgCoverId}-left`;
            const coverRightId = `${Snapshot.bgCoverId}-right`;
            const coverTopId = `${Snapshot.bgCoverId}-top`;
            const coverBottomId = `${Snapshot.bgCoverId}-bottom`;
            this.coverLeft = document.getElementById(coverLeftId);
            this.coverRight = document.getElementById(coverRightId);
            this.coverTop = document.getElementById(coverTopId);
            this.coverBottom = document.getElementById(coverBottomId);
            if (!this.coverLeft) {
                this.coverLeft = document.createElement('div');
                this.coverLeft.id = coverLeftId;
                this.father.append(this.coverLeft);
            }
            if (!this.coverRight) {
                this.coverRight = document.createElement('div');
                this.coverRight.id = coverRightId;
                this.father.append(this.coverRight);
            }
            if (!this.coverTop) {
                this.coverTop = document.createElement('div');
                this.coverTop.id = coverTopId;
                this.father.append(this.coverTop);
            }
            if (!this.coverBottom) {
                this.coverBottom = document.createElement('div');
                this.coverBottom.id = coverBottomId;
                this.father.append(this.coverBottom);
            }
            const rightWidth = document.body.clientWidth - this.previewBox.offsetLeft - this.previewBox.offsetWidth;
            this.coverLeft.setAttribute('style', this.genCoverStyle({
                width: this.previewBox.offsetLeft
            }));
            this.coverRight.setAttribute('style', this.genCoverStyle({
                left: this.previewBox.offsetLeft + this.previewBox.offsetWidth,
                width: rightWidth,
            }));
            this.coverTop.setAttribute('style', this.genCoverStyle({
                left: this.previewBox.offsetLeft,
                height: this.previewBox.offsetTop,
                width: document.body.clientWidth - this.previewBox.offsetLeft - rightWidth
            }));
            this.coverBottom.setAttribute('style', this.genCoverStyle({
                left: this.previewBox.offsetLeft,
                top: this.previewBox.offsetTop + this.previewBox.offsetHeight,
                height: document.body.clientHeight - this.previewBox.offsetTop - this.previewBox.offsetHeight,
                width: document.body.clientWidth - this.previewBox.offsetLeft - rightWidth,
            }));
        }
    }
    genPreviewBox(x, y) {
        this.previewBox = document.createElement('div');
        this.previewBox.setAttribute('startX', x.toString());
        this.previewBox.setAttribute('startY', y.toString());
        this.previewBox.setAttribute('id', 'dt-preview');
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
        `);
        this.father.append(this.previewBox);
        this.statusBar = document.createElement('div');
        this.previewBox.append(this.statusBar);
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
        `);
        this.statusBar.innerText = '(1, 1)';
        this.previewBoxToolsBar = document.createElement('div');
        this.previewBox.append(this.previewBoxToolsBar);
        this.previewBoxToolsBar.setAttribute('style', `
        position: absolute;
        bottom: -50px;
        right: 0;
        display: block;
        min-width: 112px;
        height: 50px;
        background: black;
        color: white;
        border-radius: 10px;
        `);
        // generate tools
        this.previewBoxToolsBar.innerHTML += `
        <style>
          ul#tools-of-toolsBar-EvinK {
            display: flex;
            flex-flow: row;
            justify-content: flex-end;
            align-items: center;
            cursor: default;
            width: 100%;
            height: 100%;
            list-style: none;
            /* some site will interference this style */
            /* so there is a duplicate mention */
            margin: 0;
            padding: 0;
          }
          ul#tools-of-toolsBar-EvinK li {
            cursor: pointer;
            margin: 0 5px;
          }
          ul#tools-of-toolsBar-EvinK li img{
            width: 30px;
            height: 30px;
          }
        </style>
        `;
        const toolsList = document.createElement('ul');
        toolsList.id = 'tools-of-toolsBar-EvinK';
        this.previewBoxToolsBar.appendChild(toolsList);
        toolsList.onmousemove = (e => e.cancelBubble = true);
        toolsList.onmouseup = (e => e.cancelBubble = true);
        toolsList.onmousedown = (e => e.cancelBubble = true);
        let li = document.createElement('li');
        toolsList.appendChild(li);
        let img = new Image();
        li.appendChild(img);
        img.src = chrome.runtime.getURL('assets/imgs/close-white.svg');
        // img.setAttribute('style', `
        // width: 20px;
        // padding-right: 4px;
        // padding-top: 2px;
        // `)
        li.onclick = () => {
            this.destroySnapshot();
        };
        li = document.createElement('li');
        toolsList.appendChild(li);
        img = new Image();
        li.appendChild(img);
        img.src = chrome.runtime.getURL('assets/imgs/download.svg');
        li.onclick = () => {
            const startX = parseInt(this.previewBox.getAttribute('startX'));
            const startY = parseInt(this.previewBox.getAttribute('startY'));
            const endX = startX + this.previewBox.clientWidth;
            const endY = startY + this.previewBox.clientHeight;
            const canvas = Snapshot.cropCanvas(this.canvas, { x: startX, y: startY }, { x: endX, y: endY });
            canvas.toBlob((blob => {
                const url = window.URL;
                const a = document.createElement('a');
                a.download = `${new Date().getTime()}.png`;
                a.href = url.createObjectURL(blob);
                a.dataset.downloadurl = ['png', a.download, a.href].join(':');
                // console.log(a.dataset.downloadurl)
                a.click();
                this.destroySnapshot();
                generaPageContent.genBubbleMsg('已保存图片');
            }));
        };
        li = document.createElement('li');
        toolsList.appendChild(li);
        img = new Image();
        li.appendChild(img);
        img.src = chrome.runtime.getURL('assets/imgs/ok.svg');
        li.onclick = () => {
            const startX = parseInt(this.previewBox.getAttribute('startX'));
            const startY = parseInt(this.previewBox.getAttribute('startY'));
            const endX = startX + this.previewBox.clientWidth;
            const endY = startY + this.previewBox.clientHeight;
            const canvas = Snapshot.cropCanvas(this.canvas, { x: startX, y: startY }, { x: endX, y: endY });
            const data = canvas.toDataURL('image/png');
            const img = new Image();
            this.father.appendChild(img);
            img.src = data;
            const dpr = window.devicePixelRatio || 1;
            img.style.transform = `scale(${2 - dpr})`;
            const range = document.createRange();
            const selection = document.getSelection();
            range.selectNode(img);
            selection.removeAllRanges();
            selection.addRange(range);
            document.execCommand('copy');
            this.destroySnapshot();
            generaPageContent.genBubbleMsg('图片已复制');
            setTimeout(() => generaPageContent.genBubbleMsg('注意,在富文本编辑器中才能粘贴哦'), 500);
        };
    }
    event() {
        const keydownHandler = (e) => {
            if (e.key === 'Escape') {
                removeEventListener('keydown', keydownHandler, true);
                this.destroySnapshot();
            }
        };
        addEventListener('keydown', keydownHandler, true);
        if (this.cover) {
            this.cover.addEventListener('mousedown', (e) => {
                if (!this.isClickBegun) {
                    this.isClickBegun = true;
                    this.genPreviewBox(e.offsetX, e.offsetY);
                    this.genBgCover();
                }
            });
            this.cover.onmousemove = (e) => {
                if (this.previewBox && this.isClickBegun) {
                    const x = parseInt(this.previewBox.getAttribute('startX'));
                    const y = parseInt(this.previewBox.getAttribute('startY'));
                    const offsetX = e.offsetX - x;
                    const offsetY = e.offsetY - y;
                    if (offsetX < 0) {
                        this.previewBox.style.left = `${x - Math.abs(offsetX)}px`;
                    }
                    if (offsetY < 0) {
                        this.previewBox.style.top = `${y - Math.abs(offsetY)}px`;
                    }
                    this.previewBox.style.width = `${Math.abs(offsetX)}px`;
                    this.previewBox.style.height = `${Math.abs(offsetY)}px`;
                    if (this.statusBar) {
                        // this.statusBar.innerText = `(${Math.abs(offsetX)}, ${Math.abs(offsetY)})`
                        this.statusBar.innerText = `(${Math.abs(e.offsetX)}, ${Math.abs(e.offsetY)})`;
                    }
                    this.genBgCover();
                }
            };
            this.cover.onmouseup = (e) => {
                // 重新设定 startX 和 startY
                const x = parseInt(this.previewBox.getAttribute('startX'));
                const y = parseInt(this.previewBox.getAttribute('startY'));
                const offsetX = e.offsetX - x;
                const offsetY = e.offsetY - y;
                if (offsetX < 0) {
                    this.previewBox.setAttribute('startX', e.offsetX.toString());
                }
                if (offsetY < 0) {
                    this.previewBox.setAttribute('startY', e.offsetY.toString());
                }
                // 移除cover
                this.isClickBegun = false;
                this.cover.remove();
                // event
                // tslint:disable-next-line
                this.previewBox.onmousedown = (e) => {
                    this.previewBox.setAttribute('mouseDownX', e.offsetX.toString());
                    this.previewBox.setAttribute('mouseDownY', e.offsetY.toString());
                    this.previewBox.setAttribute('mouseDown', '1');
                };
                this.previewBox.onmousemove = (e) => {
                    if (this.previewBox.getAttribute('mouseDown') !== '1') {
                        return;
                    }
                    const startX = parseInt(this.previewBox.getAttribute('startX'));
                    const startY = parseInt(this.previewBox.getAttribute('startY'));
                    const mode = 'move';
                    const offsetX = parseInt(this.previewBox.getAttribute('mouseDownX'));
                    const offsetY = parseInt(this.previewBox.getAttribute('mouseDownY'));
                    if (!offsetX || !offsetY) {
                        return;
                    }
                    // 窗体移动
                    if (mode === 'move') {
                        const leftOffset = startX + e.offsetX - offsetX;
                        const topOffset = startY + e.offsetY - offsetY;
                        this.previewBox.style.top = `${topOffset}px`;
                        this.previewBox.style.left = `${leftOffset}px`;
                        this.genBgCover();
                        this.previewBox.setAttribute('startX', leftOffset.toString());
                        this.previewBox.setAttribute('startY', topOffset.toString());
                        this.statusBar.innerText = `(${Math.abs(leftOffset)}, ${Math.abs(topOffset)})`;
                    }
                    else if (mode === 'resize') {
                        // TODO
                    }
                };
                this.previewBox.onmouseup = (e) => {
                    this.previewBox.setAttribute('mouseDown', '0');
                    // 更新 startX startY
                    const offsetX = parseInt(this.previewBox.getAttribute('mouseDownX'));
                    const offsetY = parseInt(this.previewBox.getAttribute('mouseDownY'));
                    if (!offsetX || !offsetY) {
                        return;
                    }
                    const startX = parseInt(this.previewBox.getAttribute('startX'));
                    const startY = parseInt(this.previewBox.getAttribute('startY'));
                    const leftOffset = startX + e.offsetX - offsetX;
                    const topOffset = startY + e.offsetY - offsetY;
                    this.previewBox.setAttribute('startX', leftOffset.toString());
                    this.previewBox.setAttribute('startY', topOffset.toString());
                };
                this.previewBox.onmouseenter = () => {
                    this.previewBox.style.cursor = 'move';
                };
                this.previewBox.onmouseleave = () => {
                    this.previewBox.setAttribute('mouseDown', '0');
                };
            };
        }
    }
    static cropCanvas(canvas, start, end) {
        const dpr = window.devicePixelRatio || 1;
        const ctx = canvas.getContext('2d');
        const imageData = ctx.getImageData(start.x * dpr, start.y * dpr, end.x * dpr, end.y * dpr);
        const newCanvas = document.createElement('canvas');
        newCanvas.width = (end.x - start.x) * dpr;
        newCanvas.height = (end.y - start.y) * dpr;
        const newCtx = newCanvas.getContext('2d');
        newCtx.putImageData(imageData, 0, 0);
        return newCanvas;
    }
    destroySnapshot() {
        const id = this.father.id;
        this.father.remove();
        // fuck iframe!!!
        try {
            document.querySelectorAll('iframe').forEach(item => {
                const element = item.contentWindow.document.getElementById(id);
                if (element)
                    element.remove();
            });
        }
        catch (e) {
            console.error(e);
        }
    }
}
Snapshot.bgCoverId = 'bgCover-snapshot-EvinK';
Snapshot.highestZIndex = 2147483645;
