electron = require('electron');
const fs = require("fs");
const path = require('path');

const remote = require("electron").remote;
const constants = remote.require("./constants.js");
const abrDoc = require("./abr-document.js");

const dirPath = constants.path.userConfig;

//Read JSON File
var data = fs.readFileSync(dirPath);

//Parse to a JSON Object
var settingsJSON = JSON.parse(data.toString());

//Run the required functions to start the system after the DOM loads
window.onload = function() {
    SetupSettings();
}

function SetupSettings() {
    // Auto Preview
    document.getElementsByClassName("photo-checkbox")[0].checked = settingsJSON.autopreview.image;
    document.getElementsByClassName("todolist-checkbox")[0].checked = settingsJSON.autopreview.todolist;
    document.getElementsByClassName("iframe-checkbox")[0].checked = settingsJSON.autopreview.iframe;
    document.getElementsByClassName("anchor-checkbox")[0].checked = settingsJSON.autopreview.anchor;
    document.getElementsByClassName("math-checkbox")[0].checked = settingsJSON.autopreview.math;

    // Language
    document.getElementById("language").value = settingsJSON.spellchecker.language;

    // Font size
    document.getElementById("font-size").value = settingsJSON.editor["font-size"];

    // Themes
    GetThemes();
    document.getElementById("themes").value = settingsJSON.theme;

    //Spellchecker
    document.getElementsByClassName("spell-checkbox")[0].checked = settingsJSON.spellchecker.active;
}

function saveSettingsToObject() {

    console.log("Saving settings");
    // Auto Preview
    settingsJSON.autopreview.image = document.getElementsByClassName("photo-checkbox")[0].checked;
    settingsJSON.autopreview.todolist = document.getElementsByClassName("todolist-checkbox")[0].checked;
    settingsJSON.autopreview.iframe = document.getElementsByClassName("iframe-checkbox")[0].checked;
    settingsJSON.autopreview.anchor =  document.getElementsByClassName("anchor-checkbox")[0].checked;
    settingsJSON.autopreview.math = document.getElementsByClassName("math-checkbox")[0].checked;

    // Language
    settingsJSON.spellchecker.language = document.getElementById("language").value;

    // Font Size
    settingsJSON.editor["font-size"] = document.getElementById("font-size").value;

    // Themes
    settingsJSON.theme = document.getElementById("themes").value;

    //Spellchecker
    saveSettingsToFile();
    settingsJSON.spellchecker.active = document.getElementsByClassName("spell-checkbox")[0].checked;

}

function saveSettingsToFile() {
    console.log("Save Settings to file");
    console.log(JSON.stringify(settingsJSON));
    try {
        fs.writeFileSync(dirPath, JSON.stringify(settingsJSON), 'utf-8');
        var window = remote.getCurrentWindow();
        window.close();
    }
    catch(e) {
        alert('ERROR: Failed to save Settings');
    }
}

function GetThemes() {
    var location = constants.path.themesDir;
    var folderContent = fs.readdirSync(constants.path.themesDir);
    var themeSelect = document.getElementById("themes");



    var Names = [];

    for (var i = 0; i < folderContent.length; i++) {
        var option = document.createElement("option");
        option.text = folderContent[i];
        option.value = folderContent[i];
        themeSelect.add(option);
        console.log(option);
    }

}
