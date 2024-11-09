import express from "express";
import Hello from "./routes/hello";
import Lab5 from "./routes/lab5";

const app = express();
const port = 4000;

Hello(app);
Lab5(app);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
