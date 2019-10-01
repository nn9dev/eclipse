var stageOne = eclipse.popup.create({
    content:'<div class="popup onboarding">' +
            '<div class="page-content">' +
            '<div class="block">' +
            '<center>' +
               '<img src="img/icons/icon_mobFull.png" style="box-shadow: 0 5px 13px 0 rgba(0, 0, 0, .1);border-radius: 21%;width:150px;height:150px">' +
               '<h1 style="color:#333;font-weight:200;font-size:50px">Welcome.</h1>' +
               '<p>Eclipse is a Web-based emulator that was engineered from the ground-up to provide a familiar, yet brand new, experience.</p>' +
               '<p>Eclipse supports NES, Game Boy, Game Boy Color, and Game Boy Advance games, with support for more systems planned.</p>' +
               '<br>' +
                   '<a href="#" onclick="stageTwo.open()" class="button active button-big button-round gradient popup-close" style="box-shadow: 0 5px 13px 0 rgba(0, 0, 0, .1); border:none; font-weight:bold;">Continue...</a><br>' +
                   '<a href="#" onclick="restoreStageOne.open()" class="popup-close" style="text-decoration:none;color:grey;">Import Data from iGBA or Eclipse State...</a>' +
            '<br>' +
         '</center></div></div></div>',
         closeByBackdropClick: false,
         on: {
            open: function (popup) {
                prepareBenchmark();
                setupAudio();
                setupAutoSave();
                eclipse.setupFillScreenToggle();
                eclipse.setupDesktopModeToggle();
                }
            }
});

function setFit() {
    document.querySelector("#fit").className = "button button-active";
    document.querySelector("#stretch").className = "button";
    localStorage.setItem('fillScreen', 'false');
    document.querySelector("#fillPreview").src = "./img/fit.png";
}

function setStretch() {
    document.querySelector("#stretch").className = "button button-active";
    document.querySelector("#fit").className = "button";
    localStorage.setItem('fillScreen', 'true');
    document.querySelector("#fillPreview").src = "./img/stretch.png";
}

var stageTwo = eclipse.popup.create({
    content:'<div class="popup onboarding">' +
            '<style>div[style="cursor: pointer; width: 80px; opacity: 0.9; z-index: 10001; position: absolute; left: 0px; top: 0px"] {display:none} #performanceTest {opacity: 0;width: 5px;height: 5px}</style>' +
            '<div class="page-content">' +
            '<div class="block">' +
            '<center>' +
               '<h1 style="color:#333;font-weight:200;font-size:50px">Select Display Mode</h1>' +
               '<p>When playing in Landscape mode, you can either have the game run in the correct aspect ratio, or stretch it to cover the whole screen. This option can be changed later in Settings.</p><br>' +
               '<div class="segmented">' +
                    '<a onclick="setFit()" id="fit" class="button button-active">Fit</a>' +
                    '<a onclick="setStretch()" id="stretch" class="button">Stretch</a>' +
                '</div>' +
               '<img id="fillPreview" src="./img/fit.png" style="width:70%">' +
                   // '<img onclick="localStorage.setItem(\'fillScreen\', \'false\');" style="cursor:pointer;width:80px;height:auto;border-radius:21%" src="./img/fit.png"><txt style="visibility:hidden">---</txt>' +
                   // '<img onclick="localStorage.setItem(\'fillScreen\', \'true\');" style="cursor:pointer;width:80px;height:auto;border-radius:21%" src="./img/stretch.png"><txt style="visibility:hidden">---</txt>' +
               '<br>' +
               '<a href="#" onclick="stageThree.open()" class="button active button-big button-round gradient popup-close" style="box-shadow: 0 5px 13px 0 rgba(0, 0, 0, .1); border:none; font-weight:bold;">Continue...</a><br>' +
         '</center></div>' +
            '</div>' +
            '</div>',
         closeByBackdropClick: false,
         on: {
             open: function (popup) {
                benchmarkTest();
             }
        }
});

var stageThree = eclipse.popup.create({
    content:'<div class="popup onboarding">' +
            '<style>div[style="cursor: pointer; width: 80px; opacity: 0.9; z-index: 10001; position: absolute; left: 0px; top: 0px"] {display:none} #performanceTest {opacity: 0;width: 5px;height: 5px}</style>' +
            '<div class="page-content">' +
              '<div class="block">' +
              '<center>' +
                 '<h1 style="color:#333;font-weight:200;font-size:50px">Select a Skin</h1>' +
                 '<p>You can customize what Eclipse would look like using skins. You can change this later or add your own in Settings.</p><br>' +
                 '<div id="skinSelector">' +
                     '<img onclick="eclipse.setDefaultSkin(\'//php.eclipseemu.me/dl/dl.php?dl=https://eclipseemu.me/play/json/skins/default.json\')" style="cursor:pointer;width:80px;height:80px;border-radius:21%" src="./img/skin/red.png"><txt style="visibility:hidden">---</txt>' +
                     '<img onclick="eclipse.setDefaultSkin(\'//php.eclipseemu.me/dl/dl.php?dl=https://eclipseemu.me/play/json/skins/blue.json\')" style="cursor:pointer;width:80px;height:80px;border-radius:21%" src="./img/skin/blue.png"><txt style="visibility:hidden">---</txt>' +
                     '<img onclick="eclipse.setDefaultSkin(\'//php.eclipseemu.me/dl/dl.php?dl=https://eclipseemu.me/play/json/skins/green.json\')" style="cursor:pointer;width:80px;height:80px;border-radius:21%" src="./img/skin/green.png"><txt style="visibility:hidden">---</txt>' +
                     '<img onclick="eclipse.setDefaultSkin(\'//php.eclipseemu.me/dl/dl.php?dl=https://eclipseemu.me/play/json/skins/grey.json\')" style="cursor:pointer;width:80px;height:80px;border-radius:21%" src="./img/skin/grey.png"><txt style="visibility:hidden">---</txt>' +
                     '<img onclick="eclipse.setDefaultSkin(\'//php.eclipseemu.me/dl/dl.php?dl=https://eclipseemu.me/play/json/skins/magenta.json\')" style="cursor:pointer;width:80px;height:80px;border-radius:21%" src="./img/skin/magenta.png"><txt style="visibility:hidden">---</txt>' +
                     '<img onclick="eclipse.setDefaultSkin(\'//php.eclipseemu.me/dl/dl.php?dl=https://eclipseemu.me/play/json/skins/orange.json\')" style="cursor:pointer;width:80px;height:80px;border-radius:21%" src="./img/skin/orange.png"><txt style="visibility:hidden">---</txt>' +
                     '<img onclick="eclipse.setDefaultSkin(\'//php.eclipseemu.me/dl/dl.php?dl=https://eclipseemu.me/play/json/skins/iGBAModern.json\')" style="cursor:pointer;width:80px;height:80px;border-radius:21%" src="//eclipseemu.me/play/img/igba.jpeg"><txt style="visibility:hidden">---</txt>' +
                     '<img onclick="eclipse.setDefaultSkin(\'//php.eclipseemu.me/dl/dl.php?dl=https://eclipseemu.me/play/json/skins/iGBALegacy.json\')" style="cursor:pointer;width:80px;height:80px;border-radius:21%" src="//igbaemu.com/beta-1134/icon-refresh.png"><txt style="visibility:hidden">---</txt>' +
                     '<img onclick="eclipse.setDefaultSkin(\'//php.eclipseemu.me/dl/dl.php?dl=https://igba.shuga.co/theme/darkMode/index.json\')" style="cursor:pointer;width:80px;height:80px;border-radius:21%" src="//igba.shuga.co/theme/darkMode/icon.png"><txt style="visibility:hidden">---</txt>' +
                 '</div><br>' +
                 '<a href="#" onclick="stageFour.open()" class="button active button-big button-round gradient popup-close" style="box-shadow: 0 5px 13px 0 rgba(0, 0, 0, .1); border:none; font-weight:bold;">Continue...</a><br>' +
                 '</center></div>' +
                '</div>' +
            '</div>',
         closeByBackdropClick: false
});

var stageFour = eclipse.popup.create({
    content:'<div class="popup onboarding">' +
    '<div class="page-content">' +
    '<style>div[style="cursor: pointer; width: 80px; opacity: 0.9; z-index: 10001; position: absolute; left: 0px; top: 0px"] {display:none} #performanceTest {opacity: 0;width: 5px;height: 5px}</style>' +
    '<div class="block">' +
    '<center>' +
       '<h1 style="color:#333;font-weight:200;font-size:50px">Setup Complete!</h1>' +
       '<p>Eclipse has been configured successfully! To get started, click the "<b>+</b>" button and add your ROM!</p>' +
       '<br><i>Legal Notice: Eclipse does not condone piracy, as it is a violation of copyright law. Make sure you own and extracted the games you are adding to Eclipse youself.</i><br><br>' +
       '<a href="#" onclick="setCookie(\'isRestore\',\'\',\'-1\');OpenSkin.load();" class="button active button-big button-round gradient popup-close" style="box-shadow: 0 5px 13px 0 rgba(0, 0, 0, .1); border:none; font-weight:bold;">Get Started</a><br>' +
 '</center></div>' +
    '</div>' +
    '</div>'
});

// Cookies are needed for having data persist between restores (needed to finish install process).
// Source: https://www.w3schools.com/js/js_cookies.asp
function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

var restoreStageOne = eclipse.popup.create({
    content:'<div class="popup onboarding">' +
            '<style>div[style="cursor: pointer; width: 80px; opacity: 0.9; z-index: 10001; position: absolute; left: 0px; top: 0px"] {display:none} #performanceTest {opacity: 0;width: 5px;height: 5px}</style>' +
            '<div class="page-content"><div class="block" style="margin-top: 0"><center class=""><br><div class="row"><i onclick="stageOne.open();setCookie(\'isRestore\',\'\',\'-1\')" class="icon icon-back color-black popup-close" style="position: absolute; height: 42px; cursor: pointer" id="restoreBack"></i><h1 style="color:#333;margin:0;width:100%;" id="restoreTitle">Restore from State</h1></div><p>Eclipse can be restored from both iGBA and Eclipse backups.</p><p>Please upload your <code>.eclipse</code> or <code>.igba</code> file to complete the restore. iGBA repos will not be saved, but all games and their save data will persist.</p><p><i>Reminder: To export your state file, go to iGBA or Eclipse\'s Settings, then Save State, and then upload the generated file here.</i></p></center></div>' +
    '<div class="list" style="background:rgba(250,250,250,0.8)">\
        <ul>\
          <li id="onlineLI" onclick="document.getElementById(\'fileURLContainer\').style.display = \'block\'; document.getElementById(\'localFileContainer\').style.display = \'none\'; document.getElementById(\'dataContainer\').style.display = \'none\'; fWL = 0;" class="">\
            <label class="item-radio item-content">\
        <input type="radio" name="fW" value="Online" checked="checked">\
        <i class="icon icon-radio"></i>\
        <div class="item-inner">\
          <div class="item-title">Online</div>\
        </div>\
      </label>\
          </li>\
          <li onclick="document.getElementById(\'fileURLContainer\').style.display = \'none\'; document.getElementById(\'localFileContainer\').style.display = \'block\'; document.getElementById(\'dataContainer\').style.display = \'none\'; fWL = 1;" class="">\
            <label class="item-radio item-content">\
        <input type="radio" value="Local" name="fW">\
        <i class="icon icon-radio"></i>\
        <div class="item-inner">\
          <div class="item-title">Local</div>\
        </div>\
      </label>\
          </li>\
        <li class="" onclick="document.getElementById(\'fileURLContainer\').style.display = \'none\'; document.getElementById(\'localFileContainer\').style.display = \'none\'; document.getElementById(\'dataContainer\').style.display = \'block\'; fWL = 2;">\
            <label class="item-radio item-content">\
        <input value="Manual" name="fW" type="radio">\
        <i class="icon icon-radio"></i>\
        <div class="item-inner">\
          <div class="item-title">Manually</div>\
        </div>\
      </label>\
          </li>\
        </ul>\
      </div>'+
    '<div class="block">   <center>   <div class="content-block" style="margin-left: 3%; margin-right: 3%;"><div id="fileURLContainer" style="background-color: rgb(241, 241, 241); box-shadow: rgba(0, 0, 0, 0.247059) 0px 0px 5px; border-top-left-radius: 10px; border-top-right-radius: 10px; border-bottom-right-radius: 10px; border-bottom-left-radius: 10px; padding: 8px; position: relative; display: block;" class=""><input id="fileURL" placeholder="URL to State File" style="border-radius:50px;background:transparent;border:none;width:100%;position:relative;text-align:center;" class=""></div>      <div id="localFileContainer" style="background-color: rgb(241, 241, 241); box-shadow: rgba(0, 0, 0, 0.247059) 0px 0px 5px; border-top-left-radius: 10px; border-top-right-radius: 10px; border-bottom-right-radius: 10px; border-bottom-left-radius: 10px; padding: 8px; position: relative; display: none;" class=""><input id="localFile" style="border-radius:50px;background:transparent;border:none;width:100%;position:relative;text-align:center;" type="file" class=""></div><div style="display: none;" id="dataContainer"><textarea id="manualDataTextArea" placeholder="Paste data here" style="background-color: rgb(241, 241, 241); box-shadow: white 0px 0px 5px; border-radius: 10px; padding: 15px; position: relative; width: 100%"></textarea><!--<br><select id="eclipseorigbaselect" class="input-with-value" style="background-color: rgb(241, 241, 241); box-shadow: rgba(0, 0, 0, 0.247059) 0px 0px 5px; border-radius: 10px; padding: 15px; position: relative; display: block; width: 100%">\
          <option class="" disabled="" value="Type">Type</option><option value="Eclipse">Eclipse</option><option value="iGBA">iGBA</option>\
          </select>--></div>      <br><a href="#" onclick="setCookie(\'isRestore\', \'2\');if(fWL == 0){load_Eclipse_storage_file(null, document.getElementById(\'fileURL\').value)}else{load_Eclipse_storage_file(1, null)}" class="button active button-big button-round" style="box-shadow: 0 5px 13px 0 rgba(0, 0, 0, .1); border:none; font-weight:bold; color: white; background-image: linear-gradient(-180deg, #FF3546 0%, #9F0445 97%)" id="loadStateButton">LOAD</a></div></center></div></div>',
         closeByBackdropClick: false,
         on: {
             open: function (popup) {
                setCookie("isRestore", "1");
                document.getElementById("restoreBack").style.height = document.getElementById("restoreTitle").clientHeight.toString() + "px"
             }
        }
});

if(getCookie("isRestore") == "2") {
    stageTwo.open();
    setCookie("isRestore","","-1");
} else if(getCookie("isRestore") == "1") {
    restoreStageOne.open();
}

function prepareBenchmark() {
    var s1 = document.createElement('script');
    var s2 = document.createElement('script');
    var s3 = document.createElement('script');
    s1.src = "../benchmark/lib/three.min.js";
    s2.src = "../benchmark/lib/Detector.js";
    s3.src = "../benchmark/lib/Stats.js";
    document.head.appendChild(s1);
    document.head.appendChild(s2);
    document.head.appendChild(s3);
}

function benchmarkTest() {
    var benchmarkToast = eclipse.toast.create({
      text: '<txt id="RUNNING">Benchmarking in Progress</txt>',
      position: 'bottom'
    });
    // benchmarkToast.el.style.background = "teal"
    benchmarkToast.open();


    //variables to create the scene, objects, camera
    var container, stats;
    var camera, renderer;
    var scene = new THREE.Scene();
    var geometry, material;

    var timeframe = 0, calcFrame = 0;   //these are used for timing the scene renders

    var frameNum = 0;           //current frame number of the benchmark
    var endFrame = 100;         //'end' of the benchmark, which is extended if more data is needed

    var badData = 10;           //the # of data points we truncate from the beginning of the data to cut out bad data

    var numSquares = 0;         //keeps track of number of squares in the scene

    var maxYaxis = 100;         //max render time (ms) shown on the graph

    var requestAnim;        //holds the animation frame request

    var frameNumSquares = new Array(endFrame - badData);
    var frameTime = new Array(endFrame - badData);

    var inc = 0.1;          //used in AddShape() for moving future objects

    var addObjects = 1;     //number of objects to add per frame

    //variables used to control and change the text
    var runText = document.getElementById('RUNNING');
    var runTextCount = 0;

    var min, max, mean;     //variables for statistics at the bottom fo the page

    var gl; //used to access WebGL context (renderer.context)

    // Square shape objects
    var x = 5000;
    var y = 5000;
    var squareShape = new THREE.Shape();
    squareShape.moveTo( 0, 0 );
    squareShape.lineTo( 0, y );
    squareShape.lineTo( x, y );
    squareShape.lineTo( x, 0 );
    squareShape.lineTo( 0, 0 );

    //-----------------------Code starts here-----------------------

    //Check if browser supports WebGL
     if (Detector.webgl) {
         init();
         animate();
     } else {
         var warning = Detector.getWebGLErrorMessage();
         document.getElementById('container').appendChild(warning);
     }


    //setup the back end (camera, renderer, stats.js)
    function init()
    {
        container = document.createElement( 'div' );
        container.id = "performanceTest";
        document.body.appendChild( container );

        //setup camera
        camera = new THREE.PerspectiveCamera( 60, window.innerWidth / window.innerHeight, 1, 10000 );
        camera.position.y = window.innerHeight / 2;
        camera.position.z = 1000;
        camera.position.set( 2500, 2500, 500 );

        //setup and add renderer
        renderer = new THREE.WebGLRenderer();
        renderer.setSize( window.innerWidth, window.innerHeight );
        renderer.sortObjects = false;
        renderer.sortElements = false;
        container.appendChild( renderer.domElement );
        gl = renderer.context;

        //set false to disable Z-Buffering
        renderer.setDepthTest(true);

        // Testing other methods of changing depth test
        //renderer.context.depthMask( false );
        //gl.disable(gl.DEPTH_TEST);
        //eclipse.log(gl.getParameter(gl.DEPTH_TEST));

        //add stats
        stats = new Stats();
        stats.getDomElement().style.position = 'absolute';
        stats.getDomElement().style.left = '0px';
        stats.getDomElement().style.top = '0px';
        document.body.appendChild( stats.getDomElement() );
    }


    //Using the passed in parameters, add the shape to the scene
    function addShape( shape, color, x, y, z, rx, ry, rz, s )
    {
        var geometry = new THREE.ShapeGeometry( shape );
        var material = new THREE.MeshBasicMaterial( { color: color} );

        var mesh = new THREE.Mesh( geometry, material );
        mesh.position.set( x, y, z + (frameNum*inc) );      //move each new object closer to the camera
        mesh.rotation.set( rx, ry, rz );
        scene.add( mesh );
        mesh.scale.set( s, s, s );

        numSquares = numSquares+1;
    }


    //This function: requests the next animation frame, records the render times,
    //checks for end of benchmark, adds more objects, updates stats.js,
    //renders the scene, and verifies that the rendering is finished before continuing.
    function animate()
    {
        //creation of the dynamic 'Running test' text
        if(frameNum % 5 == 0)   //update every 5 frames
        {
            if(runTextCount >= 10)  //reset the text after 10 periods
            {
                runText.innerHTML = "Benchmarking in Progress"
                runTextCount = 0;
            }
            else    //add another period
            {
                runText.innerHTML = runText.innerHTML + ".";
                runTextCount = runTextCount + 1;
            }
        }

        // note: three.js includes requestAnimationFrame shim
        requestAnim = requestAnimationFrame( animate );

        //record the time between each frame
        frameNum = frameNum+1;
        calcFrame = performance.now() - timeframe;
        timeframe = performance.now();

        frameNumSquares[frameNum] = numSquares;
        frameTime[frameNum] = calcFrame;

        //check if we are at the end of the program
        if(frameNum >= endFrame)
        {

            if( extendGraph() )     //check if it needs to extend length of benchmark
            {
                endFrame += 60
            }
            else    //benchmark is complete
            {
                //hide running text
                runText.style.visibility = 'hidden';

                //clean up and create graph
                cancelAnimationFrame(requestAnim);
                removeSceneObjects();
                fixData();
                calcStats();
                smoothData();

                //resulting storage of benchmark data

                localStorage.setItem('benchmark','[' + frameNum + ',' + numSquares + ',' + frameTime[frameNum] + ',' + min + ',' + max + ',' + mean + ']')

                // stageTwo.close()
                // stageThree.open()
                benchmarkToast.close()
                eclipse.userLog("Benchmarking Complete!")

                //create the blue background color for the finished screen
                addShape( squareShape, '#6495ED', 150, 100, 0, 0, 0, 0, 1 );
            }
        }
        else    //keep adding more objects
        {
            var i;
            for(i = 0; i < addObjects; i++)
            {
                addShape( squareShape, '#'+Math.floor(Math.random()*16777215).toString(16), 150, 100, -20, 0, 0, 0, 1 );
            }
        }

        stats.update();

        renderer.render( scene, camera );

        //ensure renderer is finished before moving on to the next frame
        renderer.context.finish();
    }


    //returns true if we need to extend the benchmark in order to see a trend
    function extendGraph()
    {
        var i;
        var frameAvg = 0;

        if(frameNum > 5)
        {
            //get the average render time of the last 5 frames
            for(i = frameNum; i > frameNum-5; i--)
            {
                frameAvg += frameTime[i];
            }

            frameAvg = frameAvg / (frameNum-i);
        }

        //if the average render time is under the limit, continue benchmarking
        if(frameAvg <= 55)
            return true;
        else    //time to end the benchmark
            return false;
    }


    //Calculate statistics for the results at the end. It takes the data
    //from the frameTime array that was built during the benchmark.
    function calcStats()
    {
        var i, sum = 0;

        for(i = 0; i < frameTime.length; i++)
        {
            //check for new minimum
            if(frameTime[i] < min || !min)
            {
                min = frameTime[i];
            }

            //check for new maximum
            if(frameTime[i] > max || !max)
            {
                max = frameTime[i];
            }

            sum = sum + frameTime[i];
        }

        mean = sum/i;
    }

    //Protects the data from going out of the graph, and remove bad data
    //from the beginning of the test.
    function fixData()
    {
        var i;

        //replace original arrays with the identical array minus the first 10 values
        frameTime = frameTime.slice(badData, endFrame+1);
        frameNumSquares = frameNumSquares.slice(badData, endFrame+1);
        frameNum = frameNum - badData;

        //keep the graph data from shooting off of the graph when there are outliers
        for(i = 1; i < endFrame; i++)
        {
            if (frameTime[i] > maxYaxis)
            {
                frameTime[i] = maxYaxis;
            }
        }
    }


    //Smooth the data on the graph to make it easier to see the overall graph trend.
    function smoothData()
    {
        var i;
        for(i = 3; i < endFrame; i++)
        {
            //if the current render time value is a lot bigger than the previous
            //then just set it to the average time of the previous 3 frames
            if(frameTime[i] >= (2* frameTime[i-1]) )
            {
                frameTime[i] = ( (frameTime[i] + frameTime[i-1] + frameTime[i-2]) / 3);
            }
        }
    }


    //remove all objects from the scene
    function removeSceneObjects()
    {
        var obj, i;
        for ( i = scene.children.length - 1; i >= 0 ; i -- )
        {
            obj = scene.children[i];
            if (obj !== camera)
            {
                scene.remove(obj);
            }
        }
    }


    //Debug function to print out the recorded data
    function printData()
    {
        var i;
        for(i = 1; i < frameNumSquares.length; i++)
        {
            // eclipse.log("\nFrame number: ", i);
            // eclipse.log("Number of squares: ", frameNumSquares[i] );
            // eclipse.log("Draw time: ", frameTime[i]);
        }
    }
}

// NES benchmarking stuffs

function benchmarkNES() {

    function croomBenchmark() {
        console.log("croom triggered")
        var croomRom = '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naYDmDhlJYUlkALmJiCO1UyS1LEl5iXQAuYmjdIDogy9lgPQSaEXyf/QBSCO1aEX9hfQAvYYSCkHqLnh4p2WA2hKSkrJGZAK8AWpAJ2UA0x21eAM8CJ9pQOdlQO9pgMKCqi59eIKCgoKCQydlAPelgPKysrKEKlghgWqvfPiIDzTpgVMdtW9pAMKkAmp35UXqeKVGGCouenilRe56uKVGGCt0wPwCb2UA0pKSkrQBakAhQJghQK9pgMKCqilAln14ikPWfXihQK9lAM4+fbikN6dlAO9lQOFA7n34hAXvZYD0BIYrcQDaQutxQNpB5AFqQCdlANgoACxAOYA0ALmAYUDsQDmANAC5gGFAqUC8ALmA6QAqQCFALEAMCHI0ALmAarosQDI0ALmAY0HIMYC0ATGA/AFytDr8N6EAGDI0ALmAarKsQDI0ALmAY0HIMYC0ATGA/Dk6NDy8L1IqQCFAGjJyJAC6cgmAMlkkALpZCYAyVCQAulQJgDJKJAC6SgmAMkUkALpFCYAyQqQAukKJgBg////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////ZsDEwOPA/MAYwQD/AAAFAf//ABAAAAECBgAB/wAABQP//wEMAAABBAYCAv8AAAUF//8CCAAAAQYGBAP/AAAFB///AwgAAAEIBgYE/wAABQn//wQIAAAH/wYIDxAYDzAQAA8wIgIPMCYWD4KQIJAWGhYJKBg2FykZEBgQGBAWEBgiAicWEBopGTYWMhI0JCcYJygoFxAAKBEQESYWEAAnFycaFgIWAiQEJwcRARoKEAApGSoWFgbG18rbN9wb3w7dz91B3ozeT25jZSB1cG9uIGEgdGltZSBpbiB0aGUKVGhpcmQgUmVhbG0gZnJvbSB0aGUgU3VuLAphIHRlYW0gb2YgYmlvY2hlbWlzdHMgd2VyZQpwZXJmZWN0aW5nIGEgdHJ1dGggc2VydW0uCkNvZGVuYW1lZCBQaW5lbnV0LCB0aGUgc2VydW0Kd2FzIGludGVuZGVkIHRvIG1ha2UgaXQgbW9yZQpkaWZmaWN1bHQgZm9yIGEgZGV0YWluZWUgdG8Ka2VlcCBhIHNlY3JldCBmcm9tIHBvbGljZQphbmQgdG8gbWFrZSB0aGUgcGh5c2ljYWwKdGVsbHMgb2YgZGVjZXB0aW9uIG1vcmUKb2J2aW91cy4KCkJ1dCBhIGxhYiBhY2NpZGVudCBhdApIb21ib24gUGhhcm1hIGxlZCB0byB0aGUKY3JlYXRpb24gb2YgYSBtaWxkbHkKbmV1cm90b3hpYyBzdWJzdGFuY2UuCkxhYiBhc3Npc3RhbnRzIHdlcmUgZXhwb3NlZAp0byB0aGlzICJiYWQgYmF0Y2giCmJlZm9yZSBpdCBjb3VsZCBiZQpwcm9wZXJseSBjbGVhbmVkIHVwLgpUbyBtYWtlIHRoaW5ncyB3b3JzZSwgaXQKaGFkIHRvIGhhcHBlbiBvbiBCcmluZwpZb3VyIENoaWxkIHRvIFdvcmsgRGF5LgoKVGhlIGFzc2lzdGFudHMgYW5kIHRoZWlyCmNoaWxkcmVuIHdlcmUgcHV0IGluCnF1YXJhbnRpbmUgdW50aWwgdGhlaXIKYm9kaWVzIGVsaW1pbmF0ZWQgdGhlIHRveGluLgpJdCBjYXVzZWQgcGFpbmZ1bCBzZWl6dXJlcwp1bnRpbCB0aGV5IHN0YXJ0ZWQgdGhpbmtpbmcKb2Ygb3RoZXIgdGhpbmdzIHRvIGdldCB0aGVpcgptaW5kIG9mZiB0aGUgcGFpbi4KT25lIG9mIHRoZSBjaGlsZHJlbiBpbgpxdWFyYW50aW5lIHdhcyBjYXJyeWluZyBhCmRlY2sgb2YgQ29uY2VudHJhdGlvbiBjYXJkcy4KSXQgd29ya2VkLgoKVGhlIG1vcmUgaW50ZW5zZWx5IHRoZXkKdGhvdWdodCwgdGhlIG1vcmUgdGhlCnNpZGUgZWZmZWN0cyBzdWJzaWRlZC4KQ29uY2VudHJhdGluZyBoZWF2aWx5IHdvdWxkCnJlZHVjZSB0aGUgY29uY2VudHJhdGlvbiBvZgp0aGUgdG94aW4gaW4gYnJhaW4gZmx1aWQsCmFzIGl0IGJvdW5kIHRvIHdhc3RlCnByb2R1Y3RzIGZyb20gbWV0YWJvbGlzbQppbiB0aGUgYnJhaW4uCgpGbGlwIHR3byBjYXJkcywgYW5kIGlmIHRoZXkKbWF0Y2gsIHlvdSBrZWVwIHRoZW0uIElmCnRoZXkgZG9uJ3QsIGZsaXAgdGhlbSBiYWNrLgpHb29kIGx1Y2s7IHlvdSdsbCBuZWVkIGl0IQoAQnVpbGQgdGltZTogMTI2ODYwNjU5MQoHIDIwMTAgRGFtaWFuIFllcnJpY2sKQ29tZXMgd2l0aCBBQlNPTFVURUxZIE5PCldBUlJBTlRZLiAgVGhpcyBpcyBmcmVlCnNvZnR3YXJlLCBhbmQgeW91IGFyZQp3ZWxjb21lIHRvIHNwcmVhZCBpdAp1bmRlciBjZXJ0YWluIGNvbmRpdGlvbnM7CnNlZSBHUEx2My50eHQgZm9yIGRldGFpbHMuCgpWaXNpdCBwaW5laWdodC5jb20vbmVzCgBQcmVzcyB0aGUgQSBhbmQgQiBCdXR0b25zCndoZW4gdGhlIG90aGVyIHBsYXllcgpnaXZlcyB5b3UgdGhlIGNvbnRyb2xsZXIsCmFuZCBmbGlwIHR3byBjYXJkcy4KSWYgdGhleSBkb24ndCBtYXRjaCwgaXQncwp0aGUgb3RoZXIgcGxheWVyJ3MgdHVybi4KTWF0Y2ggbW9yZSBwYWlycyB0aGFuIHRoZQpvdGhlciBwbGF5ZXIgdG8gd2luLgoASGVyZSBjb21lcyBhIG5ldyBjaGFsbGVuZ2VyIQoKRmxpcCB0d28gY2FyZHMsIGFuZCBpZiB0aGV5CmRvbid0IG1hdGNoLCBpdCdzIG15IHR1cm4uCkNhbiB5b3UgbWF0Y2ggbW9yZSB0aGFuIG1lPwoAWW91IG5lZWQgbW9yZSBwcmFjdGljZS4KQ29tZSBwbGF5IG1lIGFnYWluIG9uY2UKeW91J3JlIHRoaW5raW5nIHN0cmFpZ2h0LgoAR29vZCBuZXdzIQpUaGUgZG9jdG9yIGNhbWUgYmFjayB3aXRoCnlvdXIgYmxvb2Qgd29yaywgYW5kIHRoZQp0b3hpbiBsZXZlbCBpbiB5b3VyIGJvZHkgaGFzCmZhbGxlbiBiZWxvdyBoYXJtZnVsIGxldmVsLgpZb3UncmUgZnJlZSB0byBnbyBub3cuCgBVTkRFUiBDT05TVFJVQ1RJT04KClRoaXMgcGFydCBpc24ndCBtYWRlIHlldC4KVG8gZ2V0IGl0IGRvbmUgZmFzdGVyLCBzZW5kCnlvdXIgYnJpYmUgdGhyb3VnaCBQYXlQYWwKdG8gdGVwcGxlc0BzcGFtY29wLm5ldAoACBAQERhQhBIMExRTHFKEFAwVGlqEFgwXFFccG4IYChkWWR4cghoeHZbZHpyE2wyXFNccm/8gJwAADzAQAA8wEAAPMBAADzAQAA8wEAAPMBAADzAQAA8wEAAPBADBA7sAAYCB+QAAiv4AAo6PhfIAE5CRkpOUlZaXmJmam5ydnp+Cg4SZ9QAToKGio6SlpqeoqaqrrK2ur4uMjanVAA8IAwMJAAgDAwkACAMDCQAI/gMACfUAEwOGBgMAA4aHAwADhocDAAOGA4cD9QD+AxALAAOIiQMAA4iJAwADAAMAA/UAEwMACgkACgMDCwAKAwMLAAMAAwAD1gAVQWNjaWRlbnQgYXQgSG9tYm9uIExhYoEAgQDTAA1yb29tAGxpdGUAMC4wMfMAFAcgMjAxMCBEYW1pYW4gWWVycmlja/gAGShQcmVzcyBTZWxlY3QgZm9yIGRldGFpbHMpvgDBA8EA+uAv4TEgUGxheWVyIFN0b3J5CjEgUGxheWVyIFNvbGl0YWlyZQoyIFBsYXllcnMKVnMuIENQVQoAUHJlc2Nob29sCkVsZW1lbnRhcnkKSnVuaW9yIEhpZ2gKSGlnaCBTY2hvb2wKTGFiIFRlY2huaWNpYW4KAAAAGCQkJBgAAAAAPDw8PDwAAAB+fn4Afn5+AAB+//////9+AP///////////6Pho+Gt4a3ho+EcHR4fICEiIyQlJicsLS4vMDEyMzQ1Njc8PT4/KCkqKzg5OjvY0eTREtKd0vvhAAYH4gACC+IACBviDAIf4gAPPeIAGW/iAAZ74jARneI8Eb/iDAjP4gwITyREJE8pRClPLkQuTzBEMI8TjQ+LDIkJhweFBYMDgQIGAwMDTydOKk0sTCdLKUosiSeIKocshieFKYQsgyeCKoEsTydOKk0sTCdLKUosiSeIKocshidPKk4tTS9MKkssSi+JKogthy+GKoUshC+DKoItgS9PEE0TSxZJGUccRR8PBw8HDgcNBwwHCwcKBwkHCAcHBwYHBQcEBwMHAgcBBwEHDwwPDQ4ODQ4MDgsOCg4JDggOBw4GDgUOBA4DDgIOAQ4BDgoECAQGBAUEBAQDBAIEAQQIBAgNBg4FDgQOAw4CDgEO1/8BAgMEBggMEBXjIOMk4z3jSOMKCYgAAABIAgAAAeMs4yIw3AICDwAAAA8BIAEBAQ8BIC0j0FB70EBr0DBTzP+UjH7/fGxefGw0RP8xaAIEGAABAxgBAAQAASALIThIOCggEAAgOGL/YdA50CHQAdD/8X8TrU3znUwAuHQ0+L+JVib5zqaAXDoa+9/Eq5N8Z1I/LRwM/e/h1cm9s6mflo6GfndwamReWVRPS0ZCPzs4NDEvLCknJSMhHx0bGhgXFRQHBwcGBgUFBQUEBAQDAwMDAwICAgICAgIBAQEBAQEBAQEBAQEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////8BwATAAMAAAAAAAAAAAAAAAAAAAAAA//////////8AAAAAAAAAAAAAAAAAAAAA////////////////////////////////ADxmUkpmPAAAAAAAAAAAAAA8ZlJKZjwAAAAAAAAAAAADAwAAAAABAwcBAQAAAQEHPEKZoaGZQjw8QpmhoZlCPAILDx9/P/9/AQcfPz9/f/9A0PD4/vz//oDg+Pz8/v7/f/8/fx8PCwL/f38/Px8HAf7//P748NBA//7+/Pz44IAAPGZSSmY8AAAAAAAAAAAAADxmUkpmPAAAAAAAAAAAAAA8ZlJKZjwAAAAAAAAAAAAAPGZSSmY8AAAAAAAAAAAAAAAAAAADDx8AAAAAAAMPHwAAAAB+////AAAAAH7///8DAwcPDx8fHwMDBw8PHx8f//////jw4MD/////+PDgwD8/Pz8/f39/Pz8/Pz9/f3/AgICAgIAAAMCAgICAgAAAf39/f/////9/f39//////w9/////////D3////////8/P39/f39/fz8/f39/f39//vjw4MCAgAD++PDgwICAAP/+/v4AAAAA//7+/gAAAAAAAIDA4PD4/AAAgMDg8Pj88Pj4/Pz+/v7w+Pj8/P7+/v7/f39/f//+/v9/f39///4APGZSSmY8AAA8ZlJKZjwAADxmUkpmPAAAPGZSSmY8AAAAAAAAAAAAAAAAAAAAAAAYGBgYABgYABgYGBgAGBgAJCQkAAAAAAAkJCQAAAAAADb/Zv9sAAAANv9m/2wAAAAIHCoYDCocCAgcKhgMKhwIRKRICBASJSJEpEgIEBIlInDIwW7MzHgAcMjBbszMeABgIEAAAAAAAGAgQAAAAAAADBgwMDAwGAwMGDAwMDAYDDAYDAwMDBgwMBgMDAwMGDAIKhwqCAAAAAgqHCoIAAAAAAgIPggIAAAACAg+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AAAAAAA8ZlJKZjwAAAAAAAAAAAAAPGZSSmY8AAAAAAAAAAAAADxmUkpmPAAAAAAAAAAAAPj87//94eFgADAiBjwgIGAAALP//8fDwQAAAAl4QUDBAADH7/fzz+cAAACDEPIA5wAAnv8cjv+eAAAAzwAIw57zyczm8/n8/vPJzObz+fz+55MzZ8+fP3/nkzNnz58/f////u/PhwcDf3xsRgYDAwDA4AAAAICAgIAAAAAAAAAAf39/f39/f39ydHVze3V0cgEBAQEBAQEBAQEBAQEBAQF/f39/f39/f0BAQEBAQEBAADxmUkpmPAAAAAAAAAAAAAA8ZlJKZjwAAAAAAAAAAAAAPGZSSmY8AAAAAAAAAAAAADxmUkpmPAAAAAAAAAAAAAA8ZlJKZjwAAAAAAAAAAAAAAAAAAAAAAP//////////wIAAAAAAAAD//////////wMBAAAAAAAA///////////DgQAAAAAAAP//////////AAAAAAAAgMD//////////8CAAAAAAIDA//////////8DAQAAAACAwP//////////w4EAAAAAgMD//////////wAAAAAAAAED///////////AgAAAAAABA///////////AwEAAAAAAQP//////////8OBAAAAAAED//////////8AAAAAAACBw///////////wIAAAAAAgcP//////////wMBAAAAAIHD///////////DgQAAAACBw/////////////8AAAAAAAD//////////wD/AAAAAAAAAP////////8AAAAAAAD///////////////8AAAAA/////////////wD/AAAAAP//AP////////8AAAAAAAD/AP////////8A//8AAAAA/wD/////////AAD/AAAAAP8AAP///////wDAwMDAwMDAwP//////////QEBAQEBAQEB/f39/f39/fwMDAwMDAwMD///////////Dw8PDw8PDw///////////Q0NDQ0NDQ0N/f39/f39/fwICAgICAgIC/v7+/v7+/v7CwsLCwsLCwv7+/v7+/v7+QkJCQkJCQkJ+fn5+fn5+fv93xYITMCkhAIgCAZI5MTn/d8WGRSaEBACIIkWGxWfn/3eFAjFhiQEAiAIBMPlx8f93hQIxYYEDAIgCATD5ccP/d9mhQQmZMQCIIFGhyRk5/3eBgh8yIAAAiAIDnj0nA/93xYIZMyAAAIgCARg/JwP/dwEBeSGDAgCIAAH50XPz/3fFghExAQMAiAIBEDkRg/93xYIRMSkBAIgCARA5MREAPGZSSmY8AAAAAAAAAAAAADxmUkpmPAAAAAAAAAAAAAA8ZlJKZjwAAAAAAAAAAAD/dx0qMSIgAQCIIjUqOzGR/3eQkhISkjIAiAISkpISMv93WSkxARlBAIggESkZEUkhISkTgkfd/zk5OZODx///BCaERaZn3f/n5+fn5+f//wMGjB0AAf//48ePHwEB//8CMIkRAwf9/8Px+TEDh///AQH5Ualx3/8BAfn5+fn//xBxiRGDR93/Efn5EYPH//8QMSkRg0fd/xE5ORGDx///AiaERY5P3f/j5+fHz8///wIQORGDR93/gxE5EYPH//8BCZkRg0fd/4HJ+TGDx///ADxmUkpmPAAAAAAAAAAAAAA8ZlJKZjwAAAAAAAAAAAAAPGZSSmY8AAAAAAAAAAAAEQSERI5O3f+RhITEzs7//yIiInJict//MjIycnJy//9JYUFRYXHf/0lhYXFxef//BBAgQAaABAD44MKDgAUYHSAIBAIAAQAAHwcDwQHgAPAEEydODI0PHvjjx46MDQ8eIMjkchDB8HAfx+NxEcDwcPvn3arVIogA/Pji1ardd///dx0KBQIAAAAIIhUKBQMB/3fdqlUiiAAAiCJVqt13/99326lVIogAP48nV6vdd/8CAgEPPz95dwIDAQEDAAAAAAAA8Pz8/v7gwAAAwIAAAAAAAAAAAAA+BwEDBgQMGAgAAAAAAHz+z+DAYCAwEAAAAw8fOTd3fncAAAAAAAABCMBw+Py87v7+AIAAAEAQAAAAAR8/Pz8/PxgEAAAAQEBAAOD4/Px8/LwAAAAAAIICQgABgABAIBAEBQABgYHB4PgAgAEAAgQIIPAQEBEREwcfHBiAAEAvEwQcGACAgM/j+DgYGThy9MggOBgYOXHzxx8AIojVqvf9////////////AwYMHTp33f8DBw8fP3///wAiiFWqd93///////////8AIohVq3ff////////////d38/Pz8fHwcAAAAgIBAYB/7+/Pz8+PhgAAAABAQImGB/59/f/75dPgAAAACAwWM+v7///br8AAAAAAGDxvwAAH8/Wx8nEAwDAEBkIDgfDwP25Pq4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';


        croomRom = atob(croomRom);

        // return function() {
            var i;
            console.log("new JSNES => nesBench")
            var nesBench = new JSNES({
                emulateSound: true,
                ui: JSNES.DummyUI
            });
            console.log("defined nesBench")
            nesBench.loadRom(croomRom);
            nesBench.setLimitFrames(false);
            nesBench.isRunning = true;
            console.log("running nesBench")

            for (i=0; i<5; i++) {
                nesBench.frame();
            }
            console.log("cycled thru frames")

            // Hit enter on start screen to start scrolling
            nesBench.keyboard.keyDown({keyCode: 13});
            nesBench.frame();
            nesBench.keyboard.keyUp({keyCode: 13});

            console.log("keyboard shit")

            for (i=0; i<94; i++) {
                nesBench.frame();
            }
            console.log("returned function!")
        // };
    }

    var currentRepeat = -1;
    var repeatCount = 1;
    var frameCount = 100;
    var results = [];
    var i;
    results.length = repeatCount;
    console.log('[EclipseNESBenchmark] Running...')
    setTimeout(function benchmark() {
        if (currentRepeat < repeatCount) {
            console.log("run owo")
            var start = +new Date();

            croomBenchmark();

            // Warm up runs
            if (currentRepeat >= 0) {
                results[currentRepeat] = +new Date() - start;
                console.log('[EclipseNESBenchmark] Run '+currentRepeat+', '+results[currentRepeat]+'ms')
            }
            currentRepeat += 1;
            setTimeout(benchmark, 10);
        }
        else {
            var totalTime = 0;
            for (i=0; i<results.length; i++) {
                totalTime += results[i];
            }
            var meanTime = totalTime / repeatCount;
            var totalFPS = 0;
            for (i=0; i<results.length; i++) {
                totalFPS = frameCount / (results[i] / 1000);
            }
            var meanFPS = totalFPS / repeatCount;
            console.log('[EclipseNESBenchmark] Average of 10 runs: '+meanTime.toFixed(2)+'ms');
        }
    }, 10);
}

// /nes benchmarking stuffs

// Initialize Onboarding on first launch
if(localStorage.getItem("setup") != "done"){
  stageOne.open()
}

// There is a weird glitch where the botton of files will be cut out.
// This is a bodge to work around that.
