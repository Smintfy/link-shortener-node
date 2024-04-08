import request from "supertest";
import jwt from "jsonwebtoken";

import app from "../src/app";

defaultUser = {
    username: process.env.TEST_USERNAME,
    password: process.env.TEST_PASSWORD,
};

function login() {}

describe("POST /api/link", () => {
    it("should create a shortened url from the provided url", async () => {
        // TODO
    });
});
