<template>
  <div class="center w-100 h-200">
    <img
      src="../assets/img/bug-home.png"
      class="home-logo"
      alt=""
    >
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style scoped lang="scss">
.home{
  text-align: center;
  user-select: none;
  > img{
    height: 200px;
    width: 200px;
  }
}

.home-logo{
  max-height: 25vh;
  max-width: 25vw;

}
.center{
  justify-content:center;
  align-items: center;
  display: flex;
}
</style>
