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
describe('Articles', () => {
	it('GET:200 responds with the matching id by given unique id', () => {
		return request(app)
			.get('/api/articles/1')
			.expect(200)
			.then(({ body: { article } }) => {
				expect(typeof article.article_id).toBe('number')
				expect(typeof article.title).toBe('string')
				expect(typeof article.topic).toBe('string')
				expect(typeof article.author).toBe('string')
				expect(typeof article.created_at).toBe('string')
				expect(typeof article.votes).toBe('number')
				expect(typeof article.article_img_url).toBe('string')
			})
	})
	it('GET:404 responds with not found message for non-exist id', () => {
		return request(app)
			.get('/api/articles/999')
			.expect(404)
			.then(({ body: { msg } }) => {
				expect(msg).toBe('Not found')
			})
	})
	it('GET:400 responds bad request given invalid id', () => {
		return request(app)
			.get('/api/articles/invalidId')
			.expect(400)
			.then(({ body: { msg } }) => {
				expect(msg).toBe('Bad request')
			})
	})
})
