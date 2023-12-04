import { config } from 'dotenv'

import { createConnection } from 'mysql2'

if (process.env.NODE_ENV === 'prod') {
  config({
    path: '../../.env.prod'
  })
} else {
  config()
}

export const db = createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: parseInt(process.env.DB_PORT),
  password: process.env.DB_PASSWORD,
  database: 'multi_app_db'
})
