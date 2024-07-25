document.addEventListener('alpine:init', () => {
    Alpine.store('modal', {
        // isOpen: true,
        isOpen: false,
        handleBodyScroll() {
            if (this.isOpen) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        },
        open() {
            this.isOpen = true;
            console.log('this.isOpen', this.isOpen);
            this.handleBodyScroll();
            // android back 1
            history.pushState(null, '', location.href);
        },
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
        // android back 3
        handlePopState() {
            if (this.isOpen) {
                // 실제로 back버튼을 눌러서 사라진 stack에-> 추가적인 history.back() 호출 방지
                this.close(false);
            }
        },
        init() {
            // android back 2 뒤로가기 버튼 등 history변화 이벤트 리스너 추가
            window.addEventListener('popstate', this.handlePopState.bind(this));
        }
    });

    Alpine.data('mobileModal', () => ({
        // isOpen: true,
        isOpen: false,
        init() {
            this.$watch(() => Alpine.store('modal').isOpen, value => {
                this.isOpen = value;
            });

            Alpine.store('modal').handleBodyScroll();
        },
    }));
});