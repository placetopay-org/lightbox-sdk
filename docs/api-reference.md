# API Reference

## Functions

### createLightbox()

Initializes the lightbox with a specified URL and options, returns an instance of the lightbox.

- **Type**

  ```ts
  function createLightbox(url: string, options?: InitialOptions): LightboxInstance
  ```

- **Parameters**
  - `url` (string): The target URL to load in the lightbox
  - `options` (InitialOptions, optional): Configuration options for the lightbox

- **Returns**
  - `LightboxInstance`: An instance of the lightbox with methods and properties

- **Example**

  ```js
  import { createLightbox } from '@placetopay/lightbox-sdk';

  // Basic usage
  const lightbox = createLightbox('https://checkout.placetopay.com/');

  // With options including fallback behavior
  const lightbox = createLightbox('https://checkout.placetopay.com/', {
    id: 'my-checkout',
    closeButton: true,
    allowRedirects: true, // Only affects 'self' redirection
    backupTarget: 'popup', // Use popup for Safari/iOS fallback
    styles: {
      width: '80%',
      height: '600px',
      radius: 8
    },
    callbacks: {
      close: (payload) => console.log('Lightbox closed', payload)
    }
  });
  ```

### isInside()

Determines if the current code is running inside a lightbox iframe.

- **Type**

  ```ts
  function isInside(): boolean
  ```

- **Returns**
  - `boolean`: `true` if running inside a lightbox, `false` otherwise

- **Example**

  ```js
  import { isInside } from '@placetopay/lightbox-sdk';

  if (isInside()) {
    console.log('Running inside lightbox');
    // Handle lightbox-specific logic
  }
  ```

### updateStyles()

Updates the lightbox styles dynamically.

- **Type**

  ```ts
  function updateStyles(styles: LightboxStyles): void
  ```

- **Parameters**
  - `styles` (LightboxStyles): Object containing style properties to update

- **Example**

  ```js
  import { updateStyles } from '@placetopay/lightbox-sdk';

  updateStyles({
    backdropColor: '#000000',
    backdropOpacity: 0.8,
    width: '90%',
    height: 500
  });
  ```

### hideCloseButton()

Hides the close button of the lightbox.

- **Type**

  ```ts
  function hideCloseButton(): void
  ```

- **Example**

  ```js
  import { hideCloseButton } from '@placetopay/lightbox-sdk';

  hideCloseButton();
  ```

### emitClose()

Emits a close event with optional payload and close prevention.

- **Type**

  ```ts
  function emitClose(payload?: unknown, preventClose?: boolean): void
  ```

- **Parameters**
  - `payload` (unknown, optional): Data to send with the close event
  - `preventClose` (boolean, optional): If `true`, prevents the lightbox from actually closing

- **Example**

  ```js
  import { emitClose } from '@placetopay/lightbox-sdk';

  // Close with data
  emitClose({ status: 'completed', transactionId: '123' });

  // Emit close event without actually closing
  emitClose({ status: 'processing' }, true);
  ```

### emit()

Emits a custom event with the specified structure.

- **Type**

  ```ts
  function emit(structure: ApiStructure): void
  ```

- **Parameters**
  - `structure` (ApiStructure): Event structure containing type, payload, and prevention flag

- **Details**
  Automatically detects the communication context and uses the appropriate channel:
  - **Iframe context**: Uses `window.parent.postMessage()`
  - **Popup context**: Uses `window.opener.postMessage()`

- **Example**

  ```js
  import { emit } from '@placetopay/lightbox-sdk';

  emit({
    type: 'payment-status',
    payload: { status: 'approved', amount: 100 },
    preventClose: false
  });
  
  // Works automatically from:
  // - Lightbox iframe → sends to parent window
  // - Popup window → sends to opener window
  ```

## Types

### LightboxInstance

The main lightbox instance returned by `createLightbox()`.

```ts
type LightboxInstance = {
  id: string;
  element: HTMLElement;
  allowRedirects: boolean;
  callbacks: ClientCallbacks;
  closeButton: boolean;
  styles: LightboxStyles;
  backupTarget: BackupTarget;
  url: string;
  on: (name: string, callback: ClientCallback) => void;
  open: () => void;
  close: (payload?: unknown) => void;
  updateStyles: (styles: LightboxStyles) => void;
  hideCloseButton: () => void;
};
```

#### Methods

- `on(name, callback)`: Register an event callback
- `open()`: Open the lightbox (or fallback popup/window in Safari/iOS)
- `close(payload?)`: Close the lightbox/popup/window with optional payload
- `updateStyles(styles)`: Update lightbox styles
- `hideCloseButton()`: Hide the close button

**Note**: The `close()` method automatically handles different scenarios:
- **Normal lightbox**: Closes the iframe and removes the lightbox
- **Popup fallback**: Closes the popup window and removes the backdrop
- **Blank tab fallback**: Closes the new tab window (if still accessible)

**Event Handling**: All lightbox instances (normal, popup, blank) automatically listen for messages from the opened window/iframe, so callbacks work consistently across all fallback scenarios. The message system automatically detects the context (iframe vs popup) and uses the appropriate communication channel (`parent` for iframes, `opener` for popups).

### InitialOptions

Configuration options for creating a lightbox.

```ts
type InitialOptions = {
  id?: string;                    // Unique identifier
  element?: HTMLElement;          // Container element
  allowRedirects?: boolean;       // Allow automatic redirects
  callbacks?: ClientCallbacks;    // Event callbacks
  closeButton?: boolean;          // Show close button
  styles?: LightboxStyles;        // Custom styles
  backupTarget?: BackupTarget;    // Fallback behavior for unsupported environments
  launch?: boolean;              // Auto-launch on creation
  enforceStyles?: boolean;       // Force style application
};
```

### LightboxStyles

Style configuration for the lightbox appearance.

```ts
type LightboxStyles = {
  backdropColor?: string;        // Backdrop color
  backdropOpacity?: number;      // Backdrop opacity (0-1)
  height?: string | number;      // Lightbox height
  width?: string | number;       // Lightbox width
  radius?: number;               // Border radius
  position?: 'absolute' | 'fixed'; // CSS position
  wrapperWidth?: string | number;  // Wrapper width
  wrapperHeight?: string | number; // Wrapper height
};
```

### ClientCallbacks

Event callback functions for lightbox events.

```ts
type ClientCallbacks = Record<string, ClientCallback | undefined>;
type ClientCallback = (payload?: unknown) => void;
```

### BackupTarget

Defines fallback behavior when the lightbox cannot open normally (e.g., in Safari or iOS). This configuration is used automatically by the lightbox when it detects an unsupported environment.

```ts
type BackupTarget = 'self' | 'popup' | 'blank';
```

- `'self'` (default): Redirect to the processing URL in the same window
- `'popup'`: Open a popup window with the URL (automatically creates backdrop overlay with informative message)
- `'blank'`: Open in a new tab

**Popup Mode Features**:
- Automatically centers the popup window (512x640px)
- Creates a backdrop overlay with informative message
- Supports English and Spanish languages (auto-detected)
- Prevents background scrolling while popup is open
- Monitors popup window and cleans up when closed

**Important**: The fallback behavior is triggered automatically when the lightbox detects Safari or iOS browsers. You only need to configure the `backupTarget` option when creating the lightbox.

**allowRedirects Behavior**:
- When `allowRedirects: false` and `backupTarget: 'self'`: No redirection occurs, lightbox fails silently
- When `allowRedirects: false` and `backupTarget: 'popup'`: Popup still opens (allowRedirects is ignored)
- When `allowRedirects: false` and `backupTarget: 'blank'`: New tab still opens (allowRedirects is ignored)
- When `allowRedirects: true`: All backup targets work as expected

This allows you to prevent unwanted redirections while still allowing popup or new tab fallbacks.

### ApiStructure

Structure for custom events emitted through the lightbox.

```ts
type ApiStructure = {
  type: string;           // Event type identifier
  payload?: unknown;      // Event data
  preventClose?: boolean; // Prevent lightbox from closing
};
```

## Usage Examples

### Complete Integration Example

```js
import { createLightbox, isInside } from '@placetopay/lightbox-sdk';

// Check if running inside lightbox
if (isInside()) {
  // Inside lightbox - setup close handlers
  window.addEventListener('beforeunload', () => {
    emitClose({ status: 'navigation' });
  });
} else {
  // Outside lightbox - create and configure
  const lightbox = createLightbox('https://checkout.placetopay.com/', {
    id: 'payment-lightbox',
    closeButton: true,
    allowRedirects: true, // Allow redirects for 'self' backup target
    backupTarget: 'popup', // Enhanced popup with backdrop & message
    styles: {
      width: '800px',
      height: '600px',
      radius: 12,
      backdropColor: '#000000',
      backdropOpacity: 0.7
    },
    callbacks: {
      close: (payload) => {
        console.log('Payment completed:', payload);
        // Handle payment result
      },
      'payment-status': (payload) => {
        console.log('Payment status update:', payload);
      }
    }
  });

  // Open the lightbox
  lightbox.open();
}
```

### Fallback Control Examples

```js
// Example 1: Prevent redirects but allow popups
const restrictedLightbox = createLightbox('https://checkout.placetopay.com/', {
  allowRedirects: false, // Blocks 'self' redirection
  backupTarget: 'popup'  // Still opens popup in Safari/iOS
});

// Example 2: Allow only new tab fallback
const newTabLightbox = createLightbox('https://checkout.placetopay.com/', {
  allowRedirects: false, // Blocks 'self' redirection
  backupTarget: 'blank'  // Still opens new tab in Safari/iOS
});

// Example 3: Block all fallback behavior
const noFallbackLightbox = createLightbox('https://checkout.placetopay.com/', {
  allowRedirects: false, // Blocks 'self' redirection
  backupTarget: 'self'   // Combined with allowRedirects: false, no fallback occurs
});
```

### Closing Lightboxes and Popups

```js
const lightbox = createLightbox('https://checkout.placetopay.com/', {
  backupTarget: 'popup',
  callbacks: {
    close: (payload) => {
      console.log('Closed with payload:', payload);
    }
  }
});

// Open the lightbox
lightbox.open(); // Opens normal lightbox or popup depending on browser

// Close it programmatically (works for both lightbox and popup)
setTimeout(() => {
  lightbox.close({ reason: 'timeout' }); // Closes lightbox OR popup
}, 30000);

// The close() method automatically detects what was opened:
// - If normal lightbox: removes iframe and cleans up
// - If popup: closes popup window, removes backdrop
// - If blank tab: closes tab window (if accessible)
```

### Cross-Context Communication

```js
// From INSIDE the loaded page (iframe/popup), send messages to the lightbox
import { emitClose, emit, isInside } from '@placetopay/lightbox-sdk';

if (isInside()) {
  // Inside iframe or popup - can communicate with parent lightbox
  
  // Send custom events
  emit({
    type: 'payment-completed',
    payload: { transactionId: '123', amount: 100 }
  });
  
  // Close with data
  emitClose({ status: 'success', redirectUrl: '/success' });
  
  // Works automatically whether in iframe OR popup context
}
```

**Technical Note**: The SDK automatically detects if it's running in an iframe (`window.parent`) or popup (`window.opener`) and uses the correct communication channel without any configuration needed.

### Dynamic Style Updates

```js
const lightbox = createLightbox('https://checkout.placetopay.com/');

// Update styles based on screen size
const updateResponsiveStyles = () => {
  const isMobile = window.innerWidth < 768;
  
  lightbox.updateStyles({
    width: isMobile ? '95%' : '600px',
    height: isMobile ? '90%' : '500px'
  });
};

window.addEventListener('resize', updateResponsiveStyles);
lightbox.open();
```

- **See also** [Guide - Getting Started - Usage instructions](/getting-started#usage-instructions)
