import { Schema, model } from 'mongoose'
import { IReserve } from '../interfaces/reserve'

const reserveSchema = new Schema<IReserve>(
    {
        user: {
            type: String,
            required: true,
            ref: 'User',
        },
        startDate: {
            type: Date,
            required: true,
        },
        endDate: {
            type: Date,
            required: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    }
)

const Reserve = model('Reserve', reserveSchema)
export default Reserve