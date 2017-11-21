import React, { PureComponent } from 'react';
import { applyStyles } from '../../core/container/css-module';
import image from './assets/images/image.png';
import styles from './assets/stylesheets/style.scss';

/**
 * 套用自訂樣式檔案，只需在裝飾方法 applyStyles 給予參數(樣式檔)
 * 即可使用自定義的 class name
 *
 * 需注意的是：
 * 自定義的 `類別名稱` 將會覆蓋掉與 Bootstrap 或 Font Awesome 重複的類別名稱
 */
@applyStyles(styles)
export default class Style extends PureComponent {
  render() {
    /**
     * 圖片引入時會被轉換成 `相對路徑`
     */
    return (
      <div styleName="row">
        <div styleName="col-sm-6">
          圖片：
          <div styleName="myImg">
            <img styleName="img-responsive img-thumbnail" src={image} />
          </div>
        </div>
        <div styleName="col-sm-6">
          自定義樣式：(來源 -
          <a href="http://a.singlediv.com/" target="_blank">
            {`http://a.singlediv.com/`}
          </a>
          )
          <div styleName="myDiv">
            <div styleName="marioMushroom" />
          </div>
        </div>
      </div>
    );
  }
}
