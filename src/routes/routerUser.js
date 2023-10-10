const { Router } = require("express");

const upload = require("../services/multer/config");

// const { tokenValidator } = require("../middlewares/jsonWebToken");

const getUsers = require("../controllers/User/getUsers");
const getUserById = require("../controllers/User/getUserById");
const deleteUser = require("../controllers/User/deleteUser");
const signUp = require("../controllers/User/signUp");
// const userLogin = require("../controllers/User/login");
const postProfileImg = require("../controllers/User/postProfileImg");
const restoreUser = require("../controllers/User/restoreUser");
const putUser = require("../controllers/User/putUser");

const router = Router();

// GET
router.get("/", async (req, res) => {
  try {
    const users = await getUsers();

    res.status(200).json(users);
  } catch (error) {
    console.log(error.message);

    res.status(400).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const user = await getUserById(id);

    return res.status(200).json(user);
  } catch (error) {
    console.log(error.message);

    res.status(400).json({ error: error.message });
  }
});

//LOGICAL DELETION
router.delete("/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const message = await deleteUser(id);

    return res.status(200).json({ message });
  } catch (error) {
    console.log(error.message);

    res.status(400).json({ error: error.message });
  }
});

router.put("/restore/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await restoreUser(id);

    res.status(200).json({ message: "The user has been restored" });
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: error.message });
  }
});

// SignUp
router.post("/signup", async (req, res) => {
  try {
    const { clientId, name, email, photo } = req.body;

    const response = await signUp({ clientId, name, email, photo });

    res.status(200).json(response);
  } catch (error) {
    console.log(error.message);
    res.status(400).send({ error: error.message });
  }
});

// Login
// router.post("/login", tokenValidator, async (req, res) => {
//   try {
//     const token = req.headers.authorization?.split(" ")[1];
//     const { username, password, email, phone } = req.body;
//     const userToLogin = await userLogin(
//       username,
//       password,
//       email,
//       phone,
//       token
//     );
//     res.status(200).json(userToLogin);
//   } catch (error) {
//     console.log(error.message);
//     res.status(400).json({ error: error.message });
//   }
// });

router.put("/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const user = await putUser(id, data);

    res.status(200).json(user);
  } catch (error) {
    console.log(error.message);
    res.status(400).json({ error: error.message });
  }
});

router.post("/profile/:id", upload.single("image"), postProfileImg);

module.exports = router;
