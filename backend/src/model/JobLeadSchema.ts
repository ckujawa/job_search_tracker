import mongoose, { Schema, Model, model, Document } from 'mongoose'

export interface IJobLead extends Document {
    id: string
    title: string
    companyId: String
    firstContactDate: Date
    lastContactDate: Date
    status: string
    sourceId: String
    url: String
    description: String
}

export interface ICompany extends Document {
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
      phone: string
      additionalNotes: string
    }]
}

export interface ISource extends Document{
    id: string
    name: string
    url: string
    jobLeadIds: [string]
}

const jobLeadSchema: Schema<IJobLead> = new Schema({
    id: String,
    title: {type: String, required: true},
    companyId: String,
    firstContactDate: { type: Date, default: Date.now },
    lastContactDate: { type: Date, default: Date.now },
    status: String,
    sourceId: String,
    url: String,
    description: String
})

export const JobLeadModel: Model<IJobLead> = model('JobLead', jobLeadSchema)

const companySchema: Schema<ICompany> = new Schema({
        id: String,
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
})

export const CompanyModel: Model<ICompany> = model('Company', companySchema)

const sourceSchema: Schema<ISource> = new Schema({
    id: String,
    name: {type: String, required: true},
    url: {type: String,},
    jobLeadIds: [String]
})

export const SourceModel: Model<ISource> = model('Source', sourceSchema)