import jwt from 'jsonwebtoken';

const SECRET_KEY = '123456789';
const SECRET_KEY_REFRESH = '123456789_refresh';
const expiresIn = '5h';

export const createToken = (payload, refresh) => {
    if (!refresh) {
        return jwt.sign(payload, SECRET_KEY, { expiresIn });
    }
    return jwt.sign(payload, SECRET_KEY_REFRESH, { expiresIn });
};

//will be added to router as params
export const authenToken = (req, res, next) => {
    const authorizationHeader = req.headers['authorization'];
    const token = authorizationHeader.split(' ')[1];
    if (!token) res.sendStatus(401);
    jwt.verify(token, SECRET_KEY, (error, decode) => {
        // console.log('expiry', decode && new Date(decode.exp * 1000));
        if (error) res.sendStatus(403);
        next();
    });
};
