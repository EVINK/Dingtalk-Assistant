var Snapshot = (function () {
    function Snapshot(canvas) {
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
    Snapshot.prototype.genCoverStyle = function (data) {
        var top = data.top;
        var left = data.left;
        var width = data.width;
        var height = data.height;
        if (!top) {
            top = 0;
        }
        if (!left) {
            left = 0;
        }
        var realWidth;
        var realHeight;
        if (width === undefined || width === null) {
            realWidth = '100vw';
        }
        else {
            realWidth = width + "px";
        }
        if (height === undefined || height === null) {
            realHeight = document.body.clientHeight + "px";
        }
        else {
            realHeight = height + "px";
        }
        return "\n            margin: 0;\n            padding: 0;\n            position: fixed;\n            top: " + top + "px;\n            left: " + left + "px;\n            width: " + realWidth + ";\n            height: " + realHeight + ";\n            background: #0000008f;\n            z-index: " + Snapshot.highestZIndex + ";\n            ";
    };
    Snapshot.prototype.genBgCover = function () {
        if (!this.previewBox) {
            var element = document.getElementById(Snapshot.bgCoverId);
            if (element) {
                return element;
            }
            element = document.createElement('div');
            element.id = Snapshot.bgCoverId;
            element.setAttribute('style', "\n            position: fixed;\n            top: 0;\n            left: 0;\n            width: 100vw;\n            height: " + document.body.clientHeight + "px;\n            background: #0000008f;\n            z-index: " + (Snapshot.highestZIndex + 2) + ";\n            cursor: crosshair;\n            ");
            this.father.append(element);
            this.cover = element;
        }
        else {
            if (this.cover.style.background) {
                this.cover.style.removeProperty('background');
            }
            var coverLeftId = Snapshot.bgCoverId + "-left";
            var coverRightId = Snapshot.bgCoverId + "-right";
            var coverTopId = Snapshot.bgCoverId + "-top";
            var coverBottomId = Snapshot.bgCoverId + "-bottom";
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
            var rightWidth = document.body.clientWidth - this.previewBox.offsetLeft - this.previewBox.offsetWidth;
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
    };
    Snapshot.prototype.genPreviewBox = function (x, y) {
        var _this = this;
        this.previewBox = document.createElement('div');
        this.previewBox.setAttribute('startX', x.toString());
        this.previewBox.setAttribute('startY', y.toString());
        this.previewBox.setAttribute('id', 'dt-preview');
        this.previewBox.setAttribute('style', "\n        width: 1px;\n        height: 1px;\n        border: 2px dashed gray;\n        background: transparent;\n        position: fixed;\n        top: " + y + "px;\n        left: " + x + "px;\n        z-index: " + (Snapshot.highestZIndex + 1) + ";\n        cursor: move;\n        ");
        this.father.append(this.previewBox);
        this.statusBar = document.createElement('div');
        this.previewBox.append(this.statusBar);
        this.statusBar.setAttribute('style', "\n        position: absolute;\n        top: -25px;\n        left: 0;\n        display: inline-block;\n        text-indent: 10px;\n        width: 87px;\n        line-height: 22px;\n        background: black;\n        color: white;\n        border-radius: 10px;\n        ");
        this.statusBar.innerText = '(1, 1)';
        this.previewBoxToolsBar = document.createElement('div');
        this.previewBox.append(this.previewBoxToolsBar);
        this.previewBoxToolsBar.setAttribute('style', "\n        position: absolute;\n        bottom: -35px;\n        right: 0;\n        display: block;\n        min-width: 75px;\n        height: 35px;\n        background: black;\n        color: white;\n        border-radius: 10px;\n        ");
        this.previewBoxToolsBar.innerHTML += "\n        <style>\n          ul#tools-of-toolsBar-EvinK {\n            display: flex;\n            flex-flow: row;\n            justify-content: flex-end;\n            align-items: center;\n            cursor: default;\n            width: 90%;\n            height: 100%;\n            list-style: none;\n            /* some site will interference this style */\n            /* so there is a duplicate mention */\n            margin: 0;\n            padding: 0;\n          }\n          ul#tools-of-toolsBar-EvinK li {\n            cursor: pointer;\n          }\n          ul#tools-of-toolsBar-EvinK li img{\n            width: 30px;\n          }\n        </style>\n        ";
        var toolsList = document.createElement('ul');
        toolsList.id = 'tools-of-toolsBar-EvinK';
        this.previewBoxToolsBar.appendChild(toolsList);
        toolsList.onmousemove = (function (e) { return e.cancelBubble = true; });
        toolsList.onmouseup = (function (e) { return e.cancelBubble = true; });
        toolsList.onmousedown = (function (e) { return e.cancelBubble = true; });
        var li = document.createElement('li');
        toolsList.appendChild(li);
        var img = new Image();
        li.appendChild(img);
        img.src = chrome.extension.getURL('assets/imgs/download.svg');
        li.onclick = function () {
            var startX = parseInt(_this.previewBox.getAttribute('startX'));
            var startY = parseInt(_this.previewBox.getAttribute('startY'));
            var endX = startX + _this.previewBox.clientWidth;
            var endY = startY + _this.previewBox.clientHeight;
            var canvas = Snapshot.cropCanvas(_this.canvas, { x: startX, y: startY }, { x: endX, y: endY });
            canvas.toBlob((function (blob) {
                var url = window.URL;
                var a = document.createElement('a');
                a.download = new Date().getTime() + ".png";
                a.href = url.createObjectURL(blob);
                a.dataset.downloadurl = ['png', a.download, a.href].join(':');
                a.click();
                _this.destroySnapshot();
                generaPageContent.genBubbleMsg('已保存图片');
            }));
        };
        li = document.createElement('li');
        toolsList.appendChild(li);
        img = new Image();
        li.appendChild(img);
        img.src = chrome.extension.getURL('assets/imgs/ok.svg');
        li.onclick = function () {
            var startX = parseInt(_this.previewBox.getAttribute('startX'));
            var startY = parseInt(_this.previewBox.getAttribute('startY'));
            var endX = startX + _this.previewBox.clientWidth;
            var endY = startY + _this.previewBox.clientHeight;
            var canvas = Snapshot.cropCanvas(_this.canvas, { x: startX, y: startY }, { x: endX, y: endY });
            var data = canvas.toDataURL('image/png');
            var img = new Image();
            _this.father.appendChild(img);
            img.src = data;
            var dpr = window.devicePixelRatio || 1;
            img.style.transform = "scale(" + (2 - dpr) + ")";
            var range = document.createRange();
            var selection = document.getSelection();
            range.selectNode(img);
            selection.removeAllRanges();
            selection.addRange(range);
            document.execCommand('copy');
            _this.destroySnapshot();
            generaPageContent.genBubbleMsg('图片已复制');
            setTimeout(function () { return generaPageContent.genBubbleMsg('注意,在富文本编辑器中才能粘贴哦'); }, 500);
        };
    };
    Snapshot.prototype.event = function () {
        var _this = this;
        if (this.cover) {
            this.cover.addEventListener('mousedown', function (e) {
                if (!_this.isClickBegun) {
                    _this.isClickBegun = true;
                    _this.genPreviewBox(e.offsetX, e.offsetY);
                    _this.genBgCover();
                }
            });
            this.cover.onmousemove = function (e) {
                if (_this.previewBox && _this.isClickBegun) {
                    var x = parseInt(_this.previewBox.getAttribute('startX'));
                    var y = parseInt(_this.previewBox.getAttribute('startY'));
                    var offsetX = e.offsetX - x;
                    var offsetY = e.offsetY - y;
                    if (offsetX < 0) {
                        _this.previewBox.style.left = x - Math.abs(offsetX) + "px";
                    }
                    if (offsetY < 0) {
                        _this.previewBox.style.top = y - Math.abs(offsetY) + "px";
                    }
                    _this.previewBox.style.width = Math.abs(offsetX) + "px";
                    _this.previewBox.style.height = Math.abs(offsetY) + "px";
                    if (_this.statusBar) {
                        _this.statusBar.innerText = "(" + Math.abs(e.offsetX) + ", " + Math.abs(e.offsetY) + ")";
                    }
                    _this.genBgCover();
                }
            };
            this.cover.onmouseup = function (e) {
                var x = parseInt(_this.previewBox.getAttribute('startX'));
                var y = parseInt(_this.previewBox.getAttribute('startY'));
                var offsetX = e.offsetX - x;
                var offsetY = e.offsetY - y;
                if (offsetX < 0) {
                    _this.previewBox.setAttribute('startX', e.offsetX.toString());
                }
                if (offsetY < 0) {
                    _this.previewBox.setAttribute('startY', e.offsetY.toString());
                }
                _this.isClickBegun = false;
                _this.cover.remove();
                _this.previewBox.onmousedown = function (e) {
                    _this.previewBox.setAttribute('mouseDownX', e.offsetX.toString());
                    _this.previewBox.setAttribute('mouseDownY', e.offsetY.toString());
                    _this.previewBox.setAttribute('mouseDown', '1');
                };
                _this.previewBox.onmousemove = function (e) {
                    if (_this.previewBox.getAttribute('mouseDown') !== '1') {
                        return;
                    }
                    var startX = parseInt(_this.previewBox.getAttribute('startX'));
                    var startY = parseInt(_this.previewBox.getAttribute('startY'));
                    var mode = 'move';
                    var offsetX = parseInt(_this.previewBox.getAttribute('mouseDownX'));
                    var offsetY = parseInt(_this.previewBox.getAttribute('mouseDownY'));
                    if (!offsetX || !offsetY) {
                        return;
                    }
                    if (mode === 'move') {
                        var leftOffset = startX + e.offsetX - offsetX;
                        var topOffset = startY + e.offsetY - offsetY;
                        _this.previewBox.style.top = topOffset + "px";
                        _this.previewBox.style.left = leftOffset + "px";
                        _this.genBgCover();
                        _this.previewBox.setAttribute('startX', leftOffset.toString());
                        _this.previewBox.setAttribute('startY', topOffset.toString());
                        _this.statusBar.innerText = "(" + Math.abs(leftOffset) + ", " + Math.abs(topOffset) + ")";
                    }
                    else if (mode === 'resize') {
                    }
                };
                _this.previewBox.onmouseup = function (e) {
                    _this.previewBox.setAttribute('mouseDown', '0');
                    var offsetX = parseInt(_this.previewBox.getAttribute('mouseDownX'));
                    var offsetY = parseInt(_this.previewBox.getAttribute('mouseDownY'));
                    if (!offsetX || !offsetY) {
                        return;
                    }
                    var startX = parseInt(_this.previewBox.getAttribute('startX'));
                    var startY = parseInt(_this.previewBox.getAttribute('startY'));
                    var leftOffset = startX + e.offsetX - offsetX;
                    var topOffset = startY + e.offsetY - offsetY;
                    _this.previewBox.setAttribute('startX', leftOffset.toString());
                    _this.previewBox.setAttribute('startY', topOffset.toString());
                };
                _this.previewBox.onmouseenter = function () {
                    _this.previewBox.style.cursor = 'move';
                };
                _this.previewBox.onmouseleave = function () {
                    _this.previewBox.setAttribute('mouseDown', '0');
                };
            };
        }
    };
    Snapshot.cropCanvas = function (canvas, start, end) {
        var dpr = window.devicePixelRatio || 1;
        var ctx = canvas.getContext('2d');
        var imageData = ctx.getImageData(start.x * dpr, start.y * dpr, end.x * dpr, end.y * dpr);
        var newCanvas = document.createElement('canvas');
        newCanvas.width = (end.x - start.x) * dpr;
        newCanvas.height = (end.y - start.y) * dpr;
        var newCtx = newCanvas.getContext('2d');
        newCtx.putImageData(imageData, 0, 0);
        return newCanvas;
    };
    Snapshot.prototype.destroySnapshot = function () {
        var id = this.father.id;
        this.father.remove();
        try {
            document.querySelectorAll('iframe').forEach(function (item) {
                var element = item.contentWindow.document.getElementById(id);
                if (element)
                    element.remove();
            });
        }
        catch (e) {
            console.error(e);
        }
    };
    Snapshot.bgCoverId = 'bgCover-snapshot-EvinK';
    Snapshot.highestZIndex = 2147483645;
    return Snapshot;
}());
//# sourceMappingURL=snapshot.js.map