document.addEventListener('alpine:init', () => {
    Alpine.data("faq", () => ({
        data: [
            {
                category: '🧭 입장시간',
                question: '언제부터 입장 가능한가요?',
                answer: '12:00 시작으로 11:00부터 주차 및 입장이 가능합니다.',
            },
            {
                category: '🚗 자가차량',
                question: '자차로 어떻게 가나요?',
                answer: '네비게이션에서 "누아주 가든"을 찍어서 오시면 됩니다.\n페이지 상단 즐겨찾기 메뉴에서 연결된 맵을 클릭하시면 빠르게 지정할 수 있습니다.\n오시는 길에 안내표지판 및 주차 안내원이 배치되어 있습니다.',
            },
            {
                category: '🚌 셔틀버스',
                question: '셔틀버스는 어떻게 타나요?',
                answer: '5호선 미사역 4번 출구에서 20분 간격으로 운행되며 10분 정도 소요됩니다. 택시로는 약 7분 소요됩니다.' +
                    '\n 미사역->예식장: ' +
                    '\n10:40/11:00/11:20/11:40/12:00/13:10/13:30/13:50' +
                    '\n14:10/14:30' +
                    '\n 예식장->미사역: ' +
                    '\n13:00/13:20/13:40/14:00/14:20/14:40',
            },
            {
                category: '👰 예식',
                question: '비가 와도 야외 결혼식이 진행되나요?',
                answer: '네. 우천시 천막이 설치되어 예식이 정상 진행됩니다.',
            },
            {
                category: '🥣 식사',
                question: '점심식사는 언제 제공되나요?',
                answer: '1부(약 12:30분 종료)이후 앉은 자리에서 야외 뷔폐로 진행되고 2부가 시작되어도 제자리에서 드실 수 있습니다.',
            },
        ],
        faqOpens: [],
        init() {
            this.faqOpens = Array(this.data.length).fill(false);
            this.faqOpens[0] = true;
        },
        focusElement(index) {
            if (this.$el) {
                this.$el.scrollIntoView({behavior: 'smooth', block: 'center'});
            }
        }
    }));
});