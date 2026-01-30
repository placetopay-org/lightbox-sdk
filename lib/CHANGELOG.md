# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [2.4.0] - 2026-01-30
### Added
- `CLOSE_BY_USER` event to detect when user closes the lightbox
- pnpm installation instructions in getting started documentation

### Changed
- Enhanced `unmountBackdrop()` to emit `CLOSE_BY_USER` event when user closes the lightbox


## [2.3.0] - 2026-01-15
### Added
- `isSafariOrIOS()` utility to detect Safari browser or iOS devices
- `isInsideIframe()` utility to detect if running inside an iframe
- `isInsidePopup()` utility to detect if running inside a popup window

### Fixed
- Popup windows in Safari reusing the same window due to hardcoded window name. Now each popup uses a unique name based on `lightboxId` or generates one with `crypto.randomUUID()`

## [2.2.0] - 2024-12-19
### Added
- `backupTarget` option with three fallback behaviors: `'self'` (redirect), `'popup'` (popup window), `'blank'` (new tab)
- Enhanced backdrop overlay for popup fallbacks with dark modern design
- Automatic language detection and translations (English/Spanish) for popup messages
- Cross-context communication support for both iframe and popup windows
- Popup/window tracking by lightbox ID for proper cleanup
- Universal `close()` method that automatically handles lightbox, popup, and blank window scenarios
- Enhanced playground with fallback testing capabilities

### Changed
- Moved fallback detection logic from core to assembler (`mountLightbox`) for better architecture
- `allowRedirects` option now only affects `'self'` redirection, popup and blank fallbacks always work
- `postMessage` automatically detects context and uses appropriate channel (`parent` for iframes, `opener` for popups)
- `unmountLightbox` now automatically handles popup cleanup and backdrop removal
- Event listener mounting improved to work consistently across all fallback scenarios
- API Reference documentation significantly expanded with comprehensive examples and type definitions

### Fixed
- Event listeners not being mounted for popup fallback scenarios
- Communication between popup windows and parent lightbox
- Backdrop cleanup when popup windows are closed
- Cross-browser compatibility issues with Safari and iOS fallback behavior

## [2.1.4] - 2023-11-04
### Fixed
- Use `Lightbox.id` to close lightbox from `Lightbox.close` method.

## [2.1.3] - 2023-11-03
### Changed
- Remove console logs.

## [2.1.2] - 2023-11-02
### Added
- ID options to identify lightbox element in the DOM.
- Custom HTMLElement option to mount lightbox.

## [2.1.1] - 2023-08-29
### Added
- Emit a post message to parent window when lightbox sdk is used into embedded page

## [2.1.0] - 2023-07-13
### Added
- Enforce styles option to manage style hierarchy

### Changed
- Props as object on mounting functions

## [2.0.4] - 2023-07-04
### Changed
- Default lightbox styles

### Removed
- Dimensions option and config

## [2.0.3] - 2023-06-29
### Changed
- Rename rounded style prop to radius

## [2.0.2] - 2023-06-28
### Added
- Numbers available for width and height

## [2.0.1] - 2023-06-28
### Added
- Dimensions sintax pixel and percent for width and height

## [2.0.0] - 2023-06-27
### Added
- Launch flag for initial open lightbox
- Prevent close flag for close lightbox
- Target attribute for close button

### Changed
- Automatic close after events
- Optimized build (unique CSS file)
- More descriptive event names

## [1.2.0] - 2022-11-23
### Added
- Playground and styles

### Changed
- Client and app compaction, now only a single object is exported

## [1.0.0] - 2022-10-05
### Changed
- Architecture change, only receive type and payload (postMessage) with reserved types

## [0.3.3] - 2022-10-03
### Added
- isInside method on LightboxApp

### Changed
- LightboxApp close method can now receive a url to decide whether to close the modal or do a redirect

## [0.3.2] - 2022-10-03
### Changed
- Type ClientStyles changed to LightboxStyles

## [0.3.1] - 2022-10-03
### Fixed
- Compiled file upload

## [0.3.0] - 2022-10-03
### Added
- Hide close button event
- Close button

### Changed
- Redux pattern on listeners implemented

### Removed
- Dispatch option on LightboxClient

## [0.2.1] - 2022-09-30
## Fixed
- Single consumer construction
- Exposure of types

## [0.2.0] - 2022-09-30
### Added
- Update stylesheet
- LightboxApp send styles
- AllowRedirects option
- Helpers module
- Height and width option
- Dimensions option
- Defined configuration file

## [0.1.0] - 2022-09-29
### Added
- Rounded option
- callbacks option
- Dispatch option
- AppPage conditioned to send custom emits
- Full lifecycle for elements, callbacks and styles (init - mount - unmount)
- Modularized constants and types
- Assembly logic encapsulated as a module
- Separate modules in client and app
- Build scripts
- React for examples
- Vite develop integration
- Example pages
- Prettier and ESLint dependencies
- CHANGELOG.md file
- README.md documentation file
