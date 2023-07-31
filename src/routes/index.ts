/**
 * @openapi
 * /:
 *   get:
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns a mysterious string.
 */

import express from 'express'
import passport from 'passport'
import * as AuthController from '@/controllers/AuthController';

const router = express.Router()

router.post('/login', AuthController.login)

router.post('/register', AuthController.register)

router.get('/me', passport.authenticate('jwt', { session: false }), AuthController.me)

export default router
