const uuid = require('uuid')
const path = require('path')

const ApiError = require('../errors/ApiError')
const {Device, DeviceInfo} = require('../models/models')

class DeviceController {
    async create(req, resp, next){
        try {
            let {name, price, brandId, typeId, info} = req.body
            const {img} = req.files
            let filename = uuid.v4() + ".jpg"
            img.mv(path.resolve(__dirname, '..', 'static', filename))
            const device = await Device.create({name, price, brandId, typeId, img: filename})
            
            if(info){
                info = JSON.parse(info)
                info.forEach( i => {
                    DeviceInfo.create({
                        title: i.title,
                        description: i.description,
                        deviceId: device.id
                    })
                })
            } 
            return resp.json(device)
        } catch (error) {
            next(ApiError.badRequest(error.message))
        }
        
    }
    async getAll(req, resp){
        let {brandId, typeId, limit, page} = req.query
        page = page || 1
        limit = limit || 9
        let offset = page * limit - limit
        let devices;
        if(!brandId && !typeId){
            // devices = await Device.findAll({limit, offset})
            devices = await Device.findAndCountAll({limit, offset})
        }
        if(brandId && !typeId){
            // devices = await Device.findAll({where: brandId}, limit, offset)
            devices = await Device.findAndCountAll({where: brandId}, limit, offset)
        }
        if(!brandId && typeId){
            // devices = await Device.findAll({where: typeId}, limit, offset)
            devices = await Device.findAndCountAll({where: typeId}, limit, offset)
        }
        if(brandId && typeId){
            // devices = await Device.findAll({where: {typeId, brandId}, limit, offset})
            devices = await Device.findAndCountAll({where: {typeId, brandId}, limit, offset})
        }

        return resp.json(devices)
        
    }
    async getOne(req, resp){
        const {id} = req.params
        const device = await Device.findOne(
            {
                where: {id},
                include: [{model: DeviceInfo, as: 'info'}]
            }
        )
        return resp.json(device)
    }

}

module.exports = new DeviceController()