import express, { Request, Response } from 'express';
import { Session } from '../types/SDSession';
import { createSession, sessions } from "@shapediver/viewer";
import { Logger } from 'tslog';

const temporaryTickets: Session[] = [
    {
        id: "1",
        ticket:
            "d9712f4bd9dd4ec184fe56ce36b0857a0a264d64fbfdae5e9696b51dba438c13747a0564d6566e8b5d828bd11203e368e1976e3a1ee68ddfdcbec068ed986a738c1476dd5bedc59a9fcb7f78c4d9ab8a1d93e5cf4f77a7f8f5c218f975316d936dde92cbd268e9-61895092c435c333f7f96e53fcdaeedb",
        modelViewUrl: "https://sdr7euc1.eu-central-1.shapediver.com",

    },
]

const sessionRoutes = express.Router();
const log: Logger = new Logger();

sessionRoutes.get('/', (req: Request, res: Response) => {
    res.status(200).send(temporaryTickets)
})
sessionRoutes.get('/open', async (req: Request, res: Response) => {
    log.info('open body : ' + JSON.stringify(req.body))
    if (!req.body) return res.status(402).send(req);
    const session = await createSession({ ticket: req.body.ticket, modelViewUrl: req.body.modelViewUrl, id: "mySession" });
    log.info(session)
    res.status(200).send(session.id)

})

sessionRoutes.get('/open/base', async (req: Request, res: Response) => {
    const session = await createSession({ ticket: temporaryTickets[0].ticket, modelViewUrl: temporaryTickets[0].modelViewUrl, id: "mySession" });
    res.status(200).send(session.id)
})


export default sessionRoutes;
