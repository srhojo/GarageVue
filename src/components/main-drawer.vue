<template>
  <v-navigation-drawer v-model="drawer" :mini-variant="mini" absolute dark clipped app>
    <!-- Titulo de la navigation drawer -->
    <v-list class="pa-1">
      <v-list-tile v-if="mini" @click.stop="mini = !mini">
        <v-list-tile-action>
          <v-icon>chevron_right</v-icon>
        </v-list-tile-action>
      </v-list-tile>

      <v-list-tile avatar tag="div">
        <v-list-tile-avatar>
          <img src="../assets/fenix.jpg" />
        </v-list-tile-avatar>

        <v-list-tile-content>
          <v-list-tile-title>GarageApp</v-list-tile-title>
        </v-list-tile-content>

        <v-list-tile-action>
          <v-btn icon @click.stop="mini = !mini">
            <v-icon>chevron_left</v-icon>
          </v-btn>
        </v-list-tile-action>
      </v-list-tile>
    </v-list>

    <!-- Elementos de la navigation drawer -->
    <v-list class="pt-0" dense>
      <v-divider light></v-divider>

      <v-list-tile @click="appRoute('dashboard')">
        <v-list-tile-action>
          <v-icon>dashboard</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Dashboard</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>

      <v-list-tile @click="appRoute('garage')">
        <v-list-tile-action>
          <v-icon>directions_car</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>
          <v-list-tile-title>Garage</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import router from '../router';

@Component
export default class Drawer extends Vue {

  private appRoute(routeName: string): void {
    router.push({ name: routeName });
  }

  private data() {
    return {
      drawer: null,
      mini: false,
    };
  }

}
</script>

