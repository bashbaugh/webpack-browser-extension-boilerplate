import createContextMenus from './contextMenusAndShortcuts'
import hotReload from './hot-reload'
import browser from 'browserApi'
import { resetSettings } from '../shared/settings'

if (process.env.NODE_ENV === 'development') hotReload()

if ('update_url' in browser.runtime.getManifest()) browser.runtime.setUninstallURL('UNINSTALL_URL')

browser.runtime.onInstalled.addListener((details) => {
  const version = browser.runtime.getManifest().version // Use the version run version-specific update logic
  if (details.reason === 'install') { // Initial install listener
    // Set default settings
    resetSettings()
  }
})

createContextMenus()

// Message listener
browser.runtime.onMessage.addListener((msg, sender, respond) => {
  switch (msg.action) {
    case 'exampleAction':
      respond('Hello! I (background page) received your message.')
      break
  }
  // return true // if using async responses
})
