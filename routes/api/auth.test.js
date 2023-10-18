const mongoose = require("mongoose");
const request = require("supertest");
const bcrypt = require("bcrypt");

const app = require("../../app");
const User = require("../../models/user");

const { DB_HOST_TEST, PORT = 3000 } = process.env;

describe("test routes", () => {
    let server = null;
    beforeAll(async () => {
        server = app.listen(PORT);
        await mongoose.connect(DB_HOST_TEST);
    });

    afterAll(async () => {
        server.close();
        await mongoose.connection.close();
    });

    // beforeEach(() => {});

    afterEach(async () => {
        await User.deleteMany({});
    });

    test("test login route", async () => {
        const password = await bcrypt.hash("Test123456", 10);

        const newUser = {
            name: "Test user",
            email: "test@email.com",
            password,
            avatarURL:
                "//www.gravatar.com/avatar/93942e96f5acd83e2e047ad8fe03114d",
        };
        const user = await User.create(newUser);

        const loginUser = {
            email: "test@email.com",
            password: "Test123456",
        };

        const res = await request(app).post("/api/auth/login").send(loginUser);
        expect(res.statusCode).toBe(200);
        expect(res.body.token).toBeTruthy();

        const { token } = await User.findById(user._id);
        expect(res.body.token).toBe(token);

        expect(res.body.user).toHaveProperty("email");
        expect(res.body.user).toHaveProperty("subscription");

        expect(typeof res.body.user.email).toBe("string");
        expect(typeof res.body.user.subscription).toBe("string");
    });

    test("test register route with correct data", async () => {
        const registerData = {
            name: "Register user",
            email: "register@email.com",
            password: "Test123456",
        };

        const res = await request(app)
            .post("/api/auth/register")
            .send(registerData);

        expect(res.statusCode).toBe(201);

        expect(res.body.user).toHaveProperty("email");
        expect(res.body.user).toHaveProperty("subscription");

        expect(typeof res.body.user.email).toBe("string");
        expect(typeof res.body.user.subscription).toBe("string");

        expect(res.body.user.email).toBe(registerData.email);
        expect(res.body.user.subscription).toBe("starter");

        const user = await User.findOne({ email: registerData.email });
        expect(user.name).toBe(registerData.name);
    });
});
