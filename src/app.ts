import "dotenv/config";
import express from "express";
import cors from "cors";
import Hello from "./routes/hello";
import Lab5 from "./routes/lab5";
import UserController from "./kanbas/controller/user";
import session, { SessionOptions } from "express-session";
import CourseController from "./kanbas/controller/course";
import ModuleController from "./kanbas/controller/module";

const port = process.env.PORT || 4000;
const app = express();

app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL || "http://localhost:3000",
  })
);

const sessionOptions: SessionOptions = {
  secret: "any string",
  resave: false,
  saveUninitialized: false,
};

if (process.env.NODE_ENV !== "development") {
  sessionOptions.proxy = true;
  sessionOptions.cookie = {
    sameSite: "none",
    secure: true,
    domain: process.env.SERVER_DOMAIN,
  };
}

app.use(session(sessionOptions));

app.use(express.json());

UserController(app);
CourseController(app);
ModuleController(app);

Hello(app);
Lab5(app);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
