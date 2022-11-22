import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'dsAppParqueadero',
  connector: 'mongodb',
  //url: 'mongodb+srv://admin:Abc12345678@clustercun.hkcel.mongodb.net/DWG28?retryWrites=true&w=majority',
  url: 'mongodb+srv://admin:9iRQMj4FyP6ZHPS8@clusterg28jc.4okiqyt.mongodb.net/DWG28JC',
  host: '',
  port: 0,
  user: '',
  password: '',
  database: '',
  useNewUrlParser: true
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class DsAppParqueaderoDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'dsAppParqueadero';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.dsAppParqueadero', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
