var lrd = 1;

// Content Security Policy: The page’s settings blocked the loading of a resource at inline (“default-src”).
// FIXED: Currently blocking context menus left.

var defaultSettings = {
  toolbar_button_def_lr: "right",
  tab_context_def_lrd: "left",
  page_context_def_lrd: "disabled",
  toolsmen_def_lrd: "right",
  keyboard_def_lrd: "right"
};

function checkStoredSettings(storedSettings) {
  if (!storedSettings.toolbar_button_def_lr || !storedSettings.tab_context_def_lrd || !storedSettings.page_context_def_lrd ||
      !storedSettings.toolsmen_def_lrd || !storedSettings.keyboard_def_lrd) {
    browser.storage.sync.set(defaultSettings);
  }
}

const getStoredSettings = browser.storage.sync.get();
getStoredSettings.then(checkStoredSettings, onError);

function onCreated() {
  if (browser.runtime.lastError) {
    console.log(`Error: ${browser.runtime.lastError}`);
  } else {
    //console.log("Context menu entry created successfully.");
  }
}

function onSuccess(tab) {
  //console.log(`Created new tab here: ${tab.index}`);
}

function onError(error) {
  console.log(`Error: ${error}`);
}

function openTabs(tabs) {
  for (let tab of tabs) {
    //console.log(tab.index);
    //console.log(lrd);
    if (lrd < 2){
      var NTHcreate = browser.tabs.create({index: ((lrd == 0) ? tab.index : (tab.index + 1))});
      NTHcreate.then(onSuccess, onError);
    }
  }
  lrd = 1;
}

function openTabsRight(tabs) {
  for (let tab of tabs) {
    if (lrd < 2){
      var NTHcreate = browser.tabs.create({index: tab.index + 1});
      NTHcreate.then(onSuccess, onError);
    }
  }
  lrd = 1;
}

function openTabsLeft(tabs) {
  for (let tab of tabs) {
    if (lrd < 2){
      var NTHcreate = browser.tabs.create({index: tab.index});
      NTHcreate.then(onSuccess, onError);
    }
  }
  lrd = 1;
}

function createMenus(){

  // Page context menu.
  function createPageContextMenu(setting) {
    if(setting.page_context_def_lrd != "disabled"){
      browser.menus.create({
        id: "NTH-page",
        title: browser.i18n.getMessage("NewTabHerePageContextMenu"),
        contexts: ["all"]
      }, onCreated)
    }
  }

  // Tab context menu.
  function createTabContextMenu(setting) {
    if(setting.tab_context_def_lrd != "disabled"){
      if(browser.menus.ContextType.TAB)
      {
        browser.menus.create({
          id: "NTH-tab",
          title: browser.i18n.getMessage("NewTabHereTabContextMenu"),
          contexts: [browser.menus.ContextType.TAB]
        }, onCreated)
      }
    }
  }

  // Tools menu entry.
  function createFileMenuEntry(setting) {
    if(setting.toolsmen_def_lrd != "disabled"){
      browser.menus.create({
        id: "NTH-menu",
        title: browser.i18n.getMessage("NewTabHereToolsMenu"),
        contexts: ["tools_menu"],
      }, onCreated);
    }
  }

  var getting1 = browser.storage.sync.get("page_context_def_lrd");
  getting1.then(createPageContextMenu, onError);

  var getting2 = browser.storage.sync.get("tab_context_def_lrd");
  getting2.then(createTabContextMenu, onError);

  var getting3 = browser.storage.sync.get("toolsmen_def_lrd");
  getting3.then(createFileMenuEntry, onError);

  // Menu listeners.
  browser.menus.onClicked.addListener(
    function(info, tab) {
      switch (info.menuItemId) {
      case "NTH-page":
        function setLRD1(pos){
          if(pos.page_context_def_lrd == "left"){
            lrd = 0;
          }
          if(pos.page_context_def_lrd == "right"){
            lrd = 1;
          }
          if(pos.page_context_def_lrd == "disabled"){
            lrd = 2;
          }
          openTabs([tab]);
          //console.log(pos);
        }
        var getting = browser.storage.sync.get("page_context_def_lrd");
        getting.then(setLRD1, onError);
        break;
      case "NTH-tab":
        function setLRD2(pos){
          if(pos.tab_context_def_lrd == "left"){
            //openTabsLeft([tab]);
            lrd = 0;
          }
          if(pos.tab_context_def_lrd == "right"){
            //openTabsRight([tab]);
            lrd = 1;
          }
          if(pos.tab_context_def_lrd == "disabled"){
            lrd = 2;
          }
          openTabs([tab]);
          //console.log(pos);
          //console.log(pos.tab_context_def_lrd);
        }
        var getting = browser.storage.sync.get("tab_context_def_lrd");
        getting.then(setLRD2, onError);
        break;
      case "NTH-menu":
        function setLRD3(pos){
          if(pos.toolsmen_def_lrd == "left"){
            lrd = 0;
          }
          if(pos.toolsmen_def_lrd == "right"){
            lrd = 1;
          }
          if(pos.toolsmen_def_lrd == "disabled"){
            lrd = 2;
          }
          openTabs([tab]);
          //console.log(pos);
          //console.log(pos.tab_context_def_lrd);
        }
        var getting = browser.storage.sync.get("toolsmen_def_lrd");
        getting.then(setLRD3, onError);
        break;
      }
    })

  }

  createMenus();

  // Keyboard shortcut.
  browser.commands.onCommand.addListener(function(command) {
    if (command == "new-tab-here") {
      function setLRD(pos){
        if(pos.keyboard_def_lrd == "left"){
          lrd = 0;
        }
        if(pos.keyboard_def_lrd == "right"){
          lrd = 1;
        }
        if(pos.keyboard_def_lrd == "disabled"){
          lrd = 2;
        }
        var querying = browser.tabs.query({currentWindow: true, active: true});
        querying.then(openTabs, onError);
      }
      var getting = browser.storage.sync.get("keyboard_def_lrd");
      getting.then(setLRD, onError);
      //console.log("Opening new tab (keyboard shortcut)");
    }
  });

  // Toolbar button.
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
      //console.log(pos);
    }

    var getting = browser.storage.sync.get("toolbar_button_def_lr");
    getting.then(setLRD, onError);

    //console.log("Opening new tab (toolbar button)");
  });
