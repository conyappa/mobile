<h1 align="center">Con Yappa</h1>

<p align="center">
  <em>Latam’s first prize-linked savings account.</em>
</p>

## Requirements

- [Expo CLI](https://docs.expo.io/workflow/expo-cli/) (needed)

## Run Con Yappa’s mobile app for local development

First, install the dependencies:

```sh
yarn install
```

**Optional**: If you want to modify an environmental variable, you can create an `.env` file and fill the desired attributes:

```sh
nano .env  # or your editor of choice
```

Please note that there are 4 possible environmental variables that you can modify:

- `DEVELOPMENT_URL`: Defines the development URL of the app. This URL gets used when the app is running on development mode. Defaults to `http://{local-machine-ip}:8000/v1`, where `{local-machine-ip}` corresponds to the IP on the local network of the machine that started the `expo` server.
- `STAGING_URL`: Defines the staging URL of the app. This URL gets used when the app is not running on development mode and when the release channel is not `production`.
- `PRODUCTION_URL`: Defines the production URL of the app. This URL gets used when the app is not running on development mode and when the release channel is `production`.

Finally, run project:

```sh
expo start
```

If you are using `wsl`, you need to start the project using tunneling (the `expo` CLI will need to install `@expo/ngrok` to manage the tunneling for you):

```sh
expo start --tunnel
```

Now, there are a couple ways you can use the app after starting the expo server. You can either install the [Expo Go](https://expo.io/client) app in your phone and scan the QR code displayed after starting the `expo` server (notice that your phone and your computer **must be connected to the same network** for this to work) or you can use an [iOS](https://docs.expo.io/workflow/ios-simulator/) or [Android](https://docs.expo.io/workflow/android-studio-emulator/) simulator.

## App server

On development, the app can either be connected to a remote or local server. This is controlled from the environment variables (`.env` file).

### Remote staging server

To connect to the staging server on development, just change the `DEVELOPMENT_HOST` to correspond to the staging URL and the `DEVELOPMENT_PORT` to `80`.

### Local server

First you must install and run [Con Yappa's backend](https://github.com/conyappa/backend). If you are using macOS or Linux, the default configurations of the development app should connect you by default to the local server. If you are using Windows with `wsl`, you probably won't be able to connect to the local development server.
