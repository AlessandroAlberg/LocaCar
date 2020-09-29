import { NextFunction, Request, Response} from 'express';
import knex from '../database/connection'

class VehiclesController {
    async index(request: Request, response: Response, next: NextFunction) {
        try {
            const { board, model, brand } = request.query;
            let vehicles;
        
            if (board || model || brand) {
                vehicles = await knex('vehicles')
                .where('board', 'like', `%${board}%`)
                .orWhere('model', 'like', `%${model}%`)
                .orWhere('brand', 'like', `%${brand}%`)
                .distinct()
            } else {
                vehicles = await knex('vehicles');
            }

            return response.json(vehicles);
        } catch (error) {
            next(error)
        }
    }

    async show(request: Request, response: Response, next: NextFunction) {
        try {
            const { id } = request.params;

            const vehicle = await knex('vehicles').where('id', id).first();

            if (!vehicle) {
                return response.status(400).json({ message: 'Vehicle not found.' });
            }

            return response.json({ vehicle });
        } catch (error) {
            next(error);
        }
    }

    async create(request: Request, response: Response, next: NextFunction) {
        try {
            let id;
            const {
                board,
                chassi,
                renavam,
                model,
                brand,
                year
            } = request.body;
        
            const trx = await knex.transaction();

            const vehicle = {
                board,
                chassi,
                renavam,
                model,
                brand,
                year
            };        
        
            id = await trx('vehicles').insert(vehicle);
        
            await trx.commit();

            return response.json({ id });

        } catch (error) {
            next(error)
        }
    }

    async update(request: Request, response: Response, next: NextFunction) {
        try {
            const {
                board,
                chassi,
                renavam,
                model,
                brand,
                year
            } = request.body;

            const { id } = request.params;

            const vehicle = {
                board,
                chassi,
                renavam,
                model,
                brand,
                year
            };

            await knex('vehicles')
            .update(vehicle)
            .where({ id })

            return response.send();

        } catch (error) {
            next(error);
        }
    }

    async delete(request: Request, response: Response, next: NextFunction) {
        try {
            const { id } = request.params;

            await knex('vehicles')
            .where({ id })
            .del();

            return response.send();
            
        } catch (error) {
            next(error);
        }
    }
}

export default VehiclesController;