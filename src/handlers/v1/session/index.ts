import { Engine } from '@frogfish/kona';
// import { Session } from '../../../api/session';

let logger;

export default class SessionServiceHandler {
  constructor(private engine: Engine, private user) {
    logger = engine.log.log('service:session');
  }

  put(req, res, next) {
    this.engine.session
      .set(req.path.split('/')[3], req.body)
      .then(result => {
        res.json(result);
      })
      .catch(err => {
        require('@frogfish/kona/util').error(err, res, logger, 'svc_session_put');
      });
  }

  post(req, res, next) {
    this.engine.session
      .create(req.body)
      .then(result => {
        res.json(result);
      })
      .catch(err => {
        require('@frogfish/kona/util').error(err, res, logger, 'svc_session_post');
      });
  }

  get(req, res, next) {
    this.engine.session
      .get(req.path.split('/')[3])
      .then(job => {
        res.json(job);
      })
      .catch(err => {
        require('@frogfish/kona/util').error(err, res, logger, 'svc_session_get');
      });
  }
}
