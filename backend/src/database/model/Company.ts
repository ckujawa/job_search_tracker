import { Model } from 'objection'

import Contact from './Contact'
import JobLead from './JobLead'


export default class Company extends Model{

    static tableName = 'companies'

    static jsonSchema = {
        type: 'object',
        required: ['name'],

        properties: {
            id: { type: 'integer' },
            name: { type: 'string', minLength: 1, maxLength: 40 },
            city: { type: 'string', minLength: 1, maxLength: 35 },
            state: { type: 'string', minLength: 1, maxLength: 2 },
            zip_code: { type: 'string', minLength: 5, maxLength: 11 },
            url: { type: 'string', minLength: 1, maxLength: 100 }
        }
    }

    static relationMappings = () => ({

        contacts: {
            relation: Model.HasManyRelation,
            modelClass: Contact,
            join: {
                from: 'companies.id',
                to: 'contacts.company_id'
            }
        },

        jobLeads: {
            relation: Model.HasManyRelation,
            modelClass: JobLead,
            join: {
                from: 'companies.id',
                to: 'job_leads.company_id'
            }
        }
    })
}