import { createClient } from 'redis';

const func = async () => {
    const client = createClient();

    client.on('error', (err) => console.error('Redis Client Error', err));

    try {
        await client.connect();
        console.log('Redis client connected to the server');

        const schools = {
            Portland: 50,
            Seattle: 80,
            'New York': 20,
            Bogota: 20,
            Cali: 40,
            Paris: 2,
        };

        for (const [key, value] of Object.entries(schools)) {
            const reply = await client.hSet('HolbertonSchools', key, value);
            console.log(`Reply: ${reply}`);
        }
        const response = await client.hGetAll('HolbertonSchools');
        const regular = Object.fromEntries(Object.entries(response));
        console.log(regular);
    } catch (err) {
        console.error('Error:', err);
    }
};

func();
