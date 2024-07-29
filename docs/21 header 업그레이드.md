1. spot-menu (abs)용 여백을 따로 분리한다.

   - 모바일 <-> 웹 사이에 변동되어야할 `여분의 paddingTop` 높이는 30px이다.

   ```css
   :root {
       --spot-menu-height: 30px;
   }
   
   .header {
       /* 위쪽 abs spot-menu를 위한, 위쪽 여백 48px 추가(위 | 좌=우 | 아래)*/
   
       padding: calc(var(--spot-menu-height) + 15px) 40px 15px;
   
       /* 모바일에선 static spot-menu가 내부로 들어가 다시 위쪽 여백을 제거한다.*/
       @media (max-width: 767px) {
           padding: 0 15px;
       }
   ```

   





### 일단 init시, resize시 height만큼 header에서 marginBottm을 줘서, 밑에 visual slide에 포함되게 만든다. (scroll/onTop과 무관)

2. height를 `this.$el`을 **다 렌더링 된 nextTick에서 구해서, 구하되**

   - 일단 onTop여부 / scroll과 무관하므로 `this.$el.offsetHeight`를 marginBottom으로 준다.

   ```js
   setMarginBottom() {
       this.$nextTick(() => {
           this.$el.style.marginBottom = `-${this.$el.offsetHeight}px`
       });
   }, init() {
       this.setMarginBottom();
   }
   ```

   - resize 이벤트에서 모바일 <-> 웹에선 높이가 달라지므로 똑같이 반영한다.

   ```js
   init() {
       this.setMarginBottom();
   
       window.addEventListener("resize", () => {
           this.$nextTick(() => {
               this.$el.style.marginBottom = `-${this.calculateHeight()}px`
   
           },);
       }
   ```

   



### scroll시마다 onTop여부를 확인하기





2. scroll이벤트는 window이벤트로서 @scroll.window=""에 log로 `현재$el`과 현재 `pageYOffset`의 height를 찍어본다

   - 높이 116px이 나왔고, 페이지의 높이는 0이다.

   ```html
   <header x-data="header"
           class="header d-flex justify-content-between justify-content-lg-start align-items-center sticky-top"
           id="header"
           @scroll.window="console.log(window.pageYOffset, $el.offsetHeight)"
   >
   ```

   ![image-20240726011744368](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240726011744368.png)





3. 이제 `onTop`상태메세지를 만들고, `setOnTop`메서드를 통해 상태를 바꾼다.

   ```js
   Alpine.data('header', () => ({
       onTop: null,
       setOnTop() {
           this.onTop = (window.pageYOffset || document.documentElement.scrollTop) === 0;
       },
   ```

   - **스크롤 이벤트 시작전에 init에서도 onTOp을 한번 채워주자.**
   - **이 때, `this가 쓰인 메서드를 window이벤트에 추가할 땐 .bind(this)`로 호출해줬더니 `너무 빠르게 계산되서? 마진이 안바뀌는 에러`가 발생해서 뺐다**

   ```js
   init() {
       this.setMarginBottom();
       this.setOnTop();
   
       window.addEventListener("resize", () => {
           this.setMarginBottom();
       },);
   }
   ```

   

4. `@scroll.window=""`이벤트에서 스크롤 될 때마다 top여부를 확인하도록 한다

   ```html
   <header x-data="header"
           class="header d-flex justify-content-between justify-content-lg-start align-items-center sticky-top"
           id="header"
           @scroll.window="setOnTop"
           >
   ```

   ![image-20240726012742662](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240726012742662.png)





### [웹만고려] 스크롤마다 처리되는 onTop여부에 따라, abs spotMenu가 안보이도록 하고 싶다

5. x-show + x-collapse로 onTop에선 보였다가 사라지게 만들어본다.

   ```html
   <div class="spot-menu position-static position-md-absolute top-0 start-0 end-0"
        x-show="onTop"
        x-collapse.duraiton.100ms
        >
   ```

   

   ![image-20240728222758267](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240728222758267.png)

   ![image-20240728222810642](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240728222810642.png)



6. 문제는 **spotmenu가 abs라서, header에서 paddingTop을 가진 상태다.**



### 뭔짓을해도 paddingTop 동적계산은 힘들다 -> :class로 onTop시 패딩을 바꿔주는 처리를 하자.

7. header의 onTop일 때, **웹환경에서 패딩을  spotmenu높이인 30px을 추가**시킨다.

   ```html
   <header x-data="header"
           class="header d-flex justify-content-between justify-content-lg-start align-items-center sticky-top"
           id="header"
           @scroll.window="setOnTop"
           :class="{ 'header-on-top': onTop }"
           >
   ```

   

   ```css
   
   .header {
   
       /* top이 아닐 때 padding top은 bottom과 동일한 15px */
       padding: 15px 40px 15px;
       @media (max-width: 767px) {
           padding: 0 15px;
       }
   
       /* top에 있을 때 -> paddingTop은 spot-menu 높이 30px 패딩 추가 */
       &.header-on-top {
           @media (min-width: 768px) {
               padding: calc(var(--spot-menu-height) + 15px) 40px 15px;
           }
       }
   ```

   

   - **이 때, paddingTop을 위한 duration-을 header태그에 클래스를 주면, marginBottom계산시 빠진체 애니메이션으로 뒤늦게 추가되어서 안된다.**





### 이제 [모바일]일 땐, spot-menu가 static으로 붙어있으니, x-show에 전역isMobile이 아닐 경우의 조건을 추가하여,  안사라지게 만들어야한다.

8. mainGallery.js에서 만들었떤 checkMobile 메서드를 header로 옮긴 뒤, **isMobile을 store로 처리되도록 전역변수처리한다.**

   ```html
   <!--:class="{ 'disable-click': isMobile }"-->
   <a class="w-100 flex-shrink-0 snap-start h-auto rounded-3 row-span-2 overflow-hidden"
      data-toggle="lightbox"
      :class="{ 'disable-click': $store.megamenu.isMobile }"
   ```

   

9. store인 megamenu로 옮긴다.

   - null로 초기화했으면, 반드시 resize뿐만 안리ㅏ init에도 넣어야한다.

   ```js
   init() {
       window.addEventListener('resize', () => {
           if (window.innerWidth >= 768) {
               this.close();
           }
           this.checkMobile();
       })
       this.checkMobile();
       this.isGnbOpens = Array.from({length: 5}, () => false);
   },
       
   isMobile: null,
   checkMobile() {
   	const screenWidth = window.innerWidth;
       const mobileMaxWidth = 767;
       this.isMobile = screenWidth <= mobileMaxWidth;
   },
   ```

   - **이제 x-show조건을 `isMobile이 아니면 ||`의 조건을 추가한다.**

   ```html
   <!--x-show="onTop"-->
   <div class="spot-menu position-static position-md-absolute top-0 start-0 end-0"
        x-show="$store.megamenu.isMobile || onTop"
        x-collapse.duraiton.100ms
        >
   ```

   - 모바일에선 항상 보이게 된다.

   ![image-20240728234050596](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240728234050596.png)





### 모바일/웹 가장 작은 경우에서의 visual배너 위쪽으로 여백 줄 것 생각해서 만들기



- 웹에서는 거의 제목2번째 라인까지의 여백이 필요

  ![image-20240728234351011](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240728234351011.png)

- 모바일에서는 360px을 기준으로 제목 1번째 라인까지의 여백 필요

  ![image-20240728234424171](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240728234424171.png)\

  - 기존 1440x1120px



- 조금 늘려보고, 원본크기로 유지해본다.

  ![image-20240728234615844](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240728234615844.png)







### 이제 header-on-top일 때, 글자체와 로고/웹-spotmenu border-bottom 색 바꾸기

1. gnb의 a태그 글자색을 바꾼다.

   ```css
   .gnb {
       > ul {
           gap: 40px;
   
           & a {
               color: var(--grey28);
               .header-on-top & {
                   color: var(--grey96);
               }
   ```

   ![image-20240729004449931](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240729004449931.png)

   ![image-20240729004458147](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240729004458147.png)





2. spot-menu의 a태그

   ```css
   & .spot-menu {
   
       & li {
           height: 30px;
   
           & a {
               font-size: 14px;
               color: var(--grey6f);
   
               .header-on-top & {
                   color: var(--grey96);
               }
           }
   ```

   ![image-20240729010211588](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240729010211588.png)





3. spot-menu의 border-bottom은 **투명색이 들어가야 1px이라도 가늘게 보이게 된다.**

   ```css
   & .spot-menu {
   
       border-bottom: 1px solid var(--greye7);
   
       .header-on-top & {
           border-bottom: 1px solid var(--white-10);
       }
   ```

   ![image-20240729010302606](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240729010302606.png)





4. **로고도 grey96**을 색상칠하기로 처리한다.

   ![image-20240729010441055](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240729010441055.png)

   - `logo_on_top.png`를 만들어서 header-on-top시 들어가게 한다.

   ```html
   <h1 class="logo" x-ref="logo">
       <a href="#header" tabindex="1">
           <!--<img src="images/logo.png" alt="로고">-->
           <img :src="onTop ? 'images/logo_on_top.png' : 'images/logo.png'" alt="로고">
       </a>
   </h1>
   ```

   - 이 떄 src를 삭제하면, 초기화전에는 엑박으로 뜨므로, 기본 src도 넣어주자.

   ```html
   <img src="images/logo.png"
        :src="onTop ? 'images/logo_on_top.png' : 'images/logo.png'" alt="로고">
   ```

   







### 버그 -> onTop의 기준이 너무낮으면, spot-menu가 사라지면서 다시 한번 onTop이 되어버리는 버그

1. 이로 인해 onTop의 기준을 약간 높혀준다. 그 기준을  header의 높이로 줘서, 그것을 넘어서야 top이 아니게 된다.

   ```js
   setOnTop() {
       //this.onTop = (window.pageYOffset || document.documentElement.scrollTop) === 0;
       // top의 기준을 0으로 주면, x-show로 사라지는 spot-menu가 스크롤보다 더 작아지면서 0에 한번 더 도달해서 버그
       // top의 기준을 여유 있게 header의 높이로 주고, 그것을 초과해야 top이 아닌 상태 
       this.onTop = (window.pageYOffset || document.documentElement.scrollTop) <= this.$el.offsetHeight;
   },
   ```

   





### 현재 hero땜에 not onTop -> onTop -> 다시 not onTop으로 변하는 상황이며, alpinejs가 load되어서 :class가 들어가야 onTop시 디자인이 바뀌는 현상 => hover/focus등을 고려해서 onTop을 기본디자인으로 -> :not(.header-on-top)시 디자인이 바뀌도록 해야한다.

1. 현재 header-on-top을 기본 디자인으로 -> onTop이 false일 때 `.active`시 디자인이 바뀌도록

   ```html
   <header x-data="header"
           class="header d-flex justify-content-between justify-content-lg-start align-items-center sticky-top"
           id="header"
           @scroll.window="setOnTop"
           :class="{ 'active': !onTop }"
           >
   ```

   

2. 배경

   ```css
   background-color: transparent !important;
   &.active {
       background-color: rgba(255, 255, 255, 0.3) !important;
       backdrop-filter: blur(4px);
   }
   ```

3. 패딩

   - **top이 아니라서 active될 때, `웹`일 때만 패딩 감소**
     - 평소에는 spot-menu만큼의 paddingTop추가
     - 모바일에선 상하패딩 동일하게 없음

   ```css
   padding: calc(var(--spot-menu-height) + 15px) 40px 15px;
   &.active {
       @media (min-width: 768px) {
           padding: 15px 40px 15px;
       }
   }
   @media (max-width: 767px) {
       padding: 0 15px;
   }
   ```

4. 로고도 default가 회색

   ```html
   <h1 class="logo" x-ref="logo">
       <a href="#header" tabindex="1">
           <!--<img src="images/logo.png" alt="로고">-->
           <img src="images/logo_on_top.png"
                :src="onTop ? 'images/logo_on_top.png' : 'images/logo.png'" alt="로고">
       </a>
   </h1>
   ```

5. gnb글자색

   ```css
   .gnb {
       > ul {
           gap: 40px;
   
           & a {
               color: var(--grey96);
   
               .active & {
                   color: var(--grey28);
               }
               /*color: var(--grey28);*/
   
               /*.header-on-top & {*/
               /*    color: var(--grey96);*/
               /*}*/
   ```

6. spot-menu  border및 글자색

   ```css
   & .spot-menu {
       border-bottom: 1px solid var(--white-20);
   
       .active & {
           border-bottom: 1px solid var(--greydd);
       }
   
       padding: 0 40px;
       /* 혹시 position left0right0 대신 w100%로 줬다면 -> padding 줄 시 hidden 안될 수 있다.
       그럴 경우, width% + padding 조합은 box-sizing: border-box;를 추가한다.
       */
       @media (max-width: 767px) {
           border: none;
           padding: 0;
       }
   
       & li {
           height: 30px;
   
           & a {
               font-size: 14px;
               color: var(--grey96);
   
               .active & {
                   color: var(--grey6f);
               }
           }
   ```

   





### setOnTop이 입장후에 작동할 수 있게, hero의 isEntrance를 store 전역변수 추가 + 전역변수를 토글 -> 지역 hero가 watch해서 받아써서 지역코드는 그대로

1. hero의 지역 Alpine.data가 있지만, `header.js`에 Alpine.store로 전역변수를 만든다.

   ```jsp
   Alpine.store('hero', {
       isEntrance: false,
   });
   
   ```

2. `hero.js`의 지역 hero의 init에는 전역변수 isEntrance를 watch한다.

   ```js
   init() {
       this.$watch(() => Alpine.store('hero').isEntrance, value => {
           this.isEntrance = value;
       });
   
   },
   ```

3. `hero.js`의 지역변수 toggle했던 것을 전역변수르 토글하도록 변경한다

   ```js
   entrance() {
   
       // 7) 첫 입장시 & 전송경험 없을 때  modal 자동켜기
   
       if (!this.isEntrance && this.$store.modal) {
   
           // ...
           // this.isEntrance = true;
           this.$store.hero.isEntrance = true;
       }
   },
   ```

   





### header에 x-intersect.once.full로 화면끝까지 올라온상태에서만 & 전역 isEntrance된 상태 2가지 조건을 만족할 때부터 setOnTop이 작동하도록

1. core js앞에 plugin을 추가한다.

   ```js
   <!-- Alpine Plugins 3. intersect for header -->
       <script defer src="https://cdn.jsdelivr.net/npm/@alpinejs/intersect@3.x.x/dist/cdn.min.js"></script>
   ```

   

2. 입장완료를 인식할 수 있게 header에 isEntranced를 선언하고

   ```js
   Alpine.data('header', () => ({
   
       onTop: true,
       isEntranced: false,
   ```

3. header태그에 `x-intersect.once.full`로 화면등장이 아니라 화면의 윗부분 1%까지 들어온 상태(완전히 입장)에서 전역 isEntrance까지 true일 때, isEntranced=true를 넣어준다.

   - once가 full(높이조건)보다 먼저 나와야한다.
   - 입장된 상태라고 해도, `1초정도 지연후 입장완료표시`를 해서, 움직이는동안의 setOnTop이 작동안되게 해준다.

   ```html
   <header x-data="header"
           class="header d-flex justify-content-between justify-content-lg-start align-items-center sticky-top"
           id="header"
           x-intersect.once.full="if ($store.hero.isEntrance) {setTimeout(() => { console.log('entranced');  isEntranced = true;}, 1000) }"
   ```

4. @scroll.window에서 작동하는 setOnTop에 `isEntranced`가 true일때의 조건을 추가한다.

   ```html
   <header x-data="header"
           class="header d-flex justify-content-between justify-content-lg-start align-items-center sticky-top"
           id="header"
           x-intersect.once.full="if ($store.hero.isEntrance) {setTimeout(() => { console.log('entranced');  isEntranced = true;}, 1000) }"
           @scroll.window="isEntranced && setOnTop"
   ```

5. 함수로 바꿔서 처리하게 한다.

   ```js
   	isEntranced: false,
       setIsEntranced() {
       // hero에서 전역변수에 입장완료를 주면, header는 1초후 입장완료상태로 인식할 수 있다.
       if (this.$store.hero.isEntrance) {
           setTimeout(() => {
               this.isEntranced = true;
           }, 1000)
       }
   },
   ```

   



#### 모바일에서는 onTop의 조건을 el의 높이로만 제한( spot-menu사라지는 부분 없어서 pageYOffset이 0일 때만 top)

5. 모바일시 자연스럽게 나오기 active되기 위해 수정

   - isMobile은 store megamenu에서 관리되고 있었다.

   ```js
   setOnTop() {
       console.log('setOnTop')
       //this.onTop = (window.pageYOffset || document.documentElement.scrollTop) === 0;
       // top의 기준을 0으로 주면, x-show로 사라지는 spot-menu가 스크롤보다 더 작아지면서 0에 한번 더 도달해서 버그
       // top의 기준을 여유 있게 header의 높이로 주고, 그것을 초과해야 top이 아닌 상태
       // this.onTop = (window.pageYOffset || document.documentElement.scrollTop) <= this.$el.offsetHeight;
       // 모바일시에는 기준을 좀 낮춘다.
       if (this.$store.megamenu.isMobile) {
           this.onTop = (window.pageYOffset || document.documentElement.scrollTop) === 0;
       } else {
           this.onTop = (window.pageYOffset || document.documentElement.scrollTop) <= this.$el.offsetHeight;
       }
   },
   ```

   





### 이제 hover/focus에서도, !onTop일때처럼 active되어 디자인이 바뀌게 하자.

1. hover는 `@mouseenter` ,`@mouseleave`로 전후 처리를 할 수 있다. **.active클래스를 추가할 것이므로 전후처리에는 hover상태변수를 토글해준다.**

   - foucs는 `@focusin`, `@focusout`으로 포커스상태변수를 토글한다.

   ```js
   Alpine.data('header', () => ({
   
       isHover: false,
       isFocus: false,
   ```

2. html에서는 `!onTop`상태뿐만 아니라,  hover/focus상태에서도 active를 달게 하자.

   ```html
   <header x-data="header"
           class="header d-flex justify-content-between justify-content-lg-start align-items-center sticky-top"
           id="header"
           x-intersect.once.full="setIsEntranced"
           @scroll.window="isEntranced && setOnTop"
   
           @mouseenter="isHovered = true"
           @mouseleave="isHovered = false"
           @focusin="isFocused = true"
           @isFocusedout="isFocused = false"
   
           :class="{ 'active duration-100': !onTop || isHovered || isFocused }"
   >
   ```

   

#### 문제는 [웹]의 onTop에서 hover/focus됬을 때, .acitve만으로는 !onTop상태처럼 spot-menu를 위한 paddingTop이 없는 상태

![image-20240729160849126](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240729160849126.png)



#### 사실상 hover/focus는 onTop에서만 일어나고, 나머지는 !onTop에서의 active상태이므로 구분 or 추가처리해줘야한다.

1. **나는 hover나 focus는 onTop일때만 작동하도록 하였고, `.active`뿐만 아니라 `.active-on-top`의 클래스를 추가하여 추가처리되도록 하였다.**

   ```html
   <header x-data="header"
           class="header d-flex justify-content-between justify-content-lg-start align-items-center sticky-top"
           id="header"
           x-intersect.once.full="setIsEntranced"
           @scroll.window="isEntranced && setOnTop"
   
           @mouseenter="isHovered = true"
           @mouseleave="isHovered = false"
           @focusin="isFocused = true"
           @isFocusedout="isFocused = false"
   
           :class="{ 'active duration-100': !onTop, 'active active-on-top duration-100' : (onTop && isHovered) || (onTop && isFocused) }"
   >
   ```





2. header가 onTop에서 active되었다면, 배경은 흰색으로 만들어준다.

   ```css
   .header {
   
       background-color: transparent !important;
   
       &.active {
           background-color: rgba(255, 255, 255, 0.3) !important;
           backdrop-filter: blur(4px);
           &.active-on-top {
               background-color: var(--white) !important;
           }
       }
   ```

   



3. !onTop용으로 .active가 붙어 padding이 줄어들며 spot-menu가 안보였지만, .active-on-top까지 붙으면 패딩은 줄이지 않는다.

   - 즉, .active-on-top이 없을때만 패딩을 줄인다. (top에서는 spot-menu떠있음.)

   ```css
   padding: calc(var(--spot-menu-height) + 15px) 40px 15px;
   
   &.active:not(.active-on-top) {
       @media (min-width: 768px) {
           padding: 15px 40px 15px;
       }
   }
   ```

   ![image-20240729161333273](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240729161333273.png)





4. spot-menu의 border-bottom은, 웹상에서 onTop에서 active됬을 때(흰색배경) 약간 더 진한 border가 나오게 한다.

   ```css
   & .spot-menu {
       border-bottom: 1px solid var(--white-20);
   
       .active.active-on-top & {
           border-bottom: 1px solid var(--greydd);
       }
   ```

   







5. **active-on-top은 웹에서만 적용해주고, 모바일에서는 active만 처리되게 변경한다**

   ```html
   :class="{ 'active duration-100': !onTop , 'active active-on-top duration-100' : !$store.megamenu.isMobile && (onTop && isHovered) || (onTop && isFocused) }"
   
   ```

   