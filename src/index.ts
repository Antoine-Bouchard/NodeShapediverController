import "reflect-metadata"
import express from 'express'
import { Logger } from 'tslog';
import path from "path";
import {createSession} from "@shapediver/viewer"

const app = express()

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

const port = 3000
const log: Logger = new Logger();


import sessionRoutes from './ShapeDiverEndpoints/sessionEndpoint';
import expressLayouts from 'express-ejs-layouts';

app.use('/dist', express.static('dist'))

app.get('/', (req, res) => {
	res.render("index")
});

// health check production server
app.get('/healthCheck', (req, res) => {
    log.warn(`Health check request from ${req.ip}: ${req.hostname}`)
    res.status(200).send('Server is responding as expected')
})

// ShapeDiverSession
app.use('/session', sessionRoutes)

/// testing purposes
const session1 = await createSession({
    ticket:
      "319f14f08c1e67a874fd843acecfd321049772deb0cdb5a0dbb39385592a156e83730e45c5e7af5eab52e15b1e36d44a092f71ada1331e1935b0f25d9448af34d0add0bd5abf8984325b97ee9e6106b25216446d15a86bb18b40114df89d2f5909b08e8c8b9eeb-7516be37cb2d968a0b3c545baf3ae51e",
    modelViewUrl: "https://sdeuc1.eu-central-1.shapediver.com",
    id: "mySession1"
  });

  // create a session 2
  const session2 = await createSession({
    ticket:
      "1f7d4fd2b94916d5548ee31fb39ccc2edb73d21be3fb3dc5511b61271b9f12ec7a2c36bc750c61e1f2c4f62da8db065d686624f8b51d2f6e793a49380744f81d5a9d35a9fc302ac713a7786e9985082678b9dce17a30d387c149d970025c2ce9e7a785acd18ab3-c958c4d50d48072e9ce0905913b6e774",
    modelViewUrl: "https://sdeuc1.eu-central-1.shapediver.com",
    id: "mySession2"
  });

  log.info(session1)
  log.info(session2)


// ShapeDiverParameters

// ShapeDiverExports

// Start server
if (process.env.NODE_ENV !== 'test') {
    app.listen(port, () => {
        log.info(`Example app listening on port ${port}`)
    })
}

export default app