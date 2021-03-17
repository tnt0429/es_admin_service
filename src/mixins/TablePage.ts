export default {
    data() {
        return {
            formQuery: {
                pageStart: 1,
                pageSize: 15
            },
            total: 0
        }
    },
    methods: {
        onQuery(){

        },
        handleCurrentChange(val) {
            this.formQuery.pageStart = val;
            this.onQuery()
        },
        handleSizeChange(val) {
            this.formQuery.pageSize = val;
            this.onQuery()
        }
    }
}
