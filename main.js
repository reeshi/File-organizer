let heplObject = require("./command/help");
let organizeObject = require("./command/organize");
let treeObject = require("./command/tree");

let inputArr = process.argv.slice(2);

let cmd = inputArr[0];
let path = inputArr[1];

if(cmd == "tree"){
    console.log(treeObject.treefxn(path, 0));
}else if(cmd == "organize"){
    organizeObject.organizefxn(path);
}else if(cmd == "help"){
    heplObject.helpfxn();
}else{
    console.log("kindly enter valid command 🙏");
}