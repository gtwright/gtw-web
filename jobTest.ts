import { getPayload } from 'payload'
import configPromise from '@payload-config'

const payload = await getPayload({ config: configPromise })
const createdJob = await payload.jobs.queue({
  // Pass the name of the workflow
  workflow: 'testingWorkflow',
  // The input type will be automatically typed
  // according to the input you've defined for this workflow
  input: {
    title: 'test title',
  },
})

console.log('createdJob', createdJob)
