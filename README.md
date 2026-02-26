# ![WebColorTool](https://github.com/joranquinten/webcolortool/raw/master/build/icons/24x24.png "Web Color Tool") [WebColorTool](https://webcolortool.netlify.com)

WebColorTool is a tool for working with color codes on the web. It converts, displays and orders colors based on a provided collection. The primary aim of the grid is providing a visual reference to a color scheme and make it easy to extract colors in the format that you need (Hex, RGB or HSL).

## Online 🕸

The tool is available as a webapp, hosted on Netlify: [WebColorTool web version](https://webcolortool.netlify.app/)

### Deploy status
[![Netlify Status](https://api.netlify.com/api/v1/badges/acd3d19b-2dea-4360-b15c-fe551ca5cc6e/deploy-status)](https://app.netlify.com/sites/webcolortool/deploys)

## MacOS 🍏

For Mac users, you can install the tool by downloading the [latest release](https://github.com/joranquinten/webcolortool/releases/latest) and installing it on your local machine. It is a standalone application and doesn't require any interwebs to function. Has been tested on Mojave and Catalina.

## Usage 🎨

Paste a `;` separated string of color codes and the app wil render all of the colors to a grid with their `hex`, `rgb` and `hsl` values generated. The values can be copied to the clipboard by clicking on the appropriate line.

### Support
If you like this tool and use it a lot, consider [buying me a coffee ☕️](https://www.buymeacoffee.com/joranquinten)!

## Contributing 🤷‍♂️

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate. Please read the [Open Source](open-source) bit to help you on your way in making improvements.

## License 📃

[MIT](https://choosealicense.com/licenses/mit/)

---

## Open Source 💻

WebColorTool was built by me for something that I needed. I figured maybe other developers or designers have similar needs as mine, so I published the software along with the source code. Feel free to make suggestions, improvements or fork your own implementation. If you're interested in that sort of thing, read on!

_This part is for the code monkeys_ 🐒

## Technology Stack

This project has been migrated to modern web technologies:
- **Vue 3** with Composition API support
- **Vuetify 3** for UI components
- **Vue CLI 5** for build tooling
- **Electron** (latest) for desktop app
- Supports both **web deployment** (Netlify) and **desktop deployment** (Electron)

## Installation

**Requirements:**
- Node.js 18+ (Node.js 20 recommended)
- Yarn or npm package manager

### Project setup

```
yarn
```

### Compiles and hot-reloads for development

For the web version, use the following command:

```
yarn run serve
```

For the Electron desktop version, use the following command:
```
yarn run electron:serve
```

### Compiles and minifies for production

For the web version (deployed to Netlify), use the following command:

```
yarn run build
```

For the Electron desktop version, use the following command:
```
yarn run electron:build
```

☝️ The Electron build currently compiles for MacOS. The web build works on all modern browsers.

### Lints and fixes files

```
yarn run lint
```

### Run your unit tests

Optionally add the familiar [Jest flags](https://jestjs.io/docs/en/cli) (<pattern or filename>, `--watch`, `--coverage` etc)

```
yarn run test:unit
```

That's pretty much it. As long as you adhere to Vue's own styleguide and best practices, improvements are always welcome. I am aware that the project is not particularly well organized, optimized or covered by tests. It was a quick way of setting up something that I needed.

### Deployment

**Web Deployment (Netlify):**
- The project is configured for automatic deployment to Netlify
- Node.js version is managed via `.nvmrc` file (Node 18+)
- Build configuration is in `netlify.toml`
- The web build works independently of Electron dependencies

**Desktop Deployment (Electron):**
- Use `yarn run electron:build` to create distributable packages
- Currently configured for MacOS builds
- The desktop app works offline with full functionality

Cheers,

Joran
