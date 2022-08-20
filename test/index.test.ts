// describe(" tests", () => {
//     test("Math test", () => {
//         expect(2 + 2).toBe(4);
//     });
// });

import request from "supertest"
import app from "../src/index"

describe("Server runs", () => {
    it("Server should respond", async () => {
        const response = await request(app)
            .get("/healthCheck")
            .send();

        expect(response.statusCode).toBe(200)
        expect(response.text).toBe("Server is responding as expected")
    })
})
