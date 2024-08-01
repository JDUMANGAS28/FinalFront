<template>
  <v-app class="app">
    <v-container class="fill-height" fluid>
      <v-row align="center" justify="center">
        <v-col cols="12" sm="7" md="8">
          <v-card class="elevation-12">
            <v-window v-model="step">
              <v-row>
                <v-col cols="12" md="6" class="rectangle-color">
                  <v-card-text class="white--text mt-16 pt-14 mx-auto">
                    <div class="logo-container">
                      <!-- Logo positioned at the right side -->
                      <img src="/src/assets/schoolLogo3.png" max-height="900" max-width="900" class="logo">
                    </div>
                    <div class="text-container text-center">
                      <h1 class="mt-10 h2 font-weight-black">ST.NICHOLAS ACADEMY OF CASTILLEJOS INC.</h1>
                      <p class="h6 font-weight-normal">CASTILLEJOS, ZAMBALES</p>
                    </div>
                  </v-card-text>
                </v-col>
                <v-col cols="12" md="6">
                  <v-card-text class="mt-1">
                    <div class="text-center mb-1">
                      <img src="/src/assets/schoolLogo.png" class="logo-logo">
                    </div>
                    <span class="sna-text">
                      <h4 class="text-center pt-2 pb-3 fs-7 font-weight-black">
                        CLINIC ADMINISTRATION
                      </h4>
                    </span>
                    <v-form @submit.prevent="login">
                      <v-text-field
                        v-model="email"
                        label="Email Address/ Student ID"
                        placeholder="e.g. 202407360@sna.edu.ph"
                        name="Email"
                        prepend-icon="mdi-email"
                        type="text"
                        color="var(--dark)"
                      />
                      <v-text-field
                        v-model="password"
                        :append-inner-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                        @click:append-inner="showPassword = !showPassword"
                        :type="showPassword ? 'text' : 'password'"
                        label="Password"
                        name="Password"
                        prepend-icon="mdi-lock"
                        color="var(--dark)"
                      />
                      <div class="text-center pt-5">
                        <v-btn rectangle color="var(--dark)" type="submit" style="color:white;">
                          Log in
                        </v-btn>
                      </div>
                    </v-form>
                  </v-card-text>
                  <div class="text-center pb-2">
                    <a href="" style="display: inline-block;">
                      St. Nicholas Academy General Privacy Notice
                    </a>
                  </div>
                </v-col>
              </v-row>
            </v-window>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      step: 1,
      email: '',
      password: '',
      showPassword: false,
      errorMessage: '',
    };
  },
  methods: {
    login() {
      axios.post('/clinicAuth ', {
        email: this.email,
        password: this.password,
      })
      .then(response => {
        console.log('Login successful:', response.data);
        this.$router.push('/dashboard');
      })
      .catch(error => {
        // Handle login error
        console.error('Login failed:', error.response.data.error);
        this.errorMessage = error.response.data.error; // Display error message if needed
      });
    },
  },
};
</script>

<style scoped>
.app {
  position: relative; /* Ensure the parent is positioned relative */
  background-image: url('../assets/BG.jpg');
  background-size: cover;
  background-repeat: no-repeat;
}

.app::before {
  content: ''; /* Required for pseudo-elements */
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4); /* Adjust the opacity value as needed */
}

.logo-container {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 300px;
  height: 100%;
  right: 100%; /* Adjust this value to move the container to the left */
}

.logo {
  width: 600px;
  height: 100%;
  object-fit: cover;
  filter: brightness(250%) grayscale(0%);
  opacity: 12%;
}

.logo-logo {
  max-height: 150px;
  max-width: 150px;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

.sna-text {
  color: var(--dark);
  font-size: 20px;
}

.text-container {
  position: relative;
  z-index: 1;
  color: white;
}

.rectangle-color {
  background-color: var(--dark);
}
</style>
