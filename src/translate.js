'use strict';

const i18n = {
  localize () {
    document.removeEventListener('DOMContentLoaded', i18n.translate);
    document.querySelector('html').setAttribute('lang', browser.i18n.getUILanguage());

    let i=0;
    while(document.getElementById("loc" + i) != null) {
      document.getElementById("loc" + i).innerHTML = browser.i18n.getMessage(document.getElementById("loc" + i).innerHTML);
      i++;
    }
  }
};

window.addEventListener('DOMContentLoaded', i18n.localize);
