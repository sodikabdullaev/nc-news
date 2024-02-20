const request = require('supertest')
const app = require('../app')
const seed = require('../db/seeds/seed')
const data = require('../db/data/test-data/index')
const db = require('../db/connection')
require('jest-sorted')

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
				expect(article.article_id).toBe(1)
			})
	})
	it('GET:404 /api/articles/999 responds with not found message for non-exist id', () => {
		return request(app)
			.get('/api/articles/999')
			.expect(404)
			.then(({ body: { msg } }) => {
				expect(msg).toBe('Not found')
			})
	})
	it('GET:400 /api/articles/invalidId responds bad request given invalid id', () => {
		return request(app)
			.get('/api/articles/invalidId')
			.expect(400)
			.then(({ body: { msg } }) => {
				expect(msg).toBe('Bad request')
			})
	})
	it('GET:200 /api/articles responds with all entries from articles table', () => {
		return request(app)
			.get('/api/articles')
			.expect(200)
			.then(({ body: { articles } }) => {
				expect(articles.length).toBe(13)
				articles.forEach((article) => {
					expect(typeof article.article_id).toBe('number')
					expect(typeof article.title).toBe('string')
					expect(typeof article.topic).toBe('string')
					expect(typeof article.author).toBe('string')
					expect(typeof article.created_at).toBe('string')
					expect(typeof article.votes).toBe('number')
					expect(typeof article.comment_count).toBe('number')
					expect(typeof article.article_img_url).toBe('string')
				})
			})
	})
	it('GET: 200 /api/articles/1/comments responds with comment data belongs to given article', () => {
		return request(app)
			.get('/api/articles/1/comments')
			.expect(200)
			.then(({ body: { comments } }) => {
				expect(comments.length).toBe(11)
				comments.forEach((comment) => {
					expect(comment.article_id).toBe(1)

					expect(typeof comment.comment_id).toBe('number')
					expect(typeof comment.author).toBe('string')
					expect(typeof comment.body).toBe('string')
					expect(typeof comment.votes).toBe('number')
					expect(typeof comment.created_at).toBe('string')
				})
				expect(
					comments.map((comment) => comment.created_at)
				).toBeSorted({ descending: true })
			})
	})
	it('GET: 404 /api/articles/10/comments responds with no comment on existing article', () => {
		return request(app).get('/api/articles/10/comments').expect(404)
	})
	it('GET: 404 /api/articles/999/comments responds with not found for non-exist article id', () => {
		return request(app).get('/api/articles/999/comments').expect(404)
	})
	it('GET: 400 /api/articles/invalidId/comments responds with bad request for invalid article id', () => {
		return request(app).get('/api/articles/invalidId/comments').expect(400)
	})
})
