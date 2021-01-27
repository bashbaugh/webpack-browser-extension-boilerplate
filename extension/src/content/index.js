// Content script entry point

import browser from 'browserApi'
import api from '../api/index'
import { getSettings, saveSettings } from '../shared/settings'
import './css/styles.scss'

getSettings().then(settings => {

})
