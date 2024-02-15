const subdistrictModel = require('../models/SubdistrictModel')
const crypto = require('crypto')

const createSubdistrict = async (req, res) => {
    try {
        const { name_subdistrict, lat, long } = req.body
       
        const existSubdistrict = await subdistrictModel.findOne({ name_subdistrict: { $regex: new RegExp('^' + name_subdistrict + '$', 'i') } })
        if(existSubdistrict) return res.json({ status: 400, message: 'Kecataman sudah ada!' })
 
        const tokenRandom = crypto.randomBytes(5).toString('hex')

        const newsubdistrict = new subdistrictModel({
            subdistrict_id: tokenRandom,
            name_subdistrict,
            lat,
            long
        })

        await newsubdistrict.save()
        return res.json({ status: 200, message: 'Berhasil tambah kecataman!' })

    } catch (error) {
        return res.json({ status: 500, message: 'Proses gagal!', error: error });
    }
}

const getAllSubdistrict = async (req, res) => {
    try {
       
        const existSubdistrict = await subdistrictModel.find()
        if(!existSubdistrict) return res.json({ status: 404, message: 'Data kecamatan masih kosong!' })
 
        return res.json({ status: 200, message: 'Berhasil dapatkan kecamatan!', data: existSubdistrict })

    } catch (error) {
        return res.json({ status: 500, message: 'Proses gagal!', error: error });
    }
}

const removeSubdistrict = async (req, res) => {
    try {
       
        const { subdistrict_id } = req.params

        const existSubdistrict = await subdistrictModel.findOneAndDelete({ subdistrict_id })
        if(!existSubdistrict) return res.json({ status: 404, message: 'Kecamatan tidak ada!' })
 
        return res.json({ status: 200, message: 'Berhasil hapus kecataman!', data: existSubdistrict })
        
    } catch (error) {
        return res.json({ status: 500, message: 'Proses gagal!', error: error });
    }
}

const updateSubdistrict = async (req, res) => {
    try {

        const { subdistrict_id, name_subdistrict, lat, long } = req.body

        const existSubdistrict = await subdistrictModel.findOne({ subdistrict_id })
        if(!existSubdistrict) return res.json({ status: 404, message: 'Kecamatan tidak ada!' })

        existSubdistrict.name_subdistrict = name_subdistrict
        existSubdistrict.lat = lat
        existSubdistrict.long = long
        existSubdistrict.save()
        
        return res.json({ status: 200, message: 'Berhasil perbarui kecataman!', data: existSubdistrict })

    } catch (error) {
        return res.json({ status: 500, message: 'Proses gagal!', error: error });
    }
}

module.exports = {
    createSubdistrict,
    getAllSubdistrict,
    removeSubdistrict,
    updateSubdistrict
}