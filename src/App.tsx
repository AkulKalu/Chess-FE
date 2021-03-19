import React from 'react';
import Layout from './Components/Layout/Layout';
import {Provider} from './HOC/State/Provider'


function App() {
 
  return <Provider> 
            <Layout /> 
          </Provider>;
}

export default App;
