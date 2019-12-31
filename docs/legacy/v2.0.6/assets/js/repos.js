function Repos(key) {
  this.init = function() {
    var repos = localStorage.getItem(key);
    if (repos === null) {
      localStorage.setItem(key, '[]');
    }
  }

  this.add = function(url,errorHandle) {
    var repos = JSON.parse(localStorage.getItem(key));
    repos.push(url);
    localStorage.setItem(key, JSON.stringify(repos.clean()));

    if(errorHandle) {
      json = url.getJSON();
      if(json == undefined || json == null) {
        this.remove(url);
        eclipse.methods.repos.addErr();
      } else if(json.reponame == undefined || json.reponame == null) {
        this.remove(url);
        eclipse.methods.repos.addErr();
      } else {
        console.toast("\"" + json.reponame.patch() + "\" was added.");
      }
    }
  }

  this.remove = function(url, refetch, errorHandle) {
    var repos = JSON.parse(localStorage.getItem(key));
    var output;
    for (var i = 0; i < repos.length; i++) {
      if (repos[i] == url) {
        repos.splice(i, 1);
        localStorage.setItem(key, JSON.stringify(repos));
      }
    }
    var json;
    try {
      json = url.getJSON();
    } catch(err) {
      json = null;
    }
    if(refetch == true) {
      eclipse.methods.repos.checkIfEmpty();
    }
  }

  this.list = function() {
    var repos = JSON.parse(localStorage.getItem(key));
    return repos;
  }

  this.get = function(url) {
    var output;
    $.ajax({
      url: url,
      async: false,
      dataType: 'json',
      success: function(data) {
        output = data;
      }
    });
    return output;
  }

  this.updateData = function(newData, index) {
    var repos = JSON.parse(localStorage.getItem(key));
    var newRepos = repos.update(newData, index);
    localStorage.setItem(key, JSON.stringify(newRepos.clean()));
  }
}

// JavaScript doesn't seem to be subclass-friendly, so let's do it the cheap way.
function Skins(key) {
  this.init = function() {
    var repos = localStorage.getItem(key);
    if (repos === null || repos === "[]") {
      localStorage.setItem(key, '["//php.eclipseemu.me/dl/dl.php?dl=https://eclipseemu.me/play/json/skins/default.json"]');
    }
    var repo_store = localStorage.getItem("current" + key.substring(0, 1).toUpperCase() + key.substring(1, key.length - 1));
    if (repo_store === null || repo_store == "{}") {
      localStorage.setItem("current" + key.substring(0, 1).toUpperCase() + key.substring(1, key.length - 1), '{"name":"Default","logo":"https://eclipseemu.me/play/img/icons/icon_mobFull.png","author":"Eclipse Team","description":"The default theme for Eclipse.","styles":[{}]}');
    }
  }

  this.set = function(url) { // updates to current skin
    // OpenSkin.getJSON(url, true)
    console.print("Begin network request.");
    jQuery.getJSON(url, function(json) {
      console.print("Sent.");
      console.log(json);
      try {
        curSkin = JSON.stringify(json);
        localStorage.setItem("current" + key.substring(0, 1).toUpperCase() + key.substring(1, key.length - 1), curSkin);
        OpenSkin.getStr(curSkin, true);
        console.print("Set skin: JSON = " + curSkin);
        // eclipse.updateCurrentSkin(true);
      } catch (err) {
        console.error(err);
      }
    });
    console.log(OpenSkin_jsonContents) // this somehow fixes it.
    // window.setTimeout(function() {
    //   // Updates skin labels, prints to toast.
    //   eclipse.methods.skins.updateSkinLabel();
    //   console.toast("\"" + OpenSkin.skin().name.patch() + "\" was applied.");
    // }, 700);
  }

  // unchanged

  this.add = function(url) {
    var repos = JSON.parse(localStorage.getItem(key));
    repos.push(url);
    localStorage.setItem(key, JSON.stringify(repos.clean()));
    json = url.getJSON();
    if(json == undefined || json == null) {
      this.remove(url);
      eclipse.methods.skins.addSkinErr();
    } else if(json.name == undefined || json.name == null) {
      this.remove(url);
      eclipse.methods.skins.addSkinErr();
    } else {
      eclipse.methods.skins.fetchLastSkin();
      console.toast("\"" + json.name.patch() + "\" was added.");
    }
  }

  this.remove = function(url) {
    var repos = JSON.parse(localStorage.getItem(key));
    var output;
    for (var i = 0; i < repos.length; i++) {
      if (repos[i] == url) {
        repos.splice(i, 1);
        localStorage.setItem(key, JSON.stringify(repos));
      }
    }
    var json;
    try {
      json = url.getJSON();
    } catch(err) {
      json = null;
    }
    if(json == undefined || json == null) {
      console.toast("An unknown skin was removed.");
    } else if(json.name == undefined || json.name == null) {
      console.toast("An unknown skin was removed.");
    } else {
      console.toast("\"" + json.name.patch() + "\" was removed.");
    }

  }

  this.list = function() {
    var repos = JSON.parse(localStorage.getItem(key)).clean();
    return repos;
  }

  this.get = function(url) {
    var output;
    $.ajax({
      url: url,
      async: false,
      dataType: 'json',
      success: function(data) {
        output = data;
      }
    });
    return output;
  }

  this.updateData = function(newData, index) {
    var repos = JSON.parse(localStorage.getItem(key));
    var newRepos = repos.update(newData, index);
    localStorage.setItem(key, JSON.stringify(newRepos.clean()));
  }
}

String.prototype.patch = function() {
  return this.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;").replace(/\\/g, "&#92;").replace(/`/g, "&#96;");
}

String.prototype.unpatch = function() {
  return this.replace(/&amp;/, "&").replace(/&lt;/g, "<").replace(/&gt;/g, ">").replace(/&quot;/g, "\"").replace(/&apos;/g, "'").replace(/&#92;/g, "\\").replace(/&#96;/g, "`");
}

Array.prototype.clean = function() {
  var obj = {};
  for (var i = 0; i < this.length; i++) {
    obj[this[i]] = true;
  }
  array = [];
  for (var key in obj) {
    array.push(key);
  }
  return array;
}

Array.prototype.move = function(from, to) {
  var temp = this[from];
  this[from] = this[to];
  this[to] = temp;
  return this;
}

Array.prototype.update = function(newData, index) {
  this.splice(index, 1);
  this.push(newData);
  return this.move(this.length - 1, index);
}

Array.prototype.shuffle = function() {
  var currentIndex = this.length,
    temporaryValue, randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = this[currentIndex];
    this[currentIndex] = this[randomIndex];
    this[randomIndex] = temporaryValue;
  }
  return this;
}

String.prototype.getJSON = function() {
  var output = [];
  $.ajax({
    url: this,
    type: "GET",
    success: function(data) {
      output = data
    },
    error: function(err) {
      console.error(err)
    },
    async: false
  });
  return JSON.parse(output);
}

String.prototype.getParam = function() {
  var url = window.location.search.substring(1);
  var urlVars = url.split('&');
  for (var i = 0; i < urlVars.length; i++) {
    var paramName = urlVars[i].split('=');
    if (paramName[0] == this) {
      return decodeURIComponent(paramName[1]);
    }
  }
}

String.prototype.getJSON = function() {
  try {
    var output = [];
    $.ajax({
      url: this,
      async: false,
      dataType: 'json',
      success: function(data) {
        output = data;
      }
    });
    return JSON.parse(JSON.stringify(output));
  } catch (err) {
    magnetar.error("You need jQuery linked for fetching JSON like this to work\n" + err);
  }
}

String.prototype.capitalize = function() {
  // StackOverflow's solution was more elegant: https://stackoverflow.com/a/4878800
  return this.replace(/\w\S*/g, function(txt){
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
  });
}

String.prototype.removeFileExt = function() {
  return this.substring(0,this.lastIndexOf("."));
}

Array.prototype.search = function(str) {
  for (var i = this.length - 1; i >= 0; i--) {
    if(this[i] == str) {
      return i;
    }
  }
}
