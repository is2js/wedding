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
        // android back 2
        close(updateHistory = true) {
            this.isOpen = false;
            console.log('this.isOpen', this.isOpen)
            this.handleBodyScroll();
            // android back 3
            if (updateHistory) {
                   history.back();
               }
        },
        // android back 4
        handlePopState() {
            console.log('this.isOpen in handlePopState', this.isOpen)
            // alert("popstate")
            if (this.isOpen) {
                this.close(true); // history.back() 호출 방지
            }
        },
        init() {
            // android back 뒤로가기 버튼 이벤트 리스너 추가
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