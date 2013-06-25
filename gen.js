var fs = require('fs'),
    ejs = require('ejs'),
    path = require('path');

var idefs = JSON.parse(fs.readFileSync('v0.18.0.json')),
    classTemplate = ejs.compile(fs.readFileSync(path.resolve("./templates/class.cc.ejs")).toString(), {filename: 'class.cc'}),
    headerTemplate = ejs.compile(fs.readFileSync(path.resolve("./templates/header.h.ejs")).toString(), {filename: 'header.h'});

for (var i in idefs) {
  var idef = idefs[i];
  if (["Oid", "Blob", "Repo", "Reference", "Object", "TreeEntry", "Commit", "Signature", "Time", "Index", "Tag", "Threads", "Tree", "DiffList", "Patch", "Delta", "DiffOptions", "DiffFindOptions", "DiffFile", "DiffRange"].indexOf(idef.jsClassName) > -1) {
    fs.writeFileSync(
      path.resolve("./include/" + idef.filename), headerTemplate(idef));
    fs.writeFileSync(
      path.resolve("./src/" + path.basename(idef.filename, '.h') + '.cc'), classTemplate(idef));
  }
}