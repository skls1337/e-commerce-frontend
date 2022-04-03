<template>
 <div class="carousel-wrapper hero d-flex justify-content-center">
  <div class="carousel-container">
    <div class="carousel">
      <div class="image-one"></div>
      <div class="image-two"></div>
      <div class="image-three"></div>
    </div>
  </div>
</div>
</template>

<script>

export default {};
</script>

<style lang="scss" scoped>
.hero {
  background: #202020;
}
h1,
h2 {
  color: #ff7b00;
}
$size-width: 750px;
$size-height: 250px;

.carousel-wrapper {
  width: 50%;
  height: $size-height * 1.4;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 5px 5px 25px 0px rgba(46, 61, 73, 0.2);
  margin-bottom: 20px;
  margin-top: 20px;
  margin-left: 25%;
}

.carousel-container {
  width: $size-width;
  height: $size-height;
  overflow: hidden;
  margin: 0 auto;
}

.carousel {
  display: flex;
  width: $size-width * 3;
  animation: sliding 12s infinite;
  div {
    width: $size-width;
    height: $size-height;
    background-size: cover;
    background-position: center;
  }
  &:hover {
    animation-play-state: paused;
  }
  .image-one {
    background-image: url("https://www.tirerack.com/content/dam/tirerack/desktop/components/hero/TDG_0419.jpg");
  }
  .image-two {
    background-image: url("https://www.pieseauto.ro/poze/poza/poza-199f8ef8c8d50f4aed-0-0-0-0-0.jpg");
  }
  .image-three {
    background-image: url("https://www.4tuning.ro/images/10-dintre-cele-mai-confortabile-scaune-de-sofer/10-dintre-cele-mai-confortabile-scaune-de-sofer-fd7d0f84b3dd83a39d-0-0-0-0-0.jpg");
  }
}

@keyframes sliding {
  30% {
    transform: translateX(0);
  }
  35% {
    transform: translateX(-$size-width);
  }
  65% {
    transform: translateX(-$size-width);
  }
  70% {
    transform: translateX(-$size-width * 2);
  }
  98% {
    transform: translateX(-$size-width * 2);
  }
  100% {
    transform: translateX(0);
  }
}

@media screen and (max-width: 768px) {
  $size-width: 240px;
  $size-height: 150px;
  .carousel-wrapper {
    width: $size-width * 1.3;
    height: $size-height * 1.4;
  }

  .carousel-container {
    width: $size-width;
    height: $size-height;
  }

  .carousel {
    width: $size-width * 3;
    > div {
      width: $size-width;
      height: $size-height;
    }
  }

  @keyframes sliding {
    30% {
      transform: translateX(0);
    }
    35% {
      transform: translateX(-$size-width);
    }
    65% {
      transform: translateX(-$size-width);
    }
    70% {
      transform: translateX(-$size-width * 2);
    }
    98% {
      transform: translateX(-$size-width * 2);
    }
    100% {
      transform: translateX(0);
    }
  }
}

</style>
