const titleModel = require('../models/titleModel')
const crypto = require('crypto')

const createTitle = async (req, res) => {
    try {
        const { title, dinas_id, title_id, category, description, coordinate, status, year, name_dinas, type } = req.body
        
        if(title_id) {
            console.log('data title_id:',title_id)
        }
        console.log('gak ada title_id', title_id)

        const existSubdistrict = await titleModel.findOne({ title: { $regex: new RegExp('^' + title + '$', 'i') } })
        if (existSubdistrict) return res.json({ status: 400, message: 'Kecataman sudah ada!' })
 
        const tokenRandom = crypto.randomBytes(5).toString('hex')

        const newtitleData = {
            title_id: title_id ?? tokenRandom,
            title,
            dinas_id,
            description,
            status,
            category,
            year,
            name_dinas,
            type
        }

        // Tambahkan coordinate ke newtitleData jika coordinate tidak null atau undefined
        if (coordinate !== null && coordinate !== undefined) {
            newtitleData.coordinate = coordinate
        }

        const newtitle = new titleModel(newtitleData)

        await newtitle.save()
        return res.json({ status: 200, message: 'Berhasil tambah kecataman!' })

    } catch (error) {
        return res.json({ status: 500, message: 'Proses gagal!', error: error });
    }
}

const getAllTitle = async (req, res) => {
    try {
       
        const existTitle = await titleModel.find()
        if(!existTitle) return res.json({ status: 404, message: 'Data judul geospasial masih kosong!' })
 
        return res.json({ status: 200, message: 'Berhasil dapatkan judul geospasial!', data: existTitle })

    } catch (error) {
        return res.json({ status: 500, message: 'Proses gagal!', error: error });
    }
}

const removeTitle = async (req, res) => {
    try {
       
        const { title_id } = req.params

        const existTitle = await titleModel.findOneAndDelete({ title_id })
        if(!existTitle) return res.json({ status: 404, message: 'Judul tidak ada!' })
 
        return res.json({ status: 200, message: 'Berhasil hapus judul!', data: existTitle })

    } catch (error) {
        return res.json({ status: 500, message: 'Proses gagal!', error: error });
    }
}

const updateTitle = async (req, res) => {
    try {

        const { title_id, title, category, type, status, description, year } = req.body

        const existTitle = await titleModel.findOne({ title_id })
        if(!existTitle) return res.json({ status: 404, message: 'Judul tidak ada!' })

        existTitle.title = title
        existTitle.category = category
        existTitle.type = type
        existTitle.description = description
        existTitle.year = year
        existTitle.status = status
        existTitle.save()
            
        return res.json({ status: 200, message: 'Berhasil perbarui judul!', data: existTitle })

    } catch (error) {
        return res.json({ status: 500, message: 'Proses gagal!', error: error });
    }
}

module.exports = {
    createTitle,
    getAllTitle,
    removeTitle,
    updateTitle
}