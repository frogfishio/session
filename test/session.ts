import { Engine } from '@frogfish/kona';

const chai = require('chai');
chai.use(require('chai-like'));
chai.use(require('chai-things'));

const expect = chai.expect;
const request = require('./request');

const API = 'http://localhost:8000/v1';
const TIME = Date.now();

let engine: Engine;
let adminToken;
let testSessionId;
let testFile;
let testBrandId = 'brand-' + TIME;
let testContentName = 'test-contant-' + TIME;

const TEST_DATA = {
  hello: 'world'
};

describe('Session', () => {
  beforeEach(async () => {
    engine = await require('./helper').engine();
    adminToken =
      adminToken ||
      (
        await engine.auth.authenticate({
          grant_type: 'password',
          email: 'testadmin@frogfish.com',
          password: 'testpassword'
        })
      ).access_token;
  });

  it('should create session', async () => {
    expect((testSessionId = (await request.put(`${API}/session`, TEST_DATA, adminToken)).id))
      .to.be.a('string')
      .with.length(96);
  });

  it('should get session', async () => {
    const result = await request.get(`${API}/session/${testSessionId}`, {}, adminToken);
    console.log(result);
    expect(result)
      .to.have.property('hello')
      .which.equals('world');
  });
});
