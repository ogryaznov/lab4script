const app = require('./server');
const supertest = require('supertest');
const request = supertest(app);

it('sends Hello World! string', async done => {
	const response = await request.get('/');
	
	expect(response.status).toBe(200);
	expect(response.text).toBe("Hello World!");
	done();
});