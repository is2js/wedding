

- 최신버전
  - github:https://github.dev/mizzu-creations/tire-pick-responsive/blob/bf688e41f46dd982dd105813d582aad91d9e58d5/index.html
  - demo: https://tire-pick.vercel.app/







## html

1. 기본 틀을 만든다.

   ```html
   <div class="col-12">
       <div class="form-group d-flex flex-column">
           <label for="category" class="form-label">구분</label>
   		<div class="form-radio-wrapper d-flex align-items-center">
           </div>
       </div>
   </div>
   ```

   ```css
   & .form-radio-wrapper {
       width: 100%;
       max-height: 48px;
       overflow: hidden;
   
       /* 추가요소 대비 */
       position: relative;
   }
   ```

   

2. input을 품는label이 wrapper가 되어서 `input+circel`과 `text`를 나눠서 가진다.

   - 이 때 각 label을 모바일에선 between for 2개 / 웹에선 왼쪽정렬로 가지게 한다.
   - input+circle은 text와 가로배치를 위해, `d-inline-block`으로 만든다.

   ```html
   <div class="form-radio-wrapper d-flex align-items-center">
       <div class="form-radio d-flex align-items-center justify-content-between justify-content-md-start">
           <label class="form-radio-input-wrapper">
               <div class="form-radio-input-and-circle d-inline-block">
                   <input class="form-radio-input my-radio-input"
                          type="radio"
                          name="구분"
                          >
                   <span class="form-radio-circle"></span>
               </div>
               <span class="form-radio-text">신랑측</span>
           </label>
       </div>
   </div>
   ```

   



3. form-radio에 대한 css는 아직 없다(추후 vertical 적용)

4. form-ratio-wrapper에서는 form-input-wrapper의 공통 성질 4개 정도가 들어간다.

   ```css
   & .form-radio {
       & .form-radio-wrapper {
           width: 100%;
           max-height: 48px;
           overflow: hidden;
   
           /* 추가요소 대비 */
           position: relative;
   ```

5. form-radio-input-wrapper에서는 공통 input에 대한 글자크기 padding을 넣어준다.

   - **이 때, input+circel 과 text가 같이 순서대로 들어갈 예정이니 `inline-flex`로 만들어준다.**

   ```css
   & .form-radio-wrapper {
        width: 100%;
       max-height: 48px;
       overflow: hidden;
   
       /* 추가요소 대비 */
       position: relative;
       & .form-radio {
          
   
           & .form-radio-input-wrapper {
               display: inline-flex;
               flex-wrap: wrap;
               gap: 8px; /* input circle <-> text */
   
               color: var(--black-85);
   
               font-size: 17px;
               line-height: 24px;
               padding: 10px 0;
   
               position: relative;
   ```







### circle +input <-> text의 inline-flex에서 gap을 text뒤에도 적용시키기 위해, :after로 width0 자식 추가하기

6. gap을 텍스트 뒤에 넣어주기 위해 after로 마지막 자식을 width0으로 추가한다.

   ```css
   & .form-radio-input-wrapper {
       display: inline-flex;
       flex-wrap: wrap;
       gap: 8px; /* input circle <-> text */
   
       color: var(--black-85);
   
       font-size: 17px;
       line-height: 24px;
       padding: 10px 0;
   
       position: relative;
   
       /* gap을 text뒤에도 적용시키기 위해, :after로 width0 자식 추가하기 */
       /* -> 부모 flex에 gap을 안줘도 되게 된다. */
       &:after {
           content: "\a0";
           display: inline-block;
           overflow: hidden;
           width: 0;
       }
   ```



### ✨ radio의 circle은 div의 바깥circle + :after의 inner circle로 그린다.



7. input+circle에서 특정크기 만 차지하도록 div의 inlnie-block인 상태다.

   ```html
   <div class="form-radio-input-and-circle d-inline-block">
   ```

   - input은 label클릭으로 대체되어 안보여질 것이기 때문에 **17x17px의 원을 회색으로 그린다. 내부는 흰색이다.**

     - **이 때, `:after`로 내부circle을 그릴 것이기 때문에, 부모에서는 relative를 넣어줘야한다.**

     ```css
     
     & .form-radio-input-and-circle {
         cursor: pointer;
     
         /* inner circle은 after로 그릴 예정*/
         position: relative;
         & .form-radio-circle {
             display: block;
             width: 17px;
             height: 17px;
             top: 50%;
             transform: translateY(-50%);
     
             border: 1px solid #cdcdcd;
             border-radius: 50%;
             background-color: var(--white);
     
         }
     ```

     ![image-20240715222505528](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240715222505528.png)
     ![image-20240715222529399](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240715222529399.png)

     

   



8. **cursor-pointer를 label**자체에 씌워주자.

   ```css
   & .form-radio {
   
       & .form-radio-input-wrapper {
           cursor: pointer;
   
   ```

   



### ✨ inner서클을 form-radio-circle의 부모인 input-and-circle에서 after로 마지막 자식으로 미리 그려놓기

9. 부모에 rel을 넣어주고

   ```css
   & .form-radio-input-and-circle {
       /* inner circle은 after로 그릴 예정*/
       position: relative;
   ```

10. 마치 form-radio-circle의 형제처럼 마지막자식으로서 after를 그려준다.

    - **이 때, abs + block으로 그려주되 `left50% top50%`를 이용하여 왼쪽상단에서 내려와 중간에 위치하고 싶은데, `transform은 scale애니메이션 0 -> check시 0,5`로 맞출 예정이다.**
    - **그래서 width를 원래 배경circle과 동일한 크기를 주되 `margin  left/top을 절반씩 줄여서, 0.5배한 점의 크기중심을 옮겨놓는다`**
    - 추후 input이 체크되었을 때, `투명도0->1 스케일 0->0.5`가 적용될 것이지만 미리보기를 위해 미리 준다

    ```css
    & .form-radio-input-and-circle {
    
        &::after {
            content: "";
            position: absolute;
            display: block;
            left: 50%;
            top: 50%;
            /* scale 0.5가 적용될 예정이라, 절반만큼 중심을 좌상단으로 다시 옮긴다.*/
            margin-top: -8.5px;
            margin-left: -8.5px;
    
            width: 17px;
            height: 17px;
            border-radius: 17px;
    
            background-color: var(--purple6f);
    
            opacity: 1;
            transform: scale(0.5); /* 내부는 바깥선 너비폭을 가진상태로 1/2로 줄임*/
            transition: all .3s;
        }
    ```

    ![image-20240715225546180](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240715225546180.png)







### ✨✨ after는 nesting 형제 적용안되서 input:checked + 형제선택자를 사용못한다. -> alpinejs사용 가정하고 부모에 선택된 값일치할 때 chekced를 올려 .checked &::after{}로 부모 checked일 때 나::after:를 적용

11. 부모가 checked 일때 나인 `.checked &`​에 ​`:a:fter`를 이용한다.

    - 그전에 border도 회색 -> 보라색으로 바꿔주자.

    - 그 전에 after(inner circle)을 다시 투명도0 scale0으로 바꿔놓고 처리핮.

    ```css
    &::after {
    
        opacity: 0;
        transform: scale(0);
        transition: all .3s;
    }
    ```

    ```css
    /* -> after는 형제선택자로 input:checked가 적용안되서, 부모checked클래스 적용후 after를 변화시킨다. */
    /* alpinejs로 부모에 .checked를 넣어줘야한다.*/
    /*& input[type="radio"]:checked + .form-radio-circle {*/
    
    /* input check시 부모에 .checked 추가 후 -> circle 변화 */
    .checked & .form-radio-circle {
        border-color: var(--purple6f);
    }
    
    /* input check시 부모에 .checked 추가 후 -> inner circle 변화 */
    .checked &::after {
        opacity: 1;
        transform: scale(0.5); /* 내부는 바깥선 너비폭을 가진상태로 1/2로 줄임*/
    }
    ```

    





## alpinejs 적용

1. radio는 value만 있는게 아니라 text도 적용되어야해서 []배열이 아닌`json`으로 데이터를 미리 만들어놓는다.

   ```js
   document.addEventListener('alpine:init', () => {
       Alpine.data('radio', () => ({
           data: { '신랑측': 1, '신부측': 2},
           }
       }));
   ```

   

2. **여러개중 1개라서 selectedValue:null 변수를 초기화하고, `for문을 돌아서 선택될 key값`이 들어왔을 때, 할당해주는 set메서드도 구현한다.**

   ```js
   Alpine.data('radio', () => ({
   
       data: { '신랑측': 1, '신부측': 2},
   
       selectedValue: null,
       setValue(key) {
           this.selectedValue = this.data[key];
       }
   }));
   ```



### ✨json data를 for 순회하며 여러개의 radio input을 만들기

1. `<template x-for=""`로 순회하는데 **(key, index)를 `Object.keys()`로 json의 key를 순회한다**

   - key가 text이름이고, data[key]로 value를 가져올 수 있다.

   ```html
   <div class="col-12">
       <div class="form-group d-flex flex-column"
            x-data="radio"
            >
           <label class="form-label">구분</label>
           <div class="form-radio-wrapper d-flex align-items-center">
               <div class="form-radio d-flex align-items-center justify-content-between justify-content-md-start">
                   <template x-for="(key, index) in Object.keys(data)" :key="index">
                       <label class="form-radio-input-wrapper my-radio-wrapper"
   ```

   

2. 가장 먼저, 순회하는 value인 `data[key]`의 value가 selectedValue랑 동일할 때 **`form-radio-input-and-circle`의 부모였던 label태그의 class에 `checked`가 추가되어야한다.**

   - **동시에 label클릭시 setValue도 해줘야한다.**

   ```html
   <label class="form-radio-input-wrapper my-radio-wrapper checked"
          :class="{ 'checked': selectedValue == data[key]}"
          @click="setValue(key)"
          >
   ```

3. **key값을 기준으로 selectedValue와 확인하는 것도 메서드로 만든다.**

   ```js
   isSelected(key) {
       return this.selectedValue === this.data[key];
   },
   ```

   ```html
   <label class="form-radio-input-wrapper my-radio-wrapper"
          :class="{ 'checked': isSelected(key)}"
          @click="setValue(key)"
          >
   ```

4. 순회하며 input의 :value에는 data[key]를 넣어주면 해당 value가 들어갈 것이다.

   - 또한 텍스트는 x-text로 key를 넣어준다.
- **이 때 `:checked=`에 `isSelected(key)`도 넣어서 선택된 radio면 check되게 만든다.**
   
   ```html
   <label class="form-radio-input-wrapper my-radio-wrapper"
          :class="{ 'checked': isSelected(key) }"
          @click="setValue(key)"
          >
       <div class="form-radio-input-and-circle d-inline-block">
           <input class="form-radio-input d-none"
                  type="radio"
                  name="구분"
                  :value="data[key]"
                  :checked="isSelected(key)"
                  >
           <span class="form-radio-circle"></span>
       </div>
   
   	<span class="form-radio-text" x-text="key">신랑측</span>
</label>
   ```
   
   ![image-20240715233612480](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240715233612480.png)
   ![image-20240715233623650](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240715233623650.png)





### ✨ 여기서 가장 먼저 나오는 input은 checked상태로( + selectedValue에도 넣어두기)

1. 직접 checked를 만들지 말고 **selectedValue를 첫번째 것으로 `init`에서 채워두면, 알아서 class도 반영될 것이다.**

   - Object.keys()를 돌고 `[0]`첫번째 key를 꺼낸 뒤, `this.setValue(key)`를 활용하여 넣어준다.

   ```js
   init() {
       // 초기화 단계에서 첫 번째 항목을 선택
       const firstKey = Object.keys(this.data)[0];
       this.setValue(firstKey);
   },
   ```

   ![image-20240715234526579](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240715234526579.png)

2. `.form-radio`에서 약간의 gap을 만들어준다.

   ```css
   & .form-radio {
       /* flex w100  */
       width: 100%;
       /* 각 항목별 gap */
       gap: 8px;
   ```

   ![image-20240715234640900](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240715234640900.png)



3. 항목이 너무 많을때를 대비하여 flex-wrap도 추가해준다.

   ```html
   <div class="form-radio d-flex align-items-center flex-wrap">
   ```

   



### ✨ 추후 외부데이터 받는 것을 대비하여, onText, offText -> getText()를 적용하고, false는 false로 주지만, true는 onText로 주기

1. 초기에 toggle이 on이 되어있으려면 **text가 아닌 true값**이 들어가있어야한다.
   - **init에서 nextTick을 써서, true의 value를 onText로 바꾼다.**

```js
Alpine.data('toggle', () => ({
    isOn: true,
    value: true,
    offText: '참석 불가 😂',
    onText: '참석 가능 😍',
    toggle() {
        if (this.isOn) {
            this.isOn = false;
            this.value = false;
        } else {
            this.isOn = true;
            // this.value = true;
            // false는 false가 들어가야하지만, true는 string이 들어갈 수 있기 때문에, sheet를 위한 텍스트로 편하게 줌.
            this.value = this.onText;
        }
    },
    getText() {
        if (this.isOn) {
            return this.onText;
        } else {
            return this.offText;
        }
    },
    init() {
        // 초기화시 input에 true가 들어가야하는데, 한 틱 있다가 true값을 onText로 바꿔놓기
        this.$nextTick(() => {
            this.value = this.onText;
        });
    }
}));
```

```html
<!--참석여부 (checkbox -> toggle) by alpinejs-->
<div class="col-12">
    <div class="form-group d-flex flex-column"
         x-data="toggle"
         >
        <label for="isAttend" class="form-label">참석 여부</label>
        <div class="form-toggle-wrapper d-flex align-items-center">
            <div class="form-toggle d-flex justify-content-between align-items-center">
                <!-- text -->
                <span class="form-toggle-text"
                      :class="{'text-purple': isOn}"
                      x-text="getText()"
                      >참석 불가</span>
                <!-- toggle -->
                <label class="form-toggle-input-wrapper d-flex align-items-center">
                    <input id="isAttend" type="checkbox" class="d-none"
                           name="참석여부"
                           @change="toggle()"
                           :value="value"
                           >
                    <!--:value="isOn"-->
                    <div class="form-toggle-dot"></div>
                </label>
            </div>
        </div>
    </div>
</div>
```





## between만드는 자신flex도 w100이 필요하다

```html
<div class="form-radio d-flex align-items-center flex-wrap justify-content-between justify-content-md-start">
```

```css
& .form-radio {
    width: 100%;
```

![image-20240715233912252](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240715233912252.png)





- 별로 안이뻐서 그냥 좌측정렬되게 기준을 제거해준다.

  - cf -evenly

    ![image-20240715234044908](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240715234044908.png)

  ```html
  <div class="form-radio d-flex align-items-center">
  ```

  