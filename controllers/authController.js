const authModel = require('../models/authModel')
const bcrypt = require('bcryptjs')
const jsonwebtoken = require('jsonwebtoken')
const crypto = require('crypto')

const signin = async (req, res) => {
    try {

        const { email, password } = req.body

        const existUser = await authModel.findOne({ email })
        if(!existUser) return res.json({ status: 404, message: 'User tidak ditemukan!' })
       
        const isMatch = bcrypt.compare(password, existUser.password)
        if(!isMatch) return res.json({ status: 401, message: 'Kata sandi salah!' })

        const token = jsonwebtoken.sign({ user_id: existUser.email }, 'geospasial', { expiresIn: '5h' })

        return res.json({ status: 200, message: 'Successfully signin!', token, data: existUser })

    } catch (error) {
        return res.json({ status: 200, message: 'Server bermasalah!', error: error.message })
    }
}

const signup = async (req, res) => {
    try {
        const { email, password } = req.body
       
        const existUser = await authModel.findOne({ email })
        if(existUser) return res.json({ status: 400, message: 'Email sudah terpakai!' })
 
        const tokenRandom = crypto.randomBytes(6).toString('hex')
          
        const salt = await bcrypt.genSalt(10)
        const passwordHashGenerate = await bcrypt.hash(password, salt)

        const newuser = new authModel({
            user_id: tokenRandom,
            email,
            password: passwordHashGenerate,
        })

        await newuser.save()
        return res.json({ status: 200, message: 'Successfully Register!' })

    } catch (error) {
        return res.json({ status: 500, message: 'Failed to signUp', error: error });
    }
}

module.exports = {
    signin,
    signup
}