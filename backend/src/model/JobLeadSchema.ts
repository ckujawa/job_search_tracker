import mongoose, { Schema, Model, model, Document } from 'mongoose'

interface IJobLead extends Document {
    id: string
    title: string
    company: {
        id: string
        name: string
        city: string
        state: string
        url: string
        contacts: [{
            id: string
            firstName: string
            lastName: string
            title: string
            email: string
        }]
    }
    firstContactDate: Date
    lastContactDate: Date
    status: string
}

const jobLeadSchema: Schema = new Schema({
    title: String,
    company: {
        name: String,
        city: String,
        state: String,
        url: String,
        contacts: [{
            firstName: String,
            lastName: String,
            title: String,
            email: String
        }]
    },
    firstContactDate: { type: Date, default: Date.now },
    lastContactDate: { type: Date, default: Date.now },
    status: String
})

export const JobLead: Model<IJobLead> = model('JobLead', jobLeadSchema)