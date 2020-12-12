import {readable} from "svelte/store";

export const remoteState = readable({connection: 'pending', data: {}}, (set) => {
    const client = new Paho.MQTT.Client('10.251.251.11', 9001, '/', `homedashboard-${Date.now()}`);
    const state = {
        connection: 'pending',
        data: {}
    };
    client.connect({
        onSuccess: () => {
            state.connection = 'success';
            set(state);
            client.subscribe('miflora/#', {qos: 0});
            client.subscribe('hue/#', {qos: 0});
        },
        onFailure: (e) => {
            state.connection = 'failed';
            set(state);
            console.error(e);
        }
    });

    client.onMessageArrived = (message) => {
        const path = message.destinationName.split('/');
        let value = Number(message.payloadString);
        if (isNaN(value)) {
            value = message.payloadString;
        }

        let target = state.data;

        for (let i = 0; i < path.length - 1; i++) {
            let elem = path[i];
            if (elem in target) {
                target = target[elem];
            } else {
                target[elem] = {};
                target = target[elem];
            }
        }

        const leaf = path[path.length - 1];
        if (leaf.startsWith('$')) {
            target[leaf.substring(1)] = value;
        } else if (target[leaf]) {
            target[leaf].value = value;
        } else {
            target[leaf] = {value};
        }
        set(state);
    };
});
