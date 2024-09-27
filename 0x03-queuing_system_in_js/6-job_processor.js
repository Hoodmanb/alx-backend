import kue from "kue"
const queue = kue.createQueue();
const sendNotification = (phoneNumber, message) => {
    console.log(`Sending notification to ${phoneNumber}, with message: ${message}`)
}

queue.process('contact', (job, done) => {
    sendNotification(job.data.phoneNumber, job.data.message)
})