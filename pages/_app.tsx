import '../node_modules/antd/dist/antd.less';
import '../client/styles/globals.css';

import dynamic from 'next/dynamic';

const App = dynamic(() => import('./App'), { ssr: false });

const MyApp = (props) => {
  return <App {...props} />;
};

export default MyApp;
