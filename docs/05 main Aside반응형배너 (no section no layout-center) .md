- 유튜브: https://www.youtube.com/watch?v=TPWsZFHDxaA&list=PL_6yF2upGJYt2RbFceTm2xrPnh0DEgp-d&index=34
- 최신버전
  - github:https://github.dev/mizzu-creations/tire-pick-responsive/blob/bf688e41f46dd982dd105813d582aad91d9e58d5/index.html
  - demo: https://tire-pick.vercel.app/

![image-20240703003850714](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240703003850714.png)



# 1 advertiesement



## 1 canva에 정해진 사이즈에 이미지 생성



1. 일단 웹용 / 모바일용 이미지를 준비한다. **canva에서 만들었다.**

   -  web **`ad_index_web` 1184 x 220**

     - https://www.canva.com/design/DAGJ0MYkI9I/s1b2erLUFIQyCRJkvaOTqQ/edit

     ![image-20240703014831923](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240703014831923.png)

   - mobile  : `ad_index_mobile` 548x152

     - https://www.canva.com/design/DAGJ0MKDJ3g/R2KQuA_R14Ie4ZAJbPvsdQ/edit

     ![image-20240703014733120](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240703014733120.png)





2. `image/png/advertisement` 폴더에 ad_index_web/mobile.png로 저장해놓는다.









## 2 html 구조 잡기

### 컨텐츠과 관련없기 때문에 main > section이 아닌 aside태그에 정의

1. aside태그에 class를 advertisement라 준다.

   - **광고는 링크가 있기 때문에 a태그로 기본 씌운다고 생각한다.**

   ```html
   <aside class="advertisement">
       <a href=""></a>
   </aside>
   ```





2. 반응형 이미지 2개라, img태그가 아닌 picture태그를 사용한다.

   - 원본을 img태그에 넣고, source에 모바일을 정의하여 넣어주자.

   ```html
   <aside class="advertisement">
       <a href="">
           <picture>
               <!-- mobile -->
               <source media="(max-width: 767px)"
                       srcset="./images/png/advertisement/ad_index_mobile.png"
                       />
               <!-- web -->
               <img src="./images/png/advertisement/ad_index_web.png" alt=""/>
           </picture>
       </a>
   </aside>
   ```

   - alt도 작성해준다.

   ```html
   <!-- web -->
   <img src="./images/png/advertisement/ad_index_web.png"
        alt="카카오페이로 마음 전달 하기"
        />
   ```

   ![image-20240703153958250](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240703153958250.png)

   ![image-20240703154005019](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240703154005019.png)





## 3 웹 이미지 컨트롤하기

### ✨ 최상위 태그.class에 배경색 배정하기

1. 메인과 마찬가지로, 이미지를 한도끝도 없이 x -> 이미지는 제한 + 배경색 배정을 할 것이다.

   - **main을 제외한 `최상위 aside 태그` 자체에 배경색을 줘서 전체 배경으로 만든다.**

   ```css
   /* 광고 영역 */
   .advertisement {
       background-color: var(--yellowkakao);
   }
   ```

   



### ✨ 최상위아래 a > picture or img태그만 있다면 img태그는 inline요소로서 [block의 w + margin 0 auto] 없이 [(자동 너비) + text-align: center]로만으로 충분히 가운데 정렬 된다.

2. img태그는 inline요소이므로 최상위 태그에서 text-align으로 가운데 정렬한다.

   ```css
   .advertisement {
       background-color: var(--yellowkakao);
       /* img는 inline이라서 가운데정렬을 text-align으로만 해도 된다.*/
       text-align: center;
   }
   ```

   ![image-20240703154928183](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240703154928183.png)



3. **웹일 때는, 부모가 워낙 넓어서 가운데로 들어가지만, `모바일일 경우, 좁은 부모에 컨텐츠는 자동 자신 크기 너비`로 인해 가로스크롤이 생기게 된다.**

   ![image-20240703155125595](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240703155125595.png)





## 4 모바일 이미지 컨트롤 하기





### 모바일일 때만, img태그에 w100을 준다.

1. ㅇㅇ

   ```css
   /* 광고 영역 */
   .advertisement {
       background-color: var(--yellowkakao);
       /* img는 inline이라서 가운데정렬을 text-align으로만 해도 된다.*/
       text-align: center;
   
       img {
           @media (max-width: 767px) {
               width: 100%;
           }
       }
   }
   ```

   ![image-20240703155643146](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240703155643146.png)





### 배너에는 웹 mt60  -> 모바일0(border가 갈라주기 때문)을 준다.

![image-20240703155928666](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240703155928666.png)

- **여백은 무조건 아래에서 `mt`로 줘야, 아래 컨텐츠가 붙으면 자기도 mt로 가지고 와서 규칙적으로 적용될 것 같다.**

  - section기본은 60 / product는 직접 65
  - **배너 기본 없으니 직접 60**
    - **모바일에선 border-bottom으로 구분되기에 padding이 없어도 mt-0**

  ```css
  .mt60 {
      margin-top: 60px;
      /* banner 에 추가될 웹용 mt로서 모바일에선 padding은 없지만 윗 bb / 나의 bb으로 구분되어 모바일에선 0 */
      @media (max-width: 767px) {
          margin-top: 0;
      }
  }
  ```

  ```html
  <aside class="advertisement mt60 section-border">
  ```

  ![image-20240703160452731](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240703160452731.png)

  ![image-20240703160501347](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240703160501347.png)