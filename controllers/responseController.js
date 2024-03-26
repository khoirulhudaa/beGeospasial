const responseModel = require('../models/responseModel')
const crypto = require('crypto')
const responseModel = require('../models/responseModel')

const createResponse = async (req, res) => {
    try {
        const { username, email, response } = req.body
       
        const existResponse = await responseModel.findOne({ email: { $regex: new RegExp('^' + email + '$', 'i') } });
        if(existResponse) return res.json({ status: 400, message: 'Sudah Pernah Mengirim!' })
        
        const tokenRandom = crypto.randomBytes(5).toString('hex')

        const newResponse = new responseModel({
            response_id: tokenRandom,
            username,
            email,
            response
        })

        await newResponse.save()
        return res.json({ status: 200, message: 'Berhasil tambah Pesan!' })

    } catch (error) {
        return res.json({ status: 500, message: 'Proses gagal!', error: error });
    }
}

const getAllResponse = async (req, res) => {
    try {
       
        const existResponse = await responseModel.find()
        if(!existResponse) return res.json({ status: 404, message: 'Data Tanggapan/Pesan masih kosong!' })
 
        return res.json({ status: 200, message: 'Berhasil dapatkan Pesan!', data: existResponse })

    } catch (error) {
        return res.json({ status: 500, message: 'Proses gagal!', error: error });
    }
}

const removeResponse = async (req, res) => {
    try {
       
        const { response_id } = req.params

        const existResponse = await responseModel.findOneAndDelete({ response_id })
        await responseModel.deleteOne({ response_id })
        if(!existResponse) return res.json({ status: 404, message: 'Pesan tidak ada!' })
        
        return res.json({ status: 200, message: 'Berhasil hapus Pesan!', data: existResponse })

    } catch (error) {
        return res.json({ status: 500, message: 'Proses gagal!', error: error });
    }
}

module.exports = {
    createResponse,
    getAllResponse,
    removeResponse,
}