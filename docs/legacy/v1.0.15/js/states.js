// F/T

var fWL = 0;

// No XSS allowed

function ret_san(str) {
    return str.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\'/g, "").replace(/`/g, "");
}

// Exports localStorage as JSON

function exportLocalStorage(downloadLocalStorage) {
    var mem;
    var storage = "";
    var localStorageJSON;
    for (var i = 0; i < localStorage.length; i++) {
        if (localStorage.getItem(localStorage.key(i)).indexOf("[" || "]") == -1) {
            if (localStorage.key(i) == "setup" || localStorage.key(i) == "fillScreen" || localStorage.key(i) == "desktopMode" || localStorage.key(i) == "audioStatus" || localStorage.key(i) == "autoSave") {
                mem = "\"name\": \"" + localStorage.key(i) + "\", \"inner\": \"" + localStorage.getItem(localStorage.key(i)).replace(/\"/g, "") + "\" }, {";
            } else {
                if (localStorage.key(i) != "currentSkin") {
                    mem = "\"name\": \"" + localStorage.key(i) + "\", \"inner\": \"" + localStorage.getItem(localStorage.key(i)) + "\" }, {";
                }
            }
        } else {
            if (localStorage.key(i) != "currentSkin") {
                mem = "\"name\": \"" + localStorage.key(i) + "\", \"inner\": " + localStorage.getItem(localStorage.key(i)) + "}, {";
            }
        }
        if (mem != undefined) {
            storage = storage + mem;
        }
    }
    localStorageJSON = "{ \"IMPORTANT_READ_ME\": \"Please copy the entirity of this page and create a new file with the extension '.eclipse'.  Open the new file, and paste the copied text inside.  You will only see this page once, the next launch of Eclipse will not show this.\", \"eclipse\": [{ " + storage;
    localStorageJSON = localStorageJSON.substring(0, localStorageJSON.lastIndexOf(",")).replace("'", "\'") + ' ]}';
    localStorageJSON = localStorageJSON.replace(/""/g, "\"");
    if (downloadLocalStorage !== 0) {
        if (window.navigator.standalone) {
            location = "data:text/html,<script>document.onkeydown = function (event) { event.preventDefault(); };</script><meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\"><textarea style='width:100%;height:100%;border:none;border-radius:0'>" + localStorageJSON + "</textarea>";
        } else {
            var blob = new Blob([localStorageJSON], {
                type: "text/plain;charset=utf-8"
            });
            saveAs(blob, new Date().getTime() + ".eclipse");
        }
    } else {
        return localStorageJSON;
    }
}

// Loads .eclipse file

function recover(text) {
    if (!text) {
        throw "Empty";
        return false;
    }
    if (text == "") {
        throw "Empty";
        return false;
    }
    try {
        localStorage.clear();
        for (var i = 0; i < JSON.parse(text).eclipse.length; i++) {
            if (ret_san(JSON.stringify(JSON.parse(text).eclipse[i].name)).replace(/\"/g, "") == "currentSkin" || ret_san(JSON.stringify(JSON.parse(text).eclipse[i].name)).replace(/\"/g, "") == "setup" || ret_san(JSON.stringify(JSON.parse(text).eclipse[i].name)).replace(/\"/g, "") == "fillScreen" || ret_san(JSON.stringify(JSON.parse(text).eclipse[i].name)).replace(/\"/g, "") == "desktopMode" || ret_san(JSON.stringify(JSON.parse(text).eclipse[i].name)).replace(/\"/g, "") == "audioStatus" || ret_san(JSON.stringify(JSON.parse(text).eclipse[i].name)).replace(/\"/g, "") == "autoSave") {
                localStorage.setItem(ret_san(JSON.stringify(JSON.parse(text).eclipse[i].name)).replace(/\"/g, ""), ret_san(JSON.stringify(JSON.parse(text).eclipse[i].inner)).replace(/\"/g, ""));
            } else {
                localStorage.setItem(ret_san(JSON.stringify(JSON.parse(text).eclipse[i].name)).replace(/\"/g, ""), ret_san(JSON.stringify(JSON.parse(text).eclipse[i].inner)));
            }
        }
        location.reload();
    } catch (err) {
        throw "Error";
        return false;
    }
}

function load_Eclipse_storage_file(file, url) {
    if (fWL == 2) {
        eclipse.dialog.confirm('Performing this action will erase all of your data and overwrite it with the data contained in the textbox, are you sure you would like to continue?', 'Eclipse', function(){ textAreaData(); });
        return false;
    }
    var liod;
    var fext;
    if (fWL == 1) {
        liod = document.getElementById("localFile").value.lastIndexOf('.');
        fext = document.getElementById("localFile").value.substring(liod + 1);
    } else {
        liod = document.getElementById("fileURL").value.lastIndexOf('.');
        fext = document.getElementById("fileURL").value.substring(liod + 1);
    }
    if (fext == "igba") {
        if (file != null && url == null) {
            load_iGBA_storage_file(file, null);
        } else if (url != null && file == null) {
            load_iGBA_storage_file(null, url);
        } else {
            eclipse.dialog.alert("An error has occurred and the operation was cancelled.", 'Eclipse');
        }
        return false;
    } else if (fext != "eclipse") {
        eclipse.dialog.alert("An error has occurred and the operation was cancelled.", 'Eclipse');
        return false;
    }
    eclipse.dialog.confirm('Performing this action will erase all of your data and overwrite it with the data contained in the file, are you sure you would like to continue?', 'Eclipse',
        function() {
            eclipse.preloader.show('Loading');
            window.setTimeout(function() {
                if (file && url) {
                    eclipse.preloader.hide();
                    eclipse.dialog.alert('You cannot input a file and a URL.', 'Eclipse');
                    return false;
                }
                if (file) {
                    if (document.getElementById("localFile").files[0] == null) {
                        eclipse.preloader.hide();
                        eclipse.dialog.alert("You must specify a file.", 'Eclipse');
                        return false;
                    }
                    var f = document.getElementById("localFile").files[0];
                    if (f) {
                        var r = new FileReader();
                        r.onload = function(e) {
                            var contents = e.target.result;
                            if (contents == "") {
                                eclipse.preloader.hide();
                                eclipse.dialog.alert("An error has occurred and the operation was cancelled.", 'Eclipse');
                                return false;
                            }
                            window.setTimeout(function() {
                                var localStorageJSON = exportLocalStorage(0);
                                try {
                                    localStorage.clear();
                                    for (var i = 0; i < JSON.parse(contents).eclipse.length; i++) {
                                        if (ret_san(JSON.stringify(JSON.parse(contents).eclipse[i].name)).replace(/\"/g, "") == "currentSkin" || ret_san(JSON.stringify(JSON.parse(contents).eclipse[i].name)).replace(/\"/g, "") == "setup" || ret_san(JSON.stringify(JSON.parse(contents).eclipse[i].name)).replace(/\"/g, "") == "fillScreen" || ret_san(JSON.stringify(JSON.parse(contents).eclipse[i].name)).replace(/\"/g, "") == "desktopMode" || ret_san(JSON.stringify(JSON.parse(contents).eclipse[i].name)).replace(/\"/g, "") == "audioStatus" || ret_san(JSON.stringify(JSON.parse(contents).eclipse[i].name)).replace(/\"/g, "") == "autoSave") {
                                            localStorage.setItem(ret_san(JSON.stringify(JSON.parse(contents).eclipse[i].name)).replace(/\"/g, ""), ret_san(JSON.stringify(JSON.parse(contents).eclipse[i].inner)).replace(/\"/g, ""));
                                        } else {
                                            localStorage.setItem(ret_san(JSON.stringify(JSON.parse(contents).eclipse[i].name)).replace(/\"/g, ""), ret_san(JSON.stringify(JSON.parse(contents).eclipse[i].inner)));
                                        }
                                    }
                                    location.reload();
                                } catch (err) {
                                    eclipse.preloader.hide();
                                    eclipse.preloader.show('Recovering');
                                    window.setTimeout(function() {
                                        try {
                                            recover(localStorageJSON);
                                        } catch (err) {
                                            eclipse.dialog.alert("A fatal error has occurred and Eclipse was reset.", 'Eclipse', function() {
                                                location.reload()
                                            });
                                            return false;
                                        }
                                    }, 1);
                                }
                            }, 1000);
                            eclipse.preloader.hide();
                        }
                        r.readAsText(f);
                    } else {
                        eclipse.dialog.alert("Failed to read file.", "Eclipse");
                    }
                }
                if (url) {
                    if (!url.toLowerCase().match(/\.(eclipse)$/)) {
                        eclipse.preloader.hide();
                        eclipse.dialog.alert('This function can only load files with the extension ".eclipse".', 'Eclipse');
                        return false;
                    }
                    var storageJSON = new XMLHttpRequest();
                    storageJSON.open('GET', url);
                    storageJSON.send();
                    window.setTimeout(function() {
                        storageJSON = storageJSON.responseText;
                        if (storageJSON == "") {
                            eclipse.preloader.hide();
                            eclipse.dialog.alert("An error has occurred and the operation was cancelled.", 'Eclipse');
                            return false;
                        }
                        window.setTimeout(function() {
                            var localStorageJSON = exportLocalStorage(0);
                            try {
                                localStorage.clear();
                                for (var i = 0; i < JSON.parse(storageJSON).eclipse.length; i++) {
                                    if (ret_san(JSON.stringify(JSON.parse(storageJSON).eclipse[i].name)).replace(/\"/g, "") == "currentSkin" || ret_san(JSON.stringify(JSON.parse(storageJSON).eclipse[i].name)).replace(/\"/g, "") == "setup" || ret_san(JSON.stringify(JSON.parse(storageJSON).eclipse[i].name)).replace(/\"/g, "") == "fillScreen" || ret_san(JSON.stringify(JSON.parse(storageJSON).eclipse[i].name)).replace(/\"/g, "") == "desktopMode" || ret_san(JSON.stringify(JSON.parse(storageJSON).eclipse[i].name)).replace(/\"/g, "") == "audioStatus" || ret_san(JSON.stringify(JSON.parse(storageJSON).eclipse[i].name)).replace(/\"/g, "") == "autoSave") {
                                        localStorage.setItem(ret_san(JSON.stringify(JSON.parse(storageJSON).eclipse[i].name)).replace(/\"/g, ""), ret_san(JSON.stringify(JSON.parse(storageJSON).eclipse[i].inner)).replace(/\"/g, ""));
                                    } else {
                                        localStorage.setItem(ret_san(JSON.stringify(JSON.parse(storageJSON).eclipse[i].name)).replace(/\"/g, ""), ret_san(JSON.stringify(JSON.parse(storageJSON).eclipse[i].inner)));
                                    }
                                }

                                location.reload();
                            } catch (err) {
                                eclipse.preloader.hide();
                                eclipse.preloader.show('Recovering');
                                window.setTimeout(function() {
                                    try {
                                        recover(localStorageJSON);
                                    } catch (err) {
                                        eclipse.dialog.alert("A fatal error has occurred and Eclipse was reset.", 'Eclipse', function() {
                                            location.reload()
                                        });
                                        return false;
                                    }
                                }, 1);
                            }
                        }, 1000);
                        eclipse.preloader.hide();
                    }, 1000)
                }
                if (!file && !url) {
                    eclipse.preloader.hide();
                    eclipse.dialog.alert('Requires input', 'Eclipse');
                    return false;
                }
            }, 1);
        },
        function() {
            eclipse.dialog.alert('Eclipse is unaffected.', 'Eclipse');
        }
    );
}

function textAreaData() {
    var storageJSON = document.getElementById("manualDataTextArea").value;
    if (storageJSON == "") {
        eclipse.preloader.hide();
        eclipse.dialog.alert("An error has occurred and the operation was cancelled.", 'Eclipse');
        return false;
    }
    if (JSON.parse(storageJSON).IMPORTANT_READ_ME == "Please copy the entirity of this page and create a new file with the extension '.eclipse'.  Open the new file, and paste the copied text inside.  You will only see this page once, the next launch of Eclipse will not show this.") {
                        window.setTimeout(function() {
                            var localStorageJSON = exportLocalStorage(0);
                            try {
                                localStorage.clear();
                                for (var i = 0; i < JSON.parse(storageJSON).eclipse.length; i++) {
                                    if (ret_san(JSON.stringify(JSON.parse(storageJSON).eclipse[i].name)).replace(/\"/g, "") == "currentSkin" || ret_san(JSON.stringify(JSON.parse(storageJSON).eclipse[i].name)).replace(/\"/g, "") == "setup" || ret_san(JSON.stringify(JSON.parse(storageJSON).eclipse[i].name)).replace(/\"/g, "") == "fillScreen" || ret_san(JSON.stringify(JSON.parse(storageJSON).eclipse[i].name)).replace(/\"/g, "") == "desktopMode" || ret_san(JSON.stringify(JSON.parse(storageJSON).eclipse[i].name)).replace(/\"/g, "") == "audioStatus" || ret_san(JSON.stringify(JSON.parse(storageJSON).eclipse[i].name)).replace(/\"/g, "") == "autoSave") {
                                        localStorage.setItem(ret_san(JSON.stringify(JSON.parse(storageJSON).eclipse[i].name)).replace(/\"/g, ""), ret_san(JSON.stringify(JSON.parse(storageJSON).eclipse[i].inner)).replace(/\"/g, ""));
                                    } else {
                                        localStorage.setItem(ret_san(JSON.stringify(JSON.parse(storageJSON).eclipse[i].name)).replace(/\"/g, ""), ret_san(JSON.stringify(JSON.parse(storageJSON).eclipse[i].inner)));
                                    }
                                }
                                if (!localStorage.skins) { localStorage.skins = "[]" }
                                if (!localStorage.games) { localStorage.games = "[]" }
                                if (!localStorage.repos) { localStorage.repos = "[]" }
                                location.reload();
                            } catch (err) {
                                eclipse.preloader.hide();
                                eclipse.preloader.show('Recovering');
                                window.setTimeout(function() {
                                    try {
                                        recover(localStorageJSON);
                                    } catch (err) {
                                        eclipse.dialog.alert("A fatal error has occurred and Eclipse was reset.", 'Eclipse', function() {
                                            location.reload()
                                        });
                                        return false;
                                    }
                                }, 1);
                            }
                        }, 1000);
                        eclipse.preloader.hide();
    } else if (JSON.parse(storageJSON).IMPORTANT_READ_ME == "Please copy the entirity of this page and create a new file with the extension '.igba'.  Open the new file, and paste the copied text inside.  You will only see this page once, the next launch of iGBA will not show this.") {
        var storageJSON = document.getElementById("manualDataTextArea").value;
                            function getName(k) {
                                console.log(ret_san(JSON.stringify(JSON.parse(storageJSON).igba[k].name)).replace(/\"/g, ""));
                                return ret_san(JSON.stringify(JSON.parse(storageJSON).igba[k].name)).replace(/\"/g, "");
                            }
                            if (storageJSON == "") {
                                eclipse.preloader.hide();
                                eclipse.dialog.alert("An error has occurred and the operation was cancelled.", 'Eclipse');
                                return false;
                            }
                            window.setTimeout(function() {
                                var localStorageJSON = exportLocalStorage(0);
                                try {
                                    localStorage.clear();
                                    for (var i = 0; i < JSON.parse(storageJSON).igba.length; i++) {
                                        if (ret_san(JSON.stringify(JSON.parse(storageJSON).igba[i].name)).replace(/\"/g, "") == "currentSkin" || ret_san(JSON.stringify(JSON.parse(storageJSON).igba[i].name)).replace(/\"/g, "") == "audioStatus" || ret_san(JSON.stringify(JSON.parse(storageJSON).igba[i].name)).replace(/\"/g, "") == "autoSave") {
                                            if (ret_san(JSON.stringify(JSON.parse(storageJSON).igba[i].name)).replace(/\"/g, "") == "autoSave") {
                                                if (ret_san(JSON.stringify(JSON.parse(storageJSON).igba[i].inner)).replace(/\"/g, "") == "yes") {
                                                    localStorage.setItem("autoSave", "true");
                                                } else {
                                                    localStorage.setItem("autoSave", "false");
                                                }
                                            } else {
                                                localStorage.setItem(ret_san(JSON.stringify(JSON.parse(storageJSON).igba[i].name)).replace(/\"/g, ""), ret_san(JSON.stringify(JSON.parse(storageJSON).igba[i].inner)).replace(/\"/g, ""));
                                            }
                                        } else {
                                            var gameStuff = "[";
                                            if (getName(i) == "gameNames" || getName(i) == "gameBoxarts" || getName(i) == "gameURLs") {
                                                if (gameStuff == "[") {
                                                    var uplol = -1;
                                                    for (b = 0; b < JSON.parse(storageJSON).igba.length; b++) {
                                                        var gameNameTing = [];
                                                        var gameBoxartTing = [];
                                                        var gameURLTing = [];
                                                        var lengthyboi = -1;
                                                        if (lengthyboi == -1) {
                                                            for (var z = 0; z < JSON.parse(storageJSON).igba.length; z++) {
                                                                if (getName(z) == "gameNames") {
                                                                    gameNameTing = JSON.parse(storageJSON).igba[z].inner;
                                                                    lengthyboi = JSON.parse(storageJSON).igba[z].inner.length;
                                                                } else if (getName(z) == "gameBoxarts") {
                                                                    gameBoxartTing = JSON.parse(storageJSON).igba[z].inner;
                                                                } else if (getName(z) == "gameURLs") {
                                                                    gameURLTing = JSON.parse(storageJSON).igba[z].inner;
                                                                }
                                                            }
                                                        }
                                                        if (lengthyboi == 0) {
                                                            localStorage.setItem("games", "[]");
                                                        }
                                                        if (b == lengthyboi - 1 && lengthyboi != 0) {
                                                            uplol = uplol + 1;
                                                            gameStuff = gameStuff + "\"{\\\"name\\\":\\\"" + gameNameTing[uplol] + "\\\", \\\"boxart\\\":\\\"" + gameBoxartTing[uplol] + "\\\", \\\"link\\\":\\\"" + gameURLTing[uplol] + "\\\", \\\"system\\\":\\\"GBA\\\"}\"";
                                                            gameStuff = gameStuff + "]";
                                                            localStorage.setItem("games", gameStuff);
                                                        } else if (b < lengthyboi && lengthyboi != 0) {
                                                            uplol = uplol + 1; //alert(gameNameTing); alert(gameNameTing[uplol]);
                                                            gameStuff = gameStuff + "\"{\\\"name\\\":\\\"" + gameNameTing[uplol] + "\\\", \\\"boxart\\\":\\\"" + gameBoxartTing[uplol] + "\\\", \\\"link\\\":\\\"" + gameURLTing[uplol] + "\\\", \\\"system\\\":\\\"GBA\\\"}\"";
                                                            gameStuff = gameStuff + ",";
                                                        }
                                                    }
                                                }
                                            } else if (getName(i) == "repos") {
                                                localStorage.repos = "[\"//php.eclipseemu.me/dl/dl.php?dl=http://eclipseemu.me/play/json/repos/eclipse-official.json\"]"
                                            } else {
                                                if (getName(i) != "google_pub_config" && getName(i) != "google_experiment_mod") {
                                                    localStorage.setItem(ret_san(JSON.stringify(JSON.parse(storageJSON).igba[i].name)).replace(/\"/g, ""), ret_san(JSON.stringify(JSON.parse(storageJSON).igba[i].inner)));
                                                }
                                            }
                                        }
                                    }
                                    localStorage.setItem("skins",JSON.stringify(JSON.parse(ret_san(JSON.stringify(JSON.parse(localStorage.getItem("skins")))).replace(/dl\.php\?dl=/g, "").replace(/\.\/skins\//g,"https://eclipseemu.me/play/json/skins/igba/").replace(/\/igba\/igba\-red/g,"/default").replace(/\/igba\/igba\-black/g,"/grey").replace(/\/igba\/igba\-/g,"/"))))
                                    localStorage.setItem("setup", "done");
                                    location.reload();
                                } catch (err) {
                                    alert(err);
                                    eclipse.preloader.hide();
                                    eclipse.preloader.show('Recovering');
                                    window.setTimeout(function() {
                                        try {
                                            recover(localStorageJSON);
                                        } catch (err) {
                                            eclipse.dialog.alert("A fatal error has occurred and Eclipse was reset.", 'Eclipse', function() {
                                                location.reload()
                                            });
                                            return false;
                                        }
                                    }, 1);
                                }
                            }, 1000);
                            eclipse.preloader.hide();
    } else {
        eclipse.dialog.alert("Failed to detect state origin.");
    }
}

function load_iGBA_storage_file(file, url, callback) {
    eclipse.dialog.confirm('Performing this action will erase all of your data and overwrite it with the data contained in the file, are you sure you would like to continue?', 'Eclipse',
        function() {
            eclipse.preloader.show('Loading');
            window.setTimeout(function() {
                if (file && url) {
                    eclipse.preloader.hide();
                    eclipse.dialog.alert('You cannot input a file and a URL.', 'Eclipse');
                    return false;
                }
                if (file) {
                    if (document.getElementById("localFile").files[0] == null) {
                        eclipse.preloader.hide();
                        eclipse.dialog.alert("You must specify a file.", 'Eclipse');
                        return false;
                    }
                    var f = document.getElementById("localFile").files[0];
                    if (f) {
                        var r = new FileReader();
                        r.onload = function(e) {
                            var storageJSON = e.target.result;

                            function getName(k) {
                                console.log(ret_san(JSON.stringify(JSON.parse(storageJSON).igba[k].name)).replace(/\"/g, ""));
                                return ret_san(JSON.stringify(JSON.parse(storageJSON).igba[k].name)).replace(/\"/g, "");
                            }
                            if (storageJSON == "") {
                                eclipse.preloader.hide();
                                eclipse.dialog.alert("An error has occurred and the operation was cancelled.", 'Eclipse');
                                return false;
                            }
                            window.setTimeout(function() {
                                var localStorageJSON = exportLocalStorage(0);
                                try {
                                    localStorage.clear();
                                    for (var i = 0; i < JSON.parse(storageJSON).igba.length; i++) {
                                        if (ret_san(JSON.stringify(JSON.parse(storageJSON).igba[i].name)).replace(/\"/g, "") == "currentSkin" || ret_san(JSON.stringify(JSON.parse(storageJSON).igba[i].name)).replace(/\"/g, "") == "audioStatus" || ret_san(JSON.stringify(JSON.parse(storageJSON).igba[i].name)).replace(/\"/g, "") == "autoSave") {
                                            if (ret_san(JSON.stringify(JSON.parse(storageJSON).igba[i].name)).replace(/\"/g, "") == "autoSave") {
                                                if (ret_san(JSON.stringify(JSON.parse(storageJSON).igba[i].inner)).replace(/\"/g, "") == "yes") {
                                                    localStorage.setItem("autoSave", "true");
                                                } else {
                                                    localStorage.setItem("autoSave", "false");
                                                }
                                            } else {
                                                localStorage.setItem(ret_san(JSON.stringify(JSON.parse(storageJSON).igba[i].name)).replace(/\"/g, ""), ret_san(JSON.stringify(JSON.parse(storageJSON).igba[i].inner)).replace(/\"/g, ""));
                                            }
                                        } else {
                                            var gameStuff = "[";
                                            if (getName(i) == "gameNames" || getName(i) == "gameBoxarts" || getName(i) == "gameURLs") {
                                                if (gameStuff == "[") {
                                                    var uplol = -1;
                                                    for (b = 0; b < JSON.parse(storageJSON).igba.length; b++) {
                                                        var gameNameTing = [];
                                                        var gameBoxartTing = [];
                                                        var gameURLTing = [];
                                                        var lengthyboi = -1;
                                                        if (lengthyboi == -1) {
                                                            for (var z = 0; z < JSON.parse(storageJSON).igba.length; z++) {
                                                                if (getName(z) == "gameNames") {
                                                                    gameNameTing = JSON.parse(storageJSON).igba[z].inner;
                                                                    lengthyboi = JSON.parse(storageJSON).igba[z].inner.length;
                                                                } else if (getName(z) == "gameBoxarts") {
                                                                    gameBoxartTing = JSON.parse(storageJSON).igba[z].inner;
                                                                } else if (getName(z) == "gameURLs") {
                                                                    gameURLTing = JSON.parse(storageJSON).igba[z].inner;
                                                                }
                                                            }
                                                        }
                                                        if (lengthyboi == 0) {
                                                            localStorage.setItem("games", "[]");
                                                        }
                                                        if (b == lengthyboi - 1 && lengthyboi != 0) {
                                                            uplol = uplol + 1;
                                                            gameStuff = gameStuff + "\"{\\\"name\\\":\\\"" + gameNameTing[uplol] + "\\\", \\\"boxart\\\":\\\"" + gameBoxartTing[uplol] + "\\\", \\\"link\\\":\\\"" + gameURLTing[uplol] + "\\\", \\\"system\\\":\\\"GBA\\\"}\"";
                                                            gameStuff = gameStuff + "]";
                                                            localStorage.setItem("games", gameStuff);
                                                        } else if (b < lengthyboi && lengthyboi != 0) {
                                                            uplol = uplol + 1; //alert(gameNameTing); alert(gameNameTing[uplol]);
                                                            gameStuff = gameStuff + "\"{\\\"name\\\":\\\"" + gameNameTing[uplol] + "\\\", \\\"boxart\\\":\\\"" + gameBoxartTing[uplol] + "\\\", \\\"link\\\":\\\"" + gameURLTing[uplol] + "\\\", \\\"system\\\":\\\"GBA\\\"}\"";
                                                            gameStuff = gameStuff + ",";
                                                        }
                                                    }
                                                }
                                            } else if (getName(i) == "repos") {
                                                localStorage.repos = "[\"//php.eclipseemu.me/dl/dl.php?dl=http://eclipseemu.me/play/json/repos/eclipse-official.json\"]"
                                            } else {
                                                if (getName(i) != "google_pub_config" && getName(i) != "google_experiment_mod") {
                                                    localStorage.setItem(ret_san(JSON.stringify(JSON.parse(storageJSON).igba[i].name)).replace(/\"/g, ""), ret_san(JSON.stringify(JSON.parse(storageJSON).igba[i].inner)));
                                                }
                                            }
                                        }
                                    }
                                    localStorage.setItem("skins",JSON.stringify(JSON.parse(ret_san(JSON.stringify(JSON.parse(localStorage.getItem("skins")))).replace(/dl\.php\?dl=/g, "").replace(/\.\/skins\//g,"https://eclipseemu.me/play/json/skins/igba/").replace(/\/igba\/igba\-red/g,"/default").replace(/\/igba\/igba\-black/g,"/grey").replace(/\/igba\/igba\-/g,"/"))))
                                    localStorage.setItem("setup", "done");
                                    location.reload();
                                } catch (err) {
                                    eclipse.preloader.hide();
                                    eclipse.preloader.show('Recovering');
                                    window.setTimeout(function() {
                                        try {
                                            recover(localStorageJSON);
                                        } catch (err) {
                                            eclipse.dialog.alert("A fatal error has occurred and Eclipse was reset.", 'Eclipse', function() {
                                                location.reload()
                                            });
                                            return false;
                                        }
                                    }, 1);
                                }
                            }, 1000);
                            eclipse.preloader.hide();
                        }
                        r.readAsText(f);
                    } else {
                        eclipse.dialog.alert("Failed to read file.", "Eclipse");
                    }
                }
                if (url) {
                    if (!url.toLowerCase().match(/\.(igba)$/)) {
                        eclipse.preloader.hide();
                        eclipse.dialog.alert('This function can only load files with the extension ".igba".', 'Eclipse');
                        return false;
                    }
                    var storageJSON = new XMLHttpRequest();
                    storageJSON.open('GET', url);
                    storageJSON.send();
                    window.setTimeout(function() {
                        storageJSON = storageJSON.responseText;

                        function getName(k) {
                            console.log(ret_san(JSON.stringify(JSON.parse(storageJSON).igba[k].name)).replace(/\"/g, ""));
                            return ret_san(JSON.stringify(JSON.parse(storageJSON).igba[k].name)).replace(/\"/g, "");
                        }
                        if (storageJSON == "") {
                            eclipse.preloader.hide();
                            eclipse.dialog.alert("An error has occurred and the operation was cancelled.", 'Eclipse');
                            return false;
                        }
                        window.setTimeout(function() {
                            var localStorageJSON = exportLocalStorage(0);
                            try {
                                localStorage.clear();
                                for (var i = 0; i < JSON.parse(storageJSON).igba.length; i++) {
                                    if (ret_san(JSON.stringify(JSON.parse(storageJSON).igba[i].name)).replace(/\"/g, "") == "currentSkin" || ret_san(JSON.stringify(JSON.parse(storageJSON).igba[i].name)).replace(/\"/g, "") == "audioStatus" || ret_san(JSON.stringify(JSON.parse(storageJSON).igba[i].name)).replace(/\"/g, "") == "autoSave") {
                                        if (ret_san(JSON.stringify(JSON.parse(storageJSON).igba[i].name)).replace(/\"/g, "") == "autoSave") {
                                            if (ret_san(JSON.stringify(JSON.parse(storageJSON).igba[i].inner)).replace(/\"/g, "") == "yes") {
                                                localStorage.setItem("autoSave", "true");
                                            } else {
                                                localStorage.setItem("autoSave", "false");
                                            }
                                        } else {
                                            localStorage.setItem(ret_san(JSON.stringify(JSON.parse(storageJSON).igba[i].name)).replace(/\"/g, ""), ret_san(JSON.stringify(JSON.parse(storageJSON).igba[i].inner)).replace(/\"/g, ""));
                                        }
                                    } else {
                                        var gameStuff = "[";
                                        if (getName(i) == "gameNames" || getName(i) == "gameBoxarts" || getName(i) == "gameURLs") {
                                            if (gameStuff == "[") {
                                                var uplol = -1;
                                                for (b = 0; b < JSON.parse(storageJSON).igba.length; b++) {
                                                    var gameNameTing = [];
                                                    var gameBoxartTing = [];
                                                    var gameURLTing = [];
                                                    var lengthyboi = -1;
                                                    if (lengthyboi == -1) {
                                                        for (var z = 0; z < JSON.parse(storageJSON).igba.length; z++) {
                                                            if (getName(z) == "gameNames") {
                                                                gameNameTing = JSON.parse(storageJSON).igba[z].inner;
                                                                lengthyboi = JSON.parse(storageJSON).igba[z].inner.length;
                                                            } else if (getName(z) == "gameBoxarts") {
                                                                gameBoxartTing = JSON.parse(storageJSON).igba[z].inner;
                                                            } else if (getName(z) == "gameURLs") {
                                                                gameURLTing = JSON.parse(storageJSON).igba[z].inner;
                                                            }
                                                        }
                                                    }
                                                    if (lengthyboi == 0) {
                                                        localStorage.setItem("games", "[]");
                                                    }
                                                    if (b == lengthyboi - 1 && lengthyboi != 0) {
                                                        uplol = uplol + 1;
                                                        gameStuff = gameStuff + "\"{\\\"name\\\":\\\"" + gameNameTing[uplol] + "\\\", \\\"boxart\\\":\\\"" + gameBoxartTing[uplol] + "\\\", \\\"link\\\":\\\"" + gameURLTing[uplol] + "\\\", \\\"system\\\":\\\"GBA\\\"}\"";
                                                        gameStuff = gameStuff + "]";
                                                        localStorage.setItem("games", gameStuff);
                                                    } else if (b < lengthyboi && lengthyboi != 0) {
                                                        uplol = uplol + 1; //alert(gameNameTing); alert(gameNameTing[uplol]);
                                                        gameStuff = gameStuff + "\"{\\\"name\\\":\\\"" + gameNameTing[uplol] + "\\\", \\\"boxart\\\":\\\"" + gameBoxartTing[uplol] + "\\\", \\\"link\\\":\\\"" + gameURLTing[uplol] + "\\\", \\\"system\\\":\\\"GBA\\\"}\"";
                                                        gameStuff = gameStuff + ",";
                                                    }
                                                }
                                            }
                                        } else if (getName(i) == "repos") {
                                            localStorage.repos = "[\"//php.eclipseemu.me/dl/dl.php?dl=http://eclipseemu.me/play/json/repos/eclipse-official.json\"]"
                                        } else {
                                            if (getName(i) != "google_pub_config" && getName(i) != "google_experiment_mod") {
                                                localStorage.setItem(ret_san(JSON.stringify(JSON.parse(storageJSON).igba[i].name)).replace(/\"/g, ""), ret_san(JSON.stringify(JSON.parse(storageJSON).igba[i].inner)));
                                            }
                                        }
                                    }
                                }
                                localStorage.setItem("setup", "done");
                                try {
                                    localStorage.removeItem("cacheKey")
                                } catch (err) {}
                                try {
                                    localStorage.removeItem("fastForward")
                                } catch (err) {}
                                try {
                                    localStorage.removeItem("first_launch")
                                } catch (err) {}
                                if (!localStorage.skins) { localStorage.skins = "[]" }
                                if (!localStorage.games) { localStorage.games = "[]" }
                                if (!localStorage.repos) { localStorage.repos = "[]" }
                                location.reload();
                            } catch (err) {
                                eclipse.preloader.hide();
                                eclipse.preloader.show('Recovering');
                                window.setTimeout(function() {
                                    try {
                                        recover(localStorageJSON);
                                    } catch (err) {
                                        eclipse.dialog.alert("A fatal error has occurred and Eclipse was reset.", 'Eclipse', function() {
                                            location.reload()
                                        });
                                        return false;
                                    }
                                }, 1);
                            }
                        }, 1000);
                        eclipse.preloader.hide();
                    }, 1000)
                }
                if (!file && !url) {
                    eclipse.preloader.hide();
                    eclipse.dialog.alert('Requires input', 'Eclipse');
                    return false;
                }
            }, 1);
        },
        function() {
            eclipse.dialog.alert('Eclipse is unaffected.', 'Eclipse');
        }
    );
}

/* FileSaver.js
 * A saveAs() FileSaver implementation.
 * 1.3.2
 * 2016-06-16 18:25:19
 *
 * By Eli Grey, http://eligrey.com
 * License: MIT
 *   See https://github.com/eligrey/FileSaver.js/blob/master/LICENSE.md
 */

/*global self */
/*jslint bitwise: true, indent: 4, laxbreak: true, laxcomma: true, smarttabs: true, plusplus: true */

/*! @source http://purl.eligrey.com/github/FileSaver.js/blob/master/FileSaver.js */

var saveAs = saveAs || (function(view) {
    "use strict";
    // IE <10 is explicitly unsupported
    if (typeof view === "undefined" || typeof navigator !== "undefined" && /MSIE [1-9]\./.test(navigator.userAgent)) {
        return;
    }
    var
        doc = view.document
        // only get URL when necessary in case Blob.js hasn't overridden it yet
        ,
        get_URL = function() {
            return view.URL || view.webkitURL || view;
        },
        save_link = doc.createElementNS("http://www.w3.org/1999/xhtml", "a"),
        can_use_save_link = "download" in save_link,
        click = function(node) {
            var event = new MouseEvent("click");
            node.dispatchEvent(event);
        },
        is_safari = /constructor/i.test(view.HTMLElement) || view.safari,
        is_chrome_ios = /CriOS\/[\d]+/.test(navigator.userAgent),
        throw_outside = function(ex) {
            (view.setImmediate || view.setTimeout)(function() {
                throw ex;
            }, 0);
        },
        force_saveable_type = "application/octet-stream"
        // the Blob API is fundamentally broken as there is no "downloadfinished" event to subscribe to
        ,
        arbitrary_revoke_timeout = 1000 * 40 // in ms
        ,
        revoke = function(file) {
            var revoker = function() {
                if (typeof file === "string") { // file is an object URL
                    get_URL().revokeObjectURL(file);
                } else { // file is a File
                    file.remove();
                }
            };
            setTimeout(revoker, arbitrary_revoke_timeout);
        },
        dispatch = function(filesaver, event_types, event) {
            event_types = [].concat(event_types);
            var i = event_types.length;
            while (i--) {
                var listener = filesaver["on" + event_types[i]];
                if (typeof listener === "function") {
                    try {
                        listener.call(filesaver, event || filesaver);
                    } catch (ex) {
                        throw_outside(ex);
                    }
                }
            }
        },
        auto_bom = function(blob) {
            // prepend BOM for UTF-8 XML and text/* types (including HTML)
            // note: your browser will automatically convert UTF-16 U+FEFF to EF BB BF
            if (/^\s*(?:text\/\S*|application\/xml|\S*\/\S*\+xml)\s*;.*charset\s*=\s*utf-8/i.test(blob.type)) {
                return new Blob([String.fromCharCode(0xFEFF), blob], {
                    type: blob.type
                });
            }
            return blob;
        },
        FileSaver = function(blob, name, no_auto_bom) {
            if (!no_auto_bom) {
                blob = auto_bom(blob);
            }
            // First try a.download, then web filesystem, then object URLs
            var
                filesaver = this,
                type = blob.type,
                force = type === force_saveable_type,
                object_url, dispatch_all = function() {
                    dispatch(filesaver, "writestart progress write writeend".split(" "));
                }
                // on any filesys errors revert to saving with object URLs
                ,
                fs_error = function() {
                    if ((is_chrome_ios || (force && is_safari)) && view.FileReader) {
                        // Safari doesn't allow downloading of blob urls
                        var reader = new FileReader();
                        reader.onloadend = function() {
                            var url = is_chrome_ios ? reader.result : reader.result.replace(/^data:[^;]*;/, 'data:attachment/file;');
                            var popup = view.open(url, '_blank');
                            if (!popup) view.location.href = url;
                            url = undefined; // release reference before dispatching
                            filesaver.readyState = filesaver.DONE;
                            dispatch_all();
                        };
                        reader.readAsDataURL(blob);
                        filesaver.readyState = filesaver.INIT;
                        return;
                    }
                    // don't create more object URLs than needed
                    if (!object_url) {
                        object_url = get_URL().createObjectURL(blob);
                    }
                    if (force) {
                        view.location.href = object_url;
                    } else {
                        var opened = view.open(object_url, "_blank");
                        if (!opened) {
                            // Apple does not allow window.open, see https://developer.apple.com/library/safari/documentation/Tools/Conceptual/SafariExtensionGuide/WorkingwithWindowsandTabs/WorkingwithWindowsandTabs.html
                            view.location.href = object_url;
                        }
                    }
                    filesaver.readyState = filesaver.DONE;
                    dispatch_all();
                    revoke(object_url);
                };
            filesaver.readyState = filesaver.INIT;

            if (can_use_save_link) {
                object_url = get_URL().createObjectURL(blob);
                setTimeout(function() {
                    save_link.href = object_url;
                    save_link.download = name;
                    click(save_link);
                    dispatch_all();
                    revoke(object_url);
                    filesaver.readyState = filesaver.DONE;
                });
                return;
            }

            fs_error();
        },
        FS_proto = FileSaver.prototype,
        saveAs = function(blob, name, no_auto_bom) {
            return new FileSaver(blob, name || blob.name || "download", no_auto_bom);
        };
    // IE 10+ (native saveAs)
    if (typeof navigator !== "undefined" && navigator.msSaveOrOpenBlob) {
        return function(blob, name, no_auto_bom) {
            name = name || blob.name || "download";

            if (!no_auto_bom) {
                blob = auto_bom(blob);
            }
            return navigator.msSaveOrOpenBlob(blob, name);
        };
    }

    FS_proto.abort = function() {};
    FS_proto.readyState = FS_proto.INIT = 0;
    FS_proto.WRITING = 1;
    FS_proto.DONE = 2;

    FS_proto.error =
        FS_proto.onwritestart =
        FS_proto.onprogress =
        FS_proto.onwrite =
        FS_proto.onabort =
        FS_proto.onerror =
        FS_proto.onwriteend =
        null;

    return saveAs;
}(
    typeof self !== "undefined" && self ||
    typeof window !== "undefined" && window ||
    this.content
));
// `self` is undefined in Firefox for Android content script context
// while `this` is nsIContentFrameMessageManager
// with an attribute `content` that corresponds to the window

if (typeof module !== "undefined" && module.exports) {
    module.exports.saveAs = saveAs;
} else if ((typeof define !== "undefined" && define !== null) && (define.amd !== null)) {
    define("FileSaver.js", function() {
        return saveAs;
    });
}

// What is up, DramaAlert nation?  I'm your host Killer Keemstar, leeez geet roiiight into the neeeewwwwwwwwwwzzzzzzzzzzzz!
// This ain't up because this will be cut off LOL
// The end of files keep getting cut off for literally no reason.
// So.
// FYEYETYR$Y%^TYREYGEWYHB
// eT$%Y%$YGRTGREDGERUJYUKJHG#!
// Better?
// Better.
// You're not here when you're hungry.
// Snickers.  Don't get cut.
