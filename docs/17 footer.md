

- 최신버전
  - github:https://github.dev/mizzu-creations/tire-pick-responsive/blob/bf688e41f46dd982dd105813d582aad91d9e58d5/index.html
  - demo: https://tire-pick.vercel.app/



![image-20240718204454949](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240718204454949.png)
![image-20240718204512843](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240718204512843.png)

## html



### main을 벗어난 footer



1. footer는 main의 section들의 section-bottom이 없어지고, **footer자체에 border-top을 줄 예정이다.**

   - footer자체에 class="footer"를 줄 예정이다.

2. 구조는 위의 사진처럼, main에서 썼던 section태그를 그대로 사용하며

   - section태그로 footer top/bottom이 있고, 
   - 각각에 div로 left/right가 있다.

   ```html
   <footer class="footer">
       <section class="footer-top">
           <div class="footer-top-left"></div>
           <div class="footer-top-right"></div>
       </section>
       <section class="footer-bottom">
           <div class="footer-bottom-left"></div>
           <div class="footer-bottom-right"></div>
       </section>
   </footer>
   ```

   

## footer-top

### footer-top-left



3. top left부터 텍스트를 채우는데, 각 row를 div로 주고, 각 글자들을 span으로 분리한다.

   - **다음줄이라면, span을 줄바꿈해서 표시한다.**
   - span가운데 클릭시 생긴다면, span대신 a태그로 이어준다.

   ```html
   <div class="footer-top-left">
       <div><span>김석영 주식회사</span><span>대표 조재성</span></div>
       <div>
           <span>주소: 서울특별시 관악구</span>
           <span>사업자번호: 000-00-00000</span>
       </div>
       <div>
           <span>통신판매업신고: 제2024-서울관악-1000호</span><a href="javascript:void(0)">사업자 정보 확인</a>
           <span>Copyright (C) KimSY inc. All rights reserved.</span>
       </div>
   </div>
   ```

   ![image-20240718205859921](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240718205859921.png)

   



4. top right 텍스트를 채운다.

   ```html
   <div class="footer-top-right">
       <span>고객센터 010-4600-6243</span>
       <span>운영시간 평일 09:00 - 18:00</span>
       <span>점심시간 13:00 - 14:00</span>
       <div>
           <span>이메일</span>
           <a href="javascript:void(0)">tingstyle1@gmail.com</a>
       </div>
       <div>
           <span>블로그</span>
           <a href="javascript:void(0)">https://nittaku.tistory.com</a>
       </div>
   </div>
   ```

   ![image-20240718210155921](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240718210155921.png)





5. top left/right를 flex로 between시킨다.

   ```html
   <footer class="footer">
       <section class="footer-top d-flex justify-content-between">
           <div class="footer-top-left">
   ```

   ![image-20240718210602619](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240718210602619.png)



6. css로 footer의 border-top부터 꾸며주기 시작하자.

   - `layout/footer.css`를 생성하고, style.css에서 import한다.

   ```css
   /*layout*/
   @import url("layout/header.css"); /* 헤더 */
   @import url("layout/main.css"); /* main with secetions */
   @import url("layout/footer.css"); /* footer */
   @import url("layout/modal.css"); /* modal */
   ```

   ```css
   .footer {
       border-top: 1px solid var(--greye7);
   }
   ```

   ![image-20240718213050262](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240718213050262.png)

   



7. **여백을 처리하는 것은 `section마다 .layout-center`를 통해**

   - 웹일 때는 가로: width + mx-auto / 세로 my-60px이 자동 적용된다.
   - 모바일 일 때, 가로 + 세로 : m-0 / 상하좌우 전방향 padding 20px이 자동 적용된다.
     - bottom에도 같이 적용해준다.

   ```html
   <section class="footer-top layout-center d-flex justify-content-between">
   ```

   ```html
   <section class="footer-bottom layout-center d-flex justify-content-between">
   ```

   

   ![image-20240718213825035](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240718213825035.png)





#### 모바일에선 flex-column방향이면서 , 우측의 고객센터-reverse 부터 -> 웹에선 flex-md-row

```html
<section class="footer-top layout-center d-flex justify-content-between
    flex-column-reverse flex-md-row">
```

![image-20240718214237357](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240718214237357.png)



- 모바일에선 column방향에서 상하여백을 **mobile에서만 gap**을 준다.

  ```css
  .footer {
      border-top: 1px solid var(--greye7);
  
      & .footer-top {
          @media (max-width: 767px) {
              gap: 24px;
          }
      }
  }
  ```

  ![image-20240718214611126](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240718214611126.png)





- 각 row들의 간격은 `div들`로 정해놨으니 `.footer-top-left / right도 .d-flex.flex-column`로 만들어서, gap으로 벌리자.

  - 모바일에선 상하gap 2px / 웹에선 8px

  ```html
  <div class="footer-top-left d-flex flex-column">
      <div><span>김석영 주식회사</span><span>대표 조재성</span></div>
      <div>
          <span>주소: 서울특별시 관악구</span>
          <span>사업자번호: 000-00-00000</span>
      </div>
      <div>
          <span>통신판매업신고: 제2024-서울관악-1000호</span><a href="javascript:void(0)">사업자 정보 확인</a>
          <span>Copyright (C) KimSY inc. All rights reserved.</span>
      </div>
  </div>
  <div class="footer-top-right d-flex flex-column">
      <span>고객센터 010-4600-6243</span>
      <span>운영시간 평일 09:00 - 18:00</span>
      <span>점심시간 13:00 - 14:00</span>
      <div>
          <span>이메일</span>
          <a href="javascript:void(0)">tingstyle1@gmail.com</a>
      </div>
      <div>
          <span>블로그</span>
          <a href="javascript:void(0)">https://nittaku.tistory.com</a>
      </div>
  </div>
  ```

  ```css
  /* 각 row 간격 */
  & .footer-top-left, .footer-top-right {
      gap: 8px;
      @media (max-width: 767px) {
          gap: 2px;
      }
  }
  ```

  ![image-20240718215636042](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240718215636042.png)

  ![image-20240718215703428](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240718215703428.png)





- 공통 글자크기를 span으로 준다.

  ```css
  /* top-left/right 공통 -> 각 row 간격 + 공통span 글자크기 */
  
  & .footer-top-left, .footer-top-right {
      gap: 8px;
      @media (max-width: 767px) {
          gap: 2px;
      }
  
      /* 기본 글자크기 */
      & span, a {
          font-size: 13px;
          font-weight: 400;
          color: var(--grey28);
  
          @media (max-width: 767px) {
              line-height: 16px;
              font-size: 11px;
          }
      }
  }
  ```

  ![image-20240718223150002](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240718223150002.png)



#### footer-top-left 글자 꾸미기

#####  span2개로 끊어 놓은 이유는 2번째 이후 형제 span들에  abs로 |를 만들기 위함.

1. 가운데 abs로 |를 걸기 위해서는 **span간의 간격을 만들어야하는데 d-flex + gap12 -> 모바일6px로 만들어준다.**

   ```html
   <div class="footer-top-left d-flex flex-column">
       <div class="d-flex"><span>김석영 주식회사</span><span>대표 조재성</span></div>
       <div class="d-flex">
           <span>주소: 서울특별시 관악구</span>
           <span>사업자번호: 000-00-00000</span>
       </div>
       <div>
           <span>통신판매업신고: 제2024-서울관악-1000호</span><a href="javascript:void(0)">사업자 정보 확인</a>
       </div>
       <span>Copyright (C) KimSY inc. All rights reserved.</span>
   </div>
   ```

   ```css
   & .footer-top-left {
       & div {
           /* 가운데 | 가 있는 1, 2번째 div는 flex로서 gap을 벌려놓고 그 중간에 abs로 |를 걸어놓는다. */
           &:first-child, &:nth-child(2) {
               gap: 12px;
               @media (max-width: 767px) {
                   gap: 10px;
               }
           }
   ```

   



2. **이제 각 span을 rel로 만든 뒤, ` ~ span` 이후형제span마다 abs로 left -12의절반 -10의 절반으로 이동시킨 width1/height 12px의 바를 만든다.**

   ```css
   /* 가운데 | 가 있는 1, 2번째 div는 flex로서 gap을 벌려놓고 그 중간에 abs로 |를 걸어놓는다. */
   &:first-child, &:nth-child(2) {
       gap: 12px;
       @media (max-width: 767px) {
           gap: 10px;
       }
       & span {
           position: relative;
   
           & ~ span::before {
               position: absolute;
               content: "";
               width: 1px;
               height: 12px;
               background-color: var(--grey28);
   
               top: 3px;
               left: -6px;
               @media (max-width: 767px) {
                   top: 2px;
                   left:-5px;
               }
           }
       }
   }
   ```

   ![image-20240718225058481](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240718225058481.png)
   ![image-20240718225108262](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240718225108262.png)



##### 2번째 div의 주소 + 사업자는 웹에서는 |를 display:none으로 지우고, column으로 다음줄로 넘긴다.

```css
/* 2번째 div의 주소span + 사업자span은 웹에서는 column 방향으로 + |는 안보이게 */
&:nth-child(2) {
    @media (min-width: 768px) {
        flex-direction: column;
        & span {
            & ~ span::before {
                display: none;
            }
        }
    }
}
```



![image-20240718225723400](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240718225723400.png)

- 부모의 flex gap과 동일하게 변경한다.

  ```css
  /* 2번째 div의 주소span + 사업자span은 웹에서는 column 방향으로 + |는 안보이게 */
  &:nth-child(2) {
      @media (min-width: 768px) {
          flex-direction: column;
          /* 웹에서만 세로로 가면서, 부모의 gap과 동일하게 */
          gap: 8px;
          /* | 웹에서는 안보이게 */
          & span {
              & ~ span::before {
                  display: none;
              }
          }
      }
  }
  ```

  ![image-20240718225838167](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240718225838167.png)





- 2,3,div는 글자 회색으로(웹에선 3줄)

  ```css
  /* 주소+사업자(2) / 사업자정보(3)은 글자 회색 */
  &:nth-child(2), &:nth-child(3) {
      span {
          color: var(--grey96);
      }
  }
  ```

  ![image-20240718230207460](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240718230207460.png)





- **3번째 div도 flex + 가로 gap주고 a태그 밑줄 꾸미기**

  ```html
  <div class="d-flex">
      <span>통신판매업신고: 제2024-서울관악-1000호</span><a href="javascript:void(0)">사업자 정보 확인</a>
  </div>
  ```

  ```css
  /* 3번째도 d-flex의 가로 gap 주고, span옆 a태그 밑줄 꾸미기 */
  &:nth-child(3) {
      gap: 8px;
  
      & a {
          text-decoration: underline;
      }
  }
  ```

  ![image-20240718230638337](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240718230638337.png)





#### 안에 요소가 1줄인 copyright라 div가 없이 span인데 바로 꾸미기 위해 .copyright 클래스주고, 바로 꾸미기

- **모바일에선 너무 진하게 안준다.**

```html
<span class="copyright">Copyright (C) KimSY inc. All rights reserved.</span>
```

```css
/* div 없는 span을 .copyright 클래스로 바로 꾸미기 */

& .copyright {
    font-weight: 600;
    @media (max-width: 767px) {
        font-weight: 400;
    }
}
```

![image-20240718230958132](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240718230958132.png)
![image-20240718231005657](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240718231005657.png)





### footer-right

1. 여기선 span+a태그의 2개이상 요소div가 2개, 1,2,3번째에는 단일 span태그로 구성

   ```html
   <div class="footer-top-right d-flex flex-column">
       <span>고객센터 010-4600-6243</span>
       <span>운영시간 평일 09:00 - 18:00</span>
       <span>점심시간 13:00 - 14:00</span>
       <div>
           <span>이메일</span>
           <a href="javascript:void(0)">tingstyle1@gmail.com</a>
       </div>
       <div>
           <span>블로그</span>
           <a href="javascript:void(0)">https://nittaku.tistory.com</a>
       </div>
   </div>
   ```

   



#### 첫번째 [자식]span인 고객센터는 크고 진하게 + 모바일에선 reverse로 첫번째라mb도 추가

```css
& .footer-top-right {
    /* 고객센터 */
    > span:first-child {
        font-weight: 700;
        font-size: 17px;
        @media (max-width: 767px) {
            font-size: 15px;
            margin-bottom: 6px;
        }
    }
}
```

![image-20240719004520856](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240719004520856.png)







#### 2개이상요소를 담은 div는 flex로 만들어 height를 내부요소에 딱 맞추게 만들고, 그 안의 2번째 a태그들(이메일, 블로그)를 추가로 꾸며준다.

- div는 flex로 자신에게 의존하는 상태가 아니면,  자신의 lh/fz가 적용되어 내부요소보다 약간 큰 height를 만드는 것 같다.

  ![image-20240719005703612](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240719005703612.png)

```html
<div class="footer-top-right d-flex flex-column">
    <span>고객센터 010-4600-6243</span>
    <span>운영시간 평일 09:00 - 18:00</span>
    <span>점심시간 13:00 - 14:00</span>
    <div class="d-flex">
        <span>이메일</span>
        <a href="javascript:void(0)">tingstyle1@gmail.com</a>
    </div>
    <div class="d-flex">
        <span>블로그</span>
        <a href="javascript:void(0)">https://nittaku.tistory.com</a>
    </div>
</div>
```

![image-20240719005607607](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240719005607607.png)



- a태그의 글자색은 회색으로 주고, 웹에서만 underline을 준다.

  ```css
  & .footer-top-right {
  
      /* 이메일 / 블로그 span + a 조합의 div는 flex */
      & div {
          gap: 4px;
  
          & a {
              line-height: 16px;
              font-size: 11px;
              color: var(--grey96);
  
              text-decoration: underline;
              @media (max-width: 767px) {
                  text-decoration: none;
              }
          }
      }
  }
  ```

  

  ![image-20240719010022527](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240719010022527.png)
  ![image-20240719010033097](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240719010033097.png)





## footer-bottom

- footer-bottom은 footer내부이면서 맨아래 섹션이므로 boder-top을 줘서 경계선을 그린다.

  ```css
  & .footer-bottom {
      border-top: 1px solid var(--greye7);
  }
  ```

  - 모바일은 margin없이 패딩가지고 있어서, 좌우간격은 없어서 원하는 형태는 아니나 일단 넘어간다

  ![image-20240719140452226](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240719140452226.png)



- bottom도 웹에선 row방향 between 모바일에선 column방향으로 만들어준다.

  ```html
  <section class="footer-bottom layout-center d-flex justify-content-between
                  flex-column-reverse flex-md-row">
      <div class="footer-bottom-left"></div>
      <div class="footer-bottom-right"></div>
  </section>
  ```

  

### 양쪽이 나열식이면 ul.d-flex.align-items-center + gap으로 처리한다.

- flex-column만 주고 -reverse는 안준다.

![image-20240719141257757](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240719141257757.png)

```html
<section class="footer-bottom layout-center d-flex justify-content-between
                flex-column flex-md-row">
    <div class="footer-bottom-left d-flex align-items-center"></div>
    <div class="footer-bottom-right d-flex align-items-center"></div>
</section>
```





### footer-bottom-left: 글자나열(li > a로 감싼  text)과 right: 이미지 나열 (li > a.bg-img)

1. ```html
   <div class="footer-bottom-left d-flex align-items-center">
       <li><a href="javascript:void(0)">인재채용</a></li>
       <li><a href="javascript:void(0)">개인정보처리방침</a></li>
       <li><a href="javascript:void(0)">매장 제휴신청</a></li>
       <li><a href="javascript:void(0)">이용약관</a></li>
       <li><a href="javascript:void(0)">윤리경영</a></li>
   </div>
   ```

```html
<div class="footer-bottom-right d-flex align-items-center">
    <li><a href="javascript:void(0)" class="bg-img"></a></li>
    <li><a href="javascript:void(0)" class="bg-img"></a></li>
    <li><a href="javascript:void(0)" class="bg-img"></a></li>
    <li><a href="javascript:void(0)" class="bg-img"></a></li>
    <li><a href="javascript:void(0)" class="bg-img"></a></li>
</div>
```





### ul.d-flex를 꾸밀 땐, a태그가 아닌 li태그로 꾸며야 -> &:nth-child(n)으로 원하는 번째수를 같이 바로 꾸밀 수 있다.

- 2번째인 개인정보처리방침만 진하게 줄 수 있다.

```css
& .footer-bottom-left {
    & li {
        font-size: 15px;
        font-weight: 400;
        color: var(--grey3c);
        &:nth-child(2) {
            font-weight: 700;
        }

        @media (max-width: 767px) {
            line-height: 16px;
            font-size: 11px;
        }
    }
}
```

![image-20240719143514132](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240719143514132.png)

- gap을 줘서 벌린다.

```css
& .footer-bottom-left {
    gap: 16px;
    @media (max-width: 767px) {
        gap: 8px;
    }

    & li {
```

![image-20240719143557222](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240719143557222.png)







### right의 a.bg-img에서 a태그는 inline이니, 부모(li)가 flex가 아니라면 직접 block도 줘야한다.

- 일단 css를 통해 a.bg-img의 공통속성인 w/h의 px을 정해주고

  ```css
  & .footer-bottom-right {
      & li a.bg-img {
          width: 32px;
          height: 32px;
      }
  }
  ```

  - **a태그는 태생이 inline이라 w/h가 안먹히니, block도 추가로 줘야한다.**
    - 부모li가 flex라면 flex-item으로서 자동 block이 되기도 한다.

  ```css
  & li a.bg-img {
      display: block;
      width: 32px;
      height: 32px;
  }
  ```

  

- **사실상 개별로 꾸며줘야하니, 클래스를 추가하거나 `style태그로 직접` url을 넣어준다.**

```html
<div class="footer-bottom-right d-flex align-items-center">
    <li><a href="javascript:void(0)" class="bg-img"
           style="background-image: url('/images/svg/sns/naver_blog.svg');"
           ></a></li>
    <li><a href="javascript:void(0)" class="bg-img"
           style="background-image: url('/images/svg/sns/naver_post.svg');"
           ></a></li>
    <li><a href="javascript:void(0)" class="bg-img"
           style="background-image: url('/images/svg/sns/kakao_plus.svg');"
           ></a></li>
    <li><a href="javascript:void(0)" class="bg-img"
           style="background-image: url('/images/svg/sns/instagram.svg');"
           ></a></li>
    <li><a href="javascript:void(0)" class="bg-img"
           style="background-image: url('/images/svg/sns/youtube.svg');"
           ></a></li>
</div>
```





![image-20240719145411378](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240719145411378.png)
![image-20240719145421958](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240719145421958.png)







- gap을 준다.

  - 이미지는 글자와 달리 모바일/웹 동일하게 12px

  ```css
  & .footer-bottom-right {
      gap: 12px;
  
      & li a.bg-img {
          display: block;
          width: 32px;
          height: 32px;
      }
  }
  ```

  ![image-20240719151457240](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240719151457240.png)





- 이제 left/right의 gap도 모바일 column방향대비 **top과 동일한 크기로 준다.**

  ```css
  .footer {
      border-top: 1px solid var(--greye7);
  
      /*& .footer-top {*/
      & .footer-top, .footer-bottom {
          @media (max-width: 767px) {
              gap: 24px;
          }
      }
  ```

  ![image-20240719151724147](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240719151724147.png)





- 웹에서는  top-border와 떨어뜨릴 상하패딩이 없으니, 웹에서만 직접 주자

  - 모바일에선 .layout-center에 의해 패딩이 생겨있을 것임.

  ```css
  & .footer-bottom {
      border-top: 1px solid var(--greye7);
      /* 모바일에선 .layout-center로 인해 상여백이 있지만,
      웹에서는 패딩이 없는데, 직접 줘서 border-top과 떨어뜨리기 */
      @media (min-width: 768px) {
          padding-top: 24px;
      }
  ```

  ![image-20240719152138841](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240719152138841.png)









### footer는 .layout-center로 원래 모바일에선 margin이 없지만, 모바일용 tab를 위해서,  margin-bottom을 주자.

```css
.footer {
    border-top: 1px solid var(--greye7);
    /* 모바일용 bottom tab을 위해, mb를 남겨놓고 거기에 fixed 만들 예정 */
    @media (max-width: 767px) {
        margin-bottom: 56px;
    }
```

![image-20240719152522462](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240719152522462.png)

​	![image-20240719152547497](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240719152547497.png)





- 웹에서도 줘도 될 것 같다.

  ```css
  .footer {
      border-top: 1px solid var(--greye7);
      /* 모바일용 bottom tab을 위해, mb를 남겨놓고 거기에 fixed 만들 예정 */
      /*@media (max-width: 767px) {*/
      margin-bottom: 56px;
      /*}*/
  ```

  ![image-20240719152616083](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240719152616083.png)

