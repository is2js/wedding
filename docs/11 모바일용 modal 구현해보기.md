

- 최신버전
  - github:https://github.dev/mizzu-creations/tire-pick-responsive/blob/bf688e41f46dd982dd105813d582aad91d9e58d5/index.html
  - demo: https://tire-pick.vercel.app/





## html

1. 최하단에  main끝 / footer 끝 / 이후 `aside`태그로 만든다.

   - **이 때, dialog태그에 `open` 속성을 배정한다.**

   ```html
   <aside class="mobile-modal">
       <dialog open>
           <div class="mobile-modal-header">
               헤더
           </div>
           <div class="mobile-modal-body">
               내용
           </div>
           <div class="mobile-modal-buttons">
               <button>오늘은 그만보기</button>
               <button>닫기</button>
           </div>
       </dialog>
   </aside>
   ```

   ![image-20240710004200040](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240710004200040.png)





2. dialog태그를 backdrop으로 화면을 전체 덮어야한다

   - **일단 `layout/modal.css`를 생성하고,  style.css에서 import한다.**

   ```css
   /*layout*/
   @import url("layout/header.css"); /* 헤더 */
   @import url("layout/main.css"); /* main with secetions */
   @import url("layout/modal.css"); /* modal */
   ```



### 최상위aside태그는, 길이를 위한 d-block + w100%h100vh로 꽉 채운 상태에서 pos:fixed+bottom:0부터시작+z-index:1000;으로 덮는다.



3. aside태그가 backdrop으로서, css로 처리해줘야한다.

   ```css
   .mobile-modal {
       /* 크기를 주기 위해*/
       display: block;
       width: 100%;
       height: 100vh;
   
       position: fixed;
       bottom:0;
       z-index: 1000;
   
       background-color: rgba(0, 0, 0, 0.3);
   
   }
   ```

   ![image-20240710010013254](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240710010013254.png)





### 내부 컨텐츠의 부모 dialog[open]는 anim도 적용 예정 /  w100%로 bakcdrop을 가로로 채우되 absolute + bottom 0으로 fixed+화면전체+bottom0을 가로전체+내용물만큼 아래에서 채운다.



4. dialog는 **가로는 w100%에 min/max-width를 가지며 abs + bottom0으로 높이크기만큼을 아래부터** 채우도록 하는데,

   - padding 0 / border-box / border:none을 주고
     - border:none으로 내부 버튼의 border도 없어진다?!
   - **좌우상단만 border-radius**를 주되 **내용물이 radius 위쪽으로 넘치면 overflow:hidden시키게 한다**

   ```css
   .mobile-modal {
   
       & dialog {
           width: 100%;
           min-width: 328px;
           /*max-width: 767px;*/
           max-width: 1185px;
   
           position: absolute;
           bottom: 0;
   
           padding: 0;
           box-sizing: border-box;
           border: none;
           border-radius: 16px 16px 0 0;
           /* 좌우상단 radius를 넘는 내용물을 숨긴다.*/
           overflow: hidden;
       }
   }
   ```

   ![image-20240710011529940](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240710011529940.png)

   - 추가로 배경색을 흰색을 준다.

     ```css
     /* my */
     background-color: var(--white);
     ```

     ![image-20240710012440276](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240710012440276.png)







### no 광고용 header



1. header는 div에 **좌우패딩20 + 상32하16으로 절반**으로 텍스트 공간을 만들고

   - **height가 없는 상태로 `lh로 높이`를 잡고 fz를 조금 작게 준다.  **
   - **div안에 텍스트만 -> 가운데정렬은 `text-align`으로 준다.**

   ```css
   & .mobile-modal-header {
       padding: 32px 20px 16px;
   
       line-height: 30px;
       font-size: 20px;
       font-weight: 700;
   
       text-align: center;
   }
   ```

   ![image-20240710013929709](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240710013929709.png)





2. 엑스버튼은 헤더내부에서 abs로 띄운다.

   - **헤더자체의 상여백32 , 오른여백 20px**을 top/right px로 줘서 띄운다.

   ```html
   <div class="mobile-modal-header">
       헤더
       <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
       </svg>
   </div>
   ```

   ```css
   & .mobile-modal-header {
       padding: 32px 20px 16px;
   
       line-height: 30px;
       font-size: 20px;
       font-weight: 700;
   
       text-align: center;
   
       & svg {
           position: absolute;
           top: 32px;
           right: 20px;
       }
   }
   ```

   ![image-20240710024626283](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240710024626283.png)





### 광고용 하단 buttons

1. form이 들어가면 내부에서 전송 버튼 등이 있을 것이다.

   - 하지만 광고는 헤더없이 button으로 처리될 것이다.
   - **반반나눠야하니, flex -> 각 item들은 `grow:1`을 만든다.**

   ```html
   <div class="mobile-modal-buttons d-flex">
       <button class="flex-grow-1">오늘은 그만보기</button>
       <button class="flex-grow-1">닫기</button>
   </div>
   ```

   ![image-20240710025041331](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240710025041331.png)





2. **일단 하단의 배경을 흰색으로 주고**

   - **버튼으로서 패딩으로 여백을 준 뒤**
   - **2개 중 마지막꺼에 글자를 진하게 준다.**

   ```css
   & .mobile-modal-buttons {
       background-color: var(--white);
   
       & button {
           padding: 16px 20px;
   
           font-size: 15px;
           font-weight: 500;
           color: var(--grey5a);
   
           /* 오른쪽 버튼은 글씨 진하게 */
           &:last-child {
               font-weight: 700;
           }
       }
   }
   ```

   ![image-20240710025256907](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240710025256907.png)





### 중간 body

1. 일단 헤더의 좌우여백인 20px 패딩을 준다.

   - 광고가 없다고 가정하고 아래쪽 여백도 준다

   ```css
   & .mobile-modal-body {
       padding: 0px 20px 24px;
   }
   ```

   ![image-20240710030157103](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240710030157103.png)





## 크고 끄는 것을 js가 아닌 alpinejs으로 



### modal도 header처럼 전역변수isOpen를 전역html에서 컨트롤 -> 로컬은 init에서 watch하여 로컬변수isOpen으로 보이고/안보이고를 편하게만

1. modal.js를 만들고 body에 추가한다.

   ```html
   <script src="./js/modal.js"></script>
   ```

2. alpine:init에 isOpen만 선언해놓고

   ```js
   document.addEventListener('alpine:init', () => {
       Alpine.store('modal', {
           isOpen: false,
       });
   
       Alpine.data('mobileModal', () => ({
           isOpen: false,
           init() {
               this.$watch(() => Alpine.store('modal').isOpen, value => {
                   this.isOpen = value;
               });
           },
       }));
   });
   ```



### 전역html에서 오픈 by $store.modal.open()/close() 구현 (cf.header는 toggle <-> modal은 open)

3. store에서 toggle/close를 구현한다.

   ```js
   Alpine.store('modal', {
       isOpen: false,
   
       open() {
           this.isOpen = true;
       },
       close() {
           this.isOpen = false;
       },
       
   });
   ```

   

4. 전역html의 어디서든 `$store.modal.open()`으로 열기

   ```html
   <section class="register layout-center">
       <a href="#" class="bg-img bg-img-x-left-20px d-flex align-items-center justify-content-between "
          @click="$store.modal.open()"
          >
           <div class="register-text d-flex flex-column flex-md-row align-items-md-center">
               <span class="register-text-title">참석여부 등록하기</span>
               <span class="register-text-subtitle">
                   참석여부/동행인원을 알려주세요 <strong class="d-none d-md-inline">예식준비에 큰힘이 됩니다!</strong>
               </span>
           </div>
           <div class="register-icon bg-img"></div>
       </a>
   </section>
   ```

5. **backdrop + 닫기(우상단X, 닫기버튼)에 @click시 `$stroe.modal.close()`로 닫기**

   - `backdrop`은 최상위 aside.mobile-modal태그에 @click=close()

   ```html
   <aside class="mobile-modal"
          x-data="mobileModal"
          x-show="$store.modal.isOpen"
          x-cloak
          @click="$store.modal.close()"
   >
   ```

   - 닫기 2개

   ```html
   <div class="mobile-modal-header">
       헤더
       <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
            @click="$store.modal.close()"
            >
   ```

   ```html
   <div class="mobile-modal-buttons d-flex">
       <button class="flex-grow-1"
               @click="$store.modal.close()"
               >오늘은 그만보기</button>
       <button class="flex-grow-1"
               @click="$store.modal.close()"
               >닫기</button>
   </div>
   ```

   





### 열린 상태에서 handleBodyScroll like header

1. `open상태`면 body태그를 `document.body`로 접근하여 `style.overflow`를 hidden으로 **스크롤을 잠그는 메서드를 구현해서 open/close시 한번씩 호출해주면 된다.**

   ```js
   Alpine.store('modal', {
       isOpen: false,
       handleBodyScroll() {
           if (this.isOpen) {
               document.body.style.overflow = 'hidden';
           } else {
               document.body.style.overflow = '';
           }
       },
       open() {
           this.isOpen = true;
           this.handleBodyScroll();
       },
       close() {
           this.isOpen = false;
           this.handleBodyScroll();
       },
   });
   ```

   



### backdrop클릭시 close는 backdrop @click을 거는 것이 아니라, 안에 내용물에 @click.outside로 걸어야한다.

1. backdrop이 현재 부모인 상태라, 컨텐츠를 담당하는 자식의 outside클릭시 꺼지게 한다.

   ```html
          <!--@click="$store.modal.close()"-->
   <aside class="mobile-modal"
          x-data="mobileModal"
          x-show="isOpen"
          x-cloak
   >
       <dialog open @click.outside="$store.modal.close()">
   ```

   



### ✨열릴 때, animiation으로 밑에서부터 올라오도록 만들기

1. **backdrop인 aside태그 말고 내용이 들어가는 `dialog`태그에서 처리한다.**

   - 일단 keyframe으로 bottom -100 -> 0%로 가는것을 정의한다.

   ```css
   @keyframes bottom {
     0% {
       bottom: -100%;
     }
     100% {
       bottom: 0;
     }
   }
   ```

   

2. dialog css에 anmiation을 적용한다.

   ```css
   & dialog {
   
       /* animation */
       animation: 0.5s ease 0s 1 normal forwards running bottom;
   }
   ```







## 내용에 form 

1. 예전에 쓰던 form을 `<div class="mobile-modal-body">`내부로 가져온다.

   - **row > col-12로 기본적으로 `1열`씩 차지하게 한다**
   - **`.row-cols-md-auto`를 통해, 큰 화면에서는 자동으로 col-12없이 1줄로 채우게 된다.**

   ```html
   <div class="mobile-modal-body">
       <!-- inline forms -->
       <form class="row row-cols-md-auto g-3 align-items-center justify-content-center"
             method="POST"
             action="https://script.google.com/macros/s/AKfycbzp4Sae5SpW_CPZ-55IOJ8wt8iE1NMjolxpIXwt4DYfsYlpVq-mG5Iro7OTevt9tTUr/exec"
             id="attending-form"
             >
           <!-- 성함 -->
           <div class="col-12">
               <div class="mb-3">
                   <label for="name" class="form-label">성함</label>
                   <input type="text" class="form-control" id="name" name="성함">
               </div>
           </div>
           <!-- 참석여부 -->
           <div class="col-12">
               <div class="mb-3">
                   <label for="isAttend" class="form-label">참석 여부</label>
                   <select class="form-select" id="isAttend" name="참석여부">
                       <option value="참석" selected>참석</option>
                       <option value="불참">불참</option>
                       <option value="미정">미정</option>
                   </select>
               </div>
           </div>
           <!-- 동행인 수 -->
           <div class="col-12">
               <div class="mb-3">
                   <label for="attendCount" class="form-label">동행인 수</label>
                   <input type="number" class="form-control" id="attendCount" name="동행인 수"
                          min="1" max="5" length="1" value="1"
                          >
               </div>
           </div>
   
           <!-- 전달 버튼 -->
           <div class="col-12 text-center" style="margin-top: 30px;">
               <button class="btn">전달하기</button>
           </div>
       </form>
   </div>
   ```

   ![image-20240711014649952](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240711014649952.png)



### css로 form 꾸미기

1. component/form.css를 생성하여 import한다.

   ```css
   /*component*/
   @import url("component/button.css"); /* 헤더 */
   @import url("component/search.css"); /* 검색 */
   @import url("component/form.css"); /* form */
   ```



### label + input을 싸는 div.input-group은 flex-column시작 / mb를 매번주기

1. 일단 모바일시작이라 가정하고 **label input을 flex로 놔야한다.**

   - 이 때, **bottm-sheet는 아래쪽에서 mt가 아니라 현재에서 mb로 가야하는데 커스텀 mb를 주기 위한 `.input-group`을 배정한다.  **
     - .form-group은 부트스트랩에 이미 있어서 배제했다.

   ```html
   form {
       & .form-group {
           margin-bottom: 24px;
       }
   }
   ```

   ![image-20240711020326246](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240711020326246.png)





#### .row의 자체마진을 제거하여 ->  부모 패딩에 맞추도록 만들기 by margin: 0!important;

2. **`.row`자체에 margin이 들어가있어서 틀어져서 `form태그 자체에 margin0!important`로 제거 해야한다.**

   - **그리고 기본적으로 부모너비에 맞추는 w100+box-sizing을 적용해준다.**

   ```css
   form {
       width: 100%; /* 부모 요소의 전체 너비를 차지 */
       box-sizing: border-box; /* 패딩과 경계를 포함하여 너비를 계산 */
       /* .row 자체의 마진을 제거해야 부모에서 자체 margin으로 안벗어난다 */
       margin: 0!important;
   
   
       & .form-group {
           margin-bottom: 24px;
       }
   }
   ```

   ![image-20240711025458766](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240711025458766.png)
   
   - form자체의 row or 자식 row 모두 margin0을 때려주자.
   
     ```css
     form {
         /* 부모에 꽉차게 만들어주기 */
         width: 100%; /* 부모 요소의 전체 너비를 차지 */
         box-sizing: border-box; /* 패딩과 경계를 포함하여 너비를 계산 */
         /* .row 자체의 마진을 제거해야 부모에서 자체 margin으로 안벗어난다 */
         &.row {
             margin: 0 !important;
         }
         & .row{
             margin: 0 !important;
         }
     ```
   
     





### label은 .form-label로 부트스트랩 클래스로 꾸며준다(mb만 덮어쓰기 됨)

```css
& .form-group {
    margin-bottom: 24px;

    & .form-label {
        color: rgb(60, 62, 66);
        margin-bottom: 8px;
        font-weight: 500;
        font-size: 13px;
        line-height: 18px;
    }
}
```

![image-20240711025808595](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240711025808595.png)





### input은 부트스트랩의 .form-control을 거부하고, 1개뿐이라도 [dropdown 등 ]대비를 위해 div.form-input-wrapper.d-flex를 씌워주고나서  border 등을 준다.

1. input.form-control(부트스트랩)을 거부하고, `div.form-input-wrapper > input.form-input`으로 씌운다.

   ```html
   <div class="form-group d-flex flex-column">
       <label for="name" class="form-label">성함</label>
       <div class="form-input-wrapper">
           <input type="text" class="form-input" id="name" name="성함"
                  </div>
       </div>
   ```

   ![image-20240711140826151](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240711140826151.png)

2. form-control에 있던 block + w100%을 차용하자

   ![image-20240711140920357](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240711140920357.png)

   ```css
   & .form-input-wrapper {
   
       & .form-input {
           display: block;
           width: 100%;
       }
   }
   ```

   ![image-20240711141031532](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240711141031532.png)

   

   

3. **border와 outline none**을 줘서, 클릭시 나타나는 외곽선을 지운다.

   - **또한 lh로 fz보다 크게준 뒤, padding까지 줘서 내부에 글자를 버튼처럼 가둔다.**

   ```css
   & .form-input-wrapper {
   
       & .form-input {
           display: block;
           width: 100%;
   
           padding: 10px 12px;
           font-weight: 400;
           font-size: 17px;
           line-height: 24px;
           border: none;
           outline: none;
       }
   }
   ```

   ![image-20240711141239380](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240711141239380.png)

   ![image-20240711141335756](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240711141335756.png)





4. 이제 input-wrapper에서 **외곽선**을 건다

   - input과 마찬가지로  col을 w100%로 채우는데, max-height + overflowhidden을 통해 다음줄로 안넘어가게 한다?
   - **input외 추가요소를 대비하여 flex로 만든다.**

   ```html
   <div class="form-input-wrapper d-flex align-items-center">
       <input type="text" class="form-input" id="name" name="성함">
   </div>
   ```

   ```css
   & .form-input-wrapper {
       width: 100%;
       max-height: 48px;
       overflow: hidden;
   
       border: 1px solid var(--greydd);
       border-radius: 8px;
   
       /* 추가요소 대비 */
       position: relative;
   
       & .form-input {
   ```

   ![image-20240711143322124](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240711143322124.png)







### select는 부트스트랩의 .form-select에 dropdown아이콘이 처리되어있는 것 같아서 일단은 .form-select 유지 .form-input을 추가한다.

```html
<div class="col-12">
    <div class="form-group d-flex flex-column">
        <label for="isAttend" class="form-label">참석 여부</label>
        <div class="form-input-wrapper d-flex align-items-center">
            <select class="form-select form-input" id="isAttend" name="참석여부">
                <option value="참석" selected>참석</option>
                <option value="불참">불참</option>
                <option value="미정">미정</option>
            </select>
        </div>
    </div>
</div>
```

![image-20240711150106062](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240711150106062.png)



6. 동행인 수도 따라 만든다.

   ```html
   <!-- 동행인 수 -->
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

   ![image-20240711150406582](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240711150406582.png)



7. **이 때, 큰 화면에서 inline이 될 때, `padding-right`가 더 좁게 덮혀져 셀렉트 아이콘이랑 겹치게 된다.**

   ![image-20240711162558821](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240711162558821.png)

   - **`.form-select`의 padding-right를 `.form-input에 .form-select`가 동시에 적용시 그대로 가져온다.** 

     ```css
     & .form-input {
         display: block;
         width: 100%;
     
         border: none;
         outline: none;
         /* 버튼처럼 안에 가두기*/
         padding: 10px 12px;
     
         line-height: 24px;
         font-size: 17px;
         font-weight: 400;
     
         &.form-select {
             /* 부트스트랩 select 아이콘용 padding-right 그대로 적용 */
             padding-right: 2.75rem;
         }
     }
     ```

     ![image-20240711162746302](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240711162746302.png)





## ✨ modal-body를 vh 제한 + overflow-y를 허용한 뒤, 내부 form에서 fixed 전송버튼 만들기

1. modal-body를 70vh정도로 제한해두면서 스크롤을 만든다.

   - test를 위해 40vh로 만든다.

   ```css
   & .mobile-modal-body {
       padding: 0px 20px 24px;
   
       /*max-height: 70vh;*/
       max-height: 40vh;
       overflow-y: auto;
   }
   
   ```





2. **form자체를 position-relative로 만들어놓고, 내부전송버튼이 fixed되도록 준비한다.**

   ```html
   <div class="mobile-modal-body">
       <!-- inline forms -->
       <form class="position-relative row row-cols-md-auto align-items-center justify-content-center"
   ```



3. **inline form(`.row-cols-md-auto`)를 적용받기 위해 `.col-12`안에 전송버튼을 넣되**

   - **position-fixed bottom-0으로 아래에 고정시킨다.**
     - **이 때, `부모인 form을 오른쪽에서 넘어버리는데 start-0 end-0`을 추가해서 `absolute, fixed의 w100%버전`으로 만든다.**

   ```html
   <div class="col-12 position-fixed bottom-0 start-0 end-0 text-center">
       <button class="btn">전달하기</button>
   </div>
   ```

   ![image-20240711160020560](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240711160020560.png)





4. **배경색이 없어서 전달버튼 div에 흰색 배경을 넣어준다.**

   ```html
   <!-- 전달 버튼 -->
   <div class="col-12 position-fixed bottom-0 start-0 end-0 text-center"
        style="background-color: var(--white);"
        >
       <button class="btn">전달하기</button>
   </div>
   
   ```

   ![image-20240711160210422](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240711160210422.png)





5. **맨 아래 form요소가 fixeed된 버튼 공간에 묻혀서 못올라올 수 있다.**

   - 현재는 우연에 의해 보이게 된 상태다.

     ![image-20240711160632597](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240711160632597.png)

   ![image-20240711160316418](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240711160316418.png)





6. 일단 md부터는 inline-form이 되도록 **fixed를 md부턴 static으로 바꾸자.**

   ```css
   .position-md-static {
       @media (min-width: 768px) {
           position: static!important;
       }
   }
   ```

   ```html
   <div class="col-12 position-fixed bottom-0 start-0 end-0 position-md-static text-center"
        style="background-color: var(--white);"
        >
   ```

   ![image-20240711160808753](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240711160808753.png)





7. 배경색이 form의 배경색과 달라질  수 있기 때문에

   - form에 배경색 -> 버튼의 부모div에 같은색을 주자.
   - **input들은 form-groups -> 버튼은 `form-buttons`로  클래스를 주자.**

   ```css
   <div class="form-buttons col-12 position-fixed bottom-0 start-0 end-0 position-md-static text-center"
   style="background-color: var(--white);"
   >
   <button class="btn">전달하기</button>
   </div>
   ```

   - 직접 준 bgc를 style을 제거하고, form과 form-buttons에 bgc을 준다.

     ```css
     form {
         background-color: var(--greye7);
     
         & .form-buttons {
             background-color: inherit;
         }
     
     ```

     

     ![image-20240711161151781](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240711161151781.png)



8. form이 아니라 전체 modal의 색과 동일해야한다.

   - modal은 흰색 고정이니 **전달버튼도 흰색 고정으로 주자.**

   ```css
   & .form-buttons {
       background-color: var(--white);
   }
   ```

   ![image-20240711161333181](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240711161333181.png)





9. modal속 form자체에 ~~mb~~ ㅔpb를 크게 주자.

   - **form은 .row가 달릴 수 있어서 margin:0!important상태**
     - padding-bottom으로 **.form-group의 max-height (48px)의 절반만 주자.**

   ![image-20240711161459866](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240711161459866.png)

   ```css
   form {
       /* 부모에 꽉차게 만들어주기 */
       width: 100%; /* 부모 요소의 전체 너비를 차지 */
       box-sizing: border-box; /* 패딩과 경계를 포함하여 너비를 계산 */
       /* .row 자체의 마진을 제거해야 부모에서 자체 margin으로 안벗어난다 */
       &.row {
           margin: 0 !important;
       }
       & .row{
           margin: 0 !important;
       }
   
       /* form-group 최대높이의 절반정도만 밑에서 띄워서 fixed된 전송버튼에 마지막 input이 안가리도록 */
       padding-bottom: 24px;
   ```

   ![image-20240711161756748](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240711161756748.png)





### 에잇.. fixed는 vh기준이므로 bottom-0의 sticky로 처리한다.

1. pb를 제거하고

   ```css
   form {
   
       /* form-group 최대높이의 절반정도만 밑에서 띄워서 fixed된 전송버튼에 마지막 input이 안가리도록 */
       /*padding-bottom: 24px;*/
   
   ```

2. **fixed bottom-0 start-0 end-0 -> sticky bottom-0으로 변경한다**

   ```html
   <div class="form-buttons col-12 position-sticky bottom-0 position-md-static text-center">
       <button class="btn">전달하기</button>
   </div>
   ```

3. **이 때 부모인 form보다 더 부모인 `modal-body의 pb`에 의해 sticky보다 내려간 것들이 보인다.**

   ![image-20240711163601468](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240711163601468.png)



4. 뒤는 고려하지 않았지만, **modal-body의 아래여백을 삭제해보자.**

   ```css
   & .mobile-modal-body {
       /*padding: 0px 20px 24px;*/
       /* form의 stick 아래로 여백이 생겨서 보이게 되어 아래여백 제거 */
       padding: 0px 20px;
   ```

   

   ![image-20240711163816751](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240711163816751.png)







5. 이제 40vh제한을 70vh로 돌리고 **웹에서는 최소 40vh로 띄워지도록 하자.**

   ```css
   & .mobile-modal-body {
               /*padding: 0px 20px 24px;*/
               /* form의 stick 아래로 여백이 생겨서 보이게 되어 아래여백 제거 */
               padding: 0px 20px;
   
               max-height: 70vh;
               overflow-y: auto;
               @media (min-width: 768px) {
                   min-height: 40vh;
               }
           }
   ```

   ![image-20240711164120947](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240711164120947.png)









## form sticky 버튼 + gradient 설계하기

### 다른요소들과 달리, md웹하면부터 작아져야한다.

1. 지금은 **row아래 col-12의 기본 padding-left, right만** 들어가있다.

   ![image-20240711204545413](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240711204545413.png)

2. 직접 **상하 패딩을 추가해주자.**

   - 다른 col들도 그정도 좌우padding만 있을 테니, 상하패딩만 준다.

   ```css
   & .form-buttons {
       background-color: var(--white);
       /* 좌우패딩은 div.col-12로서 row의 자식들은 자동 패딩이 있다. 상하 패딩만 준다.*/
       padding-top: 8px;
       padding-bottom: 24px;
   }
   
   ```

   ![image-20240711204816456](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240711204816456.png)

   



### 같이 sticky하게 움직여야하는                                                                                                                                                                                                                                                                             bg-grandient-div를 위해 form-buttons-wrapper를 부모로 추가하여 나열



3. 모바일에서만 나타나도록 하는 `div.form-buttons-gradient`를 버튼 위에 추가하고 `.form-buttons-wrapper`를 부모로 씌운다

   - row의 자식으로 `col-12`를 달고 sticky관련코드를 옮겨준다.
   - **위쪽여백 대신 `gradient의 높이`로 대체하고**
   - **아래쪽 여백은 gradient땜에 wrapper가 색을 못가져서 `색을 가지는 buttons에 pb`를 준다.**

   ```html
   <!-- 전달 버튼 -->
   <div class="col-12 form-buttons-wrapper position-sticky bottom-0 position-md-static text-center">
       <!-- 모바일 위쪽 그라디언트 -->
       <div class="form-buttons-bottom-gradient d-md-none"></div>
       <div class="form-buttons">
           <button class="btn">전달하기</button>
       </div>
   </div>
   ```

   ```css
   & .form-buttons-wrapper {
   
       & .form-buttons-bottom-gradient {
           /* wrapper 상 패딩 대신, 위쪽의 gradient */
           height: 24px;
           background: linear-gradient(to top, rgb(255, 255, 255), rgba(255, 255, 255, 0));;
       }
   
       & .form-buttons {
           background-color: var(--white);
           /* wrapper 하 패딩 대신, [배경을 가진] 버튼부모div에 하패딩 */
           padding-bottom: 24px;
   
       }
   }
   ```

   

   ![image-20240711235534779](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240711235534779.png)





4. md웹에선 pb를 제거해야한다.

   ![image-20240712004531069](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240712004531069.png)

   ```css
   & .form-buttons {
       background-color: var(--white);
       /* wrapper 하 패딩 대신, [배경을 가진] 버튼부모div에 하패딩 */
       @media (max-width: 767px) {
           padding-bottom: 24px;
       }
   }
   ```

   ![image-20240712004720186](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240712004720186.png)

5. 이제 버튼자체를 꾸민다.

   - 닫기버튼이 있으니 버튼 1개만 배정해보자.
   - 여러개 일 수 있으니 flex로 배정한다.

   ```html
   <div class="form-buttons d-flex">
       <button class="btn">전달하기</button>
   </div>
   ```

   

6. 버튼자체가 inline이라 **w100%을 주기 위해 display block**

   - **꾸며주기 위해 `buttons.css`에 정의한다.**

   ```html
   <div class="form-buttons d-flex">
       <button class="button-purple">전달하기</button>
   </div>
   ```

   ```css
   .button-purple {
   
       /* 모바일시 block으로 가득 채우도록 */
       display: block;
       width: 100%;
   
   }
   ```

   

#### 버튼은 lh + 상하패딩으로 높이를 잡자

7. 상하패딩 12x2 + lh 24로 **총  form-group의 max-height인 48px과 똑같이 줘서 `추후 웹에서 inline form시 input과 같은 크기`를 잡도록 해보자.**

   ```css
   .button-purple {
       /* 모바일시 block으로 가득 채우도록 */
       display: block;
       width: 100%;
       
       padding: 12px 12px;
       line-height: 24px;
       
       font-size: 17px;
       font-weight: 500;
       color: var(--white);
   
       border: none;
       border-radius: 8px;
       background-color: var(--purple6f);
   
       white-space: pre-line;
       word-break: keep-all;
   }
   ```

   ![image-20240712151657978](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240712151657978.png)







#### modal내에서만 웹 <-> 모바일이 바뀌므로, 안바뀌는 속성은 button.css / 바뀌는 속성은 modal.css에 정의하자.

1. 버튼의 `block w100% <-> inline` 이 바뀐다.

   ```css
   & .mobile-modal-body {
       /*padding: 0px 20px 24px;*/
       /* form의 stick 아래로 여백이 생겨서 보이게 되어 아래여백 제거 */
       padding: 0px 20px;
   
       max-height: 70vh;
       overflow-y: auto;
       @media (min-width: 768px) {
           min-height: 40vh;
       }
   
       & .button-purple {
           /* 모바일시 block으로 가득 채우도록 -> 웹에서는 inline 성질 유지*/
           @media (max-width: 767px) {
               display: block;
               width: 100%;
           }
       }
   }
   ```

   ![image-20240712151948520](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240712151948520.png)





2. hover를 추가하는데, 이것은 안바뀌는 속성이니 button.css에 

   - **hover, focus도 변하는 것으로서 `transition: 해당속성`을 생각하자.**

   ```css
   .button-purple {
   
       background-color: var(--purple6f);
   
       transition: background 0.3s ease 0s;
       
       &:hover,
       &:focus {
           background: var(--purple);
       }
   }
   ```

   

   ![image-20240712152233279](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240712152233279.png)





### 웹에서 사라지는 모바일용 왼쪽 취소버튼 flex-item 추가하기

1. flex의 첫번째 item으로 추가하되, d-md-none

   ```html
   <div class="form-buttons d-flex">
       <button class="button-cancel d-md-none">취소</button>
       <button class="button-purple">전달하기</button>
   </div>
   ```

   ![image-20240712155423502](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240712155423502.png)

   - **flex-item끼리 적용되는 `gap-x`도 넣어준다.**

     ```html
     <div class="form-buttons d-flex gap-2">
         <button class="button-cancel d-md-none">취소</button>
         <button class="button-purple">전달하기</button>
     </div>
     ```



#### 🎇 form속 button은 action 으로 자동전송 -> 취소버튼은 @click.prevet로 모달닫도록

1. @click=으로 모달을 닫으면, form속button이 `default로 전송`이 걸려버리니 **`@click.prevent`로 모달닫도록 해줘야한다.**

   ```html
   <div class="form-buttons d-flex gap-2">
       <!--@click="$store.modal.close()"-->
       <button class="button-cancel d-md-none"
               @click.prevent="$store.modal.close()"
               >취소</button>
       <button class="button-purple">전달하기</button>
   </div>
   ```

   



2. button.css로 꾸며주고,  modal.css에서 width/block 등을 조절한다.

   ```css
   & .button-purple,
   & .button-cancel {
       /* 모바일시 block으로 가득 채우도록 -> 웹에서는 inline 성질 유지*/
       @media (max-width: 767px) {
           display: block;
           width: 100%;
       }
   }
   ```

   - **hover시 배경색이 아닌 border가 진해지도록 transition을 같이 준다.**

   ```css
   .button-cancel {
       padding: 12px 12px;
       line-height: 24px;
   
       font-size: 17px;
       font-weight: 500;
       color: var(--black28);
   
       white-space: pre-line;
       word-break: keep-all;
   
       background: none;
       border: 1px solid var(--greybe);
       border-radius: 8px;
   
       transition: border 0.3s ease 0s;
   
       &:hover,
       &:focus {
           border: 1px solid var(--grey96);
       }
   }
   ```

   

   



3. 모달속 form버튼의 공통점을 묶어서 `.button-modal`로 빼고 다른 부분만 처리한다.

   ```css
   
   .button-modal {
       padding: 12px 12px;
       line-height: 24px;
   
       font-size: 17px;
       font-weight: 500;
       
       white-space: pre-line;
       word-break: keep-all;
       
       border-radius: 8px;
       
       transition: all 0.3s ease 0s;
   }
   
   .button-cancel {
       color: var(--black28);
   
       background: none;
       border: 1px solid var(--greybe);
       
       &:hover,
       &:focus {
           border: 1px solid var(--grey96);
       }
   }
   
   .button-purple {
       color: var(--white);
   
       border: none;
       background-color: var(--purple6f);
       
       &:hover,
       &:focus {
           background: var(--purple);
       }
   }
   ```

   ```css
   & .mobile-modal-body {
   
       /*& .button-purple,*/
       /*& .button-cancel {*/
       & .button-modal {
           /* 모바일시 block으로 가득 채우도록 -> 웹에서는 inline 성질 유지*/
           @media (max-width: 767px) {
               display: block;
               width: 100%;
           }
       }
   
   }
   ```

   

   ```html
   <div class="form-buttons d-flex gap-2">
       <!--@click="$store.modal.close()"-->
       <button class="button-modal modal-cancel d-md-none"
               @click.prevent="$store.modal.close()"
               >취소</button>
       <button class="button-modal modal-purple">전달하기</button>
   </div>
   ```

   

