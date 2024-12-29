// storage-adapter-import-placeholder
import { vercelPostgresAdapter } from '@payloadcms/db-vercel-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig, PayloadRequest, TaskConfig, WorkflowConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'
import { beethoven } from './lib/schema'
import { Users } from './collections/Users'
import { Media } from './collections/Media'
import { Pages } from './collections/Pages'
import { Posts } from './collections/Posts'
import { Header } from './globals/Header'
import { Footer } from './globals/Footer'
import { getServerSideURL } from './lib/utils/getURL'
import { resendAdapter } from '@payloadcms/email-resend'
import { s3Storage } from '@payloadcms/storage-s3'
const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Pages, Posts, Media, Users],
  cors: [getServerSideURL()].filter(Boolean),
  db: vercelPostgresAdapter({
    beforeSchemaInit: [
      ({ schema }) => {
        return {
          ...schema,
          tables: {
            ...schema.tables,
            beethoven: beethoven,
          },
        }
      },
    ],
  }),
  editor: lexicalEditor(),
  email: resendAdapter({
    apiKey: process.env.RESEND_API_KEY || '',
    defaultFromAddress: 'g@gtw.dev',
    defaultFromName: 'GTW Dev',
  }),
  globals: [Header, Footer],
  jobs: {
    tasks: [
      {
        slug: 'testingTask',
        inputSchema: [
          {
            name: 'title',
            type: 'text',
            required: true,
          },
        ],
        outputSchema: [
          {
            name: 'outputTitle',
            type: 'text',
            required: true,
          },
        ],
        handler: async ({ input, job, req }) => {
          return {
            output: { outputTitle: input.title },
          }
        },
      } as TaskConfig<'testingTask'>,
    ],
    workflows: [
      {
        slug: 'testingWorkflow',
        queue: 'testingQueue',
        inputSchema: [
          {
            name: 'title',
            type: 'text',
            required: true,
          },
        ],
        handler: async ({ job, tasks }) => {
          console.log('Running workflow test', job.input)
          await tasks.testingTask('1', { input: { title: job.input.title } })
        },
      } as WorkflowConfig<'testingWorkflow'>,
    ],
    access: {
      run: ({ req }: { req: PayloadRequest }): boolean => {
        // Allow logged in users to execute this endpoint (default)
        console.log(req.user)
        if (req.user) return true
        // If there is no logged in user, then check
        // for the Vercel Cron secret to be present as an
        // Authorization header:
        const authHeader = req.headers.get('authorization')
        return authHeader === `Bearer ${process.env.CRON_SECRET}`
      },
    },
  },
  secret: process.env.PAYLOAD_SECRET || '',
  sharp,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  plugins: [
    s3Storage({
      collections: {
        media: {
          prefix: 'media',
        },
      },
      bucket: 'gtw-dev-1',

      config: {
        forcePathStyle: true,
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID || '',
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY || '',
        },
        region: process.env.S3_REGION || '',
        endpoint: process.env.S3_ENDPOINT || '',
      },
    }),
  ],
})
