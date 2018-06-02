import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { applyStyles } from '~/core/container';
import style from './assets/style.scss';

@applyStyles(style)
export default class Doc extends PureComponent {
  state = {
    activePage: '/intro'
  };

  pageArray = [
    {
      route: '/intro',
      title: '0. Intro',
      file: 'Intro.jsx'
    },
    {
      route: '/hello',
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
    },
    {
      route: '/hoc',
      title: '9. Container HOC',
      file: 'Hoc.jsx'
    }
  ];

  sampleArray = [
    {
      route: '/extension',
      title: 'Core extensions',
      file: null
    },
    {
      route: '/saga',
      title: 'Extension middleware - redux-saga',
      file: 'Saga.jsx'
    },
    {
      route: '/observable',
      title: 'Extension middleware - redux-observable',
      file: 'Observable.jsx'
    }
  ];

  checkRouteLegal = activePage => {
    this.setState(
      ({ activePage: initPage }) => ({
        activePage: [...this.pageArray, ...this.sampleArray].some(
          obj => obj.route === activePage
        )
          ? activePage
          : initPage
      }),
      () => {
        PR.prettyPrint();
      }
    );
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
    const { route, title, file } = [
      ...this.pageArray,
      ...this.sampleArray
    ].find(obj => obj.route === activePage);

    let docFile = {};
    if (file) docFile = require('./docs/' + file);

    return (
      <div styleName="container">
        <div styleName="page-header">
          <h1>
            React Redux Start Kit
            <small> v.{VERSION}</small>
          </h1>
        </div>
        <div styleName="row">
          <div styleName="col-sm-4">
            <ul styleName="list-group">
              {this.pageArray.map(obj => (
                <Link
                  key={obj.route}
                  styleName={`list-group-item ${
                    obj.route === activePage ? 'list-group-item-info' : ''
                  }`}
                  to={obj.route}>
                  {obj.title}
                </Link>
              ))}
            </ul>
            <ul styleName="list-group">
              <a styleName="list-group-item disabled">進階應用</a>
              {this.sampleArray.map(obj => (
                <Link
                  key={obj.route}
                  styleName={`list-group-item ${
                    obj.route === activePage ? 'list-group-item-info' : ''
                  }`}
                  to={obj.route}>
                  {obj.title}
                </Link>
              ))}
            </ul>
          </div>
          <div styleName="col-sm-8">
            <div>
              <div styleName="panel panel-default">
                <div styleName="panel-heading">
                  <h3 styleName="panel-title">{title}</h3>
                </div>
                <div styleName="panel-body">{children}</div>
              </div>
              {docFile.target ? (
                <div styleName="panel panel-default">
                  <div styleName="panel-heading">
                    <h3 styleName="panel-title">學習指標</h3>
                  </div>
                  <div styleName="panel-body doc">{docFile.target}</div>
                </div>
              ) : null}
              {docFile.desc ? (
                <div styleName="panel panel-default">
                  <div styleName="panel-heading">
                    <h3 styleName="panel-title">相關應用與說明</h3>
                  </div>
                  <div styleName="panel-body doc">{docFile.desc}</div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
