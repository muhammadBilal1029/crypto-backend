"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _express = require('express');
var _HistoryRegisterController = require('./controller/HistoryRegisterController.ts/HistoryRegisterController');
var _RegisterCoinController = require('./controller/RegisterCoinController/RegisterCoinController');
var _TakeCoinsController = require('./controller/TakeCoinsController/TakeCoinsController');
var _TakeCoinsFilterController = require('./controller/TakeCoinsFilterController/TakeCoinsFilterController');
var _TakeCoinSpecificController = require('./controller/TakeCoinSpecificController/TakeCoinSpecificController');
var _CreateUserController = require('./controller/CreateUserController/CreateUserController');
var _AuthenticatedUserController = require('./controller/AuthenticatedUserController/AuthenticatedUserController');
var _TakeFavoriteController = require('./controller/TakeFavoriteController/TakeFavoriteController');
// var _prisma = require('');
var _AddToFavoriteController = require('./controller/AddToFavoriteController/AddToFavoriteController');
var _RemoveFavoriteController = require('./controller/RemoveFavoriteController/RemoveFavoriteController');
var prisma=require('../dist/utils/prisma');
const router = _express.Router.call(void 0, );
router.post('/alertform', async (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  try {
    const newAlertData = await prisma.prisma.AlertData.create({
      data: {
        name,
        email,
        message,
      },
    });
    res.status(201).json(newAlertData);
  } catch (error) {
   
    res.status(500).json({ error: 'An error occurred' });
  }
});
router.post(
  "/register/coin",
  // ensureAuthenticated,
  new (0, _RegisterCoinController.RegisterCoinController)().handle
);

router.get("/coin/take/all", new (0, _TakeCoinsController.TageCoinsController)().handle);

router.get("/new/history", new (0, _HistoryRegisterController.HistoryRegisterController)().handle);

router.get(
  "/coin/take/:id",
  // ensureAuthenticated,
  new (0, _TakeCoinSpecificController.TakeCoinSpecificController)().handle
);

router.get(
  "/coin/filter/front",
  // ensureAuthenticated,
  new (0, _TakeCoinsFilterController.TakeCoinsFilterController)().handle
);

router.post("/create/user", new (0, _CreateUserController.CreateUserController)().handle);

router.post("/authenticated/user", new (0, _AuthenticatedUserController.AuthenticatedUserController)().handle);

router.post(
  "/addtofavorite",
  // ensureAuthenticated,
  new (0, _AddToFavoriteController.AddToFavoriteController)().handle
);

router.get(
  "/favorite/user",
  // ensureAuthenticated,
  new (0, _TakeFavoriteController.TakeFavoriteController)().handle
);

router.post(
  "/removefavorite",
  // ensureAuthenticated,
  new (0, _RemoveFavoriteController.RemoveFavoriteController)().handle
);

exports.router = router;
