import { Router } from "express";
import yupValidator from "../../middlewares/validator";
import {
  yupLoginSchema,
  yupObjIdSchema,
  yupSignupSchema,
} from "../../models/schemas/schema";
import { handleLogin } from "./controllers/login.service";
import { handleProfileView } from "./controllers/profileView.service";
import { handleSignUp } from "./controllers/signup.service";

const userRouter = Router();

userRouter.post("/login", yupValidator("body", yupLoginSchema), handleLogin);
userRouter.post("/signup", yupValidator("body", yupSignupSchema), handleSignUp);
userRouter.get(
  "/:id",
  yupValidator("params", yupObjIdSchema),
  handleProfileView
);

export default userRouter;
