const { test, after, beforeEach, describe  } = require('node:test')
const assert = require('node:assert')
const supertest = require('supertest')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const bcrypt = require('bcrypt')

const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

beforeEach(async () => {
    await Blog.deleteMany({})

    await Blog.insertMany(helper.initialBlogs)
})

describe('when there is initially some blogs saved', () => {

    test('blogs are returned as json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('the unique identifier property of the blog posts is named id', async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToView = blogsAtStart[0]

        const resultBlog = await api
            .get(`/api/blogs/${blogToView.id}`)
            .expect(200)
            .expect('Content-Type', /application\/json/)
            
        assert.deepStrictEqual(resultBlog.body, blogToView)
    })
})

describe('posting blogs', ()=> {
    let loginUser
    
    beforeEach(async () => {
        const user = {
            username: process.env.USERNAMETEST,
            password: process.env.PASSWORDTEST
        }
        
        loginUser = await api
            .post('/api/login')
            .send(user)
    })

    test('a new valid blog is added', async () => {
        const newBlog = {
            title: 'testBlog',
            author: 'test',
            url: 'test',
            likes: 0,
            userId: process.env.IDTEST
        }

        console.log('--------------------')
        console.log(newBlog.userId)
        console.log('--------------------')

        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${loginUser.body.token}`)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()
        assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)

        const titles = blogsAtEnd.map(n => n.title)
        assert(titles.includes('testBlog'))
    })

    test('a new blog have no likes so default is 0', async () => {
        const newBlog = {
            title: 'testBlog',
            author: 'test',
            url: 'test',
            userId: process.env.IDTEST
        }

        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${loginUser.body.token}`)
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const blogsAtEnd = await helper.blogsInDb()
        assert.strictEqual(blogsAtEnd[blogsAtEnd.length - 1].likes, 0)
    })

    test('blog without title or url send a 400 bad request', async () => {
        const blogWithoutTittle = {
            url: 'test',
            userId: process.env.IDTEST
        }

        await api
            .post('/api/blogs')
            .set('Authorization', `Bearer ${loginUser.body.token}`)
            .send(blogWithoutTittle)
            .expect(400)

            const blogWithoutUrl = {
                title: 'test',
                userId: process.env.IDTEST
            }
    
            await api
                .post('/api/blogs')
                .set('Authorization', `Bearer ${loginUser.body.token}`)
                .send(blogWithoutUrl)
                .expect(400)

        const blogsAtEnd = await helper.blogsInDb()
        assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
    })
})

describe('deletion of a blog', () => {
    test('succeeds with status code 204 if id is valid'), async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToDelete = blogsAtStart[0]

        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204)

        const blogsAtEnd = await helper.blogsInDb()

        assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)

        const titles = blogsAtEnd.map(r => r.title)
        assert(!titles.includes(blogToDelete.title))
    }
})

describe('updating blogs info', () => {
    test('likes value updated'), async () => {
        const blogsAtStart = await helper.blogsInDb()
        const blogToUpdate = blogsAtStart[0]

        const newBlog = {
            title: blogToUpdate.title,
            author: blogToUpdate.author,
            url: blogToUpdate.url,
            likes: 99999,
            userId: process.env.IDTEST
        }

        await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send(newBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)
        
        const blogsAtEnd = await helper.blogsInDb()
        assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)

        const beforeLikes = blogsAtStart.map(b => b.likes)
        const afterLikes = blogsAtEnd.map(b => b.likes)
        assert.notStrictEqual(beforeLikes, afterLikes)

        assert.strictEqual(blogsAtEnd[0].likes, 99999)
    }
})

describe('when there is initially one user in db', () => {
    test('creation succeds with a fresh username', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            username: 'newTestUser',
            name: 'User Test',
            password: 'password',
        }

        const response = await api
            .post('/api/users')
            .send(newUser)
            .expect(201)
            .expect('Content-Type', /application\/json/)

        const usersAtEnd = await helper.usersInDb()
        assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)

        const usernames = usersAtEnd.map(u => u.username)
        assert(usernames.includes(newUser.username))

        await api.delete(`/api/users/${response.body.id}`).expect(204)
    })
})

describe('creating not valid users', () => {
    test('creation users without username', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            name: 'NameTest',
            password: 'passwordTest'
        }
        
        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
        const usersAtEnd = await helper.usersInDb()

        assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })

    test('creation users without password', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            name: 'NameTest',
            username: 'userNameTest'
        }
        
        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
        const usersAtEnd = await helper.usersInDb()

        assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })

    test('creation users with less than 3 characters name', async () => {
        const usersAtStart = await helper.usersInDb()

        const newUser = {
            name: 'NameTest',
            userName: 'te',
            password: 'passwordTest'
        }
        
        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
        const usersAtEnd = await helper.usersInDb()

        assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    })
})

after(async () => {
  await mongoose.connection.close()
})