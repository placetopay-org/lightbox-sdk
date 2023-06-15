# Lightbox-sdk
Lightbox SDK is a comprehensive npm library designed to facilitate the creation and manipulation of iframes within your application in the form of modals.

# Usage Instructions

To effectively use the LightboxSDK, follow these simple steps:

## Step-by-step Usage
Import the LightboxSdk library and initialize it with your target URL. Then, use the open() method to open the Lightbox. Here's a code example:

```javascript
import { LightboxSdk } from '@placetopay/lightbox-sdk';

const lightbox = new LightboxSdk('https://your-target-url.com');
lightbox.open();
```

## Inline Usage

Alternatively, if you prefer a more succinct approach, you can initialize and open the lightbox inline:

```javascript
import { LightboxSdk } from '@placetopay/lightbox-sdk';

new LightboxSdk('https://your-target-url.com').open();
```

With this in mind, ensure to replace `'https://your-target-url.com'` with your actual target URL.