# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

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
