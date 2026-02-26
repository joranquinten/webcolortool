# Vue 2 to Vue 3 Migration Guide

This document outlines the complete migration of WebColorTool from Vue 2 to Vue 3, including all breaking changes, dependency updates, and troubleshooting tips.

## Overview

WebColorTool has been successfully migrated from Vue 2.6 to Vue 3.4, along with major updates to its entire technology stack. This migration provides better performance, improved TypeScript support, and access to modern Vue 3 features like the Composition API.

## Major Dependency Updates

### Core Framework

| Package | Vue 2 Version | Vue 3 Version |
|---------|--------------|---------------|
| `vue` | ^2.6.10 | ^3.4.0 |
| `vuetify` | ^1.5.5 | ^3.5.0 |
| `@vue/cli-service` | ~3.x | ~5.0.0 |
| `core-js` | ^2.6.5 | ^3.35.0 |
| `electron` | ^9.x | ^28.0.0 |

### Testing Libraries

| Package | Vue 2 Version | Vue 3 Version |
|---------|--------------|---------------|
| `@vue/test-utils` | ^1.x | ^2.4.0 |
| `vue-jest` | ^3.x | `@vue/vue3-jest@^29.0.0` |
| `babel-jest` | ^23.x | ^29.7.0 |
| `eslint-plugin-vue` | ^5.x | ^9.20.0 |

### Plugins

| Package | Vue 2 Version | Vue 3 Version | Notes |
|---------|--------------|---------------|-------|
| `vue-clipboard2` | ^0.3.x | `vue-clipboard3@^2.0.0` | Complete API change |
| `vuetify-loader` | ^1.0.5 | `vite-plugin-vuetify@^2.0.0` | For Vite builds |
| `vue-cli-plugin-electron-builder` | ^1.x | ^2.1.1 | Vue 3 compatible |

### Removed Dependencies

- `stylus` - Removed (Vuetify 3 uses Sass)
- `stylus-loader` - Removed (Vuetify 3 uses Sass)
- `vue-cli-plugin-vuetify` - Removed (Vue 2 specific)

## Breaking Changes

### 1. Application Instance Creation

**Vue 2:**
```javascript
import Vue from 'vue';
import App from './App.vue';

new Vue({
  render: h => h(App)
}).$mount('#app');
```

**Vue 3:**
```javascript
import { createApp } from 'vue';
import App from './App.vue';

const app = createApp(App);
app.mount('#app');
```

### 2. Vuetify Initialization

**Vue 2:**
```javascript
import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

Vue.use(Vuetify, {
  theme: {
    primary: '#F8F8F2',
    // ...
  }
});
```

**Vue 3:**
```javascript
import { createVuetify } from 'vuetify';
import 'vuetify/styles';
import { aliases, mdi } from 'vuetify/iconsets/mdi';
import '@mdi/font/css/materialdesignicons.css';

const vuetify = createVuetify({
  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: { mdi }
  },
  theme: {
    themes: {
      light: {
        colors: {
          primary: '#F8F8F2',
          // ...
        }
      }
    }
  }
});

app.use(vuetify);
```

### 3. Vuetify Component Changes

#### Component Renames

| Vue 2 Component | Vue 3 Component |
|----------------|-----------------|
| `<v-content>` | `<v-main>` |
| `<v-toolbar>` | `<v-app-bar>` or `<v-toolbar>` (both work) |

#### Prop Changes

**Boolean Props:**

Vue 2:
```vue
<v-textarea outline />
<v-select outline />
<v-btn flat />
```

Vue 3:
```vue
<v-textarea variant="outlined" />
<v-select variant="outlined" />
<v-btn variant="flat" />
```

**Grid System:**

Vue 2:
```vue
<v-layout row wrap>
  <v-flex xs12 sm6>
    <!-- content -->
  </v-flex>
</v-layout>
```

Vue 3:
```vue
<v-row>
  <v-col cols="12" sm="6">
    <!-- content -->
  </v-col>
</v-row>
```

**Snackbar:**

Vue 2:
```vue
<v-snackbar v-model="visible" bottom>
```

Vue 3:
```vue
<v-snackbar v-model="visible" location="bottom">
```

### 4. Clipboard Plugin Migration

**Vue 2 (vue-clipboard2):**
```vue
<template>
  <button
    v-clipboard:copy="textToCopy"
    v-clipboard:success="onCopy"
  >
    Copy
  </button>
</template>

<script>
export default {
  methods: {
    onCopy() {
      this.snackbarText = 'Copied!';
    }
  }
}
</script>
```

**Vue 3 (vue-clipboard3):**
```vue
<template>
  <button @click="copyToClipboard(textToCopy)">
    Copy
  </button>
</template>

<script>
import useClipboard from 'vue-clipboard3';

export default {
  setup() {
    const { toClipboard } = useClipboard();
    return { toClipboard };
  },
  methods: {
    async copyToClipboard(text) {
      try {
        await this.toClipboard(text);
        this.snackbarText = 'Copied!';
        this.snackbarVisible = true;
      } catch (e) {
        console.error(e);
      }
    }
  }
}
</script>
```

### 5. Testing API Changes

**Vue 2:**
```javascript
import { mount } from '@vue/test-utils';

const wrapper = mount(Component, {
  components: { VBtn, VCard }
});
```

**Vue 3:**
```javascript
import { mount } from '@vue/test-utils';

const wrapper = mount(Component, {
  global: {
    components: { VBtn, VCard },
    plugins: [vuetify]
  }
});
```

### 6. Jest Configuration

**Vue 2 (jest.config.js or package.json):**
```json
{
  "transform": {
    "^.+\\.vue$": "vue-jest"
  }
}
```

**Vue 3:**
```json
{
  "transform": {
    "^.+\\.vue$": "@vue/vue3-jest"
  }
}
```

### 7. ESLint Configuration

**Vue 2:**
```json
{
  "extends": [
    "plugin:vue/essential"
  ]
}
```

**Vue 3:**
```json
{
  "extends": [
    "plugin:vue/vue3-essential"
  ]
}
```

### 8. Electron Integration

**Enhanced Security in Vue 3:**
```javascript
// background.js
const win = new BrowserWindow({
  webPreferences: {
    nodeIntegration: false,
    contextIsolation: true,
    enableRemoteModule: false,
    preload: path.join(__dirname, 'preload.js')
  }
});
```

## API Changes to Be Aware Of

### Global API

- `Vue.component` → `app.component`
- `Vue.directive` → `app.directive`
- `Vue.mixin` → `app.mixin`
- `Vue.use` → `app.use`
- `Vue.prototype` → `app.config.globalProperties`

### Options API (Still Supported)

The Options API remains fully supported in Vue 3, so existing components using `data()`, `methods`, `computed`, etc., continue to work without changes.

### Composition API (New in Vue 3)

Vue 3 introduces the Composition API as an alternative to the Options API:

```javascript
import { ref, computed } from 'vue';

export default {
  setup() {
    const count = ref(0);
    const doubled = computed(() => count.value * 2);

    function increment() {
      count.value++;
    }

    return { count, doubled, increment };
  }
}
```

### Template Syntax Changes

- Multiple root elements are now allowed (Fragment support)
- `v-model` on custom components has changed signature
- `$attrs` now includes class and style
- `$listeners` has been merged into `$attrs`

## Netlify Deployment Configuration

### Node.js Version Requirements

Vue 3 and the modern build toolchain require Node.js 18 or higher.

**`.nvmrc`:**
```
20
```

**`netlify.toml`:**
```toml
[build]
  command = "yarn run build"
  publish = "dist"

[build.environment]
  NODE_VERSION = "20"
```

### Build Separation

The project now supports two distinct build targets:

1. **Web Build:** `yarn run build` - Creates a web-only build (deployed to Netlify)
2. **Electron Build:** `yarn run electron:build` - Creates desktop app packages

The web build works independently of Electron dependencies, preventing build failures on Netlify.

## Troubleshooting

### Issue: "Cannot find module 'vue-template-compiler'"

**Cause:** Vue 2 dependency still referenced.

**Solution:** Remove `vue-template-compiler` from dependencies. Vue 3 uses `@vue/compiler-sfc` which is included in `@vue/cli-service`.

### Issue: Vuetify components not rendering

**Cause:** Missing Vuetify 3 styles or incorrect plugin initialization.

**Solution:** Ensure you import `vuetify/styles` and initialize with `createVuetify()`:

```javascript
import 'vuetify/styles';
import { createVuetify } from 'vuetify';

const vuetify = createVuetify({ /* config */ });
app.use(vuetify);
```

### Issue: "Unknown custom element: <v-content>"

**Cause:** Component renamed in Vuetify 3.

**Solution:** Replace `<v-content>` with `<v-main>`.

### Issue: Tests failing with "Cannot find module '@vue/test-utils'"

**Cause:** Vue Test Utils needs to be version 2.x for Vue 3.

**Solution:**
```bash
yarn add --dev @vue/test-utils@^2.4.0
```

### Issue: Clipboard directive not working

**Cause:** `vue-clipboard2` is not compatible with Vue 3.

**Solution:** Migrate to `vue-clipboard3` or `@vueuse/core`:

```javascript
// Use programmatic API instead of directives
import useClipboard from 'vue-clipboard3';

const { toClipboard } = useClipboard();
await toClipboard(text);
```

### Issue: Netlify build fails with "Node version not supported"

**Cause:** Build using Node.js version < 18.

**Solution:** Create `.nvmrc` with `20` and configure `netlify.toml` with `NODE_VERSION = "20"`.

### Issue: "Property 'hasOwnProperty' does not exist on type 'never'"

**Cause:** `hasOwnProperty` is not type-safe in modern JavaScript.

**Solution:** Use `Object.hasOwn()` (ES2022) or optional chaining:

```javascript
// Old
if (obj.hasOwnProperty('key')) { }

// New
if (Object.hasOwn(obj, 'key')) { }
// or
if (obj?.key !== undefined) { }
```

### Issue: Jest tests show "Unexpected token 'export'"

**Cause:** ES modules not being transformed by Jest.

**Solution:** Update Jest config to use `@vue/vue3-jest` transformer:

```json
{
  "transform": {
    "^.+\\.vue$": "@vue/vue3-jest",
    "^.+\\.js$": "babel-jest"
  }
}
```

### Issue: Electron window not loading

**Cause:** Security policy changes or build output path mismatch.

**Solution:** Verify `vue-cli-plugin-electron-builder` is at least version `^2.1.1` and check `contextIsolation` settings.

## Performance Improvements

Vue 3 provides several performance benefits out of the box:

- **Faster rendering:** Optimized virtual DOM algorithm
- **Smaller bundle size:** Tree-shaking friendly architecture
- **Better TypeScript support:** Written in TypeScript from the ground up
- **Composition API:** Better code organization and reusability
- **Fragment support:** No wrapper div needed for multi-root components

## Additional Resources

- [Vue 3 Migration Guide](https://v3-migration.vuejs.org/)
- [Vuetify 3 Migration Guide](https://vuetifyjs.com/en/getting-started/upgrade-guide/)
- [Vue 3 Documentation](https://vuejs.org/guide/introduction.html)
- [Vuetify 3 Documentation](https://vuetifyjs.com/)
- [Vue Test Utils 2 Documentation](https://test-utils.vuejs.org/)
- [Composition API RFC](https://github.com/vuejs/rfcs/blob/master/active-rfcs/0013-composition-api.md)

## Migration Checklist

- [x] Update core Vue dependencies to 3.x
- [x] Update Vuetify to 3.x
- [x] Update build tools (Vue CLI 5)
- [x] Update Electron to latest version
- [x] Migrate main.js to createApp API
- [x] Update Vuetify initialization
- [x] Replace vue-clipboard2 with vue-clipboard3
- [x] Update all component templates for Vuetify 3
- [x] Update all tests to use Vue Test Utils 2.x
- [x] Update Jest configuration
- [x] Update ESLint configuration
- [x] Configure Netlify deployment (Node 20, build command)
- [x] Test web build independently
- [x] Test Electron build
- [x] Update documentation

## Support

If you encounter issues not covered in this guide, please:

1. Check the official Vue 3 and Vuetify 3 migration guides
2. Search existing GitHub issues
3. Open a new issue with details about your problem

## License

This migration guide is part of the WebColorTool project and is released under the MIT License.
