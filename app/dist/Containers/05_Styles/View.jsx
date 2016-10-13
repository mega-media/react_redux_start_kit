/**
 * Created by arShown on 2016/10/13.
 */
import React from 'react';
import {ApplyStyles} from '~/Core/BaseView';
import image from './assets/images/image.png';
import styles from './assets/stylesheets/style.scss';

@ApplyStyles(styles)
export default class Style extends React.Component {
    constructor(props, context) {
        super(props, context);
    }

    render() {
        return (
            <div>
                圖片：
                <div styleName="myImg">
                    <img styleName="img-responsive img-thumbnail" src={image}/>
                </div>
                自定義樣式：
                <div styleName="myDiv">
                    <div styleName="marioMushroom"></div>
                </div>
                來源：<a href="http://a.singlediv.com/" target="_blank">{`http://a.singlediv.com/`}</a>
            </div>
        );
    }
}

