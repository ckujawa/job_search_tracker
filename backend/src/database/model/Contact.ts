import { Model } from 'objection'

import Company from './Company'

export default class Contact extends Model {
    
    static tableName = 'contacts'

    //jsonSchema used to validate each object prior to insertion
    //into the db
    static jsonSchema = {
        type: 'object',
        required: ['firstName', 'lastName'],

        properties: {
            id: { type: 'integer' },
            firstName: { type: 'string', minLength: 1, maxLength: 15 },
            lastName: { type: 'string', minLength: 1, maxLength: 20 },
            title: { type: 'string', minLength: 1, maxLength: 20 },
            company_id: {type: 'integer'}
        }
    }

    static relationMappings = () => ({
        company: {
            relation: Model.BelongsToOneRelation,
            modelClass: Company,

            join: {
                from: 'contacts.company_id',
                to: 'companies.id'
            }
        }
    })
}