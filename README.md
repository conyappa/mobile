<h1 align="center">Con Yappa</h1>

<p align="center">
  <em>Latam’s first prize-linked savings account.</em>
</p>

## Requirements

- [Expo CLI](https://docs.expo.io/workflow/expo-cli/) (needed)

## Run Con Yappa’s mobile app for local development

Install dependencies

```bash
yarn install
```

Run project

```
expo start
```

There are a couple ways you can use the app after starting the expo server. You can either install the [Expo Go](https://expo.io/client) app in your phone, beware your phone and your computer must be connected to the same network. You can also use an [iOS](https://docs.expo.io/workflow/ios-simulator/) or [Android](https://docs.expo.io/workflow/android-studio-emulator/) simulator.

## App server

On development, the app can either be connected to a remote or local server. This is controlled from the environment variables (`.env` file).

### Remote staging server

To connect to the staging server you must set `USE_LOCAL_SERVER=false` and add the corresponding `STAGING_URL`

### Local server

First you must install and run [Con Yappa's backend](https://github.com/conyappa/backend). Then you must set `USE_LOCAL_SERVER=true` and add the corresponding `LOCAL_URL`. To obtain the local URL you should find out [computer's network IP address](https://lifehacker.com/how-to-find-your-local-and-external-ip-address-5833108). The local URL is `http://<computer-ip>:8000/v1` if you're running the server on the `8000` port.

