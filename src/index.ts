import express, { Router } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";

import { UserController } from "./interface";

import { UserUsecase } from "./usecases";

import { UserRepositoryIn } from "./infrastructure";

const app = express();
dotenv.config();

// Middleware
app.use(bodyParser.json());

const userRepository = new UserRepositoryIn();

const userUsecase = new UserUsecase(userRepository);

const userController = new UserController(userUsecase);

const router = Router();

//routes
app.post("/registerUser", (req, res) => userController.registerUser(req, res));

const port = process.env.PORT;

app.listen(port, () => {
  console.log(`listening to port  ${port}`);
});
