const productThumbnailImgSrc = "images/png/product/thumbnail/";

const brideData = [
    {
        label: {
            type: "bride",
            text: "신부측 혼주",
        },
        thumbnail: `${productThumbnailImgSrc}family/bride_02.png`,
        familyName: {
            family: '신부父',
            name: '김용범'
        },
        account: {
            bank: '신한',
            number: '110-123-456789'
        },
        phone: '010-1234-5678',
    },
    {
        label: {
            type: "bride",
            text: "신부측 혼주",
        },
        thumbnail: `${productThumbnailImgSrc}family/bride_03.png`,
        familyName: {
            family: '신부母',
            name: '홍선희'
        },
        account: {
            bank: '신한',
            number: '110-123-456789'
        },
        phone: '010-1234-5678',
    },
    // label / account 없는 형제자매들
    {
        thumbnail: `${productThumbnailImgSrc}family/bride_04.png`,
        familyName: {
            family: '자매',
            name: '김나영'
        },
        phone: '010-1234-5678',
    },
    {
        thumbnail: `${productThumbnailImgSrc}family/bride_05.png`,
        familyName: {
            family: '남매',
            name: '김영훈'
        },
        phone: '010-1234-5678',
    },
];

const groomData = [
    {
        label: {
            type: "groom",
            text: "신랑측 혼주",
        },
        thumbnail: `${productThumbnailImgSrc}family/groom_02.png`,
        familyName: {
            family: '신랑父',
            name: '조귀남'
        },
        account: {
            bank: '신한',
            number: '110-123-456789'
        },
        phone: '010-1234-5678',
    },
    {
        label: {
            type: "groom",
            text: "신랑측 혼주",
        },
        thumbnail: `${productThumbnailImgSrc}family/groom_02.png`,
        familyName: {
            family: '신부姑母',
            name: '조미령'
        },
        account: {
            bank: '신한',
            number: '110-123-456789'
        },
        phone: '010-1234-5678',
    },
    // label / account 없는 형제자매들
    {
        thumbnail: `${productThumbnailImgSrc}family/groom_03.png`,
        familyName: {
            family: '형제',
            name: '조재경'
        },
        phone: '010-1234-5678',
    },
    {
        thumbnail: `${productThumbnailImgSrc}family/groom_04.png`,
        familyName: {
            family: '남매',
            name: '조아라'
        },
        phone: '010-1234-5678',
    },
];

export {
  brideData, groomData,
};
