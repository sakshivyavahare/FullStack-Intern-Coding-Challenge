const express = require("express");
const router = express.Router();
const storeController = require("../controllers/store.controller");
const { authMiddleware, adminOnly } = require("../middleware/auth.middleware");

router.get("/", authMiddleware, storeController.getStores); // All users
router.post("/", authMiddleware, adminOnly, storeController.addStore); // Admin only
router.get("/:id", authMiddleware, storeController.getStoreById);

module.exports = router;
