
# Getting Started

Lightbox SDK is a comprehensive npm library designed to make it easy to handle iframes within your app in the form of modals. It allows you to create, manipulate, and control iframes efficiently and effectively.

It can be easily used by following a few steps. You can open a lightbox simply by providing the destination URL, or you have the option to configure it in more detail if needed, as it provides a number of features that allow you to interact with the iframe in different ways. For example, you can set some styles of the iframe, hide the close button, close it directly, and most interestingly, emit custom events. 

Additionally the page that is displayed inside the lightbox does not need to install the library! 
[know more about it](/use-without-installation).

## Table of contents
[[toc]]

## Install Lightbox SDK

Using the package manager to install:

::: code-group

```bash [npm]
npm install -D @placetopay/lightbox-sdk
```

```bash [yarn]
yarn add -D @placetopay/lightbox-sdk
```

:::

## Usage Instructions

To effectively use the LightboxSDK, follow these simple steps:

### Import the styles

It is very important to import this CSS file when using the library, they are essential to ensure that the lightbox has the expected look and feel, however, if preferred, it is also possible to override these styles with custom styles after import, to tailor the look and feel of the lightbox. appearance of the lightbox to the specific needs of your website.

```js
import '@placetopay/lightbox-sdk/dist/styles.css';
```

### Step-by-step Usage

Import the LightboxSdk library and initialize it with your target URL. Then, use the open() method to open the Lightbox. Here's a code example:

```js
import { createLightbox } from '@placetopay/lightbox-sdk';

const lightbox = createLightbox('https://your-target-url.com');
lightbox.open();
```

### Inline Usage

Alternatively, if you prefer a more succinct approach, you can initialize and open the lightbox inline:

::: code-group

```js [With chain]
import { createLightbox } from '@placetopay/lightbox-sdk';

createLightbox('https://your-target-url.com').open();
```

```js [With option]
import { createLightbox } from '@placetopay/lightbox-sdk';

createLightbox('https://your-target-url.com', { launch: true });
```

:::

::: info
With this in mind, ensure to replace `'https://your-target-url.com'` with your actual target URL.
:::
