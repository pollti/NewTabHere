function saveOptions(e) {
  e.preventDefault();
  browser.storage.sync.set({
    toolbar_button_def_lr: document.querySelector("#toolbar_button_def_lr").value,
    tab_context_def_lrd: document.querySelector("#tab_context_def_lrd").value,
    page_context_def_lrd: document.querySelector("#page_context_def_lrd").value
  });
}

var defaultSettings = {
  toolbar_button_def_lr: "right",
  tab_context_def_lrd: "left",
  page_context_def_lrd: "disabled"
};

function clearOptions(e) {
  e.preventDefault();
  browser.storage.sync.set(defaultSettings);
  restoreOptions();
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

  function onError(error) {
    console.log(`Error: ${error}`);
  }

  var getting_tb_b_d_lr = browser.storage.sync.get("toolbar_button_def_lr");
  getting_tb_b_d_lr.then(setTbBD_lr, onError);

  var getting_t_cm_d_lr = browser.storage.sync.get("tab_context_def_lrd");
  getting_t_cm_d_lr.then(setTCmD_lrd, onError);

  var getting_p_cm_d_lr = browser.storage.sync.get("page_context_def_lrd");
  getting_p_cm_d_lr.then(setPCmD_lrd, onError);

}

document.addEventListener("DOMContentLoaded", restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);
document.querySelector("form").addEventListener("reset", clearOptions);
