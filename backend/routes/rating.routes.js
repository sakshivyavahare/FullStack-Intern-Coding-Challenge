const express = require("express");
const router = express.Router();
const ratingController = require("../controllers/rating.controller");
const { authMiddleware } = require("../middleware/auth.middleware");

router.post("/", authMiddleware, ratingController.submitOrUpdateRating);
router.get("/store/:storeId", authMiddleware, ratingController.getRatingsForStore);

module.exports = router;
