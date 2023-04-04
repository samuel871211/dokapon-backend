import express, { Request, Response } from "express";
const app = express();
app.use(
  "/imgs",
  express.static(`${__dirname}/src/static/imgs`, { maxAge: 31536000 })
);
app.get("/", (req: Request, res: Response) =>
  res.send("welcome to dokapon API Service")
);
app.listen(5000);

export default app;
