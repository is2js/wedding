- 유튜브: https://www.youtube.com/watch?v=Gz5koaZ7vwg&list=PL_6yF2upGJYt2RbFceTm2xrPnh0DEgp-d&index=29
- 최신버전
  - github:https://github.dev/mizzu-creations/tire-pick-responsive/blob/bf688e41f46dd982dd105813d582aad91d9e58d5/index.html
  - demo: https://tire-pick.vercel.app/





# 1 main Favorite nav

## 이미지(png or svg) 공수

- 배경이 흰색 -> 회색으로 바뀔 예정인데, 그림은 그대로 라서 투명한 배경을 만들 수 있는 png나 svg로 처리될 것이다.

- 

  ![image-20240627140633253](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240627140633253.png)
  ![image-20240627140644420](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240627140644420.png)





## html

1. **main내부 `새로운 section.favorite-nav`태그를 만들어서 처리한다.**

   - 8개의 메뉴가 들어갈 예정이므로**, `ul>li>a`형태로 1개를 완성**하고 8개로 만들 예정이다.

   ```html
   <section class="favorite-nav">
       <ul>
           <li><a href="#"></a></li>
       </ul>
   </section>
   ```





2. 내부에는 보조텍스트 + 주요텍스트가 나눠져있지만, 읽어보면 각각이 `제목hx`rk 아니라 1문장이 2줄로 나뉜것이기 때문에, 별도 처리없이 `span.보조텍스트` + `b.주요텍스트`로 나눠준다.

   ```html
   <section class="favorite-nav">
       <ul>
           <li><a href="#">
               <span class="favorite-nav-text-sub">이번 달에만!</span>
               <b class="favorite-nav-text-main">할인 이벤트</b>
               </a></li>
       </ul>
   </section>
   ```

   - 8개로 늘려서 처리해준다.

   ![image-20240627143617190](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240627143617190.png)

3. **8개의 아이콘이 전부 디자인이 다 달라서 -> `각 li태그에 class넘버링`를 줘서 꾸미거나 `넘버링을 사용`한다.**

   - **추후 그냥 `&:nth-child()`로 처리해도 될 듯하다.**

   ![image-20240627144113132](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240627144113132.png)

   ```html
   <section class="favorite-nav">
       <ul>
           <li class="favorite-nav-icon1"><a href="#">
               <span class="favorite-nav-text-sub">이번 달에만!</span>
               <b class="favorite-nav-text-main">할인 이벤트</b>
               </a>
           </li>
           <li class="favorite-nav-icon2"><a href="#">
               <span class="favorite-nav-text-sub">대표원장의 변화로 보는</span>
               <b class="favorite-nav-text-main">체질 다이어트</b>
               </a>
           </li>
   ```





## css (main.css)





4. 원래같으면 .container로 처리하겠지만 이번에는 **section태그에 `width + mx-auto`를 통해, 가운데 위치하도록 만들 예정이다.** 

   ```css
   /* 즐겨찾는 메뉴 */
   .favorite-nav {
       width: 1185px;
       margin: 0 auto;
   }
   ```

   ![image-20240627150646834](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240627150646834.png)

   - **좌우를 처리했으면 위아래 여백도 준다.**
     - **width + mx-auto 조합은 `다른곳에서 똑같이 쓰일 예정-> mixin`으로 정의될 예정이기 때문에 margin-top/bottom을 따로 준다.**

   ```css
   /* 즐겨찾는 메뉴 */
   .favorite-nav {
       width: 1185px;
       margin: 0 auto;
   
       margin-top: 60px;
   }
   ```

   





2. **배치는 flex든 grid든 상관없는데, `열을 선택`해야하는 상황이 올 것이므로 `grid`로 처리하도록 한다.**

   ```css
       <section class="favorite-nav container">
           <ul class="d-grid">
               <li class="favorite-nav-icon1"><a href="#">
   ```

   - **d-grid는 클래스로 줬지만 `grid-template-columns`와 gap은** css로 준다.
     - **행/열 따로 gap을 주면 순서대로 주면 된다.**

   ```css
   /* 즐겨찾는 메뉴 */
   .favorite-nav {
       width: 1185px;
       margin: 0 auto;
   
       margin-top: 60px;
   
       & ul {
           grid-template-columns: repeat(4, 1fr);
           gap: 30px 24px;
       }
   }
   ```

   ![image-20240627151314224](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240627151314224.png)





3. **일단 텍스트 배치가 아니라 크기/색부터 꾸며준다.**

   ```css
   /* 즐겨찾는 메뉴 */
   .favorite-nav {
       width: 1185px;
       margin: 0 auto;
   
       margin-top: 60px;
   
       & ul {
           grid-template-columns: repeat(4, 1fr);
           gap: 30px 24px;
   
           & .favorite-nav-text-sub {
               font-size: 14px;
               color: var(--grey6f);
           }
           & .favorite-nav-text-main {
               font-size: 25px;
               color: var(--black);
           }
       }
   }
   ```

   ![image-20240627151515440](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240627151515440.png)





### inline span/b가 밑으로 떨어지게  + 이미지대비 왼쪽위치 + 양쪽여백있는 가운데정렬 -> flex로 처리 + 이미지를 무시하고 텍스트 배치부터 일단 만든다.



4. **이미지 배치는 무시하고 span/b의 부모인 `a태그`에 `flex 세로배치`를 준다.**

   ```html
   <li class="favorite-nav-icon1">
       <a href="#" class="d-flex flex-column">
           <span class="favorite-nav-text-sub">이번 달에만!</span>
           <b class="favorite-nav-text-main">할인 이벤트</b>
       </a>
   </li>
   ```

   

   ![image-20240627152534301](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240627152534301.png)



### 글자사이의 기본간격은 lh:1로 초기화해놓고 gap으로 벌린다

5. 기본적인 위아래 글자간격이 존재한다. 이것은 `lh`때문인데 **css로 lh1로 만들고 다시 판단한다.**

   ![image-20240627152635438](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240627152635438.png)

   ```css
   & ul {
           grid-template-columns: repeat(4, 1fr);
           gap: 30px 24px;
   
           & a {
               line-height: 1;
   ```

   ![image-20240627152712093](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240627152712093.png)

   - 글자끼리 완전히 붙었다. **행간격을 gap으로 준다.**

   ```css
   & ul {
       grid-template-columns: repeat(4, 1fr);
       gap: 30px 24px;
   
       & a {
           line-height: 1;
           gap: 12px;
   ```

   ![image-20240627152833357](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240627152833357.png)

   

### 카드는  height를 지정하는데, border들어갈 예정이면, box-sizing: border-box;를 height준 뒤 필수로 준다.



1. 이게 border 테투리 디자인을 해줄 것인데, **기본적으로 공통인 디자인부터 처리해준다.**

   - border-radius 등..
   - **`height`지정시 border가 들어갈 예정이라면, `box-sizing: border-box`로 border를 포함한 높이로 만든다.**

   ![image-20240627153130103](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240627153130103.png)

   ```css
   & a {
       /* 글자사기 간격을 gap으로 처리하기 위해 간격초기화 */
       line-height: 1;
       gap: 12px;
   
       border-radius: 15px;
       height: 120px;
       /* height를 줄 때, border들어갈 예쩡이면 필수로 넣어주자. */
       box-sizing: border-box;
   ```

   - **height를 주고 난 뒤에는, 수직 가운데 정렬도 줘야한다.**
     - 아직 border가 없다면 `tab`을 눌러서 border를 예상할 수 있다.

   ```html
   <a href="#" class="d-flex flex-column justify-content-center">
   ```

   ![image-20240627153629910](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240627153629910.png)



### 카드는 auto부모 li에 배경색을 주고,  배경이미지icon은 height를 가진 a에서 mixin을 통해 주자.

- **li에 배경이미지를 주면, 자식a태그가 먹어버리는 현상이 발생한다.**
  - **먹히면 안되는 것을 제일 자식에게 줘야한다.**
  - **부모에선 외곽 디자인을 해줘야한다.**



1. **일단 a태그에 배경이미지를 mixin을 활용해서 준다.**

   - 기존에는 들어갈 이미지의 `위치 center center`
   - 들어갈 이미지의 크기 `auto auto로 부모요소를 꽉채우게(부모w/h)`였지만
   - **이번에는 `위치 right 40px center`로 오른쪽에 붙고**
   - **이미지의 크기를 `40px + (height auto)`로 직접 지정하도록 mixin 클래스를 따로 만든다.**
     - **부모크기를 사용안하니 w/h는 지정안해도 되고, style에서 bgimageurl만 지정해준다.**

   ```css
   .bg-img-favorite-nav {
       background: no-repeat right 20px center transparent;
       background-size: 40px auto;
   }
   ```

   ```html
   <li class="favorite-nav-icon1">
       <a href="#" class="d-flex flex-column justify-content-center bg-img-favorite-nav"
          style="background-image: url('./images/png/favorite_nav/menu09_herb.png');"
          >
           <span class="favorite-nav-text-sub">이번 달에만!</span>
           <b class="favorite-nav-text-main">할인 이벤트</b>
       </a>
   </li>
   ```

   ![image-20240627162425666](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240627162425666.png)



2. **오른쪽으로 몰았지만 `y축은 bottom부터 시작`하게 하여 꾸밀 수 도 있다.**

   - `-y-bottom`으로 클래스를 만들어서 지정해주자
     - 바탐에서 시작하여 height가 높아야하므로 결정하는 width도 크게 줬다. (40 -> 100px)
     - 그만큼 right에서 떨어진 정도도 줄였다.(40-> 20px)

   ```css
   .bg-img-favorite-nav-y-bottom {
       background: no-repeat right 20px bottom transparent;
       background-size: 100px auto;
   }
   ```

   ```html
   <li class="favorite-nav-icon2">
       <a href="#" class="d-flex flex-column justify-content-center bg-img-favorite-nav-y-bottom"
          style="background-image: url('./images/png/favorite_nav/menu_ceo.png');"
          >
           <span class="favorite-nav-text-sub">대표원장의 변화로 보는</span>
           <b class="favorite-nav-text-main">체질 다이어트</b>
       </a>
   </li>
   ```

   ![image-20240627162547295](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240627162547295.png)

   - **아니면 `height 100%`로 채우고 그만큼 `자동으로 width가 왼쪽으로 나아가게 by right`를 만들 수 있다.**

     ```css
     .bg-img-favorite-nav-y-bottom {
         background: no-repeat right 20px bottom transparent;
         background-size: auto 100%;
     }
     ```

     ![image-20240627162833600](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240627162833600.png)





3. 이제 li에서 공통외곽 설정인 `box-shadow`부터 넣어준다. **색이 들어있는 카드는 border가 없다는 게 함정**

   ```css
   & ul {
       grid-template-columns: repeat(4, 1fr);
       gap: 30px 24px;
   
       & li {
           box-shadow: 1px 1px 5px var(--black-20);
       }
   ```

   - **자식a태그에 height border-radius가 있지만 `부모는 자식의 border-radius를 무시`한다.**

     ![image-20240627164522256](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240627164522256.png)

   - **부모인 li에 radius를 옮기고, 자식인 a는 inherit하자.**

     ```css
     & li {
         box-shadow: 1px 1px 5px var(--black-20);
         border-radius: 15px;
     
         & a {
             /* 글자사기 간격을 gap으로 처리하기 위해 간격초기화 */
             line-height: 1;
             gap: 12px;
     
             border-radius: inherit;
             height: 120px;
             /* height를 줄 때, border들어갈 예쩡이면 필수로 넣어주자. */
             box-sizing: border-box;
     
     ```

4. a태그 내부에 좌우패딩을 주자.

   - 가운데 정렬이 아니라서 flex에서 터치하지말고 좌우 패딩으로 처리

   ```css
   & a {
       padding: 0 30px;
   ```

   ![image-20240627164855784](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240627164855784.png)





5. 나는 css로 찾아서 반영하지 않고, **배경색도 동적으로서 li태그 style로 주도록 하자.**

   ![image-20240627223539850](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240627223539850.png)

   - **기존에 줬떤 넘버링 css를 제거하고 `li에 기본으로 회색`을 준다.**

     - **border대신, `hover/focus시 진한회색배경 + scale을 약간 키운다`**

     ```css
     & li {
         box-shadow: 1px 1px 5px var(--black-20);
         border-radius: 15px;
     
         /* 기본 회색 배경 + hover/focus시 좀더 어둡게 + 약간 크기 키우기 */
         background-color: #F1F3F6;
         transition: all .3s;
         &:hover, &:focus {
             /*border: 1px solid var(--greye7);*/
             background-color: var(--greydd);
             transform: scale(1.01);
         }
     ```

     ![image-20240627224110955](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240627224110955.png)

6. **`li태그에 배경색을 동적`으로 준다.**

   - type1: 위에 4개는 회색 기본 유지 (넘버링 css를 삭제한 상태)

     ```html
     <ul class="d-grid">
         <!-- type1) li에 동적 배경색 없음-->
         <li>
             <a href="#" class="d-flex flex-column justify-content-center bg-img-favorite-nav-y-bottom-100%"
                style="background-image: url('./images/png/favorite_nav/부부의료진.png');"
                >
                 <span class="favorite-nav-text-sub">10년 이상을 같이한</span>
                 <b class="favorite-nav-text-main">의료진 부부</b>
             </a>
         </li>
     ```

     

   - **type2: 아래 4개를 색을 준다.**

     ```html
     <!-- type2) li에 동적 배경색 style 지정 -->
     <li class="bgc-dark" style="background-color: #2b5cd2;">
         <a href="#" class="d-flex flex-column justify-content-center bg-img-favorite-nav-md"
            style="background-image: url('./images/png/favorite_nav/초음파.png');"
            >
             <span class="favorite-nav-text-sub">운동하다 다쳤어요</span>
             <b class="favorite-nav-text-main">스포츠손상</b>
         </a>
     </li>
     ```



7. **배경이 들어갈 땐 글자가 흰색으로 바껴야한다.**

   - **`부모태그`인 li태그에 `.bgc-dark`에 추가시 흰색테마로 지정되게 한다.**

   ```css
   & a {
   
       & .favorite-nav-text-sub {
           font-size: 14px;
           color: var(--grey6f);
       }
   
       & .favorite-nav-text-main {
           font-size: 24px;
           color: var(--black);
       }
       /* 부모인 li태그에 .bg-dark 가 찍혀있으면 찐한 색이 들어가니 -> a태그 속 텍스트를 밝게 */
       .bgc-dark & {
           text-shadow: 1px 1px 2px var(--black-40);
           /*text-shadow: 1px 1px 2px var(--white);*/
   
           & .favorite-nav-text-sub {
               color: var(--greydd);
           }
   
           & .favorite-nav-text-main {
               color: var(--greyf6);
           }
       }
   }
   ```

   ![image-20240627224301369](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240627224301369.png)

   - **밝은색 배경이면 li에 .bgc-dark를 주지 말자.**

   

### a태그 배경이미지마다 사이즈가 다를 수 있으니, -md, -lg를 구현해놓고 맞춰본다.

```css
.bg-img-favorite-nav {
    background: no-repeat right 30px center transparent;
    background-size: 50px auto;
}

.bg-img-favorite-nav-md {
    background: no-repeat right 15px center transparent;
    background-size: 100px auto;
}

.bg-img-favorite-nav-lg {
    background: no-repeat right 0 center transparent;
    background-size: 150px auto;
}
```

```css
bg-img-favorite-nav-y-bottom-100\% {
    background: no-repeat right 5px bottom transparent;
    background-size: auto 100%;
}

.bg-img-favorite-nav-y-bottom-100\%-lg {
    background: no-repeat right -5px bottom -15px transparent;
    background-size: auto 120%;
}
```

![image-20240627224707685](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240627224707685.png)





## 모바일화



### 모바일용 나타날 것 + 사라져야할것 처리



1. 모바일 아이콘과의 텍스트가 다를 수 있어서 **모바일용 title을 따로 제작**한다

   ![image-20240627225310424](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240627225310424.png)

   - **아이콘 아래에위치할 것이므로 li태그안에 `a태그 아래쪽 형제div`로 만들어준다.**

     - **d-md-none으로 모바일에서만 보이게 한다.**

     ```html
     <!-- 우측 센터 아이콘: .cls 주고 + style bg-image: url()-->
     <!-- w  50~99px: bg-img-favorite-nav -->
     <!--    100~149px: bg-img-favorite-nav-md -->
     <!--    150px ~: bg-img-favorite-nav-lg -->
     <!-- bottom부터 시작시 -->
     <!-- 기본: bg-img-favorite-nav-y-bottom-100 -->
     <!-- 120% 꽉채운다면 : bg-img-favorite-nav-y-bottom-100-lg -->
     
     <!-- type1) li에 동적 배경색 없음-->
     <li>
         <a href="#" class="d-flex flex-column justify-content-center bg-img-favorite-nav-y-bottom-100%"
            style="background-image: url('./images/png/favorite_nav/부부의료진.png');"
            >
             <span class="favorite-nav-text-sub">10년 이상을 같이한</span>
             <b class="favorite-nav-text-main">의료진 부부</b>
         </a>
         <div class="d-md-none">의료진</div>
     </li>
     <!-- type2) li에 동적 배경색 style 지정 + .bgc-dark시 text 하얀 테마로 -->
     <li class="bgc-dark" style="background-color: #2b5cd2;">
         <a href="#" class="d-flex flex-column justify-content-center bg-img-favorite-nav-md"
            style="background-image: url('./images/png/favorite_nav/초음파.png');"
            >
             <span class="favorite-nav-text-sub">운동하다 다쳤어요</span>
             <b class="favorite-nav-text-main">스포츠손상</b>
         </a>
         <div class="d-md-none">스포츠손상</div>
     </li>
     ```

     ![image-20240628004715734](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240628004715734.png)

2. 큰 글자들은 **모바일에서 제거해야하므로 `flex-item`으로서 원래인 inline이지만 span/b를 `d-none d-md-block`하자**

   ```html
   <li>
       <a href="#" class="d-flex flex-column justify-content-center bg-img-favorite-nav-y-bottom-100%"
          style="background-image: url('./images/png/favorite_nav/부부의료진.png');"
          >
           <span class="favorite-nav-text-sub d-none d-md-block">10년 이상을 같이한</span>
           <b class="favorite-nav-text-main d-none d-md-block">의료진 부부</b>
       </a>
       <div class="d-md-none">의료진</div>
   </li>
   ```

   ![image-20240628005047287](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240628005047287.png)





### 화면버그 by margin 0 auto

3. **grid가 줄어들다가 `특정크기에서 맞춰서 안줄어들고 가로스크롤이 생긴다`**

   ![image-20240628005256568](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240628005256568.png)
   ![image-20240628005303198](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240628005303198.png)

   - **이는 `width의 px로 정해져 있는 상태`에서  `좌우 margin 0 auto`가 있을 때 생긴다고 한다.**

### .layout-center의 container개념은 `width  px+ margin 0 auto`외에 `버그방지용 모바일에서 width:100%`까지 추가되어야한다.



4. mixin.css에 `.layout-center`를 클래스로 정의하고, **모바일에선 width:100%으로 좌우여백없이 자식 너비에 맡기게 한다.**

   - **따로 margin-top이 주어지니 모바일에서 margin0을 주진 않는다.**

   ```css
   /* 즐겨찾는 메뉴 */
   .favorite-nav {
       /*width: 1185px;*/
       /*margin: 0 auto;*/
   
       margin-top: 60px;
   ```

   ```css
   /* container */
   .layout-center {
       width: 1185px;
       margin: 0 auto;
   
       @media (max-width: 767px) {
           width: 100%;
       }
   }
   ```

   - **필요한 section에 반영해주고, 확인한다.**

   ```html
   <section class="favorite-nav layout-center">
   ```

   ![image-20240628005908498](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240628005908498.png)







### 디자인1 grid의 카드 젤 바깥 gap -> height -> box-shadow/border -> bgc 순으로 제거하거나 조절

5. 모바일에선 gap을 행/열 모두 20px로 줄이기

   ```css
   & ul {
       grid-template-columns: repeat(4, 1fr);
       gap: 30px 24px;
       @media (max-width: 767px) {
           gap: 20px;  
       }
   ```

   ![image-20240628010327018](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240628010327018.png)



6. gap보다 안쪽이지만 height는 원래 없었으므로 놔두고, 약가 더 안쪽인 border-radius + box-shadow는 더이상 필요없다.  더 안쪽인 모바일글자 위의 a에 border-raidus가 생길 것이다.

   ```css
   & li {
       box-shadow: 1px 1px 5px var(--black-20);
       border-radius: 15px;
       @media (max-width: 767px) {
           border-radius: 0;
           box-shadow: none;
       }
   ```

   ![image-20240628010933213](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240628010933213.png)





7. **배경색도 더이상 li전체가 아니라, a태그에만 생길 예정이고, li에선 배경을 투명색으로 + hover/focus에 생기는 bgc + border도 모바일에선 사라져야한다.**

   ```css
   & li {
       box-shadow: 1px 1px 5px var(--black-20);
       border-radius: 15px;
   
       /* 기본 회색 배경 + hover/focus시 좀더 어둡게 + 약간 크기 키우기 */
       background-color: #F1F3F6;
       @media (max-width: 767px) {
           border-radius: 0;
           box-shadow: none;
           background-color: transparent;
       }
   
       transition: all .3s;
   
       &:hover, &:focus {
           background-color: var(--greydd);
           transform: scale(1.01);
           @media (max-width: 767px) {
               border: 0;
               background-color: transparent;
               transform: none;
           }
       }
   ```

   ![image-20240628011315733](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240628011315733.png)







### 디자인2 웹의 li 배경색(> a 배경이미지)가 -> 모바일에선 a의 배경색으로?

8. 동적으로 주기 위해 li에 style을 달았지만 **li와 a를 동시에 주기 위해서는 지정된 색에 대한 `.class로 정의하여 내부에서 모바일시 네스티드로 a의 배경색`으로 적용되도록 줘야할 것이다.**

   ```html
   <li class="bgc-dark" style="background-color: #2b5cd2;">
       <a href="#" class="d-flex flex-column justify-content-center bg-img-favorite-nav-md"
          style="background-image: url('./images/png/favorite_nav/초음파.png');"
          >
   ```

   - **이 때, bgc-dark로 색정보 받을 때의 클래스를 따로 입력받아야 하는 상황이니 모두 통합해버리자.**

9. **동적으로 줄 때를 대비해서 `.favorite-menu-색`이름으로 아예 정해버려서**

   - **해당 클래스가 주어지면 `li배경색 -> 모바일 투명` + `글자색 밝게` + `모바일에선 a배경색`으로 작동하도록 색별로 줘야한다.**

   ```css
   /* 즐겨찾는 메뉴 */
   --blueeb: #2b5cd2;
   --rede4: #E4032F;
   --purple6f:#6f49fa;
   --green05: #053863;
   ```

   ```css
   & li {
   
       &.favorite-nav-color-menu {
           /* 1. 글자 밝게 (공통)*/
           text-shadow: 1px 1px 2px var(--black-40);
   
           & a .favorite-nav-text-sub {
               color: var(--greydd);
           }
   
           & a .favorite-nav-text-main {
               color: var(--greyf6);
           }
   
           /* 2. 개별 배경색은 동시 클래스 추가
           1) li의 배경색
           2) 모바일에선 li 투명색 + 자식a 해당 배경색 
           */
   
           &.menu-blue {
               background-color: var(--blueeb);
               @media (max-width: 767px) {
                   background-color: transparent;
                   & a {
                       background-color: var(--blueeb);
                   }
               }
           }
   ```

   ```html
   <!-- type2) li에 동적 배경색 style 지정 + .bgc-dark시 text 하얀 테마로 -->
   <!-- <li class="bgc-dark" style="background-color: #2b5cd2;">-->
   <!-- type2) li에 동적 배경색ㅇ을 -menu + menu-{색}으로 지정하면, 
   내부에서 1) 밝은글씨 2) 웹 li배경 -> 모바일 a에 배경으로 작동 -->
   <li class="favorite-nav-color-menu menu-blue">
       <a href="#" class="d-flex flex-column justify-content-center bg-img-favorite-nav-md"
          style="background-image: url('./images/png/favorite_nav/초음파.png');"
          >
           <span class="favorite-nav-text-sub d-none d-md-block">운동하다 다쳤어요</span>
           <b class="favorite-nav-text-main d-none d-md-block">스포츠손상</b>
       </a>
       <div class="d-md-none">스포츠손상</div>
   </li>
   ```

   ![image-20240628013916425](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240628013916425.png)



10. 나머지 색도 다 만들어준다.

    ![image-20240628014209669](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240628014209669.png)



11. 원래 내부 a는 배경색x(li에 배경색 a내는 이미지만) 잇었는데, **모바일에서는 a에 회색배경을 이미지에 먹히더라도 깔아준다.**

    ```css
    & a {
        @media (max-width: 767px) {
            background-color: #F1F3F6;
        }
    
        padding: 0 30px;
    
        /* 글자사기 간격을 gap으로 처리하기 위해 간격초기화 */
        line-height: 1;
        gap: 12px;
    ```

    ![image-20240628014350396](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240628014350396.png)

12. 배경이미지완 상관없고 안에 내용물도 없어서 상관없지만,  a속 패딩도 제거해준다.

    ![image-20240628023918462](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240628023918462.png)

    ```css
    & a {
        @media (max-width: 767px) {
            background-color: #F1F3F6;
            padding: 0;
        }
    
        padding: 0 30px;
    ```

    









### 디자인3 background-position 모바일에선 무조건 center + size가 각기 다른 것은 각기 다르게 조절

12. `.bg-img-favoriate-nav-`부분을 모바일처리를 추가한다.

    - **기본적으로 background-position: center로 바꾼다.**

    1. **bottom출발 h100%** -> width:auto 처리했떤 것을 **모바일에선 width %로 바꿨다**

    2. **그외에 w px로 줬던 y-center 아이콘들은 반대로 -> height %로 모바일 아이콘을 채웠다.**
       - **이미지 크기가 통일이 안되어있어서 생기는 문제?!**

    ```css
    /* 즐겨찾기 메뉴 */
    
    .bg-img-favorite-nav {
        background: no-repeat right 30px center transparent;
        background-size: 50px auto;
    
        @media (max-width: 767px) {
            background-position: center;
            background-size: auto 75%;
        }
    }
    
    .bg-img-favorite-nav-md {
        background: no-repeat right 15px center transparent;
        background-size: 100px auto;
    
        @media (max-width: 767px) {
            background-position: center;
            background-size: auto 75%;
        }
    }
    
    .bg-img-favorite-nav-lg {
        background: no-repeat right 0 center transparent;
        background-size: 150px auto;
    
        @media (max-width: 767px) {
            background-position: center;
            background-size: auto 70%;
        }
    }
    
    .bg-img-favorite-nav-y-bottom-100\% {
        background: no-repeat right 5px bottom transparent;
        background-size: auto 100%;
    
        @media (max-width: 767px) {
            background-position: center;
            background-size: 90% auto;
        }
    }
    
    .bg-img-favorite-nav-y-bottom-100\%-lg {
        background: no-repeat right -5px bottom -15px transparent;
        background-size: auto 120%;
    
            @media (max-width: 767px) {
            background-position: center;
            background-size: 100% auto;
        }
    }
    ```

    ![image-20240628023943158](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240628023943158.png)









### 아이콘용 border-radius는 크다(36px)

13. 아직 정사각형이 아니라서.. 쭈그라드는 것은 어쩔수없다?

    ```css
    & a {
        @media (max-width: 767px) {
            background-color: #F1F3F6;
            padding: 0;
            border-radius: 36px;
        }
    ```

    

    ![image-20240628024048773](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240628024048773.png)

    ![image-20240628024134862](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240628024134862.png)

    





14. **li `>자식div 속 글자`의 가운데 정렬은 `글자div의 부모인 li에서 줘도 된다.`**

    ```css
    & li {
        box-shadow: 1px 1px 5px var(--black-20);
        border-radius: 15px;
    
        /* 기본 회색 배경 + hover/focus시 좀더 어둡게 + 약간 크기 키우기 */
        background-color: #F1F3F6;
        @media (max-width: 767px) {
            border-radius: 0;
            box-shadow: none;
            background-color: transparent;
            /* 모바일용 div글자 가운데 정렬 */
            text-align: center;
        }
    ```

    ![image-20240628024307556](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240628024307556.png)





15. li의 폰트를 꾸며준다.

    - text-shadow를 제거한다.

    ```css
    & li {
        box-shadow: 1px 1px 5px var(--black-20);
        border-radius: 15px;
    
        /* 기본 회색 배경 + hover/focus시 좀더 어둡게 + 약간 크기 키우기 */
        background-color: #F1F3F6;
        @media (max-width: 767px) {
            border-radius: 0;
            box-shadow: none;
            background-color: transparent;
    
            /* 모바일용 div글자 가운데 정렬 */
            text-align: center;
            font-size: 14px;
            color: var(--grey28);
            font-weight: 600;
            text-shadow: none;
        }
    
    
        &.favorite-nav-color-menu {
            /* 1. 글자 밝게 (공통)*/
            text-shadow: 1px 1px 2px var(--black-40);
            @media (max-width: 767px) {
                text-shadow: none;
            }
        }
    ```

    ![image-20240628024853912](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240628024853912.png)







### a <-> div.글자의 간격은 div에서 pt 으로 벌리자.

![image-20240628025012293](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240628025012293.png)

16. **li > 자식div에 옵션을 안줘서 글자설정을 li에 해줬었는데 `div를 컨트롤 할 일이 생겼으니` 텍스트 옵션을 div로 옮기고 pt만 주자**

    ```css
    & li {
        box-shadow: 1px 1px 5px var(--black-20);
        border-radius: 15px;
    
        /* 기본 회색 배경 + hover/focus시 좀더 어둡게 + 약간 크기 키우기 */
        background-color: #F1F3F6;
        text-shadow: 1px 1px 2px var(--black-20);
        @media (max-width: 767px) {
            border-radius: 0;
            box-shadow: none;
            background-color: transparent;
    
            /* 모바일용 div글자 가운데 정렬 */
            > div {
                text-align: center;
                font-size: 14px;
                color: var(--grey28);
                font-weight: 600;
                text-shadow: none;
    
                padding: 10px 0 0;
            }
        }
        &.favorite-nav-color-menu {
            /* 1. 글자 밝게 (공통)*/
            > div {
                text-shadow: 1px 1px 2px var(--black-40);
                @media (max-width: 767px) {
                    text-shadow: none;
                }
            }
        }
    ```

    ![image-20240628025133418](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240628025133418.png)



### 모바일시 열 갯수 변화

17. 강의에서는 더 줄였지만, **나는 `4 카드 -> 모바일 5개 아이콘`으로  더 늘려서 오히려  더 작고 이쁘게 들어가게 한다.**

    - 그만큼 gap도 줄인다. 행열 갭을 따로 준다.

    ```css
    .favorite-nav {
        /*width: 1185px;*/
        /*margin: 0 auto;*/
    
        margin-top: 60px;
    
        & ul {
            grid-template-columns: repeat(4, 1fr);
            gap: 30px 24px;
            @media (max-width: 767px) {
                /* 모바일에선 카드형이 아이콘으로 5개씩 */
                grid-template-columns: repeat(5, 1fr);
                gap: 1.2rem 1rem;
            }
    ```

    ![image-20240628145916499](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240628145916499.png)







### ✨ 짜부되는 grid icon이 싫다면, [웹 카드용 고정 height px]를 -> [w100% + max-w px + height auto + ratio 1/1 후 + 자신을가운데로 margin 0 auto]를 통해 간격이 늘어도 더 커지지 않고 1:1 유지하도록 

18. 일단 header의 모바일 여백만큼 .layout-center에서도 들어가도록 만든다.

    ```css
    /* container */
    .layout-center {
        width: 1185px;
        margin: 0 auto;
    
        @media (max-width: 767px) {
            width: 100%;
            /* header 모바일 패딩과 동일한 값 */
            padding: 0 15px 0 ;
        }
    }
    ```

    

19. 아이콘을 담당하는 a태그에

    - **width100%로 커지되 `max-width`로 `모바일용 아이콘 특정크기 이상 안커지게` 두고 `height를 auto`로 배정하되 `ratio 1/1`로 고정시킨다.**

    ```cs
    & a {
        padding: 0 30px;
    
        /* 글자사기 간격을 gap으로 처리하기 위해 간격초기화 */
        line-height: 1;
        gap: 12px;
        border-radius: inherit;
    
        height: 120px;
    
        @media (max-width: 767px) {
            background-color: #F1F3F6;
            padding: 0;
    
            border-radius: 18px;
            width: 100%;
            max-width: 60px;
            height: auto;
            aspect-ratio: 1 / 1;
            margin: 0 auto;
        }
    ```

    ![image-20240628162545029](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240628162545029.png)
    ![image-20240628162558768](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240628162558768.png)







### section별 margin-top -> .layout-center으로 이관 후 모바일에서는 상하 padding으로 처리 

20. 기존에는 section에 mt를 따로 부여했지만 **모바일에서는 .layout-center에 변해야한다.**

    ![image-20240628163406138](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240628163406138.png)

    - 현재 모바일에서는 header모바일좌우패딩과 동일한 좌우패딩 들어있는데 **`.layout-center`에서  `웹 mt -> 모바일 mt:0`으로 만들고 `기존 모바일 좌우패딩에 -> 상하패딩`을 추가하자 **

      - **그 이유는 padding <-> margin사이의 border를 처리할 예정이기 때문.**

      ```css
      /* 즐겨찾는 메뉴 */
      .favorite-nav {
          /* .layout-center로 이관 */
          /*width: 1185px;*/
          /*margin: 0 auto;*/
          
          /* section 공통 으로 이관 */
          /*margin-top: 60px;*/
      ```

      ```css
      /* container */
      .layout-center {
          width: 1185px;
          /*margin: 0 auto;*/
          margin: 60px auto 0;
      
          @media (max-width: 767px) {
              margin: 0;
              width: 100%;
              /* header 모바일 패딩과 동일한 값 */
              /*padding: 0 15px 0 ;*/
              /* 모바일에서 section mt까지 대체 */
              padding: 15px ;
          }
      }
      ```

      ![image-20240628163929823](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240628163929823.png)

      ![image-20240628164159672](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240628164159672.png)

    - **section태그 자체는 reset으로 인해 margin padding을 넣으려면 !important가 들어가서 gg?**



## 2 header 검색창을 모바일에서 mainViusal 아래 favoriteNav 위로 처리하기



### 모바일 처리하기

1. 일단 position을 static으로 초기화하고

   ```css
   .search {
   
       /* 웹에선 abs로 -> 모바일에선 html정의한 위치로 */
       position: absolute;
       top: 48px;
       /* header 좌우여백과 동일한 만큼 오른쪽에서 띄워주기*/
       right: 40px;
   
       @media (max-width: 767px) {
           position: static; /* abs 초기화 */
       }
   
   ```

   ![image-20240701000640316](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240701000640316.png)

   - **이 때, input과 button이 flex-item으로 정렬이 안되어있어서, 왼쪽으로 차지하게 된다.**

2. 일단 section들 처럼 좌우 여백을 준다.

   - `section들의 .layout-center`는 **모바일에서, w100% + padding 좌우 15px을 줬었다.**
     - **하지만 `input밖 border`까지가 포함되어야하기 때문에 padding이 아니라 `margin`으로 15보다 좀 더 20px까지 준다.**

   ```css
   .search {
       height: 48px;
       border-radius: 48px;
       border: 1px solid var(--purple);
   
       padding: 0 5px;
   
       line-height: 46px;
       @media (max-width: 767px) {
           position: static; /* abs 초기화 */
           margin: 0 20px;
       }
   ```

   ![image-20240701005515821](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240701005515821.png)





3. **내부 `자식 input의 크기`도 `부모의 margin 등을 제외하고 꽉채우도록 w100%`로** 

   ```css
   > input {
       width: 210px;
       @media (max-width: 767px) {
           width: 100%;
       }
   ```

   

   ![image-20240701005610779](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240701005610779.png)





4. border밖으로 10px씩 여백을 margin을 추가한다.

   ```css
   search {
       @media (max-width: 767px) {
           position: static; /* abs 초기화 */
           margin: 10px 20px;
       }
   ```

   ![image-20240701005741847](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240701005741847.png)





5. 이제 모바일용 border 및 배경색을 걸어준다.

   ```css
   .search {
       
       @media (max-width: 767px) {
           position: static; /* abs 초기화 */
           margin: 10px 20px;
   
           background-color: var(--greyf1);
           border: 1px solid var(--greydd);
       }
   
   ```

   ![image-20240701010113340](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240701010113340.png)



6. input의 배경도 동일한 색으로 되도록 상속한다?!

   - 안되면 같은색 배경 주기

   ```css
   > input {
           width: 210px;
           @media (max-width: 767px) {
               width: 100%;
               background-color: inherit;
           }
   ```

   ![image-20240701010246646](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240701010246646.png)







7. 만약 높이가 달라진다면 or 색이 달라진다면, 배경버튼의 image도달라질 수 있다

   ```css
   & .btn-search {
       width: 46px;
       height: 46px;
       border-radius: 100%;
   
       background-image: url("../../images/svg/icons/search_off.svg");
       @media (max-width: 767px) {
           background-image: url("../../images/svg/icons/search_off_16.svg");
       }
   }
   ```

   ![image-20240701010957532](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240701010957532.png)



8. 바꾼김에 높이랑 글자크기를 줄여보자.

   - 박스의 height + border-radius를 줄인다.
   - input의 높이를 35 -> 27로 줄인다.
   - **placholder는 input의 높이로 lh를 잡고 + fz를 줄인다.**

   ```css
   .search {
   
       height: 48px;
       border-radius: 48px;
   
       @media (max-width: 767px) {
           height: 35px;
           border-radius: 35px;
       }
   
       > input {
           height: 35px;
           @media (max-width: 767px){
               height: 27px;
           }
   
           &::placeholder {
               font-size: 17px;
               line-height: 35px;
           }
   
           @media (max-width: 767px) {
               &::placeholder {
                   font-size: 14px;
                   line-height: 27px;
               }
           }
   
   ```

   ![image-20240701014119968](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240701014119968.png)





## ✨3 alpinejs로 동적으로 검색 input길이 넣기

1. **메뉴**의 너비와 관련되어있으므로 **Alpine.store**에서 처리하려고 함.

   - **x-ref로 각 너비를 구하려했으나 store에서 사용 불가**

   - **그래서 `header에 x-data를 이용해 x-ref로 querySelector를 대신`하고, `전역변수에 할당`해준 뒤 -> `form에서 :style로 input 동적할당`할 예정이다.**

2. **header에 `x-data="header"`를 넣고, 하위 `h1.logo` + `nav.gnb`에 x-ref를 넣어준다.**

   ```html
   <header x-data="header" class="header d-flex justify-content-between justify-content-lg-start align-items-center">
       <h1 class="logo" x-ref="logo">
           <a href="" tabindex="1">
               <img src="images/logo.svg" alt="타이어픽">
           </a>
       </h1>
       <div class="header-nav d-none d-md-flex flex-grow-1 align-items-center justify-content-between">
           <h2 class="sr-only">메뉴</h2>
           <nav class="gnb" x-ref="gnb">
   ```

   

3. header.js에서 x-ref를 사용하기 위한 Alpine.data("header")내부에서 

   - `this.$refs.logo` + `.gnb`의 `.offsetWidth`를 구한다.
   - **이 때, Dom이 다 load되는 것을 기다리기 위해 `this.$nextTick(()=>{})`안에서 처리하게 한다.**

   ```js
   Alpine.data('header', () => ({
       calculateWidths() {
           this.$nextTick(() => {
               const logoWidth = this.$refs.logo.offsetWidth;
               const gnbWidth = this.$refs.gnb.offsetWidth;
   
           },
   ```



4. **이제 header의 너비를 구해서, `-logo - gnb`뿐만 아니라, `gap` - `양쪽padding`도 빼줘야한다.**

   ![image-20240701164340850](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240701164340850.png)

   - **x-ref를 이미 logo에 두었으니, `자식에서 부모찾기 by element.closest('.클래스')`를 이용해서 부모element를 찾을 수 있다.**
   - **`gap과 padding은 window.getComputedStyle(element))` 이후 `.gap, .paddingLeft, .paddingRight`를 하면 px까지 붙어서 나오므로 `parseInt()`까지 붙혀서 int값을 얻어 합산되게 한다.**
   - `header길이 - 좌우패딩- 사이gap`으로 남은 **headerContentWidth**를 구한다.

   ```js
   Alpine.data('header', () => ({
       calculateWidths() {
           this.$nextTick(() => {
               const logoWidth = this.$refs.logo.offsetWidth;
               const gnbWidth = this.$refs.gnb.offsetWidth;
   
               const header = this.$refs.logo.closest('.header');
               const headerWidth = header.offsetWidth;
               const headerPadding = parseInt(window.getComputedStyle(header).paddingLeft) + parseInt(window.getComputedStyle(header).paddingRight);
               const headerGap = parseInt(window.getComputedStyle(header).gap);
               const headerContentWidth = headerWidth - headerPadding - headerGap;
   
           });
       },
   }));
   ```

   - **logo길이와 gnb길이를 빼면 `Search의 길이`가 나오지만, `this.$store`의 전역에 넘겨서 계산하게 한다.**
     - **Search - 버튼너비를 빼면, `input의 길이`**

5. 일단 전역으로 `logoWidth, gnbWidth, headerContentWidth` 외 **logo <-> gnb와 똑같은 너비로 띄우기 위해 `headerGap`도 같이 넘겨준다.**

   - init()에서 실행하고 resize될때마다 실행한다.
   - **setter로 메서드를 짓는다.**

   ```js
   Alpine.data('header', () => ({
       calculateWidths() {
           this.$nextTick(() => {
               const logoWidth = this.$refs.logo.offsetWidth;
               const gnbWidth = this.$refs.gnb.offsetWidth;
   
               const header = this.$refs.logo.closest('.header');
               const headerWidth = header.offsetWidth;
               const headerPadding = parseInt(window.getComputedStyle(header).paddingLeft) + parseInt(window.getComputedStyle(header).paddingRight);
               const headerGap = parseInt(window.getComputedStyle(header).gap);
               const headerContentWidth = headerWidth - headerPadding - headerGap;
   
               this.$store.megamenu.setSearchAndInputWidths(headerContentWidth, logoWidth, gnbWidth, headerGap);
           });
       },
       init() {
           this.calculateWidths();
           window.addEventListener('resize', () => {
               this.calculateWidths();
           })
       },
   }));
   ```

6. **전역에서는 받은 변수들로 searchWidth, searchInputWidth를 계산한다.**

   - 이 때, search안에 검색버튼의 길이를 빼줘야하니, querySelector로 찾는다.
     - 버튼길이땜에 x-data를 form에 넣기는 보류. 일단 headers.js에 넣을순 없다.

   ```js
   Alpine.store('megamenu', {
   
       setSearchAndInputWidths(headerContentWidth, logoWidth, gnbWidth, gapBetweenLogoAndGnb) {
           this.searchWidth = headerContentWidth - logoWidth - gnbWidth - gapBetweenLogoAndGnb; 
   
           const searchBtnWidth = document.querySelector('.search .btn-search').offsetWidth;
   
           this.searchInputWidth = this.searchWidth - searchBtnWidth; 
       },
   ```

7. **이제 search input태그에 `:style=`로 width를 동적으로 준다.**

   - **이 때 한도까지 커질 수 있기 때문에 , `원래 css에서 줬던 width를 max-width로 바꿔`준다.**

   ```css
   .search {
       > input {
           /* 동적으로 width 삽입 -> 기존 너비는 max-width로 */
           /*width: 365px;*/
           max-width: 365px;
   ```

   ```html
   <form action="">
       <h2 class="sr-only">검색</h2>
       <div class="search d-flex align-items-center">
           <input type="search" placeholder="참석여부 알려주기"
                  title="검색어 입력"
                  :style="`width: ${$store.megamenu.searchInputWidth}px`"
                  >
           <button aria-label="검색" class="btn-search bg-img"></button>
       </div>
   </form>
   ```

   ![image-20240701171555895](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240701171555895.png)

   ![image-20240701171603438](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240701171603438.png)

8. **이제 모바일에서도 width가 동적으로 조정되고 있으니**

   ![image-20240701171800953](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240701171800953.png)

   - **w100%를 `important`로 안바뀌게 만든다.**
     - 동적인 width삽입은 모바일에서만 적용되도록은 못하므로..
     - **max-width도 정해놨으니 100%로 바꾼다.**

   ```css
   > input {
       /* 동적으로 width 삽입 -> 기존 너비는 max-width로 */
       /*width: 365px;*/
       max-width: 365px;
       height: 35px;
       @media (max-width: 767px) {
           /* 웹 동적 input조절로 바뀌니, 모바일에선 !impotant로 고정 */
           /*width: 100%;*/
   		width: 100%!important;
   		max-width: 100%;
           height: 27px;
           background-color: inherit;
       }
   ```

   

## 4 border-bottom으로 모바일 섹션구분 추가하기

1. 여러section에  공통으로 적용될 예정이니 `main.css`에 추가한다.

   ```css
   /* 모바일 section 구분 border-bottom */
   .section-border {
       @media (min-width: 0px) and (max-width: 769px) {
           border-bottom: .8rem solid var(--greyf1);
       }
   }
   ```

   ![image-20240701032404658](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240701032404658.png)