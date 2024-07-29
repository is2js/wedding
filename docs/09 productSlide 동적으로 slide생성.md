

- 최신버전
  - github:https://github.dev/mizzu-creations/tire-pick-responsive/blob/bf688e41f46dd982dd105813d582aad91d9e58d5/index.html
  - demo: https://tire-pick.vercel.app/







## 1 데이터부터 구성? 제품 or 가족

### 예시데이터가 길어질 것 같으니, mainProductData.js를 빼서 import할 수 있게 한다.



1. `js/mainProductData.js`를 만들고 예시데이터를 생성할 준비를 한다.

   ![image-20240706192129617](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240706192129617.png)

2. **data.js에서는 `변수정의 -> export`까지 해준다.**

   ```js
   const staticImgSrc = "images/png/product/thumbnail/";
   
   const brideData = [
       {
           label: "bride",
           thumbnail: `${staticImgSrc}/bride.png`,
       },
       {
           label: "bride",
           thumbnail: `${staticImgSrc}/bride.png`,
       }
   ];
   
   export {
   brideData,
   };
   
   ```

   

3. **사용하는 js에서는 `import {} from ""`으로 지정해준다.**

   ```js
   import {
       brideData,
   } from "./mainProductData.js";
   
   console.log(brideData);
   
   ```

   - **이대로 콘솔을 찍어보면, 에러가 난다.**

     ```
     Uncaught SyntaxError: Cannot use import statement outside a module (at mainProduct.js:1:1)
     ```

     

### ✨ 다른 js를 import하는 js파일은 html에서 `type="module"`을 지정해줘야한다.

4. **index.html에서 `mainProduct.js`를 `type="module"`로 추가한다.**

   ```html
   <!-- layout -->
   <script src="./js/header.js"></script>
   <script src="./js/mainVisual.js"></script>
   <!--<script src="./js/mainProduct.js"></script>-->
   <!-- data.js를 import구문이 들어가는 순간부터는 module로 추가함 -->
   <script src="./js/mainProduct.js" type="module"></script>
   ```

   ![image-20240706202759813](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240706202759813.png)







### 예시 .swiper-slide 1개를 가져와서 동적으로 달라지는 부분 -> ${} 처리 -> 데이터 구성해보기

5. html 를 string으로 가져와서 데이터를 하나씩 뽑아본다.

   ![image-20240706210714110](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240706210714110.png)

   - 달라지는 부분을 `${}`처리한 뒤, `데이터`로 뽑아본다.

     ![image-20240706211404519](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240706211404519.png)

     ![image-20240706214347096](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240706214347096.png)

     

   

6. 일단 구조적으로 작성한 데이터와 html을 확인

   - **label은 없을 수 있고, 있다면, css에 들어갈 type과 text까지 반영하게 한다.**

   ```js
   const brideData = [
       {
           label: {
               type: "bride",
               text: "신부측 혼주",
           },
           thumbnail: `${staticImgSrc}/bride.png`,
           familyName: {
               family: '신부父',
               name: '김용범'
           },
           account: {
               bank: '신한',
               accountNumber: '110-123-456789'
           },
           phone: '010-1234-5678',
       },
   ];
   ```

   ```js
   `
    <!-- bride label & event & mobile  -->
   <div class="swiper-slide">
       <!-- event가 있다면, a태그에 링크를 대체한다. -->
       <a class="product d-block">
           <figure>
               <div class="product-thumbnail position-relative">
                   <img src="${thumbnail}" class="product-thumbnail-image">
                   <!-- groom label -->
                   <span class="product-thumbnail-label label-${label.type} position-absolute top-0 start-0 ">${label.text}</span>
               </div>
               <figcaption>
                   <div class="product-family-name d-flex align-items-bottom mt16">
                       <div class="product-family bride">
                           <span class="sr-only">가족관계</span>
                           ${familyName.family}
                       </div>
                       <div class="product-name">
                           <span class="sr-only">이름</span>
                           ${familyName.name}
                       </div>
                   </div>
                   <div class="product-mobile bg-img bg-img-x-left d-flex align-items-center mt14 ellipsis">
                       전화 걸기
                   </div>
                   <div class="product-account bg-img bg-img-x-left d-flex align-items-center mt10 ellipsis"
                        onclick="alert('신부측 혼주(부) 김용범님의 신한은행 계좌번호가 복사되었습니다.')"
                   >
                       [${account.bank}] 계좌번호 복사
                   </div>
               </figcaption>
           </figure>
       </a>
   </div>
   `
   ```

   

7. 이제 순회를 안하는 상태라서, 변수가 없는 변수라 console에러가 나므로 주석처리하고 찍어본다.

   ![image-20240706214718065](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240706214718065.png)





## 2 데이터 기반으로 동적 createSlides

1. `mainVisual.js`에서는  swiper를 init하기 전에 동적으로 slide를 생성했다.

   - **데이터가 모두 필수이며 똑같은 양식**이라 별다른 처리가 없었다.

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
   initVisualSwiper(data);
   // 리사이즈 될 때마다 재실행
   window.addEventListener("resize", () => {
       initVisualSwiper(data);
   });
   
   ```

   


### swiper 초기화전 card(slide)들 data기반으로 미리 만들기



2. 지금은 여러 section별로 **내부 데이터필드가 있냐 없느냐에 따라 다르게 구성되는데, 일단은 `createSlides`부터 선언하고 `일정한 데이터`로 처리하자.**

   ```js
   createFamilySlides(brideData);
   initProductSwiper('default', 'family');
   ```

   ```js
   const createFamilySlides = (data)  =>{
       console.log(data)
   }
   ```





### 순회하면서 개별 slide를 만드는데, 미리 찾은 wrapper에 beforeend로 insertAdjacentHTML() 시켜줘야한다.

3. 개별로 slide를 만들어서 넣어줘야한다.

   ```js
   const createFamilySlides = (data) => {
       const familySwiperWrapper = document.querySelector('.family .swiper .swiper-wrapper');
       
   	console.log(familySwiperWrapper);
       data.forEach((item) => {
           const familySlide = ``;
           familySwiperWrapper.insertAdjacentHTML('beforeend', familySlide);
       });
   }
   ```

   

4. 아까 `data.js`에 주석처리한 slide html을 가져와서 넣어서 내부에 `item.`을 추가해서 처리한다.

   ```html
   const createFamilySlides = (data) => {
   const familySwiperWrapper = document.querySelector('.family .swiper .swiper-wrapper');
   console.log(familySwiperWrapper);
   
   data.forEach((item) => {
   const familySlide = `
   <!-- bride label & event & mobile  -->
   <div class="swiper-slide">
       <!-- event가 있다면, a태그에 링크를 대체한다. -->
       <a class="product d-block">
           <figure>
               <div class="product-thumbnail position-relative">
                   <img src="${item.thumbnail}" class="product-thumbnail-image">
                   <!-- groom label -->
                   <span class="product-thumbnail-label label-${item.label.type} position-absolute top-0 start-0 ">${item.label.text}</span>
               </div>
               <figcaption>
                   <div class="product-family-name d-flex align-items-bottom mt16">
                       <div class="product-family bride">
                           <span class="sr-only">가족관계</span>
                           ${item.familyName.family}
                       </div>
                       <div class="product-name">
                           <span class="sr-only">이름</span>
                           ${item.familyName.name}
                       </div>
                   </div>
                   <div class="product-mobile bg-img bg-img-x-left d-flex align-items-center mt14 ellipsis">
                       전화 걸기
                   </div>
                   <div class="product-account bg-img bg-img-x-left d-flex align-items-center mt10 ellipsis"
                        onclick="alert('신부측 혼주(부) 김용범님의 신한은행 계좌번호가 복사되었습니다.')"
                        >
                       [${item.account.bank}] 계좌번호 복사
                   </div>
               </figcaption>
           </figure>
       </a>
   </div>
   `;
   familySwiperWrapper.insertAdjacentHTML('beforeend', familySlide);
   });
   }
   ```

   - **기본 2개 slide에 1개가 더 추가되었다.**

   ![image-20240706220251284](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240706220251284.png)





## 3 ✨종류가 여러가지 되고 긴 html template 처리를 위해 productCardTemplate.js로 빼서, 메서드로 export한다.



1. `mainProductCardTemplate.js`를 만들고, **자신의 메서드를 정의 후, export할 준비를 한다.**

   ```js
   const createFamilyCard = (item) => {
       return `
   <div class="swiper-slide">
       <a class="product d-block">
           <figure>
               <div class="product-thumbnail position-relative">
                   <img src="${item.thumbnail}" class="product-thumbnail-image">
                   <!-- groom label -->
                   <span class="product-thumbnail-label label-${item.label.type} position-absolute top-0 start-0 ">${item.label.text}</span>
               </div>
               <figcaption>
                   <div class="product-family-name d-flex align-items-bottom mt16">
                       <div class="product-family bride">
                           <span class="sr-only">가족관계</span>
                           ${item.familyName.family}
                       </div>
                       <div class="product-name">
                           <span class="sr-only">이름</span>
                           ${item.familyName.name}
                       </div>
                   </div>
                   <div class="product-mobile bg-img bg-img-x-left d-flex align-items-center mt14 ellipsis">
                       전화 걸기
                   </div>
                   <div class="product-account bg-img bg-img-x-left d-flex align-items-center mt10 ellipsis"
                        onclick="alert('신부측 혼주(부) 김용범님의 신한은행 계좌번호가 복사되었습니다.')"
                   >
                       [${item.account.bank}] 계좌번호 복사
                   </div>
               </figcaption>
           </figure>
       </a>
   </div>
   `
   };
   
   export { 
       createFamilyCard 
   };
   ```

2. mainProduct.js에서는 import해서 사용한다.

   - **사용해놓고 자동import이용하기**
     - 자동import하니 뒤에 `.js`가 안붙어서 추가함.

   ```js
   import {
       brideData,
   } from "./mainProductData.js";
   import {createFamilyCard} from "./mainProductCardTemplate.js";
   
   
   ```

   ```js
   const createFamilySlides = (data) => {
       const familySwiperWrapper = document.querySelector('.family .swiper .swiper-wrapper');
       console.log(familySwiperWrapper);
   
       data.forEach((item) => {
           const familySlide = createFamilyCard(item);
           familySwiperWrapper.insertAdjacentHTML('beforeend', familySlide);
       });
   }
   ```

   



### ✨데이터 값에 따라 template의 중간내용이 바뀐다면, 내부 render메서드를 구현

1. item.label.type이 bride냐 groom이냐에 따라서 html이 달라진다.



#### ✨✨그 전에, data의 필드들을 `const {} = data;`로 펼치기

2. 받은 변수이름을 item으로 했는데 `data`로 수정하고 이 data에 있을 필드들을 펼쳐서 받을 수 있다.

   ```js
   const createFamilyCard = (data) => {
       const {thumbnail, label, familyName, account} = data;
   ```

   

3. template에서 변수를 펼친 변수들로 바꿔서 쉽게 처리되도록 한다.

   - `data.`을 다 빼준다.

   ```js
   const createFamilyCard = (data) => {
       const {thumbnail, label, familyName, account} = data;
       return `
   <div class="swiper-slide">
       <a class="product d-block">
           <figure>
               <div class="product-thumbnail position-relative">
                   <img src="${thumbnail}" class="product-thumbnail-image">
   ```

   

## 4 ✨label여부 등 필드존재여부 따라 다른 html or 빈 html을 early reutrn해주는 template내부 render메서드 구현

4. 이제 label.type에 따라 다른 html을 렌더링해주는 render메서드 구현

   - **template에서 `해당부분을 date에 따라 return해주는 메서드`를 구현한다.**
   - **만약, label이 존재하지 않으면, `span.product-thumbnail-label`태그가 없어야한다.**

   ```html
   const createFamilyCard = (data) => {
       const {thumbnail, label, familyName, account} = data;
       return `
   <div class="swiper-slide">
       <a class="product d-block">
           <figure>
               <div class="product-thumbnail position-relative">
                   <img src="${thumbnail}" class="product-thumbnail-image">
                   ${renderThumbnailLabel(label)}
               </div>
   ```

   ```js
   const renderThumbnailLabel = (label) => {
       if (!label) return '';
       return `<span class="product-thumbnail-label label-${label.type} position-absolute top-0 start-0 ">${label.text}</span>;`
   }
   ```

   ![image-20240706225639385](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240706225639385.png)

   

5. account가 포함되는 부분도 없으면 early return해주는 render메서드를 구현한다.

   ```js
   function renderAccount(account) {
       if (!account) return '';
       return `<div class="product-account bg-img bg-img-x-left d-flex align-items-center mt10 ellipsis"
                   onclick="alert('신부측 혼주(부) 김용범님의 신한은행 계좌번호가 복사되었습니다.')"
       >
           [${account.bank}은행] 계좌번호 복사
       </div>`;
   }
   ```

   ```html
   <div class="product-mobile bg-img bg-img-x-left d-flex align-items-center mt14 ellipsis">
       전화 걸기
   </div>
   ${renderAccount(account)}
   ```

   ```js
       {
           // label: {
           //     type: "bride",
           //     text: "신부측 혼주",
           // },
           thumbnail: `${staticThumbnailImgSrc}family/bride_04.png`,
           familyName: {
               family: '자매',
               name: '김나영'
           },
           // account: {
           //     bank: '신한',
           //     accountNumber: '110-123-456789'
           // },
           phone: '010-1234-5678',
       },
   ```

   ![image-20240706225824715](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240706225824715.png)



6. **계좌번호는 familyName까지 필요하다**

   ```html
   <div class="product-mobile bg-img bg-img-x-left d-flex align-items-center mt14 ellipsis">
       전화 걸기
   </div>
   ${renderAccount(account, familyName)}
   ```

   ```js
   function renderAccount(account, familyName) {
       if (!account) return '';
       return `<div class="product-account bg-img bg-img-x-left d-flex align-items-center mt10 ellipsis"
   onclick="alert('${familyName.family} ${familyName.name}님의 \\n${account.bank}은행 ${account.number}\\n계좌번호가 복사되었습니다.')"
   >
   계좌번호 복사
   </div>`;
   }
   ```

   ![image-20240706231124699](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240706231124699.png)





7. groomData도 만들어서, export해서 처리해본다.

   ```js
   
   export {
     brideData, groomData,
   };
   
   ```

   ```js
   import {
       brideData, groomData
   } from "./mainProductData.js";
   
   
   // createFamilySlides(brideData);
   createFamilySlides(groomData);
   initProductSwiper('default', 'family');
   ```





## 5 section마다 createFamilySlides 사용을 위해, sectionName을 받아 다른 wrapper 지정해주기

1. sectionName을 받고, 내부에서는 해당하는 wrapper를 찾을 수 있게해준다.

   ```js
   createFamilySlides('family', groomData);
   ```

   ```js
   // const createFamilySlides = (data) => {
   const createFamilySlides = (sectionName, data) => {
       // const familySwiperWrapper = document.querySelector('.family .swiper .swiper-wrapper');
       const sectionSwiperWrapper = document.querySelector(`.${sectionName} .swiper .swiper-wrapper`);
       console.log(sectionSwiperWrapper);
   
       data.forEach((item) => {
           const familySlide = createFamilyCard(item);
           sectionSwiperWrapper.insertAdjacentHTML('beforeend', familySlide);
       });
   }
   ```

   





### section내 wrapper가 2개인 것도 있으니, sectionName이 아니라, wrapper를 받도록 변경

```js
const familySectionSwiperWrapper = document.querySelector(`.family .swiper .swiper-wrapper`);
if (familySectionSwiperWrapper) {
    createFamilySlides(familySectionSwiperWrapper, groomData);
}
initProductSwiper('default', 'family');
```

```js
const createFamilySlides = (sectionSwiperWrapper, data) => {
    // const familySwiperWrapper = document.querySelector('.family .swiper .swiper-wrapper');
    console.log(sectionSwiperWrapper);

    data.forEach((item) => {
        const familySlide = createFamilyCard(item);
        sectionSwiperWrapper.insertAdjacentHTML('beforeend', familySlide);
    });
}
```





### section내 wrapper 2개일 경우

1. wrapper를 querySelectorAll로 모두 찾고, 순회할 준비를 한다.

   - **이 때, wrapper가 돌때마다, 그 순서에 맞는 data를 선택하기 위해 `index`도 같이 받아서 순회한다.**

   ```js
   const familiesSectionSwiperWrappers = document.querySelectorAll(`.families .swiper .swiper-wrapper`);
   
   familiesSectionSwiperWrappers.forEach((swiperWrapper, index) => {
   
   });
   ```

2. **data를 통합해서 `wrapper`순으로 들어갈 데이터를 준비한다.**

   ```js
   const familesData = [brideData, groomData];
   
   const familiesSectionSwiperWrappers = document.querySelectorAll(`.families .swiper .swiper-wrapper`);
   
   // 각 wrapper에 대해 작업을 수행
   familiesSectionSwiperWrappers.forEach((swiperWrapper, index) => {
       // 각 wrapper에 슬라이드 생성
       createFamilySlides(swiperWrapper, familesData[index]);
   });
   ```

   ![image-20240706235830925](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240706235830925.png)





## 6 resize 이벤트를 내부 `{once: true}`로 한번만 등록되게 해서, 자기자신을 호출하기

- this로 호출하면 바로 바깥의 window가 해당하니, 재귀형태로 호출하되, `, {once: true}`옵션으로 등록시켜서 한번만 등록되게 한다.

  ```js
  const initProductSwiper = (type = 'default', sectionName, data) => {
  
      window.addEventListener("resize", () => {
          initProductSwiper(type, sectionName);
      }, {once: true});
  
  };
  ```

  





## 7 `sectionName`으로 `wrapper`찾고 +  `wrapper + data`로 slide만들어 추가 + `type + sectionName`으로 swiper 초기화까지 묶어주기



### section에 wrapper(swiper)가 1개인 경우

```js
const createProductSwiper = (sectionName, type = 'default', data) => {
    // 1. slide들을 매달 wrapper 1개 찾기 
    const sectionSwiperWrapper = document.querySelector(`.${sectionName} .swiper .swiper-wrapper`);
    
    // 2. wrapper가 찾아졌으면, data기반으로 slide만들어서 wrapper에 붙혀주기
    if (sectionSwiperWrapper) {
        createProductSlides(sectionSwiperWrapper, data);
    }
    // 3. swiper객체 생성 및 resize 이벤트 
    initProductSwiper(type, sectionName);
}
```

```js
createProductSwiper('family', 'default', groomData);
```





### section에 wrapper가 2개이상인 경우

```js
const familyData = [brideData, groomData]

const createProductSwiperMultipleWrapper = (sectionName, type = 'default', data) => {
    // 1. slide들을 매달 wrapper 2개 이상 찾기
    const sectionSwiperWrappers = document.querySelectorAll(`.${sectionName} .swiper .swiper-wrapper`);

    // 2. 순회하며  wrapper에 슬라이드 생성
    sectionSwiperWrappers.forEach((swiperWrapper, index) => {
        createProductSlides(swiperWrapper, data[index]);
    });
    //3. swiper 객체 초기화
    initProductSwiperMultipleWrapper('default', 'families', data);
}
```

```js
const familyData = [brideData, groomData]

createProductSwiperMultipleWrapper('families', 'default', familyData);
```









## 8 createProductSlide도 data/template + render / create 정의해주기





### 01 모든 옵션이 다 붙은 .swiper-slide를 가져와 Template.js에서 createCard 메서드 정의 후 export까지

1. **이 때, `slide1 개의 data를 받아서 필드들을 풀헤칠 예정`이기 때문에, `data`를 변수로 받아준다.**

   ```js
   const createProductCard = (data) => {
       return ` <div class="swiper-slide">
       <a href="" class="product d-block">
           <figure>
               <div class="product-thumbnail position-relative">
                   <img src="images/png/product/thumbnail/product_2.png" class="product-thumbnail-image">
                   <img src="images/png/product/category/hankook_logo.png"
                        class="product-thumbnail-category position-absolute"
                        alt="카테고리"
                   >
                   <!-- new label -->
                   <span class="product-thumbnail-label label-new position-absolute top-0 start-0 ">NEW</span>
               </div>
               <figcaption>
                   <div class="product-category mt16">
                       <span class="sr-only">카테고리</span>
                       신부 아버지입니다@@@@@@@@@@@@
                   </div>
                   <div class="product-title mt16">
                       <span class="sr-only">제품명</span>
                       김용범@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
                   </div>
                   <div class="product-description mt12">
                       <span class="sr-only">설명</span>
                       신부의 든든한 버팀목
                   </div>
                   <div class="product-price d-flex align-items-center mt12">
                       <div class="product-discount">
                           <span class="sr-only">할인율</span>
                           신부父
                       </div>
                       <div class="product-value">
                           <span class="sr-only">판매가</span>
                           김용범
                       </div>
                   </div>
                   <div class="product-review bg-img bg-img-x-left d-flex align-items-center mt16">
                       <div class="product-rating">
                           <span class="sr-only">별점</span>
                           4.6
                       </div>
                       <div class="product-review-count">
                           <span class="sr-only">리뷰 갯수</span>
                           (1,450)
                       </div>
                   </div>
                   <!-- inline에 높이 반영을 위한 block 반영을 위한 부모 flex화 -->
                   <div class="product-hashtag d-flex flex-wrap mt12">
                       <span class="sr-only">해시태그</span>
                       <span>여성</span> <span>다이어트</span> <span>베스트셀러</span>
                   </div>
               </figcaption>
           </figure>
       </a>
   </div>`
   };
   ```

   ```js
   export {
       createFamilyCard, createProductCard,
   };
   ```

   







### 02 동적으로 변하는 부분을 [필드 or 필드를 받는 render메서드]로 뽑고, 그 때마다 data에서 풀어헤친 곳에 등록하기

2. template의 곳곳을 필드 or 필드가 들어간 render함수로 만들텐데,  풀어헤친 data필드에 등록을 해줄 준비를 한다.

   ```js
   const createProductCard = (data) => {
       const {} = data;
   
       return `<div class="swiper-slide">
   ```

   

3. **만약, static값이 데이터로 보존되어야한다면, `data = {}`의 1개의 데이터에 할당해서 만들어나간다**

   ```js
   const createProductCard = (data) => {
       data = {
           thumbnail: 'images/png/product/thumbnail/product_2.png',
       }
       const {thumbnail} = data;
   
       return `<div class="swiper-slide">
       <a href="" class="product d-block">
           <figure>
               <div class="product-thumbnail position-relative">
                   <img src="${thumbnail}" class="product-thumbnail-image">
   ```





4. label의 경우, **기존 render함수가 있어서, `html이 달라지면 if문으로 분기처리`를 추가하면서 `기존 렌더함수 그대로 적용`을 해주자.**

   ```js
   const createProductCard = (data) => {
       data = {
           thumbnail: 'images/png/product/thumbnail/product_2.png',
           label: { type: 'new', text: 'NEW' },
       }
       const {thumbnail, label} = data;
   
       return `<div class="swiper-slide">
       <a href="" class="product d-block">
           <figure>
               <div class="product-thumbnail position-relative">
                   <img src="${thumbnail}" class="product-thumbnail-image">
                   <img src="images/png/product/category/hankook_logo.png"
                        class="product-thumbnail-category position-absolute"
                        alt="카테고리"
                   >
                   <!-- new label -->
                   ${renderThumbnailLabel(label)}
   ```



5. 카테고리의 경우, 위쪽에선 img, 아래쪽에선 text가 쓰인다.

   ```js
   const createProductCard = (data) => {
       data={
           thumbnail: 'images/png/product/thumbnail/product_2.png',
           label: { type: 'new', text: 'NEW' },
           category: { img: 'images/png/product/category/hankook_logo.png', name: '카테고리' },
       }
       const {thumbnail, label, category} = data;
   ```

   ```html
   <div class="product-thumbnail position-relative">
       <img src="${thumbnail}" class="product-thumbnail-image">
           <img src="${category.img}"
   class="product-thumbnail-category position-absolute"
   alt="카테고리"
   >
       ${renderThumbnailLabel(label)}
   </div>
   <figcaption>
       <div class="product-category mt16">
           <span class="sr-only">카테고리</span>
   ${category.name}
   </div>
   ```



6. 이제 product자체 정보를 올려준다.

   - **tag는 다른 type의 가능성이 있어서 {} 형태로 type을 준다.**
   - 가격은 할인율을 보함한 {} 으로 줬다

   ```js
   data={
       thumbnail: 'images/png/product/thumbnail/product_2.png',
       label: { type: 'new', text: 'NEW' },
       category: { img: 'images/png/product/category/hankook_logo.png', name: '카테고리' },
       name: '',
       description: '',
       price: { discount: 22, value: 198000 },
       review: { rating: 4.6, count: 1450 },
       tags: [
           {name: '여성', type: 'default'}, 
           {name: '다이어트', type: 'default'}, 
           {name: '베스트셀러', type: 'default'}, 
       ],
   }
   const {thumbnail, label, category,
          name, description, price, review, tags,
         } = data;
   ```

   

7. tags는 data가 동적으로 처리되어야한다.

   

#### array를 render하기

8. tags라는 array가 `array가 아니거`나 `.length`가 0이면 빈 string  return

   - **맞다면 `.map`으로 `span.label-${label.type}`를 붙여서 `.join(' ')`하여 반환한다**

   ```html
   <div class="product-hashtag d-flex flex-wrap mt12">
       <span class="sr-only">해시태그</span>
       <!--<span>여성</span> <span>다이어트</span> <span>베스트셀러</span>-->
       ${renderTags(tags)}
   </div>
   ```

   ```js
   const renderTags = (tags) => {
       if (!Array.isArray(tags) || tags.length === 0) return '';
       return tags.map(tag => `<span class="label-${tag.type}">${tag.name}</span>`).join(' ');
   
   };
   ```

   

#### 만들어주지 않았던 품절여부 class를 render메서드 없이 삼항연산자 string 변수로 추가해주기

9. soldout여부에 따라 **`.product-thumbnail`에 `.sold-out클래스가 추가`되어야한다.**

   - 이 부분은 html이 달라지거나 동적으로 변하는게 아니기 때문에
     - **createCard내부에서 `있따면 클래스 / 없으면 빈 string을 만드는 삼항연산자` string변수를 받아 처리해준다.**

   ```js
   const createProductCard = (data) => {
       const {
           thumbnail, label, category,
           name, description, price, review, tags,
           isSoldOut
       } = data;
   
       const soldOutClass = isSoldOut ? ' sold-out' : '';
   
   
       return `<div class="swiper-slide">
       <a href="" class="product d-block">
           <figure>
               <div class="product-thumbnail position-relative${soldOutClass}">
   ```

   



### 03 createCard 내부 임시로 만든 data를 data.js에 가져와 배열로 만들기

9. createCard내부에 임시로 만든 것을 가져와 `productData`의 데이터 배열을 만든다.

   ![image-20240708213010686](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240708213010686.png)

   - **이 때, 꾸며줄때 안붙혀줬던 `품절여부 isSoldOut`도 만들어준다.**

   ```js
   const productData = [
       {
           isSoldOut: false,
           thumbnail: 'images/png/product/thumbnail/product_2.png',
           label: {type: 'new', text: 'NEW'},
           category: {img: 'images/png/product/category/hankook_logo.png', name: '카테고리'},
           name: '',
           description: '',
           price: {discount: 22, value: 198000},
           review: {rating: 4.6, count: 1450},
           tags: [
               {name: '여성', type: 'default'},
               {name: '다이어트', type: 'default'},
               {name: '베스트셀러', type: 'default'},
           ],
       }
   ]
   
   export {
       brideData, groomData, productData
   };
   
   ```



### 04 export된 productData를 `mainProduct.js`에서 import하여  more타입으로 createSwiper() 해본다.

10. import

    ```js
    import {
        productData,
        brideData,
        groomData,
    } from "./mainProductData.js";
    ```





11. **기존에 createFamilyCard(data)를 내부에 사용하는  createProductSlides를 FamilySlides로 변경하고, **

    ```js
    const createFamilySlides = (sectionSwiperWrapper, data) => {
        
        data.forEach((item) => {
            const familySlide = createFamilyCard(item);
            sectionSwiperWrapper.insertAdjacentHTML('beforeend', familySlide);
        });
    }
    const createFamilySwiper = (sectionName, type = 'default', data) => {
        // 1. slide들을 매달 wrapper 1개 찾기
        const sectionSwiperWrapper = document.querySelector(`.${sectionName} .swiper .swiper-wrapper`);
    
        // 2. wrapper가 찾아졌으면, data기반으로 slide만들어서 wrapper에 붙혀주기
        if (sectionSwiperWrapper) {
            createFamilySlides(sectionSwiperWrapper, data);
        }
        // 3. swiper객체 생성 및 resize 이벤트
        initProductSwiper(type, sectionName);
    }
    
    ```

12. createProductSlides, createProductSwiper를 새로 생성한다

    - 내부에서 createProductCard를 사용하도록 import해야한다.

    ```js
    import {createFamilyCard, createProductCard} from "./mainProductCardTemplate.js";
    ```

    ```js
    const createProductSlides = (sectionSwiperWrapper, data) => {
    
        data.forEach((item) => {
            const familySlide = createProductCard(item);
            sectionSwiperWrapper.insertAdjacentHTML('beforeend', familySlide);
        });
    }
    const createProductSwiper = (sectionName, type = 'default', data) => {
        // 1. slide들을 매달 wrapper 1개 찾기
        const sectionSwiperWrapper = document.querySelector(`.${sectionName} .swiper .swiper-wrapper`);
    
        // 2. wrapper가 찾아졌으면, data기반으로 slide만들어서 wrapper에 붙혀주기
        if (sectionSwiperWrapper) {
            createProductSlides(sectionSwiperWrapper, data);
        }
        // 3. swiper객체 생성 및 resize 이벤트
        initProductSwiper(type, sectionName);
    }
    ```

    

13. **이제 정적으로 만든 slide들을 주석처리한다.**

    ![image-20240708214925901](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240708214925901.png)

14. **기존 data없이 initSwiper만 했던 것을 data를 넣은 createSwiper로 변경한다**

    ```js
    // initProductSwiper('more', 'herb-medicine');
    createProductSwiper('herb-medicine', 'more', productData);
    ```

    ![image-20240708215123145](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240708215123145.png)





15. 품절상태의 데이터를 추가해본다.

    ```js
    isSoldOut: true,
        thumbnail: 'images/png/product/thumbnail/product_3.png',
            label: {type: 'hot', text: '핫잇슈'},
    ```

    ![image-20240708215609866](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240708215609866.png)







### 05 createSwiperMultipleWrapper도 Family / Product구분하기

16. 복사해서 createFamilySlides / createProductSlides를 사용하는을 구분하는 메서드로 나눈다.

    ```js
    
    ```

    

### 06 모두 단위별로 render를 씌워서, family Product card 통합하기

1. famly, product에 쓰이는 모든 필드를 data에서 펼치고, 각 단위를 renderHTML메서드로 처리되도록 한다.

   - **통일된 1개의 card인 createProductCard로 통일하여 짓는다.**

   ```js
   const createProductCard = (data) => {
       const {
           thumbnail, label,
           familyName, account, phone,
           category, isSoldOut, name, description, price, review,
           tags,
       } = data;
       return `<div class="swiper-slide">
       <a class="product d-block">
           <figure>
               ${renderThumbnail(thumbnail, label, isSoldOut, category)}
               <figcaption>
                   <!-- product -->
                   ${renderCategoryName(category)}
                   ${renderName(name)}
                   ${renderDescription(description)}
                   ${renderPrice(price)}
                   ${renderReview(review)}
   
                   <!-- family -->
                   ${renderFamilyName(familyName)}
                   ${renderPhone(phone, familyName)}
                   ${renderAccount(account, familyName)}
   
                   <!-- common -->
                   ${renderTags(tags)}
               </figcaption>
           </figure>
       </a>
   </div>
   `
   };
   ```

   ```js
   export {
       createProductCard,
   };
   ```

2. 기존에 family가 사라지고 

   - 모두 create`Product`로 시작하고 바깥 메서드는 `Section`을 붙혔다.

   ```js
   createProductSwiperSection('herb-medicine', 'more', productData);
   createProductSwiperSection('family', 'default', groomData);
   createProductSwiperMultipleWrapperSection('families', 'default', [brideData, groomData]);
   ```

   ```js
   const createProductSlides = (sectionSwiperWrapper, data) => {
   
       data.forEach((item) => {
           const familySlide = createProductCard(item);
           sectionSwiperWrapper.insertAdjacentHTML('beforeend', familySlide);
       });
   }
   const createProductSwiperSection = (sectionName, type = 'default', data) => {
       // 1. slide들을 매달 wrapper 1개 찾기
       const sectionSwiperWrapper = document.querySelector(`.${sectionName} .swiper .swiper-wrapper`);
   
       // 2. wrapper가 찾아졌으면, data기반으로 slide만들어서 wrapper에 붙혀주기
       if (sectionSwiperWrapper) {
           createProductSlides(sectionSwiperWrapper, data);
       }
       // 3. swiper객체 생성 및 resize 이벤트
       initProductSwiper(type, sectionName);
   }
   
   const createProductSwiperMultipleWrapperSection = (sectionName, type = 'default', data) => {
       // 1. slide들을 매달 wrapper 2개 이상 찾기
       const sectionSwiperWrappers = document.querySelectorAll(`.${sectionName} .swiper .swiper-wrapper`);
   
       // 2. 순회하며  wrapper에 슬라이드 생성
       sectionSwiperWrappers.forEach((swiperWrapper, index) => {
           createProductSlides(swiperWrapper, data[index]);
       });
       //3. swiper 객체 초기화
       initProductSwiperMultipleWrapper(type, sectionName, data);
   }
   ```









## utils.js에 addComma구현하여 template에 들어가는 숫자단위 나누기

1. **utils.js를 생성한 뒤, `number.toLocaleString()`을 적용하면 자동으로 천단위 적용이 된다.**

   ```js
   const addComma = (number) => {
     if (number !== null) {
       return number.toLocaleString();
     }
   };
   
   export { addComma };
   ```

2. template에서 import하여 각 변수에 적용한다

   ```js
   import { addComma } from "./utils.js";
   
   function renderPrice(price) {
       if (!price) return '';
   
       return `<div class="product-price d-flex align-items-center mt12">
           <div class="product-discount">
               <span class="sr-only">할인율</span>
               ${price.discount}%
           </div>
           <div class="product-value">
               <span class="sr-only">판매가</span>
               ${addComma(price.value)}원
           </div>
       </div>`;
   }
   
   function renderReview(review) {
       if (!review) return '';
   
       return `<div class="product-review bg-img bg-img-x-left d-flex align-items-center mt16">
           <div class="product-rating">
               <span class="sr-only">별점</span>
               ${review.rating}
           </div>
           <div class="product-review-count">
               <span class="sr-only">리뷰 갯수</span>
               (${addComma(review.count)})
           </div>
       </div>`;
   }
   
   ```

   