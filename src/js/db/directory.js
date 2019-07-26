/*
Folder composto por folder and files
{"name": "New Folder",files: [{newFile,newFile}]}

*/
function newFolder(name){
  return {
    name: name,
    open: false,
    files: []
  }
}

function newFile(name,href){
  return {
    name: name,
    href: href,
  }
}
