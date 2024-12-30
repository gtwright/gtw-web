import { getPayload } from 'payload'
import configPromise from '@payload-config'
const currentDate = new Date()
const payload = await getPayload({ config: configPromise })
const createdJob = await payload.jobs.queue({
  // Pass the name of the workflow
  task: 'schedulePublish',
  waitUntil: new Date(currentDate.getTime() + 3000),
  // The input type will be automatically typed
  // according to the input you've defined for this workflow
  input: {
    type: 'publish',
    doc: {
      relationTo: 'pages',
      value: 3,
    },
  },
})

console.log('createdJob', createdJob)
process.exit(0)
