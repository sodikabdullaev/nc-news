const request = require('supertest')
const app = require('../app')
const seed = require('../db/seeds/seed')
const data = require('../db/data/test-data/index')
const db = require('../db/connection')

beforeEach(() => {
	return seed(data)
})
afterAll(() => {
	return db.end()
})

describe('Topics', () => {
	it('GET:200 /api/topics responds with the list of topics', () => {
		return request(app)
			.get('/api/topics')
			.expect(200)
			.then(({ body }) => {
				const { topics } = body
				expect(topics.length).toBe(3)
				topics.forEach((topic) => {
					expect(typeof topic.slug).toBe('string')
					expect(typeof topic.description).toBe('string')
				})
			})
	})
})
describe('API', () => {
	it('GET:200 /api provides description of all other endpoints available', () => {
		return request(app)
			.get('/api')
			.expect(200)
			.then(({ body: { endpoints } }) => {
				expect(typeof endpoints).toBe('object')
			})
	})
})
