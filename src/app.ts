import express from "express";
import cors from "cors";
import Hello from "./routes/hello";
import Lab5 from "./routes/lab5";

const port = process.env.PORT || 4000;
const app = express();
app.use(cors());
app.use(express.json());

Hello(app);
Lab5(app);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
