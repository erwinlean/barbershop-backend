let loginAttempts = {};      
const MAX_LOGIN_ATTEMPTS = 3;

const rateLimitMiddleware = (req, res, next) => {
    const ip = req.ip;

    if (!loginAttempts[ip]) {
        loginAttempts[ip] = 1;
    } else {
        if (loginAttempts[ip] >= MAX_LOGIN_ATTEMPTS) {
            return res.status(429).json({ error: 'Too many requests. Please try again later.' });
        } else {
            loginAttempts[ip]++;
        }
    }

    next();
};

module.exports = rateLimitMiddleware;