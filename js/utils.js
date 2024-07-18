const addComma = (number) => {
    if (number !== null) {
        return number.toLocaleString();
    }
};

const copyToClipboardAndAlert = (text, message) => {
    navigator.clipboard.writeText(text);
    alert(message);
};

export {addComma, copyToClipboardAndAlert};

// alpinejs 유틸 magic을 정의와 동시에 export
// -> 받는 쪽에선 import 임의의변수 from '.js' 이후 Alpine.plugin으로 등록하면 전역으로 등록된다.
export default function (Alpine) {
    Alpine.magic('clipboard', () => (text, message) => {
        navigator.clipboard.writeText(text);
        alert(message);
    })
}