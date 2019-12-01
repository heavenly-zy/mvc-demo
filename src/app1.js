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
        v.el = $(container)
    },
    render(n) {
        if (v.el.children.length !== 0) v.el.empty()
        $(v.html.replace('{{n}}', n)).appendTo(v.el)
    }
}
// 其他都放到 c
const c = {
    init(container) {
        v.init(container)
        v.render(m.data.n) // view = render(data)
        c.autoBindEvents() // 初始化后再绑定事件
    },
    events: {
        'click #add1': 'add',
        'click #minus1': 'minus',
        'click #mul2': 'mul',
        'click #divide2': 'div'
    },
    add() {
        m.data.n += 1
        v.render(m.data.n)
    },
    minus() {
        m.data.n -= 1
        v.render(m.data.n)
    },
    mul() {
        m.data.n *= 2
        v.render(m.data.n)
    },
    div() {
        m.data.n /= 2
        v.render(m.data.n)
    },
    autoBindEvents() {
        for (let key in c.events) {
            const value = c[c.events[key]]
            const spaceIndex = key.indexOf(' ')
            const part1 = key.slice(0, spaceIndex)
            const part2 = key.slice(spaceIndex + 1)
            v.el.on(part1, part2, value)
        }
    }
}

c.init('#app1')

/* render()后节点刷新，因此不能直接绑定节点(刷新后bindEvents()找不到节点)，
需要在外面传一个父容器(#app1)进来，这时候刷新的只是父容器里面的div，
父容器不变，里面的div变(刷新)，刷新之后的id也不变
因此此时就可以用事件委托(监听父容器)来解决这个bug
*/

