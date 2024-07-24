document.addEventListener('alpine:init', () => {
    Alpine.data("hero", (year, month, day, hours, minutes) => ({
        expiry: null,
        remaining: null,
        isPast: false,
        height: null,

        init() {


            // this.$refs.hero.offsetHeight = window.innerHeight * 0.01;
            // console.log(this.$refs.hero.style.height)
            // console.log(this.$refs.hero.style.offsetHeight)
            // console.log(window.innerHeight)
            // console.log(this.$refs.hero.style.offsetHeight)
            // this.$nextTick(() => {
            //     this.$refs.hero.style.height = `${window.innerHeight}px`;
            //     console.log('Updated height:', this.$refs.hero.style.height);
            // });

            this.setScreenSize();
            window.addEventListener('resize', () => {
                this.setScreenSize();
            });

            // 스크롤 방지 by root요소를 top/left로 onscroll마다 이동
            this.disableScroll();

            // 한국시간으로 만료기한 넣기
            this.expiry = this.toKoreanTime(new Date(year, month - 1, day, hours, minutes)).getTime();

            // 남은시간 한번 넣고, 1초마다 다시 계산
            this.setRemaining();

            if (!this.isPast) {
                setInterval(() => {
                    this.setRemaining();
                }, 1000);
            }
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

            this.isPast = this.remaining <= 0;
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
            if (!this.isPast) {
                return {
                    days: this.format(this.days().value),
                    hours: this.format(this.hours().value),
                    minutes: this.format(this.minutes().value),
                    seconds: this.format(this.seconds().value),
                };
            } else {
                const passed = Math.abs(this.remaining);
                const days = Math.floor(passed / 86400);
                const remainingAfterDays = passed % 86400;
                const hours = Math.floor(remainingAfterDays / 3600);
                const remainingAfterHours = remainingAfterDays % 3600;
                const minutes = Math.floor(remainingAfterHours / 60);
                const seconds = remainingAfterHours % 60;
                return {
                    days: this.format(days),
                    hours: this.format(hours),
                    minutes: this.format(minutes),
                    seconds: this.format(seconds),
                };
            }
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
            //
            // document.body.style.overflow = 'hidden';
        },
        enableScroll() {
            /* 1) 스크롤 움직일 시 이벤트 비워서 제거 */
            window.onscroll = function () {

            };

            /* 2) 스크롤 움직임에 대해, 칼같이 움직이게 가능하도록 복구 */
            const rootElement = document.querySelector(':root');
            rootElement.style.scrollBehavior = 'smooth';

            // document.body.style.overflow = '';

            /* 4) 브라우저 db에 opened 상태 기록해놓기 */
            // localStorage.setItem('opened', 'true');

            // 6) 보러가기 클릭 -> enableScroll -> 내부에서 audio도 작동
            // playAudio();
        },
        setScreenSize() {
            let vh = window.innerHeight * 0.01;
            console.log(this.$refs.hero.height)
            this.$refs.hero.height = `${100*vh}px`;
            console.log(this.$refs.hero.height)

        }
    }));
});