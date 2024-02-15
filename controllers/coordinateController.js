const titleModel = require('../models/titleModel')
const crypto = require('crypto')

const createCoordinate = async (req, res) => {
    try {
        const { name_location, title_id, subdistrict, lat, long, link, note, condition } = req.body

        const tokenRandom = crypto.randomBytes(5).toString('hex')

        const dataCoordinate = {
            coordinate_id: tokenRandom,
            name_location,
            title_id,
            subdistrict,
            lat: parseFloat(lat),
            long: parseFloat(long),
            link,
            condition
        }

        console.log(dataCoordinate)
        
        const existTitle = await titleModel.findOne({ title_id })
        if(!existTitle) return res.json({ status: 404, message: 'Judul geospasial tidak ada!' })
        
        if (!existTitle.coordinate.some((data) => data.name_location === name_location)) {
            existTitle.coordinate.push(dataCoordinate);
            await existTitle.save();
            return res.json({ status: 200, message: 'Berhasil tambah dinas!' });
        } else {
            return res.json({ status: 500, message: 'Lokasi sudah pernah dibuat!' })
        }

    } catch (error) {
        return res.json({ status: 500, message: 'Proses gagal!', error: error });
    }
}

const checkCoordinate = async (req, res) => {
    try {
        const { name_location, title_id } = req.body
        console.log(name_location)
        console.log(title_id)

        const existTitle = await titleModel.findOne({ title_id })
        if(!existTitle) return res.json({ status: 404, message: 'Judul geospasial tidak ada!' })
        
        const lowerCaseNameLocation = name_location.toLowerCase();

        if (existTitle.coordinate.some((data) => data.name_location.toLowerCase() === lowerCaseNameLocation)) {
            return res.json({ status: 500, message: 'Lokasi sudah ada!' });
        } else {
            return res.json({ status: 200, message: 'Lokasi tesedia' })
        }
    
} catch (error) {
        console.log(error)
        return res.json({ status: 500, message: 'Proses gagal!', error: error });
    }
}

const removeCoordinate = async (req, res) => {
    try {

        const { coordinate_id, title_id } = req.body
        const existTitle = await titleModel.findOne({ title_id });

        if(!existTitle) return res.json({ status: 404, message: 'Judul data geospasial tidak ada!' })

        existTitle.coordinate = existTitle.coordinate.filter(coord => coord.coordinate_id !== coordinate_id);

        await existTitle.save();
        return res.json({ status: 200, message: 'Berhasil perbarui data koordinat!', data: existTitle });

    } catch (error) {
        return res.json({ status: 500, message: 'Proses gagal!', error: error });
    }
}

const updateCoordinate = async (req, res) => {
    try {
        const { title_id, coordinate_id, name_location, subdistrict, lat, long, link, note, condition } = req.body;

        const existingTitle = await titleModel.findOne({ title_id });

        if (!existingTitle) {
            return res.status(404).json({ status:  404, message: 'Data tidak ditemukan!' });
        }

        // Gunakan operator posisional untuk memperbarui elemen dalam array
        const result = await titleModel.updateOne(
            { title_id },
            {
                $set: {
                    "coordinate.$[coordinateElement].name_location": name_location,
                    "coordinate.$[coordinateElement].subdistrict": subdistrict,
                    "coordinate.$[coordinateElement].lat": lat,
                    "coordinate.$[coordinateElement].long": long,
                    "coordinate.$[coordinateElement].link": link,
                    "coordinate.$[coordinateElement].condition": condition
                }
            },
            {
                arrayFilters: [{ "coordinateElement.coordinate_id": coordinate_id }],
                new: true // Mengembalikan dokumen yang telah diperbarui
            }
        );

        // Ambil ulang dokumen yang telah diperbarui
        if (result.nModified === 0) {
            return res.status(404).json({ status:  404, message: 'Data tidak ditemukan!' });
        }

        return res.json({ status: 200, message: 'Berhasil perbarui data koordinat!' });
    } catch (error) {
        return res.json({ status: 500, message: 'Proses gagal!', error: error });
    }
}

module.exports = {
    createCoordinate,
    updateCoordinate,
    removeCoordinate,
    checkCoordinate
}