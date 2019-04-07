import Router from './router';
import routes from './routes';
import 'components';
import 'style-loader!css-loader!../index.css';

new Router().bootstrap(routes);
