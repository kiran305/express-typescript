import express from 'express'
import { User } from '@/models/user.model';
import ApiError from '@/utils/ApiError';
import httpStatus from 'http-status';


export const login = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email })
        if (!user || !user.validPassword(password))
            throw new ApiError(httpStatus.UNPROCESSABLE_ENTITY, 'Invalid email or password')
        res.json(user.toAuthJSON())
    } catch (e) {
        next(e)
    }
}


export const register = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        try {
            const { first_name, last_name, email, password } = req.body
            const user = new User()
            user.first_name = first_name
            user.last_name = last_name
            user.email = email
            user.setPassword(password)
            await user.save()
            res.json(user.toAuthJSON())
        } catch (e: any) {
            if (e && e.name === 'MongoError') return res.status(httpStatus.BAD_REQUEST).send(e)
            next(e)
        }
    } catch (e) {
        next(e)
    }
}

export const me = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        res.send(req.user)
    } catch (e) {
        next(e)
    }
}