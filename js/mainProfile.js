document.addEventListener('alpine:init', () => {
    Alpine.data("profile", () => ({
        data: [
            {
                image: "images/png/profile/bride.png",
                thumbnail: "images/png/profile/thumbnail/bride.png",
                bg: "images/jpg/profile/bg/bride.jpg",
                name: "김석영",
                parents: "김용범과 홍선희의 장녀",
                role: "예비신부",
                bio: "한의사 직업군으로 활동하고 있는 김석영이라고 해요. 공감과 소통에 관심이 많고 스포츠를 좋아하는 여성입니다^^",
                account: {
                    bank: '신한',
                    number: '110-123-456789'
                },
                phone: '010-5400-8397',
            },
            {
                image: "images/png/profile/husband.png",
                thumbnail: "images/png/profile/thumbnail/husband.png",
                bg: "images/jpg/profile/bg/husband.jpg",
                name: "조재성",
                parents: "조귀남과 故류정이의 장남",
                role: "예비신랑",
                bio: "한의사 직업군으로 활동하고 있는 조재성입니다. 통계와 프로그래밍을 취미로 하고 운동을 좋아합니다.",
                account: {
                    bank: '신한',
                    number: '110-123-456789'
                },
                phone: '010-4600-6243',
            },
        ],
        profile_swiper: null,
        image_swiper: null,
        currentIndex: 0,
        init() {
            // text-swiper
            this.profile_swiper = new Swiper(this.$refs.profile_swiper, {
                direction: 'vertical',
                spaceBetween: 10,
                autoHeight: true, // .swiper-slide { height: auto !important; } 이후 사용
                // loop: true,
                loop: false,
                allowTouchMove: false,
                init: false, // Dom에서 x-for를 다 처리하고 난 뒤, 직접 초기화할 예정
                // autoplay: {
                //     delay: 1000,
                //     disableOnInteraction: false
                // },
            });

            // image-swiper
            this.image_swiper = new Swiper(this.$refs.image_swiper, {
                //direction: 'vertical',
                // autoHeight: true, // .swiper-slide { height: auto; } 이후 사용
                // loop: true,
                loop: false,
                loopedSlides: 2,
                // allowTouchMove: false,
                init: false, // Dom에서 x-for를 다 처리하고 난 뒤, 직접 초기화할 예정

                // image 전용
                // autoplay: true,
                // speed: 3000,
                slidesPerView: 1,
                spaceBetween: 0,
                breakpoints: {
                    330: {
                        slidesPerView: 1.1,
                        spaceBetween: 0,
                    },
                    360: {
                        slidesPerView: 1.25,
                        spaceBetween: 10,
                    },
                    450: {
                        slidesPerView: 1.4,
                        spaceBetween: 10,
                    },
                }
                //     550: {
                //         slidesPerView: 2,
                //     },
                //     650: {
                //         slidesPerView: 1.5,
                //     },
                //     850: {
                //         slidesPerView: 1.8,
                //     },
                //     1000: {
                //         slidesPerView: 2.1,
                //     },
                //     1200: {
                //         slidesPerView: 2.5,
                //     },
                // }
            });

            // image swiper slideChange마다 -> 다른 swiper sliding
            this.image_swiper.on('slideChange', () => {
                this.sliding();
            });

            // wait for alpine finishing the DOM manipulation
            this.$nextTick(() => {
                this.profile_swiper.init();
                this.image_swiper.init();

                //slides are ready, rerender the slider
                //this.profile_swiper.update();
                // this.image_swiper.update();
            });
        },
        sliding() {
            // for bg img :src = "data[currentIndex].bg"
            this.currentIndex = this.image_swiper.realIndex;
            this.profile_swiper.slideToLoop(this.currentIndex, 500);
        },
        prevSlide() {
            this.image_swiper.slidePrev(1000);
            this.sliding();
        },
        nextSlide() {
            this.image_swiper.slideNext(1000);
            this.sliding();
        },

        copyToClipboardAndAlert(text, message) {
            navigator.clipboard.writeText(text);
            alert(message);
        }
    }));
});