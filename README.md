# Tooltips

Simple tooltips which can be injected into pages without conflicts. Tooltips are displayed on hover and will adjust left/right top/bottom to try to fit on the page.

This library is designed to be used in TamperMonkey/GreaseMonkey UserScripts and browser extensions which inject code into other pages. This library has been designed in such a way that it should be compatible and not cause conflicts with the host page regardless of their code. This library is even defined to not conflict with itself so multiple instances of it can be added to a single page and they'll stay separate.

Note: This script is not compatible with older browsers that do not support ES6. For the intended use-case of browser extensions, this should never be an issue.

## Installation

If you would like to add this to a webpage you own, download [Tooltips.js](Tooltips.js) and include the following script tag on your HTML page.

```html
<script src="Tooltips.js"></script>
```

If you are using this in a UserScript, copy/paste the code from [Tooltips.min.js](Tooltips.min.js) to the top of your script.

## Basic Usage

```js
const tooltipHelper = new TooltipHelper();
const elem = document.getElementById("target");
tooltipHelper.setTooltip(elem, "This is the text you want to display.\n\tThis tooltip is formatted into multiple lines.");

console.log(tooltipHelper.getTooltip(elem)); // Returns the tooltip text

tooltipHelper.setTooltip(elem, "Text can be changed at any time");

tooltipHelper.setTooltip(document.getElementById("another-target"), "You can define as many tooltips as you'd like.");

tooltipHelper.removeTooltip(elem);
```

## Advanced Usage

```js
const tooltipHelper = new TooltipHelper({
    tooltipWidth: YOUR_WIDTH || 300,
    tooltipHTMLTag: YOUR_CUSTOM_TAG_NAME || "custom-tooltip"
});
```