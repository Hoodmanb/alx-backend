import kue from "kue"
const queue = kue.createQueue();

const jobObj = {
    phoneNumber: '4153518780',
    message: 'This is the code to verify your account',
}

const job = queue.createJob('contact', jobObj).save((err) => {
    if (err) {
        console.log('Notification job failed')
    } else {
        console.log(`Notification job created: ${job.id}`)
    }
})

job.on('complete', () => {
    console.log('Notification job completed');
}).on('failed', (err) => {
    console.log('Notification job failed');
})