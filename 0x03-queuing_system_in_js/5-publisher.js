import { createClient } from "redis";

const publisher = createClient();

(async () => {
    publisher.on('error', (err) => { console.log(err) });

    try {
        await publisher.connect();
        console.log('Redis client connected to the server')
    } catch (err) {
        console.log(err)
    }
})()

const publishMessage = async (message, time) => {
    setTimeout(() => {
        console.log(`About to send ${message}`)
    }, time);
    await publisher.publish('holberton school channel', message)
}

publishMessage("Holberton Student #1 starts course", 100);
publishMessage("Holberton Student #2 starts course", 200);
publishMessage("KILL_SERVER", 300);
publishMessage("Holberton Student #3 starts course", 400);