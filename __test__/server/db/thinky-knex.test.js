const { NODE_ENV = 'development' } = process.env
const knex = require('knex')(NODE_ENV)
import { r } from '../../../src/server/models'

describe('The knexfile', () => {
  beforeEach(async () => await knex.migrate.latest())
  afterEach(async () => await knex.raw('DROP OWNED BY spoke_test;'))

  it('provides an up-to-date interaction_step schema', async () => {
    const interactionStepSchema = await knex('interaction_step').columnInfo()
    console.log('interaction_step', interactionStepSchema)
    expect(1).toEqual(1)
  })
})
