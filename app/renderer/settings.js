electron = require('electron');
const fs = require("fs");
const path = require('path');

var remote = require("electron").remote;
var constants = remote.require("./constants.js");
var abrDoc = require("./abr-document.js");

var dirPath = constants.path.userConfig;

//Read JSON File
var data = fs.readFileSync(dirPath);
console.log(data.toString());

//Parse to a JSON Object
var mydata = JSON.parse(data.toString());

//Setup AutoPreview
window.onload = function() {
    // Auto Preview
    document.getElementsByClassName("photo-checkbox")[0].checked = mydata.autopreview.image;
    document.getElementsByClassName("todolist-checkbox")[0].checked = mydata.autopreview.todolist;
    document.getElementsByClassName("iframe-checkbox")[0].checked = mydata.autopreview.iframe;
    document.getElementsByClassName("anchor-checkbox")[0].checked = mydata.autopreview.anchor;
    document.getElementsByClassName("math-checkbox")[0].checked = mydata.autopreview.math;

    // Language
    document.getElementById("language").value = mydata.spellchecker.language;

    // Font size
    document.getElementById("font-size").value = mydata.editor["font-size"];

    // Themes
    document.getElementById("themes").value = mydata.theme;

    //Spellchecker
    document.getElementsByClassName("spell-checkbox")[0].checked = mydata.spellchecker.active;
}

function saveSettingsToObject() {
    console.log("Saving settings");
    // Auto Preview
    mydata.autopreview.image = document.getElementsByClassName("photo-checkbox")[0].checked;
    mydata.autopreview.todolist = document.getElementsByClassName("todolist-checkbox")[0].checked;
    mydata.autopreview.iframe = document.getElementsByClassName("iframe-checkbox")[0].checked;
    mydata.autopreview.anchor =  document.getElementsByClassName("anchor-checkbox")[0].checked;
    mydata.autopreview.math = document.getElementsByClassName("math-checkbox")[0].checked;

    // Language
    mydata.spellchecker.language = document.getElementById("language").value;

    // Font Size
    mydata.editor["font-size"] = document.getElementById("font-size").value;

    // Themes
    mydata.theme = document.getElementById("themes").value;

    //Spellchecker
    mydata.spellchecker.active = document.getElementsByClassName("spell-checkbox")[0].checked;

    saveSettingsToFile();
}

function saveSettingsToFile() {
    console.log("Save Settings to file");
    console.log(JSON.stringify(mydata));
    try {
        fs.writeFileSync(dirPath, JSON.stringify(mydata), 'utf-8');
        var window = remote.getCurrentWindow();
        window.close();
    }
    catch(e) {
        alert('ERROR: Failed to save Settings');
    }
}
