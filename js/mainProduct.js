import {brideData, groomData, productData,} from "./mainProductData.js";
import {createProductCard} from "./mainProductCardTemplate.js";

// console.log(brideData);

const mobileMaxWidth = 767;
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
            360: {
                slidesPerView: 2.1,
                spaceBetween: 5,
            },
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
        // console.log("mobile / sectionName - type ", sectionName, type);
    } else {
        // console.log("web / sectionName - type ", sectionName, type)
    }

    window.addEventListener("resize", () => {
        initProductSwiper(type, sectionName);
    }, {once: true});

};

const initProductSwiperMultipleWrapper = (type = 'default', sectionName, data = []) => {
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
                360: {
                    slidesPerView: 2.1,
                    spaceBetween: 5,
                },
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

    window.addEventListener("resize", () => {
        initProductSwiperMultipleWrapper(type, sectionName);
    }, {once: true});

};


// const createFamilySlides = (data) => {
// const createFamilySlides = (sectionName, data) => {
// const createFamilySlides = (sectionSwiperWrapper, data) => {
const createProductSlides = (sectionSwiperWrapper, data) => {

    data.forEach((item) => {
        const familySlide = createProductCard(item);
        sectionSwiperWrapper.insertAdjacentHTML('beforeend', familySlide);
    });
}

// createFamilySlides(brideData);
// createFamilySlides(groomData);
const createProductSwiperSection = (sectionName, type = 'default', data) => {
    // 1. slide들을 매달 wrapper 1개 찾기
    const sectionSwiperWrapper = document.querySelector(`.${sectionName} .swiper .swiper-wrapper`);

    // 2. wrapper가 찾아졌으면, data기반으로 slide만들어서 wrapper에 붙혀주기
    if (sectionSwiperWrapper) {
        createProductSlides(sectionSwiperWrapper, data);
    }
    // 3. swiper객체 생성 및 resize 이벤트
    initProductSwiper(type, sectionName);
}


// const createProductSlides = (sectionSwiperWrapper, data) => {
//
//     data.forEach((item) => {
//         // const familySlide = createProductCard(item);
//         const familySlide = createProductCard(item);
//         sectionSwiperWrapper.insertAdjacentHTML('beforeend', familySlide);
//     });
// }
// const createProductSwiper = (sectionName, type = 'default', data) => {
//     // 1. slide들을 매달 wrapper 1개 찾기
//     const sectionSwiperWrapper = document.querySelector(`.${sectionName} .swiper .swiper-wrapper`);
//
//     // 2. wrapper가 찾아졌으면, data기반으로 slide만들어서 wrapper에 붙혀주기
//     if (sectionSwiperWrapper) {
//         createProductSlides(sectionSwiperWrapper, data);
//     }
//     // 3. swiper객체 생성 및 resize 이벤트
//     initProductSwiper(type, sectionName);
// }


const createProductSwiperMultipleWrapperSection = (sectionName, type = 'default', data) => {
    // 1. slide들을 매달 wrapper 2개 이상 찾기
    const sectionSwiperWrappers = document.querySelectorAll(`.${sectionName} .swiper .swiper-wrapper`);

    // 2. 순회하며  wrapper에 슬라이드 생성
    sectionSwiperWrappers.forEach((swiperWrapper, index) => {
        createProductSlides(swiperWrapper, data[index]);
    });
    //3. swiper 객체 초기화
    initProductSwiperMultipleWrapper(type, sectionName, data);
}


// 처음 실행


// createProductSwiperSection('herb-medicine', 'more', productData);
// createProductSwiperSection('family', 'default', groomData);
createProductSwiperMultipleWrapperSection('families', 'default', [brideData, groomData]);
