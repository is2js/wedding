document.addEventListener('alpine:init', () => {
    Alpine.data("timeline", () => ({
        data: [
            {
                image: "img/timeline/1.jpg",
                createdAt: "2015. 09",
                title: "첫 만남",
                body: "대학교 강의실에서 시작된 첫 만남이 연인으로 발전하였습니다.",
            },
            {
                image: "https://picsum.photos/300/300",
                createdAt: "2016 ~ 2020",
                title: "믿음과 신뢰가 쌓이는 시기",
                body: "학업 생활에 서로 힘이 되어주며 이해하고 사랑을 키워나갔습니다. 국내 곳곳으로 힐링 여행을 다니며, 부족한 점을 서로 보완해주는 커플이 되었어요",
            },
            {
                image: "https://picsum.photos/301/301",
                createdAt: "2021. 02",
                title: "졸업 후 같은 직장 입사",
                body: "한의과대학을 졸업하고 같은 한방병원 입사하여 일반수련의 과정을 마쳤습니다.",
            },
            {
                image: "https://picsum.photos/302/302",
                createdAt: "2024. 09",
                title: "결혼에 골인!",
                body: "서로를 이해하며 살아간지 9년이 흘러 부부가 되었습니다.",
            },
        ],
        timelineOpens: [],
        init() {
            this.timelineOpens = Array(this.data.length).fill(false);
            this.timelineOpens[0] = true;
        }
    }));
});