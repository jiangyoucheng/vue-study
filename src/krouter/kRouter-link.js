// <router-link to="/about">about</router-link>
// <a href="#/about">about</a>
export default {
    props: {
        to: String,
        required: true
    },
    render(h) {
        // return <a href={'#' + this.to}>{this.$slots.default}</a>
        return h('a', {
            href: '#' + this.to
        },[
            this.$slots.default
        ])
    }
}