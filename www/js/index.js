
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
        sendJSON();
    }
    
    
    
    function sendAppID() {
    console.log("sendAppID entered")
    appIDValue = globalData.appID;
    message = new Paho.MQTT.Message(appIDValue);
    message.destinationName = "iphone/" + window.localStorage.getItem('appUID') + "/appID";
    client.send(message);
}

function sendActivity() {
    console.log("sendActivity entered")
    activityValue = globalData.activity;
    message = new Paho.MQTT.Message(activityValue);
    message.destinationName = "iphone/" + window.localStorage.getItem('appUID') + "/activity";
    client.send(message);
}

function sendNoise() {
    console.log("sendNoise entered")
    noiseValue = globalData.noise;
    message = new Paho.MQTT.Message(noiseValue);
    message.destinationName = "iphone/" + window.localStorage.getItem('appUID') + "/noise";
    client.send(message);
}


function sendLighting() {
    console.log("sendLighting entered")
    lightingValue = globalData.lighting;
    message = new Paho.MQTT.Message(lightingValue);
    message.destinationName = "iphone/" + window.localStorage.getItem('appUID') + "/lighting";
    client.send(message);
}

function sendTemp() {
    console.log("sendTemp entered")
    tempValue = globalData.temp;
    message = new Paho.MQTT.Message(tempValue);
    message.destinationName = "iphone/" + window.localStorage.getItem('appUID') + "/temp";
    client.send(message);
}

function sendLightS() {
    console.log("sendLightS entered")
    lightSValue = globalData.LightS;
    message = new Paho.MQTT.Message(lightSValue);
    message.destinationName = "iphone/" + window.localStorage.getItem('appUID') + "/lightS";
    client.send(message);
}

function sendNoiseS() {
    console.log("sendNoiseS entered")
    noiseSValue = globalData.NoiseS;
    message = new Paho.MQTT.Message(noiseSValue);
    message.destinationName = "iphone/" + window.localStorage.getItem('appUID') + "/noiseS";
    client.send(message);
}
    // *** end sensor data ***
    


});
// *** end submit function ***
                  


                  





});


