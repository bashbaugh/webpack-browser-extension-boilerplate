import './css/styles.scss'
import browser from 'browserApi'
import { getSettings, saveSettings } from '../common/settings'

// This JS runs on each static page

document.getElementById('version-text').innerText = `V${browser.runtime.getManifest().version}`

const settingsDiv = document.getElementById('settings')

if (settingsDiv) {
  const controls = {
    foo: settingsDiv.querySelector('#option_foo'),
    shortcutsDiv: settingsDiv.querySelector('#keyboard-shortcuts'),
    openShortcutsLink: settingsDiv.querySelector('#open-shortcuts-link')
  }

  // Show all the current settings
  getSettings().then(settings => {
    controls.foo.checked = settings.foo

    settingsDiv.style.display = 'block'
  })

  // Update setting when it changes
  controls.foo.addEventListener('change', e => { saveSettings({ foo: e.target.checked}) })

  // Show keyboard shortcuts
  browser.commands.getAll(shortcuts => {
    for (const { description, shortcut } of Object.values(shortcuts)) {
      const shortcutDescription = document.createElement('p')
      // TODO fix bugs that might occur with keyboard shortcuts with <, >, &, etc.
      shortcutDescription.innerHTML = `${description || 'Open the extension panel'}: <code>${shortcut || 'Not set'}</code>`
      controls.shortcutsDiv.appendChild(shortcutDescription)
    }
  })

  // Open keyboard shortcuts page
  controls.openShortcutsLink.addEventListener('click', _ => browser.tabs.create({ url: 'chrome://extensions/shortcuts' }))
}
