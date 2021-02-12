# Webpack Browser Extension Boilerplate

> **This is still a WIP**

A starter for creating cross-browser extensions using webpack, SCSS and (optionally) Firebase.

### Also see: 
 + [Branch with example auth and extra features](/tree/auth) (WIP)

## Features 
 + Simple [hot reloading](https://github.com/xpl/crx-hotreload)
 + Works across multiple browsers (chrome, edge, firefox):
   + prefix yarn commands with `TARGET_BROWSER=chrome|edge|firefox ` to set the target browser for building. (chrome by default)
   + Update the Babel browserlist in webpack.config.js to specify which versions you need to support
   + Edit the CopyPlugin configuration in webpack.config.js if you need to change the manifest across browsers
   + Always import the extension api from `browserApi` (`import browser from 'browserApi'`). It will automatically resolve to the correct namespace (e.g. `chrome` for chrome).
   + Use `process.env.TARGET` (**not** `TARGET_BROWSER`) if needed throughout your code to vary functionality across browsers. ([API compatibility chart](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Browser_support_for_JavaScript_APIs))


## Todo before using
 + Change the name and details in `extension/manifest.json`, both `package.json`s, etc.
 + Edit the manifest to specify the correct permissions, content script match pattern, etc.
 + Follow [these instructions](https://developer.chrome.com/docs/apps/app_identity/#copy_key) to set a consistent extension key in the manifest (important if using OAuth as you'll need a consistent redirect URL)
 + Update webpack.config.js with your license banner (check bottom of file) and any other necesarry changes
 + Set uninstall URL, etc. in background page


### Contributing

Contributions are always welcome! This template is quite opininated and optimized for my own projects, so I may not accept all suggestions. However, please open an issue if you see something that could be improved!