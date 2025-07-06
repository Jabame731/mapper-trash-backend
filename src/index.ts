import express from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";

import { UserController } from "./interfaces";
import { WasteReportController } from "./interfaces";
import { UserUsecase } from "./usecases";
import { WasteReportUseCase } from "./usecases";
import { UserRepositoryIn } from "./infrastructure";
import { WasteReportRepositoryIn } from "./infrastructure";
import { authenticateToken } from "./interfaces";

const app = express();
dotenv.config();

// Middleware
app.use(bodyParser.json());

const userRepository = new UserRepositoryIn();

const userUsecase = new UserUsecase(userRepository);

const userController = new UserController(userUsecase);

const wasteRepository = new WasteReportRepositoryIn();

const wasteUsecase = new WasteReportUseCase(wasteRepository);

const wasteController = new WasteReportController(wasteUsecase);

// ----- routes ------- //

//user-routes
app.post("/api/register-user", (req, res) =>
  userController.registerUser(req, res)
);
app.post("/api/login-user", (req, res) => userController.loginUser(req, res));

//report-routes
app.post("/api/report", authenticateToken, (req, res) =>
  wasteController.createWasteReport(req, res)
);
app.get("/api/report", (req, res) => wasteController.getWasteReports(req, res));

// ----- end of routes ====== //

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`listening to port  ${port}`);
});
