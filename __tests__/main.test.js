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
				expect(msg).toBe('Article not found')
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
	it('GET: 200 /api/articles/10/comments responds with empty array on existing article but no comment there yet', () => {
		return request(app).get('/api/articles/10/comments').expect(200)
	})
	it('GET: 404 /api/articles/999/comments responds with not found for non-exist article id', () => {
		return request(app)
			.get('/api/articles/999/comments')
			.expect(404)
			.then(({ body: { msg } }) => {
				expect(msg).toBe('Article not found')
			})
	})
	it('GET: 400 /api/articles/invalidId/comments responds with bad request for invalid article id', () => {
		return request(app)
			.get('/api/articles/invalidId/comments')
			.expect(400)
			.then(({ body: { msg } }) => {
				expect(msg).toBe('Bad request')
			})
	})
	it('PATCH: 200 /api/articles/article_id responds with changed article by given article id', () => {
		return request(app)
			.patch('/api/articles/1')
			.set('Accept', 'application/json')
			.send({ inc_votes: 1 })
			.expect(200)
			.then(({ body: { article } }) => {
				expect(article.article_id).toBe(1)
				expect(article.votes).toBe(101)
			})
	})
	it('PATCH: 404 /api/articles/article_id responds not found error for invalid article id', () => {
		return request(app)
			.patch('/api/articles/999')
			.set('Accept', 'application/json')
			.send({ inc_votes: 1 })
			.expect(404)
	})
	it('PATCH: 400 /api/articles/article_id responds bad request error when given invalid body', () => {
		return request(app)
			.patch('/api/articles/1')
			.set('Accept', 'application/json')
			.send({ inc_votes: 'not-number' })
			.expect(400)
	})
	it('POST 201 /api/articles/article_id/comments responds with added comment when posted', () => {
		const body = {
			body: 'We can do comments while testing do not we?',
			author: 'icellusedkars',
		}
		return request(app)
			.post('/api/articles/1/comments')
			.set('Accept', 'application/json')
			.send(body)
			.expect(201)
			.then(({ body: { comment } }) => {
				expect(comment.body).toBe(body.body)
				expect(comment.author).toBe(body.author)
				expect(comment.article_id).toBe(1)
			})
	})
	it('POST 404 /api/articles/article_id/comments responds with user not found ', () => {
		const body = {
			body: 'We can do comments while testing do not we?',
			author: 'iAmNotinUsers',
		}
		return request(app)
			.post('/api/articles/1/comments')
			.set('Accept', 'application/json')
			.send(body)
			.expect(404)
			.then(({ body: { msg } }) => {
				expect(msg).toBe('User not found')
			})
	})
	it('POST 400 /api/articles/article_id/comments responds body is missing when body is empty but user is valid', () => {
		const body = {
			body: '',
			author: 'icellusedkars',
		}
		return request(app)
			.post('/api/articles/1/comments')
			.set('Accept', 'application/json')
			.send(body)
			.expect(400)
			.then(({ body: { msg } }) => {
				expect(msg).toBe('Body is missing')
			})
	})
	it('POST 404 /api/articles/article_id/comments responds with article not found for non-exist article id', () => {
		const body = {
			body: 'Some comment goes here',
			author: 'icellusedkars',
		}
		return request(app)
			.post('/api/articles/999/comments')
			.set('Accept', 'application/json')
			.send(body)
			.expect(404)
			.then(({ body: { msg } }) => {
				expect(msg).toBe('Article not found')
			})
	})
	it('GET: 200 /api/articles/1 responds with matching article also count of its comments', () => {
		return request(app)
			.get('/api/articles/1')
			.expect(200)
			.then(({ body: { article } }) => {
				expect(typeof article.comment_count).toBe('number')
				expect(article.comment_count).toBe(11)
			})
	})
})

describe('Comments', () => {
	it('DELETE: 204 /api/comments/comment_id deletes the comment given by id', () => {
		return request(app).delete('/api/comments/1').expect(204)
	})
	it('DELETE: 404 /api/comments/999 responds with 404 for non-exist comment id', () => {
		return request(app).delete('/api/comments/999').expect(404)
	})
	it('DELETE: 400 /api/comments/invalidId responds with bad request (400) for invalid comment id', () => {
		return request(app).delete('/api/comments/invalidId').expect(400)
	})
})

describe('Users', () => {
	it('GET: 200 /api/user responds all entries from users table', () => {
		return request(app)
			.get('/api/users')
			.expect(200)
			.then(({ body: { users } }) => {
				expect(users.length).toBe(4)
				users.forEach((user) => {
					expect(typeof user.username).toBe('string')
					expect(typeof user.name).toBe('string')
					expect(typeof user.avatar_url).toBe('string')
				})
			})
	})
})

describe('Articles with queries', () => {
	it('GET: 200 /api/articles?topic=mitch responds with all articles topic is matching to the query request', () => {
		return request(app)
			.get('/api/articles?topic=mitch')
			.expect(200)
			.then(({ body: { articles } }) => {
				expect(articles.length).toBe(12)
				articles.forEach((article) => {
					expect(article.topic).toBe('mitch')
				})
			})
	})
	it('GET: 404 /api/articles?topic=nox-exist responds with not found for non-exist topic', () => {
		return request(app)
			.get('/api/articles?topic=iAmNotTopic')
			.expect(404)
			.then(({ body: { msg } }) => {
				expect(msg).toBe('Not found')
			})
	})
	it('GET: 200 /api/articles?juestToCheck=ifWondering ignores invalid querying', () => {
		return request(app)
			.get('/api/articles?juestToCheck=ifWondering')
			.expect(200)
			.then(({ body: { articles } }) => {
				expect(articles.length).toBe(13)
			})
	})
	it('GET: 200 /api/articles?topic=paper responds with 200 when topic exists but no articles yet', () => {
		return request(app)
			.get('/api/articles?topic=paper')
			.expect(200)
			.then(({ body: { articles } }) => {
				expect(articles.length).toBe(0)
			})
	})
})
describe('Articles sorted', () => {
	it('GET: 200 /api/articles?sort_by=title responds with list of articles sorted with title column from the table', () => {
		return request(app)
			.get('/api/articles?sort_by=title')
			.expect(200)
			.then(({ body: { articles } }) => {
				expect(articles.map((article) => article.title)).toBeSorted({
					descending: true,
				})
			})
	})
})
