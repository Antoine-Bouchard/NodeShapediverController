import express, { Request, Response } from "express";
import { Session } from "../types/SDSession";
import { createSession } from "@shapediver/viewer";
import { Logger } from "tslog";

const temporaryTickets: Session[] = [
  {
    id: "1",
    ticket:
      "d9712f4bd9dd4ec184fe56ce36b0857a0a264d64fbfdae5e9696b51dba438c13747a0564d6566e8b5d828bd11203e368e1976e3a1ee68ddfdcbec068ed986a738c1476dd5bedc59a9fcb7f78c4d9ab8a1d93e5cf4f77a7f8f5c218f975316d936dde92cbd268e9-61895092c435c333f7f96e53fcdaeedb",
    modelViewUrl: "https://sdr7euc1.eu-central-1.shapediver.com",
  },

  {
    id: "2",
    ticket:
      "85d9977f5426033e058a60c8b81c2c91d331d5eec7bdfed66d354132539d4efb0d01bd6e5d7bc61bc8894b820fff1922d2a2e7e6b7f5883d244f93f0c9ce73daa540ccd7b6d1a1d9ccc40307c3549ff3bbce1a7e902ac438abb53b472d73f2fd2578881f8846e73c4af238f34b9725c41232a2e3129d-d34ace0dbe577c6152ee63654b9e807c",
    modelViewUrl: "eu-central-1",
  },
];

const sessionRoutes = express.Router();
const log: Logger = new Logger();

sessionRoutes.get("/", (req: Request, res: Response) => {
  res.status(200).send(temporaryTickets);
});
sessionRoutes.get("/open", async (req: Request, res: Response) => {
  log.info("open body : " + JSON.stringify(req.body));
  if (!req.body) return res.status(402).send(req);
  const session = await createSession({
    ticket: req.body.ticket,
    modelViewUrl: req.body.modelViewUrl,
    id: "mySession",
  });
  log.info(session);
  res.status(200).send(session.id);
});

sessionRoutes.get("/open/base", async (req: Request, res: Response) => {
  const session = await createSession({
    ticket: temporaryTickets[1].ticket,
    modelViewUrl: temporaryTickets[1].modelViewUrl,
    id: "mySession",
  });
  res.status(200).send(session.id);
});

export default sessionRoutes;
