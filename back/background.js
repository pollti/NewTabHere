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

browser.contextMenus.onClicked.addListener(
  function(info, tab) {
    switch (info.menuItemId) {
      case "NTH-left":
        var querying = browser.tabs.query({currentWindow: true, active: true});
	querying.then(openTabs, onError);
        break;
  }
})
