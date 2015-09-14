
console.log("index.js loaded");

window.addEventListener('load', function () {
// *** start sensor data ***
        //first value of Noisesensor is always -120.0000 and therby unusable!
        function initNoiseSensor1(result) {
        };
        console.log("Initialize Noisesensor the first time with -120.0000");
        
        var firstNoise = carrier.getAverageNoise(initNoiseSensor1, onFailure);
        
        // start noise sensor
            function onSuccessNoise1(result) {
            };
           carrier.getAverageNoise(onSuccessNoise1, onFailure);
        // end noise sensor
    // *** end sensor data ***
}, false);




$(document).ready(function() {
    // establish mqtt connection to server
    initClient();
    $( document ).bind( "mobileinit", function() {
        // Make jQuery Mobile framework configuration changes here
        $.support.cors = true;
        $.mobile.allowCrossDomainPages = true;
    });
    
// *** start setup for data sending ***
    function addToGlobal(name, value) {
                  globalData[name] = value;
    };
// *** end setup for data sending ***

// *** start check for first app launch ***
    var applaunchCount = window.localStorage.getItem('launchCount5');
    

    //Check if it already exists or not
    if(applaunchCount){
       //This is a second time launch, and count = applaunchCount
       console.log("second time app launch");
       var appUID = window.localStorage.getItem('appUID');
       console.log("Old AppID: "+ appUID);

       
    }else{
      //Local storage is not set, hence first time launch. set the local storage item
      window.localStorage.setItem('launchCount5',1);
      console.log("first time app launch");
      
      // *** start create appID ***
      
        var ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        var ID_LENGTH = 8;

        var generate = function() {
          var rtn = '';
          for (var i = 0; i < ID_LENGTH; i++) {
            rtn += ALPHABET.charAt(Math.floor(Math.random() * ALPHABET.length));
          }
          return rtn;
        }
        
        appID = generate();
        console.log("New AppID: "+ appID);
        window.localStorage.setItem('appUID', appID);
      
      // *** end create appID ***
    }
// *** end check for first app launch ***


// *** start temp form ***
$('#temp > input[type="button"]').click(function(){
	console.log("a temp button pressed");
	event.preventDefault();

    $('#temp input[type="button"].active').removeClass('active');
        $(this).addClass('active');
});
// ** end temp form ***



// *** start lighting form ***
$('#lighting > input[type="button"]').click(function(){
	console.log("a lighting button pressed");
	event.preventDefault();

    $('#lighting input[type="button"].active').removeClass('active');
        $(this).addClass('active');
});
// *** end lighting form ***



// *** start noise form ***
$('#noise > input[type="button"]').click(function(){
	console.log("a noise button pressed");
	event.preventDefault();

    $('#noise input[type="button"].active').removeClass('active');
        $(this).addClass('active');
});
// *** end noise form ***


// *** start activity form ***
$('#activity > input[type="button"]').click(function(){
	console.log("an activity button pressed");
	event.preventDefault();

    $('#activity input[type="button"].active').removeClass('active');
        $(this).addClass('active');
});
// *** start temp form ***





// *** start submit function ***
$('#submitButton').click(function(){
	console.log("submitButton clicked");
    
    // *** start add values of all active buttons and UID to globalData ***
    $(".active").each( function () {
        console.log( $(this).parent().attr("id"));
		console.log( $(this).val() );
                
        var nameU = $(this).parent().attr("id");
        var valueU = $(this).val();
        
        addToGlobal(nameU, valueU);
	});
    
    // adds UID to globalData
    var appUID = window.localStorage.getItem('appUID');
    addToGlobal("appID", appUID);
    // *** end add values of all active buttons to globalData ***

    
    // *** start define sensor functions ***
    
        function onSuccessLight(result) {
            addToGlobal("LightS", result);
        };

        function onSuccessNoise(result) {
            addToGlobal("NoiseS", result);
            // sending data in callback
            sendData();
        };
        
        function getNoise() {
            carrier.getAverageNoise(onSuccessNoise, onFailure);
        }
        
        function getLighting() {
            carrier.getLuminosity(onSuccessLight, onFailure);
        }
    
    // *** end define sensor functions ***
   
    
    // *** start sensor data ***
    getNoise();
    getLighting();
    
    
    function sendData() {

        sendAppID();
        sendActivity();
        sendNoise();
        sendLighting();
        sendTemp();
        sendNoiseS();
        sendLightS();
        //sendJSON();
    }
    
    // *** end sensor data ***
    


});
// *** end submit function ***
                  


                  





});


