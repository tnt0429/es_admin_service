<!-- 患者基础信息 -->
<template>
    <PatientsList :load-type="4"/>
</template>

<script>

export default {
    name: "PatientsMess",
    components: {
        PatientsList: () => import("./PatientsList")
    }
}
</script>

<style scoped>

</style>
