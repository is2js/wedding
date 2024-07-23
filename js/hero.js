document.addEventListener('alpine:init', () => {
    Alpine.data("timer", (year, month, day, hours, minutes) => ({
        expiry: null,
        remaining: null,
        init() {
            // Ensure expiryDate is a Date object
            this.expiry = this.toKoreanTime(new Date(year, month - 1, day, hours, minutes)).getTime();
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
        }
    }));
});