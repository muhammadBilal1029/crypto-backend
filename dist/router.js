"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _express = require('express');
var _HistoryRegisterController = require('./controller/HistoryRegisterController.ts/HistoryRegisterController');
var _RegisterCoinController = require('./controller/RegisterCoinController/RegisterCoinController');
var _TakeCoinsController = require('./controller/TakeCoinsController/TakeCoinsController');
var _TakeCoinsFilterController = require('./controller/TakeCoinsFilterController/TakeCoinsFilterController');
var _TakeCoinSpecificController = require('./controller/TakeCoinSpecificController/TakeCoinSpecificController');
var _CreateUserController = require('./controller/CreateUserController/CreateUserController');
var _AuthenticatedUserController = require('./controller/AuthenticatedUserController/AuthenticatedUserController');
var _TakeFavoriteController = require('./controller/TakeFavoriteController/TakeFavoriteController');

var _AddToFavoriteController = require('./controller/AddToFavoriteController/AddToFavoriteController');
var _RemoveFavoriteController = require('./controller/RemoveFavoriteController/RemoveFavoriteController');

const router = _express.Router.call(void 0, );

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
