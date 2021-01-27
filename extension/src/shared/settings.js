// Utils for saving extension settings

import browser from 'browserApi'

const DEFAULT_SETTINGS = {
  foo: true
}

// Reset settings to DEFAULT_SETTINGS
export function resetSettings() {
  return new Promise((resolve, reject) => {
    browser.storage.local.set({
      extension_options: JSON.stringify(DEFAULT_SETTINGS)
    })
    resolve()
  })
}

// Get settings (as object)
export function getSettings() {
  return new Promise((resolve, reject) => {
    browser.storage.local.get(['extension_options'], ({ extension_options }) => {
      resolve(JSON.parse(extension_options))
    })
  })
}

// Update settings (pass an object with properties to update)
// TODO reject on error
export function saveSettings(newSettings) {
  return new Promise((resolve, reject) => {
    browser.storage.local.get(['extension_options'], ({ extension_options }) => {
      browser.storage.local.set({
        // Merge new settings with old settings and save as a JSON string
        extension_options: JSON.stringify(Object.assign(JSON.parse(extension_options), newSettings))
      })
      resolve()
    })
  })
}