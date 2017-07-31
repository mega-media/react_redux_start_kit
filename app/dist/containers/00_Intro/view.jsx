import React from 'react';
import { Link } from 'react-router-dom';
import { applyStyles } from '~/core/baseView';
import style from './assets/stylesheets/style.scss';

@applyStyles(style)
export default class Intro extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      activePage: props.history.location.pathname
    };
    this.pageArray = [
      {
        route: '/welcome',
        title: '1. Hello World !',
        file: 'Hello.jsx'
      },
      {
        route: '/input',
        title: '2. Input your name.',
        file: 'Input.jsx'
      },
      {
        route: '/counter',
        title: '3. Click counter.',
        file: 'Counter.jsx'
      },
      {
        route: '/btnClick',
        title: '4. Buttons click.',
        file: 'Buttons.jsx'
      },
      {
        route: '/style',
        title: '5. Customize styles.',
        file: 'Styles.jsx'
      },
      {
        route: '/flow',
        title: '6. Hello Flow !',
        file: 'Flow.jsx'
      },
      {
        route: '/locale',
        title: '7. Locales.',
        file: 'Locales.jsx'
      },
      {
        route: '/test',
        title: '8. Unit test.',
        file: 'UnitTest.jsx'
      }
    ];
  }

  checkRouteLegal = activePage => {
    this.setState({
      activePage: this.pageArray.some(obj => obj.route === activePage)
        ? activePage
        : '/welcome'
    });
  };

  componentWillReceiveProps(nextProps) {
    this.checkRouteLegal(nextProps.history.location.pathname);
  }

  componentWillMount() {
    const { activePage } = this.state;
    this.checkRouteLegal(activePage);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.state.activePage !== nextState.activePage;
  }

  render() {
    const { children } = this.props;
    const { activePage } = this.state;
    const navComponents = this.pageArray.map(obj =>
      <Link
        key={obj.route}
        styleName={`list-group-item ${obj.route === activePage
          ? 'list-group-item-info'
          : ''}`}
        to={obj.route}>
        {obj.title}
      </Link>
    );
    const activeObj = this.pageArray.find(obj => obj.route === activePage);
    const docJSON = require('./docs/' + activeObj.file);
    return (
      <div styleName="container">
        <div styleName="page-header">
          <h1>React Redux Start Kit</h1>
        </div>
        <div styleName="row">
          <div styleName="col-sm-4">
            <ul styleName="list-group">
              {navComponents}
            </ul>
          </div>
          <div styleName="col-sm-8">
            <div styleName="panel panel-default">
              <div styleName="panel-heading">
                <h3 styleName="panel-title">
                  {activeObj.title}
                </h3>
              </div>
              <div styleName="panel-body">
                {children}
              </div>
            </div>
            <div styleName="panel panel-default">
              <div styleName="panel-heading">
                <h3 styleName="panel-title">學習指標</h3>
              </div>
              <div styleName="panel-body doc">
                {docJSON.target}
              </div>
            </div>
            <div styleName="panel panel-default">
              <div styleName="panel-heading">
                <h3 styleName="panel-title">相關應用與說明</h3>
              </div>
              <div styleName="panel-body doc">
                {docJSON.desc}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
