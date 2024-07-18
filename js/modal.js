document.addEventListener('alpine:init', () => {
    Alpine.store('modal', {
        // isOpen: false,
        isOpen: true,
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
        // isOpen: false,
        isOpen: true,
        init() {
            this.$watch(() => Alpine.store('modal').isOpen, value => {
                this.isOpen = value;
            });

            Alpine.store('modal').handleBodyScroll();
        },
    }));
});