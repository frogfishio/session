import { Engine } from '@frogfish/engine';
// import { Session } from '../../../api/session';

let logger;

export default class ProductHandler {
  constructor(private engine: Engine, private user) {
    logger = engine.log.log('@session');
  }

  put(req, res, next) {
    this.engine.session
      .set(req.path.split('/')[3], req.body)
      .then(result => {
        res.json(result);
      })
      .catch(err => {
        logger.error(err);
        err.send(res);
      });
  }

  get(req, res, next) {
    this.engine.session
      .get(req.path.split('/')[3])
      .then(job => {
        res.json(job);
      })
      .catch(err => {
        err.send(res);
      });
  }
}
