/**
 * Created by arShown on 2016/10/13.
 */
import React from 'react';

export default class Input extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.state = {
            name: null
        }
    }

    changeHandler() {
        this.setState({name: this.refs.name.value});
    }

    render() {
        const {name} = this.state;
        return (
            <div>
                Who are you? <input ref="name"
                                    placeholder="input your name..."
                                    onChange={this.changeHandler.bind(this)}/>
                {(() => {
                    if (name)
                        return (<div>Hello ! {name}</div>)
                })()}
            </div>
        );
    }
}