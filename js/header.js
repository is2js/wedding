document.addEventListener('alpine:init', () => {
    // Stores variable globally
    Alpine.store('megamenu', {
        /* megamenu toggle 관련  */
        isOpen: false,
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
            // TODO: Array(this.data.length).fill(false);
            this.isGnbOpens = Array.from({length: 5}, () => false);
        },
        /* header abs search width 계산용 */
        searchWidth: 0,
        searchInputWidth: 0,
        setSearchAndInputWidths(headerContentWidth, logoWidth, gnbWidth, gapBetweenLogoAndGnb) {
            this.searchWidth = headerContentWidth - logoWidth - gnbWidth - gapBetweenLogoAndGnb;
            const searchBtnWidth = document.querySelector('.search .btn-search').offsetWidth;
            this.searchInputWidth = this.searchWidth - searchBtnWidth;
        },
    });

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

                // console.log('logoWidth', logoWidth);
                // console.log('gnbWidth', gnbWidth);
                // console.log('totalWidth', headerWidth);
                // console.log('headerPadding', headerPadding);
                // console.log('headerGap', headerGap);
                // console.log('headerContentWidth', headerContentWidth);

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
})