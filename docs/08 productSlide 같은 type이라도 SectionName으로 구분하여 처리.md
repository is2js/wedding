

- 최신버전
  - github:https://github.dev/mizzu-creations/tire-pick-responsive/blob/bf688e41f46dd982dd105813d582aad91d9e58d5/index.html
  - demo: https://tire-pick.vercel.app/





1. default type의 product swiper를 복사하면, swiper가 망가진다.

   ![image-20240705143614536](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240705143614536.png)



2. **그 이유는 new Swiper()에 들어가는 element를 `.product-llst.list-${type}`으로 하는데 2개 이상이 찾아져서 이다.**

   - **그렇다면, type별 swiper객체 보관을 배열로 -> `type`으로 찾았어도 swiper객체 생성시에는 `찾은 복수 element를 forEach로 순회하여, nth-of-type(index)`로 찾아서 하나하나 처리**할 수 있을 것이다.

   - 하지만, 여러개의 swiper -> type별로 `data도 여러개 따로` 들어와야한다?





## 1 일단은 sectionName을 받아서 검색해야, section별 같은 type도 처리된다.

1. `.swiper.product-list.list-{type}`이 **섹션별로 같은 타입이 있을 수 있다.**

2. **최상위 태그인 section에 이름을 명시하자.**

   ```html
   <section class="herb-medicine layout-center mt65 section-border
   ```

   ```html
   <section class="family layout-center mt65 section-border
   ```





3. **init 메서드에서 sectioName을 따로 받아서, 최상위태그로서 검색해서 element를 찾는다.**

   ```js
   const initProductSwiper = (type = 'default', sectionName, data) => {
   ```

   ```js
   const swiperTargetClass = `.${sectionName} ${baseClass}.list-${type}`;
   ```

   - pagination도 명시해준다.

   ```js
   const paginationTargetClass = type !== 'more' ? `.${sectionName} .list-${type} .swiper-pagination` : null;
   ```

   

4. 호출시 type외에 sectionName도 명시해줘야한다.

   ```js
   initProductSwiper('more', 'herb-medicine');
   initProductSwiper('default', 'family');
   
   window.addEventListener("resize", () => {
       initProductSwiper('more', 'herb-medicine');
       initProductSwiper('default', 'family');
   });
   
   ```





### 그렇다면, type별로가 아니라 section별로 Swiper가 관리되어야한다.

1. 기존에 type별 Swiper를 저장하던 변수를 Section별로 저장하도록 변경한다.

   ```js
   const initProductSwiper = (type = 'default', sectionName, data) => {
       // 1. 기존에 있었으면 삭제
       // if (productSwipers[type]) {
       //     productSwipers[type].destroy(true, true);
       // }
       if (productSwipers[sectionName]) {
           productSwipers[sectionName].destroy(true, true);
       }
   ```

   ```js
   productSwipers[sectionName] = new Swiper(swiperTargetClass, {
   ```

   ```js
   if (isMobile) {
       // productSwiper.init();
       // productSwipers[type].init();
       productSwipers[sectionName].init();
   } else {
   }
   ```

   

2. 관리변수 명도 `productSwiperPetSection`으로 변경한다.

   ```js
   const productSwiperPerSection = {};
   
   const initProductSwiper = (type = 'default', sectionName, data) => {
       // 1. 기존에 있었으면 삭제
       if (productSwiperPerSection[sectionName]) {
           productSwiperPerSection[sectionName].destroy(true, true);
       }
   ```

   



## 2 한 section에 여러개의 .product-list.list-type이 있을 수 있다.

![image-20240705161811371](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240705161811371.png)



1. **이 때, new Swiper()에 들어갈 `element가 중복`되면 안되는데**
   - **여러개 찾아져서 ->` forEach로 돌면서 개별 객체를 선언`하고**
   - **swipers[type]에도 `같은 type이라도 여러 swiper객체가 배열에 push`되어 보관되어야한다.**



### type마다 여러개를 처리가능하도록 전역변수 productSwiperArrayPerSection로 관리 시작

1. section별로 swiper array가 들어갈 변수를 선언한다.

   - base class Name은 동일하다.

   ```js
   /* section별로 여러개의 swiper를 array에 담아서 사용 */
   const productSwiperArraysPerSection = {};
   ```

   



### section별 여러swiper라면, 추후 data도 여러개 들어와야한다.

2. 메서드에서는 data도 배열로 받아야 나중에 처리가능하다?!

3. **또한, 관리변수[sectionName]으로 `섹션별로 데이터가 없더라도, 해당 section에는 기본배열 []`이 선언되어있어야한다.**

   ```js
   const initProductSwiperArray = (type = 'default', sectionName, data = []) => {
       // 0. section별 swiper 배열 초기화( forEach사용대기 )
       if (!productSwiperArraysPerSection[sectionName]) {
           productSwiperArraysPerSection[sectionName] = [];
       }
   ```

   

   

4. **시작하는 과정에서 기존 swiper를 destory할 때, forEach로 돌면서 `파괴` 후, `빈배열`로 초기화한다.**

   ```js
   // 1. 기존에 있었으면 삭제 -> 파괴까지하고 빈배열로 초기화
   productSwiperArraysPerSection[sectionName].forEach(swiper => swiper.destroy(true, true));
   productSwiperArraysPerSection[sectionName] = [];
   
   ```



### querySelectorAll을 통해, new Swiper선언전에 element를 먼저 찾아서 순회를 하면서 .forEach()안에서 new Swiper를 생성 -> push까지 해야한다.



5. 단일처리와 다르게, targetClass만 생성하는게 아니라, querySelectorAll로 모두 찾아놓는다. 이 때 최상위  sectionName 하에서 찾는다.

   ```js
   // 2. init: false 옵션으로 swiper객체만 생성 -> 모바일에서만 init() + 여러개일 경우, 순회하며 객체선언 후 배열에 push
   const swiperElements = document.querySelectorAll(`.${sectionName} ${baseClass}.list-${type}`);
   swiperElements.forEach((swiperElement, index) => {
   ```

   

### ✨ forEach의 공짜 index를 가지고 :nth-of-type에 넣어서 pagination을 찾으려고 해봤지만, :nth-of-type이 pagination el 옵션에서 무시됨 -> swiperElement를 먼저 찾았던 이유 중 하나! swiperElement.queryselct를 한ㄷ.

6. new Swiper()의 pagination 옵션에 적을 el을 지정할 때, :nth-of-type ( index + 1)이 적용안됬다.

   - 개별 swiperElement 내에서 `.swiper-pagination`을 찾는다.

   ```js
   const swiperElements = document.querySelectorAll(`.${sectionName} ${baseClass}.list-${type}`);
   swiperElements.forEach((swiperElement, index) => {
   
   
       // 4.pagination의 el 설정을 type에 따라 동적으로 지정 - 'more' 타입이 아니라면 element 찾아서 옵션에 적용
       // const paginationTargetClass = type !== 'more' ? `.list-${type}:nth-of-type(${index + 1}) .swiper-pagination` : null;
       // => 옵션적용시 :nth-of-type 적용안됨
       const paginationTargetClass = swiperElement.querySelector('.swiper-pagination');
   ```

   





6. 내부에서 new Swiper객체를 생성하고,  배열에 push까지 해줘야한다.

   - **모바일시에 현재 생성된 swiper객체.init()까지 forEach안에서 해줘야한다.**

   ```js
   swiperElements.forEach((swiperElement, index) => {
   
   
       // 4.pagination의 el 설정을 type에 따라 동적으로 지정 - 'more' 타입이 아니라면 element 찾아서 옵션에 적용
       // const paginationTargetClass = type !== 'more' ? `.list-${type}:nth-of-type(${index + 1}) .swiper-pagination` : null;
       // => 옵션적용시 :nth-of-type 적용안됨
       const paginationTargetClass = swiperElement.querySelector('.swiper-pagination');
   
   
       // productSwiper = new Swiper(swiperElement, {
       // productSwiperArraysPerSection[sectionName] = new Swiper(swiperTargetClass, {
       const newSwiper = new Swiper(swiperElement, {
           grabCursor: true,
           slidesPerView: 1.7,
           spaceBetween: 15,
           init: false,
           breakpoints: {
               410: {
                   slidesPerView: 2.5,
               },
               570: {
                   slidesPerView: 3.5,
               }
           },
           //5. more type이 이거나 or  element없으면 false -> 아니라면 선언
           pagination: type === 'more' || !paginationTargetClass ? false : {
               el: paginationTargetClass,
               clickable: true,
           }
       });
   
   
       // new
       productSwiperArraysPerSection[sectionName].push(newSwiper);
   
       // 3. 크기보고 swiper 사용여부 결정 결정
       const screenWidth = window.innerWidth;
       const mobileMaxWidth = 768;
       const isMobile = screenWidth <= mobileMaxWidth;
   
       if (isMobile) {
           newSwiper.init();
   
       } else {
           console.log("web / type - index", type, index)
       }
   });
   ```



7. 이제 section별 여러개는 `initProductSwiperArray( 타입, 섹션이름 )` 형식으로 해줘야한다.

   ```js
   initProductSwiper('more', 'herb-medicine');
   initProductSwiper('default', 'family');
   initProductSwiperArray('default', 'families');
   
   // 리사이즈 될 때마다 재실행
   window.addEventListener("resize", () => {
       initProductSwiper('more', 'herb-medicine');
       initProductSwiper('default', 'family');
       initProductSwiperArray('default', 'families');
   });
   
   ```

   ![image-20240705170931516](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240705170931516.png)







## 3 전역변수들 refactoring

1. 변수들을 최 상단으로 이동

   ```js
   const baseClass = '.swiper.product-list';
   
   // let productSwiper;
   /* section별로  swiper를 담아서 사용 */
   const productSwiperPerSection = {};
   /* section별로 여러개의 swiper를 array에 담아서 사용 */
   const productSwiperArraysPerSection = {};
   
   ```

   

2. pagination이 target을 찾는 조건이 type으로 이루어져있는데, 바뀔 수 있어서 전역변수로 뽑기

   ```js
   function hasSwiperPagination(type) {
       return type !== 'more';
   }
   ```

   ```js
   // const paginationTargetClass = type !== 'more' ? `.list-${type} .swiper-pagination` : null;
   
   const paginationTargetClass = hasSwiperPagination(type) ? `.${sectionName} .list-${type} .swiper-pagination` : null;
   
   // pagination: type === 'more' || !paginationTargetClass ? false : {
   pagination: !hasSwiperPagination(type) ? false : {
       el: paginationTargetClass,
       clickable: true,
   }
   ```

   - ArraysSwiper도

   ```js
   // const paginationTargetClass = swiperElement.querySelector('.swiper-pagination');
   const paginationElement = hasSwiperPagination(type) ? swiperElement.querySelector('.swiper-pagination') : null;
   
   
   
   pagination: !hasSwiperPagination(type) ? false : {
       // el: paginationTargetClass,
       el: paginationElement,
       clickable: true,
   }
   ```

   



3. window.innerWidth로 mobile상태인지 체크하는 메서드도 추출한다.

   ```js
   function isMobileScreen(screenWidth) {
       return screenWidth <= mobileMaxWidth;
   }
   ```

   ```js
   // const screenWidth = window.innerWidth;
   // const mobileMaxWidth = 768;
   // const isMobile = screenWidth <= mobileMaxWidth;
   const isMobile = isMobileScreen(window.innerWidth)
   ```

   