

- 최신버전
  - github:https://github.dev/mizzu-creations/tire-pick-responsive/blob/bf688e41f46dd982dd105813d582aad91d9e58d5/index.html
  - demo: https://tire-pick.vercel.app/



## js로 구현(export -> import -> global 등록)

1. util.js에 `navigator.clipboard.writeText(text);`를 활용해서 clipboard 유틸을 만든다.

   ```js
   const addComma = (number) => {
       if (number !== null) {
           return number.toLocaleString();
       }
   };
   
   const copyToClipboardAndAlert = (text, message) => {
       navigator.clipboard.writeText(text);
       alert(message);
   };
   
   export {addComma, copyToClipboardAndAlert};
   ```



2. mainProductCardTemplate.js에서 import한 뒤 계좌번호 렌더 메서드에 추가한다.

   ```js
   import { addComma, copyToClipboardAndAlert } from "./utils.js";
   ```

   - **이 때, class에 cursor-pointer를 추가하여 클릭가능한 표시를 추가**

   ```js
   function renderAccount(account, familyName) {
       if (!account) return '';
       return `<div class="product-account bg-img bg-img-x-left d-flex align-items-center mt10 ellipsis cursor-pointer"
                   onclick="copyToClipboardAndAlert(
                       '${account.number}', 
                       '${familyName.family} ${familyName.name}님의 \\\\n${account.bank}은행 ${account.number}\\\\n계좌번호가 복사되었습니다.'
                   )"
       >
           계좌번호 복사
       </div>`;
   }
   
   ```

   ![image-20240718155445525](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240718155445525.png)



### template.js에서 import한 유틸이지만, 실제 js유틸메서드는 global에서 사용되기 때문에 window.유틸명 = 유틸 을 등록해야한다.

3. template구성에서 유틸메서드를 import했지만, **js가 실제로 사용되려면 global에 등록되어있어야한다.**

   - addComma는 html을 만드는데 그치지만
   - clipboard는 global에서 렌더 후 사용까지 되어야한다.

   ```js
   import { addComma, copyToClipboardAndAlert } from "./utils.js";
   // Make the function globally accessible
   window.copyToClipboardAndAlert = copyToClipboardAndAlert;
   ```

   ![image-20240718155633280](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240718155633280.png)



## alpinejs로 구현(magic -> export default -> import -> Alpine.plugin에 등록)



1. [alipnejs extending 코너](https://alpinejs.dev/advanced/extending)의 예시를 활용한다.

2. utils.js에 Alpine.magic()만 등록하고 `export default`로 function(Alpine)을 받는 메서드로 반환한다.

   ```js
   const addComma = (number) => {
       if (number !== null) {
           return number.toLocaleString();
       }
   };
   
   export {addComma }
   export default function (Alpine) {
       Alpine.magic('clipboard', () => (text, message) => {
           navigator.clipboard.writeText(text);
           alert(message);
       })
   }
   ```

   

3. template.js에 js function import와 별개로 **export default function을 임의의 변수명으로 import**한다

   - 임의의 변수명을 Alpinie.plugin()에 등록하면 된다.

   ```js
   import { addComma } from "./utils.js";
   
   // alpinejs 유틸(magic, directive)은 함수명이 아니라 통째로 임의의 변수명으로 통째로 가져와서 Alpine.plugin()에 등록
   import AlpineUtil  from "./utils.js";
   Alpine.plugin(AlpineUtil);
   ```



4. **plugin으로 등록된 Alpine.magic을 `$매직명`으로 사용한다.**

   ```js
   function renderAccount(account, familyName) {
       if (!account) return '';
       return `<div class="product-account bg-img bg-img-x-left d-flex align-items-center mt10 ellipsis cursor-pointer"
                   @click="$clipboard(
                       '${account.number}', 
                       '${familyName.family} ${familyName.name}님의 \\n${account.bank}은행 ${account.number}\\n계좌번호가 복사되었습니다.'
                   )"
       >
           계좌번호 복사
       </div>`;
   }
   ```

   







## phone도 조절

1. 추후 slide를 싸고 있는 `a.product.d-block`을 dateType에 따라 다르게 처리해야한다.

   - **a태그안에 a[href=]가 들어가면 html이 깨진다.**

   ```js
   const createProductCard = (data) => {
   
   // product면 slide 전체를 a태그로
       // family라면, slide 전체를 div로 가져 -> 내부 a태그 for tel: 가져도 에러 안나게
       // <a class="product d-block">
       return `<div class="swiper-slide">
       <div class="product d-block">
           <figure>
   ```



2. renderPhone부분을 `div -> a href="tel:${phone}"`으로 바꿔서 클릭시 전화가 걸리게 한다.

   ```js
   function renderPhone(phone) {
   
       if (!phone) return '';
   
       return `<a class="product-mobile bg-img bg-img-x-left d-flex align-items-center mt14 ellipsis cursor-pointer"
   href="tel:${phone}"
   >
           전화 걸기
       </a>`;
   }
   ```

   



3. css중에 div를 적어둔게 있는데 a도 포함시키자.

   ```css
   /* figcaption 텍스트들은 tag제외하곤 ellipsis를 준다.*/
   > div:not(.product-hashtag), a:not(.product-hashtag) {
       width: 100%;
   
       white-space: nowrap;
       overflow: hidden;
       text-overflow: ellipsis;
   }
   ```

   