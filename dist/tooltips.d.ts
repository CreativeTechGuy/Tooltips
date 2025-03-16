type Settings = {
    /** @default 300 */
    tooltipWidth: number;
    /** @default "custom-tooltip" */
    tooltipHTMLTag: string;
};
type PointerEventLike = PointerEvent | MouseEvent | TouchEvent;
type CacheData = {
    textFn: () => string;
    mousemove: (evt: PointerEventLike) => void;
    mouseleave: () => void;
};
declare class TooltipHelper {
    #private;
    constructor(settings?: Partial<Settings>);
    setTooltip(target: HTMLElement, textFn: (() => string) | string): void;
    getTooltip(target: HTMLElement): string | null;
    removeTooltip(target: HTMLElement): void;
}
