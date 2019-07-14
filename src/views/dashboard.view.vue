<template>
  <div>
    <ContentToolbar title="Dashboard" />
    <v-container fluid>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati, ex voluptatibus tempora in distinctio nam sunt alias vitae consequatur praesentium. Veritatis esse fugit eos quos est officiis voluptatibus quo iure?</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati, ex voluptatibus tempora in distinctio nam sunt alias vitae consequatur praesentium. Veritatis esse fugit eos quos est officiis voluptatibus quo iure?</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati, ex voluptatibus tempora in distinctio nam sunt alias vitae consequatur praesentium. Veritatis esse fugit eos quos est officiis voluptatibus quo iure?</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati, ex voluptatibus tempora in distinctio nam sunt alias vitae consequatur praesentium. Veritatis esse fugit eos quos est officiis voluptatibus quo iure?</p>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati, ex voluptatibus tempora in distinctio nam sunt alias vitae consequatur praesentium. Veritatis esse fugit eos quos est officiis voluptatibus quo iure?</p>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import ContentToolbar from '@/components/content-toolbar.vue';


@Component({
  components: {
    ContentToolbar,
  },
})
export default class Dashboard extends Vue {

}
</script>

<style lang="sass" scoped>

</style>


