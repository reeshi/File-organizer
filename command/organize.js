let fs = require("fs");
let path = require("path");

let types = {
    media: ["mp4", "mkv"],
    archives: ["zip", "7z", "rar", "tar", "gz", "ar", "iso"],
    documents: ["docx", "doc", "pdf", "xlsx", "xls", "odt", "txt"],
    app: ["exe", "dmg", "pkg", "deb", "msi"],
}

function organize(src){
    if(src == undefined){
        src = process.cwd();
    }

    let organizedDirPath = path.join(src, "organized file");

    if(fs.existsSync(organizedDirPath)){
        console.log("Your Files is already organized");
        return;
    }

    fs.mkdirSync(organizedDirPath);
    
    let mediaDirPath = path.join(organizedDirPath, "media");
    
    let archivesDirPath = path.join(organizedDirPath, "archives");
    
    let documentsDirPath = path.join(organizedDirPath, "documents");
   
    let appDirPath = path.join(organizedDirPath, "app");
    
    let othersDirPath = path.join(organizedDirPath, "others");
    
    let allFiles = fs.readdirSync(src);
    
    for(let i=0; i<allFiles.length; i++){

        let filePath = path.join(src, allFiles[i]);
        let fileName = path.basename(filePath);
        let fileType = allFiles[i].split(".").pop();
        let statsOfPath = fs.statSync(filePath);

        if(statsOfPath.isFile()){
            if(types.media.includes(fileType)){

                if(fs.existsSync(mediaDirPath) == false){
                    fs.mkdirSync(mediaDirPath);
                }
                let destMediaDir = path.join(mediaDirPath, fileName);
                fs.copyFileSync(filePath, destMediaDir);
                console.log(`${fileName} belongs to --> media`);

            }else if(types.archives.includes(fileType)){

                if(fs.existsSync(archivesDirPath) == false){
                    fs.mkdirSync(archivesDirPath);
                }

                let destArchivesDir = path.join(archivesDirPath, fileName);
                fs.copyFileSync(filePath, destArchivesDir);
                console.log(`${fileName} belongs to --> archives`);

            }else if(types.documents.includes(fileType)){

                if(fs.existsSync(documentsDirPath) == false){
                    fs.mkdirSync(documentsDirPath);
                }
                let destDocumentsDir = path.join(documentsDirPath, fileName);
                fs.copyFileSync(filePath, destDocumentsDir);
                console.log(`${fileName} belongs to --> documents`);

            }else if(types.app.includes(fileType)){

                if(fs.existsSync(appDirPath) == false){
                    fs.mkdirSync(appDirPath);
                }

                let destAppDir = path.join(appDirPath, fileName);
                fs.copyFileSync(filePath, destAppDir);
                console.log(`${fileName} belongs to --> app`);

            }else{

                if(fs.existsSync(othersDirPath) == false){
                    fs.mkdirSync(othersDirPath);
                }

                let destOtherDir = path.join(othersDirPath, fileName);
                fs.copyFileSync(filePath, destOtherDir);
                console.log(`${fileName} belongs to --> others`);
            }
        }
    }

    console.log("Hurray!!, I organized all your files 😊")
}

module.exports = {
    organizefxn: organize,
}