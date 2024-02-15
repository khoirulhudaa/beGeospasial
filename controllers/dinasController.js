const dinasModel = require('../models/dinasModel')
const crypto = require('crypto')
const titleModel = require('../models/titleModel')

const createDinas = async (req, res) => {
    try {
        const { name_dinas, abbreviation } = req.body
       
        const existDinas = await dinasModel.findOne({ name_dinas: { $regex: new RegExp('^' + name_dinas + '$', 'i') } });
        if(existDinas) return res.json({ status: 400, message: 'Dinas sudah ada!' })
        
        const tokenRandom = crypto.randomBytes(5).toString('hex')

        const newdinas = new dinasModel({
            dinas_id: tokenRandom,
            name_dinas,
            abbreviation
        })

        await newdinas.save()
        return res.json({ status: 200, message: 'Berhasil tambah dinas!' })

    } catch (error) {
        return res.json({ status: 500, message: 'Proses gagal!', error: error });
    }
}

const getAllDinas = async (req, res) => {
    try {
       
        const existDinas = await dinasModel.find()
        if(!existDinas) return res.json({ status: 404, message: 'Data dinas masih kosong!' })
 
        return res.json({ status: 200, message: 'Berhasil dapatkan dinas!', data: existDinas })

    } catch (error) {
        return res.json({ status: 500, message: 'Proses gagal!', error: error });
    }
}

const removeDinas = async (req, res) => {
    try {
       
        const { dinas_id } = req.params

        const existDinas = await dinasModel.findOneAndDelete({ dinas_id })
        await titleModel.deleteMany({ dinas_id })
        if(!existDinas) return res.json({ status: 404, message: 'Dinas tidak ada!' })
        
        return res.json({ status: 200, message: 'Berhasil hapus dinas!', data: existDinas })

    } catch (error) {
        return res.json({ status: 500, message: 'Proses gagal!', error: error });
    }
}

const updateDinas = async (req, res) => {
    try {

        const { dinas_id, name_dinas, abbreviation } = req.body

        const existDinas = await dinasModel.findOne({ dinas_id })
        if(!existDinas) return res.json({ status: 404, message: 'Dinas tidak ada!' })

        existDinas.name_dinas = name_dinas
        existDinas.abbreviation = abbreviation
        existDinas.save()
        
        return res.json({ status: 200, message: 'Berhasil perbarui dinas!', data: existDinas })

    } catch (error) {
        return res.json({ status: 500, message: 'Proses gagal!', error: error });
    }
}

module.exports = {
    createDinas,
    getAllDinas,
    removeDinas,
    updateDinas
}