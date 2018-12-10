export default function render(input:any) {
    let el = document.createElement('div');
    el.classList.add('hello');
    el.innerHTML = input + '-XXX2';
    document.body.appendChild(el);
}