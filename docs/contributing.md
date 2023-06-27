# Contributing

## Prerequisites

Ensure that you have the following software installed on your machine:

- Git
- Node.js
- npm (generally comes with Node.js)

## Installation instructions

1. **Clone the repository**: This downloads a copy of the code from GitHub to your local machine. Use the `git clone` command followed by the URL of the repository.

```bash
git clone https://github.com/placetopay-org/lightbox-sdk.git
```

2. **Navigate into the repository directory**: Once you've cloned the repository, navigate into the newly created directory, which should be named `lightbox-sdk`.

```bash
cd lightbox-sdk
```

3. **Install the dependencies**: Next, install the project dependencies.

::: code-group

```bash [npm]
npm install
```

```bash [yarn]
yarn install
```

:::

4. **Build the project**: Transpile and bundle your code for production using the `npm run build` command.

::: code-group

```bash [npm]
npm run build
```

```bash [yarn]
yarn build
```

:::

5. **Create a symbolic link**: Next, create a local development version of your package that can be used in other locations on your machine.

::: code-group

```bash [npm]
npm link ./lib
```

```bash [yarn]
yarn link ./lib
```

:::

6. **Start the development server**: Now you're ready to start the development server. This server provides features like live reloading and can be started.

::: code-group

```bash [npm]
npm run dev
```

```bash [yarn]
yarn dev
```

:::

## Deploying Docs to GitHub Pages
To deploy the Lightbox SDK documentation to GitHub Pages, there is a deploy.sh script that you can use. This script will help you to build and deploy the documentation directly to the GitHub repository, where it will be hosted as a GitHub Pages site.

Here's a breakdown of how you can use the deploy.sh script.

::: warning
Before running the script, ensure you have commit access to the repository.
:::

## Run the deploy.sh script
You can run the deploy script with the following command:

```bash
./deploy.sh
```

Another option is as follows to execute shell script:

```bash
sh deploy.sh
```

**If the script is not executable**, you might need to add the execute permissions to the `deploy.sh` file:

```bash
chmod +x deploy.sh
```

Now you should be able to run it.