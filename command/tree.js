let path = require("path");
let fs = require("fs");

function tree(src, noOfDir){ 
    if(src == undefined){
        src = process.cwd();
    }
    let content = fs.readdirSync(src);
    let parentFolderName = path.basename(src);

    let completePath = "|__" + parentFolderName;
    
    for(let i=0; i<content.length; i++){
        let filePath = path.join(src, content[i]);
        if(fs.statSync(filePath).isFile()){
            completePath = completePath + "\n";
            for(let i=0; i<=noOfDir; i++){
                completePath = completePath + "\t";
            }
            completePath = completePath +"|---"+content[i];
        }else {
            completePath = completePath + "\n";
            for(let i=0; i<=noOfDir; i++){
                completePath = completePath + "\t";
            }

            completePath = completePath + tree(filePath, noOfDir + 1);
        }
    }

    return completePath;
}

module.exports = {
    treefxn: tree,
}