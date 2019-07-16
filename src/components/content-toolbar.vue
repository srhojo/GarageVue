<template>
  <v-toolbar color="blue-grey" dark clipped-right>
    <v-btn icon v-if="backButton">
      <v-icon @click="historyBack">arrow_back</v-icon>
    </v-btn>
    <v-toolbar-title>{{ title }}</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn v-for="button in buttons" :key="button.name" icon>
      <v-icon @click="button.method">{{button.icon}}</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';
import router from '@/router';

export class ToolBarButton {
    constructor(public name: string, public icon: string, public method?: any) {}
}

@Component
export default class ContentToolbar extends Vue {
    @Prop() private title!: string;
    @Prop() private buttons!: ToolBarButton[];
    @Prop() private backButton!: {
        type: boolean;
        default: () => false;
    };

    private historyBack = () => router.go(-1);
}
</script>

