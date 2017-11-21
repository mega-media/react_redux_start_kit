import React, { PureComponent } from 'react';
import { Link } from 'react-router-dom';
import { applyStyles } from '../../core/container/css-module';
import style from './assets/stylesheets/style.scss';

@applyStyles(style)
export default class Intro extends PureComponent {
  state = {
    activePage: '',
    samplePage: false
  };
  pageArray = [
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
    },
    {
      route: '/hoc',
      title: '9. Container HOC',
      file: 'Hoc.jsx'
    },
    {
      route: '/saga',
      title: '10. Saga effects',
      file: 'Saga.jsx'
    },
    {
      route: '/api',
      title: '11. Fetch API',
      file: 'Api.jsx'
    }
  ];

  sampleArray = [
    {
      route: '/todo',
      title: 'TODO'
    }
  ];

  checkRouteLegal = activePage => {
    const isSample = this.sampleArray.some(obj => obj.route === activePage);
    const isLegal = this.pageArray.some(obj => obj.route === activePage);
    this.setState({
      activePage: isLegal || isSample ? activePage : '/welcome',
      samplePage: isSample
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
    const { activePage, samplePage } = this.state;

    return (
      <div styleName="container">
        <div styleName="page-header">
          <h1>React Redux Start Kit</h1>
        </div>
        <div styleName="row">
          <div styleName="col-sm-4">
            <ul styleName="list-group">
              {this.pageArray.map(obj =>
                <Link
                  key={obj.route}
                  styleName={`list-group-item ${obj.route === activePage
                    ? 'list-group-item-info'
                    : ''}`}
                  to={obj.route}>
                  {obj.title}
                </Link>
              )}
            </ul>
            <ul styleName="list-group">
              <a styleName="list-group-item disabled">進階應用</a>
              {this.sampleArray.map(obj =>
                <Link
                  key={obj.route}
                  styleName={`list-group-item ${obj.route === activePage
                    ? 'list-group-item-info'
                    : ''}`}
                  to={obj.route}>
                  {obj.title}
                </Link>
              )}
            </ul>
          </div>
          <div styleName="col-sm-8">
            {(() => {
              if (!samplePage) {
                const activeObj = this.pageArray.find(
                  obj => obj.route === activePage
                );
                const { target, desc } = require('./docs/' + activeObj.file);
                return (
                  <div>
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
                    {target
                      ? <div styleName="panel panel-default">
                          <div styleName="panel-heading">
                            <h3 styleName="panel-title">學習指標</h3>
                          </div>
                          <div styleName="panel-body doc">
                            {target}
                          </div>
                        </div>
                      : null}
                    {desc
                      ? <div styleName="panel panel-default">
                          <div styleName="panel-heading">
                            <h3 styleName="panel-title">相關應用與說明</h3>
                          </div>
                          <div styleName="panel-body doc">
                            {desc}
                          </div>
                        </div>
                      : null}
                  </div>
                );
              } else {
                const { title = 'unknown' } =
                  this.sampleArray.find(obj => obj.route === activePage) || {};
                return (
                  <div styleName="panel panel-default">
                    <div styleName="panel-heading">
                      <h3 styleName="panel-title">
                        {title}
                      </h3>
                    </div>
                    {children}
                  </div>
                );
              }
            })()}
          </div>
        </div>
      </div>
    );
  }
}
