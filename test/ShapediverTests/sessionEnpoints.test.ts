
import request from "supertest"
import app from "../../src/index"

describe("Session tests suite", () => {
    it("fetch list of sessions, gets first values", async () => {
        const response = await request(app)
            .get("/session/")
            .send();

        expect(response.statusCode).toBe(200)
        expect(response.body[0].id).toBe("1")
    })

    it("Request base session should pass", async () => {

        const sessionID = await request(app)
            .get("/session/open/base")
            .send()

        expect(sessionID.statusCode).toBe(200)
        console.log(sessionID)
        expect(sessionID.body.id).toBeInstanceOf(String);
    })

    it("Request session with ID should pass", async () => {

        const response = await request(app)
            .get("/session/")
            .send();

        const sessionID = await request(app)
            .get("/session/open")
            .send({
                ticket: response.body[0].ticket,
                modelViewUrl: response.body[0].modelViewUrl
            })

        expect(sessionID.statusCode).toBe(200)
        console.log(sessionID)
        expect(sessionID.body.id).toBeInstanceOf(String);
    })


})