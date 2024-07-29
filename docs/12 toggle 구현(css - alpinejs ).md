

- 최신버전
  - github:https://github.dev/mizzu-creations/tire-pick-responsive/blob/bf688e41f46dd982dd105813d582aad91d9e58d5/index.html
  - demo: https://tire-pick.vercel.app/





## html

### 마찬가지로 col-12 > .form-group > label + .form-[toggle]-wrapper 구조로 시작한다.

```html
<div class="col-12">
    <div class="form-group d-flex flex-column">
        <label for="isAttend2" class="form-label">참석 여부</label>
        <div class="form-toggle-wrapper d-flex align-items-center">
            
        </div>
    </div>
```





### .form-wrapper안에서는 div.form-toggle이 between으로 [span텍스트] + [input을머금은label input-wrapper]로 나누어진다.

```html
<div class="form-toggle d-flex justify-content-between align-items-center">
    <span class="form-toggle-text ">참석 불가</span>
    <label class="form-toggle-input-wrapper d-flex align-items-center">
    </label>
</div>
```





### css로 .form-input-wrapper 및 .form-input과의 공통점을 디자인한다

- width/max-height 등은 wrapper끼리 동일하다
- .form-input과 달리, .form-toggle은 w100%을 위한 display:block이 필요없고 자기 width만큼 차지할 것이다.

```css
& .form-toggle-wrapper {
    width: 100%;
    max-height: 48px;
    overflow: hidden;

    /* 추가요소 대비 */
    position: relative;

    & .form-toggle {
        /*display: block;*/
        width: 100%;
    }
}
```

![image-20240713054742587](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240713054742587.png)







### label 내부에서 hidden input[type="checkbox"]의 형제로 div.form-toggle-dot으로 그림을 그린다.

1. 일단 `.form-toggle-text`부터 **기존의 input과 같은 lh + fz**로 그린다.

   ```css
   /* 토글 텍스트 */
   .form-toggle-text {
   
       font-weight: 400;
       font-size: 17px;
       line-height: 24px;
   
       white-space: pre-wrap;
       word-break: keep-all;
   
       color: var(--grey96);
   }
   ```

   

2. 이제 형제관계의 `label.form-toggle-input-wrapper`를 정의한다

   - **내부에 `hidden(d-none)될 input`**
   - **토글모양을 그릴 `div.form-roggle-dot`을 가진다.**

   ```html
   <label class="form-toggle-input-wrapper d-flex align-items-center">
       <input id="isAttend2" type="checkbox" class="d-none">
       <div class="form-toggle-dot"></div>
   </label>
   ```

   

   



### 비활성화된 토글 그리기 .form-toggle-dot에 배경 -> before로 첫번째 자식으로서 동그라미를 그린다.

1. 회색 배경그리기

   - before가 들어갈 예정이라 rel
   - **div(block)을 inlineblock으로 너비만큼만 차지하도록 변경**
     - **min-width**로 50px부터 커지는 **가로만 길어지는 타원을 준비** 적용
     - height 30px 고정 적용
   - div지만 cursor-point로 클릭가능하게
   - border-radius 16px
     - border + 배경색 모두 회색

   ```css
   .form-toggle-input-wrapper {
   
       & .form-toggle-dot {
           display: inline-block;
           min-width: 50px;
           height: 30px;
   
           cursor: pointer;
   
           border-radius: 16px;
           border: 1px solid var(--greydd);
           background: var(--greydd);
   
           transition: all 0.3s ease 0s;
           position: relative;
   
       }
   ```

   ![image-20240713235754741](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240713235754741.png)





2. before를 그린다.

   - **left: 2px로, 왼쪽에서 살짝 떨어진다.**
   - top0 bottom0으로 상하는 전체 다 채운다.
   - width와 height를 같이 주고 + radius 100%로 원을 준비하고 
   - 배경흰색 + box-shadow까지 준다.
   - cursor pointer
   - **부모인 toggle-dot도 같이 변할거라 둘다 transition을 준다.**

   ```css
   & .form-toggle-dot {
       display: inline-block;
       min-width: 50px;
       height: 30px;
   
       cursor: pointer;
   
       border-radius: 16px;
       border: 1px solid var(--greydd);
       background: var(--greydd);
   
       position: relative;
   
       transition: all 0.3s ease 0s;
   
       &:before {
           position: absolute;
           content: "";
   
           /*min-width: 26px;*/
           width: 26px;
           height: 26px;
           margin: auto;
   
           left: 2px;
           top: 0;
           bottom: 0;
   
           border-radius: 100%;
           background: var(--white);
           box-shadow: rgba(0, 0, 0, 0.15) 0 3px 8px, rgba(0, 0, 0, 0.06) 0 3px 1px;
   
           cursor: pointer;
           transition: all 0.3s ease 0s;
       }
   }
   ```

   ![image-20240714001304013](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240714001304013.png)



### ✨ `앞쪽 형제 + 나`의 조건으로 앞쪽 형제 input이 checked되었을 때 활성하된 토글 그리기

1. 회색타원은 `보더색 + 배경색`을 바꾼다.

   ```css
   & input[type="checkbox"]:checked + .form-toggle-dot {
   
       border: 1px solid rgb(123, 63, 241);
       background: rgb(123, 63, 241);
   }
   ```

   



#### ✨✨ 토글 before 동그라미의 활성화는 left 2px -> left초기화 + right 2px로 주면 transition이적용안된다. -> transform 적용

2. left로 시작하지만, 이동은 transformㅇ로 한다.

   ```css
   & input[type="checkbox"]:checked + .form-toggle-dot {
   
       border: 1px solid rgb(123, 63, 241);
       background: rgb(123, 63, 241);
       
       &:before {
           transform: translateX(calc(100% - 8px));
       }
   }
   ```

   ![image-20240714153537793](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240714153537793.png)







### ✨ between되는 text/toggle을 모바일에선 2(최소80px):1/ 웹에서는 inline으로서 1:1로

1. text는 모바일에서 toggle에 비해 2배까지 늘어나게한다.

   - **flex-basis로서 최소 80px를 차지하게 한다.**

   ```css
   .form-toggle-text {
       flex: 2 0 80px;
       @media (min-width: 768px) {
           flex: 1 0 auto;
       }
   ```

2. toggle은 늘어나지도 줄어들지도 않게 한다.

   ```css
   .form-toggle-input-wrapper {
       flex: 0 0 auto;
   }
   ```

   ![image-20240714161921581](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240714161921581.png)

   ![image-20240714161937197](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240714161937197.png)

3. **이제 form-input들과 inline에서 높이를 맞추기 위해 상하여백만 span태그에 준다.**

   ```css
   .form-toggle-text {
       flex: 2 0 80px;
       @media (min-width: 768px) {
           flex: 1 0 auto;
       }
   
       font-weight: 400;
       font-size: 17px;
       line-height: 24px;
       /* .form-input과 높이 맞추기 위해 */
       padding: 10px 0;
   ```

   ![image-20240715080315912](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240715080315912.png)

4. 최소한의 간격을 gap으로 만들어주기

   ```css
   & .form-toggle {
       /*display: block;*/
       width: 100%;
       /* inline에서 최소한의 간격*/
       gap: 8px;
   ```

   ![image-20240715080739037](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240715080739037.png)





## form.js(alpinejs)



1. form.js를 만들고, html에 추가한다.

   ```html
   <script src="./js/form.js"></script>
   ```

2. **alpinejs에서 변수를 `isOn`상태변수로 주고, toggle기능을 만들되, `텍스트`도 같이 토글한다.**

   ```js
   document.addEventListener('alpine:init', () => {
       // toggle (checkbox)
       Alpine.data('toggle', () => ({
           isOn: false,
           value: '참석 불가',
           toggle() {
               if (this.isOn) {
                   this.isOn = false;
                   this.value = '참석 불가';
               } else {
                   this.isOn = true;
                   this.value = '참석 가능';
               }
           }
       }));
   });
   ```

3. x-data.를 label을 포함하여 일단 푼다

   ```html
   <div class="col-12">
       <div class="form-group d-flex flex-column"
            x-data="toggle"
            >
           <label for="isAttend2" class="form-label">참석 여부</label>
           <div class="form-toggle-wrapper d-flex align-items-center">
   ```

   

### ✨ checkbox는 input의 @change에 toggle()을 넣고, x-model이 아닌 :value로 상태값만 받아먹는다.(@click으로 변화를 상대에 영향x)

4. 쌍방적용인 x-model을 적용하지 않는 이유는 `@click`으로 자신도 변화시키는게 아니라 `@change`로 input html의 변화를 받아먹기 때문에, `:value로 받아먹기만 한다.`

   ```html
   <!-- toggle -->
   <label class="form-toggle-input-wrapper d-flex align-items-center">
       <input id="isAttend2" type="checkbox" class="d-none"
              @change="toggle()" :value="value">
       <!--:value="isOn"-->
       <div class="form-toggle-dot"></div>
   </label>
   ```

5. 텍스트도 받아먹도록 x-text를 넣고, 글자색을:class로 반영해준다.

   ```html
   <!-- text -->
   <span class="form-toggle-text"
         :class="{'text-purple': isOn}"
         x-text="value"
         >참석 불가</span>
   ```

   

