import { App } from './pkg/App';

() => {
  new App().createSequencer({ username: 'roboghost', basePath: process.cwd() }).createCollection();
};
