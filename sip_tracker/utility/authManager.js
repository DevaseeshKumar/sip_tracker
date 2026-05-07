const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'jlkjmgfhdgfvilkyugjfhgf';

const signJWT = (payload) => {
    try{
        const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
        return token;
    }
    catch(error){
        console.error('Error signing JWT:', error);
        throw new Error('Failed to generate token');
    }
};

const verifyJWT = (token) => {
    try{
        const decoded = jwt.verify(token, JWT_SECRET);
        return decoded;
    }
    catch(error){
        console.error('Error verifying JWT:', error);
        throw new Error('Invalid token');
    }
};

module.exports = {
    signJWT,
    verifyJWT
};