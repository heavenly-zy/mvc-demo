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
    <div>
                <div class="output">
                    <span id="number">{{n}}</span>
                </div>
                <div class="actions">
                    <button id="add1">+1</button>
                    <button id="minus1">-1</button>
                    <button id="mul2">x2</button>
                    <button id="divide2">÷2</button>
                </div>
            </div>
    `,
    init(container) {
        v.container = $(container)
        v.render()
    },
    render() {
        if (v.el === null) { // el为空就直接追加
            v.el = $(v.html.replace('{{n}}', m.data.n)).prependTo(v.container)
        } else { // el不为空就用新的el替换之前旧的el
            const newEl = $(v.html.replace('{{n}}', m.data.n))
            v.el.replaceWith(newEl)
            v.el = newEl
        }
    }
}
// 其他都放到 c
const c = {
    init(container) {
        v.init(container)
        c.ui = {
            // 需要的元素
            button1: $("#add1"),
            button2: $("#minus1"),
            button3: $("#mul2"),
            button4: $("#divide2"),
            number: $("#number")
        }
        c.bindEvents() // 初始化后再绑定事件
    },
    bindEvents() {
        v.container.on('click', '#add1', () => {
            m.data.n += 1
            v.render() 
        })
        v.container.on('click', '#minus1', () => {
            m.data.n -= 1
            v.render()
        })
        v.container.on('click', '#mul2', () => {
            m.data.n *= 2
            v.render()
        })
        v.container.on('click', '#divide2', () => {
            m.data.n /= 2
            v.render()
        })
    }
}

c.init('#app1')

/* render()后节点刷新，因此不能直接绑定节点(刷新后bindEvents()找不到节点)，
需要在外面传一个父容器(#app1)进来，这时候刷新的只是父容器里面的div，
父容器不变，里面的div变(刷新)，刷新之后的id也不变
因此此时就可以用事件委托(监听父容器)来解决这个bug
*/

