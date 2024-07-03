- 옛날코드: https://github.com/sunnya2023/mini-project/blob/f261d63b8e23fa314de90450a1455fec7891febd/03_HTML%26CSS/01.%EB%A6%AC%EB%B2%A0%ED%95%98%EC%96%80/01.%20tirepick/index.html#L13
- 요즘코드: https://github.com/mizzu-creations/tire-pick-responsive/blob/bf688e41f46dd982dd105813d582aad91d9e58d5/index.html
- 데모: https://tire-pick.vercel.app/



# 1 header html

```html
<!doctype html>
<html lang="ko-KR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>우아한의원</title>
    <link rel="stylesheet" href="css/bootstrap.min.css">
    <link rel="stylesheet" href="css/style.css">
    <script src="js/bootstrap.min.js"></script>
</head>
<body>
<!--1 header.header: header안에 또다른 main header가 있을 수 있어서 클래스 부여-->
<header class="header">
<!--2 제목인 로고 -> h1 -> 클릭시 페이지이동으로 a태그 함유-->
    <h1><a href="">
        <img src="images/logo.svg" alt="타이어픽">
    </a></h1>
    <!--3 제목 다음 중요한 검색을 h2로 sr-only만 먼저 -> 실제는 div or form으로 정의 -->
    <h2 class="sr-only">검색</h2>
    <div class="search">
        <!--input:search  placeholder상으론 접근성설명이 안되므로 title or label을 달아줘야한다.-->
        <input type="search" placeholder="원장이름 / 질환명 / 치료명 검색"
               title="검색어 입력">
        <!-- 클릭목적으로서 button + 배경이미지로 처리시 대체텍스트 필수(div는 inline안에 문법오류 -> span or aria-label로  -->
        <button aria-label="검색"></button>
    </div>
    <!--4 메뉴도 h2.sr-only 텍스트로 제공 -->
    <h2 class="sr-only">메뉴</h2>
    <!-- 메뉴 내용은 nav태그 안에 ul>li>a -->
    <nav>
        <ul>
            <li><a href="">병원소개</a></li>
            <li><a href="">질환별</a></li>
            <li><a href="">치료별</a></li>
            <li><a href="">고객센터</a></li>
        </ul>
    </nav>
    <!--5 탑메뉴를 div.spot-menu로 만들어주는데, 위치는 위라도 본래 영역보다 아래에 정의해준다. 똑같이 nav>ul>a-->
    <div class="spot-menu">
        <nav>
            <ul>
                <li><a href="">비급여안내</a></li>
                <li><a href="">예약확인</a></li>
                <li><a href="">마이페이지</a></li>
                <!--6 모바일화면과 비교해서 살아남은 것과 비교하여 웹x 햄버거 버튼 웹x처리를 위한 aria-hidden="true" 추가하여 추후 css로 잡아서 안보이게 처리할 예정 -->
                <!--   클릭시 페이지이동(a)가 아니라 메뉴가 나오므로 기능button을 li가 감싼다. -->
                <li aria-hidden="true"><button href="">전체메뉴</button></li>
                <li><a href="">로그인</a></li>
            </ul>
        </nav>
    </div>
</header>
</body>
</html>
```





# 2 header 꾸미기

1. 모바일에서는 검색 + 메뉴가 같이 안보이기 때문에 div.header-nav로 묶어 주
2. 모바일용 .spot-menu는 일단 d-none





3. header 양쪽 배치 flex + between

4. .header 양쪽 여백 padding 주기

5. `common.css`에

   1. reset/style.css기본파일을 다운받아 적용하기
      - 링크: https://blog.naver.com/rebehayan/222672082440
   2.  .sr-only 적용

   ![image-20240621165003725](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240621165003725.png)
   ![image-20240621170034989](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240621170034989.png)

   

   
   

   
6. 검색 처리하기 - border를 가진 div안에 투명한 input:search + button으로 처리하기

   1. 높이 제서, 높이랑 동일한 보더레디우스 1px purple 색

      ```css
      :root {
          --purple: #6024c6
      }
      
      .header {
          padding: 0 40px;
      
          & .search {
              height: 48px;
              border-radius: 48px;
      
              border: 1px solid var(--purple)
          }
      }
      ```

      ![image-20240621170318458](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240621170318458.png)

   2. 버튼에는 .css 추가하여 디자인

      1. 클릭하기 어려우니 투명사각형이 둥근보더를 벗어나도록 유지 + 바깥div의 1px border를 상하로 빼서 w/h지정

      2. background-image는 컴파일 기준으로 url을 주며, **no-repeat 및 position:center로 시작점을 센터기준으로 맞춘다.**

         ```css
         & .search-btn {
             width: 46px;
             height: 46px;
         
             background: url("../images/png/icons/btn_search.png") no-repeat center;
         }
         ```

         ![image-20240621201245346](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240621201245346.png)

   3. **반복되는 bg-image의 공통부분을 `css로 mixin`을 만들어서 `class로 줬을 때 기본 속성 + 세부사항 조절 class 추가`전략으로 간다.**

      - background url을 제외하고 **no-repeat(고정) + position: center(잘안바뀜) 외 `배경 + size`를 기본값으로 주는 공통 클래스를 만들고 `default값을 줌과 동시에 아래쪽에서 넣어준 변수를 css로 정의`해준다.**

      ```css
      /* mixin by native css: https://mjswensen.com/blog/you-might-not-need-sass-modern-css-techniques/ */
      .bg-img {
          background: no-repeat var(--bg-x, center) var(--bg-y, center) var(--bg-color, transparent);
          background-size: var(--bg-img-width, auto) var(--bg-img-height, auto);
      }
      
      .bg-img-x-center {
          --bg-x: center;
      }
      
      .bg-img-y-center {
          --bg-y: center;
      }
      
      .bg-img-color-transparent {
          --bg-color: transparent;
      }
      
      .bg-img-width-auto {
          --bg-img-width: auto;
      }
      
      .bg-img-height-auto {
          --bg-img-height: auto;
      }
      ```

      ```css
      <button aria-label="검색" class="btn-search bg-img"></button>
      ```

      - **달라지는 부분인  url만 css로 처리한다.**

      ```css
      & .btn-search {
          width: 46px;
          height: 46px;
      
          background-image: url("../images/svg/icons/search_off.svg");
      }
      ```

   4. 이제 input의 크기를 먼저 확인해서 채우고 -> 버튼을 포함한 양쪽 여백도 준다.

      ![image-20240621204919411](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240621204919411.png)

   5. 상하1px보더를 제외하고 높이를 최대한인 46px로준다(버튼이랑 같음)

      ```css
      > input {
          width: 345px;
          height: 46px;
      }
      
      & .btn-search {
          width: 46px;
          height: 46px;
      
          background-image: url("../images/svg/icons/search_off.svg");
      }
      ```

      ![image-20240621205026620](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240621205026620.png)

      - 부모radius에 의해 짤리는 부분을 방지하기 위해 자식도 똑같이 radius를 준다.

      ```css
      > input {
          width: 345px;
          height: 46px;
          border-radius: inherit;
      }
      ```

      ![image-20240621205121962](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240621205121962.png)

      - 버튼는 정사각형이므로 그냥 100%로 준다.

   6. input의 placeholder는 `::placeholder` 가상선택자로 해준다.

      ```css
      > input {
          width: 345px;
          height: 46px;
          border-radius: inherit;
      
          &::placeholder {
              font-size: 17px;
              color: #96989c;
          }
      }
      ```

7. input/button 모두 inline요소라서 `맞춰진것처럼 보이나` **중간에 공백이 있으며 `중간공백을 통합` 밑 `input아래에 작은 공백`을 처리하면 `flex`로 행으로 배치해야한다.**

   ```html
   <div class="search d-flex">
       <input type="search" placeholder="원장이름 / 질환명 / 치료명 검색"
              title="검색어 입력">
       <button aria-label="검색" class="btn-search bg-img"></button>
   </div>
   ```

   

   ![image-20240621213421479](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240621213421479.png)

   - placeholder의 줄높이 lh을 input height와 동일하게 줘서 맞춘 뒤

     - .search 박스 또한 줄높이를 lh 를 동일하게 줘서 맞춘다.

     ```css
     & .search {
         height: 48px;
         border-radius: 48px;
         border: 1px solid var(--purple);
     
         padding: 0 5px;
     
         line-height: 46px;
         
         > input {
             width: 345px;
             height: 46px;
             border-radius: inherit;
     
             &::placeholder {
                 font-size: 17px;
                 color: #96989c;
                 line-height: 46px;
             }
         }
     ```

8. **내 화면에선 placeholder가 중간에 잘 맞는 것 같지만, `만일 세로중앙이 안맞는다면`**

   1. my) 수평세로 가운데 정렬한다.

      ```html
      <div class="search d-flex align-items-center">
      ```

      

   2. .search <-> placeholder 사이의 `input의 height를 조금 낮춰서, relative 이동해도 클릭 시 .search안으로 들어갈  수 있게 한다.`

      - placeholder의 lh도 변경

      ```css
      > input {
          width: 345px;
          /*height: 46px;*/
          height: 35px;
          border-radius: inherit;
      
          &::placeholder {
              font-size: 17px;
              color: #96989c;
              line-height: 46px;
              line-height: 35px;
      
          }
      }
      ```

      ![image-20240621214637572](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240621214637572.png)

   3. **개발자도구에서 `input을 클릭한 상태로 pos:rel + top:px`로 조절한 뒤, css에서 반영한다.**

      ![image-20240621214734034](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240621214734034.png)

      ```css
      > input {
          width: 345px;
          /*height: 46px;*/
          height: 35px;
          border-radius: inherit;
      
          position: relative;
          top:1px;
      ```















9. **메뉴를 처리한다. 간격이 똑같다면 `flex + gap`으로 처리한다.**

   1. gap의 사이즈를 미리 젠다?! 40px

   2. **`nav태그에 .gnb` + `ul태그에 .d-flex`로 처리한다.**

      ```html
      <nav class="gnb">
          <ul class="d-flex">
              <li><a href="">병원소개</a></li>
              <li><a href="">질환별</a></li>
              <li><a href="">치료별</a></li>
              <li><a href="">고객센터</a></li>
          </ul>
      </nav>
      ```

      ```css
      .gnb {
          > ul {
              gap: 40px;
          }
      }
      ```

      ![image-20240621215116134](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240621215116134.png)

   3. 이제 검색 <-> 대메뉴가 행배치 되도록 .header-nav에 d-flex를 걸어준다.

      ```html
      <div class="header-nav d-flex">
          <h2 class="sr-only">검색</h2>
          <div class="search d-flex align-items-center">
              <input type="search" placeholder="원장이름 / 질환명 / 치료명 검색"
                     title="검색어 입력">
              <button aria-label="검색" class="btn-search bg-img"></button>
          </div>
          <h2 class="sr-only">메뉴</h2>
          <nav class="gnb">
              <ul class="d-flex">
                  <li><a href="">병원소개</a></li>
                  <li><a href="">질환별</a></li>
                  <li><a href="">치료별</a></li>
                  <li><a href="">고객센터</a></li>
              </ul>
          </nav>
      </div>
      ```

   4. 중앙배치까지 해준다(기본적으로 flex-item은 위로 배치된다.)

      ```html
      <div class="header-nav d-flex align-items-center">
      ```

      ![image-20240621215417848](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240621215417848.png)

   5. flex-item간의 거리는 gap으로 처리한다.

      ```css
      .header {
          padding: 0 40px;
      
          & .header-nav {
              gap: 40px;
      ```

   

   

10. 로고도 중앙배치 느낌이 나야한다. 일단 d-flex에 수직정렬을 추가하고

    ![image-20240621215719191](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240621215719191.png)

    ```html
    <header class="header d-flex justify-content-between align-items-center">
    ```

    - **`a태그 내부 > solo img태그`의 가운데 정렬은 `fz-0`으로 처리한다.**
      - **왜냐하면 `a=inline` 내부 `img =inline`은 `&nbsp`로 인해 `공백`이 생기는데, `fz0으로 공백이 아예 사라지게 만든다`**
      - **젤 최상위인 `h1`>a>img상태이므로 h1에 fz-0을 준다. alt의 대체텍스트는 fz에 영향 안받는다.**

    - **h1에 `.logo`를 주고, 다른데서도 로고가 쓰일 수 있기 때문에 최상위root에 정의해준다.**

      ```css
      <h1 class="logo"><a href="">
      	<img src="images/logo.svg" alt="타이어픽">
      </a></h1>
      ```

      ```css
      .logo {
          font-size: 0;
      }
      ```

      ![image-20240621215839095](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240621215839095.png)
      ![image-20240621220304528](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240621220304528.png)

    

    

11. 대메뉴를 꾸며주기 전에 

    1. `font import`를 title아래 첫번째로 import
    2. `typograhpy.css`를 만들어서 reset바로 밑에 import 해주자.

    ```html
    <title>우아한의원</title>
    <link
          rel="stylesheet"
          as="style"
          crossorigin
          href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
          />
    <link rel="stylesheet" href="css/bootstrap.min.css">
    <link rel="stylesheet" href="css/reset.css">
    <link rel="stylesheet" href="css/typography.css">
    ```

    ```css
    /* title 바로 아래 import */
    /*
    <link
      rel="stylesheet"
      as="style"
      crossorigin
      href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css"
    />
    
    html {
      font-size: 62.5%;
    }
    */
    body {
      font-size: 1rem;
    }
    li,
    a,
    p,
    span,
    div,
    button,
    label {
      font-family: "Pretendard Variable", Pretendard, -apple-system,
        BlinkMacSystemFont, system-ui, Roboto, "Helvetica Neue", "Segoe UI",
        "Apple SD Gothic Neo", "Noto Sans KR", "Malgun Gothic", "Apple Color Emoji",
        "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
    }
    ```

    

    

12. 대메뉴를 꾸며주자

    - 젤 하위 a태그의 글자색은 바뀔 수 있어서 변수로 뺀다.

    ```css
    :root {
        --purple: #6024c6;
        --grey28: #282a2e;
    }
    
    .gnb {
        > ul {
            gap: 40px;
    
            & a {
                font-size: 20px;
                color: var(--grey28);
                font-weight: 400;
            }
        }
    }
    ```

    ![image-20240621223350839](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240621223350839.png)

    ![image-20240621224809820](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240621224809820.png)





13. **숨겨진 .spot-menu를 d-none을 제거하고 확인한다.**

    - **부모가 flex라서, between에 마지막이 하나 껴있는 형태다. `마크업으로 3번째에 위치`하기 때문에 `flex를 벗어나기 위해서는 pos:abs`만 가능하다.**

      ![image-20240621225452933](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240621225452933.png)

    - pos:abs + top-0을 준 상태다. **하지만 w100를 차지해야한다**

      ```html
      <div class="spot-menu position-absolute top-0">
      ```

      

      ![image-20240621225809408](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240621225809408.png)

    - **pos:abs에 `left0 right0`을 `동시에` 해주면 `w100%`의 의미를 가지며 `border-bottom`으로 밑으로 선을 내어주기 위함이다**

      ```html
      <div class="spot-menu position-absolute top-0 start-0 end-0">
      ```

      ![image-20240621225912573](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240621225912573.png)

      - **abs는 부모를 기준으로 겹쳐서 나오는데 z축이 뜨는 게 기본이다(수치는x)**

    - **`abs로 떠있는 것을 위에 배치하려면, 위쪽으로 여백(pt)`이 필요하다.**

      - 올라갈 box부분 + border-bottom + `아래쪽box에서 border-bottom까지 위로 떠있는 부분`까지 생각한다.

      ![image-20240621230111622](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240621230111622.png)

    - **위쪽으로 여백 48px을 추가하되, 기존에 좌우 40px이 있는 것을 상속해서 처리한다**

      ```css
      .header {
          /*padding: 0 40px;*/
          /* 위쪽 spot-menu를 위한, 위쪽 여백 48px 추가(위 | 좌=우 | 아래)*/
          padding: 48px 40px 0;
      
          & .header-nav {
      ```

      ![image-20240621230734836](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240621230734836.png)

    - 이제 spot-menu에서 border-bottom을 그어본다.

      ```css
      & .spot-menu {
          border-bottom: 1px solid var(--greye7);
      }
      ```

      ![image-20240621231009627](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240621231009627.png)

      - 현재 abs 속 li들이 block요소라서 행배치 되어야한다.

    - li들을 행배치하기 위해 ul에 d-flex를 준다.

      ```html
      <div class="spot-menu position-absolute top-0 start-0 end-0">
          <nav>
              <ul class="d-flex">
                  <li><a href="">비급여안내</a></li>
                  <li><a href="">예약확인</a></li>
                  <li><a href="">마이페이지</a></li>
                  <li aria-hidden="true">
                      <button href="">전체메뉴</button>
                  </li>
                  <li><a href="">로그인</a></li>
              </ul>
          </nav>
      </div>
      ```

      ![image-20240621231154513](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240621231154513.png)

    - **w-100%(pos left0 right0) 상황에서 `li가 아닌 ul전체를 우측정렬`하기 위해서는 `부모인 nav`에 `d-flex -end`를 추가한다.**

      ```html
      <div class="spot-menu position-absolute top-0 start-0 end-0">
          <nav class="d-flex justify-content-end">
              <ul class="d-flex">
                  <li><a href="">비급여안내</a></li>
                  <li><a href="">예약확인</a></li>
                  <li><a href="">마이페이지</a></li>
                  <li aria-hidden="true">
                      <button href="">전체메뉴</button>
                  </li>
                  <li><a href="">로그인</a></li>
              </ul>
          </nav>
      </div>
      ```

      ![image-20240621234519784](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240621234519784.png)

    - **모바일에서만 보여야해서 `aria-hidden="true"`를 달고 있는 놈을 display:none처리하자.**

      ```html
      <li aria-hidden="true" class="d-sm-none">
          <button href="">전체메뉴</button>
      </li>
      ```

    - 이제 a태그 글자를 먼저 꾸며주고

      ````css
      & .spot-menu {
          border-bottom: 1px solid var(--greye7);
      
          & a {
              font-size: 14px;
              color: var(--grey6f);
          }
      }
      ````

    - **글자사이 간격 + 세로선 그리기는 `li` 들 중에 `인접형재 + li`를 가진 놈들의 `before`로 `첫번째를 제외한 2,3,4의 앞`에서만 생성된다. **

      - **before는 default inline요소라서 표시는 안된다.**

      - **그렇다고 inline-block으로 만들어서 width가 적용되게 하면 `알지못하는 공백들`이 생겨버린다.**

        - 드래그 해보면 content라는 inline요소에 의해 공백이 생겨있다.

          ![image-20240622000950101](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240622000950101.png)

      ```css
      & li {
          & a {
              font-size: 14px;
              color: var(--grey6f);
          }
      
          /* divider -> 인접형제로서 + li를 가진 li에 대해 &:before로 넣어 첫번째 제외의 앞에서 생긴다. */
          /* li + li::before {*/
          & + li {
              &::before {
                  content: "";
                  width: 2px;
                  height: 10px;
                  background-color: var(--greydd);
              }
          }
      }
      ```

      ![image-20240622000550500](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240622000550500.png)

    - **이 때 이용하는 것이 `before-content의 부모`인 `li태그를 flex로 만들어서 -> 자식은 flex-item이자 행배치 block요소`가 되게 하는 것이다.**

      ```html
      <div class="spot-menu position-absolute top-0 start-0 end-0">
          <nav class="d-flex justify-content-end">
              <ul class="d-flex">
                 <!-- before(content="")가 inline(flex-item사이에서 표시안되고 공백추가) -> block으로 만들어 공백제거 및 자리 차지 하기 위해 부모li에 flex-->
      
                  <li class="d-flex"><a href="">비급여안내</a></li>
                  <li class="d-flex"><a href="">예약확인</a></li>
                  <li class="d-flex"><a href="">마이페이지</a></li>
                  <li class="d-sm-none d-flex" aria-hidden="true">
                      <button href="">전체메뉴</button>
                  </li>
                  <li class="d-flex"><a href="">로그인</a></li>
              </ul>
          </nav>
      </div>
      ```

      - **그 결과 공백없는 행배치 block요소가 된 before의 content가 위쪽으로 붙어있다(flex아이템 종특)**

        ![image-20240622001350274](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240622001350274.png)

      - before를 확인하면 block이 되어있다.

        ![image-20240622001429713](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240622001429713.png)

    - 이제 divider 좌우로 margin을 줘서 여백을 만든다.

      ```css
      & + li {
          &::before {
              content: "";
              width: 2px;
              height: 10px;
              background-color: var(--greydd);
              /* 작대기 좌우 여백 */
              margin: 0 20px;
          }
      }
      ```

      ![image-20240622001543491](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240622001543491.png)

    - 이제 divider가 위로 붙을것을 처리하기 위해 수직가운데 정렬도 추가한다.

      ```html
      <div class="spot-menu position-absolute top-0 start-0 end-0">
          <nav class="d-flex justify-content-end">
              <ul class="d-flex">
                  <!-- before(content="")가 inline(flex-item사이에서 표시안되고 공백추가) -> block으로 만들어 공백제거 및 자리 차지 하기 위해 부모li에 flex-->
                  <li class="d-flex align-items-center"><a href="">비급여안내</a></li>
                  <li class="d-flex align-items-center"><a href="">예약확인</a></li>
                  <li class="d-flex align-items-center"><a href="">마이페이지</a></li>
                  <li class="d-sm-none d-flex align-items-center" aria-hidden="true">
                      <button href="">전체메뉴</button>
                  </li>
                  <li class="d-flex align-items-center"><a href="">로그인</a></li>
              </ul>
          </nav>
      </div>
      ```

      ![image-20240622001732307](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240622001732307.png)

    - **이제 높이를 늘려줘야하는데 `늘려주되 가운데 정렬되어야하니, 이미 수직정렬된 곳을 부모 -> 자식순으로 확인`해서 수직정렬이 되어있는 가장 부모인 `li`태그에 주자.**

      ![image-20240622002016706](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240622002016706.png)

      ```css
      & .spot-menu {
          border-bottom: 1px solid var(--greye7);
      
          & li {
              height: 30px;
              & a {
                  font-size: 14px;
                  color: var(--grey6f);
              }
      ```

    - 대메뉴와 마찬가지로 우측에 여백을 좀 줘야한다.

      ![image-20240622002147204](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240622002147204.png)

      - spot도 대메뉴처럼 `우측만 말고 좌우`로 다 padding 40px을 똑같이준다.

        ![image-20240622002315548](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240622002315548.png)

        ```css
        & .spot-menu {
            border-bottom: 1px solid var(--greye7);
            padding: 0 40px;
        ```

        ![image-20240622002249197](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240622002249197.png)

      

    

    







# 3 header 모바일 처리하기

1. 모바일에선 .logo, .spot-menu는 살아있고 `.header-nav`만 통째로 사라져야한다.

   ![image-20240622005410870](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240622005410870.png)

   - **웹에서 `display: flex`를 확인 한 뒤, `.d-none.d-sm-flex`를 추가해준다.**

     ```html
     <!--<div class="header-nav d-flex align-items-center">-->
     <div class="header-nav d-none d-sm-flex align-items-center">
     ```

     ![image-20240622005614181](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240622005614181.png)







2. absolute로 들어갔던 `.spot-menu`가 **원하는 디자인에서는 `between`이 유지가 되어야한다.**

   ![image-20240622011310828](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240622011310828.png)

   1. **모바일에서는 `absolute를 해제`하여 `logo와 같이 between`이 걸리도록 만들어야한다.**

      - **`position: absolute` -> `position:static`으로 abs를 푼다.**

      ```html
      <!--<div class="spot-menu position-absolute top-0 start-0 end-0">-->
      <div class="spot-menu position-static position-md-absolute top-0 start-0 end-0">
      ```

      ![image-20240622011547842](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240622011547842.png)

      - **`.position-md-static`이 없기 때문에 따로 정의하되, !important로 만든다. `common.css를 만들어 import한다`**

        ```css
        /*
        Breakpoint	Class infix	Dimensions
        Extra small	None	<576px
        Small	sm	≥576px
        Medium	md	≥768px
        Large	lg	≥992px
        Extra large	xl	≥1200px
        Extra extra large	xxl	≥1400px
        */
        .position-md-absolute {
            @media (min-width: 768px) {
                position: absolute!important;
            }
        }
        ```



3. **이제 spot-menu 중 `고객센터 | 마이페이지`를 제외하고 다 사라져야하며 `숨어있던 전체메뉴`가 gnb 대신 들어와야한다.**

   - **첫번째 / 마지막 번째만 살아남는게 아니며  **
   - **어떤게 추가되고 사라질지 모르고**
   - **아이콘 화가 이루어져야하기 때문에**
   - **`.cls`을 줘서 처리해야한다?!**

   - **일단, `모바일에서 사라져야할 것`들은 부트스트랩으로 `d-none d-md-flex` 처리한다.**

     ```html
     <li class="d-none d-md-flex align-items-center"><a href="">비급여안내</a></li>
     
     <li class="d-none d-md-flex align-items-center"><a href="">로그인</a></li>
     ```

     ![image-20240622015430750](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240622015430750.png)

   - **divider들도 모바일에선 다 사라져야한다.**

     - 가상선택자는 내부mediaquery가 안먹으니, media > 가상선택자를 내부에 넣어서  따로 정의해준다.

       ```css
       & + li {
           &::before {
               content: "";
               width: 2px;
               height: 10px;
               background-color: var(--greydd);
               /* 작대기 좌우 여백 */
               margin: 0 20px;
       
           }
       
           @media (max-width: 767px) {
               &::before {
                   display: none !important;
               }
           }
       }
       ```

       ![image-20240622015838076](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240622015838076.png)

   - `border-bottom도 및 자체 상하여백`도 제거하자

     ```css
     & .spot-menu {
         border-bottom: 1px solid var(--greye7);
         padding: 0 40px;
         @media (max-width: 767px) {
             border: none;
             padding: 0;
         }
     ```

     ![image-20240622015939519](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240622015939519.png)





3. **`모바일에서 아이콘화`하는 것들은 custom class `.spot-menu-xxx`로 직접 클래스를 추가한다.**

   ```html
   <li class="spot-menu-inquery d-flex align-items-center"><a href="">고객센터</a></li>
   <li class="spot-menu-mypage d-flex align-items-center"><a href="">마이페이지</a></li>
   ```

   - **일단 `텍스트를 숨기기 전 아이콘부터` 준다.**

     - svg는 기본적으로 w/h 24px로 일단 넣어준다.

   - **`.bg-img` + css로 image url을 넣으면 생기게 되는데, 문제는 모바일에서만 적용되어야하므로, `mixin에서 .bg-md-none`을 구현했다.**

     ```css
     .bg-md-img-none {
         @media (min-width: 768px) {
             background: none!important;
         }
     }
     ```

     ```html
     <li class="spot-menu-inquery bg-img bg-md-img-none d-flex align-items-center"><a href="">고객센터</a></li>
     ```

     ```css
     & .spot-menu-inquery {
         background-image: url("../images/svg/icons/phone_solid.svg");
     }
     ```

     ![image-20240622165955764](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240622165955764.png)
     ![image-20240622170009010](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240622170009010.png)

     - 전체메뉴도 똑같이 처리해준다.

     ```html
     <li class="spot-menu-total-menu bg-img bg-md-img-none d-md-none d-flex align-items-center" aria-hidden="true">
         <button href="">전체메뉴</button>
     </li>
     ```

     ```css
     & .spot-menu-total-menu {
         background-image: url("../images/svg/icons/total_menu.svg");
     }
     ```

     ![image-20240622170618447](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240622170618447.png)

4. **글자 숨기는 `span`같은 `html태그로 감싸서 -> css처리`를 해줘야한다. 그렇지 않으면 script로 처리해야한다.**

   - 다른설정놔두고, 글자만 처리할 땐, 글자를 span태그로 씌우자.

   ```html
   <li class="spot-menu-inquery bg-img bg-md-img-none d-flex align-items-center"><a href="">
       <span>고객센터</span>
       </a></li>
   <li class="spot-menu-mypage d-none d-md-flex align-items-center"><a href="">마이페이지</a></li>
   <li class="spot-menu-total-menu bg-img bg-md-img-none d-md-none d-flex align-items-center" aria-hidden="true">
       <button href="">
           <span>전체메뉴</span>
       </button>
   </li>
   ```

   - span태그에는 **`.sr-only`가 모바일에서만 적용**되어야한다.

     - **`.sr-md-below-only`을 구현해서 처리하자.**

     ```css
     .sr-md-below-only {
         @media (max-width: 767px) {
             position: absolute;
             width: 1px;
             height: 1px;
             padding: 0;
             margin: -1px;
             overflow: hidden;
             clip: rect(0, 0, 0, 0);
             white-space: nowrap;
             border-width: 0;
         }
     }
     ```

     ```html
     <!-- 모바일 아이콘화 spot-menu-xxx(bgurl) + .bg-img + .bg-md-img-none-->
     <!-- + 모바일에선 글자감추기 .sr-md-below-only-->
     <li class="spot-menu-inquery bg-img bg-md-img-none d-flex align-items-center"><a href="">
         <span class="sr-md-below-only">고객센터</span>
         </a></li>
     <li class="spot-menu-total-menu bg-img bg-md-img-none d-md-none d-flex align-items-center" aria-hidden="true">
         <button href="">
             <span class="sr-md-below-only">전체메뉴</span>
         </button>
     </li>
     ```

   - **글자가 hide되었더니, fz가 유지가 안되서 배경도 사라져버린다.**

     ![image-20240622171433491](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240622171433491.png)

   - **그럴거면 `.d-none.d-md-inline(span)`으로 대체하고 `span태그의 부모인 a태그 /전체메뉴span의 부모인 button인 a태그`에 높이를 만들어주자.**

     - a태그의 높이를 줄 땐, **주위 클릭할 수있는 `여백을 반으로 나눠서 `합쳐서 주자.**

     ![image-20240622172049555](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240622172049555.png)

     ```css
      & .spot-menu {
             border-bottom: 1px solid var(--greye7);
             padding: 0 40px;
             @media (max-width: 767px) {
                 border: none;
                 padding: 0;
             }
     
             & li {
                 height: 30px;
     
                 & a {
                     font-size: 14px;
                     color: var(--grey6f);
                 }
     
                 /* 모바일에서 글자없어지고 아이콘만 남을 때 */
                 & a, button {
                     @media (max-width: 767px) {
                         width: 45px;
                         height: 56px;
                     }
                 }
     ```

     ![image-20240622172505837](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240622172505837.png)

     

   - li의 자식인 a태그와 button태그에 높이를 줄구면, 배경도 a/button에 주자.

     ```html
     <!-- type2) 모바일에서 icon(배경+높이), md에서는 a>span>텍스트 -->
     <!--        모바일 아이콘화 spot-menu-xxx(bgurl) + .bg-img + .bg-md-img-none-->
     <!--        + 모바일에선 글자감추기 -->
     <li class="spot-menu-inquery d-flex align-items-center">
         <a href="" class="bg-img bg-md-img-none">
             <span class="d-none d-md-inline">고객센터</span>
         </a>
     </li>
     <!-- type3) 모바일에서 icon(배경+높이), md에서는 button>span>텍스트 -->
     <li class="spot-menu-total-menu d-flex d-md-none align-items-center"
         aria-hidden="true">
         <button href="" class="bg-img bg-md-img-none">
             <span class="d-none d-md-inline">전체메뉴</span>
         </button>
     </li>
     ```

     ```css
     & .spot-menu-inquery > a {
         background-image: url("../images/svg/icons/phone_solid.svg");
     }
     
     & .spot-menu-total-menu > button {
         background-image: url("../images/svg/icons/total_menu.svg");
     }
     ```

     - 외부에서 컨트롤 되도록 bgimage style로 변경
       - 경로도 `../images/`에서 `images/`로 변경

     ```css
     /*& .spot-menu-inquery > a {
     background-image: url("../images/svg/icons/phone_solid.svg");
     }
     
     & .spot-menu-total-menu > button {
     background-image: url("../images/svg/icons/total_menu.svg");
     }*/
     ```

     ```html
     <li class="d-flex align-items-center">
         <a href="" class="bg-img bg-md-img-none"
            style="background-image: url('/images/svg/icons/phone_solid.svg');"
            >
             <span class="d-none d-md-inline">고객센터</span>
         </a>
     </li>
     <!-- type3) 모바일에서 icon(배경+높이) + dmd-none + aria-hidden="true" md부턴 아예 안보이는 button>span>텍스트 -->
     <li class="d-flex d-md-none align-items-center"
         aria-hidden="true"
         >
         <button href="" class="bg-img bg-md-img-none"
                 style="background-image: url('/images/svg/icons/total_menu.svg');"
                 >
             <span class="d-none d-md-inline">전체메뉴</span>
         </button>
     </li>
     ```

   - **현재 `모바일에서 a태그의 높이`를 잡아주다보니, `부모인 li의 크기`가 더 작은 현상이 발견된다. -> `모바일에선 li크기를 완전히 없애는 auto`를 통해 `자식의 높이로 채워지기` 작전을 쓴다.**

     ![image-20240622225011150](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240622225011150.png)

     ```css
     & li {
         height: 30px;
     
         & a {
             font-size: 14px;
             color: var(--grey6f);
         }
     
         /* 모바일에서 글자없어지고 배경 아이콘만 남을 때 높이+여백 만들어주기 */
         & a, button {
             @media (max-width: 767px) {
                 width: 45px;
                 height: 56px;
             }
         }
         /*  모바일에서 자식인a태그에 bg아이콘을 위한 너비가 부모li보다 더 크게 잡혀서
         부모li의 높이 30 -> auto로 죽여서 자식의 높이에 의해 채워지게 한다. */
         @media (max-width: 767px) {
             height: auto;
         }
     ```

     ![image-20240622225209078](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240622225209078.png)

   - 이제 header의 `큰화면에서 위쪽 abs를 위한 위쪽 여백`도 없애야한다.

     - **상하여백 없이 좌우여백만 40 -> 15px로 줄인다.**

     ![image-20240622224808852](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240622224808852.png)

     ```css
     .header {
         /*padding: 0 40px;*/
         /* 위쪽 abs spot-menu를 위한, 위쪽 여백 48px 추가(위 | 좌=우 | 아래)*/
         padding: 48px 40px 0;
         /* 모바일에선 static spot-menu가 내부로 들어가 다시 위쪽 여백을 제거한다.*/
         @media (max-width: 767px) {
             padding: 0 15px;
         }
     ```

     ![image-20240622225434586](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240622225434586.png)

   

   

   

# 4 header 모바일 메뉴(햄버거) html

1. 모바일메뉴는 `aside.megamenu`로 제작하며 **기존 .header-nav의 .gnb를 재활용 못하고 새로 짜야한다.**

   - header밑에 새로운 `aside`태그로 시작한다.
   - 전부다 링크(이동)이라 nav > ul > `li>a` 여러개로 일단 짜놓는다.
     - 이 때, spot-menu와 gnb메뉴가 섞여서 들어간다.

   ```html
   <!-- 모바일 전체화면 -->
   <aside class="megamenu">
       <nav>
           <ul>
               <li><a href="">로그인</a></li>
   
               <li><a href="">병원소개</a></li>
               <li><a href="">질환별</a></li>
               <li><a href="">치료별</a></li>
               <li><a href="">고객센터</a></li>
   
               <li><a href="">문의전화</a></li>
               <li><a href="">마이페이지</a></li>
               <li><a href="">비급여안내</a></li>
   
           </ul>
       </nav>
   </aside>
   ```

   ![image-20240622233709468](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240622233709468.png)

2. spot + gnb 메뉴들 이외에 **아래쪽 메뉴가 따로 있다.** 이것은 aside내부 `nav`태그아래에 새롭게 `div.info`로 정의해준다.

   - div.info안에 글자적는 것도 `div.info-text`로 div로 만든다.
   - `글자색이 달라지면` 중간에 `span.text-xxx`로 클래스로 관리해서 준다. 

   ```html
       <div class="info">
           <div class="info-text">
               의료진별 진료시간은 <span class="text-purple">실시간 반영!</span> 됩니다.
           </div>
       </div>
   </aside>
   ```

   ![image-20240622235227630](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240622235227630.png)

3. 밑에 `border 및 크기까지 디자인된` 안드/아이폰 설치 앱 이미지를 가진 링크아이콘은 `a>img`태그로 일단 준다.

   ```html
   <div class="info">
       <div class="info-text">
           의료진별 진료시간은 <span class="text-purple">실시간 반영!</span> 됩니다.
       </div>
   
       <a href=""><img src="images/png/icons/btn_android.png" alt="안드로이드"></a>
       <a href=""><img src="images/png/icons/btn_iphone.png" alt="아이폰"></a>
   </div>
   ```

   ![image-20240622235752693](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240622235752693.png)

4. 닫기버튼은 제일 nav 마지막에 `aria-alebl="닫기"`를 추가한 `button`으로 이미지로 처리할 예정이다?

   - **abs로 갈 것이라서 상관없이 맨 마지막에 준다.**

   ```html
   <div class="info">
       <div class="info-text">
           의료진별 진료시간은 <span class="text-purple">실시간 반영!</span> 됩니다.
       </div>
   
       <a href=""><img src="images/png/icons/btn_android.png" alt="구글플레이"></a>
       <a href=""><img src="images/png/icons/btn_iphone.png" alt="앱스토어"></a>
   </div>
   
   <button class="btn-close" aria-label="닫기"></button>
   ```

   - **abs 닫기버튼을 올릴거면, 젤 상위에서 `위쪽 여백padding`주는 것을 했었따.**

     ![image-20240623000624192](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240623000624192.png)

     ![image-20240623011823456](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240623011823456.png)

     - 또한, 모바일에선 의미없는 hover를 통해 클릭영역 +  `여백`도 있음을 확인한다.

       ![image-20240623011747847](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240623011747847.png)



# 5 header 모바일 메뉴(햄버거) css

1. 생기를 보면, 그룹li별로 따로 내부 ul태그를 넣어서 처리하는데 일단 여기서는 `class를 줘서 구분선`을 준다.



2. **일단 각 항목별 마지막li에 `data-last 속성`을 줘서, 속성을 확인하여 구분선을 밑에 넣을 예정이다.**

   ```html
   <nav>
       <ul>
           <li data-last><a href="">로그인</a></li>
   
           <li><a href="">병원소개</a></li>
           <li><a href="">질환별</a></li>
           <li><a href="">치료별</a></li>
           <li data-last><a href="">고객센터</a></li>
   
           <li><a href="">문의전화</a></li>
           <li><a href="">마이페이지</a></li>
           <li data-last><a href="">비급여안내</a></li>
   
       </ul>
   </nav>
   ```

   - **또한, 디자인이 다른 gnb메뉴의 글자꾸미기는 중간에 있으므로 cls를 부여해서 처리할 것이다.**

     - a태그가 아닌 li태그에 .fw-bold를 준다.

     ```html
     <nav>
         <ul>
             <li data-last><a href="">로그인</a></li>
     
             <li class="fw-bold"><a href="">병원소개</a></li>
             <li class="fw-bold"><a href="">질환별</a></li>
             <li class="fw-bold"><a href="">치료별</a></li>
             <li class="fw-bold" data-last><a href="">고객센터</a></li>
     
             <li><a href="">문의전화</a></li>
             <li><a href="">마이페이지</a></li>
             <li data-last><a href="">비급여안내</a></li>
     
         </ul>
     </nav>
     ```

     







3. **전체로 열릴 메가메뉴는 `fixed + 모든방향-0을 통한 w100 h100`을 만든다.**

   - **햄버거 메뉴는 fixed + 모든방향0 100%를 채움을 시작으로 `열린상태`를 만들어서 시작된다.**

   ```html
   <aside class="megamenu position-fixed top-0 bottom-0 start-0 end-0">
   ```

   - **햄버거메뉴는 `z-1000`으로 넉넉하게 준다.**

   ```css
   .z-1000 {
       z-index: 1000;
   }
   ```

   ```html
   <aside class="megamenu position-fixed top-0 bottom-0 start-0 end-0 z-1000">
   ```

   ![image-20240623013429763](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240623013429763.png)

   - **배경색을 css로**

     ```css
     .megamenu {
         background-color: var(--white);
     }
     
     ```

     ![image-20240623013524393](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240623013524393.png)

4. 닫기 abs버튼이 들어갈 여백을 각 li들의 부모인 `nav태그`에 `위쪽만`준다.

   - 위 좌우 아래 순으로 좌우를 똑같이 들어감.

   ```css
   .megamenu {
       background-color: var(--white);
       
       & nav {
           padding: 58px 0 0 ;
       }
   }
   ```

5. 버튼은 재활용될 가능성이 커서 따로 layout이 아닌 컴포넌트css로 따로 뽑는다.

   - **버튼은 클릭하기 편하게 위쪽여백 58px과 동일한 크기로 잡고, bg-img 처리를 해서 배경으로 처리한다.**

   - **abs + top-0 end-0으로 오른쪽상단에 붙히되, 상하크기가 여백과 동일하게 딱 들어간다.**

     ```css
     .button-close {
         width: 58px;
         height: 58px;
     
         background-image: url("../../images/svg/icons/button_close.svg");
     }
     ```

     ```html
     <button class="button-close bg-img position-absolute top-0 end-0" aria-label="닫기"></button>
     ```

     ![image-20240623015130295](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240623015130295.png)

   





6. 각 li메뉴들을 처리하는데, 진한것빼고 **연한 것이 더 많아서 메인으로 보고 먼저 처리한다.**

   - **li가 아닌 `a태그에 글자크기 색 등을 정한다.`**

   ```css
   .megamenu {
       background-color: var(--white);
   
       & nav {
           padding: 58px 0 0 ;
   
           & a {
               font-size: 14px;
               color: var(--grey28);
           }
       }
   }
   ```

   - **a태그의 공간은 `display:block`처리를 통한 전체 w100%로 채워질 수 있으나**

     ![image-20240623020153920](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240623020153920.png)

     - **`모바일에서 2줄가능성(수직정렬)`을 생각해서 `flex`로 처리해야한다.**
       - flex로 처리해도 한줄을 다 차지 + 수직정렬이 편해진다.

     ```html
     <!-- 모바일 전체화면 -->
     <aside class="megamenu position-fixed top-0 bottom-0 start-0 end-0 z-1000">
         <nav>
             <ul>
                 <li data-last><a class="d-flex align-items-center" href="">로그인</a></li>
     
                 <li class="fw-bold"><a class="d-flex align-items-center" href="">병원소개</a></li>
                 <li class="fw-bold"><a class="d-flex align-items-center" href="">질환별</a></li>
                 <li class="fw-bold"><a class="d-flex align-items-center" href="">치료별</a></li>
                 <li class="fw-bold" data-last><a class="d-flex align-items-center" href="">고객센터</a></li>
     
                 <li><a class="d-flex align-items-center" href="">문의전화</a></li>
                 <li><a class="d-flex align-items-center" href="">마이페이지</a></li>
     
                 <li data-last><a class="d-flex align-items-center" href="">비급여안내</a></li>
             </ul>
         </nav>
     ```

     ```css
     & nav {
         padding: 58px 0 0 ;
     
         /* 모바일 2줄이상 가능시 a를 block이 아닌 flex로 만든 상태 */
         & a {
             font-size: 14px;
             color: var(--grey28);
     
             /* hover를 생각한 여백포함 높이 + 좌우여백만 */
             height: 48px;
             padding: 0 20px;
         }
     }
     ```

     ![image-20240623020813124](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240623020813124.png)





7. **[data-last] 속성을 가진 li에 대해서만, `::after`로 border를 그으려고한다.**

   - **after는 `해당 속성의 마지막 자식`으로 들어간다.**

   - **after border-bottom는 `w100%를 주되 height를 차지하지 않은상태`에서 `abs`로 그을 것이므로 `after의 주인인 li[data-last]만` `position-relative`가 되어야한다.**

     - abs에서 left0 bottom0으로 왼쪽밑에서 시작하게 한다.
     - **크기가 이미 지정되어 있는 a태그라서 가능.**

     ```css
     & nav {
         padding: 58px 0 0;
     
         & li {
             /* data-last 속성이 있는 마지막 li에 대해서 after로 아랫선 긋기 */
             &[data-last] {
                 position: relative;
     
                 &::after {
                     content: "";
                     position: absolute;
                     left: 0;
                     bottom: 0;
                     width: 100%;
                     border-bottom: 1px solid var(--greye7);
                 }
             }
     ```

     ![image-20240623094240672](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240623094240672.png)

8. a들에 대해서 hover간격을 만들었지만, `마지막 a태그`는 `border-bottom아래쪽으로`으로 여백이 있다.

   - border밖이면 margin으로 준다.

     ![image-20240623094527559](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240623094527559.png)

     ```css
     /* data-last 속성이 있는 마지막 li에 대해서 after로 아랫선 긋기 */
     &[data-last] {
         position: relative;
         margin-bottom: 10px;
     
         &::after {
             content: "";
             position: absolute;
             left: 0;
             bottom: 0;
             width: 100%;
             border-bottom: 1px solid var(--greye7);
         }
     }
     ```

     ![image-20240623094749425](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240623094749425.png)



9. 이제 li.fw-bold에 들어갈 hover를 만들어준다.

   - **hover, focus를 li에 하지말고 `모든 a`에 대해서 하자.**

   ```css
   & a {
       font-size: 14px;
       color: var(--grey28);
   
       /* hover를 생각한 여백포함 높이 + 좌우여백만 */
       height: 48px;
       padding: 0 20px;
   
       &:hover {
           background-color: var(--greyf6);
       }
   }
   ```

   ![image-20240623095128154](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240623095128154.png)

   - **hover시 focus도 같이 정의해준다**

     ```css
     & a {
         font-size: 14px;
         color: var(--grey28);
     
         /* hover를 생각한 여백포함 높이 + 좌우여백만 */
         height: 48px;
         padding: 0 20px;
     
         &:hover, &:focus {
             background-color: var(--greyf6);
         }
     }
     ```





10. 이제 `글자가 들어가는 div.info`를 만들 때, `여백을 주되 li[data-last]의 margin-bottom 10px을 고려`해서 위쪽 여백을 좀 작게 을 만든다.

    - **원래 좌우20px 상하20px -> 상은 10px만 준다.**

    ```css
    .megamenu {
    
        & .info {
            padding: 10px 20px 20px;
        }
    }
    ```

    ![image-20240623095646352](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240623095646352.png)

    - 텍스트는 기본으로 fz , color를 주되 **내부 색 바뀌는 `span.text-xx`는 typography.css에 따로 정의해준다.**

      ```css
      & .info {
          padding: 10px 20px 20px;
      
          & .info-text {
              font-size: 14px;
              color: var(--grey6f);
          }
      }
      ```

      ```css
      .text-purple {
        color: var(--purple);
      }
      ```

      ![image-20240623095846877](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240623095846877.png)

    - **아래 이미지와의 거리는 `위쪽의 텍스트div인 div.info-text`에서 `padding bottom`을 줘서 벌린다.**

      ```css
      & .info-text {
          padding: 0 0 15px;
      
          font-size: 14px;
          color: var(--grey6f);
      }
      ```

      ![image-20240623100313442](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240623100313442.png)









11. **간격이 있는 이미지는**

    1. **2개만 d-flex**로 묶어서 **gap**으로 벌리거나

       ```html
       <div class="d-flex gap-2">
           <a href=""><img src="images/png/icons/btn_android.png" alt="구글플레이"></a>
           <a href=""><img src="images/png/icons/btn_iphone.png" alt="앱스토어"></a>
       </div>
       ```

    2. **text와 a2개를 모두 묶은 `grid`로 보고**

       1. **div.info 부모 자체를 grid로 만든 뒤 `부모에서 gap을 줘서 기존 text의 아래쪽 여백 15px`을  `gap: 15px`대체한다.**

          ```css
          & .info {
              padding: 10px 20px 20px;
          
              display: grid;
              gap: 15px; /* 상하간격 */
          
          
              & .info-text {
                  /*padding: 0 0 15px;*/
          
          
                  font-size: 14px;
                  color: var(--grey6f);
              }
          }
          ```

          ![image-20240623101046144](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240623101046144.png)
          ![image-20240623101059662](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240623101059662.png)

       2. **이제 grid를 2열을 `auto, 1fr(남은공간다)`의 너비를 가지게 만들고, `텍스트`는 `1 / 3`으로 1열~3열전 = 1,2열을 다 차지하게 만든다.**

          ```css
          & .info {
              padding: 10px 20px 20px;
          
              display: grid;
              gap: 15px; /* 상하간격 */
              /* 2열만 만들되, 1열은 너비 오토, 2열은 1열과 같은 크기가 들어가므로 100% */
              grid-template-columns: auto 1fr;
          
          
              & .info-text {
                  /*padding: 0 0 15px;*/
                  grid-column: 1 / 3;
          
                  font-size: 14px;
                  color: var(--grey6f);
              }
          }
          ```

          ![image-20240623150151723](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240623150151723.png)



# 6 header 모바일메뉴 offcanvas화

1. 디자인: https://www.youtube.com/watch?v=R3FehYSiXmw
2. 애니메이션 적용: https://www.youtube.com/watch?v=gwYB6TNNz84





1. 배경에 `blur처리된 backdrop`공간을 만들기 위해

   1. `aside.megamenu.z-1000` <-> `nav + div.info + button` 사이에 **`중간div.megamenu-offcanvas 추가` 후, 중간div로 `left-0을 삭제한 top/bottom/right-0`으로 오른쪽으로 붙이고 `w-10/12`만 차이하게 만들기**

      ```html
      <!-- 모바일 전체화면 -->
      
      <aside class="megamenu z-1000">
          <div class="megamenu-offcanvas position-absolute w-10/12 top-0 end-0 bottom-0" >
              <nav>
              </nav>
          </div>
          <div class="info">
          </div>
          <button class="button-close bg-img position-absolute top-0 end-0" aria-label="닫기"></button>
          </div>
      	<!-- backdrop -->
      	<div class="megamenu-backdrop"></div>
      </aside>
      ```

      ![image-20240623203734890](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240623203734890.png)

   2. **중간div의 형제  `div.backdrop` 추가하는데 `pos:fixed` + `모든방향 0으로 w100 h100` + `blur효과(backdrop-filter)` + `z-0 + 위쪽 offcanvas에는 z-1`**

      ```css
      /* tailwind */
      .backdrop-blur-sm {
          backdrop-filter: blur(4px);
      }
      ```

      ```html
      <!-- backdrop -->
      <div class="megamenu-backdrop z-0 position-fixed top-0 bottom-0 start-0 end-0"></div>
      </aside
      ```

      ```css
      & .megamenu-backdrop {
          backdrop-filter: blur(4px);
      }
      ```

      - 형제 offcanvas에는 `.z-1`

      ```html
      <div class="megamenu-offcanvas z-1 position-absolute w-10/12 top-0 end-0 bottom-0">
      ```

      ![image-20240623205741423](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240623205741423.png)

   3. **떠있을 offcanvas에 `흰색배경 + backdrop위에 올라간 drop-shadow` 추가**

      ```css
      /* tailwind */
      .drop-shadow-2xl {
          filter: drop-shadow(0 25px 25px rgb(0 0 0 / 0.15));
      }
      ```

      ```css
      .megamenu {
      	/* backdrop 위에 떠있는 배경 + 그림자 */
          & .megamenu-offcanvas {
              background-color: var(--white);
              filter: drop-shadow(0 25px 25px rgb(0 0 0 / 0.15));
          }
      
      ```

      ![image-20240623205229929](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240623205229929.png)







# 7 header 모바일 메뉴 작동을 위한 alpinejs 

- sidebar multi yotube: https://www.youtube.com/watch?v=Q9eynRwc1CA
  - code: https://github.com/mfazail/CodeF/blob/main/Sidebar/app.js
  - **store + dropdown sub_dropdown + `상황별class주입 for 반응형`**

1. core cdn 붙이기

2. `header.js` 만들어서 body끝에 붙이기(defer를 주면 head태그에 주면 작동안함.)

3. **전체메뉴 클릭버튼은 `header`태그에, megamenu view는 `aside`태그에 따로 있어서 `전역변수 $store`를 이용하도록 한다.**

   - **body에 `x-data`를 `=""`명 없이 주고 사용한다.**
   - **변수 사용시 항상 `$store.영역명.변수`를 붙혀서 사용하므로 길어져서 `toggle() close()`메서드고 같이 정의한다.**

   ```js
   document.addEventListener('alpine:init', () => {
       // Stores variable globally
       Alpine.store('megamenu', {
           isOpen: false,
           toggle() {
               this.isOpen = !this.isOpen;
           },
           close() {
               this.isOpen = false;
           },
       });
   })
   ```

   ```html
   <body x-data>
   ```

   ```html
   <button href="" class="bg-img bg-md-img-none"
           style="background-image: url('/images/svg/icons/total_menu.svg');"
           @click="$store.megamenu.toggle()"
           >
       <span class="d-none d-md-inline">전체메뉴</span>
   </button>
   ```

   ```html
   <!-- 모바일 전체화면 -->
   <aside class="megamenu z-1000">
       <div class="megamenu-offcanvas z-1 position-absolute w-10/12 top-0 end-0 bottom-0"
            x-show="$store.megamenu.isOpen"
            >
           <nav>
               <ul>
   ```

   ```html
   <button class="button-close bg-img position-absolute top-0 end-0" aria-label="닫기"
           @click="$store.megamenu.close()"
   ></button>
   ```

4. **이제 offcanva x-show에 `x-translate- 0 => full`로 애니메이션을 줘야한다.**

   - class로 지정해놔야하며

   - 0일 때 제 위치 -> full되면 뒤로 오른쪽으로 밀릴 것이다.

   - **x-transition:enter="" 와 :leave에 `timing function css + duration`을 정의하고**

     - **:enter-start/-end  :leave-start/-end =""에는 변화를 적는다.**

     ```css
     /* transition timing */
     .ease-gentle {
         transition-timing-function: cubic-bezier(0.38, 0.25, 0.99);
     }
     
     /* duration */
     .duration-500 {
         transition-property: all;
         transition-duration: 500ms;
     }
     ```

     ```css
     /* translate */
     .translate-x-0 {
         transform: translateX(0);
     }
     .translate-x-full {
         transform: translateX(100%);
     }
     ```

     ```html
     <div class="megamenu-offcanvas z-1 position-absolute w-10/12 top-0 end-0 bottom-0"
          x-show="$store.megamenu.isOpen"
          x-transition:enter="ease-gentle duration-500"
          x-transition:enter-start="translate-x-full"
          x-transition:enter-end="translate-x-0"
          x-transition:leave="ease-gentle duration-500"
          x-transition:leave-start="translate-x-0"
          x-transition:leave-end="translate-x-full"
          >
     ```

5. **이제 화면이 커질 때, megamenu가 닫히도록 `resize`이벤트 리스너로 감지하여 꺼주도록 하자.**

   - **init에서 정의해주면 되며, `this.close()`를 호출해주면 isOpen에 false가 들어갈 것이다.**

   ```js
   document.addEventListener('alpine:init', () => {
       // Stores variable globally
       Alpine.store('megamenu', {
           init() {
               // Watch for resize and close megamenu if window width >= 768
               window.addEventListener('resize', () => {
                   if (window.innerWidth >= 768) {
                       this.close();
                   }
               })
           },
       });
   })
   ```

   









6. **뿐만 아니라, `toggle()시 open여부에 따라`, `close()시 무조건`body의 스크롤을 막거나 열어줘야한다. **

   - **megamenu는 100 100 상태에서 `y 만스크롤 auto`**

     ```html
     <!-- 모바일 전체화면 -->
     <aside class="megamenu z-1000">
         <div class="megamenu-offcanvas z-1 position-absolute w-10/12 top-0 end-0 bottom-0 overflow-y-auto"
     ```

     

   - **toggle시**

     - **`open`상태라면 -> body  scroll잠구기**
     - **`close`상태라면 -> body scroll 열어주기**

   - **close시 body scroll 열어주기**

   ```js
   toggle() {
       this.isOpen = !this.isOpen;
   
       if (this.isOpen) {
           document.body.style.overflow = 'hidden';
       } else {
           document.body.style.overflow = '';
       }
   },
   close() {
       this.isOpen = false;
   
       document.body.style.overflow = '';
   },
   ```

   - 공통코드를 리팩토링해서

   ```js
   handleBodyScroll() {
       if (this.isOpen) {
           document.body.style.overflow = 'hidden';
       } else {
           document.body.style.overflow = '';
       }
   },
   toggle() {
   	this.isOpen = !this.isOpen;
       this.handleBodyScroll();
   },
   close() {
   	this.isOpen = false;
   	this.handleBodyScroll();
   },
   ```

   







# 8 header 모바일 일부 메뉴 dropdown html

1. ul>li>`a 태그`(d-flex for 2줄 이상)에 `.justify-content-between`을 추가하고 내부 자식으로 **span.bg-img를 추가한다.**

   ```html
   <li class="fw-bold">
       <a class="d-flex align-items-center justify-content-between" href="">
           병원소개
           <span class="dropdown-arrow bg-img"></span>
       </a>
   ```

2. heroicons에서 24px이 아닌 `mini 20px`을 다운받아, 색을 미리 정해놓고 배경으로 넣어준다.

   ```css
   /* dropdown 화살표 */
   & .dropdown-arrow {
       width: 20px;
       height: 20px;
       background-image: url('/images/svg/icons/chevron-down_mini_grey6f.svg');
   }
   ```

3. li내부에 **a태그의 형제로 `div.dropdown-content`를 추가한다.**

   - 내부는 ul>li>a.d-flex.align-items-center로 똑같이 구성한다.

   ```html
   <!-- type1) a내부 dropdown-arrow + 형제 div.dropdown-content -->
   <li class="fw-bold">
       <a class="d-flex align-items-center justify-content-between" href="">
           병원소개
           <span class="dropdown-arrow bg-img"></span>
       </a>
       <div class="dropdown-content">
           <ul>
               <!-- a가 2줄이상 가능성 있으면 block대신 flex로 -->
               <li><a class="d-flex align-items-center" href="">의료진소개</a></li>
               <li><a class="d-flex align-items-center" href="">진료시간안내</a></li>
               <li><a class="d-flex align-items-center" href="">오시는길</a></li>
               <li><a class="d-flex align-items-center" href="">진료과목</a></li>
               <li><a class="d-flex align-items-center" href="">진료안내</a></li>
           </ul>
       </div>
   </li>
   ```

4. **부모 a태그처럼 꾸며준다.**

   - **height + padding으로 hover공간을 만들어줬었는데, `이번에는 조금 나눠서 margin좌우 <- border-left <-> padding좌우`로 기존 padding을 상하패딩을 margin과 나누는대신 border를사이게 끼어준다.**
   - 참고고 맨 마지막 a[data-last]의 밑줄과 border-left가 달라붙는 것을 방지하기 위해 div.dropdown-content 내부에 pb를 조금 줬다.

   ```css
   & .dropdown-content {
       /* data-last의 밑줄과 내부자식의 border-left가 붙어버려서, 아래쪽에 좀 준다.*/
       padding-bottom: 10px;
   
       & li > a {
           height: 35px;
   
           /*padding: 0 30px;*/
           margin: 0 25px;
           border-left: var(--greydd) 1px solid;
           padding: 0 15px;
   
           color: var(--grey28);
           font-size: 13px;
           font-weight: 400;
       }
   }
   ```

   ![image-20240624143027346](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240624143027346.png)







# 9 header 모바일 dropdown alpinejs 화

- 참고
  - html: https://github.com/mfazail/CodeF/blob/main/Sidebar/index.html
  - js: https://github.com/mfazail/CodeF/blob/main/Sidebar/app.js
  - youtube: https://www.youtube.com/watch?v=Q9eynRwc1CA

1. **megamenu메뉴처럼 `1차 gnb dropdown`도 전역변수에서 처리하도록  전역에서 관리할 수 있게 `전역변수로 선언하고 초기화를 init()에 정의`했다.**

   ```js
   document.addEventListener('alpine:init', () => {
       // Stores variable globally
       Alpine.store('megamenu', {
           /* gnb 메뉴 토글 관련  */
           isGnbOpens: [],
   
   
           init() {
               /* gnb 메뉴 토글 관련  */
               // TODO: Array(this.data.length).fill(false);
               this.isGnbOpens = Array.from({length: 5}, () => false);
   
           },
   ```

   

2.  **기존 dropdown과 다르게 `메뉴마다 dropdown일 수도 있고 아닐 수도 있어서` `개별 li마다`에 `해당 index가 dropdown이면 데이터 없이 상태관리만` 할 수 있게  `index를 받는 영역명 + Alpine.data()`를 선언한다.**

   - **index를 `()`안에 파라미터로 받아준다.**
   - **`전역상태변수를 조작` -> `this.$watch('변수', value =>)`의 watch를 로컬 init에 선언하여 통해 `조작된 해당index 변수 -> 로컬변수`에 넣는다.**
     - 로컬변수는 편하게 사용하기 로컬x-data에서 편하게 사용하기 위함.
   - **토글시 close -> open상태라면 `다른 것들 다 끄는`작업이 필요하기 때문에, `= !해당index상태변수`만으로 처리 못한다.**

   ```js
   Alpine.data('gnb_dropdown', (index) => ({
       isOpen: false,
       toggle() {
           // 현재 상태가 열려 있으면 <나만> 닫기
           if (Alpine.store('megamenu').isGnbOpens[index]) {
               Alpine.store('megamenu').isGnbOpens[index] = false;
   
               // 현재 상태가 닫혀 있으면 모든 dropdown을 닫고 현재 dropdown만 열기
           } else {
               Alpine.store('megamenu').isGnbOpens = Alpine.store('megamenu').isGnbOpens.map((isOpen, isOpenIndex) => isOpenIndex === index);
           }
       },
       init() {
           // 전역 -> 로컬로 상태를 watch하여 업데이트 for 개별메뉴 처리 편하게 in html
           this.$watch(() => Alpine.store('megamenu').isGnbOpens[index], value => {
               this.isOpen = value;
           });
       }
   }));
   ```

   

3. **html에선 각 li에서 `x-data=dropdown(index)`형태로 index를 직접 추가해서 사용한다.**

   - 토글메서드를 a태그에 넣어준다.

   ```html
   <li class="fw-bold"
       x-data="gnb_dropdown(0)"
       >
       <a class="d-flex align-items-center justify-content-between"
          @click="toggle"
          >
   ```

4. **`div.dropdown-content`에는 `x-cloak x-show`외에 길이애니메이션 자동화 plug인인 `x-collapse`도 추가해준다.**

   - 여기선 전역변수로 확인하지 않고 `wtach된 로컬변수 isOpen`을 사용한다.

   ```html
   <li class="fw-bold"
       x-data="gnb_dropdown(0)"
       >
       <a class="d-flex align-items-center justify-content-between"
          @click="toggle"
          >
           병원소개
           <span class="dropdown-arrow bg-img"></span>
       </a>
       <div class="dropdown-content"
            x-cloak x-show="isOpen"
            x-collapse
            >
           <ul>
               <!-- a가 2줄이상 가능성 있으면 block대신 flex로 -->
               <li><a class="d-flex align-items-center" href="">의료진소개</a></li>
               <li><a class="d-flex align-items-center" href="">진료시간안내</a></li>
               <li><a class="d-flex align-items-center" href="">오시는길</a></li>
               <li><a class="d-flex align-items-center" href="">진료과목</a></li>
               <li><a class="d-flex align-items-center" href="">진료안내</a></li>
           </ul>
       </div>
   </li>
   ```

   ![image-20240624213243409](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240624213243409.png)



5. watch되는 isOpen을 통해 화살표 아이콘 배경처리된 `span`을 회전해보자.

   ```css
   .rotate-180 {
       transform: rotate(180deg);
   }
   ```

   ```html
   <span class="dropdown-arrow bg-img"
         :class="isOpen ? 'rotate-180 duration-500' : 'duration-300'"
         ></span>
   ```

   ![image-20240624215852504](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240624215852504.png)



```js
/* gnb 메뉴 토글 관련  */
isGnbOpens: [],


init() {
    /* megamenu toggle 관련  */
    // Watch for resize and close megamenu if window width >= 768
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 768) {
            this.close();
        }
    })
    /* gnb 메뉴 토글 관련  */
    // Initialize isGnbOpens array with 4 false values
    // TODO: Array(this.data.length).fill(false);
    this.isGnbOpens = Array.from({ length: 4 }, () => false);

},
```

```js
Alpine.data('gnb_dropdown', () => ({
    isOpen: false,
    toggle(index) {
        /* 자체적으로 닫기 */
        this.isOpen = !this.isOpen;
        /* 전역에 토글여부 알려주기 */
        Alpine.store('megamenu').isGnbOpens[index] = this.isOpen;
    },
}));
```







# 10 header 메뉴 위치 및 디자인 수정하기

1. 검색을 lg부터 나오도록 수정

   ```html
   <!--<div class="search d-flex align-items-center">-->
   <!-- new -->
   <div class="search d-none d-lg-flex align-items-center">
   ```

2. gnb메뉴가 검색보다 먼저 나오도록 위치 바꾸기 및 서로 멀어지도록 between

   ```html
   <div class="header-nav d-none d-md-flex flex-grow-1 align-items-center justify-content-between">
       <h2 class="sr-only">메뉴</h2>
       <nav class="gnb">
           <ul class="d-flex">
               <li><a href="">병원소개</a></li>
               <li><a href="">질환별</a></li>
               <li><a href="">치료별</a></li>
               <li><a href="" class="new bg-img">고객센터</a></li>
           </ul>
       </nav>
       <h2 class="sr-only">검색</h2>
       <!--<div class="search d-flex align-items-center">-->
       <div class="search d-none d-lg-flex align-items-center">
           <input type="search" placeholder="원장이름 / 질환명 / 치료명 검색"
                  title="검색어 입력">
           <button aria-label="검색" class="btn-search bg-img"></button>
       </div>
   </div>
   ```

3. logo <-> header-nav(메뉴+검색)이

   - 모바일일땐 between이 그대로 유지되지만
   - **lg일 땐 start 왼쪽정렬 + 간격을 gap으로 벌려서 왼쪽으로 모이게 하기**
   - **header-nav는 between인 gnb <-> 검색의 간격이 유지되도록 flex-grow-1로 커지게 만들기** 

   ```html
   <!--<header class="header d-flex justify-content-between align-items-center">-->
   <header class="header d-flex justify-content-between justify-content-lg-start align-items-center">
   ```

   ```css
   .header {
   
       gap: 4rem;
   ```

   

   ```html
   <!--<div class="header-nav d-none d-md-flex align-items-center">-->
   <div class="header-nav d-none d-md-flex flex-grow-1 align-items-center justify-content-between">
   ```

   ![image-20240625160011749](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240625160011749.png)

   ![image-20240625160057306](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240625160057306.png)





4. gnb메뉴에 `new`반영하기

   - `.new` 클래스를 넣을 경우 -> `:after`로 svg를 배경으로 넣는다.
   - .new 클래스에 반응해야하니 `.bg-img`를 못써먹어서 그대로 가져와서 처리되게 한다.

   ```html
   <li><a href="" class="new bg-img">고객센터</a></li>
   ```

   ```css
   & a {
       color: var(--grey28);
       font-size: 1.3rem;
       font-weight: 500;
   
       /* new */
       position: relative;
   
       &.new::after {
           content: "";
           position: absolute;
           top: -0.375rem;
           right: -1.3rem;
   
           background: no-repeat center center transparent;
           background-size: auto auto;
           width: 1.6rem;
           height: 1.6rem;
           background-image: url('../../images/svg/new.svg');
       }
   }
   ```

   ![image-20240625160726369](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240625160726369.png)