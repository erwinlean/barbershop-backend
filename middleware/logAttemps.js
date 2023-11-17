let loginAttempts = {};
const MAX_LOGIN_ATTEMPTS = 3;
const LOCKOUT_TIME = 10 * 60 * 1000; 

const rateLimitMiddleware = (req, res, next) => {
    const ip = req.ip;

    if (!loginAttempts[ip]) {
        loginAttempts[ip] = {
            count: 1,
            lastAttempt: new Date(),
        };
    } else {
        const now = new Date();
        const timeSinceLastAttempt = now - loginAttempts[ip].lastAttempt;

        if (timeSinceLastAttempt < LOCKOUT_TIME) {
            return res.status(429).json({ error: 'Reintenta más tarde.' });
        } else {
            loginAttempts[ip] = {
                count: 1,
                lastAttempt: now,
            };
        };
    };

    next();
};

module.exports = rateLimitMiddleware;