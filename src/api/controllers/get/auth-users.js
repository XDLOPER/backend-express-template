import mongoose from 'mongoose';
import AuthScheme from '../../models/auth.js'


export const controllerUsers = async (_req,res) => {
    try {
        const users = await AuthScheme.find({})
        
        res.status(200).json({
            status:'OK',
            message:users,
        }).end()
    } catch (error) {
        res.status(500).json({
            status:'ERROR',
            message:error.message
        })
    }
}
