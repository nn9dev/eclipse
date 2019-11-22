# Eclipse
The multi-emulator that can never be revoked.

Eclipse is a multi-emulator built for the web. It can be used on Windows, Linux, macOS, Android, iOS, etc. Anything that has a modern web browser can run it.


## Eclipse v3
Eclipse v3 will be the last complete refactor of Eclipse. Version 4 will focus on modularity, so that cores can be easily added, buggy areas can be easily traced, and older components can easily get updated. A list of new features can be found below:
- Rewritten from the ground up
- IndexedDB for extended storage
- Uploaded ROMs can be added to the library (via IndexedDB)
- Unzip files
- Cloud sync
- Improved Import/Export of States
- More streamlined interface
- WebAssembly-based Core Support
- Fix the controls better™
- Redesign
- Redesigned Website

## Design
[Design](https://sketch.cloud/s/zkVKa) –– The general design for Eclipse.

## Planned Core Support

| Core           | Systems | Link                                              |
|----------------|---------|---------------------------------------------------|
| Chip8-js       | CHIP8   | [Here](https://github.com/APTy/chip8-js)          |
| JSNES          | NES     | [Here](https://github.com/tjwei/xnes)             |
| XNES           | SNES    | [Here](https://github.com/tjwei/xnes)             |
| GameBoy-Online | GB, GBC | [Here](https://github.com/taisel/GameBoy-Online)  |
| IodineGBA      | GBA     | [Here](https://github.com/taisel/IodineGBA)       |
| PCSXjs         | PSX     | [Here](https://github.com/tjwei/pcsxjs)           |
| jsSMS          | SMS, GG | [Here](https://github.com/gmarty/jsSMS)           |

## Dependancies (Cores not Included)
- TypeScript
- Vue
- Vue Router
- Webpack
- Babel
- TSLint
- LocalForage
- OpenSkin (v3)
- TailwindCSS

## Project Setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run Tests
```
npm run test
```

### Lints and Fixes files
```
npm run lint
```

### Run Unit Tests
```
npm run test:unit
```
