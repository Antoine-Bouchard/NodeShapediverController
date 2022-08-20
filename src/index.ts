import express from 'express'
import { Logger } from 'tslog';

const app = express()

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

const port = 3000
const log: Logger = new Logger();


import sessionRoutes from './ShapeDiverEndpoints/sessionEndpoint';

// health check production server
app.get('/healthCheck', (req, res) => {
    log.warn(`Health check request from ${req.ip}: ${req.hostname}`)
    res.status(200).send('Server is responding as expected')
})

// ShapeDiverSession
app.use('/session', sessionRoutes)

// ShapeDiverParameters

// ShapeDiverExports

// Start server
if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        log.info(`Example app listening on port ${port}`)
    })
}

export default app