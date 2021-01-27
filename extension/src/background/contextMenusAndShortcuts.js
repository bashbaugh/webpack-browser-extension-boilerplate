import browser from 'browserApi'

export default function () {
  browser.contextMenus.create({
    title: 'My Context Menu',
    id: 'menuParent',
    contexts: ['all']
  })
  browser.contextMenus.create({
    title: 'Child Item',
    id: 'menuChild',
    contexts: ['all']
  })

  /* Context menu handlers */
  browser.contextMenus.onClicked.addListener((info, tab) => {
    switch (info.menuItemId) {
      case 'menuChild':
        console.log('Context menu item pressed')
        break
    }
  })

  /* Keyboard shortcut handlers */
  browser.commands.onCommand.addListener((command, tab) => {
    switch (command) {
      case 'exampleCommand':
        console.log('Keyboard shortcut pressed')
        break
    }
  })
}
