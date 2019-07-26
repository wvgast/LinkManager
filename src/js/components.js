
//<div class="adClass"></div>
function divClass(adClass){
  var doc = document.createElement('div');
  $(doc).addClass(adClass);
  return doc;
}

//<i class="nameClass"></i>
function createIcon(nameClass){
  var i = document.createElement('i');
  $(i).addClass(nameClass);
  return i;
}

function createInput(nameClass){
  var input = document.createElement('input');
  $(input).addClass(nameClass);
  $(input).attr('type','text');
  return input;
}

// <button class='btn-icon'></button>
function buttonIcon(){
  var button = document.createElement('button');
  $(button).addClass('btn-icon');
  return button;
}

//<span class='text-to-icon'>text</span>
function textToIcon(text){
  var span = document.createElement('span');
  $(span).addClass('text-to-icon');
  $(span).html(text);
  return span;
}

//<button class='btn-icon btn-action-folder btn-icon-folder'>createIcon()textToIcon()</button>
function buttonFolder(text,index){
  var button = buttonIcon();
  $(button).addClass('btn-action-folder');
  $(button).addClass('btn-icon-folder');
  $(button).attr('data-index',index);
  var icon = createIcon('fas fa-folder');
  $(button).append(icon);
  $(button).append(textToIcon(text));
  return button;
}

//<a href='link' class='btn-icon item'>createIcon()textToIcon()</a>
function fileLink(index,link,name){
  var a = document.createElement('button');
  $(a).attr('data-href',link);
  $(a).attr('data-index',index);
  $(a).attr('data-type','link');
  $(a).addClass('btn-file-action');
  $(a).addClass('btn-icon');
  $(a).append(createIcon('fas fa-file-alt'));
  $(a).append(textToIcon(name));
  return a;
}

function buttonToolsFolder(){
  var tools = divClass('tools-click-folder');
  var tool = divClass('tools-item-click');
  $(tool).attr('id','eraserFolder');
  $(tools).append(tool);
  return tools;
}
