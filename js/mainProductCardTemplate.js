const renderThumbnailLabel = (label) => {
    if (!label) return '';
    return `<span class="product-thumbnail-label label-${label.type} position-absolute top-0 start-0 ">${label.text}</span>;`
}

function renderAccount(account, familyName) {
    if (!account) return '';
    return `<div class="product-account bg-img bg-img-x-left d-flex align-items-center mt10 ellipsis"
                onclick="alert('${familyName.family} ${familyName.name}님의 \\n${account.bank}은행 ${account.number}\\n계좌번호가 복사되었습니다.')"
    >
        계좌번호 복사
    </div>`;
}

const createFamilyCard = (data) => {
    const {thumbnail, label, familyName, account} = data;
    return `
<div class="swiper-slide">
    <a class="product d-block">
        <figure>
            <div class="product-thumbnail position-relative">
                <img src="${thumbnail}" class="product-thumbnail-image">
                ${renderThumbnailLabel(label)}
            </div>
            <figcaption>
                <div class="product-family-name d-flex align-items-bottom mt16">
                    <div class="product-family bride">
                        <span class="sr-only">가족관계</span>
                        ${familyName.family}
                    </div>
                    <div class="product-name">
                        <span class="sr-only">이름</span>
                        ${familyName.name}
                    </div>
                </div>
                <div class="product-mobile bg-img bg-img-x-left d-flex align-items-center mt14 ellipsis">
                    전화 걸기
                </div>
                ${renderAccount(account, familyName)}
            </figcaption>
        </figure>
    </a>
</div>
`
};

export {
    createFamilyCard
};