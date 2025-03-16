# Tooltips

Simple tooltips which can be injected into pages without conflicts. Tooltips are displayed on hover and will adjust left/right top/bottom to try to fit on the page.

This library is designed to be used in TamperMonkey/GreaseMonkey UserScripts and browser extensions which inject code into other pages. This library has been designed in such a way that it should be compatible and not cause conflicts with the host page regardless of their code. This library is even defined to not conflict with itself so multiple instances of it can be added to a single page and they'll stay separate.

Note: This script is not compatible with older browsers that do not support ES2022. For the intended use-case of browser extensions, this should never be an issue.

## Installation

If you would like to add this to a webpage you own, download [tooltips.js](dist/tooltips.js) and include the following script tag on your HTML page.

```html
<script src="tooltips.js"></script>
```

If you are using this in a UserScript, copy/paste the code from [tooltips.min.js](dist/tooltips.min.js) to the top of your script.

## Basic Usage

```js
const tooltipHelper = new TooltipHelper();
const elem = document.getElementById("target");
tooltipHelper.setTooltip(
    elem,
    "This is the text you want to display.\n\tThis tooltip is formatted into multiple lines."
);

console.log(tooltipHelper.getTooltip(elem)); // Returns the tooltip text

tooltipHelper.setTooltip(elem, "Text can be changed at any time");

tooltipHelper.setTooltip(document.getElementById("another-target"), "You can define as many tooltips as you'd like.");

tooltipHelper.removeTooltip(elem);

tooltipHelper.setTooltip(elem, () => {
    // This will be called every frame while the tooltip is visible to make it easy to update text dynamically
    return new Date().toLocaleString();
});
```

## Full API

```ts
type Settings = {
    /** @default 300 */
    tooltipWidth: number;
    /** @default "custom-tooltip" */
    tooltipHTMLTag: string;
};
declare class TooltipHelper {
    constructor(settings?: Partial<Settings>);
    setTooltip(target: HTMLElement, textFn: (() => string) | string): void;
    getTooltip(target: HTMLElement): string | null;
    removeTooltip(target: HTMLElement): void;
}
```
