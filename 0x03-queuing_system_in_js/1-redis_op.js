import { createClient } from 'redis';

const client = createClient();

const connectToRedis = async () => {
    client.on('error', err => console.log(`Redis client not connected to the server: ${err}`));

    try {
        await client.connect();
        console.log('Redis client connected to the server');
    } catch (err) {
        console.log(`Redis client not connected to the server: ${err}`);
    }
}

const setNewSchool = async (schoolName, value) => {
    try {
        const reply = await client.set(schoolName, value);
        console.log(`${reply}`);
    } catch (err) {
        console.log(err);
    }
}

const displaySchoolValue = async (schoolName) => {
    try {
        const reply = await client.get(schoolName);
        if (reply) {
            console.log(`${reply}`);
        } else {
            console.log(`School ${schoolName} not found`);
        }
    } catch (err) {
        console.log(err);
    }
}

const run = async () => {
    await connectToRedis();

    await displaySchoolValue('Holberton');
    await setNewSchool('HolbertonSanFrancisco', '100');
    await displaySchoolValue('HolbertonSanFrancisco');
};

run();
