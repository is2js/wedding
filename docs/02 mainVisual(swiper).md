- 유튜브: https://www.youtube.com/watch?v=UkgRWUwOJkg&list=PL_6yF2upGJYt2RbFceTm2xrPnh0DEgp-d&index=30&t=1391s
- 최신버전
  - github:https://github.dev/mizzu-creations/tire-pick-responsive/blob/bf688e41f46dd982dd105813d582aad91d9e58d5/index.html
  - demo: https://tire-pick.vercel.app/



# 1 main-visual Swiper



1. swiper 11 버전으로 css / js 추가

   ```html
   <!-- swiper -->
   <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css"/>
   ```

   ```html
   <!-- swiper -->
   <script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
   ```

   - **js에 defer를 넣으면 제대로 작동안해서 제거함.**

   

2. main 태그에 개별 section태그로 진행

   ```html
   <!-- main -->
   <main>
       <section class="visual"></section>
   </main>
   ```

3. **swiper 기본 구조로 진행**

   - `.swiper`
     - `.swiper-wrapper`
       - `.swiper-slide` x 여러개
     - `.swiper-pagination`

   ```html
   <!-- main -->
   <main>
       <section class="visual">
           <div class="swiper mySwiper">
               <div class="swiper-wrapper">
                   <div class="swiper-slide">Slide 1</div>
                   <div class="swiper-slide">Slide 2</div>
                   <div class="swiper-slide">Slide 3</div>
               </div>
               <div class="swiper-pagination"></div>
           </div>
       </section>
   </main>
   ```

   - **section자체에 .swiper 도입하고, `.mySwiper`는 일단 삭제**

   ```html
   <!-- main -->
   <main>
       <section class="swiper visual">
           <div class="swiper-wrapper">
               <div class="swiper-slide">Slide 1</div>
               <div class="swiper-slide">Slide 2</div>
               <div class="swiper-slide">Slide 3</div>
           </div>
           <div class="swiper-pagination"></div>
       </section>
   </main>
   ```

   

4. main.css 및 **mainVisual.js**를 생성하여 body끝에 붙이고 작동 테스트

   ```html
   <!-- layout -->
   <script src="./js/header.js"></script>
   <script src="./js/mainVisual.js"></script>
   ```

   - **이 때 function(){} 대신 const 익명함수 = () => {}; 형태로 선언**
     - **swiper객체로 `모바일 resize인식시 destory() -> 다시초기화`를 위해 `let 변수 미리 선언`하고 재할당**

   ```js
   let visualSwiper;
   
   const initVisualSwiper = () => {
       visualSwiper = new Swiper('.swiper.visual', {});
   };
   
   initVisualSwiper();
   ```

   ![image-20240625171543168](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240625171543168.png)

   - **이후 모바일 megamenu보다 더 위에 뜨길래 z-0을 .visual에 추가하고 `-offcanvas에는 z-2, backdrop에는 z-1`을 추가했다.**

   ```html
   <main>
       <!-- visual banner -->
       <section class="swiper visual z-0">
   ```

   ![image-20240627004846528](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240627004846528.png)



## .swiper 섹션의 (이미지도입전 임시) 높이 고정

5. section.visual의 **고정 높이 `500px`로 처리하기**

   - `component/slide.css`로 swiper전용 css를 파일 만들고 style.css에서 import해서 사용한다.

     ```css
     /*component*/
     @import url("component/button.css"); /* 헤더 */
     @import url("component/slide.css"); /* swiper */
     ```

   - .visual 섹션의 높이를 고정한다

     ```css
     .visual {
         height: 560px;
         background-color: #ebddc4;
     }
     ```

     ![image-20240625172325814](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240625172325814.png)

   - 옵션 loop: true를 주고 싶지만, **alpinejs와 같이 사용시 에러 나기 때문에 일단 생략한다.**



## 디자인을 위해 가장 먼저 웹 pagination 옵션부터

6. pagination : {} 옵션 안에 `el`을 지정해주고, `clickable` 및 `renderBullet`으로 html을 return해준다.

   - 이 때 **자동으로 index와 className**을 받을 수 있는데 `index`를 받아서 활용할 예정

   ```js
   visualSwiper = new Swiper('.swiper.visual', {
   
       pagination: {
           el: ".swiper-pagination",
           clickable: true,
           renderBullet: function (index, className) {
               return `<span class="${className}">${index + 1}</span>`;
           }
       }
   });
   ```

   ![image-20240625173355825](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240625173355825.png)





2. **일단 index로 배너타이틀들을 가져올 수 있게 배열로 선언하여 가져오도록 한다.**

   ```js
   let titles = [
       "새해 이벤트",
       "리뷰 이벤트",
       "앱 설치 혜택",
       "앱피렐리 무상교환",
       "삼성화재 이벤트",
       "자동세차 100원",
   ];
   ```

   ```js
   visualSwiper = new Swiper('.swiper.visual', {
       pagination: {
           el: ".swiper-pagination",
           clickable: true,
           renderBullet: function (index, className) {
               // return `<span class="${className}">${index + 1}</span>`;
               return `<span class="${className}">${titles[index]}</span>`;
           }
       }
   });
   ```

   ![image-20240625173802332](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240625173802332.png)





3. 클릭이니 span대신 button으로 바꿔주자.

   ```js
   return `<button class="${className}">${titles[index]}</button>`;
   ```

   ![image-20240625173932437](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240625173932437.png)





4. 이제 **slide.css 컴포넌트에 .visual안에서 꾸며야하는데 pagination 클래스이름이 너무 길고 `el`로 지정가능하니 변경해주자.**

   - **테스트해봤는데 `.swiper-pagination`시 주는 기본 css속성이 있으며 이것을 대체해서 다 작성하기 빡세서 그냥 두고 `.visual-paging을 추가`만 했다.**

   ```html
   <!-- main -->
   <main>
       <section class="swiper visual">
           <div class="swiper-wrapper">
               <div class="swiper-slide">Slide 1</div>
               <div class="swiper-slide">Slide 2</div>
               <div class="swiper-slide">Slide 3</div>
               <div class="swiper-slide">Slide 4</div>
               <div class="swiper-slide">Slide 5</div>
               <div class="swiper-slide">Slide 6</div>
           </div>
   		<!--<div class="swiper-pagination"></div>-->
           <!--<div class="visual-paging"></div>-->
           <div class="swiper-pagination visual-paging"></div>
       </section>
   </main>
   
   ```

   ```js
   pagination: {
       el: ".visual-paging",
   ```





5. **.visual안에 `.visual-paging`이 기본적으로 .swiper-pagination에 의해 **

   - `pos:abs` + `w100% + text-align:center`로 안에 내용물이 자체 길이만큼 가운데 정렬 + `z-index:10`으로 slide들보다 약간 위에 솟아있다.

   - **이 때, 우리는 custom으로 span대신 button을 각 bullet으로 가진다.**

   - **일단 .visual-paging 내부 `button들이 100% + 가운데정렬`안에서 `행배치 되도록 100%로 늘어난 공간을 flex로 만들어 자식button들을 가운데`로 만들어준다.**

     ```html
     <div class="swiper-pagination visual-paging d-flex justify-content-center align-items-center"></div>
     ```

     ![image-20240625225114644](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240625225114644.png)
     ![image-20240625225200683](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240625225200683.png)





6. **css로 button들의 텍스트가 글자1개 수준이 아니라 `다 들어가도록 자식들의 요소에 의지하는 w:auto`를 넣어주고, `button종특 padding으로 내부 여백`을 만들어준다**

   - **이 때 `상하패딩 대신 height를 줘서 높이를 고정`하여 2줄로 넘어가서 커지는 일이 없게 한다.**

   ```css
   & .visual-paging {
       /* .swiper-pagination 기본 속성 */
       /*position: absolute;*/
       /*width: 100%;*/
       /*text-align: center;*/
       /*z-index: 10;*/
   
       & button {
           /*margin: 0 var(--swiper-pagination-bullet-horizontal-gap, 4px);*/
           /*margin: 0!important;*/
           width: auto; /* 필수 */
           height: 30px;
           padding: 0 30px;
           background-color: var(--white);
           border-radius: 6px;
       }
   }
   ```

   ![image-20240625225434460](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240625225434460.png)

   - 기본으로 border-radius가 1글자 + 점모양의 100%가 주어졌을 텐데 , 6px로 바꿔서 이쁘게 만든다.

     ![image-20240625225716909](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240625225716909.png)

     





### 활성화button처리 + 공통 투명배경 주기?

![image-20240625225808948](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240625225808948.png)

- 활성화 된 것은 box-shadow까지 있다.





7. 일단은 전체button에서 css로 줘서 디자인을 확인한다.

   ```css
   & button {
       width: auto; /* 필수 */
       height: 30px;
       padding: 0 30px;
       background-color: var(--white);
       border-radius: 6px;
   
       box-shadow: 1px 1px 3px rgba(var(--black), .1);
   }
   ```

   ![image-20240625230108168](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240625230108168.png)





8. **활성화 여부는 주어진 클래스명or속성명을 보고 확인한다.**

   - `.-active`  or **`aria-current="true"`**

   ![image-20240625230201607](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240625230201607.png)

9. **활성화에만 `흰색배경 + box-shadow`를 옮겨주고, `활성화되지 않은놈은 투명색배경`까지 처리해준다.**

   ```css
   & button {
       width: auto; /* 필수 */
       height: 30px;
       padding: 0 30px;
       border-radius: 6px;
   
       background-color: transparent;
       &[aria-current="true"] {
           background-color: var(--white);
           box-shadow: 1px 1px 3px rgba(var(--black), .1);
       }
   }
   ```

   ![image-20240625230433806](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240625230433806.png)



10. 배경색 변화에 transition을 걸어준다.

    ```css
    & button {
        
        background-color: transparent;
        transition: background .3s;
        &[aria-current="true"] {
            background-color: var(--white);
            box-shadow: 1px 1px 3px rgba(var(--black), .1);
        }
    }
    ```





11. 배경 공통인 `.visual-paging`에 배경색을 white 0.2로 준다.

    ```css
    & .visual-paging {
    
        background-color: var(--white-20);
    
    ```

    ![image-20240625234536859](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240625234536859.png)

    - **그랬더니 .visual-paging 100%가 다 차버렸다.**



### .swiper-pagination 기본속성을 바꿔서 가운데 정렬하기

1. 기본적으로 `w100%` + `text-align: center`가 있었다.

   - **이것을 `w:auto`로 자식에 의존하되 `pos:abs이므로 left:50%`로 가운데 정렬한다.**

   ```css
   & .visual-paging {
       background-color: var(--white-20);
       /* .swiper-pagination 기본 속성 */
       /*z-index: 10;*/
       /*position: absolute;*/
       /*width: 100%;*/
       width: auto;
       /*text-align: center;*/
       left: 50%;
       transform: translateX(-50%);
   ```

   



### pagination button(span)의 글자내려감은, 개발자도구 word-break => white-space 순으로 옵션 골라보면서 처리한다.

![image-20240625235721447](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240625235721447.png)

![image-20240625235801969](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240625235801969.png)





2. 확인해보니, **`white-space:nowrap`을 통해서 글자를 채운다.**

   - **추가로 기본margin 4px을 0으로 바꿔서 자체 여백은 없앤다**

   ```css
   & button {
       /* bullet 기본 속성 */
       /*margin: 0 var(--swiper-pagination-bullet-horizontal-gap, 4px);*/
   	margin: 0!important;
       
       width: auto; /* 필수 */
       height: 30px;
       padding: 0 30px;
       border-radius: 6px;
   
       white-space: nowrap;
   
       background-color: transparent;
       transition: background .3s;
       &[aria-current="true"] {
           background-color: var(--white);
           box-shadow: 1px 1px 3px var(--black-20);
       }
   }
   ```

   ![image-20240626010215902](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240626010215902.png)

   - 참고
     - `white-space` 속성은 텍스트 내의 공백 및 줄 바꿈 문자를 처리하는 방법을 제어합니다. 가능한 값은 다음과 같습니다:
       - `normal`: 연속된 공백 문자는 하나의 공백으로 간주되고, **줄 바꿈 문자는 무시됩니다. 텍스트는 부모 요소의 너비에 따라 줄 바꿈**이 됩니다.
       - `nowrap`: 연속된 공백 문자는 하나의 공백으로 간주되고, 줄 바꿈 문자는 무시됩니다. **텍스트는 줄 바꿈 없이 한 줄로 표시**됩니다.
       - `pre`: **연속된 공백 문자가 유지**되고, 줄 바꿈 문자는 그대로 적용됩니다. 텍스트는 줄 바꿈 없이 그대로 표시됩니다.
     - `word-break` 속성은 텍스트 내 단어가 어떻게 줄 바꿈 되는지를 제어합니다. 가능한 값은 다음과 같습니다:
       - `normal`: 텍스트는 **부모 요소의 너비에 따라 단어 단위로 줄 바꿈이 됩니다.**
       - `break-all`: 단어가 길어서 부모 요소의 너비를 초과하면 단어 내에서 줄 바꿈이 일어날 수 있습니다.
       - `keep-all`: CJK(중국어, 일본어, 한국어) 텍스트는 단어 단위로 줄 바꿈이 됩니다. 비 CJK 텍스트는 `normal` 값과 동일하게 동작합니다.





3. **남은 디자인으로서 배경 <-> 버튼들 사이 여백을 padding으로 4px정도로 주고, border-radius도 똑같이 준다.**

   ```css
   & .visual-paging {
   
       padding: 4px;
       border-radius: 6px;
   ```

   ![image-20240626011017699](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240626011017699.png)



4. abs이므로 밑에ㅅ의 간격을 bottom으로 10px정도 준다.

   ```css
   & .visual-paging {
       background-color: var(--white-20);
       /* .swiper-pagination 기본 속성 */
       /*z-index: 10;*/
       /*position: absolute;*/
       /*width: 100%;*/
       width: auto;
       /*text-align: center;*/
       left: 50%;
       transform: translateX(-50%);
       bottom:10px;
   ```

   ![image-20240626011143459](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240626011143459.png)







5. 상단을 보니, header와 너무 붙어있어서, header에 아래쪽 여백을 준다.

   ![image-20240626011254142](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240626011254142.png)

   ```css
   .header {
       /*padding: 0 40px;*/
       /* 위쪽 abs spot-menu를 위한, 위쪽 여백 48px 추가(위 | 좌=우 | 아래)*/
       /*padding: 48px 40px 0;*/
       padding: 48px 40px 15px;
   ```

   ![image-20240626011339240](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240626011339240.png)









## 모바일 pagination 동적 반영 with resize by  js

1. swiper옵션 중 breakpoints: {} 안에서는 pagination이 동적으로 반영안된다.

   - **window resize 이벤트시 width를 인식해서 `객체.destroty() 이후 다시 초기화`하면서 `width에 따라 다른 type으로 pagination선언`을 해야한다.**

2. **initVisualSwiper 초기화시, **

   1. **`이전에 window.innerWidth` 파악 후, 768보다 작거나 같으면 `모바일용 fraction` / 크면 `웹용 bullets` type을 확인한 뒤, new Swiper 옵션 중 pagination에 입력하게 한다.**
   2. **그 전에, 이미 `가변변수 let visualSwiper`에 초기화되어있으면 destroy하는 코드를 추가한다.**

   ```js
   let visualSwiper;
   
   const initVisualSwiper = () => {
       if (visualSwiper) {
           visualSwiper.destroy(true, true);
       }
   
       const screenWidth = window.innerWidth;
       const paginationType = screenWidth <= 768 ? 'fraction' : 'bullets';
   
   
       visualSwiper = new Swiper('.swiper.visual', {
           pagination: {
               /*el: ".swiper-pagination",*/
               el: ".visual-paging",
               clickable: true,
               type: paginationType,
               renderBullet: function (index, className) {
                   // return `<span class="${className}">${index + 1}</span>`;
                   return `<button class="${className}">${titles[index]}</button>`;
               },
           },
           grabCursor: true,
       });
   };
   ```

   

3. **이제 resize 이벤트발생시마다 size에 맞는 paginationtype으로 새롭게 초기화하도록 하자.**

   ```js
   // 처음 실행
   initVisualSwiper();
   // 리사이즈 될 때마다 재실행
   window.addEventListener("resize", () => {
       initProductSwiper();
   });
   ```

   ![image-20240626202507166](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240626202507166.png)





## 모바일 pagination 디자인

1. pagination 구조는 아래와 같아진다.

   ```html
   <div class="swiper-pagination visual-paging d-flex justify-content-center align-items-center swiper-pagination-fraction swiper-pagination-horizontal">
       <span class="swiper-pagination-current">1</span>
       / <
       span class="swiper-pagination-total">5</span>
   </div>
   ```

   

2. 일단 오른쪽으로 배치를 옮기자.

   - **이 때, 웹에서 `이미 left, transform`를 쓴 상태이므로 `inherit`으로 `left를 초기화`해놓고 right를 줘야한다.**

   ```css
   & .visual-paging {
   
       left: 50%;
       transform: translateX(-50%);
       /* 모바일 */
       @media (max-width: 767px) {
           /* left가 기존에 있었기 때문에, right만 넣지말고 left: inherit로 초기화해준 뒤 right를 써야한다. */
           left: inherit;
           transform: inherit;
           right: 20px;
       }
   ```

   ![image-20240626204804493](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240626204804493.png)





3. 기존에도 .visual-paging에 `높이를 안준상태`이므로 모바일에서도 `lh + fz`로 높이를 조정하자.

   - **이 때 `상하padding은 0으로 주고, lh만으로 height를 만들어, 1줄짜리 글자를 가운데 위치`시킨다. **

     ```css
     & .visual-paging {
     
         /* 모바일 */
         @media (max-width: 767px) {
             /* left가 기존에 있었기 때문에, right만 넣지말고 left: inherit로 초기화해준 뒤 right를 써야한다. */
             left: inherit;
             transform: inherit;
             right: 20px;
     
             font-size: 12px;
             line-height: 20px;
             padding: 0 15px;
         }
     
     ```

     

     ![image-20240626205020098](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240626205020098.png)

   - **height인 lh와 동일한 크기로 border-radius를 줘서, 좌우로 둥근 모서리를 만든다.**

     ```css
     /* 모바일 */
     @media (max-width: 767px) {
         /* left가 기존에 있었기 때문에, right만 넣지말고 left: inherit로 초기화해준 뒤 right를 써야한다. */
         left: inherit;
         transform: inherit;
         right: 20px;
     
         font-size: 12px;
         padding: 0 15px;
         line-height: 20px;
         border-radius: 20px;
     }
     ```

     ![image-20240626205144710](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240626205144710.png)

   

4. 최신버전으로 디자인으로 변경

   - 배경을 white .2 -> black .4 opacity로
   - width -> fit-content로 (추후 svg img태그 추가 대비)
   - color를 글자색 흰색으로
   - 진하게
   - **box-shadow 추가**
   - **backdrop-filter blur 추가**
   - **white-space: nowrap으로 1줄로 고정**

   ```css
   & .visual-paging {
   
       /* 모바일 */
       @media (max-width: 767px) {
           /* left/transform가 기존에 있었기 때문에, right만 넣지말고 left: inherit로 초기화해준 뒤 right를 써야한다. */
           left: inherit;
           transform: inherit;
           right: 10px;
   
           font-size: 14px;
           padding: 0 15px;
           line-height: 25px;
           border-radius: 20px;
   
           width: fit-content;
           background-color: var(--black-40);
           color: var(--white);
           font-weight: 500;
           box-shadow: rgba(0, 0, 0, 0.16) 0 0 0.8rem;
           backdrop-filter: blur(0.2rem);
           white-space: nowrap;
       }
   
   ```

   ![image-20240626214816929](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240626214816929.png)





5. **이제 글자 `모두보기`를 붙혀주기 위해 `마지막 span인 span.swiper-pagination-total`태그에 :after로 마지막 자식으로서 붙혀주면 글자가 붙는다.**

   ```css
   /* 모바일 */
   @media (max-width: 767px) {
       /* left/transform가 기존에 있었기 때문에, right만 넣지말고 left: inherit로 초기화해준 뒤 right를 써야한다. */
       left: inherit;
       transform: inherit;
       right: 10px;
   
   
       & .swiper-pagination-total {
           &::after {
               content: "모두보기";
               padding-left: 5px;
           }
       }
   }
   
   ```

   

   ![image-20240626215517201](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240626215517201.png)

   ![image-20240626215622789](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240626215622789.png)







## 동적으로 swiper-slide를 만들면서, bgColor + img 변경해보기

- mainBannerSwiper.js 참고: https://github.dev/mizzu-creations/tire-pick-responsive/blob/bf688e41f46dd982dd105813d582aad91d9e58d5/index.html





1. 지금 구조는 `.swiper-wrapper`안에 `.swiper-slide` 태그밖에 없다.

   ```html
   <!-- visual banner -->
   <section class="swiper visual z-0">
       <div class="swiper-wrapper">
           <div class="swiper-slide">Slide 1</div>
           <div class="swiper-slide">Slide 2</div>
           <div class="swiper-slide">Slide 3</div>
           <div class="swiper-slide">Slide 4</div>
           <div class="swiper-slide">Slide 5</div>
       </div>
       <div class="swiper-pagination visual-paging d-flex justify-content-center align-items-center"></div>
   </section>
   ```

   



### .swiper-slide를 flex+수평/수직가운데 정렬만하고, 내부 [배경Color를 반영할 w-100짜리 div] 추가



2. 일단 정적구조에서 이미지 + 배경 넣어보기

3. **`.swiper-slide`에 flex 가운데 정렬을 주고 내부에 `div.slide-bg` 를 추가한다**

   - **css로 `.slide-bg`에 배경을 깐 `w100%`에 bgc를 동적으로 가질 예정이다.**

   ```html
   <section class="swiper visual z-0">
       <div class="swiper-wrapper">
           <div class="swiper-slide d-flex justify-content-center align-items-center">
               <div class="slide-bg" style="background-color: #d3e3df">
                   ㅇㅇ
               </div>
           </div>
   ```

   ```css
   .visual {
       height: 560px;
       /*height: auto;*/
   
       background-color: var(--lightorange);
   
       & .slide-bg {
           width: 100%;
       }
   ```

   - **현재 w만 100%고 부모높이 560px에서 `아직 그림이 안들어간` 높이이므로 글자를 넣으면 글자만큼만 나타난다.**

     ![image-20240626232831759](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240626232831759.png)

   - **임시로  h100%을 넣어둬서, 글자 없이 차지하게 한다.** 넣어두자

     ```css
     & .slide-bg {
         width: 100%;
         /* test */
         height: 100%;
     }
     ```

     ![image-20240626232957818](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240626232957818.png)





### picture를 통해, 모바일용1440x560 / 웹용4736x1600 그림을 나눈다. 그림이 들어가는 순간, `.swiper .visual`의 `height(560px)를 auto`로 제거 한다.



4. picture를 통해 모바일용 / 웹용 그림을 따로 배치한다.

   - **모바일 1440 x 560**
   - 웹 **4736 x 1600**

   ```html
   <section class="swiper visual z-0">
       <div class="swiper-wrapper">
           <div class="swiper-slide d-flex justify-content-center align-items-center">
               <div class="slide-bg" style="background-color: #d3e3df">
                   <picture>
                       <!-- mobile -->
                       <source
                               media="(max-width: 767px)"
                               srcset="./images/webp/banner/slide_main01_m.webp"
                               />
                       <!-- web -->
                       <img src="./images/webp/banner/slide_main01.webp" alt=""/>
                   </picture>
               </div>
           </div>
   ```

   - 모바일
     ![image-20240626233245867](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240626233245867.png)

   - 웹

     ![image-20240626233308261](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240626233308261.png)





5. **모바일에선 w-100 -> 웹에선 `한도 끝도 없이 커지는 것 방지를 위해 block + mx-auto + max-width`조합으로 큰화면에서 w-100을 max-width로 막는다.**

   - **img태그에 자체로 max-w + dblock-mx-auto를 주면, `해당크기만큼만 커지고, 부모내부 좌우를 margin`으로 채울 것이다.**
   - **fit-cover + position-center도 해준다.**

   ![image-20240627001856801](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240627001856801.png)

   ```css
   & .slide-bg {
       width: 100%;
       /* test */
       height: 100%;
   
       & img {
           width: 100%;
           max-width: 1440px;
           display: block;
           margin: 0 auto;
           object-fit: cover;
           object-position: center;
       }
   }
   ```

   ![image-20240627002117946](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240627002117946.png)

   - **이제 img가 width에 따른 height를 자동으로 차지할테니 `height를 제거한다`**

   ```css
   & .slide-bg {
       width: 100%;
   
       & img {
           width: 100%;
           max-width: 1440px;
           display: block;
           margin: 0 auto;
           object-fit: cover;
           object-position: center;
       }
   }
   ```



6. **이미지가 .slide-bg뿐만 아니라, .visual의 높이도 알아서 자치하도록 height를 auto로 바꾼다.**

   ```css
   .visual {
       /*height: 560px;*/
       /*background-color: var(--lightorange);*/
       /* 이미지가 들어온 순간부터 알아서 높이 차지하도록 변경*/
       height: auto;
       background-color: var(--black);
       
   }
   ```

   ![image-20240627002316209](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240627002316209.png)

   ![image-20240627002328803](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240627002328803.png)





### js로 .swiper-wrapper안에 동적으로 bgc + title등을 부여받은 .swiper-slide를 생성한다.

1. data를 만들고

   ```js
   const data = [
       {
           title: "1부 예식",
           alt: "1부 예식 그림",
           color: "#d3e3df",
           image: "./images/webp/banner/slide_main01.webp",
           mobileImage: "./images/webp/banner/slide_main01_m.webp",
       },
       {
           title: "2부 예식",
           alt: "2부 예식 그림",
           color: "#d3e3df",
           image: "./images/webp/banner/slide_main01.webp",
           mobileImage: "./images/webp/banner/slide_main01_m.webp",
       },
   ];
   ```

2. html에서 .swiper-slide들은 주석처리하고 1개만 복사해온다.

   ```html
   <main>
       <!-- visual banner -->
       <section class="swiper visual z-0">
           <div class="swiper-wrapper">
   		<!--<div class="swiper-slide">Slide 1</div>-->
           </div>
           <div class="swiper-pagination visual-paging d-flex justify-content-center align-items-center"></div>
       </section>
   </main>
   ```

   ```js
   const initVisualSwiper = () => {
       // 1. 기존에 있었으면 삭제
       if (productSwiper) {
           productSwiper.destroy(true, true);
       }
   
       // 2. 크기보고 paginationType 결정
       const screenWidth = window.innerWidth;
       const paginationType = screenWidth <= 768 ? 'fraction' : 'bullets';
   
       // 3. .swiper-wrapper 안에 .swiper-slide들을 data기반으로 추가
       `
       <div class="swiper-slide d-flex justify-content-center align-items-center">
           <div class="slide-bg" style="background-color: #d3e3df">
               <picture>
                   <!-- mobile -->
                   <source media="(max-width: 767px)"
                           srcset="./images/webp/banner/slide_main01_m.webp"
                   />
                   <!-- web -->
                   <img src="./images/webp/banner/slide_main01.webp" alt=""/>
               </picture>
           </div>
       </div>
       `
   ```





4. **wrapper를 찾고, `.insertAdjacentHTML('beforeend', '')`를 통해 동적으로 html을 집어넣는다.**

   - **이 작업은 resize될때마다가 아니라 최초로딩시 1번만 이루어지면 된다.**
   - data를 `.forEach(( item) => {})`으로 순회하면서 `${}`의 format string으로 채워넣는다.

   ```js
   const data = [
       {
           title: "1부 예식",
           alt: "1부 예식 그림",
           color: "#d3e3df",
           image: "./images/webp/banner/slide_main01.webp",
           mobileImage: "./images/webp/banner/slide_main01_m.webp",
       },
       {
           title: "2부 예식",
           alt: "2부 예식 그림",
           color: "#ecf2fb",
           image: "./images/webp/banner/slide_main02.webp",
           mobileImage: "./images/webp/banner/slide_main02_m.webp",
       },
   ];
   
   ```

   

   ```js
   const createSlides = (data) => {
       const visualSwiperWrapper = document.querySelector('.swiper.visual .swiper-wrapper');
   
       data.forEach((item) => {
           visualSwiperWrapper.insertAdjacentHTML('beforeend',
               `<div class="swiper-slide d-flex justify-content-center align-items-center">
                   <div class="slide-bg" style="background-color: ${item.color}">
                       <picture>
                           <!-- mobile -->
                           <source media="(max-width: 767px)"
                                   srcset="${item.mobileImage}"
                           />
                           <!-- web -->
                           <img src="${item.image}"" alt="${item.alt}"/>
                       </picture>
                   </div>
            </div>`
           )
       });
   }
   ```

   ```js
   // 처음 실행
createSlides(data);
initProductSwiper(data);

// 리사이즈 될 때마다 재실행
window.addEventListener("resize", () => {
    initProductSwiper(data);
});

```

   





## 2 header 검색창을 모바일에서 보이게 하기

![image-20240630222839654](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240630222839654.png)





1. 지금은 `헤더에 html로 정의`되어있지만, **배너밑에 도 있으려면, `배너밑에 코딩하고, 모바일에서 abs로 헤더로 올리기`를 해야한다.**

   ```html
   <h2 class="sr-only">검색</h2>
   
   <div class="search d-none d-lg-flex align-items-center">
       <input type="search" placeholder="원장이름 / 질환명 / 치료명 검색"
              title="검색어 입력">
       <button aria-label="검색" class="btn-search bg-img"></button>
   </div>
   </div>
   ```

   

   ![image-20240630222945415](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240630222945415.png)







### h2.sr-only검색 + div.search를 section과 section사이 form으로 빼기

1. html 이동

   ```html
   <form action="">
       <h2 class="sr-only">검색</h2>
       <div class="search d-none d-lg-flex align-items-center">
           <input type="search" placeholder="원장이름 / 질환명 / 치료명 검색"
                  title="검색어 입력">
           <button aria-label="검색" class="btn-search bg-img"></button>
       </div>
   </form>
   ```

   ![image-20240630223358834](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240630223358834.png)



### search는 웹 header(abs) , 모바일 main에 속해서 어디든 가야하니 component/search.css로 뺀다.

1. css도 `header.css`의 `.header내부`에서 `component/search.css`로 빼서 `.search`로 정의되게 한 뒤, style.css에서 import한다.

   ![image-20240630223552870](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240630223552870.png)

   ```css
   /*component*/
   @import url("component/button.css"); /* 헤더 */
   @import url("component/search.css"); /* 검색 */
   ```

   

   

2. **html에 구조로 적어둔 `d-none d-lg-flex`를 다시 `d-flex`로 바꾼다.**

   ```html
   <form action="">
       <h2 class="sr-only">검색</h2>
       <!--<div class="search d-none d-lg-flex align-items-center">-->
       <div class="search d-flex align-items-center">
           <input type="search" placeholder="원장이름 / 질환명 / 치료명 검색"
                  title="검색어 입력">
           <button aria-label="검색" class="btn-search bg-img"></button>
       </div>
   </form>
   ```

   ![image-20240630223731971](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240630223731971.png)





### 일단 웹부터 새롭게 css처리한다.

1. abs로 띄워야하니, top 등의 사이즈를 젠다

   ![image-20240630224217026](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240630224217026.png)

   - right를 header의 좌우여백만큼 주자.

     ![image-20240630224945633](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240630224945633.png)

   ```css
   .search {
       height: 48px;
       border-radius: 48px;
       border: 1px solid var(--purple);
   
       padding: 0 5px;
   
       line-height: 46px;
   
       /* 웹에선 abs로 -> 모바일에선 html정의한 위치로 */
       position: absolute;
       top: 48px;
       right: 0;
   ```

   - **하지만 정가운데 위치 하지 않는다?!**

   ![image-20240630225106002](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240630225106002.png)

   ![image-20240630225415057](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240630225415057.png)

2. **기존에는 header의 height가 없이 자식의 최대높이였던 검색창만큼 height를 차지했지만, `abs`로 빠진 상황이라서 작은애들만 처리하기 때문에 `메뉴가 좁아진 상황`이다.**

   - **기존 제일큰자식인 검색창의 순수높이 48px을 `.header-nav`에도 그대로 준다.**

   ```css
   .header {
   
   
   
       & .header-nav {
           gap: 40px;
           /* search가 빠졌더니 작은놈들만 남아 좁아진 header를  abs로 search 띄우기 위해 높이 배정 */
           height: 48px;
   ```

   ![image-20240630234842484](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240630234842484.png)





3. **오른쪽에 붙어서 시작되어 gnb가 얼마나 될지 모르니, `input`의 크기를 조금 작게 줄인다.**

   - width 315-> 210px;
   - placholder에 padding주기

   ```css
   > input {
       /*width: 345px;*/
       width: 210px;
       height: 35px;
       border-radius: inherit;
   
       position: relative;
       top: 1px;
   
       &::placeholder {
           font-size: 17px;
           color: var(--grey96);
           line-height: 35px;
   
           padding: 0 10px;
       }
   }
   ```

