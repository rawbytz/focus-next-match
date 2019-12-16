// ==UserScript==
// @name         WorkFlowy Focus Next Match
// @namespace    https://rawbytz.wordpress.com
// @version      1.8.1
// @description  Use F3 to move focus between search results
// @author       rawbytz
// @match        https://workflowy.com/*
// @match        https://beta.workflowy.com/*
// @updateUrl    https://github.com/rawbytz/focus-next-match/raw/master/focusNextMatch.user.js
// @downloadUrl  https://github.com/rawbytz/focus-next-match/raw/master/focusNextMatch.user.js
// @grant        none
// @run-at       document-end

// ==/UserScript==

(function () {
  'use strict';
  function focusNextMatch() {
    if (WF.currentSearchQuery()) {
      const matches = document.querySelectorAll(".name.matches .content, .notes.matches .content");
      const f = WF.focusedItem();
      var t = 0;
      if (f) {
        for (var i = 0; i < matches.length - 1; i++) {
          var mID = matches[i].parentNode.parentNode.attributes.projectid.nodeValue;
          if (mID === f.getId()) {
            t = i + 1;
            break;
          }
        }
      }
      matches[t].focus();
    } else {
      const c = WF.currentItem();
      const ch = c.getVisibleChildren();
      const s = ch.length === 0 ? c : ch[0];
      s.getElement().getElementsByClassName("content")[0].focus()
    }
  }
  document.addEventListener("keydown", function (event) {
    if (event.key === "F3") {
      focusNextMatch();
      event.stopPropagation();
      event.preventDefault();
    }
  });
})();