import request from 'supertest';

describe('HealthRouter', () => {
    it('should return a 200 response', async () => {
        const response = await request(global.app).get('/health');

        expect(response.statusCode).toBe(200);
    });
});
