import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import dotenv from 'dotenv'

dotenv.config()

interface Payload {
    sub: string,

}

export function isAuthenticated(
    req: Request,
    res: Response,
    next: NextFunction) {

    // Get token
    const authToken = req.headers.authorization

    if (!authToken) {
        return res.status(401).end()
    }

    const [, token] = authToken.split(' ')

    try {
        // Validate token
        const { sub } = verify(
            token,
            process.env.JWT_SECRET as string
        ) as Payload

        // Get token id and put on request
        req.user_id = sub

        return next()

    } catch (e) {
        res.status(401).end()
    }
}

