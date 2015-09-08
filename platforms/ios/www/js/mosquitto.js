var wsbroker = "86.119.31.113";
var wsport = 9001;
var client = new Paho.MQTT.Client(wsbroker, wsport,
                                  "myclientid_" + parseInt(Math.random() * 100, 10));

client.onConnectionLost = function (responseObject) {
    console.log("connection lost: " + responseObject.errorMessage);
};
client.onMessageArrived = function (message) {
    console.log(message.destinationName, ' -- ', message.payloadString);
};

var options = {
timeout: 3,
    
onSuccess: function () {
    console.log("mqtt connected");
    // Connection succeeded; subscribe to our topic, you can add multile lines of these
    //client.subscribe('/World', {qos: 1});
    
    // publish to a topic on connect
    message = new Paho.MQTT.Message("New User connected: " + window.localStorage.getItem('appUID'));
    message.destinationName = "/Connected";
    client.send(message);
    
},
onFailure: function (message) {
    console.log("Connection failed: " + message.errorMessage);
}
};
function initClient() {
    client.connect(options);
}


function sendJSON() {
    console.log("sendJSON entered")
    jsonString = JSON.stringify(globalData);
    message = new Paho.MQTT.Message(jsonString);
    message.destinationName = "/Data";
    client.send(message);
    window.location.href="question.html";
}


