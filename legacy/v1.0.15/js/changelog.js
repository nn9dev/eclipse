  var $_GET = {};
      /*if(changelogLinkHREF.toString().indexOf('?') !== -1) {
      var query = changelogLinkHREF.toString().replace(/^.*?\?/, '').replace(/#.*$/, '').split('&');

       for(var i=0, l=query.length; i<l; i++) {
        var aux = decodeURIComponent(query[i]).split('=');
        $_GET[aux[0]] = aux[1];
       }
      }*/
      $_GET['version'] = currentVersion;
      $_GET['latestVersion'] = latestVersion;
      if ($_GET['version']) { var gv = $_GET['version'].replace(">", "&gt;").replace("<", "&lt;"); } else { var gv = "Error" }
      var echo;
      var nope = 0;
      var description;

      var intFriendlyGV = gv.replace(/\n/g, "").replace(/\./g, "");
      intFriendlyLatestVersion = latestVersion.replace(/\n/g, "").replace(/\./g, "");

      if ($_GET['latestVersion']) {
        latestVersion = $_GET['latestVersion'].replace(">", "&gt;").replace("<", "&lt;");
      }

      function display(desc) {
        echo = '<style>.remove-after:after {content: none !important;}</style><div class="list"><ul><li class="item-inner" style="position:relative;padding:0"><div class="item-content"><div class="item-media"><img src="//eclipseemu.me/play/img/icons/icon_mobFull.png" style="border-radius:22px;" width="44"></div><div class="item-inner remove-after"><div class="item-title">Eclipse '+latestVersion+'</div></div></div></li><li><div style="padding: 15px 15px 15px 15px;">' + desc + '</div></li></ul></div>';
      }

      function compLatest(str){ if (latestVersion == str || latestVersion == str + "\n") { return true } else { return false } }

      // Changelog Entries
      if (compLatest("1.0.13")) {
        description = "Bug fixes";
      } else {
        echo = '<div class="list"><ul><li><div class="item-content"><div class="item-media"><img src="//eclipseemu.me/play/img/icons/icon_mobFull.png" style="border-radius:22px;" width="44"></div><div class="item-inner"><div class="item-title">Eclipse ' + latestVersion + '</div></div></div></li></ul></div><center><div class="content-block">No information.</div></center>';
        nope = 1;
      }

      if (!$_GET['version']) {
        echo = "Error";
      } else {
        gv = $_GET['version'].replace(">", "&gt;").replace("<", "&lt;");
      }

      /*if (!$_GET['uncache']) {
        echo = "Error";
        console.error("File is cached.");
      } // uncache is no longer needed */

      if (nope == 0) {
        display(description);
      }

      if (!$_GET['latestVersion']) {
        echo = "Error";
      }

      if (parseInt(intFriendlyGV) > parseInt(intFriendlyLatestVersion)) {
        echo = '<div class="list"><ul><li><div class="item-content"><div class="item-media"><img src="//eclipseemu.me/play/img/icons/icon_mobFull.png" style="border-radius:22px;" width="44"></div><div class="item-inner"><div class="item-title">Eclipse ' + gv + '</div></div></div></li></ul></div><center><div class="content-block">No information.</div></center>';
      }

      if (document.getElementById('changelogPageContent')) {
        document.getElementById('changelogPageContent').innerHTML = echo;
      }
