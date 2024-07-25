import { addComma, copyToClipboardAndAlert } from "./utils.js";

// Make the function globally accessible
window.copyToClipboardAndAlert = copyToClipboardAndAlert;

// alpinejs 유틸(magic, directive)은 함수명이 아니라 통째로 임의의 변수명으로 통째로 가져와서 Alpine.plugin()에 등록
// import AlpineUtil  from "./utils.js";
// Alpine.plugin(AlpineUtil);

function renderThumbnail(thumbnail, label, isSoldOut, category) {
    if (!thumbnail) return '';

    const soldOutClass = isSoldOut ? ' sold-out' : '';

    return `<div class="product-thumbnail position-relative${soldOutClass}">
        <img src="${thumbnail}" class="product-thumbnail-image">
            ${renderCategoryImg(category)}
            ${renderThumbnailLabel(label)}
    </div>`;
}

function renderCategoryImg(category) {
    if (!category) return '';

    return `<img src="${category.img}"
                class="product-thumbnail-category position-absolute"
                alt="카테고리">`;
}

const renderThumbnailLabel = (label) => {
    if (!label) return '';
    return `<span class="product-thumbnail-label label-${label.type} position-absolute top-0 start-0 ">${label.text}</span>;`
}

function renderAccount(account, familyName) {
    if (!account) return '';
    // return `<div class="product-account bg-img bg-img-x-left d-flex align-items-center mt10 ellipsis"
    //             onclick="alert('${familyName.family} ${familyName.name}님의 \\n${account.bank}은행 ${account.number}\\n계좌번호가 복사되었습니다.')"
    // >
    //     계좌번호 복사
    // </div>`;
                /*onclick="copyToClipboardAndAlert(*/
                // @click="$clipboard(
                //     '${account.number}',
                //     '${familyName.family} ${familyName.name}님의 \\n${account.bank}은행 ${account.number}\\n계좌번호가 복사되었습니다.'
                // )"
    return `<div class="product-account bg-img bg-img-x-left d-flex align-items-center mt10 ellipsis cursor-pointer"
                onclick="copyToClipboardAndAlert(
                    '${account.number}', 
                    '${familyName.family} ${familyName.name}님의 \\n${account.bank}은행 ${account.number}\\n계좌번호가 복사되었습니다.'
                )"
    >
        마음 전하실 곳
    </div>`;
}

const renderTags = (tags) => {
    if (!Array.isArray(tags) || tags.length === 0) return '';

    const tagsHTML = tags.map(tag => `<span class="label-${tag.type}">${tag.name}</span>`).join(' ');
    return `<!-- inline에 높이 반영을 위한 block 반영을 위한 부모 flex화 -->
            <div class="product-hashtag d-flex flex-wrap mt12">
                <span class="sr-only">해시태그</span>
                ${tagsHTML}
            </div>`
};

function renderFamilyName(familyName) {
    if (!familyName) return '';

    return `<div class="product-family-name d-flex align-items-bottom mt16">
        <div class="product-family">
            <span class="sr-only">가족관계</span>
            ${familyName.family}
        </div>
        <div class="product-name">
            <span class="sr-only">이름</span>
            ${familyName.name}
        </div>
    </div>`;
}

function renderPhone(phone) {
    if (!phone) return '';

    // return `<div class="product-mobile bg-img bg-img-x-left d-flex align-items-center mt14 ellipsis"
    //             onclick="alert('${familyName.family} ${familyName.name}님의 번호 \\n${phone}\\n가 복사되었습니다.')"
    // >
    //     전화 걸기
    // </div>`;
    return `<a class="product-mobile bg-img bg-img-x-left d-flex align-items-center mt14 ellipsis cursor-pointer"
href="tel:${phone}"
>
        연락 주실 곳
    </a>`;
}


function renderCategoryName(category) {
    if (!category) return '';

    return `<div class="product-category mt16">
        <span class="sr-only">카테고리</span>
        ${category.name}
    </div>`;
}

function renderName(name) {
    if (!name) return '';

    return `<div class="product-title mt16">
        <span class="sr-only">제품명</span>
        ${name}
    </div>`;
}

function renderDescription(description) {
    if (!description) return '';

    return `<div class="product-description mt12">
        <span class="sr-only">설명</span>
        ${description}
    </div>`;
}

function renderPrice(price) {
    if (!price) return '';

    return `<div class="product-price d-flex align-items-center mt12">
        <div class="product-discount">
            <span class="sr-only">할인율</span>
            ${price.discount}%
        </div>
        <div class="product-value">
            <span class="sr-only">판매가</span>
            ${addComma(price.value)}원
        </div>
    </div>`;
}

function renderReview(review) {
    if (!review) return '';

    return `<div class="product-review bg-img bg-img-x-left d-flex align-items-center mt16">
        <div class="product-rating">
            <span class="sr-only">별점</span>
            ${review.rating}
        </div>
        <div class="product-review-count">
            <span class="sr-only">리뷰 갯수</span>
            (${addComma(review.count)})
        </div>
    </div>`;
}

const createProductCard = (data) => {
    const {
        thumbnail, label,
        familyName, account, phone,
        category, isSoldOut, name, description, price, review,
        tags,
    } = data;

    // product면 slide 전체를 a태그로
    // family라면, slide 전체를 div로 가져 -> 내부 a태그 for tel: 가져도 에러 안나게
    // <a class="product d-block">
    return `<div class="swiper-slide">
    <div class="product d-block">
        <figure>
            ${renderThumbnail(thumbnail, label, isSoldOut, category)}
            <figcaption>
                <!-- product -->
                ${renderCategoryName(category)}
                ${renderName(name)}
                ${renderDescription(description)}
                ${renderPrice(price)}
                ${renderReview(review)}

                <!-- family -->
                ${renderFamilyName(familyName)}
                ${renderPhone(phone)}
                ${renderAccount(account, familyName)}
                
                <!-- common -->
                ${renderTags(tags)}
            </figcaption>
        </figure>
    </div>
</div>
`
};


export {
    createProductCard,
};