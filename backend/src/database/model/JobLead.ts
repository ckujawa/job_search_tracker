import { Model } from 'objection'
import Company from './Company'

export default class JobLead extends Model{
    
    static tableName = 'job_leads'

    static jsonSchema = {
        type: 'object',
        required: ['roleTitle', 'company_id', 'source', 'url', 'firstContactDate', 'lastContactDate'],

        id: { type: 'integer' },
        company_id: { type: 'integer' },
        role_title: { type: 'string', minLength: 1, maxLength: 50 },
        source: { type: 'string', minLength: 1, maxLength: 100 },
        url: { type: 'string', mingLegnth: 1, maxLength: 100 },
        firstContactDate: { type: 'string', format: 'date-time' },
        lastContactDate: { type: 'string', format: 'date-time' },
        status: {type:'string', minLength: 1, maxLength:15}
    }

    static relationMappings = () => ({
        companies: {
            relation: Model.BelongsToOneRelation,
            modelClass: Company,
            join: {
                from: 'job_lead.company_id',
                to: 'companies.id'
            }
        }
    })
}