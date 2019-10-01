function DiscordLink() {

    this.about = "DiscordLink: Linking DiscordRPC and the Web. (c) Shuga";

    this.platform = "na";

    this.game = "No Game Playing";

    this.log = function(str) {
        console.logOrg('%c[DiscordLink] %c' + str, "color:#7289da", "color: grey");
        eclipse.methods.debug.console.createObj("[DiscordLink] " + str,"#7289da");
    }

    this.set = function(platform,game) {
        platform = platform.toLowerCase();
        if(platform == "na" || platform == "idle") {
            this.log("Idle.")
            game = "No Game Playing"
            // document.querySelector(".statusbar, .statusbar-dark").className = "statusbar"
            document.querySelector(".statusbar, .statusbar-dark").setAttribute('style', '');
            if(eclipse.device.iphoneX == true && Boolean(document.getElementById("popupCorrectionX"))) {
                document.getElementById("popupCorrectionX").parentElement.removeChild(document.getElementById("popupCorrectionX"));
            }
            try {
                sendGameInfo(game, "na"); // Dispatch data to Electron
            } catch(err) {}
        } else {
            this.log("Playing " + expandPlatform(platform) + " game: " + game.unpatch());
            // document.querySelector(".statusbar, .statusbar-dark").className = "statusbar statusbar-dark"
            document.querySelector(".statusbar, .statusbar-dark").setAttribute('style', 'background:#000000!important');
            if(eclipse.device.iphoneX == true) {
                var iXStyle = document.createElement("style");
                iXStyle.id = "popupCorrectionX";
                iXStyle.innerHTML = ".statusbar {height:50px!important}";
                document.head.appendChild(iXStyle);
            }
            try {
                sendGameInfo(game, platform.toUpperCase()); // Dispatch data to Electron
            } catch(err) {}
        }

        this.platform = platform;
        this.game = game;
    }

}

var DiscordLink = new DiscordLink();

DiscordLink.set("na");

if(typeof sendGameInfo == "undefined") {
    DiscordLink.log("You are not using Eclipse inside of the Electron wrapper, so DiscordRPC support will not be provided.");
} else {
    DiscordLink.log("DiscordLink is active and linked with the Electron wrapper!");
}