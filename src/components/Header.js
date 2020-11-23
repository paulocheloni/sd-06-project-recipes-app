import React, { Component } from 'react';
import propTypes from 'prop-types';
import SearchBar from './SearchBar';
import { profileIcon, searchIcon } from '../images';
import { Link } from 'react-router-dom';

export default class Header extends Component {

  constructor(){
    super();
    this.handleSearchBar = this.handleSearchBar.bind(this);
    this.state = {
      searchBar: false,
    }
  }
  
  handleSearchBar() {
    this.setState(prevState => ({
      searchBar: !prevState.searchBar
    }));
  }

  render() {
    const { className, pageTitle } = this.props;
    return (
      <div>
        <header
        name="header"
        className={ className }
      >
        <Link to="/perfil">
          <button type="button" data-testid="profile-top-btn">
            <img alt="Ícone de Perfil" src={ profileIcon } />
          </button>
        </Link>
        <h1 data-testid="page-title">{ pageTitle }</h1>
        {/* { BtnSearchBar && <BtnSearchBar /> } */}
        <button type="button" data-testid="search-top-btn" onClick={ this.handleSearchBar } >
        <img alt="ícone de Pesquisa" src={ searchIcon } />
      </button>
      </header>
      { this.state.searchBar && <SearchBar /> }
      </div>
    )
  }
}

Header.propTypes = {
  className: propTypes.string.isRequired,
  iconPerfil: propTypes.string,
  pageTitle: propTypes.string,
  iconPage: propTypes.string,
};




// function Button() {
// 	return <button>Button</button>
// }

// function Header(props) {
// 	const { Button } = props

// 	return (
//   	<header>
//   	  <h1>Header</h1>
      
//       {Button && <Button />} 
//   	</header>
//   )
// }

// function App() {
// 	return (
//   	<React.Fragment>
//       <Header Button={Button} />
//       <Header />
//     </React.Fragment>
//   )
// }

// ReactDOM.render(<App />, document.querySelector("#app"))