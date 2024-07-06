- 유튜브: https://www.youtube.com/watch?v=Gz5koaZ7vwg&list=PL_6yF2upGJYt2RbFceTm2xrPnh0DEgp-d&index=29
- 최신버전
  - github:https://github.dev/mizzu-creations/tire-pick-responsive/blob/bf688e41f46dd982dd105813d582aad91d9e58d5/index.html
  - demo: https://tire-pick.vercel.app/

# Main BestSeller

- **웹에선 `더보기` 처리되었다가 모바일에선 `slide`로 넘어가고 + `더보기가 하단`으로 빠져나간다**

  ![image-20240628205822453](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240628205822453.png)





## 1 웹용 html



1. section을 만들고 **타이틀이 먼저 나오는데 평소와 다르니 `h2.section-title`로 클래스를 붙혀서 생성**

   ```html
   <section>
       <h2 class="section-title">우아한의원 한약</h2>
   </section>
   ```

2. 가로질러 더보기 버튼을 페이지이동용a태그로 바로 달아준다.

   ```html
   <section>
       <h2 class="section-title">우아한의원 한약</h2>
       <a href="" class="button-more">더보기</a>
   </section>
   ```





### 모바일swiper라도 웹에서 swiper맥락으로 정의해준다.

3. 웹에선 slide가 아니지만, 1개의 slide구조로 일단 정의한다.

   ```html
   <section>
       <h2 class="section-title">우아한의원 한약</h2>
       <a href="" class="button-more">더보기</a>
       <div class="swiper">
           <div class="swiper-wrapper">
               <div class="swiper-slide">
   
               </div>
           </div>
       </div>
   </section>
   ```



### 상품카드의 사진 + 설명은 a> figure > (비율용div덮은 img) + figcaption으로 구성하자.

3. 1개의 상품카드를 **figure > img + figcaption로 만들어보자.**

   - figure : 멀티미디어(영상 포함)
   - figcaption: 설명
     - **이미지라도 alt를 안넣어도 figcaption이라는 대체 컨텐츠가 있어서 괜찮다.**

   ![image-20240628210816887](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240628210816887.png)

   - **일단 상품카드 전체를 클릭되어야하므로 a태그로 씌우고**
     - a태그는html5부턴 inline이지만 내부 block을 가질 수 있게 됨.
     - figure > img + figcaption 형태로 만든다

   ```html
   <div class="swiper-slide">
       <a href="">
           <figure>
               <img src="">
               <figcaption></figcaption>
           </figure>
       </a>
   </div>
   ```

   

   

   

   

### ✨ 이미지 ratio를 1:1로 유지시키려면, img를  div로 한번 덮어써야한다.



4. **div로  img태그를 한번 덮어서 `이미지가 초과되거나 부족시 대비한 object-fit으로 제어`하게 된다.**

   ```html
   <figure>
       <div><img src=""></div>
       <figcaption></figcaption>
   </figure>
   ```

5. **카테고리 그림을 위한 img태그를 추가하여 abs로 처리하고 div가 relative가 되어줘야한다.**

   - 컨트롤을 위해 각 img태그에 class를 부여한다.

   ```html
   <figure>
       <div>
           <img src="" class="thumbnail">
   		<img src="" class="category" alt="카테고리">
       </div>
       <figcaption></figcaption>
   </figure>
   ```

   



6. 이제 **figcaption부분**을 컨트롤 한다.

   - 일단 그림을 보고, 텍스트만 한번 쭉 써본다.

     ![image-20240628220348202](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240628220348202.png)

     ```html
     <figcaption>
         다이어트
         비움탕
         체질을 고려한 마황제
         20% 198,000원
         여성 다이어트 베스트셀러
         4.6(1,450)
     </figcaption>
     ```

   - 장애인, 일반인들은 모를 수 있기 때문에 숨은글씨span태그를 하나씩

     ```html
     <figcaption>
         <span class="sr-only">카테고리</span>다이어트
         <span class="sr-only">제품명</span>비움탕
         <span class="sr-only">설명</span>체질을 고려한 마황제
         <span class="sr-only">할인율</span>20% 
         <span class="sr-only">판매가</span>198,000원
         <span class="sr-only">해시태그</span>여성 다이어트 베스트셀러
         <span class="sr-only">별점</span>4.6(1,450)
     </figcaption>
     ```

   - **각각을 div로 씌워서 묶는다.**

     ```html
     <figcaption>
         <div>
             <span class="sr-only">카테고리</span>
             다이어트
         </div>
         <div>
             <span class="sr-only">제품명</span>
             비움탕
         </div>
         <div>
             <span class="sr-only">설명</span>
             체질을 고려한 마황제
         </div>
         <div>
             <span class="sr-only">할인율</span>
             20%
             <span class="sr-only">판매가</span>
             198,000원
         </div>
         <div>
             <span class="sr-only">해시태그</span>
             여성 다이어트 베스트셀러
         </div>
         <div>
             <span class="sr-only">별점</span>
             4.6(1,450)
         </div>
     </figcaption>
     ```

   - 해쉬태그도 space를 span으로 각각 씌워준다.

     ```html
     <div>
         <span class="sr-only">해시태그</span>
         <span>여성</span> <span>다이어트</span> <span>베스트셀러</span>
     </div>
     ```

     ![image-20240628230816354](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240628230816354.png)

   



## 2 웹용 css

- **swiper가 아닐 수도 있기 때문에, css꾸밀 때 .swiper를 배제하고 만든다.**
  - **.h2(.section-title)나 .button-more는 컴포넌트 단위와 상관없으므로 미리 줬었다.**





### swiper가 여러 section에 나온다면 공통컴포넌트 단위로서 a태그에 css .product부터 준다.

1. 종류상관없이 가질 프로덕트의 a태그를 대표 `.product`를 씌워준다

   ![image-20240628234147507](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240628234147507.png)

   ```html
   <section>
       <h2 class="section-title">우아한의원 한약</h2>
       <a href="" class="button-more">더보기</a>
       <div class="swiper">
           <div class="swiper-wrapper">
               <div class="swiper-slide">
                   <a href="" class="product">
                       <figure>
                           <div>
   ```



2. figure안에 img태그들을 담는 div에는 `product-thumbnail`을

   - 기존의 thumbnail을 `-image` / category를 `-category`로 바꾸낟.

   ```html
   <a href="" class="product">
       <figure>
           <div class="product-thumbnail">
               <img src="" class="product-thumbnail-image">
               <img src="" class="product-thumbnail-category" alt="카테고리">
           </div>
   ```

   

3. figcaption의 각 **글자를 담는 div마다 `.product-xxx`를 준다.**

   - **클래스명을 따로따로 제어할 수도 있게 주는 것이다.**

   ```html
   <figcaption>
       <div class="product-category">
           <span class="sr-only">카테고리</span>
           다이어트
       </div>
       <div class="product-title">
           <span class="sr-only">제품명</span>
           비움탕
       </div>
       <div class="product-description">
           <span class="sr-only">설명</span>
           체질을 고려한 마황제
       </div>
       <div class="product-price">
           <span class="sr-only">할인율</span>
           20%
           <span class="sr-only">판매가</span>
           198,000원
       </div>
       <div class="product-hashtag">
           <span class="sr-only">해시태그</span>
           <span>여성</span> <span>다이어트</span> <span>베스트셀러</span>
       </div>
       <div class="product-rating">
           <span class="sr-only">별점</span>
           4.6(1,450)
       </div>
   </figcaption>
   ```

   





### .section-title 글자꾸미기 typograpy.css에서

4. typo.css에서 일단은 글자꾸미기만 한다

   ```css
   .section-title {
       font-size: 24px;
       font-weight: 700;
       color: var(--grey28);
   }
   ```

   ![image-20240629005506105](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240629005506105.png)





### ✨ 글자+그림의 `더보기`버튼은, `css 직접 w/h(이미지크기 or 비율맞게 작게?)/imageUrl + .bg-img`로 넣은 뒤, 글자우측에 padding-right를 만들고 그만큼 right로 이동시키는 작전이다. `padding-right는 inline이 더이상 안늘어나게 막고 + 정해진 우측에 배경이미지를 박는 기능`이 있다.



![image-20240629010430546](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240629010430546.png)

5. 더보기 버튼은 글자외 아이콘이 있다.

   - **일단 아이콘의 크기를 제고 w9h12px `button에 w/h`를 배정하고 파일을 url로 넣는다.**

     ![image-20240629011514637](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240629011514637.png)

   - **나는 heroicons에서 가장 작은 단위인 `micro = 16x16` svg를 다운받고, `w14h14로 크기를 비율을 맞춰서 축소`시켰다.**

     - `button.css`에 정의한다.

     ```css
     .button-more {
         width: 14px;
         height: 14px;
     
         background-image: url("../../images/svg/icons/button-more.svg");
     }
     ```

     ```html
     <a href="" class="button-more bg-img">더보기</a>
     ```

     

     ![image-20240629013006540](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240629013006540.png)

6. **이제 .button-more에 `글자꾸미기 css도 추가`해준다.**

   - **w/h를 button태그처럼 넣어주지만 `a태그는 inline이라 w/h가 사실은 안먹는다.` -> `글자크기에 의지되서 너비/높이가 결정`된다**

   ```css
   .button-more {
       /* a는 인라인 요소며, 글자크기에 의해 결정되는 상황이므로 w/h가 불필요 */
       /*width: 14px;*/
       /*height: 14px;*/
   
       background-image: url("../../images/svg/icons/button-more.svg");
   
       font-size: 14px;
       color: var(--grey28);
   }
   ```

   ![image-20240629013058705](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240629013058705.png)

7. **a요소의 경우  `inline이라서, width를 지정하면 -> 텍스트가 길어지면 줄내림`이 되어버린다.**

   - **텍스트의 경우, a부모의 크기가 주어지면, white-space를 넣지 않는 이상 `줄내림`이 되어버린다.**
   - **inline은 줄내림요소라 height도 안먹는다.**



### ✨ 글자 + 배경이미지버튼을 위해, .bg-img-x-right 추가용  mixin 구현

7. 오른쪽 여백을 만들어서 이미지를 붙힐 것이다. 이미지 크기는 `14px svg`로 확인했으니, **일단 오른쪽으로 붙혀주는 `.bg-img`에 `.bg-img-x-center`를 추가할 수 있게 구현한다**

   ```css
   /* 더보기 > 버튼을 위해, 배경이미지를 x right에 붙히도록 넣어주는 mixin */
   .bg-img-x-right {
       background-position: right center;
   }
   ```

   ```html
   <a href="" class="button-more bg-img bg-img-x-right">더보기</a>
   ```

   ![image-20240629013729936](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240629013729936.png)

   - **우측에 붙는 것을 확인했으니 `svg 14px + 띄울만큼`을 padding으로 준다.**

   ```css
   .button-more {
   
       background-image: url("../../images/svg/icons/button-more.svg");
       padding-right: 17px;
   
       font-size: 14px;
       color: var(--grey28);
   }
   ```

   ![image-20240629013838969](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240629013838969.png)



7. 글자크기가 정해져있다면 **svg 비율을 14 -> 16px로 높혀보자.**

   ![image-20240629013927518](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240629013927518.png)

   ![image-20240629013918904](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240629013918904.png)





### 반복되는 product용 카드는 컴포넌트 productCard.css로 빼서 처리하고 모든 카드 공통인 a태그에 .product 클래스를 준다.



1. componet/product.css를 생성하고 style에서 import

   ```css
   @import url("component/productCard.css"); /* 상품 thumbnail 카드 */
   ```

2. 공통 a태그 주기

   ```html
   <div class="swiper-slide">
       <a href="" class="product">
           <figure>
   ```

   

3. **a태그는 원래 inline이지만, `block`을 주고 시작한다.**

   - why??

   ```html
   <a href="" class="product d-block">
   ```

   

4. 일단 예시 상품카드를 만들 예시 이미지png(category, product-thumbnail)을 준비한다.





### ✨예시png검색은 `영어명 png`로 검색하고 왼쪽에선 모눈종이x -> 우측 thumbnail에는 모눈종이 모양이 나와야, 진짜 png다.

![image-20240629161255787](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240629161255787.png)

```html
<div class="product-thumbnail">
    <img src="images/png/product/thumbnail/product_2.png" class="product-thumbnail-image">
    <img src="images/png/product/category/hankook_logo.png" class="product-thumbnail-category" alt="카테고리">
</div>
```



5. 일단 예시이미지를 연결하면 아래와 같다.

   ![image-20240629162312257](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240629162312257.png)



### 카드이미지는, 모바일은 반응형100%라 상관없지만, 웹에서는 width/height를 미리 정의해놔야한다.

6. a.product 내부 **이미지태그를 밖에서 씌운 div.product-thumbnail에 크기를 준다.**

   ```css
   .product {
       & .product-thumbnail {
           width: 278px;
           height: 278px;
       }
   }
   ```

   - **div의 크기가 정해져도 img태그는 삐져나온다.**

     ![image-20240629163142779](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240629163142779.png)





### 상품이미지 + 카테고리이미지 중에, 카테고리부터 먼저 abs로 띄워놔보자.

```html
<div class="product-thumbnail position-relative">
    <img src="images/png/product/thumbnail/product_2.png" class="product-thumbnail-image">
    <img src="images/png/product/category/hankook_logo.png"
         class="product-thumbnail-category position-absolute top-0 end-0"
         alt="카테고리"
         >
</div>
```

![image-20240629163456245](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240629163456245.png)



- 카테고리 이미지 크기도 미리 지정해놔야한다.

### top/end-abs 카테고리 이미지에서 가로크기가 서로 다른 이미지는 높이만 주고 -> 가로는 비례하게 오른쪽에서 왼쪽방향으로

```css
.product {
    & .product-thumbnail {
        width: 278px;
        height: 278px;

        & .product-thumbnail-category {
            height: 22px;
        }
    }
}
```



![image-20240629163625443](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240629163625443.png)





### ✨ 사용자upload 상품이미지 삐져나와있을 텐데 -> 일단 w100h100% + 짤려도 상관없음cover지만 상품 다표기를 위한 contain을 해준다. 

1. 일단 w100 h100으로 채워놓으면 깨짐이 발생할 것이다.

   ```css
   .product {
       & .product-thumbnail {
           width: 278px;
           height: 278px;
   
           & .product-thumbnail-category {
               height: 22px;
           }
           & .product-thumbnail-image {
               width: 100%;
               height: 100%;
           }
       }
   }
   ```

   

   ![image-20240629164008026](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240629164008026.png)





2. object fit cover

   ```css
   & .product-thumbnail-image {
       width: 100%;
       height: 100%;
   
       object-fit: cover;
   }
   ```

   ![image-20240629164112221](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240629164112221.png)

   - **비례해서 늘어나면서, 초과되는 것은 짤르는 단점이 생긴다.**

     - 배경이면 상관없겠지만, **상품은 다 보여야하므로 cover로는 안된다.**

     ![image-20240629164222724](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240629164222724.png)



3. **결국 `img.w-100.h-100.object-fit-contain`이 상품png이미지를 다루는 방법이다.**

   ```css
   & .product-thumbnail-image {
       width: 100%;
       height: 100%;
   
       /*object-fit: cover;*/ /* 짤려도 되는 배경 용 */
       object-fit: contain;
   }
   ```

   ![image-20240629164433352](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240629164433352.png)



### png 이미지의 크기확인은 개발자도구서 부모배경 + img엔border 1px solid red를 임시로 줘서 확인한다.

- 만약, contain인데, 정사각형을 잘 채우고 있다면 -> 이미지도 정사각형이다.

  ![image-20240629164812861](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240629164812861.png)
  ![image-20240629164828284](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240629164828284.png)

  ![image-20240629164758970](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240629164758970.png)





- border-radius및 배경을 넣는다.

  ```css
  .product {
      & .product-thumbnail {
          width: 278px;
          height: 278px;
  
          border-radius: 8px;
          background-color: var(--greyf6);
  
  ```

  ![image-20240629171442256](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240629171442256.png)



- 배경을 넣다보면, top-0, right-0으로 붙힌 카테고리가 조금 떨어질 필요가 있다.

  - bootstrap으로 준 것을 빼고 css로 처리한다.

    ```html
    <img src="images/png/product/category/hankook_logo.png"
         class="product-thumbnail-category position-absolute"
         alt="카테고리"
         >
    ```

    - **height도 큰 것 같으니 좀 줄인다.**

    ```css
    & .product-thumbnail-category {
        height: 11px;
    
        top: 20px;
        right: 20px;
    }
    ```

    ![image-20240629171723842](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240629171723842.png)





### figcaption 속 글자 class로 꾸미기

- 개별 클래스로 줘놨으니 양식을 만들어서 복사해서 채운다.

  ```css
  .product {
      /* 카드 */
      /* 각 텍스트들*/
      & .product-category {
          font-size: px;
          color: var();
      }
  }
  ```

  ```css
  /* 각 텍스트들*/
  & .product-category {
      font-size: px;
      color: var();
  }
  & .product-title {
      font-size: px;
      color: var();
  }
  & .product-description {
      font-size: px;
      color: var();
  }
  & .product-price {
      font-size: px;
      color: var();
  }
  & .product-hashtag {
      font-size: px;
      color: var();
  }
  & .product-rating {
      font-size: px;
      color: var();
  }
  ```

  ```css
  /* 각 텍스트들*/
      & .product-category {
          font-size: 15px;
          font-weight: 400;
          color: var(--grey5a);
      }
      & .product-title {
          font-size: 17px;
          font-weight: 500;
          color: var(--grey28);
      }
      & .product-description {
          font-size: 15px;
          font-weight: 400;
          color: var(--grey5a);
      }
  ```



- **한 클래스에 내부 2개의 텍스트를 각각 꾸며야한다면, `기존 div 아래 > 각 클래스div배정`형태로 바꿔준다.**

  - 기존

    ```html
    <div class="product-price">
        <span class="sr-only">할인율</span>
        20%
        <span class="sr-only">판매가</span>
        198,000원
    </div>
    ```

    

  - 수정

    ```html
    <div class="product-price">
        <div class="product-discount">
            <span class="sr-only">할인율</span>
            20%
        </div>
        <div class="product-value">
            <span class="sr-only">판매가</span>
            198,000원
        </div>
    </div>
    ```

    ```css
    & .product-price {
        font-size: 17px;
        font-weight: 700;
    
        & .product-discount {
            color: var(--skyblue);
        }
    
        & .product-value {
            color: var(--grey5a);
        }
    }
    ```

  - 기존

    ```html
    <div class="product-rating">
        <span class="sr-only">별점</span>
        4.6(1,450)
    </div>
    ```

  - 수정

    ```html
    <div class="product-review">
        <div class="product-rating">
            <span class="sr-only">별점</span>
            4.6
        </div>
        <div class="product-review-count">
            <span class="sr-only">리뷰 갯수</span>
            (1,450)
        </div>
    </div>
    ```

    ```css
    & .product-review {
    
        color: var(--grey28);
        & .product-rating {
            font-size: 15px;
            font-weight: 700;
        }
    
        & .product-review-count {
            font-size: 13px;
            font-weight: 400;
            color: var(--grey5a);
        }
    }
    ```

  - hashtag

    ```css
    & .product-hashtag {
        > span {
            font-size: 13px;
            font-weight: 500;
            color: var(--grey28);
        }
    }
    ```

  ![image-20240629180556946](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240629180556946.png)





### ✨ 앞에 아이콘이 달린 리뷰 div (더보기 반대로)



1. `.bg-img`와 **글자와 같이 쓸시 없이없는 w/h는 주지 않고, 기본옵션으로 넣어본다.**

   ```html
   <div class="product-review bg-img">
   ```

   ```css
   & .product-review {
           background-image: url("../../images/svg/icons/review-star.svg");
   ```

   ![image-20240629182505012](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240629182505012.png)



2. 왼쪽으로 붙이기 위해 **믹스인에 `.bg-img-x-left`를 제작해서 적용해본다.**

   ```css
   /* 별점 배경이미지를 x left에 붙이기 */
   .bg-img-x-left {
       background-position: left center;
   }
   ```

   ```html
   <div class="product-review bg-img bg-img-x-left">
   ```

   ![image-20240629182725185](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240629182725185.png)



3. 마지막으로 padding-left를 **`이미지크기 + 벌릴 px`을 줘서** 벌린다.

   ```css
   & .product-review {
       background-image: url("../../images/svg/icons/review-star.svg");
       /* 16x16 + 4px 띄우기 */
       padding-left: 20px;
   ```

   ![image-20240629183220099](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240629183220099.png)





### ✨ 해쉬태그 디자인 하기

1. `inline`이 아니라면,  **글자를 가운데 위치시키면서 높이 잡기는 `lh`로 처리**한다.

   - 만약 태그의 높이가 24px이라면 lh24를 추가한다.

     ```css
     & .product-hashtag {
         > span {
             font-size: 13px;
             font-weight: 500;
             color: var(--grey28);
     
             /* 해쉬태그 모양잡기 */
             line-height: 24px;
             border-radius: 4px;
             background-color: var(--greyf6);
         }
     }
     ```

     ![image-20240629190533965](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240629190533965.png)

     - **하지만 `inline요소라서 lh로 글자가운데 높으면서 높이잡기`가 안먹힌다. `텍스트는 커지나 줄간격이 늘어나진 않는다`**

   

#### ✨✨ 여러 inline span에 높이를 반영하고 싶다면 -> 개별 d-block보다는 부모에 d-flex로 자식들 자동 block만들기



2. **높이를 가지고 싶은 span들의 부모인 div를 flex로 만든다.**

   ```html
   <!-- inline에 높이 반영을 위한 block 반영을 위한 부모 flex화 -->
   <div class="product-hashtag d-flex">
       <span class="sr-only">해시태그</span>
       <span>여성</span> <span>다이어트</span> <span>베스트셀러</span>
   </div>
   ```

   - **그랬더니, lh가 높이로서 반영이 되어버렸다.**

   ![image-20240629192010492](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240629192010492.png)

   - 이제 간격을 gap으로 만든다.

     ```css
     & .product-hashtag {
         gap: 4px;
         > span {
     ```

     ![image-20240630093218934](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240630093218934.png)



3. **이제 패딩을 3px 4px주되 `lh를 글자크기와 동일하게` 바꿔서 패딩으로만 높이 + 좌우여백을 만든다.**

   ```css
   > span {
   
       /* 해쉬태그 모양잡기 */
       line-height: 11px;
       padding: 3px 5px;
   }
   ```

   ![image-20240630093644316](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240630093644316.png)





#### flex-item 태그들을 부모d-flex에 flex-wrap으로 다음줄로 넘어갈 준비를 한다.

4. 태그span을 복사해서 여러개로 늘리면 **기본적으로는 끝도 없이 간다.**

   ```html
   <div class="product-hashtag d-flex">
       <span class="sr-only">해시태그</span>
       <span>여성</span> <span>다이어트</span> <span>베스트셀러</span>
       <span>남성</span> <span>다이어트</span> <span>베스트셀러</span>
   </div>
   ```

   ![image-20240630093835338](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240630093835338.png)

   - **현재 `a.d-block가 너비없는 상태`로 모바일로 화면을 좁혀서 확인한다. `부모가 길이가 있다면 끝도 없이 + 좁으면 w100를 나눠서 뭉게지는`현상이 발생한다.**

     ![image-20240630094056571](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240630094056571.png)

     - **`부모를 개발자도구에 임시길이를 줘서, 뭉게짐을확인한다`**

       

       ![image-20240630094451744](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240630094451744.png)

   - **부모flex에 `.flex-wrap`을 줘서, `자식들 줄넘김`이 적용되게 한다.**

     ```html
     <div class="product-hashtag d-flex flex-wrap">
         <span class="sr-only">해시태그</span>
         <span>여성</span> <span>다이어트</span> <span>베스트셀러</span>
     ```

     ![image-20240630094542196](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240630094542196.png)





### `1줄`로 올라가야할 div 2개(할인율 + 가격 /별점 + 리뷰갯수)을 행배치를 위해 `flex + 수직정렬`

5. 가격 행배치

   ```html
   <div class="product-price d-flex align-items-center">
       <div class="product-discount">
           <span class="sr-only">할인율</span>
           20%
       </div>
       <div class="product-value">
           <span class="sr-only">판매가</span>
           198,000원
       </div>
   </div>
   ```

   - gap

   ```css
   & .product-price {
       font-size: 17px;
       font-weight: 700;
   
       gap: 8px
   ```

   ![image-20240630094820041](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240630094820041.png)

6. 리뷰 행배치

   ```html
   <div class="product-review bg-img bg-img-x-left d-flex align-items-center">
       <div class="product-rating">
           <span class="sr-only">별점</span>
           4.6
       </div>
       <div class="product-review-count">
           <span class="sr-only">리뷰 갯수</span>
           (1,450)
       </div>
   </div>
   ```

   - gap

   ```css
   & .product-review {
       background-image: url("../../images/svg/icons/review-star.svg");
       /* 16x16 + 4px 띄우기 */
       padding-left: 20px;
   
       gap: 2px;
   ```

   ![image-20240630095114374](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240630095114374.png)







### 내부디자인 후 텍스트 상하 배치

#### 디자인 상하간격 체크 후 -> css 클래스로 만들기

- 내가 임의대로 넣고 싶다고 `텍스트 바깥div에 mt-10px`을 주면 안된다.

  - 왜냐면 무조건 mt-10px이 아니기 때문에?

- **css를 따로 생성해서 `클래스로 관리`되도록 `바뀔 수 있도록 삽입`해서 관리한다**

  - 그 후 **디자인에서 `체크한 여백을 다 클래스 생성`한다**

    ![image-20240630161644438](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240630161644438.png)

    ![image-20240630161853051](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240630161853051.png)

- **나는 sass가 아니기 때문에 `common.css`에서 정의해서 `수시로 바꿔가며 사용`한다.**

  - **bootstrap은 `mt-xxx`형태로 정해져있어서**
  - **나는 `mtXX`형태로 정의한다.**

1. margin px을 정의

   ```css
   /* margin */
   .mt0 {
       margin-top: 0;
   }
   .mt10 {
       margin-top: 10px;
   }
   .mt12 {
       margin-top: 12px;
   }
   .mt16 {
       margin-top: 16px;
   }
   ```

   

#### ✨ 상하간격 mt 배치전, lh1로 초기화 

2. **lh가 기본적으로 가있을 수 있기 때문에, `최상위 부모인 .product에 lh 1`를 배정해서 상하간격을 초기화한다.**

   - **자식이 lh를 가진 것 제외 딱 달라붙어있을 것이다.**

   ```css
   .product {
       /* 상하간격 초기화(lh가 안주어졌다면 글자크기만 only) */
       line-height: 1;
   ```

   ![image-20240630162649845](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240630162649845.png)





3. **이제  각 사이 간격을 `mtX`로 배정한다.**

   ```html
   <div class="product-category mt16">
       <span class="sr-only">카테고리</span>
       다이어트
   </div>
   <div class="product-title mt16">
       <span class="sr-only">제품명</span>
       비움탕
   </div>
   ```

   ![image-20240630163557107](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240630163557107.png)





### 가로 배치

1. 서로 가로배치 되어야하는 h2, a태그를 **flex div(기본수직가운데정렬for텍스트) + between**를 씌워서 가로배치 만든다.

   - 기존

     ```html
     <section>
         <h2 class="section-title">우아한의원 한약</h2>
         <a href="" class="button-more bg-img bg-img-x-right">더보기</a>
     ```

   - 수정

     ```html
     <section>
         <div class="d-flex align-items-center justify-content-between">
             <h2 class="section-title">우아한의원 한약</h2>
             <a href="" class="button-more bg-img bg-img-x-right">더보기</a>
         </div>
     ```

     ![image-20240630164107190](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240630164107190.png)

   - **수직정렬을 안주면, flex는 기본으로 위쪽으로 정렬되며 `a태그가 flex-item으로서 block이 되어서 텍스트가 위로 붙어`버리니  꼭 줘야한다.**

     ![image-20240630164303324](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240630164303324.png)

     ![image-20240630164200748](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240630164200748.png)





2. section에 .layout-center를 사용하여 가운데 정렬 + 약간의 마진(**상60 하0 + 좌우 1185넘어가면 auto margin + 모바일시 padding15px**)이 적용되게 한다.

   ```html
   <section class="layout-center">
   ```

   ![image-20240630164529020](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240630164529020.png)

   ![image-20240630164711741](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240630164711741.png)

3. .layout-center에 `웹 상60px 마진`이 있지만, 구체적으로 주고 싶다면 `.mt65`를 만들어서 준다.

   ```css
   <section class="layout-center mt65">
   ```





### swiper가 각 slide list의 최고부모 ul개념

4. **제목+더보기 <-> 각 list의 부모의 간격은 `.swiper`가 list의 최고 부모다.**

   - div.swiper에 `mt35`를 줘서 간격을 벌린다.

   ![image-20240630173607168](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240630173607168.png)

   ```html
   <section class="layout-center mt65">
       <div class="d-flex align-items-center justify-content-between">
           <h2 class="section-title">우아한의원 한약</h2>
           <a href="" class="button-more bg-img bg-img-x-right">더보기</a>
       </div>
       <div class="swiper mt35">
   ```

   ![image-20240630173706528](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240630173706528.png)





#### .swiper-slide를 복제하면, 자동으로 행배치 flex + slide 1개 가 자동적용되어 1개밖에 안보인다.

5. 이제 개별디자인이 끝나서, slide를 복사해본다.

   - **slide가 1개만 보이게 됨..**

     ![image-20240630175231697](C:\Users\is2js\AppData\Roaming\Typora\typora-user-images\image-20240630175231697.png)

6. **.slide-wrapper에 의해 각종 css가 적용되어있다**

   ![image-20240630175444711](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240630175444711.png)

   ```css
   .swiper-wrapper {
       position: relative;
       width: 100%;
       height: 100%;
       z-index: 1;
       display: flex;
       transition-property: transform;
       transition-timing-function: var(--swiper-wrapper-transition-timing-function, initial);
       box-sizing: content-box;
   }
   ```

   



### ✨✨ 웹에서는 .swiper-wrapper의 css적용을 막는 방법



1. productCard보다 상위이므로 `productSlide.css`를 만들어서 style에 import한다.

   ```css
   @import url("component/productCard.css"); /* 상품 thumbnail 카드 */
   @import url("component/productSlide.css"); /* 상품 thumbnail 카드의 swiper 제어 */
   ```

   

2. **`.swiper-wrapper의 부모`인  `.swiper`에 `.product-list` 클래스를 줘서, 앞으로 발생할 여러 sectiond에 적용가능하게 해준다.**

   ```html
   <div class="swiper mt35 product-list">
   ```

   ```css
   .product-list {
       .swiper-wrapper {
           
       }
   }
   ```

   

#### md부터는 flex-w100h100이 grid-repeat(4, 1fr);로 4개 고정 등장으로 간다.

3. 4열로 만든다.

   ```css
   .product-list {
       .swiper-wrapper {
           display: grid;
           grid-template-columns: repeat(4, 1fr);
       }
   }
   ```

   ![image-20240630181007265](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240630181007265.png)

   

4. grid는 gap이 없으니 직접 준다.

   ![image-20240630181115950](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240630181115950.png)

   ```css
   .product-list {
       .swiper-wrapper {
           display: grid;
           grid-template-columns: repeat(4, 1fr);
           
           gap: 24px;
       }
   }
   ```

   - **모바일에서는 gap이사라져야 swiper가 정상 작동할 것이다.**





## 3 모바일용 css

1. productSlide.css에 정의한다.

2. **모바일에선 `강제로 바꾼 swiper-wrapper(flex ->) grid`를 다시 flex로 돌리고, `없던 gap도 삭제`해야한다.**

   - flex고 gap이 동일하게 먹으며 **swiper js에서 spaceBetween옵션으로 처리할 것이다.**

   ```css
   .product-list {
       .swiper-wrapper {
           display: grid;
           grid-template-columns: repeat(4, 1fr);
   
           gap: 24px;
   
           @media (max-width: 767px) {
               display: flex;
               gap: 0;
           }
       }
   }
   ```

   ![image-20240701172721156](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240701172721156.png)





## 3.5 swiper 시험 적용 + css 지속꾸미기

1. mainVisual.js를 참고해서 mainProduct.js를 생성하여 import

   ```html
   <!-- layout -->
   <script src="./js/header.js"></script>
   <script src="./js/mainVisual.js"></script>
   <script src="./js/mainProduct.js"></script>
   
   </body>
   ```

   

2. data부분을 주석처리해놓고 **변수명,  init메서드명, new Swiper선택자명 등을 변경한다.**

   - 이 때, pagination을 사용안하도록 하고
   - 3.5개씩 보이게 한다.

   ```js
   let productSwiper;
   
   const initProductSwiper = (data) => {
       // 1. 기존에 있었으면 삭제
       if (productSwiper) {
           productSwiper.destroy(true, true);
       }
   
   
       productSwiper = new Swiper('.swiper.product-list', {
           grabCursor: true,
           slidesPerView: 3.5,
       });
   };
   
   // 처음 실행
   initProductSwiper();
   // 리사이즈 될 때마다 재실행
   window.addEventListener("resize", () => {
       initProductSwiper();
   });
   
   ```

   ![image-20240701180355773](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240701180355773.png)





3. 너무 겹쳐있기 때문에 `1.5`개로 로 바꿔본다.

   ```js
   productSwiper = new Swiper('.swiper.product-list', {
       grabCursor: true,
       slidesPerView: 1.5,
   ```

   ![image-20240701180633779](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240701180633779.png)



### imgDiv에만 크기가 주어지고 부모인 a태그는 크기없이 swiper 처리했더니, slidePerView가 제대로 안나온다.  a태그 부모인 .swiper-slide가 자식인 a를 기준으로 움직이니 모바일에선 a에 width만 지정(height까지 주면 밑에 텍스트...) 

1. 웹에서는 자식imgDiv에 의존하는 `a.product`는 d-block이지만 너비가 안정해져있어서 swiper가 제대로 작동안한다.

   -  **모바일에서 `.swiper-slide`가 크기를 인지할 수 있게 `최상위부모a`에 크기를 주고 imgDiv는 w100 h100으로 부모인 a에 의존하자.**

   ```css
   .product {
       /* 상하간격 초기화(lh가 안주어졌다면 글자크기만 only) */
       line-height: 1;
       /* 모바일에서는 .swiper-slide가 인지할 최상위부모 a.product의 크기가 중요 */
       @media (max-width: 767px) {
           width: 140px;
       }
   
       /* 상품카드 이미지 */
   
       & .product-thumbnail {
           width: 278px;
           height: 278px;
           /* 모바일에서는 최상위부모 a.product의 크기가 중요 -> 따르도록 변경 */
           @media (max-width: 767px) {
               width: 100%;
               height: 100%;
           }
   ```

   - **하지만 a만 너비만 정해주고 div가 100%100%으로 했더니.. imgDiv가 정사각형으로 안나온다.**

     ![image-20240701182009699](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240701182009699.png)

   





### 부모 a태그에 너비를 줬다면, imgDiv는 w100에 height는 a태그의 너비와 동일하게 줘야지 정사각형이 나온다. -> 부모 너비정해졌더라도 자식imgDiv는 height를 주자. -> 나는 height:auto + aspect-ratio: 1/1로 정사각형을 만들었다.

2. 자식 imgDiv height를 140px로 줘도 되지만, 나는 `height:auto; aspect-ratio: 1/1`로 만들었다.

   - **나중에 동저그로 aspect-ratio만 바꾸면 비율 다르게 나올 수 있어서?**

   ```css
   & .product-thumbnail {
       width: 278px;
       height: 278px;
       /* 모바일에서는 최상위부모 a.product의 크기가 중요 -> 따르도록 변경 */
       @media (max-width: 767px) {
           width: 100%;
           /*height: 140px;*/
           height: auto;
           aspect-ratio: 1/1;
       }
   ```

   ![image-20240701182239023](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240701182239023.png)



3. 다시 슬라이드갯수를 3.5로 늘려보자. 넓은화면에선 나오지만, 좁은화면에선 여전히 겹친다.

   ![image-20240701182355264](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240701182355264.png)

   ![image-20240701182415650](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240701182415650.png)





4. 이제 말줄임표 등의 텍스트 / 간격을 좀 정리하자.

   ![image-20240701182507979](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240701182507979.png)

   - **너비가 정해졌으니, 간격을 만들자.**

     ```js
     productSwiper = new Swiper('.swiper.product-list', {
         grabCursor: true,
         slidesPerView: 3.5,
         spaceBetween: 15,
     });
     ```

     

     - **flex여도 gap을 주지않고 `a태그에 me-15px`을 주는 것 같다.**

     - **flex-item이 커져도 이미 width정해져있는 a태그가 해당부분만큼만 차지하고, 나머지는 비게 되며 + 그 바깥에 me-15px.** 

     ![image-20240701183803789](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240701183803789.png)





5. 이제 텍스트들을 모바일에서 줄여준다.

   - 거의다 2px씩 줄이고, hashtag만 건들지 않았다.

     ```css
     & .product-price {
         font-size: 17px;
         font-weight: 700;
         gap: 8px;
     
         @media (max-width: 767px) {
             font-size: 15px;
             gap: 4px;
         }
     ```

     

     ![image-20240701185339411](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240701185339411.png)

   - **mt만 그대로 크게 남아있다.**



6. mt는 16 -> 14 / 12-> 8로 가게 만든다.

   - **이것은 `웹기준 명칭`이지만 자동으로 바뀌게 반응형으로 추가해준다.**

   ```css
   .mt12 {
       margin-top: 12px;
       @media (max-width: 767px) {
           margin-top: 8px;
       }
   }
   
   .mt16 {
       margin-top: 16px;
       @media (max-width: 767px) {
           margin-top: 14px;
       }
   }
   ```

   ![image-20240701185820610](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240701185820610.png)





### 설명부분 모바일에서 말줄임표 처리 in mixin - w100 + white-space + overflow + text-overflow 3가지 조합



7. **white-space nowrap으로 줄넘김안하여 넘치게 만들고 -> overflow hidden으로 안보이게 한다 -> 그게 텍스트 일경우는 text-overflow ellipsis로 점점점으로 나오게 한다.**

   ```css
   /* 말줄임표 */
   .ellipsis {
       /* div-block이라 가로크기가 들어가야함. */
       /* inline이라면 display:block; 까지 추가 */
       width: 100%;
   
       white-space: nowrap;
       overflow: hidden;
       text-overflow: ellipsis;
   }
   ```

   - sass가 아니므로 css에서 똑같이 적어주자.

   ```css
   & .product-description {
       font-size: 15px;
       font-weight: 400;
       color: var(--grey5a);
       @media (max-width: 767px) {
           font-size: 13px;
           /* 1줄 제한 */
           width: 100%;
           white-space: nowrap;
           overflow: hidden;
           text-overflow: ellipsis;
       }
   }
   ```

   ![image-20240701211010694](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240701211010694.png)

8. 나 같은 경우, category, title, description에 모두 적용해준다.

   ```css
   /* 3개 항목에 대해 모바일에서 1줄 제한  */
   & .product-category,
   & .product-title,
   & .product-description {
       @media (max-width: 767px) {
           width: 100%;
           white-space: nowrap;
           overflow: hidden;
           text-overflow: ellipsis;
       }
   }
   ```

   

#### 말줄임표 기본 productCard.css말고, swiper 작동 중에 적용되도록 productList.css로 이동

9. 말그대로 무조건 모바일이 아니라 swiper로 작동하는 card에 대해서만 적용되도록 **swiper css인 productList.css로 옮긴다.**

   ```css
   .product-list {
       .swiper-wrapper {
           display: grid;
           grid-template-columns: repeat(4, 1fr);
           gap: 24px;
   
           /* 모바일에선 flex로 rollback해서 swiper로 작동 */
           @media (max-width: 767px) {
               display: flex;
               gap: 0;
           }
   
           .product {
               /* 3개 항목에 대해 모바일에서 1줄 제한  */
   
               & .product-category,
               & .product-title,
               & .product-description {
                   @media (max-width: 767px) {
                       width: 100%;
                       white-space: nowrap;
                       overflow: hidden;
                       text-overflow: ellipsis;
                   }
               }
           }
       }
   }
   ```

   ![image-20240701211651330](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240701211651330.png)



#### ✨ 웹에서도 grid에 따라 말줄임표 적용되도록, slide.css가 아닌 card.css에 웹/모바일 전체 적용 + figcaption도 웹에서 크기지정하여 내부 텍스트들 말줄임표 적용시키기

- hasatags div만 제외하고 말줄임표 적용되도록 한다.

```css
.product {
	
    /* figure도 웹에서는 크기가 제한되어있어야, ellipsis시 grid 1열을 튀어나가는 것을 방지한다.*/

    & figcaption {
        width: 278px;
        height: auto;
        @media (max-width: 767px) {
            width: 100%;
        }

        /* figcaption 텍스트들은 tag제외하곤 ellipsis를 준다.*/
        > div:not(.product-hashtag) {
            width: 100%;

            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
    }
```

![image-20240705004406828](C:\Users\is2js\AppData\Roaming\Typora\typora-user-images\image-20240705004406828.png)

## 4 mobile에서만 swiperjs 작동하기 => new Swiper를 init:false로 선언하고, 웹에서는 destory된 체 두기 / 모바일시에만 init()

1. enable() + updateSlides() / disable() + updateSlide() 조합을 사용한다면, `웹에서 모바일에서 적용됬던 style태그를 직접 제거`해야한다.

   ![image-20240701220138639](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240701220138639.png)

   - **하지만, destory를 미리 해놓고, init을 천천히 하는 방식으로 가자.**

   ```js
   let productSwiper;
   const initProductSwiper = (data) => {
       // 1. 기존에 있었으면 삭제
       if (productSwiper) {
           productSwiper.destroy(true, true);
       }
       
   	// 2. init: false 옵션으로 swiper객체만 생성 -> 모바일에서만 init()
       productSwiper = new Swiper('.swiper.product-list', {
           grabCursor: true,
           slidesPerView: 3.5,
           spaceBetween: 15,
           init: false,
       });
       
       // 3. 크기보고 swiper 사용여부 결정 결정
       const screenWidth = window.innerWidth;
       const mobileMaxWidth = 768;
       // const paginationType = screenWidth <= mobileMaxWidth ? 'fraction' : 'bullets';
       const isMobile = screenWidth <= mobileMaxWidth;
       if (isMobile) {
           productSwiper.init();
           // productSwiper.enable();
           // productSwiper.updateSlides();
           console.log("mobile -> enable")
       } else {
           // productSwiper.disable();
           // productSwiper.updateSlides();
           console.log("web -> disable")
       }
   };
   
   
   initProductSwiper();
   window.addEventListener("resize", () => {
       initProductSwiper();
   });
   ```

   



### slide 갯수 컨트롤 하기 by 직접조절해보면서 +  breakpoints

1. 웹직전 -> 너무 벌어져있거나, 모바일 작은화면 -> 너무겹치게 된다.

   - 현재 개당 width는 140이다.

     ![image-20240701220533141](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240701220533141.png)
     ![image-20240701220547452](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240701220547452.png)





2. 현재 **3.5 스타트**인데, 웹으로 가기전까진 괜찮다.

   - 그렇다면 3.5가 너무 많아지는 시점을 찾아서 **그 지점부터 3.5 -> 570**

     - **2.5출발로 바꾼다.**

     ![image-20240701223943815](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240701223943815.png)

     ```js
     productSwiper = new Swiper('.swiper.product-list', {
         grabCursor: true,
         slidesPerView: 2.5,
         spaceBetween: 15,
         init: false,
         breakpoints: {
             570: {
                 slidesPerView: 3.5,
             }
         }
     });
     ```

     

   - **2.5 출발**로 바꾸고 2.5가 부담스러워지는 곳을 찾아서, 2.5로  -> 410

     - 410부터 2.5고, **1.5출발**

       ```js
       productSwiper = new Swiper('.swiper.product-list', {
           grabCursor: true,
           slidesPerView: 1.5,
           spaceBetween: 15,
           init: false,
           breakpoints: {
               410: {
                   slidesPerView: 2.5,
               },
               570: {
                   slidesPerView: 3.5,
               }
           }
       });
       ```

       

     ![image-20240701224056508](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240701224056508.png)



## 5 더보기를 모바일에선 하단으로 (디자인 -> 위치)

1. `component/button.css`의 `.button-more`에서 처리한다.

### 모바일 버튼의 높이는 lh로 처리한다.

2. **모바일에선 d-block으로 전체를 차지할 예정이다.**

   ```html
   <a href="" class="button-more bg-img bg-img-x-right d-block d-md-inline">더보기</a>
   ```

   

3. lh로 42px의 높이를 준다.

   ```css
   .button-more {
   
       background-image: url("../../images/svg/icons/button-more.svg");
       padding-right: 17px;
   
       font-size: 14px;
       color: var(--grey28);
   
       @media (max-width: 767px) {
           /* 모바일 버튼의 높이는 글자 수직정렬을 고려해 height대신 lh로 처리 */
           line-height: 42px;
       }
   }
   ```

   ![image-20240702204627021](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240702204627021.png)

   - **현재는 flex-item으로서 block으로 설정해도 내용만큼만 차지하고 벌려진다.**



3. 추가로 border+ border-radius를 주고, block이지만 a요소라 텍스트 정렬은 text-align: center로 가운데 정렬한다.

   ```css
   .button-more {
   
       /* 모바일시 block으로 가득 채우도록 */
       @media (max-width: 767px) {
           /* 모바일 버튼의 높이는 글자 수직정렬을 고려해 height대신 lh로 처리 */
           line-height: 42px;
           border: 1px solid var(--greybe);
           border-radius: 8px;
   
   		text-align: center;
           font-size: 16px;
       }
   }
   ```

   ![image-20240702205107471](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240702205107471.png)



### bg-img를 넣은 버튼글자+아이콘은, 모바일에서 background:none + 벌리는간격과아이콘크기의 padding:0으로 둘다 초기화해서 삭제

4. **background none, padding 0으로 둘다 초기화해서 배경아이콘을 삭제한다.**

   ```css
   .button-more {
   
       @media (max-width: 767px) {
           /* 모바일 버튼의 높이는 글자 수직정렬을 고려해 height대신 lh로 처리 */
           line-height: 42px;
           border: 1px solid var(--greybe);
           border-radius: 8px;
   
           text-align: center;
           font-size: 16px;
   
           background: none;
           padding: 0;
       }
   }
   ```

   ![image-20240702205359474](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240702205359474.png)





### ✨ 순서를 바꾼다면, 공통부모grid -> 자식들에 한해서 order를 정할 수 있으나, 더보기버튼 <-> swiper는다른 레벨이다.

5. swiper와 같은 레벨이 아니라 한단계 아래 자식이라 order적용이 둘만에 대해서 order적용이 안된다.

   ![image-20240702212155928](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240702212155928.png)

   



### ✨✨ 공통부모grid -> 같은레벨 order 적용이 불가능한 다른 level이라면, 위치조정은 `html 웹용/모바일용 2개` or `같은 level로 만들기 위해, flex 대신 float처리 후 -> grid의 자식들로 order정의` 밖에 답이 없다. -> 하지만 .swiper는 grid의 자식이 되면 제대로 작동안한다

- 만약, float처리 + 공통부모 grid 될거면 

  - .fl .fr로 between을 처리했다면, 바로 아래자식인 swiper에 .clear도 정의해준다.
  - mobile에서는 float: none으로 초기화하고, order를 준다.
  - grid는 margin을 안먹기 때문에 mt를 pt로 바꾼다.

  ![image-20240702213626187](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240702213626187.png)
  ![image-20240702213653414](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240702213653414.png)

  ![image-20240702213718546](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240702213718546.png)





### ✨ 웹용/모바일용 더보기버튼 따로 만들기

1. 기존 더보기버튼을 웹용으로서, d-md-inline은 유지하고 **첨은 d-none**

   ```html
   <a href="" class="button-more bg-img bg-img-x-right d-none d-md-inline">더보기</a>
   ```

2. **모바일용 더보기 버튼을 swiper밑에 `기존 css를 그대로 쓸 수 있도록 그대로 복사`한 뒤, `d-block d-md-none`으로 보이괴 안보이고만 다르게 적용받게 한다.**

   ![image-20240702214109002](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240702214109002.png)

   ```html
   <a href="" class="button-more bg-img bg-img-x-right d-block d-md-none">더보기</a>
   ```

   ![image-20240702214143305](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240702214143305.png)



3. 이제 모바일에서 여백을 조절한다.

   ```css
   .mt30 {
       margin-top: 30px;
   }
   ```

   - **모바일에서만 나오는 html에 mt30을 추가한다.**

   ```html
   <a href="" class="button-more bg-img bg-img-x-right d-block d-md-none mt30">더보기</a>
   ```

   ![image-20240702214639670](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240702214639670.png)





## 6 ✨✨이제 웹에서는 slide가 많아도 css로 4개만 보이게 강제하기

1. slide를 몇개 더 복사한다.

   - **4열을 넘어가면 다음줄에 나온다.**

   ![image-20240702222547599](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240702222547599.png)

2. **productList.css에서 4개만 보이게 한다.**



### :nth-child(4) ~ div 에서 ~ div는 해당선택자 `이후 나오는 형제들중` `형제 div`를 의미한다.

3. productSlide.css에서 **.swiper-slide로 따로 정의해준다**.

   ```css
   .product-list {
       .swiper-wrapper {
           
       }
       /* swiper가 아닌 웹grid에서는 4개 제한 */
       .swiper-slide {
           @media (min-width: 768px) {
               &:nth-child(4) ~ div {
                   display: none;
               }
           }
       }
   }
   ```

   ![image-20240702224703429](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240702224703429.png)







## 7 모바일 section 구조 꾸미기

1. .section-title의 모바일글씨 줄이기

   ```css
   .section-title {
       font-size: 24px;
       font-weight: 700;
       color: var(--grey28);
       @media (max-width: 767px) {
           font-size: 17px;
       }
   }
   ```



### w100 + padding구조에선 border가 밖으로 나가니, box-sizing: border-box가 없다면 꼭 주자.



2. .layout-center 가로스크롤 조심할 것

   - **모바일에선 w100%에 padding을 주게되면, `border는 padding밖으로 가서` 가로스크롤이 생길 수 있다. 이 땐 `box-sizing: border-box;`을 줘야한다. 부트스트랩에서 막아줬다.**

   ```css
   .layout-center {
       width: 1185px;
       /*margin: 0 auto;*/
       /* 기본 위쪽 여백 추가 */
       margin: 60px auto 0;
   
       @media (max-width: 767px) {
           margin: 0;
           width: 100%;
           padding: 20px;
           /* w100% + padding을 주면, box-sizing: border-box 안주면 가로스크롤이 생긴다.*/
           /* -> 여기선 bootstrap reboot에서 처리해줘서 생략했다.*/
           /*box-sizing: border-box;*/
       }
   ```



3. `위쪽 60px을 덮어쓴 65px`용 mt65를 모바일에선 제거

   ```html
   <section class="layout-center mt65 section-border">
   ```

   ```css
   .mt65 {
       margin-top: 65px;
       /* layout-center에 추가될 웹용 mt로서 모바일에선 상하 padding으로 대체되니 0 */
       @media (max-width: 767px) {
           margin-top: 0;
       }
   }
   ```