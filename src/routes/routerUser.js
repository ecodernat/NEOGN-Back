const { Router } = require("express");

const upload = require("../services/multer/config");

const getUsers = require("../controllers/User/getUsers");
const getUserById = require("../controllers/User/getUserById");
const deleteUser = require("../controllers/User/deleteUser");
const signUp = require("../controllers/User/signUp");
const login = require("../controllers/User/login");
const postProfileImg = require("../controllers/User/postProfileImg");
const restoreUser = require("../controllers/User/restoreUser");
const putUser = require("../controllers/User/putUser");

const router = Router();

// GET
router.get("/", async (req, res) => {
  try {
    const users = await getUsers();

    return res.status(200).json(users);
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

//POST
router.post("/signup", async (req, res) => {
  try {
    const { name, username, email, password, photo } = req.body;
    console.log(req.body);

    const newUser = await signUp({ name, username, email, password, photo });

    return res.status(200).json(newUser);
  } catch (error) {
    console.log(error.message);

    res.status(400).send(error.message);
  }
});

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

// router.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await login(email, password);

//     const { accessToken, refreshToken } = signTokens(user.id);

//     return res.status(200).json({ access: true, accessToken, refreshToken });
//   } catch (error) {
//     console.log(error.message);

//     res.status(400).send(error.message);
//   };
// });

// Refresh token
// router.post("/refresh", refreshToken, (req, res) => {
//   try {
//     const newAccessToken = req.locals.newAccessToken;
//     const newRefreshToken = req.locals.newRefreshToken;

//     if (!newAccessToken || !newRefreshToken) {
//       throw new Error("Unable to renew access tokens.");
//     }

//     res.status(200).json({ auth: true, accessToken: newAccessToken, refreshToken: newRefreshToken });
//   } catch (error) {
//     console.log(error.message);

//     res.status(400).json({ auth: false, message: error.message });
//   };
// });

module.exports = router;
