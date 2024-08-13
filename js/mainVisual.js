let titles = [
    "새해 이벤트",
    "리뷰 이벤트",
    "앱 설치 혜택",
    "앱피렐리 무상교환",
    "삼성화재 이벤트",
];
/*"자동세차 100원",*/
const data = [
    {
        title: "1부 예식",
        alt: "1부 예식",
        color: "#d3e3df",
        // mobileImage: "./images/png/banner/banner01.png",
        // mobileImage: "https://picstargram.s3.ap-northeast-2.amazonaws.com/post/4ef1b306-c468-4251-b3b1-9bab887ad2be_1024.webp",
        // image: "https://picstargram.s3.ap-northeast-2.amazonaws.com/post/734fa0c1-dc79-4299-bbcd-5422f4efa2f3_4700.webp",
        mobileImage: "https://picstargram.s3.ap-northeast-2.amazonaws.com/post/94f713f1-ebfe-4b76-b6ce-b6677dbde836_1024.webp",
        image: "https://picstargram.s3.ap-northeast-2.amazonaws.com/post/983e4fd2-e94b-4d95-91f0-a531fd048a5d_4700.webp",
    },
    {
        title: "촬영 및 식사",
        alt: "촬영 및 식사",
        color: "#FBD9D9",
        // mobileImage: "https://picstargram.s3.ap-northeast-2.amazonaws.com/post/7fbb1ae8-70bb-489c-809f-9ed87856efef_1024.webp",
        // image: "https://picstargram.s3.ap-northeast-2.amazonaws.com/post/5c424fa9-b2dc-4cc3-a6da-3b8eefdf5436_4700.webp",
        mobileImage: "https://picstargram.s3.ap-northeast-2.amazonaws.com/post/2faba7e3-b1f6-4364-8e05-e9309a62e486_1024.webp",
        image: "https://picstargram.s3.ap-northeast-2.amazonaws.com/post/df94e51e-2422-42cb-b5df-5202c6ec27c9_4700.webp",
    },
    {
        title: "2부 예식",
        alt: "2부 예식",
        color: "#6f49fa",
        // mobileImage: "https://picstargram.s3.ap-northeast-2.amazonaws.com/post/422bc33f-c3c2-4a85-8784-34bfdea53a90_1024.webp",
        // image: "https://picstargram.s3.ap-northeast-2.amazonaws.com/post/c9e6b2a9-d997-42bd-9503-52e5f5069682_4700.webp",
        mobileImage: "https://picstargram.s3.ap-northeast-2.amazonaws.com/post/23c87c87-8744-4f2f-82fa-1e3849d092d2_1024.webp",
        image: "https://picstargram.s3.ap-northeast-2.amazonaws.com/post/8a75ef43-5ed3-44a4-b1fe-2b8142863beb_4700.webp",
    },
    // {
    //     title: "2부 예식",
    //     alt: "2부 예식 그림",
    //     color: "#ecf2fb",
    //     // image: "./images/webp/banner/slide_main02.webp",
    //     image: "./images/webp/banner/slide_main02.png",
    //     mobileImage: "./images/webp/banner/slide_main02_m.webp",
    // },
    // {
    //     title: "3부 예식",
    //     alt: "3부 예식 그림",
    //     color: "#2b5cd2",
    //     image: "./images/webp/banner/slide_main03.webp",
    //     mobileImage: "./images/webp/banner/slide_main03_m.webp",
    // },
    // {
    //     title: "5부 예식",
    //     alt: "5부 예식 그림",
    //     color: "#21273c",
    //     image: "./images/webp/banner/slide_main05.webp",
    //     mobileImage: "./images/webp/banner/slide_main05_m.webp",
    // },
    // {
    //     title: "6부 예식",
    //     alt: "6부 예식 그림",
    //     color: "#070707",
    //     image: "./images/webp/banner/slide_main06.webp",
    //     mobileImage: "./images/webp/banner/slide_main06_m.webp",
    // },
];

const createSlides = (data) => {
    const visualSwiperWrapper = document.querySelector('.swiper.visual .swiper-wrapper');

    data.forEach((item) => {
        visualSwiperWrapper.insertAdjacentHTML('beforeend',
            `<div class="swiper-slide d-flex justify-content-center align-items-center">
                <div class="slide-bg" style="background-color: ${item.color}">
                    <picture>
                        <!-- mobile -->
                        <source media="(max-width: 767px)"
                                srcset="${item.mobileImage}"
                        />
                        <!-- web -->
                        <img src="${item.image}"" alt="${item.alt}"/>
                    </picture>
                </div>
         </div>`
        )
    });
}


let visualSwiper;

const initVisualSwiper = (data) => {
    // 1. 기존에 있었으면 삭제
    if (visualSwiper) {
        visualSwiper.destroy(true, true);
    }

    // 2. 크기보고 paginationType 결정
    const screenWidth = window.innerWidth;
    const mobileMaxWidth = 768;
    const paginationType = screenWidth <= mobileMaxWidth ? 'fraction' : 'bullets';


    visualSwiper = new Swiper('.swiper.visual', {
        pagination: {
            /*el: ".swiper-pagination",*/
            el: ".visual-paging",
            clickable: true,
            type: paginationType,
            renderBullet: function (index, className) {
                // return `<span class="${className}">${index + 1}</span>`;
                // return `<button class="${className}">${titles[index]}</button>`;
                return `<button class="${className}">${data[index].title}</button>`;
            },
        },
        grabCursor: true,
        // autoplay: true,
        // interval: 5000,
        allowTouchMove: true,
    });


    // 리사이즈 될 때마다 재실행
    window.addEventListener("resize", () => {
        initVisualSwiper(data);
    }, {once: true});
};

// 처음 실행
createSlides(data);
initVisualSwiper(data);
// 리사이즈 될 때마다 재실행
// window.addEventListener("resize", () => {
//     initVisualSwiper(data);
// });
