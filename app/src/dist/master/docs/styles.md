##### ☆ 套用自訂樣式檔

載入樣式檔
``` js
import customStyle from './styleFile.css'
```

使用 applyStyles 嵌套進元件中
``` js
import { applyStyles } from '@core/container';

@applyStyles(customStyle)
export default class YourComponent extends React.Component { ... }
```

使用 hoc - withStyle 嵌套進元件中
``` js
import { withStyle } from '@core/container';

export class YourComponent extends React.Component { ... }
export default withStyle(customStyle)(YourComponent);
```

---

##### ☆ 使用外部檔案 - 以圖片為例

載入外部檔案與載入系統檔案方式相同
``` js
// import
import imageUrl from './imageFile.jpg';

// component
render() {
  return <img src={imageUrl} />
}
```


支援載入的外部檔案副檔名包含：
- 資料格式：`.json`
- 圖片：`.jpeg` `.jpg` `.png` `.gif` `.svg` `.ico`
- 多媒體：`.mp4` `.swf`
- 字型：`.woff` `.woff2` `.ttf` `.eot`

