document.addEventListener('alpine:init', () => {
    Alpine.data("gallery", () => ({
        data: [
            {
                thumbnail: "https://picstargram.s3.ap-northeast-2.amazonaws.com/post/e50fb6df-a129-441e-9c33-d962473253d0_thumbnail.webp",
                image: "https://picstargram.s3.ap-northeast-2.amazonaws.com/post/e50fb6df-a129-441e-9c33-d962473253d0_1024.webp",
                caption: "1번 사진이에요",
            },
            {
                thumbnail: "https://picstargram.s3.ap-northeast-2.amazonaws.com/post/e50fb6df-a129-441e-9c33-d962473253d0_thumbnail.webp",
                image: "https://picstargram.s3.ap-northeast-2.amazonaws.com/post/e50fb6df-a129-441e-9c33-d962473253d0_1024.webp",
                caption: "이현이 사진",
            },
            {
                thumbnail: "https://picsum.photos/id/301/416/650",
                image: "https://picsum.photos/id/301/200/300",
                caption: "3번 사진이에요",
            },
            {
                thumbnail: "https://picsum.photos/id/302/416/650",
                image: "https://picsum.photos/id/302/1200/650",
                caption: "4번 사진이에요",
            },
            {
                thumbnail: "https://picsum.photos/id/304/416/650",
                image: "https://picsum.photos/id/304/1200/650",
                caption: "5번 사진이에요",
            },
            {
                thumbnail: "https://picsum.photos/id/305/416/650",
                image: "https://picsum.photos/id/305/1200/650",
                caption: "6번 사진이에요",
            },
            {
                thumbnail: "https://picsum.photos/id/305/416/650",
                image: "https://picsum.photos/id/305/1200/650",
                caption: "7번 사진이에요",
            },
            {
                thumbnail: "https://picsum.photos/id/306/416/650",
                image: "https://picsum.photos/id/306/1200/650",
                caption: "8번 사진이에요",
            },
        ],
        isMobile: false,
        ligthboxGalleryName: 'gallery',

        slider: null,
        total: null, // 총 갯수. custom으로서 .d-none을 제외시킴.
        skip: 1, // 몇장씩 넘어갈지
        active: 1, // 첫번쨰 시작 slide
        interval: 3000,
        autoplay: false,
        direction: 'right',


        init() {
            window.addEventListener("resize", () => {
                this.checkMobile();
            }, );

            this.$nextTick(() => {
                this.slider = this.$refs.gallery_slider;

                // this.total = this.$refs.gallery_slider.children.length;
                // children에서 .d-none 클래스(멘트 grid)를 가진 자식을 제외
                const filteredChildren = Array.from(this.slider.children).filter(child => {
                    return !child.classList.contains('d-none');
                });
                this.total = filteredChildren.length;
            });
            this.checkMobile();
        },

        to(strategy) {
            // strategy는 전략객체로서, 외부에서 계산식을 건네주면, 우리는 내부데이터(current, offset)을 가지고
            // 익명함수 ( , ) => 로 호출만 하면, 외부 전략 계산식이 자동 계산된 값이 입력된다.

            const current = this.slider.scrollLeft;
            const offset = this.slider.firstElementChild.getBoundingClientRect().width;

            this.slider.scrollTo({
                left: strategy(current, offset),
                behavior: 'smooth'
            });
        },
        prev() {
            this.to((current, offset) => current - (offset * this.skip))
        },
        next() {
            this.to((current, offset) => current + (offset * this.skip))
        },

        checkMobile() {
            const screenWidth = window.innerWidth;
            const mobileMaxWidth = 767;
            this.isMobile = screenWidth <= mobileMaxWidth;
            console.log("isMobile", this.isMobile);
        },

    }));
});