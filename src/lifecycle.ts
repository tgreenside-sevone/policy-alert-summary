import { messages } from '@sevone/insight-wdk';
import { VariablesType } from './config-to-variables';

import defaultConfiguration  from './default-configuration';
 
let configuration = defaultConfiguration;

export const widgetWillMount = ({ configuration, onMessage }) => {
  
  async function fetchToken(configuration): Promise<DataType> {

    var { username, password, nmsIp, token } = configuration;

    const payload = { name: username, password: password };

    // authenticate
    await fetch('https://'+nmsIp+'/api/v2/authentication/signin?nmsLogin=false', {
      method: 'POST', // or 'PUT'
      mode: 'cors', // no-cors, *cors, same-origin
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(payload),
      })
      .then(response => response.json())
      .then(data => {
        token = data.token;
        onMessage(messages.updateConfiguration, { token });
        //console.log("token",token);
      })
      .catch((error) => {
        token = null;
      });
    }
  
  fetchToken(configuration)
};


export const widgetWillUnmount = ({ configuration }) => {


  //console.log("Unmounting widget");

  async function invalidateToken(configuration): Promise<DataType> {

    var { username, password, nmsIp, token } = configuration;
  
    const payload = { name: username, password: password };
  

    await fetch('https://'+nmsIp+'/api/v2/authentication/signout', {
      method: 'DELETE', 
      mode: 'cors', // no-cors, *cors, same-origin
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'X-AUTH-TOKEN': token
      }
      })
      .then(response => response.json())
      .then(data => {
        token = null;
        onMessage(messages.updateConfiguration, { token });
      })
      .catch((error) => {
      });
  }
  invalidateToken(configuration)
};
