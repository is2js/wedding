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
        isFullScreen: false,
        toggleFullscreen() {
            if (!document.fullscreenElement) {
                const sectionElement = this.$el.closest('section');

                if (sectionElement.requestFullscreen) return sectionElement.requestFullscreen();
                if (sectionElement.webkitRequestFullscreen) return sectionElement.webkitRequestFullscreen();
                if (sectionElement.mozRequestFullScreen) return sectionElement.mozRequestFullScreen();
                if (sectionElement.msRequestFullscreen) return sectionElement.msRequestFullscreen();
            } else {
                // this.isFullScreen = false;
                if (document.exitFullscreen) return document.exitFullscreen();
                if (document.webkitCancelFullscreen) return document.webkitCancelFullscreen();
                if (document.mozCancelFullScreen) return document.mozCancelFullScreen();
                if (document.msExitFullscreen) return document.msExitFullscreen();
            }
        },
        fullscreenChangeHandler() {
            // 현재 전체화면 상태를 확인 -> 여부에 따라 상태값 변경 -> view에서 icon변경
            this.isFullScreen = !!document.fullscreenElement;
        },
        init() {
            /* megamenu toggle 관련  */
            // Watch for resize and close megamenu if window width >= 768
            window.addEventListener('resize', () => {
                if (window.innerWidth >= 768) {
                    this.close();
                }
                this.checkMobile();
            })
            this.checkMobile();

            /* gnb 메뉴 토글 관련  */
            // TODO: Array(this.data.length).fill(false);
            this.isGnbOpens = Array.from({length: 5}, () => false);

            // fullscreenchange 이벤트 인지
            document.addEventListener('fullscreenchange', this.fullscreenChangeHandler.bind(this));
        },
        /* header abs search width 계산용 */
        searchWidth: 0,
        searchInputWidth: 0,
        setSearchAndInputWidths(headerContentWidth, logoWidth, gnbWidth, gapBetweenLogoAndGnb) {
            this.searchWidth = headerContentWidth - logoWidth - gnbWidth - gapBetweenLogoAndGnb;
            const searchBtnElement = document.querySelector('.search .btn-search');
            if (!searchBtnElement) return;
            const searchBtnWidth = searchBtnElement.offsetWidth;
            this.searchInputWidth = this.searchWidth - searchBtnWidth;
        },
        isMobile: null,
        checkMobile() {
            const screenWidth = window.innerWidth;
            const mobileMaxWidth = 767;
            this.isMobile = screenWidth <= mobileMaxWidth;
        },

    });

    Alpine.store('audio', {
        isPlaying: false,
        toggleAudio() {
            const song = document.getElementById('song');

            if (this.isPlaying) {
                song.pause();
            } else {
                song.volume = 0.1;
                song.play();
            }

            this.isPlaying = !this.isPlaying;
            localStorage.setItem('audio', JSON.stringify(this.isPlaying))
        },
        playAudio() {
            // 이미 켜져있거나
            if (this.isPlaying) {
                return
            }

            // 기록이 있으면서 & 과거에 끈 적이 있으면 -> 안킨다.
            const audioDB = JSON.parse(localStorage.getItem('audio'));
            if (audioDB !== null && !audioDB) {
                return
            }

            this.toggleAudio();
        },
    });

    Alpine.store('hero', {
        isEntrance: false,

        init() {
            window.addEventListener('resize', () => {
            })
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

                this.$store.megamenu.setSearchAndInputWidths(headerContentWidth, logoWidth, gnbWidth, headerGap);
            });
        },
        onTop: true,
        isEntranced: false,
        setIsEntranced() {
            // hero에서 전역변수에 입장완료를 주면, header는 1초후 입장완료상태로 인식할 수 있다.
            if (this.$store.hero.isEntrance) {
                setTimeout(() => {
                    this.isEntranced = true;
                }, 800)
            }
        },
        isHovered: false,
        isFocused: false,

        setOnTop() {
            // console.log('setOnTop')
            //this.onTop = (window.pageYOffset || document.documentElement.scrollTop) === 0;
            // top의 기준을 0으로 주면, x-show로 사라지는 spot-menu가 스크롤보다 더 작아지면서 0에 한번 더 도달해서 버그
            // top의 기준을 여유 있게 header의 높이로 주고, 그것을 초과해야 top이 아닌 상태
            // this.onTop = (window.pageYOffset || document.documentElement.scrollTop) <= this.$el.offsetHeight;
            // 모바일시에는 기준을 좀 낮춘다.
            if (this.$store.megamenu.isMobile) {
                this.onTop = (window.pageYOffset || document.documentElement.scrollTop) === 0;
            } else {
                this.onTop = (window.pageYOffset || document.documentElement.scrollTop) <= this.$el.offsetHeight;
            }
        },
        setMarginBottom() {
            this.$nextTick(() => {
                this.$el.style.marginBottom = `-${this.$el.offsetHeight}px`
            });
        }, init() {
            this.calculateWidths();

            this.setMarginBottom();

            // this.setOnTop();
            // entrance이후에 setOnTop 시작 / 그전까진 onTop: true

            window.addEventListener('resize', () => {
                this.calculateWidths();

                this.setMarginBottom();
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