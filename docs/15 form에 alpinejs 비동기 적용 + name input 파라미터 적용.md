

- 최신버전
  - github:https://github.dev/mizzu-creations/tire-pick-responsive/blob/bf688e41f46dd982dd105813d582aad91d9e58d5/index.html
  - demo: https://tire-pick.vercel.app/



## form

### ✨ new Formdata()에 form element를 x-ref찾아서 갖다넣으면 fetch에 보낼 body 데이터가 되지만, console에는 안찍히더라.



#### 기존 js코드는 byId로 찾은 form의 "submit" 이벤트에 이벤트리스너를 걸어서 fetch

```js
<script>
    window.addEventListener("load", function () {
    const form = document.getElementById('attending-form');
    form.addEventListener("submit", function (e) {
        e.preventDefault();
        const data = new FormData(form);
        console.log('data', data)
        const action = e.target.action;
        fetch(action, {
            method: 'POST',
            body: data,
        }).then(() => {
            alert("참석여부가 전달됬어요!");
        })
    });
});
</script>
```



#### alpinejs 버전

1. form에서 `x-data`, `x-ref` (new FormData()용 / action /method추출)  form으로 선언한다.

   ```html
   <!-- inline forms -->
   <form class="position-relative row row-cols-md-auto align-items-center justify-content-center"
         method="POST"
         action="https:"
         id="attending-form"
         x-data="form"
         x-ref="form"
         >
   ```

2. Alpine.data로 선언한다

   ```js
   Alpine.data('form', () => ({
   
   }));
   ```

3. **이제 submit을 통제하기 위해 `@submit.prevent="handleSubmit"`을 선언한다.**

   ```html
   <form class="position-relative row row-cols-md-auto align-items-center justify-content-center"
         method="POST"
         action="https:"
         x-data="form"
         x-ref="form"
         @submit.prevent="handleSubmit"
         >
   ```

4. 이제 **js에서 처리를 한다.**

   - 일단 event를 인자로 받아들일 수 있는데, 선언시에는 handleSubmit에 ()호출없이 선언해야 가능하다.
   - 아직 loading화면 등이 준비없으므로 매번 기다릴 수 없어서 바로 

   - **async로 메서드를 정의하고 혹시 모르니 e를 인자로 받아놓는다.**

   - **`this.$refs.`를 통해 x-ref="form"의 element를 getById없이 사용한다.**

     - new FormData( form )에 넣어 fetch에 보낼 body를 준비한다.
     - form.action으로 form에 적힌 action을 / form.method를 통해 method를 가져온다.

   - 실패를 대비해 try catch 안에서 `await fetch`를 호출한다.

     - method와  body에 form.method, new FomrData(form)을 할당하면 된다.

     - response 응답이 .ok냐 아니냐에 따라서 처리한다.
     - **form.reset()은 호출하지 않는다. alpinejs가 얽힘.**
     - 중간에 전역변수 modal을 close한다.
       - `this.$store.modal.close();`

   ```js
   Alpine.data('form', () => ({
       async handleSubmit(e) {
           const form = this.$refs.form;
   
           const data = new FormData(form);
           const action = form.action;
           const method = form.method;
   
           console.log('action', action);
           console.log('method', method);
   
           try {
               const response = await fetch(action, {
                   method: method,
                   body: data,
               });
   
               this.$store.modal.close();
   
               if (response.ok) {
                   alert('참석여부가 전달됐어요!');
                   // form.reset();
               } else {
                   alert('전송 실패. 다시 시도해 주세요.');
               }
           } catch (error) {
               alert('전송 중 오류가 발생했습니다. 신랑/신부에게 알려주세요.');
           }
       },
   }));
   ```

   





## name 일반input에는 alpinejs없이 바로밑에 script로 queryparam 할당시키기

일단 해당 input에 alpinjes를 적용안시키고, 바로 밑에 script로 적용했다.

```html
<!-- 성함 -->
<div class="col-12">
    <div class="form-group d-flex flex-column">
        <label for="name" class="form-label">성함</label>
        <div class="form-input-wrapper md-max-width-200 d-flex align-items-center">
            <input type="text" class="form-input" id="name" name="성함"
                   placeholder="이름을 입력해주세요"
                   >
        </div>
    </div>
</div>
<script>
    const urlParams = new URLSearchParams(window.location.search);
    // const name = urlParams.get('name') || '';
    const name = urlParams.get('name') || '';
    document.querySelector('#name').value = name;
</script>
```





### ✨✨ 마지막 input enter시 문제 -> 취소버튼이 먼저 나와서 취소버튼이 자동 실행 -> 순서를 바꿔서 html을 정의하고 order-2, order-1 순으로 반대로 나오도록 만들기

```html
<!-- 전달 버튼 -->
<div class="col-12 form-buttons-wrapper position-sticky bottom-0 position-md-static text-center">
    <!-- 모바일 위쪽 그라디언트 -->
    <div class="form-buttons-bottom-gradient d-md-none"></div>
    <div class="form-buttons d-flex gap-2">
        <!-- 보이기는 전달버튼이 우측 뒤에 나오나, 마지막input enter잇슈로 먼저 html 정의 -->
        <button class="order-2 button-modal modal-purple"
                :disabled="loading"
                x-text="!loading ? '전달하기' : '전송 중...'"
                >전달하기
        </button>
        <!--@click="$store.modal.close()"-->
        <button class="order-1 button-modal modal-cancel d-md-none"
                @click.prevent="$store.modal.close()"
                :disabled="loading"
                >취소
        </button>
    </div>
</div>
```

