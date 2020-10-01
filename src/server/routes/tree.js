const express = require("express");
const router = express.Router();

const auth = require("../middlewares/auth");
const treeCtrl = require("../controllers/tree");

router.get("/api/tree", auth, treeCtrl.getAllTrees);
router.get(":id", auth, treeCtrl.getOneTree);
router.put("/api/tree/:id", auth, treeCtrl.updateOneThree);

module.exports = router;
