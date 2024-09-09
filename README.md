# JSL Rewards

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

## About this app

This is a rewards app that is built with react-native, using expo to create the app
and uses React, Typescript, Javascript.

This also uses Clerk to keep track of user accounts and firebase to keep track of user details towards rewards.

This app uses the phone camera to scan a QR code to log rewards and update any values pertaining to it.

Rewards can then be redeemed if there are any for the given user.

Location is also used to determine if the user is in the correct geolocation to log a QR code scan.