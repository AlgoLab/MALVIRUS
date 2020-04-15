// Polyfills
import 'core-js/es/object/entries';
import 'core-js/es/object/values';
import 'core-js/es/string';
import 'core-js/es/array';
import 'core-js/es/map';
import 'core-js/es/set';
import 'react-app-polyfill/ie11';

// App (in a separate file since we cannot import antd and polyfills in the same file)
import './index.css';
import './bootstrap';

window.addEventListener('unload', function () {});
