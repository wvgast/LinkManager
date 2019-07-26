$(document).ready(function(){
  /*chrome.storage.sync.set({key: 1}, function() {
        console.log('Value is set to ');
      });
      */
      (function createKey()
      {
        chrome.storage.sync.get(['folder'], function(result) {
          if(typeof result.folder == 'undefined'){
              clear();
          }
        });
      }());
      actionNewFolder();
      actionNewFile();
      removeAllItem();
      actionInfo();
      refreshFolder();
});
