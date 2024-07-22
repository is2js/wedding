document.addEventListener('alpine:init', () => {
    Alpine.data("timeline", () => ({
        data: [
            {
                image: "./images/png/timeline/01.png",
                createdAt: "2015. 09",
                title: "대학에서 첫 만남 💕",
                body: "대학교 강의실에서 시작된 첫 만남이 연인으로 발전하였습니다.",
            },
            {
                // image: "https://picsum.photos/300/300",
                image: "./images/png/timeline/02.png",
                createdAt: "2016 ~ 2020",
                title: "믿음/신뢰가 쌓이는 🎶",
                body: "학업 생활에 서로 힘이 되어주며 이해하고 사랑을 키워나갔습니다. 국내 곳곳으로 힐링 여행을 다니며, 부족한 점을 서로 보완해주는 커플이 되었어요",
            },
            {
                // image: "https://picsum.photos/301/301",
                image: "./images/png/timeline/03.png",
                createdAt: "2021. 02",
                title: "졸업후 같은 곳 입사 🎓",
                body: "한의과대학을 졸업하고 같은 한방병원 입사하여 일반수련의 과정을 마쳤습니다.",
            },
            {
                // image: "https://picsum.photos/302/302",
                image: "./images/png/timeline/04.png",
                createdAt: "2024. 09",
                title: "미래를 약속 🎎",
                body: "같은 직종에 종사하며 서로를 이해하고 살아간지 9년이 흘러 부부가 되려고 합니다.",
            },
        ],
        timelineOpens: [],
        init() {
            this.timelineOpens = Array(this.data.length).fill(false);
            this.timelineOpens[0] = true;
        },
        focusElement(index) {
            if (this.$el) {
                this.$el.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        },
    }));
});