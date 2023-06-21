# Getting Started

## Install Lightbox SDK

Using the package manager npm to install

```bash
npm install -D @placetopay/lightbox-sdk
```

or with yarn

```bash
yarn add -D @placetopay/lightbox-sdk
```

## Usage Instructions

To effectively use the LightboxSDK, follow these simple steps:

### Import the styles


```js
import '@placetopay/lightbox-sdk/dist/css/styles.css';
```

### Step-by-step Usage

Import the LightboxSdk library and initialize it with your target URL. Then, use the open() method to open the Lightbox. Here's a code example:

```js
import { LightboxSdk } from '@placetopay/lightbox-sdk';

const lightbox = LightboxSdk('https://your-target-url.com');
lightbox.open();
```

### Inline Usage

Alternatively, if you prefer a more succinct approach, you can initialize and open the lightbox inline:

```js
import { LightboxSdk } from '@placetopay/lightbox-sdk';

LightboxSdk('https://your-target-url.com').open();
```

With this in mind, ensure to replace `'https://your-target-url.com'` with your actual target URL.

## Playground

We provide an exemplary Single Page Application (SPA), which serves both as a demonstration of the capabilities of our Lightbox SDK and as a playground for exploration and testing. This application represents an interactive environment where users can experiment with various SDK features, configurations, and behaviors.

A live deployment of this playground is readily accessible [here](https://placetopay-org.github.io/lightbox-sdk/)

To create your own local instance of the playground for further experimentation or development, please adhere to the following instructions:

1. **Clone the repository**: This downloads a copy of the code from GitHub to your local machine. Use the `git clone` command followed by the URL of the repository.

   ```bash
   git clone https://github.com/placetopay-org/lightbox-sdk.git
   ```

2. **Navigate into the repository directory**: Once you've cloned the repository, navigate into the newly created directory, which should be named `lightbox-sdk`.

   ```bash
   cd lightbox-sdk
   ```

3. **Install the dependencies**: Using npm, the default package manager for Node.js, install any dependencies that the project needs.

   ```bash
   npm install
   ```

4. **Build the project**: Transpile and bundle your code for production using the `npm run build` command.

   ```bash
   npm run build
   ```

5. **Create a symbolic link**: Next, create a local development version of your package that can be used in other locations on your machine by using the `npm link` command.

   ```bash
   npm link ./lib
   ```

6. **Start the development server**: Now you're ready to start the development server. This server provides features like live reloading and can be started with the `npm run dev` command.

   ```bash
   npm run dev
   ```
