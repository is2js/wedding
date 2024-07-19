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