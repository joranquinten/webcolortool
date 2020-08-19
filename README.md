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

## Contributing 🤷‍♂️

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate. Please read the [Open Source](open-source) bit to help you on your way in making improvements.

## License 📃

[MIT](https://choosealicense.com/licenses/mit/)

---

## Open Source 💻

WebColorTool was built by me for something that I needed. I figured maybe other developers or designers have similar needs as mine, so I published the software along with the source code. Feel free to make suggestions, improvements or fork your own implementation. If you're interested in that sort of thing, read on!

_This part is for the code monkeys_ 🐒

## Installation

The project is built using the Vue CLI, so the following should be familiar (and I'm sure you could find the `npm` counterpart of the commands if that's your taste):

### Project setup

```
yarn
```

### Compiles and hot-reloads for development

For the web version, use the following command:

```
yarn run serve
```

For the electron version, use the following command:
```
electron:serve
```

### Compiles and minifies for production

For the web version, use the following command:

```
yarn run build
```

For the electron version, use the following command:
```
electron:build
```

☝️ This compiles only for MacOS at the moment.

### Lints and fixes files

```
yarn run lint
```

### Run your unit tests

Optionally add the familiar [Jest flags](https://jestjs.io/docs/en/cli) (<pattern or filename>, `--watch`, `--coverage` etc)

```
yarn run test:unit
```

That's pretty much it. As long as you adhere to Vues own styleguide and best practices, improvements are always welcome. I am aware that the project is that particularly well organized, optimized or covered by tests. It's was a quick way of setting up something that I needed. 

Cheers,

Joran
