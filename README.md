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
Users can update once logged in and reset upon sign in if forgotten.

This app uses the phone camera to scan a QR code to log rewards and update any values pertaining to it in the database.
A successful scan adds progress and notifies the user.
A invalid scan denies progress and notifies the user.

Rewards can then be redeemed if there are any for the given user.
Redeeming a reward launchs a timer to verify a reward has been redeemed.

There is an option/button to launch the location in the phones native map application to direct to the location.

Menu items are displayed to the user for any/all services given.
