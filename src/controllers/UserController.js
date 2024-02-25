const userService = require('./../services/UserSevice');
const createUser = async (req, res) => {
    const isEmail = (email) => {
        const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        return regex.test(email);
    };
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(404).json({
                status: 'error',
                message: 'input is required',
            });
        } else if (!isEmail(email)) {
            return res.status(404).json({
                status: 'error',
                message: 'invalid email',
            });
        }
        const response = await userService.createUser({
            name,
            email,
            password,
        });
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: 'faild',
            error: e,
        });
    }
};
const userLogin = async (req, res) => {
    const isEmail = (email) => {
        const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
        return regex.test(email);
    };
    try {
        const userInfo = req.body;
        if (!userInfo.email || !userInfo.password) {
            return res.status(404).json({
                status: 'error',
                message: 'input is required',
            });
        } else if (!isEmail(userInfo.email)) {
            return res.status(404).json({
                status: 'error',
                message: 'invalid email',
            });
        }
        const response = await userService.userLogin(userInfo);

        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: 'faild',
            error: e,
        });
    }
};
const updateUser = async (req, res) => {
    try {
        const userId = req.params.id;
        const data = req.body;
        if (!userId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The userId is required',
            });
        }
        const response = await userService.updateUser(userId, data);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e,
        });
    }
};

const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id;
        if (!userId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The userId is required',
            });
        }
        const response = await userService.deleteUser(userId);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e,
        });
    }
};
const getAllUser = async (req, res) => {
    try {
        const response = await userService.getAllUser();
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e,
        });
    }
};

const getDetailsUser = async (req, res) => {
    try {
        const userId = req.params.id;
        if (!userId) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The userId is required',
            });
        }
        const response = await userService.getDetailsUser(userId);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e,
        });
    }
};

module.exports = {
    createUser,
    userLogin,
    updateUser,
    deleteUser,
    getAllUser,
    getDetailsUser,
};
