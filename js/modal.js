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
            this.handleBodyScroll();
        },
        close() {
            this.isOpen = false;
            this.handleBodyScroll();
        },
        handlePopState() {
            alert("popstate")
            if (this.isOpen) {
                this.close();
            }
        },
        init() {
            // 뒤로가기 버튼 이벤트 리스너 추가
            window.addEventListener('popstate', this.handlePopState);

            window.addEventListener("hashchange", function (e) {
                if (e.oldURL.length > e.newURL.length)
                    alert("hashchange")
            });
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