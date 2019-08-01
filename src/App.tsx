import React from 'react';
import { checkLoggedIn, login } from './firebase/authenticate';
import { User, getRank, getRankTitle } from './firebase/datatype';
import { fetchUserData } from './firebase/firestore';

interface AppState {
  user?: User,
  account_created?: boolean
}

class App extends React.Component<{}, AppState> {
  constructor(prop: any) {
    super(prop);
    this.state = {};
  }

  afterLoggedIn = (data: {user: User, created: boolean}) => {
    if(!data.created) {
      this.setState({user: data.user});
      return;
    }
    this.setState({user: data.user, account_created: true});
  }

  loginUI() {
    return (
      <div className="dialog">
        <div className="dialog-container">
          <div className="dialog-title">ログインして始める</div>
          <div className="dialog-content">
            <button onClick={_=>login().then(it=>fetchUserData(it)).then(this.afterLoggedIn)}>Googleでログイン</button>
          </div>
        </div>
      </div>);
  }

  main() {
    let rank = getRank(this.state.user!!);
    return (
    <>
      <header>
        <ul>
          <li className="user">{this.state.user!!.name}</li>
          <li className="rank">
            <div className="rank-title">{getRankTitle(this.state.user!!)}</div>
            <progress max={1} value={rank.current}/>
            <div>
              <span className='guild-point'>
                現在の合計ギルドポイント: <span className='pts'>{this.state.user!!.exp}</span>ポイント
              </span>
              <span className='point-to-next'>
                次のランクまで<span className='pts'>{rank.remained}</span>ポイント
              </span>
            </div>
          </li>
        </ul>
      </header>
      <main></main>
      <footer></footer>
    </>);
  }

  updateAccountInfo() {
    return null // TODO: Update account info menu
  }

  render() {
    return (
      <div className="App">
        {this.state.account_created?this.updateAccountInfo():null}
        {checkLoggedIn()?this.main():this.loginUI()}
      </div>
    );
  }
}

export default App;
