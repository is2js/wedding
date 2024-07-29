

- 최신버전
  - github:https://github.dev/mizzu-creations/tire-pick-responsive/blob/bf688e41f46dd982dd105813d582aad91d9e58d5/index.html
  - demo: https://tire-pick.vercel.app/







## 1 복제해서  type별 swiper 만들기                                                    





1. 기존 a.product가 있는 **section을 복사**하여 aside.advertisement 아래 복붙한다.

   - **이 때, js에서는 `.swiper.product-list`로 swiper객체를 만드는데 2개가 잡히므로 `복제한 곳에서 default로 만들기 위해, 기존 .swiper에는 .list-more` 로 더보기 타입의 product list로 변경한다**

   ```html
   <div class="swiper product-list mt35 list-more">
   <div class="swiper product-list mt35">
   ```

   - **`mainProductList.js`의 기존swiper객체 생성 elment에도 추가한다.**
     - 현재 data는 추후 받으려고 놔뒀는데, `type`변수를 받아 `list-${type}`으로 클래스를 추가하게 한다.

   ```html
   const initProductSwiper = (type, data) => {
   
       const baseClass = '.swiper.product-list';
       const swiperElement = `${baseClass}.list-${type}`;
   
       productSwiper = new Swiper(swiperElement, {
   ```





### type별로, .list-${type} 클래스가 붙은 swiper객체도 필요하다. -> json(dict)로 객체 관리 되도록 한다.

1. `mainProduct.js`에서 **type별 객체 관리를 위한 객체관리를 위한 빈json을 선언하고, 모든 객체선언을 인자로 받은 productSwipers[type]으로 변경한다**

   ```js
   // let productSwiper;
   // type별로 Swiper 인스턴스를 저장할 객체
   const productSwipers = {};
   
   const initProductSwiper = (type, data) => {
       // 1. 기존에 있었으면 삭제
       // if (productSwiper) {
       //     productSwiper.destroy(true, true);
       // }
       if (productSwipers[type]) {
           productSwipers[type].destroy(true, true);
       }
   
       // 2. init: false 옵션으로 swiper객체만 생성 -> 모바일에서만 init()
       const baseClass = '.swiper.product-list';
       const swiperElement = `${baseClass}.list-${type}`;
       productSwipers[type] = new Swiper(swiperElement, {
   
       });
       const screenWidth = window.innerWidth;
       const mobileMaxWidth = 768;
       const isMobile = screenWidth <= mobileMaxWidth;
   
       if (isMobile) {
           // productSwiper.init();
           productSwipers[type].init();
           console.log("mobile / type", type)
       } else {
           console.log("web / type", type)
       }
   };
   // initProductSwiper();
   initProductSwiper('more');
   window.addEventListener("resize", () => {
   
       // initProductSwiper();
       initProductSwiper('more');
   });
   
   ```

   

   ![image-20240703212905392](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240703212905392.png)



2. 현재 .list-more을 추지 않은 기본 swiper는 객체 선언을 안해서 작동안하는 상태다.

   ![image-20240703213100576](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240703213100576.png)





### type을 주지 않은 .swiper.product-list를 사용하려 했지만, `swipers[type]`에 저장이 안되고, 파라미터 default값으로 줘도, `querySelector에서 .list-more 등의 옵션과도 중복`으로 잡히게 된다. -> list-default도 부여해야한다.



1. baseClass를 `.swiper.product-list.list-`까지는 base로 잡고

   - swiperelement를 type별로 만들고 관리하게 한다.

   ```js
   const baseClass = '.swiper.product-list';
   const productSwipers = {};
   
   const initProductSwiper = (type = 'default', data) => {
       if (productSwipers[type]) {
           productSwipers[type].destroy(true, true);
       }
   
       // 2. init: false 옵션으로 swiper객체만 생성 -> 모바일에서만 init()
       const swiperTargetClass  = `${baseClass}.list-${type}`;
        productSwipers[type] = new Swiper(swiperTargetClass, {
   
   ```

   ```js
   initProductSwiper();
   initProductSwiper('more');
   
   window.addEventListener("resize", () => {
       initProductSwiper();
       initProductSwiper('more');
   });
   ```

   ```html
   <div class="swiper product-list list-default mt35">
       
   <div class="swiper product-list list-more mt35">
   ```

   ![image-20240703215345835](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240703215345835.png)







## 2 default productSwiper에 label 디자인 입히기



### label은 div안에 img태그 밑에 span태그로 생성한다.

1. **`div.product-thumbnail`** 내부에 img img 태그의 젤 밑에 **span태그를 `pos:abs + 왼쪽의 top-0 start-0`으로 선언해서 띄운다.** 

   ```html
   <div class="product-thumbnail position-relative">
       <img src="images/png/product/thumbnail/product_2.png" class="product-thumbnail-image">
    <img src="images/png/product/category/hankook_logo.png"
            class="product-thumbnail-category position-absolute"
            alt="카테고리"
            >
       <span class="product-thumbnail-label position-absolute top-0 start-0 ">NEW</span>
   </div>
   ```
   
2. css로 조절하는데 **`border-radius를 동일한 크기지만 좌상단/우하단`만  가져가고, padding / lh / fz는 반응형으로 줘야한다.**

   - 일단 기본형으로서 검은색배경 + 흰 글씨로 만들어준다.

   ```css
   & .product-thumbnail {
   
       border-radius: 8px;
   
       & .product-thumbnail-label {
           background-color: #282a2e;
           color: #fff;
   
           border-radius: 8px 0;
           padding: 5px 10px;
   
           line-height: 20px;
           font-size: 15px;
           font-weight: 500;
   
           @media (max-width: 767px) {
               padding: 3px 6px;
               line-height: 15px;
               font-size: 11px;
           }
       }
   ```

   ![image-20240703223519263](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240703223519263.png)





3. **배경색을 바꾸되, 글자색이 바껴야하는 곳에 준다.**

   ```css
   & .product-thumbnail-label {
       background-color: #282a2e;
       color: #fff;
   
   
       border-radius: 8px 0;
       padding: 5px 10px;
   
       line-height: 20px;
       font-size: 15px;
       font-weight: 500;
   
       @media (max-width: 767px) {
           padding: 3px 6px;
           line-height: 15px;
           font-size: 11px;
       }
   
       &.label-new {
           background-color: var(--yellowff);
           color: var(--grey28);
       }
   
       &.label-hot {
           background-color: var(--purple7b);
       }
   
       &.label-grey {
   		background-color: var(--greybe);
       }
   
       &.label-bride {
           background-color: var(--pinkfc);
       }
   
       &.label-groom {
           background-color: var(--green00);
       }
   ```

   ```html
   <!-- new label -->
   <span class="product-thumbnail-label label-new position-absolute top-0 start-0 ">NEW</span>
   ```

   ![image-20240703225341101](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240703225341101.png)





### 나중에 동적 labelType를 위해 종류별로 label-xxx를 하나씩 slide에 붙혀놓기

1. 색을 위한 `.label-xxx`뿐만 아니라, **내부 텍스트가 new, hot 고정 텍스트가 달라진다.** 

   ```html
   <!-- hot label -->
   <span class="product-thumbnail-label label-hot position-absolute top-0 start-0 ">HOT</span>
   ```

   ![image-20240703225746894](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240703225746894.png)





## 3 품절 





### 품절 overlay 처리는 img부모Div .특정클래스에 ::after의 마지막 자식으로 맨위에 추가하며, content에 텍스트를 넣고 flex로 만들어서 수평수직가운데 정렬까지한다.

1. html에서 특정 swiper-slide의 img부모Div에 `.sold-out`을 추가해놓고

   ```html
   <!-- 품절 .sold-out in imgDiv -->
   <div class="swiper-slide">
       <a href="" class="product d-block">
           <figure>
               <!-- .sold-out -->
               <div class="product-thumbnail position-relative sold-out">
   ```

2. css에서 flex없이 일단 ::after로 처리해본다.

   - **배경을 30% 검은색으로 + inset: 0으로 전방향 0으로 만들어놓는다.**

   ```css
   &.sold-out {
       &::after {
           content: "품절";
           position: absolute;
           inset: 0;
           background-color: rgba(0, 0, 0, 0.3);
           color: var(--white);
           font-size: 20px;
           font-weight: 400;
           /*z-index: 1;*/
           border-radius: inherit;
       }
   }
   ```

   ![image-20240704021448800](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240704021448800.png)



### after/before는 기본 block이라 내부 content text를 전방향-0으로 내부text를 가운데 정렬 못시킨다. -> flex를 통해 before/after의 텍스트를 가운데 정렬한다.

```css
& .product-thumbnail {

    /* 품절 클래스 붙을 시 */
    &.sold-out {
        &::after {
            content: "품절";
            position: absolute;
            inset: 0;
            background-color: rgba(0, 0, 0, 0.3);
            color: var(--white);
            font-size: 20px;
            font-weight: 400;
            /*z-index: 1;*/
            border-radius: inherit;

            /* text 가운데 정렬 */
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }
```



![image-20240704021635696](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240704021635696.png)







## 4 event 멘트 + 가족이름 처리

1. reivew를 참고해서 버튼 아이콘으로 만들 준비를 한다.

   ```html
   <div class="product-event bg-img bg-img-x-left d-flex align-items-center mt16">
       클릭시 계좌번호 복사!
   </div>
   ```

2. css로 옵션을 준다.

   ```css
   & .product-account {
       background-image: url("../../images/svg/icons/event-money.svg");
       /* 16x16 + 4px 띄우기 */
       padding-left: 20px;
   
       line-height: 12px;
       font-size: 11px;
       color: var(--purple6f);
       font-weight: 700;
   }
   ```

   ![image-20240704023636950](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240704023636950.png)

3. review와 다르게 **html에서 한줄제한 mixin + css로 웹에서는 글자크게**시킨다.

   ```html
   <div class="product-event bg-img bg-img-x-left d-flex align-items-center mt16 ellipsis">
       클릭시 계좌번호 복사!
   </div>
   ```

   ```css
   & .product-account {
       background-image: url("../../images/svg/icons/event-money.svg");
       /* 16x16 + 4px 띄우기 */
       padding-left: 20px;
   
       line-height: 17px;
       font-size: 15px;
       color: var(--purple7b);
       font-weight: 500;
   
       @media (max-width: 767px) {
           line-height: 15px;
           font-size: 12px;
       }
   }
   ```

   ![image-20240704024122707](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240704024122707.png)



4. price부분을 복사하고 수정해서, 신부아버지 / 김xx로 나타내보자

   - `.product-family`에 `.bride`냐 / `.groom`이냐에 따라서 글자색이 달라지게 한다.

   ```html
   <div class="product-family-name d-flex align-items-center mt16">
       <div class="product-family">
           <span class="sr-only">가족관계</span>
           신부父
       </div>
       <div class="product-name">
           <span class="sr-only">이름</span>
           김용범
       </div>
   </div>
   ```

   ```css
   & .product-family-name {
       font-size: 18px;
       font-weight: 700;
       gap: 12px;
   
       @media (max-width: 767px) {
           font-size: 16px;
           gap: 8px;
       }
   
       & .product-family {
           color: var(--skyblue);
           font-weight: 600;
           &.bride {
               color: var(--pinkff);
           }
           &.groom {
               color: var(--green00);
           }
       }
   
       & .product-name {
           color: var(--grey5a);
       }
   }
   ```

   ![image-20240704165207349](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240704165207349.png)







## 5 웹에서만 img태그 hover시 scale 1.1 + .부모 imgDiv는 overflow:hidden

```css
& .product-thumbnail {

    /* 자식 img태그 scale 1.1시 넘치는 것 잡기 */
    overflow: hidden;
    
    & .product-thumbnail-image {
        width: 100%;
        height: 100%;

        /*object-fit: cover;*/ /* 짤려도 되는 배경 용 */
        object-fit: contain;

        /* 웹에서만 scale 크게 */

        &:hover {
            transform: scale(1.1);
            transition: transform 0.3s ease-in-out;
        }

        @media (max-width: 767px) {
            transform: none;
        }
    }
```

![image-20240706154124015](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240706154124015.png)