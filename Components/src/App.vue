<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <nav class="navbar navbar-light bg-light">
    <div class="container d-flex justify-content-between align-items-center">
      <a class="navbar-brand fw-bold" href="#">
        <img
          src="https://getbootstrap.com//docs/4.0/assets/brand/bootstrap-solid.svg"
          width="30"
          height="30"
          class="d-inline-block align-top me-2"
          alt=""
        />
        GalleryStrap 4/5
      </a>
      <div class="btn-group" role="group">
        <router-link activeClass="active" to="/" class="btn btn-outline-primary"
          >Entry</router-link
        >
        <router-link
          activeClass="active"
          to="/saved"
          class="btn btn-outline-success"
          >Saved</router-link
        >
      </div>
    </div>
  </nav>
  <router-view></router-view>
</template>
