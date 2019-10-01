var currentVersion = "2.0.0";
var latest = "assets/json/eclipse.json".getJSON();
var $$ = Dom7;

var up_btn;
var down_btn;
var left_btn;
var right_btn;
var start_btn;
var select_btn;
var a_btn;
var b_btn;
var l_btn;
var r_btn;

var games = new Repos('games');
games.init(null);
var repos = new Repos('repos');
repos.init(null);
var skins = new Skins('skins');
skins.init("[\"//php.eclipseemu.me/dl/dl.php?dl=https://eclipseemu.me/play/json/skins/default.json\"]");

// Apply skin.
OpenSkin.getStr(localStorage.getItem("currentSkin"), true);

// Theme
var theme = 'auto';
if (document.location.search.indexOf('theme=') >= 0) {
  theme = document.location.search.split('theme=')[1].split('&')[0];
}

// Add new logging methods.
console.toast = function(str) {
  eclipse.toast.create({
    text: str,
    closeTimeout: 2000,
  }).open();
  console.log('%c[Eclipse] %c' + str, "color:#d21c46", "color: black");
}
console.alert = function(str) {
  eclipse.dialog.alert(str);
}
console.print = function(str) {
  console.log('%c[Eclipse] %c' + str, "color:#d21c46", "color: gray");
}

// Init App
var eclipse = new Framework7({
  id: 'ml.zenithdevs.eclipse',
  root: '#app',
  theme: theme,
  touch: {
    tapHold: true,
  },
  dialog: {
    title: 'Eclipse',
  },
  methods: {

    // General

    log: function(message) {
      console.log(message);
    },
    error: function(message) {
      console.error(message);
    },
    getSystem: function(extension) {
      if (extension.toLowerCase() == "gba") {
        return "gba";
      } else if (extension.toLowerCase() == "gb") {
        return "gb";
      } else if (extension.toLowerCase() == "gbc") {
        return "gbc";
      } else if (extension.toLowerCase() == "nes") {
        return "nes";
      }
    },
    checkImage: function(url) {
      var imageData = new Image();
      var imageExists;
      imageData.onload = function() {
        imageExists = true;
      };
      imageData.onerror = function() {
        imageExists = false;
      };
      imageData.src = url;
      return imageExists;
    },
    reloadView: function(url) {
      eclipse.router.navigate(url, {
        reloadCurrent: true
      });
    },
    loadScript: function(url) {
      var script = document.createElement("script");
      script.type = "text/javascript";
      script.src = url;
      script.id = url;
      document.getElementsByTagName("head")[0].appendChild(script);
      return false;
    },
    unloadScript: function(url) {
      document.getElementById(url).outerHTML = "";
      return false
    },
    // Games

    games: {
      addGame: function(name, boxart, link, system) {
        var json = '{"name":"' + name.patch() + '", "boxart":"' + boxart.patch() + '", "link":"' + link.patch() + '", "system":"' + system.patch() + '"}';
        games.add(json);
      },
      addGameURL: function(url) {
        eclipse.preloader.show();
        var file_name = url.lastIndexOf('/');
        file_name = url.substring(file_name + 1);
        var file_extension = url.lastIndexOf('.');
        file_extension = url.substring(file_extension + 1);
        file_extension = file_extension.toLowerCase().replace("?dl=1", "");
        file_name = file_name.replace('_', ' ').replace('%20', ' ').replace('-', ' ');
        system = eclipse.methods.getSystem(file_extension);
        var res = file_name.toLowerCase().replace('.' + file_extension, '').replace('?dl=1', '').split(" ");
        var query = "";
        for (i = 0; i < res.length; i++) {
          if (i == 0) {
            query += res[i];
          } else if (i > 4) {} else {
            query += "," + res[i];
          }
        }
        var apiURL = 'https://zenithdevs.com/eclipse/api/?q=' + query;
        try {
          var gamesDB = apiURL.getJSON();
          var greatestMatches = 0;
          var gI = -1;
          var matches = 0;
          for (i = 0; i < gamesDB[system].length; i++) {
            var matches = 0;
            for (ii = 0; ii < res.length; ii++) {
              if (gamesDB[system][i].name.toLowerCase().indexOf(res[ii]) > -1) {
                var matches = matches + 1;
              }
            }
            if (matches > greatestMatches) {
              var greatestMatches = matches;
              var gI = i;
            }
          }
          if (gI > -1) {
            if (gamesDB[system][gI].boxart == "") {
              eclipse.methods.games.addGame(gamesDB[system][gI].name, 'assets/img/default-cover.png', url, system);
            } else {
              eclipse.methods.games.addGame(gamesDB[system][gI].name, gamesDB[system][gI].boxart, url, system);
            }
          } else {
            eclipse.methods.games.addGame(file_name, 'assets/img/default-cover.png', url, system);
          }
        } catch (err) {
          eclipse.methods.games.addGame(file_name, 'assets/img/default-cover.png', url, system);
          eclipse.preloader.hide();
        }
        eclipse.preloader.hide();
        eclipse.methods.reloadView('/')
      },
      addGamePopup: function() {
        var addPopup = eclipse.actions.create({
          buttons: [
            // First group
            [{
                text: 'Add Game',
                label: true
              },
              {
                text: 'Upload',
                icon: '<i class="icon f7-icons ios-only">folder_fill</i><i class="icon material-icons md-only">folder</i>',
                onClick: function() {

                }
              },
              {
                text: 'URL',
                icon: '<i class="icon f7-icons ios-only">compass_fill</i><i class="icon material-icons md-only">explore</i>',
                onClick: function() {
                  eclipse.dialog.prompt('Enter the direct URL for the game you wish to add.', function(url) {
                    eclipse.methods.games.addGameURL(url);
                  });
                }
              },
              {
                text: 'Repos',
                icon: '<i class="icon f7-icons ios-only">collection_fill</i><i class="icon material-icons md-only">view_carousel</i>',
                onClick: function() {
                  eclipse.router.navigate("/repos/");
                }
              }
            ],
            // Second group
            [{
              text: 'Cancel',
              color: 'red'
            }]
          ],
          grid: false,
        });
        addPopup.open();
      },
      manageGamePopup: function(index, name) {
        var gamesList = games.list();
        var manageGamePopup = eclipse.actions.create({
          buttons: [
            // First group
            [{
                text: name + " (" + JSON.parse(games.list()[0]).system.patch().toUpperCase() + ")",
                label: true
              },
              {
                text: 'Rename',
                onClick: function() {
                  var jsonItem = JSON.parse(gamesList[index]);
                  eclipse.dialog.confirm(`<p>Edit the name for "${name.patch()}"</p>
                    <div class="dialog-input-field item-input"><div class="item-input-wrap"><input type="name" value="${jsonItem.name.patch()}" placeholder="${jsonItem.name.patch()}" class="dialog-input" id="NameURL"></div></div>
                    `, function(evt) {
                        name = document.getElementById("NameURL").value;
                        if(name == "") {
                            name = jsonItem.link.patch();
                        }
                        var newJSON = '{"name":"' + name.patch() + '", "boxart":"' + jsonItem.boxart.patch() + '", "link":"' + jsonItem.link.patch() + '", "system":"' + jsonItem.system.patch() + '"}';
                        games.updateData(newJSON, index);
                        eclipse.methods.reloadView('/');
                    })
                }
              },
              {
                text: 'Change Box Art',
                onClick: function() {
                  var jsonItem = JSON.parse(gamesList[index]);
                  eclipse.dialog.confirm(`<p>Update the box art for "${name.patch()}"</p>
                    <input style="display:none" type="file" name="boxart" accept="image/jpeg, image/png, image/gif" onchange="eclipse.methods.games.fileUploadURL(this)" id="BoxartUploader">
                    <center><img src="${jsonItem.boxart.patch()}" style="border-radius:5px;width:200px;height:auto" id="boxartPreview"></center>
                    <br><br>
                    <button onclick="document.getElementById('BoxartUploader').click()" class="button">Upload Box Art</button>
                    <div class="dialog-input-field item-input"><div class="item-input-wrap"><input onkeyup="eclipse.methods.games.updateBoxArtPreview('${jsonItem.boxart.patch()}')" type="url" placeholder="${jsonItem.boxart.patch()}" class="dialog-input" id="boxartURL"></div></div>
                    `, function(evt) {
                        boxart = document.getElementById("boxartURL").value;
                        if(boxart == "") {
                            boxart = jsonItem.boxart.patch();
                        }
                        // eclipse.dialog.prompt('Update the box art for "' + name + '"', function(boxart) {
                        var newJSON = '{"name":"' + jsonItem.name.patch() + '", "boxart":"' + boxart.patch() + '", "link":"' + jsonItem.link.patch() + '", "system":"' + jsonItem.system.patch() + '"}';
                        games.updateData(newJSON, index);
                        eclipse.methods.reloadView('/');
                  });
                }
              },
              {
                text: 'Edit Link',
                onClick: function() {
                  var jsonItem = JSON.parse(gamesList[index]);
                  eclipse.dialog.confirm(`<p>Edit the link for "${name.patch()}"</p>
                    <div class="dialog-input-field item-input"><div class="item-input-wrap"><input type="url" value="${jsonItem.link.patch()}" placeholder="${jsonItem.link.patch()}" class="dialog-input" id="LinkURL"></div></div>
                    `, function(evt) {
                        link = document.getElementById("LinkURL").value;
                        if(link == "") {
                            link = jsonItem.link.patch();
                        }
                        var newJSON = '{"name":"' + jsonItem.name.patch() + '", "boxart":"' + jsonItem.boxart.patch() + '", "link":"' + link.patch() + '", "system":"' + jsonItem.system.patch() + '"}';
                        games.updateData(newJSON, index);
                        eclipse.methods.reloadView('/');
                    })
                  }
              },
              {
                text: 'Change Platform',
                onClick: function() {
                  var jsonItem = JSON.parse(gamesList[index]);
                  var previousSystem = jsonItem.system.patch().toUpperCase();
                  if(previousSystem == "NES") {isNES = "selected"} else {isNES = ""}
                  if(previousSystem == "GB") {isGB = "selected"} else {isGB = ""}
                  if(previousSystem == "GBC") {isGBC = "selected"} else {isGBC = ""}
                  if(previousSystem == "GBA") {isGBA = "selected"} else {isGBA = ""}
                  eclipse.dialog.confirm(`<p>Edit the platform of "${name.patch()}"</p>
                    <div class="dialog-input-field item-input"><div class="item-input-wrap">
                    <select style="border:1px #f44336 solid;padding:4px;border-radius:5px;width:100%" id="platformValue">
                      <option ${isNES} value="NES">Nintendo Entertainment System</option>
                      <option ${isGB} value="GB">Game Boy</option>
                      <option ${isGBC} value="GBC">Game Boy Color</option>
                      <option ${isGBA} value="GBA">Game Boy Advance</option>
                    </select>

                    </div></div>
                    `, function(evt) {
                        system = document.getElementById("platformValue").value;
                        var newJSON = '{"name":"' + jsonItem.name.patch() + '", "boxart":"' + jsonItem.boxart.patch() + '", "link":"' + jsonItem.link.patch() + '", "system":"' + system.patch() + '"}';
                        games.updateData(newJSON, index);
                        eclipse.methods.reloadView('/');
                    })
                }
              },
              {
                text: 'Remove',
                color: 'red',
                onClick: function() {
                  var jsonItem = JSON.parse(gamesList[index]);
                  games.remove(gamesList[index]);
                  console.toast(jsonItem.name.patch() + " has been removed.")
                  eclipse.methods.reloadView('/');
                }
              }
            ],
            // Second group
            [{
              text: 'Cancel',
              color: 'red'
            }]
          ]
        });
        manageGamePopup.open();
      },
      updateBoxArtPreview: function(defImage) {
        if (!defImage) {
          defImage = "assets/img/default-cover.png";
        }
        x = document.getElementById('boxartURL').value
        if (x == "" || x == undefined || x == null) {
          document.getElementById('boxartPreview').src = defImage;
        } else {
          document.getElementById('boxartPreview').src = x;
        }
      },
      fileUploadURL: function(input) {
        if (input.files && input.files[0]) {
          var reader = new FileReader();
          reader.onload = function(e) {
            $('#BoxartUploader').attr('src', e.target.result);
            $('#boxartURL').val(e.target.result);
            document.getElementById('boxartURL').disabled = true;
            document.getElementById('boxartURL').style.color = "grey";
          };
          reader.readAsDataURL(input.files[0]);
        }
        window.setTimeout(function() {
          eclipse.methods.games.updateBoxArtPreview();
        }, 10);
      },
    },

    // Skins

    skins: {
      updateSkinLabel: function() {
        console.print("Updating skin icon...")
        document.getElementById("currentSkinName").innerHTML = OpenSkin.skin().name;
        document.getElementById("currentSkinArtist").innerHTML = OpenSkin.skin().author;
        document.getElementById("currentSkinLogo").src = OpenSkin.skin().logo;
      },
      fetchInstalledSkins: function() {
        // Updates skin labels
        eclipse.methods.skins.updateSkinLabel();

        // Get current skins
        sk = skins.list();
        if (sk.length > 0) {
          var skinsList = "<ul>";
          for (var i = 0; i < sk.length; i++) {
            console.print(i) //temp
            // jQuery.getJSON(sk[i], function(json) {
            try {
                json = sk[i].getJSON();
                if(json.name == undefined || json.name == null) {
                    skinsList += '<li class="swipeout" >' +
                    '<div class="swipeout-content disabled">' +
                    // i is == to 2 for some reason, all the time. ? ?? ?? ?¿
                    '<div class="item-link item-content">' +
                    '<div class="item-media"><img id="skinIcon' + i + '" src="assets/img/default-cover.png" width="44px" style="border-radius:44px;"/></div>' +
                    '<div class="item-inner">' +
                    '<div class="item-title">' +
                    '<span id="skinName' + i + '">Unknown Skin</span>' +
                    '<div class="item-footer" id="skinAuthor' + i + '">' + sk[i].patch().substring(sk[i].patch().indexOf("?dl=")+4) + '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '<div class="swipeout-actions-right swipeout-delete">' +
                    '<a href="#" style="background: #fe3b30" onclick="eclipse.methods.skins.removeSkin(\'' + sk[i].patch() + '\')">Delete</a>' +
                    '</div>' +
                    '</li>';
                } else {
                    skinsList += '<li class="swipeout" >' +
                    '<div class="swipeout-content">' +
                    // i is == to 2 for some reason, all the time. ? ?? ?? ?¿
                    '<a href="#" onclick="skins.set(\'' + sk[i].patch() + '\')" class="item-link item-content">' +
                    '<div class="item-media"><img id="skinIcon' + i + '" src="' + json.logo.patch() + '" width="44px" style="border-radius:44px;"/></div>' +
                    '<div class="item-inner">' +
                    '<div class="item-title">' +
                    '<span id="skinName' + i + '">' + json.name.patch() + '</span>' +
                    '<div class="item-footer" id="skinAuthor' + i + '">' + json.author.patch() + '</div>' +
                    '</div>' +
                    '</div>' +
                    '</a>' +
                    '</div>' +
                    '<div class="swipeout-actions-right swipeout-delete">' +
                    '<a href="#" style="background: #fe3b30" onclick="eclipse.methods.skins.removeSkin(\'' + sk[i].patch() + '\')">Delete</a>' +
                    '</div>' +
                    '</li>';
                }
                document.getElementById("skins-list").innerHTML = skinsList + "</ul>";
            } catch(err) {
                console.error("Notice: Skin " + i + " is broken.")
            }
            // document.getElementById("skinIcon" + i).src = json.logo.patch();
            // });
          }
        } else {
          emptyList = "<div class=\"block\"><center style=\"padding:5px\"><h1 style=\"color:#333;\">No Skins!</h1><h2>Add some skins and they'll appear here.</h2></center></div>"
          document.getElementById("skins-list").innerHTML = emptyList;
        }
      },
      addSkinPrompt: function() {
        eclipse.dialog.prompt('Enter a Skin URL:', function(url) {
          eclipse.methods.skins.addSkin(url);
        });
      },
      addSkinErr: function() {
        eclipse.dialog.prompt('That skin was not found. Please enter a Skin URL:', function(url) {
          eclipse.methods.skins.addSkin(url);
        });
      },
      fetchLastSkin: function() {
        sk = skins.list();
        i = sk.length - 1;
        json = sk[i].getJSON();
        console.print(json.name);
        skinsList = '<li class="swipeout" >' +
          '<div class="swipeout-content">' +
          '<a href="#" onclick="skins.set(\'' + sk[i] + '\')" class="item-link item-content">' +
          '<div class="item-media"><img id="skinIcon' + i + '" src="' + json.logo.patch() + '" width="44px" style="border-radius:44px;"/></div>' +
          '<div class="item-inner">' +
          '<div class="item-title">' +
          '<span id="skinName' + i + '">' + json.name.patch() + '</span>' +
          '<div class="item-footer" id="skinAuthor' + i + '">' + json.author.patch() + '</div>' +
          '</div>' +
          '</div>' +
          '</a>' +
          '</div>' +
          '<div class="swipeout-actions-right swipeout-delete">' +
          '<a href="#" style="background: #fe3b30" onclick="eclipse.methods.skins.removeSkin(\'' + sk[i] + '\')">Delete</a>' +
          '</div>' +
          '</li>';
        document.querySelector("#skins-list>ul").innerHTML += skinsList;
      },
      addSkin: function(url) {
        skins.add("//php.eclipseemu.me/dl/dl.php?dl=" + url);
      },
      removeSkin: function(url) {
        console.log(url)
        i = skins.list().search(url);
        // To prevent a possibly detrimental user experience, let's hide the skin so we don't have to refresh all of them.
        // console.log(i)
        // document.querySelectorAll("#skins-list>ul>li")[i].style.display = "none";
        skins.remove(url, true);

        // eclipse.methods.skins.fetchInstalledSkins();
      },
      listFeaturedSkins: function() {
        var skinsList = skins.list();
        var featured = "json/skins/featured.json".getJSON();
        var featured_shuffled = featured.shuffle();
        var libraryRows = featured.length % 5;
        var emptySlots = 5 - libraryRows;
        var featuredSlides = "";
        var featuredCards = "";
        for (i = 0; i < featured.length; i++) {
           featuredSlides += '<div class="gradient swiper-slide" style="height:300px; width: 85%; border-radius:10px;">' +
            '<div class="content-block" style="height:100%; width:100%; text-align:center; padding:16px; padding-top:64px;">' +
            '<img width="128px" style="border-radius:5px; box-shadow: 0 5px 15px 0 rgba(0, 0, 0, .1);" src="' + featured_shuffled[i].icon + '">' +
            '<h3 style="margin:5px;width:100%;text-align:center;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">' + featured_shuffled[i].name + '</h3>' +
            '<div class="row">' +
            '<div class="col-100 tablet-33"></div>' +
            '<div class="col-100 tablet-33">' +
            '<a style="" href="#" onclick="eclipse.methods.skins.addSkin(\'' + featured_shuffled[i].link + '\')" class="button button-fill button-big color-white text-color-black white-button">Add Skin</a>' +
            '</div>' +
            '<div class="col-100 tablet-33"></div>' +
            '</div>' +
            '</div>' +
            '</div>';
        }

        document.getElementById('featured-skins-sliders').innerHTML = featuredSlides;

        for (i = 0; i < featured.length; i++) {
          featuredCards += '<div class="col-50 tablet-20">' +
            '<a href="#" onclick="eclipse.methods.skins.addSkin(\'' + featured[i].link + '\')">' +
            '<li class="card">' +
            '<div class="card-content">' +
            '<img src="' + featured[i].icon + '" class="boxart">' +
            '</div>' +
            '<div class="card-footer"><text class="card-footer-inner-text">' + featured[i].name + '</text></div>' +
            '</li>' +
            '</a>' +
            '</div>';
        }

        for (var ii = 0; ii < emptySlots; ii++) {
          featuredCards += "<div class=\"col-50 tablet-20\"></div>";
        }

        document.getElementById('featured-skins').innerHTML = featuredCards;

        var swiper = eclipse.swiper.create('.swiper-container', {
          speed: 400,
          spaceBetween: 10,
          slidesPerView: 'auto',
          centeredSlides: true,
          pagination: {
            el: '.swiper-pagination',
          },
          loop: true
        });
      },
    },
    // Repos

    repos: {
      addPrompt: function() {
        eclipse.dialog.prompt('Enter a Repo URL:', function(url) {
          eclipse.methods.repos.addRepo(url);
        });
      },
      addRepo: function(url) {
        repos.add("https://php.eclipseemu.me/dl/dl.php?dl=" + url.patch());
        eclipse.methods.repos.list();
      },
      listFeatured: function() {
        var featured = "json/repos/featured.json".getJSON();
        var featured_shuffled = featured.shuffle();
        var libraryRows = featured.length % 5;
        var emptySlots = 5 - libraryRows;
        var featuredSlides = "";
        var featuredCards = "";

        for (i = 0; i < featured.length; i++) {
          featuredSlides += '<div class="swiper-slide gradient" style="height:300px; width: 85%; border-radius:10px;">' +
            '<div class="content-block" style="height:100%; width:100%; text-align:center; padding:16px; padding-top:64px;">' +
            '<img width="128px" style="border-radius:5px; box-shadow: 0 5px 15px 0 rgba(0, 0, 0, .1);" src="' + featured_shuffled[i].icon + '">' +
            '<h3 style="margin:5px;width:100%;text-align:center;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;">' + featured_shuffled[i].name + '</h3>' +
            '<div class="row">' +
            '<div class="col-100 tablet-33"></div>' +
            '<div class="col-100 tablet-33">' +
            '<a style="" href="#" onclick="eclipse.methods.repos.addRepo(\'' + featured_shuffled[i].link + '\');" class="button button-fill button-big color-white text-color-black white-button">Add Repos</a>' +
            '</div>' +
            '<div class="col-100 tablet-33"></div>' +
            '</div>' +
            '</div>' +
            '</div>';
        }

        document.getElementById('featured-repos-sliders').innerHTML = featuredSlides;

        for (i = 0; i < featured.length; i++) {
          featuredCards += '<div class="col-50 tablet-20">' +
            '<a href="#" onclick="eclipse.methods.repos.addRepo(\'' + featured[i].link + '\');">' +
            '<li class="card">' +
            '<div class="card-content">' +
            '<img src="' + featured[i].icon + '" class="boxart">' +
            '</div>' +
            '<div class="card-footer"><text class="card-footer-inner-text">' + featured[i].name + '</text></div>' +
            '</li>' +
            '</a>' +
            '</div>';
        }

        for (var ii = 0; ii < emptySlots; ii++) {
          featuredCards += "<div class=\"col-50 tablet-20\"></div>";
        }

        document.getElementById('featured-repos').innerHTML = featuredCards;

        var swiper = eclipse.swiper.create('.swiper-container', {
          speed: 400,
          spaceBetween: 10,
          slidesPerView: 'auto',
          centeredSlides: true,
          pagination: {
            el: '.swiper-pagination',
          },
          loop: true
        });
      },
      list: function() {
        var reposList = repos.list();
        if (reposList.length > -1) {
          var repoList = "";
          for (i = 0; i < reposList.length; i++) {
            var repoItem = repos.get(reposList[i]);
            repoList += '<li class="swipeout" >' +
              '<div class="swipeout-content">' +
              '<a href="/repo/?url=' + reposList[i] + '" class="item-link item-content">' +
              '<div class="item-media"><img src="' + repoItem.repologo.patch() + '" width="44px" style="border-radius:44px;"/></div>' +
              '<div class="item-inner">' +
              '<div class="item-title">' +
              '<span>' + repoItem.reponame.patch() + '</span>' +
              '<div class="item-footer">' + repoItem.repoauthor.patch() + '</div>' +
              '</div>' +
              '</div>' +
              '</a>' +
              '</div>' +
              '<div class="swipeout-actions-right">' +
              '<a href="#" style="background: #fe3b30" onclick="repos.remove(\'' + reposList[i] + '\')">Delete</a>' +
              '</div>' +
              '</li>';
          }
          document.getElementById('repos-list').innerHTML = "<ul>" + repoList + "</ul>";
        }
      }
    },
    storage: {
      wrapper: function() {
        if ('storage' in navigator && 'estimate' in navigator.storage) {
          // We've got the real thing! Return its response.
          return navigator.storage.estimate();
        }

        if ('webkitTemporaryStorage' in navigator &&
          'queryUsageAndQuota' in navigator.webkitTemporaryStorage) {
          // Return a promise-based wrapper that will follow the expected interface.
          return new Promise(function(resolve, reject) {
            navigator.webkitTemporaryStorage.queryUsageAndQuota(
              function(usage, quota) {
                resolve({
                  usage: usage,
                  quota: quota
                })
              },
              reject
            );
          });
        }

        if (navigator.userAgent.toLowerCase().search(/(chrome|android)/i) == -1 && navigator.userAgent.toLowerCase().search(/safari/i) != -1) {
          // return new Promise(function(resolve, reject) {
          usage = (JSON.stringify(localStorage).length) * 2; // Calculate the approximate length, in bytes. x2 due to UTF-16.
          console.print("Exact Usage: " + usage)
          quota = 5200000;
          //usage += 8000000 // Eclipse uses 7.0MB, but we'll report 8, just in case.
          console.print("Total Quota: " + quota)
          //   function(usage, quota) {resolve({usage: usage, quota: quota})}, reject
          // });
          return Promise.resolve({
            usage: usage,
            quota: quota
          });
        }

        // If we can't estimate the values, return a Promise that resolves with NaN.
        return Promise.resolve({
          usage: NaN,
          quota: NaN
        });
      },
      reset: {
        repos: function() {
          eclipse.dialog.confirm('Are you sure you want to clear your installed repos? This cannot be undone.', "Reset Repos?", function() {
            localStorage.setItem("repos", "[]");
            console.toast("Installed repos have been cleared.");
          });
        },
        games: function() {
          eclipse.dialog.confirm('Are you sure you want to clear your installed games? This cannot be undone.', "Reset Repos?", function() {
            localStorage.setItem("games", "[]");
            console.toast("Installed games have been cleared.");
          });
        },
        skins: function() {
          eclipse.dialog.confirm('Are you sure you want to clear your installed skins? This cannot be undone.', "Reset Repos?", function() {
            localStorage.setItem("skins", '["https://eclipseemu.me/play/json/skins/default.json"]');
            localStorage.setItem("currentSkin", '{"name":"Default","logo":"https:\/\/eclipseemu.me\/play\/img\/icons\/icon_mobFull.png","author":"Eclipse Team","description":"The default theme for Eclipse.","styles":[[]]}');
            console.toast("Installed skins have been cleared.");
            window.location.reload();
          });
        },
        controls: function() {
          eclipse.dialog.confirm('Are you sure you want to reset your keybinds and paired controllers? This cannot be undone.', "Reset Repos?", function() {
            localStorage.removeItem("controls");
            console.toast("Your controller and keybind settings have been cleared.");
          });
        },
        all: function() {
          eclipse.dialog.confirm('Are you sure you want to clear repos, games, skins, and controls? This cannot be undone.', "Reset Eclipse?", function() {
            localStorage.setItem("repos", "[]");
            localStorage.setItem("games", "[]");
            localStorage.setItem("skins", '["https://eclipseemu.me/play/json/skins/default.json"]');
            localStorage.setItem("currentSkin", '{"name":"Default","logo":"https:\/\/eclipseemu.me\/play\/img\/icons\/icon_mobFull.png","author":"Eclipse Team","description":"The default theme for Eclipse.","styles":[[]]}');
            localStorage.removeItem("controls");
            console.toast("Eclipse has been reset.");
            window.location.reload();
          });
        }
      },
      nuke: function() {
        eclipse.dialog.confirm('Are you sure you want to initialize Eclipse? All data will be lost.', "Initialize Eclipse?", function() {
          localStorage.clear();
          console.toast("Eclipse has been initialized. Restarting...");
          window.location.reload();
        });
      },
    },
    webBrowser: function(url) {
      eclipse.popup.create({
        content: `<div class="popup">
                  <div class="navbar">
                    <div class="navbar-inner sliding">
                      <div class="left">
                        <a href="#" class="link popup-close">
                          <div class="tint ios-only">Close</div>
                          <i class="icon material-icons md-only">close</i>
                        </a>
                      </div>
                      <div class="title">Web</div>
                      <div class="right">
                        <a href="${url}" class="external link icon-only">
                          <i class="icon f7-icons ios-only">world</i>
                          <i class="icon material-icons md-only">explore</i>
                        </a>
                      </div>
                    </div>
                  </div>
                  <iframe id="browserFrame" style="width:100%;height:87%;border:0"></iframe>
                </div>
      `
      }).open();
      window.setTimeout(function() {
        document.getElementById("browserFrame").src = url;
      }, 250);
    },

    // Controls

    emulateKeypress: function(code) {
      var down = new Event('keypress');
      down.keyCode = code;
      document.dispatchEvent(down);
    },
    emulateKeydown: function(code) {
      var down = new Event('keydown');
      down.keyCode = code;
      document.dispatchEvent(down);
    },
    emulateKeyup: function(code) {
      var up = new Event('keyup');
      up.keyCode = code;
      document.dispatchEvent(up);
    },
    loadControls: function(options) {
      var desktopModeEnabled = localStorage.getItem('desktopMode');
      if (desktopModeEnabled == true) {
        document.getElementById('up_btn').setAttribute('style', 'display:none;');
        document.getElementById('down_btn').setAttribute('style', 'display:none;');
        document.getElementById('up_btn').setAttribute('style', 'display:none;');
        document.getElementById('left_btn').setAttribute('style', 'display:none;');
        document.getElementById('right_btn').setAttribute('style', 'display:none;');
        document.getElementById('start_btn').setAttribute('style', 'display:none;');
        document.getElementById('select_btn').setAttribute('style', 'display:none;');
        document.getElementById('a_btn').setAttribute('style', 'display:none;');
        document.getElementById('b_btn').setAttribute('style', 'display:none;');
        document.getElementById('l_btn').setAttribute('style', 'display:none;');
        document.getElementById('r_btn').setAttribute('style', 'display:none;');
      } else {
        up_btn = options.up;
        down_btn = options.down;
        left_btn = options.left;
        right_btn = options.right;
        start_btn = options.start;
        select_btn = options.select;
        a_btn = options.a;
        b_btn = options.b;
        l_btn = options.l;
        r_btn = options.r;
        if (options.up != null) {
          $('#up_btn').on('touchstart touchenter touchup touchmove mousedown', function() {
            this.loop = setInterval(function() {
              eclipse.methods.emulateKeydown(up_btn);
            }, 100);
          }).on('touchend touchleave mouseup', function() {
            clearInterval(this.loop);
            eclipse.methods.emulateKeyup(up_btn);
          });
        }
        if (options.down != null) {

          $('#down_btn').on('touchstart touchenter touchup touchmove mousedown', function() {
            this.loop = setInterval(function() {
              eclipse.methods.emulateKeydown(down_btn);
            }, 100);
          }).on('touchend touchleave mouseup', function() {
            clearInterval(this.loop);
            eclipse.methods.emulateKeyup(down_btn);
          });
        }
        if (options.left != null) {

          $('#left_btn').on('touchstart touchenter touchup touchmove mousedown', function() {
            this.loop = setInterval(function() {
              eclipse.methods.emulateKeydown(left_btn);
            }, 100);
          }).on('touchend touchleave mouseup', function() {
            clearInterval(this.loop);
            eclipse.methods.emulateKeyup(left_btn);
          });
        }
        if (options.right != null) {

          $('#right_btn').on('touchstart touchenter touchup touchmove mousedown', function() {
            this.loop = setInterval(function() {
              eclipse.methods.emulateKeydown(right_btn);
            }, 100);
          }).on('touchend touchleave mouseup', function() {
            clearInterval(this.loop);
            eclipse.methods.emulateKeyup(right_btn);
          });
        }
        if (options.a != null) {
          $('#a_btn').on('touchstart touchenter touchup touchmove mousedown', function() {
            this.loop = setInterval(function() {
              eclipse.methods.emulateKeydown(a_btn);
            }, 100);
          }).on('touchend touchleave mouseup', function() {
            clearInterval(this.loop);
            eclipse.methods.emulateKeyup(a_btn);
          });
        }
        if (options.b != null) {

          $('#b_btn').on('touchstart touchenter touchup touchmove mousedown', function() {
            this.loop = setInterval(function() {
              eclipse.methods.emulateKeydown(b_btn);
            }, 100);
          }).on('touchend touchleave mouseup', function() {
            clearInterval(this.loop);
            eclipse.methods.emulateKeyup(b_btn);
          });
        }
        if (options.start != null) {
          $('#start_btn').on('touchstart touchenter touchup touchmove mousedown', function() {
            this.loop = setInterval(function() {
              eclipse.methods.emulateKeydown(start_btn);
            }, 100);
          }).on('touchend touchleave mouseup', function() {
            clearInterval(this.loop);
            eclipse.methods.emulateKeyup(start_btn);
          });
        }
        if (options.select != null) {
          $('#select_btn').on('touchstart touchenter touchup touchmove mousedown', function() {
            this.loop = setInterval(function() {
              eclipse.methods.emulateKeydown(select_btn);
            }, 100);
          }).on('touchend touchleave mouseup', function() {
            clearInterval(this.loop);
            eclipse.methods.emulateKeyup(select_btn);
          });
        }
        if (options.l != null) {
          $('#l_btn').on('touchstart touchenter touchup touchmove mousedown', function() {
            this.loop = setInterval(function() {
              eclipse.methods.emulateKeydown(l_btn);
            }, 100);
          }).on('touchend touchleave mouseup', function() {
            clearInterval(this.loop);
            eclipse.methods.emulateKeyup(l_btn);
          });
        }
        if (options.r != null) {
          $('#r_btn').on('touchstart touchenter touchup touchmove mousedown', function() {
            this.loop = setInterval(function() {
              eclipse.methods.emulateKeydown(r_btn);
            }, 100);
          }).on('touchend touchleave mouseup', function() {
            clearInterval(this.loop);
            eclipse.methods.emulateKeyup(r_btn);
          });
        }
      }
    },

    // Onboarding

    welcome: {
        new: function(animate) {
            if(animate == undefined) {
                animate = true;
            }
            eclipse.popup.create({
              content: `<div class="popup">
                            <div class="block">
                                <center>
                                    <img src="assets/img/icon_mobFull.png" style="box-shadow: 0 5px 13px 0 rgba(0, 0, 0, .1);border-radius:21%;width:150px;height:150px">
                                    <h1 style="color:#333;font-weight:500;font-size:50px">Welcome.</h1>
                                    <p>Eclipse is a Web-based emulator that allows you to easily emulate various home and portable consoles on most devices.</p>
                                    <p>Eclipse supports NES, Game Boy, Game Boy Color, and Game Boy Advance games, with support for more systems planned.</p><br><a href="#" onclick="eclipse.methods.welcome.display()" class="button active button-big button-round gradient popup-close" style="box-shadow: 0 5px 13px 0 rgba(0, 0, 0, .1); border:none; font-weight:bold;">Continue...</a><br>
                                    <a href="#" onclick="eclipse.methods.welcome.restore()" class="popup-close" style="text-decoration:none;color:grey;">Import Data from iGBA or Eclipse Backup...</a><br>
                                </center>
                            </div>
                        </div>`,
            }).open(animate);
        },
        display: function() {
            eclipse.popup.create({
              content: `<div class="popup">
                            <div class="block">
                                <center>
                                    <div class="row"><i onclick="eclipse.methods.welcome.new(false)" class="icon icon-back color-black popup-close" style="position: absolute; height: 42px; cursor: pointer;padding-top:15px" id="restoreBack"></i><h1 style="color:#333;margin:0;width:100%;font-size:42px">Select Display Mode</h1></div>
                                    <p>When playing in Landscape mode, you can either have the game run in the correct aspect ratio, or disregard traditional aspect ratios so your game can cover the whole screen. This option can be changed later in Settings.</p>
                                    <br>
                                    <div class="segmented"><a onclick="eclipse.methods.welcome.setDisplay.fit()" id="fit" class="button button-active">Fit</a><a onclick="eclipse.methods.welcome.setDisplay.stretch()" id="stretch" class="button">Fill Screen</a>
                                    </div>
                                    <img id="fillPreview" src="assets/img/fit/fit.png" style="width:70%">
                                    <br><a href="#" onclick="eclipse.methods.welcome.skin()" class="button active button-big button-round gradient popup-close" style="box-shadow: 0 5px 13px 0 rgba(0, 0, 0, .1); border:none; font-weight:bold;">Continue...</a>
                                    <br>
                                </center>
                            </div>
                        </div>`,
            }).open(false);
        },
        skin: function() {
            eclipse.popup.create({
              content: `<div class="popup">
                            <div class="block">
                                <center>
                                    <div class="row"><i onclick="eclipse.methods.welcome.display()" class="icon icon-back color-black popup-close" style="position: absolute; height: 42px; cursor: pointer;padding-top:15px" id="restoreBack"></i><h1 style="color:#333;margin:0;width:100%;font-size:42px">Select Skin</h1></div>
                                    <p>You can customize what Eclipse would look like using skins. You can change this later or add your own in Settings.</p>
                                    <br>
                                    <div id="skinSelector">
                                        <img onclick="skins.set('//php.eclipseemu.me/dl/dl.php?dl=https://eclipseemu.me/play/json/skins/default.json')" style="cursor:pointer;width:80px;height:80px;border-radius:21%" src="./assets/img/skin/red.png">
                                        <txt style="visibility:hidden">---</txt>
                                        <img onclick="skins.set('//php.eclipseemu.me/dl/dl.php?dl=https://eclipseemu.me/play/json/skins/blue.json')" style="cursor:pointer;width:80px;height:80px;border-radius:21%" src="./assets/img/skin/blue.png">
                                        <txt style="visibility:hidden">---</txt>
                                        <img onclick="skins.set('//php.eclipseemu.me/dl/dl.php?dl=https://eclipseemu.me/play/json/skins/green.json')" style="cursor:pointer;width:80px;height:80px;border-radius:21%" src="./assets/img/skin/green.png">
                                        <txt style="visibility:hidden">---</txt>
                                        <img onclick="skins.set('//php.eclipseemu.me/dl/dl.php?dl=https://eclipseemu.me/play/json/skins/grey.json')" style="cursor:pointer;width:80px;height:80px;border-radius:21%" src="./assets/img/skin/grey.png">
                                        <txt style="visibility:hidden">---</txt>
                                        <img onclick="skins.set('//php.eclipseemu.me/dl/dl.php?dl=https://eclipseemu.me/play/json/skins/magenta.json')" style="cursor:pointer;width:80px;height:80px;border-radius:21%" src="./assets/img/skin/magenta.png">
                                        <txt style="visibility:hidden">---</txt>
                                        <img onclick="skins.set('//php.eclipseemu.me/dl/dl.php?dl=https://eclipseemu.me/play/json/skins/orange.json')" style="cursor:pointer;width:80px;height:80px;border-radius:21%" src="./assets/img/skin/orange.png">
                                        <txt style="visibility:hidden">---</txt>
                                        <img onclick="skins.set('//php.eclipseemu.me/dl/dl.php?dl=https://eclipseemu.me/play/json/skins/iGBAModern.json')" style="cursor:pointer;width:80px;height:80px;border-radius:21%" src="//eclipseemu.me/play/img/igba.jpeg">
                                        <txt style="visibility:hidden">---</txt>
                                        <img onclick="skins.set('//php.eclipseemu.me/dl/dl.php?dl=https://eclipseemu.me/play/json/skins/iGBALegacy.json')" style="cursor:pointer;width:80px;height:80px;border-radius:21%" src="//igbaemu.com/beta-1134/icon-refresh.png">
                                        <txt style="visibility:hidden">---</txt>
                                        <img onclick="skins.set('//php.eclipseemu.me/dl/dl.php?dl=https://igba.shuga.co/theme/darkMode/index.json')" style="cursor:pointer;width:80px;height:80px;border-radius:21%" src="//igba.shuga.co/theme/darkMode/icon.png">
                                        <txt style="visibility:hidden">---</txt>
                                        <img onclick="skins.set('//php.eclipseemu.me/dl/dl.php?dl=https://igba.shuga.co/theme/twitterDark/index.json')" style="cursor:pointer;width:80px;height:80px;border-radius:21%" src="//igba.shuga.co/img/twitterDark.png">
                                        <txt style="visibility:hidden">---</txt>
                                    </div>
                                    <br><a href="#" onclick="eclipse.methods.welcome.done()" class="button active button-big button-round gradient popup-close" style="box-shadow: 0 5px 13px 0 rgba(0, 0, 0, .1); border:none; font-weight:bold;">Continue...</a>
                                    <br>
                                </center>
                            </div>
                        </div>`,
            }).open(false);
        },
        done: function() {
            eclipse.popup.create({
              content: `<div class="popup">
                            <div class="block">
                                <center>
                                    <div class="row"><i onclick="eclipse.methods.welcome.skin()" class="icon icon-back color-black popup-close" style="position: absolute; height: 42px; cursor: pointer;padding-top:15px" id="restoreBack"></i><h1 style="color:#333;margin:0;width:100%;font-size:42px">Setup Complete!</h1></div>
                                    <p>Eclipse has been set up successfully! To start adding ROMs, tap the <b><code>+</code></b> button on the top-right corner of Eclipse.</p>
                                    <p><i>Please note that Eclipse does not condone the use of piracy repos or ROMs, as it is a violation of copyright law. Make sure you own and extracted the games you are adding to Eclipse youself, and that repos have ROMs served from a source such as a home server or are storing homebrew games under license.</i></p>
                                    <br><a href="#" class="button active button-big button-round gradient popup-close" style="box-shadow: 0 5px 13px 0 rgba(0, 0, 0, .1); border:none; font-weight:bold;">Go To Main Menu</a>
                                    <br>
                                </center>
                            </div>
                        </div>`,
            }).open(false);
        },
        restore: function() {
            eclipse.popup.create({
              content: `<div class="popup">
                            <div class="block">
                                <div class="block" style="margin-top: 0">
                                    <center class="">
                                        <div class="row"><i onclick="eclipse.methods.welcome.new(false)" class="icon icon-back color-black popup-close" style="position: absolute; height: 42px; cursor: pointer;padding-top:15px" id="restoreBack"></i><h1 style="color:#333;margin:0;width:100%;font-size:42px">Restore from Backup</h1></div>

                                        <p>Eclipse can be restored from both iGBA and Eclipse backups.</p>
                                        <p>Please upload your <code>.eclipse</code> or <code>.igba</code> file to complete the restore. iGBA repos will not be saved, but all games and their save data will persist.</p>
                                        <p><i>Reminder: To export your state file, go to iGBA or Eclipse's Settings, then Save Backup (or Save State), and then upload the generated file here.</i>
                                        </p>
                                    </center>
                                </div>
                                <div class="list" style="background:rgba(250,250,250,0.8)">
                                    <ul>
                                        <li id="onlineLI" onclick="document.getElementById('fileURLContainer').style.display = 'block'; document.getElementById('localFileContainer').style.display = 'none'; document.getElementById('dataContainer').style.display = 'none'; fWL = 0;" class="">
                                            <label class="item-radio item-content">
                                                <input type="radio" name="fW" value="Online" checked="checked"> <i class="icon icon-radio"></i>
                                                <div class="item-inner">
                                                    <div class="item-title">Online</div>
                                                </div>
                                            </label>
                                        </li>
                                        <li onclick="document.getElementById('fileURLContainer').style.display = 'none'; document.getElementById('localFileContainer').style.display = 'block'; document.getElementById('dataContainer').style.display = 'none'; fWL = 1;" class="">
                                            <label class="item-radio item-content">
                                                <input type="radio" value="Local" name="fW"> <i class="icon icon-radio"></i>
                                                <div class="item-inner">
                                                    <div class="item-title">Local</div>
                                                </div>
                                            </label>
                                        </li>
                                        <li class="" onclick="document.getElementById('fileURLContainer').style.display = 'none'; document.getElementById('localFileContainer').style.display = 'none'; document.getElementById('dataContainer').style.display = 'block'; fWL = 2;">
                                            <label class="item-radio item-content">
                                                <input value="Manual" name="fW" type="radio"> <i class="icon icon-radio"></i>
                                                <div class="item-inner">
                                                    <div class="item-title">Manually</div>
                                                </div>
                                            </label>
                                        </li>
                                    </ul>
                                </div>
                                <div class="block">
                                    <center>
                                        <div class="content-block" style="margin-left: 3%; margin-right: 3%;">
                                            <div id="fileURLContainer" style="background-color: rgb(241, 241, 241); box-shadow: rgba(0, 0, 0, 0.247059) 0px 0px 5px; border-top-left-radius: 10px; border-top-right-radius: 10px; border-bottom-right-radius: 10px; border-bottom-left-radius: 10px; padding: 8px; position: relative; display: block;" class="">
                                                <input id="fileURL" placeholder="URL to State File" style="border-radius:50px;background:transparent;border:none;width:100%;position:relative;text-align:center;" class="">
                                            </div>
                                            <div id="localFileContainer" style="background-color: rgb(241, 241, 241); box-shadow: rgba(0, 0, 0, 0.247059) 0px 0px 5px; border-top-left-radius: 10px; border-top-right-radius: 10px; border-bottom-right-radius: 10px; border-bottom-left-radius: 10px; padding: 8px; position: relative; display: none;" class="">
                                                <input id="localFile" style="border-radius:50px;background:transparent;border:none;width:100%;position:relative;text-align:center;" type="file" class="">
                                            </div>
                                            <div style="display: none;" id="dataContainer">
                                                <textarea id="manualDataTextArea" placeholder="Paste data here" style="background-color: rgb(241, 241, 241); box-shadow: white 0px 0px 5px; border-radius: 10px; padding: 15px; position: relative; width: 100%"></textarea>
                                                <!--<br><select id="eclipseorigbaselect" class="input-with-value" style="background-color: rgb(241, 241, 241); box-shadow: rgba(0, 0, 0, 0.247059) 0px 0px 5px; border-radius: 10px; padding: 15px; position: relative; display: block; width: 100%">          <option class="" disabled="" value="Type">Type</option><option value="Eclipse">Eclipse</option><option value="iGBA">iGBA</option>          </select>-->
                                            </div>
                                            <br><a href="#" onclick="setCookie('isRestore', '2');if(fWL == 0){load_Eclipse_storage_file(null, document.getElementById('fileURL').value)}else{load_Eclipse_storage_file(1, null)}" class="button active button-big button-round gradient" style="box-shadow: 0 5px 13px 0 rgba(0, 0, 0, .1); border:none; font-weight:bold; color: white;" id="loadStateButton">LOAD</a>
                                        </div>
                                    </center>
                                </div>
                            </div>
                        </div>`,
            }).open(false);
        },
        update: function() {
            eclipse.popup.create({
              content: `<div class="popup">
                            <div class="block">
                                <center>
                                    <div class="row"><h1 style="color:#333;margin:0;width:100%;font-size:42px">Eclipse has Updated to 2.0.0!</h1></div>
                                    <p>Eclipse has undergone a major update and with that, some changes. Here are some things that have changed:</p>
                                </center>
                                    <ul>
                                        <li>Eclipse was <b>rewritten</b> from the ground up, <b>optimizing it and fixing bugs</b> in the process.</li>
                                        <li>A <b>new UI</b> has been implemented, making Eclipse more intuitive to use.</li>
                                        <li>Introducing <b>OpenSkin 2.0.0</b>, which allows for more capable skins.</li>
                                        <li>Eclipse will now <b>attempt to find box art</b> for games you add.</li>
                                        <li><b>Tapping a game now opens it immediately</b>. To edit its entry, either hold on it or right-click it.</li>
                                        <li>When editing a game's entry, you can now <b>upload box art</b> from your device.</li>
                                    </ul>
                                <center>
                                    <p>We have spent a long time preparing this update for you, and we hope you enjoy it as much as, if not more than, the previous version. Enjoy!</p>
                                    <br><a href="#" class="button active button-big button-round gradient popup-close" style="box-shadow: 0 5px 13px 0 rgba(0, 0, 0, .1); border:none; font-weight:bold;">Go To Main Menu</a>
                                    <br>
                                </center>
                            </div>
                        </div>`,
            }).open();
        },
        setDisplay: {
            fit: function() {
                document.querySelector("#fit").className = "button button-active";
                document.querySelector("#stretch").className = "button";
                localStorage.setItem('fillScreen', 'false');
                document.querySelector("#fillPreview").src = "assets/img/fit/fit.png";
            },
            stretch: function() {
                document.querySelector("#stretch").className = "button button-active";
                document.querySelector("#fit").className = "button";
                localStorage.setItem('fillScreen', 'true');
                document.querySelector("#fillPreview").src = "assets/img/fit/stretch.png";
            }
        },
    },

    toggle: {
        autoSave: function() {
            var autoSave = localStorage.getItem('autoSave');
            if (autoSave == "false") {
              localStorage.setItem('autoSave', "true");
            } else {
              localStorage.setItem('autoSave', "false");
            }
        },
        audio: function() {
            var audioStatus = localStorage.getItem('audioStatus');
            if (audioStatus == "false") {
              localStorage.setItem('audioStatus', "true");
            } else {
              localStorage.setItem('audioStatus', "false");
            }
        },
        fillScreen: function() {
            var fillScreen = localStorage.getItem('fillScreen');
            if (fillScreen == "false") {
              localStorage.setItem('fillScreen', "true");
            } else {
              localStorage.setItem('fillScreen', "false");
            }
        },
        desktopMode: function() {
            var desktopMode = localStorage.getItem('desktopMode');
            if (desktopMode == "false") {
              localStorage.desktopMode = "true";
            } else {
              localStorage.desktopMode = "false";
            }
            OpenSkin.load() // Refresh skin to apply.
        },
        configDesktop: function() {
            var isMobile = {
                Android: function() {
                  return navigator.userAgent.match(/Android/i);
                },
                BlackBerry: function() {
                  return navigator.userAgent.match(/BlackBerry/i);
                },
                iOS: function() {
                  return navigator.userAgent.match(/iPhone|iPad|iPod/i);
                },
                Opera: function() {
                  return navigator.userAgent.match(/Opera Mini/i);
                },
                Windows: function() {
                  return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
                },
                any: function() {
                  return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
                }
            }
            var isiOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
            if (isMobile.any() || isiOS) {
            localStorage.desktopMode = "false";
            } else {
            localStorage.desktopMode = "true";
            }
        }
    },

    // Emus

    resizeScreen: function(id, child, scale) {
      var container = document.getElementById(id);
      var containerHeight = container.clientHeight || container.offsetHeight || 0;
      var containerWidth = container.clientWidth || container.offsetWidth || 0;
      if (containerHeight > 0 && containerWidth > 0) {
        var canvas = document.getElementById(child);
        var maxWidth = Math.floor(containerHeight * scale);
        var maxHeight = Math.floor(containerWidth / scale);
        var height = Math.min(maxHeight, containerHeight);
        var width = Math.min(maxWidth, containerWidth);
        if (localStorage.getItem('fillScreen') == 'false') {
          canvas.style.width = width + "px";
          canvas.style.height = height + "px";
          canvas.style.top = "0px"
          canvas.style.bottom = "0px"
          canvas.style.left = "0px"
          canvas.style.right = "0px"
          canvas.style.position = "absolute"
        } else {
          canvas.style.width = containerWidth + "px";
          canvas.style.height = containerHeight + "px";
          canvas.style.top = "0px"
          canvas.style.bottom = "0px"
          canvas.style.left = "0px"
          canvas.style.right = "0px"
          canvas.style.position = "absolute"
        }
      }
    },

    gba: {
      toggleAudio: function() {
        var audioStatus = localStorage.getItem('audioStatus');
        if (audioStatus == "false") {
          localStorage.setItem('audioStatus', "true");
          Iodine.enableAudio();
        } else {
          localStorage.setItem('audioStatus', "false");
          Iodine.disableAudio();
        }
      },
      setSpeed: function() {
        eclipse.dialog.create({
          title: 'Eclipse',
          text: 'Change Emulation Speed',
          buttons: [{
              text: 'Normal',
              onClick: function() {
                Iodine.setSpeed(1);
              },
            },
            {
              text: 'Fast Forward',
              onClick: function() {
                Iodine.setSpeed(2);
              },
            },
          ],
          verticalButtons: true,
        }).open();
      },
      setSpeed: function() {
        eclipse.dialog.create({
          title: 'Eclipse',
          text: 'Change Emulation Speed',
          buttons: [{
              text: 'Normal',
              onClick: function() {
                Iodine.setSpeed(1);
              },
            },
            {
              text: 'Fast Forward',
              onClick: function() {
                Iodine.setSpeed(2);
              },
            },
          ],
          verticalButtons: true,
        }).open();
      },
      openEmulationMenu: function(menu) {
        var emulationMenu = eclipse.actions.create({
          grid: true,
          buttons: [
            [{
                text: 'Toggle Audio',
                onClick: function() {
                  eclipse.methods.gba.toggleAudio();
                },
                icon: '<i class="icon f7-icons ios-only color-black">volume_fill</i><i class="icon material-icons md-only">volume_up</i>'
              },
              {
                text: 'Speed',
                onClick: function() {
                  eclipse.methods.gba.setSpeed();
                },
                icon: '<i class="icon f7-icons ios-only color-black">fastforward_round_fill</i><i class="icon material-icons md-only">fast_forward</i>'
              },
              {
                text: 'Fix Controls',
                onClick: function() {
                  eclipse.methods.loadControls({
                    up: 38,
                    down: 40,
                    left: 37,
                    right: 39,
                    start: 13,
                    select: 16,
                    a: 88,
                    b: 90,
                    l: 49,
                    r: 50,
                  });
                },
                icon: '<i class="icon material-icons ios-only color-black">videogame_asset</i><i class="icon material-icons md-only">videogame_asset</i>'
              },
            ],
            [{
                text: 'Save Progress',
                onClick: function() {
                  Iodine.exportSave();
                  eclipse.dialog.alert('Progress Saved');
                },
                icon: '<i class="icon f7-icons ios-only color-black">folder_fill</i><i class="icon material-icons md-only">save</i>'
              },
              {
                text: 'Close Emulator',
                onClick: function() {
                  Iodine.exportSave();
                  Iodine.stop();
                  eclipse.methods.unloadScript("assets/js/cores/IodineGBA/XAudioJS/swfobject.js");
                  eclipse.methods.unloadScript("assets/js/cores/IodineGBA/XAudioJS/resampler.js");
                  eclipse.methods.unloadScript("assets/js/cores/IodineGBA/XAudioJS/XAudioServer.js");
                  eclipse.methods.unloadScript("assets/js/cores/gba.js");
                  eclipse.popup.close();
                },
                icon: '<i class="icon f7-icons ios-only color-black">close_round_fill</i><i class="icon material-icons md-only">close</i>'
              },
            ]
          ]
        });
        emulationMenu.open();
      },
    },
    gbc: {
      openEmulationMenu: function(menu) {
        var emulationMenu = eclipse.actions.create({
          grid: true,
          buttons: [
            [{
                text: 'Toggle Audio',
                onClick: function() {
                  gbEmu.toggleAudio();
                },
                icon: '<i class="icon f7-icons ios-only color-black">volume_fill</i><i class="icon material-icons md-only">volume_up</i>'
              },
              {
                text: 'Speed',
                onClick: function() {
                  gbEmu.setSpeed();
                },
                icon: '<i class="icon f7-icons ios-only color-black">fastforward_round_fill</i><i class="icon material-icons md-only">fast_forward</i>'
              },
              {
                text: 'Fix Controls',
                onClick: function() {
                  eclipse.methods.loadControls({
                    up: 38,
                    down: 40,
                    left: 37,
                    right: 39,
                    start: 13,
                    select: 16,
                    a: 88,
                    b: 90,
                    l: 49,
                    r: 50,
                  });
                },
                icon: '<i class="icon material-icons ios-only color-black">videogame_asset</i><i class="icon material-icons md-only">videogame_asset</i>'
              },
            ],
            [{
                text: 'Save Progress',
                onClick: function() {
                  gbEmu.saveGame();
                  eclipse.dialog.alert('Progress Saved');
                },
                icon: '<i class="icon f7-icons ios-only color-black">folder_fill</i><i class="icon material-icons md-only">save</i>'
              },
              {
                text: 'Close Emulator',
                onClick: function() {
                  gbEmu.saveGame();
                  gbEmu.stop();
                  eclipse.popup.close();
                  eclipse.methods.loadScript("assets/js/cores/gbc.js");
                  eclipse.methods.loadScript("assets/js/cores/GameBoy-Online/js/other/XAudioServer.js");
                },
                icon: '<i class="icon f7-icons ios-only color-black">close_round_fill</i><i class="icon material-icons md-only">close</i>'
              },
            ]
          ]
        });
        emulationMenu.open();
      },
    },
  },
  routes: [
    // Index page
    {
      path: '/',
      url: './index.html',
      name: 'home',
      on: {
        pageInit: function() {
          var gamesList = games.list();
          var library = "";
          var libraryRows = gamesList.length % 5;
          var emptySlots = 5 - libraryRows;
          if (gamesList.length > 0) {
            document.querySelector('.no-games').style = "display:none;";
            for (i = 0; i < gamesList.length; i++) {
              var game = JSON.parse(gamesList[i]);
              library += '<div class="col-50 tablet-20">' +
                '<a href="/' + game.system.toLowerCase() + '/?url=' + game.link + '" class="game-card" data-index="' + i + '" data-url="' + game.link + '" data-url="' + game.link + '" data-name="' + game.name + '">' +
                '<div class="card">' +
                '<div class="card-content">' +
                '<div class="game-card-boxart" style="background-image: url(\'' + game.boxart + '\');">' +
                '</div>' +
                '</div>' +
                '<div class="card-footer"><div class="card-footer-inner-text">' + game.name + '</div></div>' +
                '</div>' +
                '</a>' +
                '</div>';
            }
            for (var ii = 0; ii < emptySlots; ii++) {
              library += "<div class=\"col-50 tablet-20\"></div>";
            }
            document.querySelector('.games').innerHTML = '<div class="row">' + library + '</div>';
          } else {
            console.print('There are no games!');
          }
          $$('.game-card').on('taphold contextmenu', function(ev) {
            ev.preventDefault();
            eclipse.methods.games.manageGamePopup($(this).attr('data-index'), $(this).attr('data-name'));
            return false;
          });

        },
      },
    },

    // Repos

    {
      path: '/repos/',
      url: './pages/repos.html',
      name: 'repos',
      on: {
        pageBeforeIn: function() {
          eclipse.methods.repos.listFeatured();
          eclipse.methods.repos.list();
        },
      },
    },

    {
      path: '/repo/',
      url: './pages/repo.html',
      name: 'repo',
      on: {
        pageBeforeIn: function() {
          var page_index = eclipse.views[0].history.length - 1;
          var fw7_url = eclipse.views[0].history[page_index];
          var url = fw7_url.replace('/repo/?url=', '');
          var json = url.getJSON();
          document.getElementById("repoNameNavbar").innerHTML = json.reponame.patch();
          document.getElementById("repoName").innerHTML = json.reponame.patch();
          document.getElementById("repoAuthor").innerHTML = json.repoauthor.patch();
          document.getElementById("repoLogo").src = json.repologo.patch();
          if (json.repodesc != null) {
            document.getElementById("repoDesc").style.display = "block";
            document.getElementById("repoDesc").innerHTML = json.repodesc.patch();
          } else {
            document.getElementById("repoDesc").style.display = "none";
            document.getElementById("repoDesc").innerHTML = "\x00";
          }
          var categories = json.categories;
          if (categories.length > 0) {
            var categoriesList = "";
            for (var i = 0; i < categories.length; i++) {
              categoriesList += '<li class="item-divider">' + categories[i].categoryname.patch() + '</li>';
              for (var ii = 0; ii < categories[i].games.length; ii++) {
                categoriesList += '<li>' +
                  '<a href="#" onclick="eclipse.methods.games.addGame(\'' + categories[i].games[ii].name.patch() + '\', \'' + categories[i].games[ii].boxart.patch() + '\', \'' + categories[i].games[ii].link.patch() + '\', \'' + categories[i].games[ii].system.patch() + '\')" class="item-link item-content">' +
                  '<div class="item-media"><img src="' + categories[i].games[ii].boxart.patch() + '" width="44px" style="border-radius:3px;"/></div>' +
                  '<div class="item-inner">' +
                  '<div class="item-title">' +
                  '<span>' + categories[i].games[ii].name.patch() + '</span>' +
                  '<div class="item-footer">' + categories[i].games[ii].system.patch() + '</div>' +
                  '</div>' +
                  '</div>' +
                  '</a>' +
                  '</li>';
              }
              document.getElementById("categories").innerHTML = categoriesList;
            }
          } else {
            emptyList = "<div class=\"block\"><center><h1 style=\"color:#333;\">No ROMs!</h1><h2>The maintainer of this repo hasn't added any ROMs yet.</h2></center></div>"
            document.getElementById("categories").innerHTML = emptyList;
          }
        },
      },
      async (routeTo, routeFrom, resolve, reject) {

      },
    },

    // Settings

    {
      path: '/settings/',
      url: './pages/settings.html',
      name: 'settings',
      on: {
        pageBeforeIn: function() {
          if (!localStorage.autoSave) {
            document.getElementById("autoSaveSwitch").checked = true;
            localStorage.autoSave = "true";
          } else if (localStorage.autoSave == "true") {
            document.getElementById("autoSaveSwitch").checked = true;
          } else {
            document.getElementById("autoSaveSwitch").checked = false;
          }
          if (!localStorage.audioStatus) {
            document.getElementById("audioStatusSwitch").checked = true;
            localStorage.audioStatus = "true";
          } else if (localStorage.audioStatus == "true") {
            document.getElementById("audioStatusSwitch").checked = true;
          } else {
            document.getElementById("audioStatusSwitch").checked = false;
          }
          if (!localStorage.fillScreen) {
            document.getElementById("fillScreenSwitch").checked = false;
            localStorage.fillScreen = "false";
          } else if (localStorage.fillScreen == "true") {
            document.getElementById("fillScreenSwitch").checked = true;
          } else {
            document.getElementById("fillScreenSwitch").checked = false;
          }
          try {
            if (!localStorage.desktopMode) {
              document.getElementById("desktopModeSwitch").checked = false;
              localStorage.desktopMode = "false";
            } else if (localStorage.desktopMode == "true") {
              document.getElementById("desktopModeSwitch").checked = true;
            } else {
              document.getElementById("desktopModeSwitch").checked = false;
            }
          } catch (err) {
            eclipse.error("Desktop Mode cannot be initialized. This is probably a caching issue.")
          }
          document.getElementById("currentEclipseVersion").innerHTML = currentVersion;
        }
      },
    },

    {
      path: '/settings/update/',
      url: './pages/settings/update.html',
      name: 'update',
      on: {
        pageInit: function() {
          if (currentVersion != latest.version) {
            document.querySelector('#update').innerHTML = '<div>' +
              '<div class="block block-strong tablet-inset">' +
              '<img src="assets/img/f7-icon-square.png" style="width: 60px; height: 60px; vertical-align: top; float: left; border-radius:21.3%;">' +
              '<p style="margin: 0; margin-left: 8px;">' +
              '<span style="font-weight: bold; font-size: 16px; margin-left: 8px">Eclipse ' + latest.version + '<br></span>' +
              '<span style="font-size: 14px; margin-left: 8px">Zenith Devs<br></span>' +
              '<span style="font-size: 13px; margin-left: 8px">Downloaded</span>' +
              '</p>' +
              '<p>' + latest.changelog + '</p>' +
              '</div>' +
              '</div>' +
              '<div class="list tablet-inset">' +
              '<ul>' +
              '<li class="item-button">' +
              '<a href="#" class="update-button">' +
              '<div class="item-content">' +
              '<div class="item-inner">' +
              '<div class="item-title">Install Now</div>' +
              '</div>' +
              '</div>' +
              '</a>' +
              '</li>' +
              '</ul>' +
              '</div>';
          }
        }
      },
    },

    {
      path: '/settings/controls/',
      url: './pages/settings/controls.html',
      name: 'controls',
      on: {
        pageInit: function() {

        }
      },
    },
    // Skins
    {
      path: '/skins/',
      url: './pages/skins.html',
      name: 'skins',
      on: {
        pageInit: function() {
          eclipse.preloader.show()
        },
        pageAfterIn: function() {

          console.print("Loading skins...");

          // List current skins
          eclipse.methods.skins.fetchInstalledSkins();

          // Featured skins
          eclipse.methods.skins.listFeaturedSkins();

          // Make visible
          document.querySelectorAll(".page-content")[1].style.opacity = "1";
          eclipse.preloader.hide()
        }
      },
    },

    {
      path: '/eclipse-sync/',
      async (routeTo, routeFrom, resolve, reject) {
        if (localStorage.getItem('eclipse-sync') === null) {
          resolve({
            loginScreen: {
              url: './pages/login.html'
            },
          });
        } else {
          resolve({
            url: 'secured-page.html',
          });
        }
      },
    },

    {
      path: '/settings/storage/',
      url: './pages/settings/storage.html',
      name: 'storage',
      on: {
        pageInit: function() {
          var percentUsed;
          var usageInMib;
          var quotaInMib;
          eclipse.methods.storage.wrapper().then(function(estimate) {
            percentUsed = Math.round(estimate.usage / estimate.quota * 100);
            percentHundreths = Math.round(100 * (estimate.usage / estimate.quota * 100)) / 100
            usageInMib = Math.round((estimate.usage / (1024 * 1024)) * 100) / 100;
            quotaInMib = Math.round((estimate.quota / (1024 * 1024)) * 100) / 100;
            document.getElementById("quotaUsed").innerHTML = usageInMib;
            document.getElementById("quotaTotal").innerHTML = quotaInMib;
            document.getElementById("progressBar").style.width = percentUsed + "%";
            document.getElementById("quotaPercent").innerHTML = percentHundreths;

            if (document.getElementById("quotaTotal").innerHTML == "NaN") {
              document.getElementById("quotaLabel").innerHTML = "Storage information cannot be loaded. Please ensure that your browser is loading content over HTTPS.";
            }

          });
          if (navigator.userAgent.toLowerCase().search(/(chrome|android)/i) == -1 && navigator.userAgent.toLowerCase().search(/safari/i) != -1) {
            document.getElementById("safariStorageNotice").style.display = "inline";
          }
        }
      },
    },
    {
      path: '/settings/credits/',
      url: './pages/settings/credits.html',
      name: 'credits',
    },
    {
      path: '/settings/donate/',
      url: './pages/settings/donate.html',
      name: 'donate',
    },

    // Emulator Popups

    {
      path: '/gbc/',
      popup: {
        url: './pages/emus/gbc.html',
      },
      async (routeTo, routeFrom, resolve, reject) {
        eclipse.methods.loadScript("assets/js/cores/gbc.js");
        eclipse.methods.loadScript("assets/js/cores/GameBoy-Online/js/other/XAudioServer.js");
        setTimeout(function() {
          eclipse.methods.loadControls({
            up: 38,
            down: 40,
            left: 37,
            right: 39,
            start: 13,
            select: 16,
            a: 88,
            b: 90,
          });
          $(window).resize(function() {
            eclipse.methods.resizeScreen('gbScreenContainer', 'mainCanvas', 1.3);
          }).resize();
          gbEmu.initEmu();
          gbEmu.loadROMURL("https://php.eclipseemu.me/dl/dl.php?dl=" + routeTo.url.replace('/gbc/?url=', ''));
        }, 500);
      },
    },

    {
      path: '/gb/',
      popup: {
        url: './pages/emus/gb.html',
      },
      async (routeTo, routeFrom, resolve, reject) {
        eclipse.methods.loadScript("assets/js/cores/gbc.js");
        eclipse.methods.loadScript("assets/js/cores/GameBoy-Online/js/other/XAudioServer.js");
        setTimeout(function() {
          eclipse.methods.loadControls({
            up: 38,
            down: 40,
            left: 37,
            right: 39,
            start: 13,
            select: 16,
            a: 88,
            b: 90,
          });
          $(window).resize(function() {
            eclipse.methods.resizeScreen('gbScreenContainer', 'mainCanvas', 1.3);
          }).resize();
          gbEmu.initEmu();
          gbEmu.loadROMURL("https://php.eclipseemu.me/dl/dl.php?dl=" + routeTo.url.replace('/gb/?url=', ''));
        }, 500);
      },
    },

    {
      path: '/gba/',
      popup: {
        url: './pages/emus/gba.html',
      },
      async (routeTo, routeFrom, resolve, reject) {
        eclipse.methods.loadScript("assets/js/cores/IodineGBA/XAudioJS/swfobject.js");
        eclipse.methods.loadScript("assets/js/cores/IodineGBA/XAudioJS/resampler.js");
        eclipse.methods.loadScript("assets/js/cores/IodineGBA/XAudioJS/XAudioServer.js");
        eclipse.methods.loadScript("assets/js/cores/gba.js");
        setTimeout(function() {
          eclipse.methods.loadControls({
            up: 38,
            down: 40,
            left: 37,
            right: 39,
            start: 13,
            select: 16,
            a: 88,
            b: 90,
            l: 49,
            r: 50,
          });
          $(window).resize(function() {
            eclipse.methods.resizeScreen('gbaScreenContainer', 'gbaScreen', 1.5);
          }).resize();
          loadIodineCoreGlue(routeTo.query.url);
        }, 500);
      },
    },

    // 404 Page
    {
      path: '(.*)',
      url: './pages/404.html',
    },
  ],
});

if(localStorage.getItem("setup") == null || localStorage.getItem("setup") == undefined) {
    eclipse.methods.toggle.configDesktop();
    eclipse.methods.welcome.new();
} else if(localStorage.getItem("setup") == "done") {
    eclipse.methods.welcome.update();
}
localStorage.setItem("setup", currentVersion);
