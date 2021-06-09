<template>
  <div>
    <div class="lds-dual-ring"></div>
  </div>
</template>

<script>
export default {}
</script>

<style>
.lds-dual-ring {
  display: inline-block;
  width: 80px;
  height: 80px;
}
.lds-dual-ring:after {
  content: ' ';
  display: block;
  width: 100px;
  height: 100px;
  margin: 10px;
  border-radius: 50%;
  border: 10px solid #fff;
  border-color: #fca21b transparent #222f3e transparent;
  animation: lds-dual-ring 1.2s linear infinite;
}
@keyframes lds-dual-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>