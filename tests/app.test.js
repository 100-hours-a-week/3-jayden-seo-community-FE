const request = require("supertest");
const app = require("../app");

describe("🔥 Express App 기본 테스트", () => {

    test("GET / 요청 시 200을 반환해야 한다 (public폴더 정적 서빙)", async () => {
        const res = await request(app).get("/");
        expect(res.statusCode).toBe(200);
    });
});
