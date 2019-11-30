import './app3.css';
import $ from 'jquery';

const html = `
<section id="app3">
            <div class="square"></div>
        </section>
`

$(html).appendTo($('body>.page'))

const $square = $('#app3 .square')
const localKey = 'app3.active'
const active = localStorage.getItem(localKey) === 'yes' // true/false

$square.toggleClass('active', active) // 第二个参数为true就添加active，为false就删除active

$square.on('click', () => {
    if ($square.hasClass('active')) {
        $square.removeClass('active')
        localStorage.setItem(localKey, 'no')
    } else {
        $square.addClass('active')
        localStorage.setItem(localKey, 'yes')
    }
})