function onCreated() {
  if (browser.runtime.lastError) {
    console.log(`Error: ${browser.runtime.lastError}`);
  } else {
    console.log("Context menu entry created successfully.");
  }
}

function onSuccess(tab) {
  console.log(`Created new tab here: ${tab.index}`);
}

function onError(error) {
  console.log(`Error: ${error}`);
}

function openTabs(tabs) {
  for (let tab of tabs) {
    console.log(tab.index);
    var NTHcreate = browser.tabs.create({index: (tab.index + 1)});
    NTHcreate.then(onSuccess, onError);
  }
}

browser.contextMenus.create({
  id: "NTH-left",
  title: browser.i18n.getMessage("NewTabHerePageContextMenu"),
  contexts: ["all"]
}, onCreated)

if(browser.contextMenus.ContextType.TAB)
{
  browser.contextMenus.create({
    id: "NTH-here",
    title: browser.i18n.getMessage("NewTabHereTabContextMenu"),
    contexts: [browser.contextMenus.ContextType.TAB]
  }, onCreated)
}

browser.contextMenus.onClicked.addListener(
  function(info, tab) {
    switch (info.menuItemId) {
      case "NTH-left":
	openTabs([tab]);
        break;
      case "NTH-here":
        openTabs([tab]);
        break;
  }
})

browser.commands.onCommand.addListener(function(command) {
  if (command == "new-tab-here") {
    var querying = browser.tabs.query({currentWindow: true, active: true});
    querying.then(openTabs, onError);
    console.log("Opening new tab (keyboard shortcut)");
  }
});

browser.browserAction.onClicked.addListener(function() {
    var querying = browser.tabs.query({currentWindow: true, active: true});
    querying.then(openTabs, onError);
    console.log("Opening new tab (toolbar button)");
});
