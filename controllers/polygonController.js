const coordinateModel = require('../models/coordinateCustomModel')
const crypto = require('crypto')

const createCustomPolygonExcel = async (req, res) => {
    try {
        let coordinates = req.body;

        console.log('lihat data excel polygon:', coordinates)
        if (!Array.isArray(coordinates)) {
            coordinates = [coordinates]; 
        }

        coordinates.forEach(async (coordinate) => {
            console.log('lihat polygon:', coordinate)
            const { title_id } = req.params
            const { name, type_area, wide, typeWide, description, type_danger, color, coordinates } = coordinate;
           
            const tokenRandom = crypto.randomBytes(5).toString('hex');
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
            };
            
            const newCoordinate = new coordinateModel(dataCoordinate);
            await newCoordinate.save();
        });

        return res.json({ status: 200, message: 'Berhasil tambah data!' });

    } catch (error) {
        return res.json({ status: 500, message: 'Proses gagal!', error: error });
    }
}

const removePolygonExcel = async (req, res) => {
    try {
       
        const { coordinate_id } = req.params

        const existCoordinate = await coordinateModel.findOneAndDelete({ coordinate_id })
        if(!existCoordinate) return res.json({ status: 404, message: 'Koordinat tidak ada!' })
        
        return res.json({ status: 200, message: 'Berhasil hapus koordinat!', data: existCoordinate })

    } catch (error) {
        return res.json({ status: 500, message: 'Proses gagal!', error: error });
    }
}

const updateCustomPolygon = async (req, res) => {
    try {
        const { name, title_id, type_area, wide, typeWide, description, type_danger, color, coordinates } = req.body;

        const existCoordinate = await coordinateModel.findOne({ title_id, name });
        if (!existCoordinate) {
            return res.json({ status: 404, message: 'Data koordinat tidak ditemukan!' });
        }

        existCoordinate.set({
            type_area,
            wide,
            typeWide,
            description,
            type_danger,
            color,
            coordinates,
        });
        
        await existCoordinate.save();
        return res.json({ status: 200, message: 'Berhasil update data!' });

    } catch (error) {
        return res.json({ status: 500, message: 'Proses gagal!', error: error });
    }
}

const updateCustomPolygonExcel = async (req, res) => {
    try {
        let coordinates = req.body;
        if (!Array.isArray(coordinates)) {
            coordinates = [coordinates]; // Wrap single object in an array
        }

        for (const coordinate of coordinates) {
            const { name, title_id, type_area, wide, typeWide, description, type_danger, color, coordinates } = coordinate;

            const existCoordinate = await coordinateModel.findOne({ title_id, name });
            if (!existCoordinate) {
                return res.json({ status: 404, message: 'Data koordinat tidak ditemukan!' });
            }

            existCoordinate.set({
                type_area,
                wide,
                typeWide,
                description,
                type_danger,
                color,
                coordinates,
            });

            await existCoordinate.save();
        }

        return res.json({ status: 200, message: 'Berhasil update data!' });

    } catch (error) {
        return res.json({ status: 500, message: 'Proses gagal!', error: error });
    }
}

module.exports = {  
    createCustomPolygonExcel,
    removePolygonExcel,
    updateCustomPolygon,
    updateCustomPolygonExcel
}