<template>
  <div class="mainDiv">
    <!--        <img src="../assets/images/main/main_img.png" alt="img" class="imgImg">-->
  </div>
</template>

<script>
  export default {
    name: 'Dashboard',
    data() {
      return {};
    }
  };
</script>

<style scoped lang="scss">
  .mainDiv {
    position: fixed;
    height: 100%;
    width: 100%;
    /*background: url(../assets/images/main/main_background.png) no-repeat fixed center;*/
    background: url(../../assets/images/main/main_background.png) repeat fixed center;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .imgImg {
    width: 30rem;
    margin-top: -4rem;
    margin-left: -10rem;
  }

</style>
