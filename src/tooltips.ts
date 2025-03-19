type Settings = {
    /** @default 300 */
    tooltipWidth: number;
    /** @default "custom-tooltip" */
    tooltipHTMLTag: string;
};

type PointerEventLike = PointerEvent | MouseEvent | TouchEvent;

type CacheData = { textFn: () => string; mousemove: (evt: PointerEventLike) => void; mouseleave: () => void };

// eslint-disable-next-line @typescript-eslint/no-unused-vars -- This is an ambient declaration
class TooltipHelper {
    readonly #settings: Settings;
    readonly #tooltipData = {
        cache: new WeakMap<HTMLElement, CacheData>(),
        maxDepth: 0,
        currentElem: null as HTMLElement | null,
    };
    #tooltipElement!: HTMLElement;

    public constructor(settings: Partial<Settings> = {}) {
        this.#settings = {
            tooltipWidth: settings.tooltipWidth ?? 300,
            tooltipHTMLTag: settings.tooltipHTMLTag ?? "custom-tooltip",
        };
        this.#createTooltipElement();
        document.body.addEventListener("mousemove", (evt) => {
            if (
                this.#tooltipData.currentElem === null ||
                !this.#getEventPath(evt).includes(this.#tooltipData.currentElem)
            ) {
                this.#tooltipData.maxDepth = 0;
                this.#tooltipData.currentElem = null;
                this.#tooltipElement.style.opacity = "0";
            }
        });
        document.body.addEventListener("touchmove", (evt) => {
            if (
                this.#tooltipData.currentElem === null ||
                !this.#getEventPath(evt).includes(this.#tooltipData.currentElem)
            ) {
                this.#tooltipData.maxDepth = 0;
                this.#tooltipData.currentElem = null;
                this.#tooltipElement.style.opacity = "0";
            }
        });
    }

    public setTooltip(target: HTMLElement, textFn: (() => string) | string): void {
        const eventListenersAdded = this.#tooltipData.cache.has(target);
        this.#tooltipData.cache.set(target, {
            textFn: typeof textFn === "function" ? textFn : (): string => textFn,
            mousemove: (evt) => {
                if (this.#getEventPath(evt).length > this.#tooltipData.maxDepth) {
                    this.#tooltipData.maxDepth = this.#getEventPath(evt).length;
                    this.#tooltipData.currentElem = target;
                    this.#makeTooltipVisible(target);
                }
            },
            mouseleave: () => {
                if (this.#tooltipData.currentElem === target) {
                    this.#tooltipData.maxDepth = 0;
                    this.#tooltipData.currentElem = null;
                }
                this.#tooltipElement.style.opacity = "0";
            },
        });
        if (eventListenersAdded) {
            return;
        }
        target.style.setProperty("pointer-events", "auto", "important");
        target.addEventListener("mouseenter", this.#tooltipData.cache.get(target)!.mousemove);
        target.addEventListener("mousemove", this.#tooltipData.cache.get(target)!.mousemove);
        target.addEventListener("mouseleave", this.#tooltipData.cache.get(target)!.mouseleave);
        target.addEventListener("touchstart", this.#tooltipData.cache.get(target)!.mousemove);
        target.addEventListener("touchend", this.#tooltipData.cache.get(target)!.mouseleave);
        target.addEventListener("touchcancel", this.#tooltipData.cache.get(target)!.mouseleave);
    }

    #makeTooltipVisible(target: HTMLElement): void {
        if (this.#tooltipData.currentElem !== target || !this.#tooltipData.cache.has(target)) {
            return;
        }
        if (!this.#doesTooltipExist()) {
            this.#createTooltipElement();
        }
        this.#tooltipElement.innerText = this.#tooltipData.cache.get(target)!.textFn();
        if (this.#tooltipElement.innerText.length === 0) {
            this.#tooltipElement.style.opacity = "0";
        }
        window.requestAnimationFrame(() => {
            if (this.#tooltipData.currentElem !== target) {
                return;
            }
            this.#makeTooltipVisible(target);
            if (this.#tooltipElement.innerText.length === 0) {
                return;
            }
            this.#tooltipElement.style.opacity = "1";
            const tooltipRect = this.#tooltipElement.getBoundingClientRect();
            const targetRect = this.#getAbsoluteBoundingRect(target);
            if (targetRect.top - tooltipRect.height - 15 > document.documentElement.scrollTop) {
                this.#tooltipElement.style.top = `${targetRect.top - tooltipRect.height - 15}px`;
            } else {
                this.#tooltipElement.style.top = `${targetRect.bottom + 15}px`;
            }
            let tooltipCenter = Math.round(targetRect.left + targetRect.width / 2);
            if (document.documentElement.scrollWidth > this.#settings.tooltipWidth) {
                if (tooltipCenter + this.#settings.tooltipWidth / 2 > document.documentElement.scrollWidth) {
                    tooltipCenter +=
                        document.documentElement.scrollWidth - (tooltipCenter + this.#settings.tooltipWidth / 2);
                }
                if (tooltipCenter - this.#settings.tooltipWidth / 2 < 0) {
                    tooltipCenter += 0 - (tooltipCenter - this.#settings.tooltipWidth / 2);
                }
            }
            this.#tooltipElement.style.left = `${tooltipCenter - this.#settings.tooltipWidth / 2}px`;
        });
    }

    public getTooltip(target: HTMLElement): string | null {
        const data = this.#tooltipData.cache.get(target);
        return data?.textFn() ?? null;
    }

    public removeTooltip(target: HTMLElement): void {
        if (this.#tooltipData.cache.has(target)) {
            target.removeEventListener("mouseenter", this.#tooltipData.cache.get(target)!.mousemove);
            target.removeEventListener("mousemove", this.#tooltipData.cache.get(target)!.mousemove);
            target.removeEventListener("mouseleave", this.#tooltipData.cache.get(target)!.mouseleave);
            target.removeEventListener("touchstart", this.#tooltipData.cache.get(target)!.mousemove);
            target.removeEventListener("touchend", this.#tooltipData.cache.get(target)!.mouseleave);
            target.removeEventListener("touchcancel", this.#tooltipData.cache.get(target)!.mouseleave);
            this.#tooltipData.cache.delete(target);
        }
    }

    #getAbsoluteBoundingRect(elem: HTMLElement): Omit<DOMRect, "x" | "y" | "toJSON"> {
        const rect = elem.getBoundingClientRect();
        const scrollLeft = window.pageXOffset !== 0 ? window.pageXOffset : document.documentElement.scrollLeft;
        const scrollTop = window.pageYOffset !== 0 ? window.pageYOffset : document.documentElement.scrollTop;
        return {
            width: rect.width,
            height: rect.height,
            top: rect.top + scrollTop,
            right: rect.right + scrollLeft,
            bottom: rect.bottom + scrollTop,
            left: rect.left + scrollLeft,
        };
    }

    #getEventPath(evt: PointerEventLike): HTMLElement[] {
        return evt.composedPath() as HTMLElement[];
    }

    #doesTooltipExist(): boolean {
        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition -- Technically this can be uninitialized but the types say it's required because it's easier to work with internally and I know where it can be undefined.
        return this.#tooltipElement?.parentElement instanceof HTMLElement;
    }

    #createTooltipElement(): void {
        const elem = document.createElement(this.#settings.tooltipHTMLTag);
        const style = elem.style;
        // A lot of these seem redundant, but they are to override any styles the page might have which conflict with the tooltip.
        style.backgroundColor = "rgba(17,17,17)";
        style.borderRadius = "4px";
        style.color = "white";
        style.fontSize = "13px";
        style.fontWeight = "normal";
        style.padding = "0.5em 1em";
        style.boxSizing = "border-box";
        style.zIndex = "99999999";
        style.fontFamily = "monospace";
        style.position = "absolute";
        style.pointerEvents = "none";
        style.textAlign = "left";
        style.whiteSpace = "pre-wrap";
        style.width = `${this.#settings.tooltipWidth}px`;
        style.transform = "translate3d(0,0,0)";
        style.backfaceVisibility = "hidden";
        style.opacity = "0";
        style.boxShadow = "white 0px 0px 5px 0px inset";
        document.body.appendChild(elem);
        this.#tooltipElement = elem;
    }
}
