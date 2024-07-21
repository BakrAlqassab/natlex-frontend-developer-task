<template>
    <v-container>
      <v-row class="text-center">
        <v-col cols="12">  
            <v-img
            src="https://static.tildacdn.one/tild3233-6662-4763-a335-326231643561/_1.png"
            class="my-3 mx-auto"
            contain
            height="100"
            width="150"
          />
        </v-col>
  
        <v-col class="mb-4">
          <h1 class="display-2 font-weight-bold mb-3">
            Welcome to Bakr's land
          </h1>
  
          <p class="subheading font-weight-regular">
            For help and collaboration with other Vuetify developers,
            <br>please join our online
            <a
              href="https://community.vuetifyjs.com"
              target="_blank"
            >Discord Community</a>
          </p>
        </v-col>
  
        <v-col
          class="mb-5"
          cols="12"
        >
          <h2 class="headline font-weight-bold mb-3">
            What's next?
          </h2>
  
          <v-row justify="center">
            <a
              v-for="(next, i) in whatsNext"
              :key="i"
              :href="next.href"
              class="subheading mx-3"
              target="_blank"
            >
              {{ next.text }}
            </a>
          </v-row>
        </v-col>
  
        <v-col
          class="mb-5"
          cols="12"
        >
          <h2 class="headline font-weight-bold mb-3">
            Important Links
          </h2>
  
          <v-row justify="center">
            <a
              v-for="(link, i) in importantLinks"
              :key="i"
              :href="link.href"
              class="subheading mx-3"
              target="_blank"
            >
              {{ link.text }}
            </a>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
   import { mapState } from 'vuex'
    export default {
      name: 'HomeView',
      ...mapState(['entities', 'authenticatedUser']),
  
      data: () => ({
        importantLinks: [
          {
            text: 'Documentation',
            href: 'https://vuetifyjs.com',
          },
          {
            text: 'Chat',
            href: 'https://community.vuetifyjs.com',
          },
          {
            text: 'Made with Vuetify',
            href: 'https://madewithvuejs.com/vuetify',
          },
          {
            text: 'Twitter',
            href: 'https://twitter.com/vuetifyjs',
          },
          {
            text: 'Articles',
            href: 'https://medium.com/vuetify',
          },
        ],
        whatsNext: [
          {
            text: 'Explore components',
            href: 'https://vuetifyjs.com/components/api-explorer',
          },
          {
            text: 'Select a layout',
            href: 'https://vuetifyjs.com/getting-started/pre-made-layouts',
          },
          {
            text: 'Frequently Asked Questions',
            href: 'https://vuetifyjs.com/getting-started/frequently-asked-questions',
          },
        ],
      }),
    }
  </script>
  