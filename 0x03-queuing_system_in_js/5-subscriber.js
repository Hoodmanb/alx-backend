import { createClient } from "redis";

const func = async () => {
    const subscriber = createClient();
    subscriber.on("error", (err) => { console.log(`Redis client not connected to the server: ${err}`) })
    try {
        await subscriber.connect();
        console.log('Redis client connected to the server')
        subscriber.subscribe('holberton school channel', (message) => {
            if (message === 'KILL_SERVER') {
                (async function () {
                    await subscriber.unsubscribe()
                    await subscriber.quit();
                })();
            } else {
                console.log(message)
            }
        })
    } catch (err) {
        console.log(err)
    }
}

func()