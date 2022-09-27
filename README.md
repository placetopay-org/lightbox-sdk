# Lightbox-sdk
Small javascript library to encapsulate websites in a lightbox with configurable styles and behaviors.

The library consists of 2 parts:

- LightboxClient
- LightboxApp

If you have a site A, and within it you want to display a site B using Lightbox-sdk:

On site A the LightboxClient will be used (site that will display a lightbox)

- It will define which site will be displayed in the lightbox
- It will define the style of the lightbox
- It will define the callbacks for each lightbox event

On site B LightboxApp will be used (site that will be shown in a lightbox)

- Define the event emission logic