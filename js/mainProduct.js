// let titles = [
//     "새해 이벤트",
//     "리뷰 이벤트",
//     "앱 설치 혜택",
//     "앱피렐리 무상교환",
//     "삼성화재 이벤트",
// ];
// /*"자동세차 100원",*/
// const data = [
//     {
//         title: "1부 예식을 소개할게요",
//         alt: "1부 예식 그림",
//         color: "#d3e3df",
//         image: "./images/webp/banner/slide_main01.webp",
//         mobileImage: "./images/webp/banner/slide_main01_m.webp",
//     },
//     {
//         title: "2부 예식",
//         alt: "2부 예식 그림",
//         color: "#ecf2fb",
//         image: "./images/webp/banner/slide_main02.webp",
//         mobileImage: "./images/webp/banner/slide_main02_m.webp",
//     },
//     {
//         title: "3부 예식",
//         alt: "3부 예식 그림",
//         color: "#2b5cd2",
//         image: "./images/webp/banner/slide_main03.webp",
//         mobileImage: "./images/webp/banner/slide_main03_m.webp",
//     },
//     {
//         title: "4부 예식",
//         alt: "4부 예식 그림",
//         color: "#6f49fa",
//         image: "./images/webp/banner/slide_main04.webp",
//         mobileImage: "./images/webp/banner/slide_main04_m.webp",
//     },
//     {
//         title: "5부 예식",
//         alt: "5부 예식 그림",
//         color: "#21273c",
//         image: "./images/webp/banner/slide_main05.webp",
//         mobileImage: "./images/webp/banner/slide_main05_m.webp",
//     },
//     {
//         title: "6부 예식",
//         alt: "6부 예식 그림",
//         color: "#070707",
//         image: "./images/webp/banner/slide_main06.webp",
//         mobileImage: "./images/webp/banner/slide_main06_m.webp",
//     },
// ];
//
// const createSlides = (data) => {
//     const visualSwiperWrapper = document.querySelector('.swiper.visual .swiper-wrapper');
//
//     data.forEach((item) => {
//         visualSwiperWrapper.insertAdjacentHTML('beforeend',
//             `<div class="swiper-slide d-flex justify-content-center align-items-center">
//                 <div class="slide-bg" style="background-color: ${item.color}">
//                     <picture>
//                         <!-- mobile -->
//                         <source media="(max-width: 767px)"
//                                 srcset="${item.mobileImage}"
//                         />
//                         <!-- web -->
//                         <img src="${item.image}"" alt="${item.alt}"/>
//                     </picture>
//                 </div>
//          </div>`
//         )
//     });
// }


const mobileMaxWidth = 768;
const baseClass = '.swiper.product-list';

// let productSwiper;
/* section별로  swiper를 담아서 사용 */
const productSwiperPerSection = {};
/* section별로 여러개의 swiper를 array에 담아서 사용 */
const productSwiperArraysPerSection = {};

// product-list type에 따라 pagination이 있는지 없는지 확인
function hasSwiperPagination(type) {
    return type !== 'more';
}

function isMobileScreen(screenWidth) {
    return screenWidth <= mobileMaxWidth;
}

const initProductSwiper = (type = 'default', sectionName, data) => {
    // 1. 기존에 있었으면 삭제
    // if (productSwiperPerSection[type]) {
    //     productSwiperPerSection[type].destroy(true, true);
    // }
    if (productSwiperPerSection[sectionName]) {
        productSwiperPerSection[sectionName].destroy(true, true);
    }

    // 2. init: false 옵션으로 swiper객체만 생성 -> 모바일에서만 init()
    const swiperTargetClass = `.${sectionName} ${baseClass}.list-${type}`;

    // 4.pagination의 el 설정을 type에 따라 동적으로 지정
    // - 'more' 타입이 아니라면 element 찾음.
    // const paginationTargetClass = type !== 'more' ? `.list-${type} .swiper-pagination` : null;
    const paginationTargetClass = hasSwiperPagination(type) ? `.${sectionName} .list-${type} .swiper-pagination` : null;

    // productSwiper = new Swiper(swiperElement, {
    productSwiperPerSection[sectionName] = new Swiper(swiperTargetClass, {
        grabCursor: true,
        slidesPerView: 1.7,
        spaceBetween: 15,
        init: false,
        breakpoints: {
            410: {
                slidesPerView: 2.5,
            },
            570: {
                slidesPerView: 3.5,
            }
        },
        //5. more type이 이거나 or  element없으면 false -> 아니라면 선언
        // pagination: type === 'more' || !paginationTargetClass ? false : {
        pagination: !hasSwiperPagination(type) ? false : {
            el: paginationTargetClass,
            clickable: true,
        }
    });

    // 3. 크기보고 swiper 사용여부 결정 결정
    // const screenWidth = window.innerWidth;
    const isMobile = isMobileScreen(window.innerWidth);

    if (isMobile) {
        // productSwiper.init();
        // productSwiperPerSection[type].init();
        productSwiperPerSection[sectionName].init();
        console.log("mobile / sectionName - type ", sectionName, type);
    } else {
        console.log("web / sectionName - type ", sectionName, type)
    }
};


const initProductSwiperArray = (type = 'default', sectionName, data = []) => {
    // 0. section별 swiper 배열 초기화( forEach사용대기 )
    if (!productSwiperArraysPerSection[sectionName]) {
        productSwiperArraysPerSection[sectionName] = [];
    }


    // 1. 기존에 있었으면 삭제 -> 파괴까지하고 빈배열로 초기화
    // if (productSwiperArraysPerSection[sectionName]) {
    //     productSwiperArraysPerSection[sectionName].destroy(true, true);
    // }
    productSwiperArraysPerSection[sectionName].forEach(swiper => swiper.destroy(true, true));
    productSwiperArraysPerSection[sectionName] = [];

    // 2. init: false 옵션으로 swiper객체만 생성 -> 모바일에서만 init() + 여러개일 경우, 순회하며 객체선언 후 배열에 push
    const swiperElements = document.querySelectorAll(`.${sectionName} ${baseClass}.list-${type}`);
    swiperElements.forEach((swiperElement, index) => {


        // 4.pagination의 el 설정을 type에 따라 동적으로 지정 - 'more' 타입이 아니라면 element 찾아서 옵션에 적용
        // const paginationTargetClass = type !== 'more' ? `.list-${type}:nth-of-type(${index + 1}) .swiper-pagination` : null;
        // => 옵션적용시 :nth-of-type 적용안됨
        // const paginationTargetClass = swiperElement.querySelector('.swiper-pagination');
        const paginationElement = hasSwiperPagination(type) ? swiperElement.querySelector('.swiper-pagination') : null;


        // productSwiper = new Swiper(swiperElement, {
        // productSwiperArraysPerSection[sectionName] = new Swiper(swiperTargetClass, {
        const newSwiper = new Swiper(swiperElement, {
            grabCursor: true,
            slidesPerView: 1.7,
            spaceBetween: 15,
            init: false,
            breakpoints: {
                410: {
                    slidesPerView: 2.5,
                },
                570: {
                    slidesPerView: 3.5,
                }
            },
            //5. more type이 이거나 or  element없으면 false -> 아니라면 선언
            pagination: !hasSwiperPagination(type) ? false : {
                // el: paginationTargetClass,
                el: paginationElement,
                clickable: true,
            }
        });


        // new
        productSwiperArraysPerSection[sectionName].push(newSwiper);

        // 3. 크기보고 swiper 사용여부 결정
        // const screenWidth = window.innerWidth;
        // const mobileMaxWidth = 768;
        // const isMobile = screenWidth <= mobileMaxWidth;
        const isMobile = isMobileScreen(window.innerWidth)

        if (isMobile) {
            // productSwiper.init();
            // console.log("mobile / type", type);
            console.log("mobile / sectionName - type - index", sectionName, type, index);
            // productSwipress[type].init();
            newSwiper.init();

        } else {
            // console.log("web / type", type)
            console.log("web / sectionName - type - index", sectionName, type, index)
        }
    });

};

// 처음 실행
// createSlides(data);
// initProductSwiper(data);
// initProductSwiper();
initProductSwiper('more', 'herb-medicine');
// initProductSwiper('default', 'herb-medicine');
initProductSwiper('default', 'family');
initProductSwiperArray('default', 'families');
// 리사이즈 될 때마다 재실행
window.addEventListener("resize", () => {
    // initProductSwiper(data);
    // initProductSwiper();
    // initProductSwiper('more');
    initProductSwiper('more', 'herb-medicine');
    initProductSwiper('default', 'family');
    initProductSwiperArray('default', 'families');
});
