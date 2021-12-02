import { Router } from "express";
import { check } from "express-validator";
import { getAllUsers, login, signup } from "../controllers/userControllers.js";

const router = Router();

router.post('/signup', [
    check('username', 'Username is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').not().isEmpty()
], signup);

router.post('/login', [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').not().isEmpty()
], login);

router.get('/users', getAllUsers);

export default router;