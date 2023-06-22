# Using Lightbox SDK Without Installation

If you wish to use the Lightbox SDK library without installing it, you can do so thanks to the messaging interface it provides. This functionality is based on the `postMessage` method from JavaScript's `window` API. Instead of directly calling the library's functions, you can send messages from the iframe, which the library will interpret.

::: warning
Please note that this approach is only suitable for the page inside the lightbox iframe. If you're looking to create and control the lightbox from your parent page, the Lightbox SDK library must be installed.
:::

## Message Structure

The basic structure of the messages you send should be as follows:

- **Type**

  ```ts
  parent.postMessage({ type: string; payload: any }, '*')
  ```

- **Details**

  Here, `type` is the name of the event you want to trigger and `payload` is any additional data you want to pass to the event handler.

- **Example**

  ```js
  parent.postMessage({ type: 'close' }, '*')
  ```

## Reserved Types

The Lightbox SDK library reserves certain event types for internal functions. Using these types will trigger the associated predefined actions, rather than invoking a callback of the same name. The reserved types are as follows:

- **lightbox:close**: Triggers the lightbox to close.
- **lightbox:sendStyles**: Requests for new styles to be applied to the lightbox.
- **lightbox:hideCloseButton**: Hides the manual close button of the lightbox.

## Predefined Actions

Given the reservation of certain event types, you can trigger predefined actions by sending a message with the corresponding event type. For example, to close the lightbox, you can send the following message:

```js
parent.postMessage({ type: 'lightbox:close' }, '*')
```

This will result in the lightbox closing. This approach can be used to interact with the Lightbox SDK library without needing to install it directly into your code.