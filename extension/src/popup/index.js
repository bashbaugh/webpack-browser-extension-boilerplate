import './css/styles.scss'
import browser from 'browserApi'

document.getElementById('version-text').innerText = `V${browser.runtime.getManifest().version}`

if (!('update_url' in browser.runtime.getManifest())) document.getElementById('dev-badge').style.display = 'block'