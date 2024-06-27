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
        title: "1부 예식을 소개할게요",
        alt: "1부 예식 그림",
        color: "#d3e3df",
        image: "./images/webp/banner/slide_main01.webp",
        mobileImage: "./images/webp/banner/slide_main01_m.webp",
    },
    {
        title: "2부 예식",
        alt: "2부 예식 그림",
        color: "#ecf2fb",
        image: "./images/webp/banner/slide_main02.webp",
        mobileImage: "./images/webp/banner/slide_main02_m.webp",
    },
    {
        title: "3부 예식",
        alt: "3부 예식 그림",
        color: "#2b5cd2",
        image: "./images/webp/banner/slide_main03.webp",
        mobileImage: "./images/webp/banner/slide_main03_m.webp",
    },
    {
        title: "4부 예식",
        alt: "4부 예식 그림",
        color: "#6f49fa",
        image: "./images/webp/banner/slide_main04.webp",
        mobileImage: "./images/webp/banner/slide_main04_m.webp",
    },
    {
        title: "5부 예식",
        alt: "5부 예식 그림",
        color: "#21273c",
        image: "./images/webp/banner/slide_main05.webp",
        mobileImage: "./images/webp/banner/slide_main05_m.webp",
    },
    {
        title: "6부 예식",
        alt: "6부 예식 그림",
        color: "#070707",
        image: "./images/webp/banner/slide_main06.webp",
        mobileImage: "./images/webp/banner/slide_main06_m.webp",
    },
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
    const paginationType = screenWidth <= 768 ? 'fraction' : 'bullets';



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
    });
};

// 처음 실행
createSlides(data);
initVisualSwiper(data);
// 리사이즈 될 때마다 재실행
window.addEventListener("resize", () => {
    initVisualSwiper(data);
});
