# Installing on Windows

Vue Storefront is based on open source technologies which SHOULD (in theory) work perfectly well on most of the leading operating systems. However, we're developing the project using MacOS and Linux machines.

## Requirements

1. Please download [Docker for Windows](https://store.docker.com/editions/community/docker-ce-desktop-windows) and install it on your machine. [More Information](https://blog.jayway.com/2017/04/19/running-docker-on-bash-on-windows/)
2. Install [LTS version of Node.js for Windows](https://nodejs.org/en/download/)
3. Instal [Yarn](https://yarnpkg.com/en/docs/install)
4. You can use any editor for development BUT we're using [Visual Studio Code](https://code.visualstudio.com/) which is cool, free and very JS friendly!
5. You can [download Github Desktop](https://desktop.github.com/) to get access not only for fancy UI but for git toolset itself.

## Installation of logima-pwa-api

1. Open your command line of choice with [Git](https://git-scm.com/download/win) access or use Github desktop
2. Clone the [logima-pwa-api](https://github.com/LogimaeCommerce/logima-pwa-api) project:

```bash
git clone https://github.com/LogimaeCommerce/logima-pwa-api.git logima-pwa-api
```

3. Go to `logima-pwa-api` in dir:

```bash
cd logima-pwa-api
```

4. Install dependencies:

```bash
yarn install
```

5. Run Docker containers required by `logima-pwa-api`:

```bash
docker-compose up
```

This step can take some minutes.

Note: If it appears that docker-compose is hanging, try opening a new terminal and continue to the next step using that terminal. Allow docker-compose to continue running in the background.

6. Restore products database and run latest migrations

```bash
yarn restore
yarn migrate
```

7. Copy `config/default.json` to `config/local.json`
8. Run API:

```bash
yarn dev
```

## Installation of logima-pwa

1. Open your command line of choice with [Git](https://git-scm.com/download/win) access or use Github desktop
2. Clone the [logima-pwa](https://github.com/LogimaeCommerce/logima-pwa) project:

```bash
git clone https://github.com/LogimaeCommerce/logima-pwa.git logima-pwa
```

3. Go to `logima-pwa` directory:

```
cd logima-pwa
```

4. Install dependencies:

```bash
yarn install
```

5. Copy `config/default.json` to `config/local.json`
6. Images: because `logima-pwa-api` uses `imagemagick` and some nodejs command line bindings it can be difficult to run the image proxy on localhost/windows machine. Please point out the `logima-pwa` to image proxy provided by changing `config/local.json` `images.baseUrl`:

```js
export default {
  elasticsearch: {
    httpAuth: '',
    host: 'localhost:8080/api/catalog',
    index: 'vue_storefront_catalog',
  },
  // we have logima-pwa-api (https://github.com/LogimaeCommerce/logima-pwa-api) endpoints below:
  orders: {
    endpoint: 'localhost:8080/api/order/create',
  },
  images: {
    baseUrl: 'https://demo.vuestorefront.io/img/',
  },
};
```

:::tip NOTE
We're using powerful node.js library for config files, check the docs to learn more on it: [https://github.com/lorenwest/node-config](https://github.com/lorenwest/node-config)
:::

6. Run Vue Storefront Server:

```bash
yarn dev
```

Now you should have Vue Storefront running on `localhost:3000`.