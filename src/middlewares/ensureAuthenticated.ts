import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

interface IPayload {
    sub: string;
}

export function ensureAuthenticated(request: Request, response: Response, next: NextFunction) {
    const authToken = request.headers.authorization;

    if (!authToken) {
        return response.status(401).end();
    }

    try {
        const { sub } = verify(authToken.split(' ')[1], "c81a33975043b20a0cd0b4d2c7046665") as IPayload;

        request.user_id = sub;

        return next();
    } catch (err) {
        return response.status(401).end();
    }
}