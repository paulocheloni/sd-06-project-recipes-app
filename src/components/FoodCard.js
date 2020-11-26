import React from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import { connect } from 'react-redux';
import shareIcon from '../images/shareIcon.svg';

class FoodCard extends React.Component {
  constructor() {
    super();
    this.state = {
      Food: [],
    };
    this.setFoodState = this.setFoodState.bind(this);
    this.handleShareFood = this.handleShareFood.bind(this);
  }

  async componentDidMount() {
    const foods = JSON.parse(localStorage.getItem('doneRecipes'));
    if (foods) {
      const filteredFood = foods.filter((element) => element.type === 'comida');
      this.setFoodState(filteredFood);
    }
  }

  async handleShareFood({ id }) {
    const url = `http://localhost:3000/comidas/${id}`;
    await copy(url);
    const shareBtn = document.querySelector('.share-btn');
    shareBtn.value = 'Link copiado!';
    const p = document.querySelector('.p');
    const span = document.createElement('span');
    p.appendChild(span);
    span.innerHTML = 'Link copiado!';
    // window.alert('Link copiado!');
    // https://www.30secondsofcode.org/blog/s/copy-text-to-clipboard-with-javascript
    // const el = document.createElement('textarea');
    // el.value = url;
    // el.setAttribute('readonly', '');
    // el.style.position = 'absolute';
    // el.style.left = '-9999px';
    // document.body.appendChild(el);
    // el.select();
    // document.execCommand('copy');
    // document.body.removeChild(el);
  }

  setFoodState(Food) {
    this.setState({
      Food,
    });
  }

  render() {
    const { Food } = this.state;
    const { history, indexAcc } = this.props;
    return (
      <div>
        {Food.map((element, i) => (
          <div key={ i + indexAcc }>
            <input
              type="image"
              data-testid={ `${i + indexAcc}-horizontal-image` }
              src={ element.image }
              width="200px"
              alt="horizontal"
              onClick={ () => history.push(`/comidas/${element.id}`) }
            />
            <p data-testid={ `${i + indexAcc}-horizontal-top-text` }>
              {`${element.area} - ${element.category}`}
            </p>
            <button
              type="button"
              data-testid={ `${i + indexAcc}-horizontal-name` }
              onClick={ () => history.push(`/comidas/${element.id}`) }
              value={ element.name }
            >
              { element.name }
            </button>
            <p data-testid={ `${i + indexAcc}-horizontal-done-date` }>
              {element.doneDate}
            </p>
            {typeof element.tags === 'string'
              ? (
                <div>
                  <p
                    key="tag0"
                    data-testid={ `${i}-${element.tags.split(',')[0]}-horizontal-tag` }
                  >
                    { `${element.tags.split(',')[0]}`}
                  </p>
                  <p
                    key="tag1"
                    data-testid={ `${i}-${element.tags.split(',')[1]}-horizontal-tag` }
                  >
                    { `${element.tags.split(',')[1]}`}
                  </p>
                </div>
              )
              : (
                <div>
                  <p
                    key="tag0"
                    data-testid={ `${i}-${element.tags[0]}-horizontal-tag` }
                  >
                    { `${element.tags[0]}`}
                  </p>
                  <p
                    key="tag1"
                    data-testid={ `${i}-${element.tags[1]}-horizontal-tag` }
                  >
                    { `${element.tags[1]}`}
                  </p>
                </div>
              )}

            <input
              type="image"
              className="share-btn"
              data-testid={ `${i + indexAcc}-horizontal-share-btn` }
              src={ shareIcon }
              alt="share"
              onClick={ () => this.handleShareFood(element) }
            />
            <p className="p" />
          </div>))}
      </div>
    );
  }
}

FoodCard.propTypes = {
  history: PropTypes.shape().isRequired,
  indexAcc: PropTypes.number.isRequired,
};

export default connect(null, null)(FoodCard);