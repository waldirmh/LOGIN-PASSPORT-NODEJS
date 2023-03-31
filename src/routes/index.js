const express = require("express");
const { is } = require("express/lib/request");
const router = express.Router();
const passport = require("passport");

router.get("/", (req, res, next) => {
  res.render("index");
});
router.get("/signup", (req, res, next) => {
  res.render("signup"); // el usuario ingresa y el servidor responde con la ruta de signup
});

router.post(
  "/signup",
  passport.authenticate("local-signup", {
    successRedirect: "/profile", // si es correcto
    failureRedirect: "/signup", //si falla
    passReqToCallback: true,
  })
);

router.get("/signin", (req, res, next) => {
  res.render("signin");
});
router.post(
  "/signin",
  passport.authenticate("local-signin", {
    successRedirect: "/profile",
    failureRedirect: "/signin",
    passReqToCallback: true,
  })
);
//para cerrar sesion
/* router.get("/logout", (req, res, next) => {
  req.logout();
  res.redirect("/");
}); */

router.get("/logout", function (req, res, next) {
  req.logout(function (err) {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

router.use((req, res, next) => {
  isAuthenticated(req, res, next);
  next();
});

// validamos con la funcion autenticate
router.get("/profile", (req, res, next) => {
  res.render("profile");
});

router.get("/dashboard", isAuthenticated, (req, res, next) => {
  res.send("hello -dashboard");
});

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.redirect("/");
}
module.exports = router;
