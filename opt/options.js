function recreateMenus() {
  //browser.contextMenus.removeAll();
  //createMenus();
  browser.runtime.reload();
}

function saveOptions(e) {
  e.preventDefault();
  browser.storage.sync.set({
    toolbar_button_def_lr: document.querySelector("#toolbar_button_def_lr").value,
    tab_context_def_lrd: document.querySelector("#tab_context_def_lrd").value,
    page_context_def_lrd: document.querySelector("#page_context_def_lrd").value,
    toolsmen_def_lrd: document.querySelector("#toolsmen_def_lrd").value,
    keyboard_def_lrd: document.querySelector("#keyboard_def_lrd").value
  });
  //recreateMenus();
}

var defaultSettings = {
  toolbar_button_def_lr: "right",
  tab_context_def_lrd: "left",
  page_context_def_lrd: "disabled",
  toolsmen_def_lrd: "right",
  keyboard_def_lrd: "right"
};

function clearOptions(e) {
  e.preventDefault();
  browser.storage.sync.set(defaultSettings);
  restoreOptions();
  //recreateMenus();
}

function restoreOptions() {

  function setTbBD_lr(result) {
    document.querySelector("#toolbar_button_def_lr").value = result.toolbar_button_def_lr || "right";
  }

  function setTCmD_lrd(result) {
    document.querySelector("#tab_context_def_lrd").value = result.tab_context_def_lrd || "left";
  }

  function setPCmD_lrd(result) {
    document.querySelector("#page_context_def_lrd").value = result.page_context_def_lrd || "disabled";
  }

  function setTMenD_lrd(result) {
    document.querySelector("#toolsmen_def_lrd").value = result.toolsmen_def_lrd || "right";
  }

  function setKeyD_lrd(result) {
    document.querySelector("#keyboard_def_lrd").value = result.keyboard_def_lrd || "right";
  }

  function onError(error) {
    console.log(`Error: ${error}`);
  }

  var getting_tb_b_d_lr = browser.storage.sync.get("toolbar_button_def_lr");
  getting_tb_b_d_lr.then(setTbBD_lr, onError);

  var getting_t_cm_d_lrd = browser.storage.sync.get("tab_context_def_lrd");
  getting_t_cm_d_lrd.then(setTCmD_lrd, onError);

  var getting_p_cm_d_lrd = browser.storage.sync.get("page_context_def_lrd");
  getting_p_cm_d_lrd.then(setPCmD_lrd, onError);

  var getting_t_men_d_lrd = browser.storage.sync.get("toolsmen_def_lrd");
  getting_t_men_d_lrd.then(setTMenD_lrd, onError);

  var getting_key_d_lrd = browser.storage.sync.get("keyboard_def_lrd");
  getting_key_d_lrd.then(setKeyD_lrd, onError);

}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
document.querySelector("form").addEventListener("reset", clearOptions);

/*
 * depricated
//i18n
function i18n_string(obj, tag) {
    var msg = tag.replace(/__(\w+)__/g, function(match, v1) {
        return v1 ? browser.i18n.getMessage(v1) : '';
    });

    if(msg != tag) obj.innerHTML = msg;
}

function html_i18n() {
    var page = document.getElementsByTagName('body');

    for (var j = 0; j < page.length; j++) {
        var obj = page[j];
        var tag = obj.innerHTML.toString();

        i18n_string(obj, tag);
    }
}

//html_i18n();
*/
