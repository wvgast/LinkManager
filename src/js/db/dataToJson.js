var jsonFolder;

function getSyncFolder(){
  chrome.storage.sync.get(['folder'], function(result) {
    try{
      if(typeof result.folder == 'undefined'){
        jsonFolder = null;
      }else{
        jsonFolder = JSON.parse(result.folder);
      }
    }catch(err){
      console.log("Erro ao tentar converter");
      jsonFolder = null;
    }
  });
}


function saveSyncFolder(data){
  chrome.storage.sync.set({folder: JSON.stringify(data)}, function() {
    console.log('Salvando no storage');
  });
}
