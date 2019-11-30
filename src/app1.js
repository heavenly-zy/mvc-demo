import './app1.css';
import $ from 'jquery';

// 数据相关的都放到 m
const m = {
    data: {
        n: parseInt(localStorage.getItem("n"))
    }
}
// 视图相关都放到 v
const v = {
    el: null,
    html: `
    <section id="app1">
                <div class="output">
                    <span id="number">{{n}}</span>
                </div>
                <div class="actions">
                    <button id="add1">+1</button>
                    <button id="minus1">-1</button>
                    <button id="mul2">x2</button>
                    <button id="divide2">÷2</button>
                </div>
            </section>
    `,
    render() {
        if (v.el === null) { // el为空就直接追加
            v.el = $(v.html.replace('{{n}}', m.data.n)).prependTo($('body>.page'))
        } else { // el不为空就用新的el替换之前旧的el
            const newEl = $(v.html.replace('{{n}}', m.data.n))
            v.el.replaceWith(newEl)
            v.el = newEl
        }
    }
}
// 其他都放到 c
const c = {
    init() {
        c.ui = {
            // 需要的元素
            button1: $("#add1"),
            button2: $("#minus1"),
            button3: $("#mul2"),
            button4: $("#divide2"),
            number: $("#number")
        },
            c.bindEvents() // 初始化后再绑定事件
    },
    bindEvents() {
        c.ui.button1.on("click", () => {
            m.data.n += 1
            v.render()
        })
        c.ui.button2.on("click", () => {
            let n = parseInt(c.ui.number.text())
            n -= 1
            localStorage.setItem("n", n)
            c.ui.number.text(n)
        })
        c.ui.button3.on("click", () => {
            let n = parseInt(c.ui.number.text())
            n *= 2
            localStorage.setItem("n", n)
            c.ui.number.text(n)
        })
        c.ui.button4.on("click", () => {
            let n = parseInt(c.ui.number.text())
            n /= 2
            localStorage.setItem("n", n)
            c.ui.number.text(n)
        })
    }
}
// 第一次渲染 HTML
v.render()

c.init() // v.render()执行后再执行c.init()，保证一定能获取到节点


