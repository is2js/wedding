const productThumbnailImgSrc = "images/png/product/thumbnail/";

const brideData = [
    {
        label: {
            type: "bride",
            text: "신부측 혼주",
        },
        // thumbnail: `${productThumbnailImgSrc}family/bride_02.png`,
        thumbnail: `https://picstargram.s3.ap-northeast-2.amazonaws.com/post/16dbf461-75a8-46a7-bc71-1dd7935b238d_thumbnail.webp`,
        familyName: {
            family: '신부父',
            name: '김용범'
        },
        account: {
            bank: '신한',
            number: '110-304-956142'
        },
        phone: '010-3495-3380',
        tags: [],
    },
    {
        label: {
            type: "bride",
            text: "신부측 혼주",
        },
        // thumbnail: `${productThumbnailImgSrc}family/bride_03.png`,
        thumbnail: `https://picstargram.s3.ap-northeast-2.amazonaws.com/post/a6a4c3db-773a-4bdd-8e21-783087e229d7_thumbnail.webp`,
        familyName: {
            family: '신부母',
            name: '홍선희'
        },
        account: {
            bank: '신한',
            number: '110-304-956142'
        },
        phone: '010-3227-3380',
        tags: [],
    },
    // label / account 없는 형제자매들
    // {
    //     thumbnail: `${productThumbnailImgSrc}family/bride_04.png`,
    //     familyName: {
    //         family: '자매',
    //         name: '김나영'
    //     },
    //     // phone: '010-3015-3380',
    //     tags: [],
    // },
    // {
    //     thumbnail: `${productThumbnailImgSrc}family/bride_05.png`,
    //     familyName: {
    //         family: '남매',
    //         name: '김영훈'
    //     },
    //     // phone: '010-3295-3380',
    //     tags: [],
    // },
];


const groomData = [
    {
        label: {
            type: "groom",
            text: "신랑측 혼주",
        },
        // thumbnail: `${productThumbnailImgSrc}family/groom_02.png`,
        thumbnail: `https://picstargram.s3.ap-northeast-2.amazonaws.com/post/7e0266b4-03d3-48bb-8cb0-d5c8bcc4919a_thumbnail.webp`,
        familyName: {
            family: '신랑父',
            name: '조귀남'
        },
        account: {
            bank: '수협',
            number: '0010-4122-2224'
        },
        phone: '010-4122-2224',
        tags: [
            // {name: '여성', type: 'default'},
            // {name: '다이어트', type: 'default'},
            // {name: '베스트셀러', type: 'default'},
        ],
    },
    {
        label: {
            type: "groom",
            text: "신랑측 혼주",
        },
        // thumbnail: `${productThumbnailImgSrc}family/groom_03.png`,
        thumbnail: `https://picstargram.s3.ap-northeast-2.amazonaws.com/post/22b8b331-a116-4681-91e7-c9d7c54bbf89_thumbnail.webp`,
        familyName: {
            family: '신랑姑母',
            name: '조미선'
        },
        // account: {
        //     bank: '신한',
        //     number: '110-123-456789'
        // },
        phone: '010-3558-6106',
        tags: [],
    },
    // label / account 없는 형제자매들
    // {
    //     thumbnail: `${productThumbnailImgSrc}family/groom_04.png`,
    //     familyName: {
    //         family: '형제',
    //         name: '조재경'
    //     },
    //     // phone: '010-2048-7291',
    //     tags: [],
    // },
    // {
    //     thumbnail: `${productThumbnailImgSrc}family/groom_05.png`,
    //     familyName: {
    //         family: '남매',
    //         name: '조아라'
    //     },
    //     // phone: '010-5558-1388',
    //     tags: [],
    // },
];


const productData = [
    {
        isSoldOut: false,
        thumbnail: 'images/png/product/thumbnail/product_2.png',
        // label: {type: 'new', text: 'NEW'},
        category: {img: 'images/png/product/category/hankook_logo.png', name: '카테고리'},
        name: '기본탕',
        description: '기본 약',
        price: {discount: 22, value: 198000},
        review: {rating: 4.6, count: 1450},
        tags: [
            {name: '여성', type: 'default'},
            {name: '다이어트', type: 'default'},
            {name: '베스트셀러', type: 'default'},
        ],
    },
    {
        isSoldOut: false,
        thumbnail: 'images/png/product/thumbnail/product_3.png',
        label: {type: 'grey', text: '이월상품'},
        category: {img: 'images/png/product/category/hankook_logo.png', name: '카테고리'},
        name: '기본탕',
        description: '기본 약',
        price: {discount: 22, value: 198000},
        review: {rating: 4.6, count: 1450},
        tags: [
            {name: '여성', type: 'default'},
            {name: '다이어트', type: 'default'},
            {name: '베스트셀러', type: 'default'},
        ],
    },
    {
        isSoldOut: false,
        thumbnail: 'images/png/product/thumbnail/product_4.png',
        label: {type: 'new', text: 'NEW'},
        category: {img: 'images/png/product/category/hankook_logo.png', name: '카테고리'},
        name: '재성탕',
        description: '재성이가 먹는 약',
        price: {discount: 22, value: 198000},
        review: {rating: 4.6, count: 1450},
        tags: [
            {name: '여성', type: 'default'},
            {name: '다이어트', type: 'default'},
            {name: '베스트셀러', type: 'default'},
        ],
    },
    {
        isSoldOut: true,
        thumbnail: 'images/png/product/thumbnail/product_3.png',
        label: {type: 'hot', text: '핫잇슈'},
        category: {img: 'images/png/product/category/hankook_logo.png', name: '카테고리'},
        name: '재성탕',
        description: '재성이가 먹는 약',
        price: {discount: 22, value: 198000},
        review: {rating: 4.6, count: 1450},
        tags: [
            {name: '여성', type: 'default'},
            {name: '다이어트', type: 'default'},
            {name: '베스트셀러', type: 'default'},
        ],
    }
]

export {
    brideData, groomData, productData
};
