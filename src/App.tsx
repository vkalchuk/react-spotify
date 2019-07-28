import React from 'react';
import Button from '@material-ui/core/Button';
import './App.css';
import { getToken } from './utils'
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import { Tracklist } from './components/Tracklist';

@observer
class App extends React.Component {
  @observable token = ''

  componentDidMount() {
    this.token = getToken()
  }

  login = () => {
    const url = 'https://accounts.spotify.com/authorize/'
    const clientId = '?client_id=3fd4982a2e7e44a69326afc24a1d8ee4'
    const responseType = '&response_type=token'
    const redirectURI = '&redirect_uri=http://localhost:3000/'
    const scope = '&scope=user-top-read'

    const loginURL = `${url}${clientId}${responseType}${scope}${redirectURI}`

    window.location.href = loginURL
  }

  render () {
    return (
      <div className="App">
        {!this.token && <Button onClick={this.login} variant="contained" color="primary">
          Login
        </Button>}

        {this.token && <Tracklist />}
        
      </div>
    );
  }

}

export default App;
