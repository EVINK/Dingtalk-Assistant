var Snapshot = (function () {
    function Snapshot() {
        this.isClickBegun = false;
        console.log('init snapshot js');
        document.body.append(Snapshot.father);
        this.genBgCover();
        this.event();
    }
    Snapshot.prototype.genCoverStyle = function (data) {
        var top = data.top;
        var left = data.left;
        var width = data.width;
        var height = data.height;
        if (!top)
            top = 0;
        if (!left)
            left = 0;
        var realWidth, realHeight;
        if (!width)
            realWidth = '100vw';
        else
            realWidth = width + "px";
        if (!height)
            realHeight = document.body.clientHeight + "px";
        else
            realHeight = height + "px";
        return "\n            margin: 0;\n            padding: 0;\n            position: fixed;\n            top: " + top + "px;\n            left: " + left + "px;\n            width: " + realWidth + ";\n            height: " + realHeight + ";\n            background: #0000008f;\n            z-index: " + Snapshot.highestZIndex + ";\n            ";
    };
    Snapshot.prototype.genBgCover = function () {
        if (!this.previewBox) {
            var element = document.getElementById(Snapshot.bgCoverId);
            if (element)
                return element;
            element = document.createElement("div");
            element.id = Snapshot.bgCoverId;
            element.setAttribute('style', "\n            position: fixed;\n            top: 0;\n            left: 0;\n            width: 100vw;\n            height: " + document.body.clientHeight + "px;\n            background: #0000008f;\n            z-index: " + (Snapshot.highestZIndex + 2) + ";\n            cursor: crosshair;\n            ");
            Snapshot.father.append(element);
            this.cover = element;
        }
        else {
            if (this.cover.style.background)
                this.cover.style.removeProperty('background');
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
                Snapshot.father.append(this.coverLeft);
            }
            if (!this.coverRight) {
                this.coverRight = document.createElement('div');
                this.coverRight.id = coverRightId;
                Snapshot.father.append(this.coverRight);
            }
            if (!this.coverTop) {
                this.coverTop = document.createElement('div');
                this.coverTop.id = coverTopId;
                Snapshot.father.append(this.coverTop);
            }
            if (!this.coverBottom) {
                this.coverBottom = document.createElement('div');
                this.coverBottom.id = coverBottomId;
                Snapshot.father.append(this.coverBottom);
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
    ;
    Snapshot.prototype.genPreviewBox = function (x, y) {
        this.previewBox = document.createElement('div');
        this.previewBox.setAttribute('startX', x.toString());
        this.previewBox.setAttribute('startY', y.toString());
        this.previewBox.setAttribute('id', 'dt-preview');
        this.previewBox.setAttribute('style', "\n        width: 1px;\n        height: 1px;    \n        border: 2px dashed gray;\n        background: transparent;\n        position: fixed;\n        top: " + y + "px;\n        left: " + x + "px;\n        z-index: " + (Snapshot.highestZIndex + 1) + ";\n        cursor: move;\n        ");
        Snapshot.father.append(this.previewBox);
        this.statusBar = document.createElement('div');
        this.previewBox.append(this.statusBar);
        this.statusBar.setAttribute('style', "\n        position: absolute;\n        top: -25px;\n        left: 0;\n        display: inline-block;\n        text-indent: 10px;\n        width: 87px;\n        line-height: 22px;\n        background: black;\n        color: white;\n        border-radius: 10px;\n        ");
        this.statusBar.innerText = '(1, 1)';
        this.previewBoxToolsBar = document.createElement('div');
        this.previewBox.append(this.previewBoxToolsBar);
        this.previewBoxToolsBar.setAttribute('style', "\n        position: absolute;\n        bottom: -35px;\n        right: 0;\n        display: block;\n        min-width: 200px;\n        width: 70%;\n        height: 35px;\n        background: black;\n        color: white;\n        border-radius: 10px;\n        ");
    };
    Snapshot.prototype.event = function () {
        var _this = this;
        if (this.cover) {
            this.cover.addEventListener('mousedown', function (e) {
                if (!_this.isClickBegun) {
                    _this.isClickBegun = true;
                    _this.genPreviewBox(e.pageX, e.pageY);
                    _this.genBgCover();
                }
            });
            this.cover.onmousemove = function (e) {
                if (_this.previewBox && _this.isClickBegun) {
                    var x = parseInt(_this.previewBox.getAttribute('startX'));
                    var y = parseInt(_this.previewBox.getAttribute('startY'));
                    var offsetX = e.pageX - x;
                    var offsetY = e.pageY - y;
                    var pattern = 0;
                    if (offsetX < 0) {
                        _this.previewBox.style.left = x - Math.abs(offsetX) + "px";
                        pattern += 1;
                    }
                    if (offsetY < 0) {
                        _this.previewBox.style.top = y - Math.abs(offsetY) + "px";
                        pattern += 1;
                    }
                    _this.previewBox.style.width = Math.abs(offsetX) + "px";
                    _this.previewBox.style.height = Math.abs(offsetY) + "px";
                    if (_this.statusBar) {
                        _this.statusBar.innerText = "(" + Math.abs(offsetX) + ", " + Math.abs(offsetY) + ")";
                    }
                    _this.genBgCover();
                }
            };
            this.cover.onmouseup = function (e) {
                var x = parseInt(_this.previewBox.getAttribute('startX'));
                var y = parseInt(_this.previewBox.getAttribute('startY'));
                var offsetX = e.pageX - x;
                var offsetY = e.pageY - y;
                if (offsetX < 0) {
                    _this.previewBox.setAttribute('startX', e.pageX.toString());
                }
                if (offsetY < 0) {
                    _this.previewBox.setAttribute('startY', e.pageY.toString());
                }
                _this.isClickBegun = false;
                _this.cover.remove();
                _this.previewBox.onmousedown = function (e) {
                    _this.previewBox.setAttribute('mouseDownX', e.pageX.toString());
                    _this.previewBox.setAttribute('mouseDownY', e.pageY.toString());
                    _this.previewBox.setAttribute('mouseDown', '1');
                };
                _this.previewBox.onmousemove = function (e) {
                    if (_this.previewBox.getAttribute('mouseDown') !== '1')
                        return;
                    var startX = parseInt(_this.previewBox.getAttribute('startX'));
                    var startY = parseInt(_this.previewBox.getAttribute('startY'));
                    var mode = 'move';
                    var offsetX = parseInt(_this.previewBox.getAttribute('mouseDownX'));
                    var offsetY = parseInt(_this.previewBox.getAttribute('mouseDownY'));
                    if (!offsetX || !offsetY)
                        return;
                    if (mode === 'move') {
                        var leftOffset = startX + e.pageX - offsetX;
                        var topOffset = startY + e.pageY - offsetY;
                        _this.previewBox.style.top = topOffset + "px";
                        _this.previewBox.style.left = leftOffset + "px";
                        _this.genBgCover();
                    }
                    else if (mode === 'resize') {
                    }
                };
                _this.previewBox.onmouseup = function (e) {
                    _this.previewBox.setAttribute('mouseDown', '0');
                    var offsetX = parseInt(_this.previewBox.getAttribute('mouseDownX'));
                    var offsetY = parseInt(_this.previewBox.getAttribute('mouseDownY'));
                    if (!offsetX || !offsetY)
                        return;
                    var startX = parseInt(_this.previewBox.getAttribute('startX'));
                    var startY = parseInt(_this.previewBox.getAttribute('startY'));
                    var leftOffset = startX + e.pageX - offsetX;
                    var topOffset = startY + e.pageY - offsetY;
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
    Snapshot.prototype.destroySnapshot = function () {
    };
    Snapshot.bgCoverId = 'bgCover';
    Snapshot.highestZIndex = 2147483645;
    Snapshot.father = document.createElement('div');
    return Snapshot;
}());
//# sourceMappingURL=snapshot.js.map