class TooltipHelper {
    constructor(settings) {
        settings = settings || {};
        this.settings = {
            tooltipWidth: settings.tooltipWidth || 300,
            tooltipHTMLTag: settings.tooltipHTMLTag || "custom-tooltip"
        };
        this.tooltipData = {
            cache: new WeakMap(),
            maxDepth: 0,
            currentElem: null
        };
        this._createTooltipElement();
        document.body.addEventListener("mousemove", (evt) => {
            if (this._getEventPath(evt)[0] !== this.tooltipData.currentElem) {
                this.tooltipData.maxDepth = 0;
                this.tooltipData.currentElem = null;
                this.tooltipElement.style.opacity = "0";
            }
        });
    }

    setTooltip(target, text) {
        const eventListenersAdded = this.tooltipData.cache.has(target);
        this.tooltipData.cache.set(target, {
            text: text,
            mousemove: (evt) => {
                if (this._getEventPath(evt).length > this.tooltipData.maxDepth) {
                    this.tooltipData.maxDepth = this._getEventPath(evt).length;
                    this.tooltipData.currentElem = target;
                    this._makeTooltipVisible(target);
                }
            },
            mouseleave: () => {
                if (this.tooltipData.currentElem === target) {
                    this.tooltipData.maxDepth = 0;
                    this.tooltipData.currentElem = null;
                }
                this.tooltipElement.style.opacity = "0";
            }
        });
        if (eventListenersAdded) {
            return;
        }
        target.style.setProperty("pointer-events", "auto", "important");
        target.addEventListener("mouseenter", this.tooltipData.cache.get(target).mousemove);
        target.addEventListener("mousemove", this.tooltipData.cache.get(target).mousemove);
        target.addEventListener("mouseleave", this.tooltipData.cache.get(target).mouseleave);
    }

    _makeTooltipVisible(target) {
        if (!this._doesTooltipExist()) {
            this._createTooltipElement();
        }
        this.tooltipElement.innerText = this.tooltipData.cache.get(target).text;
        window.requestAnimationFrame(() => {
            this.tooltipElement.style.opacity = "1";
            const tooltipRect = this.tooltipElement.getBoundingClientRect();
            const targetRect = this._getAbsoluteBoundingRect(target);
            if (targetRect.top - tooltipRect.height - 15 > 0) {
                this.tooltipElement.style.top = (targetRect.top - tooltipRect.height - 15) + "px";
            } else {
                this.tooltipElement.style.top = (targetRect.bottom + 15) + "px";
            }
            let tooltipCenter = Math.round(targetRect.left + targetRect.width / 2);
            if (document.documentElement.scrollWidth > this.settings.tooltipWidth) {
                if (tooltipCenter + this.settings.tooltipWidth / 2 > document.documentElement.scrollWidth) {
                    tooltipCenter += document.documentElement.scrollWidth - (tooltipCenter + this.settings.tooltipWidth / 2);
                }
                if (tooltipCenter - this.settings.tooltipWidth / 2 < 0) {
                    tooltipCenter += 0 - (tooltipCenter - this.settings.tooltipWidth / 2);
                }
            }
            this.tooltipElement.style.left = (tooltipCenter - this.settings.tooltipWidth / 2) + "px";
        });
    }

    getTooltip(target) {
        const data = this.tooltipData.cache.get(target);
        return data ? data.text : null;
    }

    removeTooltip(target) {
        if (this.tooltipData.cache.get(target)) {
            target.removeEventListener("mouseenter", this.tooltipData.cache.get(target).mousemove);
            target.removeEventListener("mousemove", this.tooltipData.cache.get(target).mousemove);
            target.removeEventListener("mouseleave", this.tooltipData.cache.get(target).mouseleave);
            this.tooltipData.cache.delete(target);
        }
    }

    _getAbsoluteBoundingRect(elem) {
        const rect = elem.getBoundingClientRect();
        const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return {
            width: rect.width,
            height: rect.height,
            top: rect.top + scrollTop,
            right: rect.right + scrollLeft,
            bottom: rect.bottom + scrollTop,
            left: rect.left + scrollLeft
        };
    }

    _getEventPath(evt) {
        let path = evt.path || (evt.composedPath && evt.composedPath());
        if (!path) {
            path = [];
            let node = evt.target;
            while (node) {
                let parent = null;
                if (node.parentNode) {
                    parent = node.parentNode;
                } else if (node.host) {
                    parent = node.host;
                } else if (node.defaultView) {
                    parent = node.defaultView;
                } else {
                    break;
                }
                path.push(parent);
                node = parent;
            }
        }
        return path;
    }

    _doesTooltipExist() {
        return this.tooltipElement.parentElement !== null;
    }

    _createTooltipElement() {
        const elem = document.createElement(this.settings.tooltipHTMLTag);
        elem.style.cssText = `
            background-color: rgba(17,17,17);
            border-radius: 4px;
            color: #ffffff;
            font-size: 13px;
            font-weight: normal;
            padding: 0.5em 1em;
            box-sizing: border-box;
            z-index: 99999999;
            font-family: monospace;
            position: absolute;
            pointer-events: none;
            text-align: left;
            white-space: pre-wrap;
            width: ${this.settings.tooltipWidth}px;
            transform: translate3d(0,0,0);
            -webkit-backface-visibility: hidden;
            backface-visibility: hidden;
            opacity: 0;
            box-shadow: #ffffff 0px 0px 5px 0px inset;
        `;
        document.body.appendChild(elem);
        this.tooltipElement = elem;
    }
}