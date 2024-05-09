const titleModel = require('../models/titleModel')
const coordinateModel = require('../models/coordinateCustomModel')
const crypto = require('crypto')

const createCoordinate = async (req, res) => {
    try {
        const { 
            name_location, 
            title_id, 
            thumbnail, 
            subdistrict, 
            lat, 
            long, 
            address, 
            link, 
            condition, 
            scale, 
            remark,
            code,
            pum,
            province,
            typeArea,
            ward,
            provinceCode,
            typeAreaCode, 
            subdistrictCode,
            wardCode,
            wide,
            source 
        } = req.body

        const tokenRandom = crypto.randomBytes(5).toString('hex')

        const dataCoordinate = {
            coordinate_id: tokenRandom,
            name_location,
            title_id,
            subdistrict,
            lat: parseFloat(lat),
            long: parseFloat(long),
            address,
            link,
            thumbnail,
            condition,
            scale, 
            remark,
            code,
            pum,
            province,
            typeArea,
            ward,
            provinceCode,
            typeAreaCode, 
            subdistrictCode,
            wardCode,
            wide,
            source
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

const createCoordinateExcel = async (req, res) => {
    try {
        const coordinates = req.body;

        if (!Array.isArray(coordinates)) {
            return res.json({ status: 400, message: 'Data koordinat harus dalam bentuk array!' });
        }

        const requiredFields = ['name_location', 'title_id', 'thumbnail', 'subdistrict', 'lat', 'long', 'address', 'link', 'condition'];

        for (const coordinate of coordinates) {
            for (const field of requiredFields) {
                if (!coordinate.hasOwnProperty(field)) {
                    return res.json({ status: 400, message: `Data koordinat tidak lengkap! Field '${field}' tidak ditemukan.` });
                }
            }
        }

        const existTitle = await titleModel.findOne({ title_id: coordinates[0].title_id });
        if (!existTitle) {
            return res.json({ status: 404, message: 'Judul geospasial tidak ada!' });
        }

        const nameLocationTracker = {};
        const newCoordinates = [];

        for (const coordinate of coordinates) {
            const { 
                name_location, 
                title_id, 
                thumbnail, 
                subdistrict, 
                lat, 
                long, 
                address, 
                link, 
                condition ,
                scale, 
                remark,
                code,
                pum,
                province,
                typeArea,
                ward,
                provinceCode,
                typeAreaCode, 
                subdistrictCode,
                wardCode,
                wide,
                source
            } = coordinate;

            // Check if the name_location has already been processed
            if (!nameLocationTracker[name_location]) {
                const tokenRandom = crypto.randomBytes(5).toString('hex');

                const dataCoordinate = {
                    coordinate_id: tokenRandom,
                    name_location,
                    title_id,
                    subdistrict,
                    lat: parseFloat(lat),
                    long: parseFloat(long),
                    address,
                    link,
                    thumbnail,
                    condition,
                    scale, 
                    remark,
                    code,
                    pum,
                    province,
                    typeArea,
                    ward,
                    provinceCode,
                    typeAreaCode, 
                    subdistrictCode,
                    wardCode,
                    wide,
                    source
                };

                newCoordinates.push(dataCoordinate);
                nameLocationTracker[name_location] = true; // Mark this name_location as processed
            }
        }

        existTitle.coordinate.push(...newCoordinates);
        await existTitle.save();

        return res.json({ status: 200, message: 'Berhasil tambah dinas!', newCoordinates });
    } catch (error) {
        return res.json({ status: 500, message: 'Proses gagal!', error: error });
    }
};


const createCustomCoordinate = async (req, res) => {
    try {
        const { name, title_id, type_area, wide, typeWide, description, type_danger, color, coordinates } = req.body
        console.log(req.body)
        const tokenRandom = crypto.randomBytes(5).toString('hex')

        const dataCoordinate = {
            coordinate_id: tokenRandom,
            name,
            title_id,
            type_area,
            wide,
            description,
            typeWide,   
            type_danger,
            color,
            coordinates,
        }

        console.log(dataCoordinate)
        
        const existCoordinate = await coordinateModel.findOne({ title_id, name })
        if (!existCoordinate) {
            const newCoordinate = new coordinateModel(dataCoordinate)
            await newCoordinate.save();
            return res.json({ status: 200, message: 'Berhasil tambah data!' });
        } else {
            return res.json({ status: 500, message: 'Lokasi sudah pernah dibuat!' })
        }

    } catch (error) {
        return res.json({ status: 500, message: 'Proses gagal!', error: error });
    }
}

const getAllCustomByTitle = async (req, res) => {
    try {
        const { title_id } = req.params

        const existCoordinate = await coordinateModel.find({ title_id })
        if(!coordinateModel) return res.json({ status: 404, message: 'Data coordinate belum ada!' })

        return res.json({ status: 200, message: 'Berhasil ambil data koordinate kustom', data: existCoordinate })

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


const removeCoordinateCustom = async (req, res) => {
    try {
       
        const { coordinate_id } = req.params

        const existCoordinate = await coordinateModel.findOneAndDelete({ coordinate_id })
        if(!existCoordinate) return res.json({ status: 404, message: 'Koordinat tidak ada!' })
        
        return res.json({ status: 200, message: 'Berhasil hapus koordinat!', data: existCoordinate })

    } catch (error) {
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
        console.log(req.body)
        const { 
            name_location, 
            title_id, 
            thumbnail, 
            subdistrict, 
            coordinate_id,
            lat, 
            long, 
            address, 
            link, 
            condition,
            scale, 
            remark,
            code,
            pum,
            province,
            typeArea,
            ward,
            provinceCode,
            typeAreaCode, 
            subdistrictCode,
            wardCode,
            wide,
            source
        } = req.body;
 
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
                    "coordinate.$[coordinateElement].thumbnail": thumbnail,
                    "coordinate.$[coordinateElement].condition": condition,
                    "coordinate.$[coordinateElement].scale": scale, 
                    "coordinate.$[coordinateElement].remark": remark,
                    "coordinate.$[coordinateElement].code": code,
                    "coordinate.$[coordinateElement].address": address,
                    "coordinate.$[coordinateElement].pum": pum,
                    "coordinate.$[coordinateElement].province": province,
                    "coordinate.$[coordinateElement].typeArea": typeArea,
                    "coordinate.$[coordinateElement].ward": ward,
                    "coordinate.$[coordinateElement].provinceCode": provinceCode,
                    "coordinate.$[coordinateElement].typeAreaCode": typeAreaCode, 
                    "coordinate.$[coordinateElement].subdistrictCode": subdistrictCode,
                    "coordinate.$[coordinateElement].wardCode": wardCode,
                    "coordinate.$[coordinateElement].wide": wide,
                    "coordinate.$[coordinateElement].source": source,
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
    createCoordinateExcel,
    updateCoordinate,
    removeCoordinate,
    checkCoordinate,
    createCustomCoordinate,
    getAllCustomByTitle,
    removeCoordinateCustom
}