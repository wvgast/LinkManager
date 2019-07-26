


function saveFolder(nameFolder){
  var js = jsonFolder;
  if(js != null){
    var fold = newFolder(nameFolder);
    js.folder.push(fold);
    saveSyncFolder(js);
    refreshFolder();
  }
}

function saveNewFile(file,index){
  var js = jsonFolder;
  if(js != null){
    js.folder[index].files.push(file);
    saveSyncFolder(js);
  }
}

function clear(){
  chrome.storage.sync.set({folder: '{"folder": []}'}, function() {
  });
  refreshFolder();
}

function removeFolder(index){
  var js = jsonFolder;
  if(js != null){
    js.folder.splice(index,index+1);
    saveSyncFolder(js);
    refreshFolder();
  }
}

function removeFile(foldInd,index){
  var js = jsonFolder;
  if(js != null){
    js.folder[foldInd].files.splice(index,index+1);
    saveSyncFolder(js);
  }
}

function renameFile(arr,rename){
  var js = jsonFolder;
  if(js != null){
    js.folder[arr[0]].files[arr[1]].name = rename;
    saveSyncFolder(js);
  }
}

function renameFolder(index,rename){
  var js = jsonFolder;
  if(js != null){
    js.folder[index].name = rename;
    saveSyncFolder(js);
  }
}

function updateOpenFolder(index,open){
  var js = jsonFolder;
  if(js != null){
    js.folder[index].open = open;
    saveSyncFolder(js);
  }
}
