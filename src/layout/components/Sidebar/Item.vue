<script>
export default {
    name: 'MenuItem',
    functional: true,
    props: {
        icon: {
            type: String,
            default: ''
        },
        title: {
            type: String,
            default: ''
        }
    },
    render(h, context) {
        let {icon, title} = context.props
        const vnodes = []

        if (icon) {
            icon = icon + " svg-icon";
            vnodes.push(<i class={icon}></i>);
            vnodes.push(' ');
            // vnodes.push(<svg-icon icon-class={icon}/>)
        }

        if (title) {
            vnodes.push(< span
                slot='title'> {(title)
            }<
                /span>)
        }
        return vnodes
    }
}
</script>
