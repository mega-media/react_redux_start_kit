### 核心檔的擴充
核心檔隨時會進行更新，為了保持程式乾淨與更新方便，**不應去更動到核心檔案**。
而在專案開發的過程中，不同專案類型會有不同的需求，當專案提供的 container hoc 、 action effect 無法滿足開發使用，則可自行添加擴充檔案。

---

### 如何擴充

找到目錄資料夾： `app/extensions` ，這是放置擴充檔案的地方，檔案深度只允許兩層。

在裡面已有檔案範例:
```
extensions
  ⊢ action.effects [1]
    ⊢ cancel.js
    ∟ cancel-all.js [2]
  ⊢ store.middleware
    ⊢ _logger.js [3]
    ∟ redux-observable.js
```

1. 第一層資料夾對應的是 `app/core` 底下的路徑。
  action.effects 即是 `app/core/action/effects/`
2.  第二層放置想要擴充的檔案。檔案名稱若使用連接符號連接，系統轉成引入的函式時，會變成 **駝峰式命名**
3.  若擴充檔案名稱開頭為 `_` ，則不會引入該檔案
