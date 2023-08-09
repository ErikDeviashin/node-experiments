import request from 'supertest';
import {app} from "../../src";

describe('/course', () => {
    beforeAll(async () => {
      await request(app)
          .delete('/__test__/reset')
    })

    it('should return 200 and empty array', async () => {
        await request(app)
            .get('/courses')
            .expect(200, [])
    });

    it('should return 404 if course not found', async () => {
        await request(app)
            .get('/courses/1')
            .expect(404)
    });

    it('should create course with input data', async () => {
        const testTitle = 'test';

        const createResponse = await request(app)
            .post('/courses')
            .send({title: testTitle})

        expect(createResponse.body).toEqual({
            id: expect.any(Number),
            title: testTitle,
        });
    })
});