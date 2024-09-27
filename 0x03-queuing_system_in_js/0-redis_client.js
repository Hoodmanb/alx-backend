import { createClient } from 'redis';

const connectToRedis = async () => {
    client.on('error', err => console.log(`Redis client not connected to the server: ${err}`));


    try {
        await client.connect();
        console.log('Redis client connected to the server');
    } catch (err) {
        console.log(`Redis client not connected to the server: ${err}`);
    }
}

connectToRedis();