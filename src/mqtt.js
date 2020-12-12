const client = new Paho.MQTT.Client('10.251.251.11', 9001, '/', 'dash');

client.connect({
    onSuccess: () => {
        console.log('connected!');
        client.subscribe('#', {qos: 1});
    },
    onFailure: (e) => {
        console.error(e);
    }
});


client.onMessageArrived = (message) => {
    console.log(`${message.destinationName}: ${message.payloadString}`);
};
