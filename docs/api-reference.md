# API Reference

## init()

Initializes the lightbox with a specified URL and options, returns an instance of the lightbox.

- **Type**

  ```ts
  function init(url: string, options?: InitOptions): LightboxInstance
  ```

- **Details**

  The first argument is the target Url. The second optional argument is the options to be passed to the lightbox instance.

- **Example**

  ```js
  import { LightboxSdk } from '@placetopay/lightbox-sdk';

  const lightbox = LightboxSdk('https://checkout.placetopay.com/')
  ```

- **See also** [Guide - Getting Started - Usage instructions](/getting-started#usage-instructions)
