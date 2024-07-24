document.addEventListener('alpine:init', () => {
    Alpine.data("hero", (year, month, day, hours, minutes) => ({
        expiry: null,
        remaining: null,
        init() {
            // 스크롤 방지 by root요소를 top/left로 onscroll마다 이동
            this.disableScroll();

            // 한국시간으로 만료기한 넣기
            this.expiry = this.toKoreanTime(new Date(year, month - 1, day, hours, minutes)).getTime();

            // 남은시간 한번 넣고, 1초마다 다시 계산
            this.setRemaining();
            setInterval(() => {
                this.setRemaining();
            }, 1000);
        },
        toKoreanTime(date) {
            // Convert local time to Korean Standard Time (UTC+9)
            const localOffset = date.getTimezoneOffset() * 60000;
            const utc = date.getTime() + localOffset;
            const koreanOffset = 9 * 60 * 60000;
            return new Date(utc + koreanOffset);
        },
        setRemaining() {
            // Convert current time to Korean Time
            const now = this.toKoreanTime(new Date()).getTime();
            const diff = this.expiry - now;
            this.remaining = Math.floor(diff / 1000);
        },
        days() {
            const days = Math.floor(this.remaining / 86400);
            const remaining = this.remaining % 86400;
            return {value: days, remaining: remaining};
        },
        hours() {
            const hours = Math.floor(this.days().remaining / 3600);
            const remaining = this.days().remaining % 3600;
            return {value: hours, remaining: remaining};
        },
        minutes() {
            const minutes = Math.floor(this.hours().remaining / 60);
            const remaining = this.hours().remaining % 60;
            return {value: minutes, remaining: remaining};
        },
        seconds() {
            const seconds = this.minutes().remaining;
            return {value: seconds};
        },
        format(value) {
            return ("0" + value).slice(-2);
        },
        time() {
            return {
                days: this.format(this.days().value),
                hours: this.format(this.hours().value),
                minutes: this.format(this.minutes().value),
                seconds: this.format(this.seconds().value),
            };
        },
        disableScroll() {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            let scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

            /* 1) 스크롤 움직일 시, 복귀 (천천히) */
            window.onscroll = function () {
                window.scrollTo(scrollTop, scrollLeft);
            };

            /* 2) 스크롤 움직임에 대해, 칼같이 움직여서 사실상 안움직이는 것으로 추가 옵션*/
            const rootElement = document.querySelector(':root');
            rootElement.style.scrollBehavior = 'auto';
        },
        enableScroll() {
            window.onscroll = function () {

            };

            const rootElement = document.querySelector(':root');
            rootElement.style.scrollBehavior = 'smooth';

            /* 4) 브라우저 db에 opened 상태 기록해놓기 */
            // localStorage.setItem('opened', 'true');

            // 6) 보러가기 클릭 -> enableScroll -> 내부에서 audio도 작동
            // playAudio();
        }
    }));
});