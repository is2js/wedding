document.addEventListener('alpine:init', () => {
    //https://aggregata.de/en/blog/alpinejs/advanced-forms-with-alpine/
    Alpine.data('form', () => ({
        loading: false,
        response: null,
        async handleSubmit(e) {
            this.loading = true
            this.response = null

            const form = this.$refs.form;

            const data = new FormData(form);
            const action = form.action;
            const method = form.method;

            try {
                this.response = await fetch(action, {
                    method: method,
                    body: data,
                });
                this.loading = false;

                // 모달 닫기

                if (this.response.ok) {
                    alert('참석여부가 전달됐어요😁\n다음 접속시 자동으로 창이 뜨지 않으나,\n원하시면 재전송 가능합니다.');
                    await this.$store.modal.close();
                    localStorage.setItem('rsvp', JSON.stringify(true));

                    // form.reset();
                } else {
                    alert('전송 실패. 다시 시도해 주세요.😅');
                }
            } catch (error) {
                this.loading = false;
                await this.$store.modal.close();
                alert('전송 중 오류가 발생했습니다. 신랑/신부에게 알려주세요.');
            }
        },
    }));

    // toggle (checkbox)
    Alpine.data('radio', () => ({
        // title: config.title,
        // data: config.data,
        // name: config.name ?? 'radio',
        // isVertical: config.isVertical ?? false,
        data: {'🤵 신랑측': '신랑측', '👰 신부측': '신부측'},

        selectedValue: null,
        setValue(key) {
            this.selectedValue = this.data[key];
        },
        isSelected(key) {
            return this.selectedValue === this.data[key];
        },
        init() {
            // 초기화 단계에서 첫 번째 항목을 선택
            const firstKey = Object.keys(this.data)[0];
            this.setValue(firstKey);
        },
    }));

    Alpine.data('toggle', () => ({
        isOn: true,
        value: true,
        offText: '참석 불가 😢',
        onText: '참석 가능 😍',
        toggle() {
            if (this.isOn) {
                this.isOn = false;
                this.value = false;
            } else {
                this.isOn = true;
                // this.value = true;
                // false는 false가 들어가야하지만, true는 string이 들어갈 수 있기 때문에, sheet를 위한 텍스트로 편하게 줌.
                this.value = this.onText;
            }
        },
        getText() {
            if (this.isOn) {
                return this.onText;
            } else {
                return this.offText;
            }
        },
        init() {
            // 초기화시 input에 true가 들어가야하는데, 한 틱 있다가 true값을 onText로 바꿔놓기
            this.$nextTick(() => {
                this.value = this.onText;
            });
        }
    }));

    Alpine.data('inputNumber', () => ({
        value: null,
        min: 1,
        max: 10,
        step: 1,

        init() {
            this.value = this.min;
        },

        plus() {
            this.value = Math.min(this.value + this.step, this.max);
        },
        minus() {
            this.value = Math.max(this.value - this.step, this.min);
        },
        checkValid() {
            // x-model인 input에서 입력시 min/max 범위 검사
            if (this.value < this.min) {
                this.value = this.min;
            } else if (this.value > this.max) {
                this.value = this.max;
            }
        },
    }));
});
