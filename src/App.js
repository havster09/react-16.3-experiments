import React, { Component, createContext } from 'react';

// React 16.3

// create store similar to Redux
const ApplicationContext = createContext();

const { Provider, Consumer } = ApplicationContext;

let initialState = {
  users: ['Theo', 'Rick', 'James', 'haven']
};

class App extends Component {
  state = initialState;
  render() {
    return (
      <Provider value={this.state}>
        <Header />
        <Footer />
        <button
          onClick={() =>
            this.setState({
              ...this.state,
              ...{ users: [...this.state.users, ...['fu']] }
            })}
        >
          Click it
        </button>
      </Provider>
    );
  }
}

const withConsumer = BaseComponent => {
  return class extends Component {
    static displayName = `withConsumer${BaseComponent.displayName}`;

    // makes use of render props
    render() {
      return (
        <Consumer>
          {context => {
            return (
              <React.Fragment>
                <BaseComponent {...context} {...this.props} {...this.state} />
              </React.Fragment>
            );
          }}
        </Consumer>
      );
    }
  };
};

const componentFromUI = (ui, name) => {
  return class extends Component {
    constructor(props) {
      super();
    }

    componentDidMount() {

    }

    state = { a: 1 };
    static displayName = name;
    static getDerivedStateFromProps(nextProps, prevState) {
      console.log(nextProps, prevState);
      return { poo: 1, wee: 2, ...nextProps };
    }

    render() {
      console.log(55, this.props.users);
      return (
        <div>
          {JSON.stringify(this.state, null, 4)}
          {ui(this.props.users)}
        </div>
      );
    }
  };
};

const Header = withConsumer(
  componentFromUI(users => {
    return (
      <header>
        {JSON.stringify(users)} I am the header
      </header>
    );
  }, 'Header')
);
const Footer = withConsumer(
  componentFromUI(users => {
    return (
      <footer>
        {JSON.stringify(users)} I am the header
      </footer>
    );
  }, 'Footer')
);

export default App;
