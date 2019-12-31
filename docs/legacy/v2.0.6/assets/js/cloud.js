/* cloud.js (c) HeyItsShuga. Licensed under Apache 2.0.

The use of the given API keys are forbidden and will not properly work outside of Zenith-controlled domains.

Google Drive: Code from Google, Inc. has been used. Code adapted to make programatic access easier.
Google Drive support requires https://apis.google.com/js/api.js to be loaded.

Dropbox: Uses the Dropbox Chooser API as the main implementation.
*/

function GoogleDrive() {
  this.init = function() {
    console.logOrg('%c[Cloud] %cInitializing Google Drive...', "color:#00a2ff", "color: grey");
    eclipse.methods.debug.console.createObj("[Cloud] Initializing Google Drive...","#00a2ff");

    gapi.load('client:auth2', this.initClient);

    console.logOrg('%c[Cloud] %cGoogle Drive initialized successfully!', "color:#00a2ff", "color: grey");
    eclipse.methods.debug.console.createObj("[Cloud] Google Drive initialized successfully!","#00a2ff");
  }
  this.initClient = function() {
    var CLIENT_ID = '669073905466-thn1ff4ctf5u6sf6i2reviboml7endl2.apps.googleusercontent.com';
    var API_KEY = 'AIzaSyCPMXbxB7hXw9UJ9IWpg_oEMBrD0byLvXg';
    var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/drive/v3/rest"];
    var SCOPES = 'https://www.googleapis.com/auth/drive.readonly https://www.googleapis.com/auth/drive.appfolder ';
    gapi.client.init({
      apiKey: API_KEY,
      clientId: CLIENT_ID,
      discoveryDocs: DISCOVERY_DOCS,
      scope: SCOPES
    })

  }
  this.signin = function(reloadSyncPage) {
    gapi.auth2.getAuthInstance().signIn();
  }
  this.signout = function(reloadSyncPage) {
    gapi.auth2.getAuthInstance().signOut();
  }
  this.getSigninStatus = function() {
    return gapi.auth2.getAuthInstance().isSignedIn.get();
  }
  this.files = [];
  this.getFiles = function() {
    eclipse.preloader.show()
    GoogleDrive.files = [];
    gapi.client.drive.files.list({
      'pageSize': 1000, // this exists
      q: 'name contains "gb" or name contains "gbc" or name contains "gba" or name contains "nes" or name contains "smc" or name contains "sfc" or name contains "sms" or name contains "gg"',
      'fields': "nextPageToken, files(id, name, iconLink, webContentLink)"
    }).then(function(response) {
      var files = response.result.files;
      if (files && files.length > 0) {
        for (var i = 0; i < files.length; i++) {
          var file = files[i];
          if(
            (file.name.indexOf(".gb") != -1) ||
            (file.name.indexOf(".gbc") != -1) ||
            (file.name.indexOf(".gba") != -1) ||
            (file.name.indexOf(".nes") != -1) ||
            (file.name.indexOf(".smc") != -1) ||
            (file.name.indexOf(".sfc") != -1) ||
            (file.name.indexOf(".sms") != -1) ||
            (file.name.indexOf(".gg") != -1)
            ) {
            // This will only add ROMs to the list.
            GoogleDrive.files.push(
              {
                "name": file.name,
                "id": file.id,
                "link": "https://www.googleapis.com/drive/v3/files/" + file.id + "?alt=media",
                "icon": file.iconLink
              }
            );
          } else {
          // do nothing.
          }
        }
        eclipse.preloader.hide();
        return GoogleDrive.files;
      } else {
        eclipse.preloader.hide();
        return GoogleDrive.files;
      }
    });
  }
  this.isGoodDomain = Boolean(window.location.host == "eclipseemu.me" || window.location.host == "beta.eclipseemu.me");
  this.enforceGoodDomain = function() {
    if(this.isGoodDomain == false) {
      var noCloudStyle = document.createElement("style");
      noCloudStyle.id = "noDrive";
      noCloudStyle.innerHTML = ".needsDrive {opacity: 0.5;cursor:default;pointer-events: none}"
      document.head.appendChild(noCloudStyle);
    }
  }
}

function DropboxHelper() {
    this.options = {
        success: function(files) {
            eclipse.methods.games.addGameURL(files[0].link, false);
            console.log("Added Dropbox link: " + files[0].link);
            // Werid fix for some weird F7 bug.
            window.setTimeout(()=>{eclipse.methods.reload_view("/settings/games/?title=Search");window.setTimeout(()=>{eclipse.router.back("/",{animate:false})},100)},200);
        },
        linkType: "direct",
        multiselect: false,
        extensions: ['.gb', '.gbc', '.gba', '.nes', '.smc', '.sfc', '.sms', '.gg'],
        folderselect: false,
    }
    this.launch = function() {
        Dropbox.choose(this.options);
    }
}

var DropboxHelper = new DropboxHelper();
var GoogleDrive = new GoogleDrive();
