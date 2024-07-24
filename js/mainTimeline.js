document.addEventListener('alpine:init', () => {
    Alpine.data("timeline", () => ({
        data: [
            {
                image: "./images/png/timeline/01.png",
                createdAt: "2015. 09",
                title: "캠퍼스 커플로 시작 💕",
                body: "강의실에서 시작된 첫 만남이 연인으로 발전하였습니다.",
            },
            {
                // image: "https://picsum.photos/300/300",
                image: "./images/png/timeline/02.png",
                createdAt: "2016 ~ 2020",
                title: "신뢰가 쌓이는 🙏",
                body: "학업 생활에 서로 힘이 되어주며 이해하고 사랑을 키워나갔습니다. 국내 곳곳으로 힐링 여행을 다니며, 부족한 점을 서로 보완해주는 커플이 되었어요",
            },
            {
                // image: "https://picsum.photos/301/301",
                image: "./images/png/timeline/03.png",
                createdAt: "2021. 02",
                title: "졸업후 사회로 🎓",
                body: "한의사로서 각자의 자리에서 서로에게 버팀목이 되어주며 환자들을 돌보고 있습니다.",
            },
            {
                // image: "https://picsum.photos/302/302",
                image: "./images/png/timeline/04.png",
                createdAt: "2024. 09. 07",
                title: "결혼, 미래를 약속 🎎",
                body: "연인으로서 9년, 이제 부부의 인연으로 이어가려합니다.",
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