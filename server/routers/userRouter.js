const router = require("express").Router();
const userController = require("../controllers/userController");
const authMiddleware = require("../middleware/authentication");

router.use(authMiddleware.protected);

router
  .route("/me")
  .get(userController.showMe)
  .patch(userController.updateMe)
  .delete(userController.deleteMe);

router.use(authMiddleware.restrictedTo("admin"));

router.route("/").get(userController.showUsers).post(userController.createUser);
router
  .route("/:id")
  .get(userController.showUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
