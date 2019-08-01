import React from 'react';
import { checkLoggedIn, login } from './firebase/authenticate';
import { User } from './firebase/datatype';

interface AppState {
  user?: User;
}

class App extends React.Component<{}, AppState> {
  constructor(prop: any) {
    super(prop);
    this.state = {};
  }

  login_ui() {
    return (
      <div className="dialog">
        <div className="dialog-container">
          <div className="dialog-title">ログインして始める</div>
          <div className="dialog-content">
            <button onClick={_=>login()}>Googleでログイン</button>
          </div>
        </div>
      </div>);
  }

  main() {
    return (
    <>
      <header></header>
      <main></main>
      <footer></footer>
    </>);
  }

  render() {
    return (
      <div className="App">
        {checkLoggedIn()?this.main():this.login_ui()}
      </div>
    );
  }
}

export default App;
