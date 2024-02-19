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
	it('GET:200 responds with the list of topics', () => {
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
