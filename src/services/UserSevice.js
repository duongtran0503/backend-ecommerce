const User = require('./../models/UserModel');
const bcrypt = require('bcrypt');
const { genneralAcessToken, genneralRefreshToken } = require('./JwtService');
const createUser = (user) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findOne({ email: user.email });
            if (checkUser) {
                resolve({
                    status: 'warning',
                    message: 'Email already exists',
                });
            }
            const hash = bcrypt.hashSync(user.password, 10);
            user.password = hash;

            const handle = await User.create(user);
            if (!handle) {
                resolve({
                    status: 'error',
                    message: 'cant not create user',
                });
            }
            resolve({
                status: 'ok',
                message: 'create success',
                info: handle,
            });
        } catch (e) {
            reject(e);
        }
    });
};
const userLogin = (user) => {
    return new Promise(async (resolve, reject) => {
        const checkUser = await User.findOne({ email: user.email });
        if (!checkUser) {
            resolve({
                status: 'warning',
                message: 'Email does not exist',
            });
        }
        const handle = bcrypt.compareSync(user.password, checkUser.password);
        if (!handle) {
            resolve({
                status: 'error',

                message: 'login falid',
            });
        }
        const access_token = await genneralAcessToken({
            id: checkUser.id,
            isAdmin: checkUser.isAdmin,
        });
        const refresh_Token = await genneralRefreshToken({
            id: checkUser.id,
            isAdmin: checkUser.isAdmin,
        });
        resolve({
            status: 'ok',
            message: 'login success',
            access_token,
            refresh_Token,
        });
        try {
        } catch (e) {
            reject(e);
        }
    });
};
const updateUser = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findOne({
                _id: id,
            });
            if (checkUser === null) {
                resolve({
                    status: 'ERR',
                    message: 'The user is not defined',
                });
            }

            const updatedUser = await User.findByIdAndUpdate(id, data, {
                new: true,
            });
            resolve({
                status: 'OK',
                message: 'SUCCESS',
                data: updatedUser,
            });
        } catch (e) {
            reject(e);
        }
    });
};

const deleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findOne({
                _id: id,
            });
            if (checkUser === null) {
                resolve({
                    status: 'ERR',
                    message: 'The user is not defined',
                });
            }

            await User.findByIdAndDelete(id);
            resolve({
                status: 'OK',
                message: 'Delete user success',
            });
        } catch (e) {
            reject(e);
        }
    });
};
const getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allUser = await User.find().sort({
                createdAt: -1,
                updatedAt: -1,
            });
            resolve({
                status: 'OK',
                message: 'Success',
                data: allUser,
            });
        } catch (e) {
            reject(e);
        }
    });
};

const getDetailsUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await User.findOne({
                _id: id,
            });
            if (user === null) {
                resolve({
                    status: 'ERR',
                    message: 'The user is not defined',
                });
            }
            resolve({
                status: 'OK',
                message: 'SUCESS',
                data: user,
            });
        } catch (e) {
            reject(e);
        }
    });
};

module.exports = {
    createUser,
    userLogin,
    updateUser,
    deleteUser,
    getAllUser,
    getDetailsUser,
};
