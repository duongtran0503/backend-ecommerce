const jwt = require('jsonwebtoken');
const genneralAcessToken = async (payload) => {
    const access_token = jwt.sign(payload, 'access_token', {
        expiresIn: '1h',
    });
    return access_token;
};
const genneralRefreshToken = async (payload) => {
    const refresh_Token = jwt.sign(payload, 'refresh_Token', {
        expiresIn: '365d',
    });
    return refresh_Token;
};
module.exports = { genneralAcessToken, genneralRefreshToken };
