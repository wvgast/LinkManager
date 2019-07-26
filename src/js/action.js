$(document).ready(()=>{

});
/*function SandHideListItem(obj){

}*/

var keyPress;

document.addEventListener('keydown', function (event) {
  keyPress = event.keyCode;
});

document.addEventListener('keyup', function (event) {
  keyPress = 0;
});

function actionFolder(){
  $('.btn-action-folder').on("click",function(){
    if(keyPress == 17)
    {
      setInputToRename(this);
      onFocusFolderRename();
    }else{
      let par = $(this).parent();
      let index = parseInt($(this).attr('data-index'));
      let pr = par.children(".listitem");
      var open;
      if($(pr).is(":visible")){
        open = false;
        $(pr).hide();
      }else{
        open = true;
        $(pr).show();
      }
      updateOpenFolder(index,open);

    }
  });

  $('.btn-action-folder-newfile').on("click",function(){

  });
}

function actionSaveFileFolder(){
    $('.btn-action-folderSave').on("click",function(){
      var index = parseInt($(this).attr('data-index'));
      var url = $('#input-newUrl').val();
      var name = $('#input-newfolder').val();
      if(name != '' && url != ''){
        var index = $(this).attr('data-index');
        saveNewFile(newFile(name,url),index);
        $('.btn-action-folder').addClass('btn-action-folderSave');
        $('.btn-action-folder').removeClass('btn-action-folder');
        cancelOtherActionPlus();
        refreshFolder();
      }else{

      }
    });
}

function refreshFolder(){
  chrome.storage.sync.get(['folder'], function(result) {
    if(typeof result.folder != 'undefined'){
    var obj = JSON.parse(result.folder);
    jsonFolder = JSON.parse(result.folder);
    if(jsonFolder.folder.length == 0){
      $('#directorys').html('');
    }else{
      $('#directorys').html('');
      for(fl in jsonFolder.folder){
        var div = divClass('dirItem');
        var folderObj = obj.folder[fl];
        var fold = buttonFolder(obj.folder[fl].name,fl);
        $(div).append(fold);
        var files = jsonFolder.folder[fl].files;
        if(files.length != 0){
          let listitem = divClass('listitem');
          for(f in files){
            $(listitem).append(fileLink(f,files[f].href,files[f].name));
          }
          $(div).append(listitem);
          if(!folderObj.open){
            $(listitem).hide();
          }
        }
        $('#directorys').append(div);
      }
    }
    actionFolder();
    actionFile();
    }
  });
}


function actionNewFolder(){
  $('#newFolder').on("click",function(){
    if($(this).hasClass('btn-icon-plus')){
      cancelOtherActionPlus();
      $(this).removeClass('btn-icon-plus');
      $(this).addClass('btn-icon-save');
      $('#input-newfolder').attr('placeholder','Digite a nova pasta');
      $('#input-newfolder').show();
    }else{
      $(this).removeClass('btn-icon-save');
      $(this).addClass('btn-icon-plus');
      var value = $('#input-newfolder').val();
      $('#input-newfolder').hide();
      if(value.trim() != ''){
        saveFolder(value);
        $('#input-newfolder').val('');
      }
    }
  });
}

function setInputToRename(bt){
  var text = $(bt).children('.text-to-icon').html();
  $(bt).children('.text-to-icon').remove();
  let input = createInput('input-to-icon');
  $(input).val(text);
  $(bt).append(input);
  $(input).focus();
}

function actionFile(){
  $('.btn-file-action').on('click',function(){
    var type = $(this).attr('data-type');
    if(keyPress == 17){
      var text = $(this).children('.text-to-icon').html();
      $(this).children('.text-to-icon').remove();
      let input = createInput('input-to-icon');
      $(input).val(text);
      $(this).append(input);
      $(input).focus();
      onFocusBtn();
    }else{
      switch(type){
        case 'link':
        //window.open($(this).attr('data-href'),'_blank');
        chrome.tabs.create({'url':$(this).attr('data-href')});
        break;
        case 'delete':
          var button = $(this).parent().parent().children('.btn-icon-folder');
          var indexFolder = parseInt($(button).attr('data-index'));
          var indFile = parseInt($(this).attr('data-index'));
          removeFile(indexFolder,indFile);
          cancelOtherActionPlus();
          refreshFolder();
        break;
        case 'editable':
        break;
      }
    }
  });
}

function getDataFile(btn){
  var button = $(btn).parent().parent().children('.btn-icon-folder');
  var indexFolder = parseInt($(button).attr('data-index'));
  var indFile = parseInt($(btn).attr('data-index'));
  return [indexFolder,indFile];
}

function onFocusBtn(){
  $('.btn-file-action').on('focusout',function(){
    var data = getDataFile(this);
    var value = $(this).children('input').val();
    renameFile(data,value);
    refreshFolder();
  });
}

function onFocusFolderRename(){
  $('.btn-action-folder').on('focusout',function(){
    var index = $(this).attr('data-index');
    var value = $(this).children('input').val();
    renameFolder(index,value);
    refreshFolder();
  });
}

function cancelOtherActionPlus(){
    $('.btn-icon-save').addClass('btn-icon-plus');
    $('.btn-icon-save').removeClass('btn-icon-save');
    $('#input-newUrl').val('');
    $('#input-newUrl').hide();
    $('#input-newfolder').hide();
    $('#input-newfolder').val('');
    $('.btn-action-folderSave').addClass('btn-action-folder');
    $('.btn-action-folderSave').removeClass('btn-action-folderSave');
    $('#eraserFile').addClass('btn-icon-remove');
    $('#eraserFile').removeClass('btn-icon-remove-selected');
}
function actionNewFile(){
  $('#newFile').on("click",function(){
    if($(this).hasClass('btn-icon-plus')){
      cancelOtherActionPlus();
      $(this).removeClass('btn-icon-plus');
      $(this).addClass('btn-icon-save');
      $('.btn-icon-save').removeClass('btn-icon-plus');
      $('#input-newfolder').attr('placeholder','Apos digitar o nome selecione a pasta');
      $('#input-newfolder').show();
      $('#input-newUrl').show();
      chrome.tabs.getSelected(null,function(tab) {
        $('#input-newUrl').val(tab.url);
      });
      $('.btn-action-folder').addClass('btn-action-folderSave');
      $('.btn-action-folder').removeClass('btn-action-folder');
      actionSaveFileFolder();
    }else{
      cancelOtherActionPlus();
      refreshFolder();
    }
  });
}

function actionRemoveFileOrFolder(){
  $('.btn-folder-remove').on('click',function(){
    var index = parseInt($(this).attr('data-index'));
    removeFolder(index);
    setToEraser();
    cancelOtherActionPlus();
    refreshFolder();
  });
}

function removeAllItem(){
  $('#eraserFile').on('click',function(){
    if($(this).hasClass('btn-icon-remove')){
      cancelOtherActionPlus();
      $(this).addClass('btn-icon-remove-selected');
      $(this).removeClass('btn-icon-remove');
      setToEraser();
    }else{
      cancelOtherActionPlus();
      refreshFolder();
    }
  });
}

function setToEraser(){
  $('.btn-action-folder').addClass('btn-folder-remove');
  $('.btn-folder-remove').removeClass('btn-action-folder');
  $('.btn-file-action').addClass('btn-file-remove');
  $('.btn-file-action').attr('data-type','delete');
  actionRemoveFileOrFolder();
}
function clearEraser(){
  refreshFolder();
}

function actionInfo(){
  $('#infoUse').on('click',function(){
    $('#popup-info').show();
  });

  $('#infoUse').on('focusout',function(){
    $('#popup-info').hide();
  });
}
