<script>
export default {

};
</script>

<template>
  <div class="header">
    <div class="header__logo">
      <strong>LOGO</strong>
    </div>
    <nav class="navbar">
      <ul class="navbar__menu">
        <li class="navbar__item">
          <router-link :to="{ name: 'home' }" class="navbar__link"
            ><i data-feather="home"></i><span>Home</span>
          </router-link>
        </li>
        <li class="navbar__item">
          <router-link :to="{ name: 'info' }" class="navbar__link"
            ><i data-feather="Info"></i><span>Info</span>
          </router-link>
        </li>
        <li class="navbar__item">
          <router-link :to="{ name: 'projects' }" class="navbar__link"
            ><i data-feather="projects"></i><span>projects</span>
          </router-link>
        </li>
        
      </ul>
    </nav>
  </div>
</template>

<style lang="scss" scoped>
$borderRadius: 10px;
$spacer: 1rem;
$primary: #c4151c;
$text: #fff;
$linkHeight: $spacer * 3.5;
$timing: 250ms;
$transition: $timing ease all;
$linkWidth: 10rem;

@import url("https://fonts.googleapis.com/css2?family=Open+Sans:wght@600&display=swap");
body {
  background: #000 url(https://unsplash.it/1600/1000/?random);
  background-size: cover;
  background-position: center;
  font-family: "Open Sans", sans-serif;
}

.header {
  $ref: &;
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.9);
  color: $text;
  padding: 0 $spacer * 2;
  box-shadow: 0 0 40px rgba(0, 0, 0, 0.03);
  height: 6rem;
  display: flex;
  align-items: center;
  gap: 3rem;
}

.navbar {
  display: flex;
  align-items: center;
  height: 100%;
  margin: 0 auto;
  overflow: hidden;
  &__menu {
    position: relative;
    display: flex;
  }
  &__link {
    position: relative;
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    align-items: center;
    justify-content: center;
    height: $linkHeight;
    width: $linkWidth;
    color: $text;
    transition: $transition;
    text-decoration: none;
    width: $linkWidth;
    text-transform: uppercase;
    transition: 500ms ease all;
    svg {
      transition: 500ms ease all;
    }
    &:hover {
      svg {
        stroke: $primary;
      }
    }
    .navbar:not(:hover) &:focus,
    &:hover {
      span {
        opacity: 1;
        transform: translate(0);
      }
    }
  }
  &__item {
    &:last-child {
      &:before {
        content: "";
        position: absolute;
        left: -8rem;
        margin-left: $linkWidth/2;
        bottom: -1.25rem;
        height: 0.5rem;
        width: 2px;
        background: $primary;
        $speedlineColor: rgba(#fff, 0.2);
        $speedGap: 3rem;
        $shadow: 0 -0.5rem $primary, 0 -0.5rem $primary,
          0 0 $speedGap 0.5rem $primary, 2rem 0 0 $speedlineColor,
          -$speedGap 0 0 $speedlineColor;
        @for $i from 2 to 120 {
          $shadow: $shadow + #{","}+ $i * $speedGap 0 0 $speedlineColor;
          $shadow: $shadow + #{","}+ $i * -$speedGap 0 0 $speedlineColor;
        }
        box-shadow: $shadow;
        transition: 500ms ease all;
      }
    }

    // Ciclo per generare gli stili in base al numero di elementi nella navbar
    @for $i from 1 to 12 {
      // Se ci sono $i elementi
      &:first-child:nth-last-child(#{$i}),
      &:first-child:nth-last-child(#{$i}) ~ li {
        // Per ciascun elemento fino a $i
        @for $j from 1 to $i {
          // Quando il cursore passa sopra l'elemento $j
          &:nth-child(#{$j}):hover ~ li:last-child:before {
            // Sposta l'ombra dell'ultimo elemento
            left: (100% / $i) * ($j - 1);
          }
        }
        // Quando il cursore passa sopra l'ultimo elemento
        &:last-child:hover:before {
          left: (100% / $i) * ($i - 1);
        }
      }
    }
  }
}
</style>