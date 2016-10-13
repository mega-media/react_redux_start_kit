/**
 * Created by arShown on 2016/10/13.
 */
import React from 'react';
import BaseView, {ApplyStyles} from '~/Core/BaseView';

@ApplyStyles()
export default class Hello extends BaseView {
    constructor(props, context) {
        super(props, context);
        this.state = {
            activePage: this.getPathname()
        };
        this.pageArray = [
            {
                route: "welcome",
                title: "Hello World !",
                file: "Hello.json"
            },
            {
                route: "input",
                title: "Input your name.",
                file: "Input.json"
            },
            {
                route: "counter",
                title: "Click counter.",
                file: "Counter.json"
            },
            {
                route: "btnClick",
                title: "Buttons click.",
                file: "Buttons.json"
            },
            {
                route: "style",
                title: "Customize styles.",
                file: "Styles.json"
            },
            {
                route: "flow",
                title: "Hello Flow !",
                file: "Flow.json"
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
                            <div styleName="panel-body">
                                {docJSON.target}
                            </div>
                        </div>
                        <div styleName="panel panel-default">
                            <div styleName="panel-heading">
                                <h3 styleName="panel-title">
                                    相關應用與說明
                                </h3>
                            </div>
                            <div styleName="panel-body">
                                {docJSON.desc}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}