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
// var _prisma = require('../../utils/prisma');
const router = Router();
// router.post('/alertform', async (req, res) => {
//   const { name, email, message } = req.body;

//   if (!name || !email || !message) {
//     return res.status(400).json({ error: 'All fields are required' });
//   }

//   try {
//     const newAlertData = await _prisma.prisma.AlertData.create({
//       data: {
//         name,
//         email,
//         message,
//       },
//     });
//     res.status(201).json(newAlertData);
//   } catch (error) {
//     res.status(500).json({ error: 'An error occurred' });
//   }
// });
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
