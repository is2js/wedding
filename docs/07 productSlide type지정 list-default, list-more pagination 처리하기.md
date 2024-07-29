

- 최신버전
  - github:https://github.dev/mizzu-creations/tire-pick-responsive/blob/bf688e41f46dd982dd105813d582aad91d9e58d5/index.html
  - demo: https://tire-pick.vercel.app/





1. product-list list-more는 웹 grid 4개만 -> 모바일 **전체 + 더보기 버튼 제공**이지만
2. **list-default는 웹 grid 8개 허가 -> 모바일 `전체` + `pagination`으로 처리될 것이다.**





## 1 일단 더보기 more type만의 특징을 따로 빼놓기

1. more 타입은 `pagination`없고 더보기 `a버튼`이 추가된다.

   ![image-20240704204916067](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240704204916067.png)





2. productSlide.css에서는 모든 .swiper-slide가 아니라 **.list-more 타입일 때만, 웹에서 4개만 표기되게 하고 나머지는 다 보이게 한다.**

   ```css
   /* swiper가 아닌 웹grid에서는 4개 제한 */
   /*.swiper-slide {*/
   /* more type 아니라면 -> grid 4열 + n행으로 다보이게 */
   /* more type -> 웹에선 4개만 보이게 */
   &.list-more .swiper-slide {
       @media (min-width: 768px) {
           &:nth-child(4) ~ div {
               display: none;
           }
       }
   }
   ```

   - `.product-list`에 `.list-default`는 웹에서 4개 이후 제한이 없다.

     ![image-20240704205354848](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240704205354848.png)



3. 더보기 a태그를 default에선 아예 html 삭제

   ![image-20240704205528480](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240704205528480.png)





## 2 pagination 옵션이 .list-more가 아니면서 & mobile에서만 나타나기

1. more type이 아니라면 웹에서 grid 4개 제한이 없기 때문에, **모바일에서 더보기 버튼이 필요없다.**
   - **대신 모바일에서만 페이지 네이션이 나와야한다.**





2. **html으로 `.swiper-pagination` 선언**하되, **`d-md-none`으로 모바일에서만 보이게 한다.** 

   - .swiper-wrapper 형제 레벨로 선언한다.

   ```html
   <!-- more type이 아닐 때만, 모바일에서 추가-->
   <div class="swiper-pagination d-md-none"></div>
   ```

   



### js로, 특정 type(more)이 아닐 때만 pagination Element를 찾고 -> pagination 옵션 추가하여 new Swiper()객체 생성 by 삼항연산자 

3. initProductSwiper에서, **type이 more가 아니거나 || element가  있는 경우만**

   1. element찾고
   2. **삼항연산자**로 pagination 옵션 설정

   ```js
   // 4.pagination의 el 설정을 type에 따라 동적으로 지정
   // - 'more' 타입이 아니라면 element 찾음.
   const paginationTargetClass = type !== 'more' ? `.list-${type} .swiper-pagination` : null;
   
   // productSwiper = new Swiper(swiperElement, {
   productSwipers[type] = new Swiper(swiperTargetClass, {
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
   ```

4. **default 타입에서만 생기지만, abs로 떠있는 것 같다?**

   ![image-20240704211157480](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240704211157480.png)







## 3 모바일 pagination abs를 그냥 static으로 변경해버리기?!

1. 겹치는것을 방지하기 위해 아싸리 html에서 static으로 바꿔버렸다.

   ```html
   <!-- more type이 아닐 때만, 모바일용으로 추가-->
   <div class="swiper-pagination d-block d-md-none position-static"></div>
   ```

   ![image-20240704213447132](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240704213447132.png)

2. **상하마진을 주고 꾸며줄 준비를 한다.**

   ```css
   .mt5 {
       margin-top: 5px;
   }
   ```

   ```html
   <div class="swiper-pagination d-block d-md-none position-static mt5"></div>
   ```

   ![image-20240704214350401](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240704214350401.png)







## 4 pagination bullet 꾸미기

1. `productSlide.css`에서 **더보기 타입이 아닐 경우(default) html로 자동으로 모바일용이 되었으므로**

   1. `.swiper-pagination-bullet`-> `.swiper-pagination-bullet-active` 순으로 꾸며주면 된다.
   2. **active로 `자동으로 바뀔니` 우리는 transition: all 만 걸어주면 애니메이션이 된다.**
      1. **`w/h`를 정해주고 `margin`도 덮어쓰기 하며 `배경색`도 바꾼다**
      2. **h변동없이 `width`만 바꿔주면 점이 타원이 된다.**

   ```css
   /* pagination이 붙을 경우(more아니고 모바일) */
   
   &:not(.list-more) .swiper-pagination {
       @media (max-width: 767px) {
           .swiper-pagination-bullet {
               width: 6px;
               height: 6px;
               margin: 0 2.4px;
               background-color: var(--grey96);
               transition: all 0.3s ease 0s;
           }
   
           .swiper-pagination-bullet-active {
               width: 15px;
               border-radius: 100px;
               background-color: #282a2e;
           }
       }
   }
   ```

   ![image-20240705081614417](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240705081614417.png)