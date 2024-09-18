import { Router } from "express";
import { HistoryRegisterController } from "./controller/HistoryRegisterController.ts/HistoryRegisterController";
import { RegisterCoinController } from "./controller/RegisterCoinController/RegisterCoinController";
import { TageCoinsController } from "./controller/TakeCoinsController/TakeCoinsController";
import { TakeCoinsFilterController } from "./controller/TakeCoinsFilterController/TakeCoinsFilterController";
import { TakeCoinSpecificController } from "./controller/TakeCoinSpecificController/TakeCoinSpecificController";
import { CreateUserController } from "./controller/CreateUserController/CreateUserController";
import { AuthenticatedUserController } from "./controller/AuthenticatedUserController/AuthenticatedUserController";
import { TakeFavoriteController } from "./controller/TakeFavoriteController/TakeFavoriteController";
import { ensureAuthenticated } from "./middleware/ensureAuthenticated";
import { AddToFavoriteController } from "./controller/AddToFavoriteController/AddToFavoriteController";
import { RemoveFavoriteController } from "./controller/RemoveFavoriteController/RemoveFavoriteController";

const router = Router();

router.post(
  "/register/coin",
  // ensureAuthenticated,
  new RegisterCoinController().handle
);

router.get("/coin/take/all", new TageCoinsController().handle);

router.get("/new/history", new HistoryRegisterController().handle);

router.get(
  "/coin/take/:id",
  // ensureAuthenticated,
  new TakeCoinSpecificController().handle
);

router.get(
  "/coin/filter/front",
  // ensureAuthenticated,
  new TakeCoinsFilterController().handle
);

router.post("/create/user", new CreateUserController().handle);

router.post("/authenticated/user", new AuthenticatedUserController().handle);

router.post(
  "/addtofavorite",
  // ensureAuthenticated,
  new AddToFavoriteController().handle
);

router.get(
  "/favorite/user",
  // ensureAuthenticated,
  new TakeFavoriteController().handle
);

router.post(
  "/removefavorite",
  // ensureAuthenticated,
  new RemoveFavoriteController().handle
);

export { router };
