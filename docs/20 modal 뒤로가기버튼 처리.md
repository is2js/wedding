- 참고: https://velog.io/@chldmswnl/React-%EC%9B%B9%EB%B7%B0-%EB%AA%A8%EB%8B%AC%EC%B0%BD-%EC%95%88%EB%93%9C%EB%A1%9C%EC%9D%B4%EB%93%9C-%EB%92%A4%EB%A1%9C%EA%B0%80%EA%B8%B0-%EB%B2%84%ED%8A%BC-%EC%A0%9C%EC%96%B4%ED%95%98%EA%B8%B0
- 참고2: chatgpt

### open시 history stack쌓기

1. **open() 메서드에 `history.push()`로 1개를 쌓아둔다.**

   ```js
   open() {
       this.isOpen = true;
       console.log('this.isOpen', this.isOpen);
       this.handleBodyScroll();
       // android back 1
       history.pushState(null, '', location.href);
   },
   ```

   - 그 결과 stack이 쌓여 뒤로가기가 활성화된다.

     ![image-20240725232426976](https://raw.githubusercontent.com/is2js/screenshots/main/image-20240725232426976.png)

     

     

     

### init에서 뒤로가기 버튼 등의 history변화를 'popstate' 이벤트리스너에 this.method.bind(this)로 감지시켜놓기

2. modal store의 init에 **popstate이벤트리스너를 추가한다**

   - 이 때, **`this.메서드.bind(this)`를 통해 `현재 alpinejs 상태`여야만 isOpen등의 `alpinejs내 변수`를 인식할 수 있게 된다.**
     - 따라서, 코드에서 `window.addEventListener('popstate', this.handlePopState.bind(this));`는 사용자가 뒤로 가기 버튼을 클릭할 때 `handlePopState` 메서드를 호출하여 모달을 닫도록 하기 위한 것입니다. `bind(this)`를 사용하여 `handlePopState` 내부에서 `this`가 `modal` 객체를 참조하도록 보장합니다.

   ```js
   Alpine.store('modal', {
   
       init() {
           // android back 2 뒤로가기 버튼 등 history변화 이벤트 리스너 추가
           window.addEventListener('popstate', this.handlePopState.bind(this));
       }
   });
   ```





### 감지시 작동하는 handlePopstate 메서드 정의

3. **popstate이벤트로 히스토리 변화가 감지되면 `this.isOpen`상태일 때, `모달을 .close()`해주면 되는데**

   - **문제는 `뒤로가기 버튼`을 누름 ->`stack이 사라진 상태`이므로 history.back()이 호출안되게 해야한다.**
   - 다행히 open()메서드는 매번 history stack을 쌓아놔서, 뒤로가기버튼을 눌러 stack이 사라진 상태라 따로 `history.back()`을 안해도 된다.

   - **그렇다면, close()에 default파라미터로 history를 직접변환유무 = false로 해놓고, 기존close()메서드들이 history 직접변환안하게 한다.**

   ```js
   // android back 3
   handlePopState() {
       if (this.isOpen) {
           // 실제로 back버튼을 눌러서 사라진 stack에-> 추가적인 history.back() 호출 방지
           this.close(false); 
       }
   },
   ```

   - 만약, 감지되어도, 실제 back을 수행해야하는 경우는 `close(true)`를 해서 modal닫히고도 또 뒤로 가야하는 경우인데, open이 항상 stack을 쌓아놓고, 그 뒤로 갈 일이 없어서 추가적인 back()은 호출될 필요는 없을 것 같다.



4. 이제 기존 close() ->  close(updateHistory= false)를 정의해놓고, 혹시나 true가 오면 back()을 한번 더 호출하게 해준다.

   ```js
   // close() {
   // android back 4
   close(updateHistory = false) {
       this.isOpen = false;
       this.handleBodyScroll();
       // android back 5
       if (updateHistory) {
           history.back();
       }
   },
   ```

   

