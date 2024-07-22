

document.addEventListener('alpine:init', () => {
    Alpine.data("gallery", () => ({
        data: [
            {
                thumbnail: "https://picstargram.s3.ap-northeast-2.amazonaws.com/post/6fd70594-96ed-4d36-90ca-8db6ff26dbdb_512.webp",
                image: 'https://picstargram.s3.ap-northeast-2.amazonaws.com/post/6fd70594-96ed-4d36-90ca-8db6ff26dbdb_1920.webp',
                caption: "1번 사진이에요",
            },
            {
                thumbnail: 'https://picstargram.s3.ap-northeast-2.amazonaws.com/post/b2eef9b5-6604-4ac3-9692-f844c8a53131_512.webp',
                image: 'https://picstargram.s3.ap-northeast-2.amazonaws.com/post/b2eef9b5-6604-4ac3-9692-f844c8a53131_1024.webp',
                caption: "2번 사진이에요",
            },
            {
                thumbnail: 'https://picstargram.s3.ap-northeast-2.amazonaws.com/post/fbf20b6e-f6f9-4484-a5cf-532d38ac276b_512.webp',
                image: 'https://picstargram.s3.ap-northeast-2.amazonaws.com/post/fbf20b6e-f6f9-4484-a5cf-532d38ac276b_1920.webp',
                caption: "3번 사진이에요",
            },
            {
                thumbnail: 'https://picstargram.s3.ap-northeast-2.amazonaws.com/post/088b8e2c-2889-48d3-a7f3-1a2e485a51e6_512.webp',
                image: 'https://picstargram.s3.ap-northeast-2.amazonaws.com/post/088b8e2c-2889-48d3-a7f3-1a2e485a51e6_1024.webp',
                caption: "4번 사진이에요",
            },
            {
                thumbnail: 'https://picstargram.s3.ap-northeast-2.amazonaws.com/post/70f789a9-3254-43f3-af4a-27ce888ce4ab_512.webp',
                image: 'https://picstargram.s3.ap-northeast-2.amazonaws.com/post/70f789a9-3254-43f3-af4a-27ce888ce4ab_1024.webp',
                caption: "5번 사진이에요",
            },
            {
                thumbnail: 'https://picstargram.s3.ap-northeast-2.amazonaws.com/post/55f532fb-d2e7-476e-9f63-4d523dc83abe_512.webp',
                image:  'https://picstargram.s3.ap-northeast-2.amazonaws.com/post/55f532fb-d2e7-476e-9f63-4d523dc83abe_1024.webp',
                caption: "6번 사진이에요",
            },
            {
                thumbnail: 'https://picstargram.s3.ap-northeast-2.amazonaws.com/post/737effea-1c2a-44fa-a633-024b12d5d9b6_512.webp',
                image: 'https://picstargram.s3.ap-northeast-2.amazonaws.com/post/737effea-1c2a-44fa-a633-024b12d5d9b6_1024.webp',
                caption: "7번 사진이에요",
            },
            {
                thumbnail: 'https://picstargram.s3.ap-northeast-2.amazonaws.com/post/4ab8e2fd-6dc9-4ceb-b32b-e21f51b1db46_512.webp',
                image: 'https://picstargram.s3.ap-northeast-2.amazonaws.com/post/4ab8e2fd-6dc9-4ceb-b32b-e21f51b1db46_1920.webp',
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
        },

    }));
});