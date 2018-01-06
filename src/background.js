var lrd = 1;

var defaultSettings = {
  toolbar_button_def_lr: "right",
  tab_context_def_lrd: "left",
  page_context_def_lrd: "disabled"
};

function checkStoredSettings(storedSettings) {
  if (!storedSettings.toolbar_button_def_lr || !storedSettings.tab_context_def_lrd || !storedSettings.page_context_def_lrd) {
    browser.storage.sync.set(defaultSettings);
  }
}

const getStoredSettings = browser.storage.sync.get();
getStoredSettings.then(checkStoredSettings, onError);

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
    console.log(lrd);
    if (lrd < 2){
      var NTHcreate = browser.tabs.create({index: ((lrd == 0) ? tab.index : (tab.index + 1))});
      NTHcreate.then(onSuccess, onError);
    }
  }
  lrd = 1;
}

browser.contextMenus.create({
  id: "NTH-page",
  title: browser.i18n.getMessage("NewTabHerePageContextMenu"),
  contexts: ["all"]
}, onCreated)

if(browser.contextMenus.ContextType.TAB)
{
  browser.contextMenus.create({
    id: "NTH-tab",
    title: browser.i18n.getMessage("NewTabHereTabContextMenu"),
    contexts: [browser.contextMenus.ContextType.TAB]
  }, onCreated)
}

browser.contextMenus.onClicked.addListener(
  function(info, tab) {
    switch (info.menuItemId) {
      case "NTH-page":
        function setLRD(pos){
          if(pos.page_context_def_lrd == "left"){
            lrd = 0;
            openTabs([tab]);
          }
          if(pos.page_context_def_lrd == "right"){
            lrd = 1;
            openTabs([tab]);
          }
          if(pos.page_context_def_lrd == "disabled"){
            lrd = 2;
            openTabs([tab]);
          }
          console.log(pos);
        }
        var getting = browser.storage.sync.get("page_context_def_lrd");
        getting.then(setLRD, onError);
        break;
      case "NTH-tab":
        function setLRD(pos){
          if(pos.tab_context_def_lrd == "left"){
            lrd = 0;
            openTabs([tab]);
          }
          if(pos.tab_context_def_lrd == "right"){
            lrd = 1;
            openTabs([tab]);
          }
          if(pos.tab_context_def_lrd == "disabled"){
            lrd = 2;
            openTabs([tab]);
          }
          console.log(pos);
          console.log(pos.tab_context_def_lrd);
        }
        var getting = browser.storage.sync.get("tab_context_def_lrd");
        getting.then(setLRD, onError);
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
  function setLRD(pos){
    if(pos.toolbar_button_def_lr == "left"){
      lrd = 0;
    }
    if(pos.toolbar_button_def_lr == "right"){
      lrd = 1;
    }
    var querying = browser.tabs.query({currentWindow: true, active: true});
    querying.then(openTabs, onError);
    console.log(pos);
  }

  var getting = browser.storage.sync.get("toolbar_button_def_lr");
  getting.then(setLRD, onError);

  console.log("Opening new tab (toolbar button)");
});
