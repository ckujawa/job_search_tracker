import mongoose from 'mongoose'
import {SourceModel, ISource, JobLeadModel} from '../model/JobLeadSchema'
import faker  from 'faker'

describe('Gql API Test', () => {
    beforeAll(async () => {
        await mongoose.connect(process.env.MONGO_URL as string, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true },
            (err: any) => {
                if (err) {
                    console.error(err)
                    process.exit(1)
                }
            })
    })

    beforeEach( async () => {
        await SourceModel.deleteMany({})
    })

    afterAll((): Promise<void> => {
        return mongoose.connection.close();
    })

    test('create and save valid source', async () => {
        const validSource = getFakeSource()

        const savedSource = await validSource.save()
        expect(savedSource._id).toBeDefined()
        expect(savedSource.id).toEqual(validSource.id)
        expect(savedSource.name).toEqual(validSource.name)
        expect(savedSource.url).toEqual(validSource.url)
        expect(savedSource.jobLeadIds).toEqual(validSource.jobLeadIds)
    })

    test('create and save missing name', async () => {
        const missingData = new SourceModel({
            id: 'anything',
            name: '',
            jobLeads: ['32123', '123123']
        })
        let shouldntExist: ISource;

        try {
            shouldntExist = await missingData.save() 
        } catch (err) {
            expect(shouldntExist).toBeUndefined()
            expect(err.errors.name.properties.message).toEqual('Path `name` is required.')
            expect(err.errors.name.properties.type).toEqual('required')
            expect(err.errors.name.properties.path).toEqual('name')
        }
    })

    test('get sources', async () => {
        const one = getFakeSource();
        const two = getFakeSource();

        await one.save();
        await two.save();

        const sources = await SourceModel.find()

        expect(sources.length).toEqual(2)
    })

    test('delete source', async () => {
        const one = getFakeSource()
        const two = getFakeSource()

        await one.save()
        await two.save()

        let sources = await SourceModel.find()
        expect(sources.length).toEqual(2)

        await SourceModel.deleteOne(one)

        sources = await SourceModel.find()

        expect(sources.length).toEqual(1)
        expect(sources[0].name).toEqual(two.name)
    })

    //going to stop here for now as this is really just
    //testing the framework and not *my* code...
    // was doing this just to learn

})

function getFakeSource(): ISource {
    const source: ISource = new SourceModel();

    source.id = faker.random.uuid()
    source.name = faker.company.companyName()
    source.url = faker.internet.url()
    source.jobLeadIds = faker.random.arrayElements()

    return source
}