import './app1.css';
import $ from 'jquery';

// 数据相关的都放到 m
const m = {
    data: {
        n: localStorage.getItem("n")
    }
}
// 视图相关都放到 v
const v = {
    html: `
    <section id="app1">
                <div class="output">
                    <span id="number">100</span>
                </div>
                <div class="actions">
                    <button id="add1">+1</button>
                    <button id="minus1">-1</button>
                    <button id="mul2">x2</button>
                    <button id="divide2">÷2</button>
                </div>
            </section>
    `,
    update() {
        c.ui.number.text(n || 100)
    },
    render() {
        $(v.html).prependTo($('body>.page'))
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
            let n = parseInt(c.ui.number.text())
            n += 1
            localStorage.setItem("n", n)
            c.ui.number.text(n)
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


