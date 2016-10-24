/**
 * Created by arShown on 2016/10/13.
 */
import React from 'react';
import BaseView, {ApplyStyles} from '~/Core/BaseView';
import style from './assets/stylesheets/style.scss'

@ApplyStyles(style)
export default class Hello extends BaseView {
    constructor(props, context) {
        super(props, context);
        this.state = {
            activePage: this.getPathname()
        };
        this.pageArray = [
            {
                route: "welcome",
                title: "1. Hello World !",
                file: "Hello.jsx"
            },
            {
                route: "input",
                title: "2. Input your name.",
                file: "Input.jsx"
            },
            {
                route: "counter",
                title: "3. Click counter.",
                file: "Counter.jsx"
            },
            {
                route: "btnClick",
                title: "4. Buttons click.",
                file: "Buttons.jsx"
            },
            {
                route: "style",
                title: "5. Customize styles.",
                file: "Styles.jsx"
            },
            {
                route: "flow",
                title: "6. Hello Flow !",
                file: "Flow.jsx"
            }
        ];
    }

    changeHandler(route) {
        const {activePage} = this.state;
        if (activePage !== route) {
            this.setState({activePage: route});
            this.redirectTo(route);
        }
    }

    render() {
        const {activePage} = this.state;

        const navComponents = this.pageArray.map(obj => (
            <a key={obj.route} href="javascript:void(0)"
               styleName={`list-group-item ${obj.route === activePage ? "list-group-item-info" : ""}`}
               onClick={this.changeHandler.bind(this,obj.route)}>
                {obj.title}
            </a>
        ));

        const activeObj = this.pageArray.filter(obj => obj.route === activePage)[0];

        const docJSON = require("./docs/" + activeObj.file);

        return (
            <div styleName="container">
                <div styleName="page-header">
                    <h1>
                        React Redux Start Kit
                    </h1>
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
                                {this.props.children}
                            </div>
                        </div>
                        <div styleName="panel panel-default">
                            <div styleName="panel-heading">
                                <h3 styleName="panel-title">
                                    學習指標
                                </h3>
                            </div>
                            <div styleName="panel-body doc">
                                {docJSON.target}
                            </div>
                        </div>
                        <div styleName="panel panel-default">
                            <div styleName="panel-heading">
                                <h3 styleName="panel-title">
                                    相關應用與說明
                                </h3>
                            </div>
                            <div styleName="panel-body doc">
                                {docJSON.desc}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}