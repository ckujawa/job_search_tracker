import mongoose, { Schema } from 'mongoose'
import {Company} from './Company'

export const jobLead = new Schema({
    title: String,
    company: Company,
    firstContactDate: { type: Date, default: Date.now },
    lastContactDate: { type: Date, default: Date.now },
    status: String
})