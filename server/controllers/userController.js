const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
// require('dotenv').config()

const ApiError = require('../errors/ApiError')
const {User, Basket} = require('../models/models')

const generateJwt = (id, email, role) => {
    return jwt.sign({id, email, role}, process.env.SECRET_KEY, {expiresIn: '24h'})
}

class UserController {
    async registration(req, resp, next){
        const {email, password, role} = req.body
        if(!email || !password){
            return next(ApiError.badRequest('Неккоректный email или пароль'))
        }
        const candidate = await User.findOne({where: {email}})
        if (candidate){
            return next(ApiError.badRequest('Пользователь с таким email уже существует'))
        }
        const hashPassword = await bcrypt.hash(password, 5)
        const user = await User.create({email, role, password: hashPassword})
        const basket = await Basket.create({userId: user.id})
        const token = generateJwt(user.id, user.email, user.role)
        // const token = jwt.sign({id: user.id, email, role}, process.env.SECRET_KEY, {expiresIn: '24h'})
        return resp.json({token})

    }
    async login(req, resp, next){
        const {email, password} = req.body
        // console.log('email', email)
        // console.log('pass', password)
        const user = await User.findOne({where: {email}})
        // console.log('user',user)
        if(!user){
            return next(ApiError.badRequest('Пользователь не найден'))
        }
        let comparePassword = bcrypt.compareSync(password, user.password)
        if(!comparePassword){
            return next(ApiError.badRequest('Неверный пароль'))
        }
        const token = generateJwt(user.id, user.email, user.role)
        return resp.json({token})
    }
    async check(req, resp, next){
        const token = generateJwt(req.user.id, req.user.email, req.user.role)
        return resp.json({token})
    }

}

module.exports = new UserController()