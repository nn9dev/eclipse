# Eclipse
Eclipse is a multi-web-emu focused on making emulation as simple as possible. You should be able to just play the games you want. The goal is for there to be as little configuration as possible and offer a wide array of system support. 

This repo will serve as the beta version until v3.0.0 releases, where it will become the main site. For checking out the live beta, go to: [https://zenithdevs.github.io/eclipse/](https://zenithdevs.github.io/eclipse/)

## Systems
- NES
- SNES (Experiemental < v3)
- GG
- SMS
- GB
- GBC
- GBA
- PSX (v3)

## Development

#### Scripts
* 🔥 `npm run start` - run development server
* 🔧 `npm run test` - run tests
* 🔧 `npm run build` - build web app using development mode (faster build without minification and optimization)
* 🔧 `npm run build:beta` - build web app for beta

#### PWA
This is a PWA. Don't forget to check what is inside of your `service-worker.js`. It is also recommended that you disable service worker (or enable "Update on reload") in browser dev tools during development.
