const { compare } = require("../helper/bcryptjs")
const { createToken } = require("../helper/jwt")
const { User } = require("../models/index")
const { LabResult } = require("../models/index")

class Controller {
    static async createAccount(req, res, next) {
        try {
            let {
                username,
                email,
                password,
                phoneNumber,
                address
            } = req.body

            await User.create({
                username,
                email,
                password,
                phoneNumber,
                address
            })
            res.status(201).json({ message: "Account has been created" })
        } catch (error) {
            next(error)
        }
    }

    static async loginAccount(req, res, next) {
        try {
            let {
                email,
                password
            } = req.body
            if (!email || !password) {
                throw { name: "badRequest" }
            }
            let user = await User.findOne({ where: { email } })
            if (!user) {
                throw { name: "Unauthorized" }
            } else {
                let compareResult = compare(password, user.password)
                if (!compareResult) {
                    throw { name: "Unauthorized" }
                } else {
                    const { id } = user
                    let token = createToken({
                        id,
                    })
                    res.status(200).json({ access_token: token })
                }
            }

        } catch (error) {
            next(error)
        }
    }

    static async findAllByUser(req, res, next) {
        try {
            const labResult = await LabResult.findAll(
                {
                    where: {
                        userId: req.userLogin.id
                    },
                    order: [['date', 'DESC']]
                }
            )
            if (!labResult) {
                throw { name: "notFound" }
            }
            res.status(200).json(labResult)
        } catch (error) {
            next(error)
        }
    }

    static async addLabResult(req, res, next){
        try {
            const { date, results } = req.body;

            const labResult = await LabResult.create({
            userId: req.userLogin.id,
            date,
            results
            });
            res.status(201).json(labResult);
        } catch (error) {
            next(error)
        }
    }

    static async findOneUserLogin(req, res, next){
        try {
            let user = await User.findOne({
                where : {
                    id:req.userLogin.id
                },
                attributes: { exclude: ['password'] }
            })
            res.status(200).json(user);
        } catch (error) {
            next(error)
        }
    }
}

module.exports = Controller