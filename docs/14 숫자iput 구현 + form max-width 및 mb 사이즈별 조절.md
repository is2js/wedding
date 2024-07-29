

- 최신버전
  - github:https://github.dev/mizzu-creations/tire-pick-responsive/blob/bf688e41f46dd982dd105813d582aad91d9e58d5/index.html
  - demo: https://tire-pick.vercel.app/







## html

1. 기본은 form-input과 동일하다.

   - 즉, div.form-input-wrapper >  input.form-input을 가져간다.

   ```html
   <div class="col-12">
       <div class="form-group d-flex flex-column">
           <label for="attendCount" class="form-label">동행인 수</label>
           <div class="form-input-wrapper d-flex align-items-center">
               <input type="number" class="form-input" id="attendCount" name="동행인 수"
                      min="1" max="5" length="1" value="1"
                      >
           </div>
       </div>
   </div>
   ```




### number input은 input.form-input 아래에 div.form-input-number-handler-wrapper를 추가한다.

1. input의 형제인 `div.form-input-number-handler-wrapper`는 `내부에 div태그 2개`로 구성된

   1. `.form-input-number-handler.form-input-number-handler-up`과
   2. `.form-input-number-handler.form-input-number-handler-down`
      - 2개의 자식을 가지며 이것들이 우측에 자리를 잡을 것이다.

   ```html
   <div class="form-input-wrapper d-flex align-items-center">
       <input class="form-input" id="attendCount2">
       <div class="form-input-number-handler-wrapper">
           <div class="form-input-number-handler form-input-number-handler-up">
           </div>
           <div class="form-input-number-handler form-input-number-handler-down">
           </div>
       </div>
   
   ```

### ✨ number hanlder wrapper는 abs로 우측상단 시작으로부터 form input wrapper에  w22px h100%로 떠있다.

2. css로 hanlder를 abs로 띄워서 붙혀준다.

   - border는 없지만 우상단/우하단은 input의 부모인 .form-input-wrappe(8px)과  border-radius를 동일하게 준다.

   ```css
   & .form-input-wrapper {
       width: 100%;
       max-height: 48px;
       overflow: hidden;
   
       border: 1px solid var(--greydd);
       border-radius: 8px;
   
       /* 추가요소 대비 */
       position: relative;
       /* number handler 관련 추가 */
   
       & .form-input-number-handler-wrapper {
           position: absolute;
           right: 0;
           top: 0;
           width: 22px;
           height: 100%;
   
   		background: var(--white);
           border-radius: 0 8px 8px 0;
   ```

   





### ✨✨ 내부의 up/down용 form-input-number-handler들은 각각이 상하 height 50%를 차지하며, 왼쪽만 보더를 가진다. 또한 내부에 꾸미기용 svg버튼을 가질 예정이다.

3. 각각을 height 50%로 준다. 글자에 의해서 넘칠 수 있으니, lh를 0으로 초기화해버린다.

   - 추후 svg를 가운데 배치할 건데, 가운데 정렬이 및  **abs 대비해서 relative로 준다.**
   - cursor-pointer로 클릭할 수 있게 표시한다.

   ```css
   & .form-input-number-handler {
   
       /*width: 100%;*/
       height: 50%;
       line-height: 0;
   
       border-left: 1px solid var(--greycd);
       overflow: hidden;
   
       text-align: center;
       color: var(--black-45);
   
       position: relative;
       transition: all .1s linear;
       
       cursor: pointer;
   }
   ```

   

#### 클릭하는 순간은 :active로 꾸민다.

4. 클릭하는 순간 약간 회색으로 바뀌게 한다.

   ```css
   & .form-input-number-handler {
   
       &:active {
           background: var(--greyf4);
       }
   ```

   



### ✨ 이제 up/down 각각 적용되게 css를 준다. 먼저, focus(모바일) / hover (웹) 시, 활성화된 곳을 height 60%!important로 늘리는데, 반대편 형제를 40%로 조절하기 힘들다 -> 부모hover/focus시 미리 전부 40%세팅해놓고, 활성화된쪽을 60%로 

5. 둘다 공통으로 `.form-input-number-handler`이지만, **모두 개별적으로 적용시켜야 한쪽만 적용된다.**

   ```css
   & .form-input-number-handler {
   
       &.form-input-number-handler-up:hover,
       &.form-input-number-handler-up:focus,
       &.form-input-number-handler-down:hover,
       &.form-input-number-handler-down:focus {
           height: 60% !important;
       }
   ```

   ![image-20240716211209296](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240716211209296.png)

6. **부모에서 hover/focus가 발생시, 미리 둘다 40%!important로 깔아놓고, 해당하는 상세에 60%가 되게 한다.**

   ```css
   & .form-input-number-handler-wrapper {
       
   	/* hover/focus시 자식 중 1개가 60%될 예정 -> 미리 hover/focus시 40%로 만들어놓기 */
       &:hover .form-input-number-handler,
       &:focus .form-input-number-handler {
           height: 40% !important;
       }
   
       &.form-input-number-handler-up:hover,
       &.form-input-number-handler-up:focus,
       &.form-input-number-handler-down:hover,
       &.form-input-number-handler-down:focus {
           height: 60% !important;
       }
   ```

   

### ✨ up에는 우상단radius만, down에는 우하단radius + border-top을 준다.

6. 하단에만 border-top을 준다.

   ```css
   &.form-input-number-handler-up {
       border-top-right-radius: 8px;
   }
   
   &.form-input-number-handler-down {
       border-bottom-right-radius: 8px;
       border-top: 1px solid var(--greycd);
       /*top: 0;*/
   }
   ```







### ✨ 각 handler 내부에는 flex 수직/수평가운데 정렬할 span.bg-img로 svg로 icon을 넣는다.(button은 form내부라 전송되버림)

7. **각 handler에서는 flex + 수직 + 수평가운데 정렬시킨다.**

   - **그래야 height가 늘어나도 정가운데 위치할 것이다.**

   ```html
   <div class="form-input-number-handler-wrapper">
       <div class="form-input-number-handler form-input-number-handler-up d-flex justify-content-center align-items-center"
            >
           <span class="bg-img button-number-handler-up"></span>
       </div>
       <div class="form-input-number-handler form-input-number-handler-down d-flex justify-content-center align-items-center"
            >
           <span class="bg-img button-number-handler-down"></span>
       </div>
   </div>
   ```

8. **각 배경이미지(화살표)를 8px로 button.css에 정의한다.**

   ```css
   .button-number-handler-up {
       width: 8px;
       height: 8px;
   
       background-image: url("../../images/svg/icons/form-number-handler-up.svg");
   }
   
   .button-number-handler-down {
       width: 8px;
       height: 8px;
   
       background-image: url("../../images/svg/icons/form-number-handler-down.svg");
   }
   
   ```

   ![image-20240716223805682](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240716223805682.png)







### ✨ number handler wrapper를 op 0에서 focus/hover시 op1로

1. 최상위 부모인 input-wrapper에서 `:hover`시

   - number hanlder wrapper의 op를 1로 변경하고 기본은 op0 + transition 적용

   ```css
   & .form-input-wrapper {
   
       &:hover, &:focus {
           border-color: #cdcdcd;
           border-right-width: 1px;
   
           /*최상위부모 hover시 up/down wrapper를 보이게*/
           & .form-input-number-handler-wrapper {
               opacity: 1;
           }
       }
       
       & .form-input-number-handler-wrapper {
   
           opacity: 0;
           /*opacity: 1;*/
           transition: opacity .24s linear .1s;
   ```

   







## alpinejs로 숫자올리고 내리기

### alpinejs에서는 input-number의 대쉬가 안된다. inputNumber로 정의

1. js로 정의하는데 **min/max와 plus/minus시 올라갈 단계 step을 정해준다.**

   - value는 min값으로 init에서 넣어준다.

   ```js
   Alpine.data('inputNumber', () => ({
       value: null,
       min: 1,
       max: 10,
       step: 1,
   
       init() {
           this.value = this.min;
       },
   }));
   ```

### ✨ radio/toggle과 달리, 요소를 통한 조절외 input자체도 사용되는 쌍방향이면 x-model로 처리해준다.

1. form-group에서 x-data를 초기하고 **input에서는 :value가 아니라 `input에서도 입력할 수 있으니 x-model 쌍방향`으로 처리해준다.**

   ```html
   <div class="col-12">
       <div class="form-group d-flex flex-column"
            x-data="inputNumber"
            >
           <label for="attendCount2" class="form-label">동행인 수</label>
           <div class="form-input-wrapper d-flex align-items-center">
               <input class="form-input"
                      id="attendCount2"
                      step="step"
                      x-model="value"
                      >
   ```

   





### ✨ min/max가 정해진 plus/minus 행위는,  올릴 때 Min( 올라간값 , max)로 max를 넘지못하게 / 내릴 땐 Max( 내려간값, min)으로 min보다 못내려가게 해준다.

3. js

   ```js
   Alpine.data('inputNumber', () => ({
       value: null,
       min: 1,
       max: 10,
       step: 1,
   
       init() {
           this.value = this.min;
       },
       plus() {
           this.value = Math.min(this.value + this.step, this.max);
       },
       minus() {
           this.value = Math.max(this.value - this.step, this.min);
       },
   }));
   ```

   ```html
   <div class="form-input-number-handler-wrapper">
       <div class="form-input-number-handler form-input-number-handler-up d-flex justify-content-center align-items-center"
            role="button"
            aria-label="Increase Value"
            aria-disabled="false"
            @click="plus()"
            >
           <span class="bg-img button-number-handler-up"></span>
       </div>
       <div class="form-input-number-handler form-input-number-handler-down d-flex justify-content-center align-items-center"
            role="button"
            aria-label="Decrease Value"
            aria-disabled="false"
            @click="minus()"
            >
           <span class="bg-img button-number-handler-down"></span>
       </div>
   </div>
   ```

   ![image-20240716233615940](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240716233615940.png)





### ✨ x-model의 유의사항은, 요소에서 검증이 있다면, input에서도 `x-on:input=""`에 검증이 들어가야한다.

4. input에서는 올라가는상황인지 내려가는 상황인지 모르니 **직접 if문으로 min/max와 비교해서, 상황을 판단과 동시에 할당을 해줘야한다.**

   - type="number"도 추가

   ```js
   checkValid() {
       // x-model인 input에서 입력시 min/max 범위 검사
       if (this.value < this.min) {
           this.value = this.min;
       } else if (this.value > this.max) {
           this.value = this.max;
       }
   },
   ```

   ```html
   <input class="form-input"
          id="attendCount2"
          type="number"
          step="step"
          x-model="value"
          x-on:input="checkValid"
          >
   ```

   - **-3을 입력하면 1로,  15를 입력하면 10으로 바뀐다.**



#### 사실 x-on은 숫자입력시 위험하다. 다지우면 min값이 걸림 -> @blur=""로 바꾼다. type="number"도 추가해준다.

```html
<input class="form-input"
       type="number"
       id="attendCount2"
       step="step"
       x-model="value"
       @blur="checkValid"
       >
```







## form 자체 수정



### 웹에서는 inline으로 form-input-wrapper에 추가class 동시적용시 max-width 적용되도록 추가한다.

- 이름은 웹화면에서 200px / 동행인 수는 .80px로 max-width를 제한시키자.

```css
& .form-input-wrapper {
    width: 100%;
    /* 웹에서 inline인 경우 input의 너비 제한 걸기 */
    @media (min-width: 768px) {
        &.md-max-width-80 {
            /* 동행인 수 */
            max-width: 80px;
        }

        &.md-max-width-200 {
            /* 이름 */
            max-width: 200px;
        }
    }
    max-height: 48px;
    overflow: hidden;
```

```html
<label for="name" class="form-label">성함</label>

<div class="form-input-wrapper md-max-width-200 d-flex align-items-center">

    <label for="attendCount2" class="form-label">동행인 수</label>
    <div class="form-input-wrapper md-max-width-80 d-flex align-items-center">
```







![image-20240716235523344](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240716235523344.png)







### form-group마다 mb가 너무 커서 좀 줄이자.

- 바꾸기 전

  ![image-20240716235739777](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240716235739777.png)

- mb를 낮추기

  ```css
  & .form-group {
      /*margin-bottom: 24px;*/
      margin-bottom: 10px;
  ```

  ![image-20240716235815990](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240716235815990.png)



#### 웹에서는 form-group아닌 버튼과 정렬이 안맞으니, 웹에서는 기존mb 24px 유지하기

![image-20240716235919639](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240716235919639.png)

```css
& .form-group {
    /* 모바일에선 mb 좀 줄이지만, d-flex 버튼들과 inline에서 수직정렬을 위해 기존 큰값 웹에서 유지 */
    margin-bottom: 10px;
    @media (min-width: 768px) {
        margin-bottom: 24px;
    }
```

![image-20240717000009869](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240717000009869.png)