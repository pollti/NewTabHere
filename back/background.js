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
    var NTHcreate = browser.tabs.create({index: (tab.index)});
    NTHcreate.then(onSuccess, onError);
  }
}

browser.contextMenus.create({
  id: "NTH-left",
  title: "Create new Tab here",
  contexts: ["all"]
}, onCreated)

if(browser.contextMenus.ContextType.TAB)
{
  browser.contextMenus.create({
    id: "NTH-here",
    title: "New tab here",
    contexts: [browser.contextMenus.ContextType.TAB]
  }, onCreated)
}

browser.contextMenus.onClicked.addListener(
  function(info, tab) {
    switch (info.menuItemId) {
      case "NTH-left":
	//var querying = browser.tabs.query({currentWindow: true, active: true});
	//querying.then(openTabs, onError);
	openTabs([tab]);
        break;
      case "NTH-here":
        openTabs([tab]);
        break;
  }
})
