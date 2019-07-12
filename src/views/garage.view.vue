<template>
  <div>
    <ContentToolbar title="Garage" :buttons="garageButtons"></ContentToolbar>

    <v-container fluid grid-list-md>
      <v-layout row wrap>
        <v-flex v-for="(card, id) in vehicleCards" :key="id" xs4>
          <v-hover>
            <v-card slot-scope="{ hover }">
              <!-- Imagen de la card -->
              <v-img :src="checkImage(card.image)" :aspect-ratio="16/9">
                <v-expand-transition>
                  <div
                    v-if="hover"
                    class="d-flex transition-fast-in-fast-out blue-grey darken-2 v-card--reveal display-3 white--text"
                    style="height: 100%;"
                    v-text="card.model"
                  ></div>
                </v-expand-transition>
              </v-img>
              <!-- Texto de la card -->
              <v-card-title>
                <div>
                  <span class="grey--text" v-text="card.brand"></span>
                  <br />
                  <span>
                    Color:
                    <span v-text="card.color"></span>
                  </span>

                  <v-spacer></v-spacer>
                  <span>
                    Año:
                    <span v-text="card.year"></span>
                  </span>
                </div>
              </v-card-title>
              <!-- Botones de acción -->
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn icon @click="viewVehicle(card)">
                  <v-icon>more_vert</v-icon>
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-hover>
        </v-flex>

        <v-dialog v-model="creatingVehicle" max-width="500px">
          <v-card>
            <v-card-title>
              <span class="headline">Nuevo vehiculo:</span>
            </v-card-title>

            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex xs12 sm6 d-flex>
                    <v-select
                      v-model="newVehicle.type"
                      :items="vehicleTypes"
                      item-text="label"
                      item-value="value"
                      label="Tipo de vehiculo:"
                    ></v-select>
                  </v-flex>
                  <v-flex xs12 md6>
                    <v-text-field v-model="newVehicle.licensePlate" label="Matricula:"></v-text-field>
                  </v-flex>
                  <v-flex xs12 md6>
                    <v-text-field v-model="newVehicle.branch" label="Marca:"></v-text-field>
                  </v-flex>
                  <v-flex xs12 md6>
                    <v-text-field v-model="newVehicle.model" label="Modelo:"></v-text-field>
                  </v-flex>
                  <v-flex xs12 md6>
                    <v-text-field v-model="newVehicle.color" label="Color:"></v-text-field>
                  </v-flex>
                  <v-flex xs12 md6>
                    <v-text-field v-model="newVehicle.year" label="Año:"></v-text-field>
                  </v-flex>
                  <v-flex xs12 md12>
                    <v-text-field
                      v-model="newVehicle.information"
                      label="Información del vehiculo:"
                    ></v-text-field>
                  </v-flex>
                </v-layout>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" flat @click="close">Cancelar</v-btn>
              <v-btn color="blue darken-1" flat @click="createVehicle">Guardar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-layout>
    </v-container>
  </div>
</template>

<script lang='ts'>
import { Component, Vue } from 'vue-property-decorator';
import router from '../router';

import ContentToolbar from '../components/ContentToolbar.vue';

import { IVehicle, IContainer } from './types';
import { vehicleService } from './services';


class VehicleRequest implements IVehicle {
  //public id: number = 0;
  public type: string = '';
  public licensePlate: string = '';
  public branch: string = '';
  public model: string = '';
  //public information: string = '';
  public color: string = '';
  public year: string = '';
  //public image: string = '';
}

@Component({
  components: {
    ContentToolbar,
  },
})
export default class Garage extends Vue {
  private vehicleCards: IVehicle[] = <IVehicle[]>[];
  private creatingVehicle: boolean = false;
  private newVehicle: VehicleRequest = new VehicleRequest();
  private data() {
    return {
      vehicleTypes: [{
        value: 'CAR',
        label: 'Coche',
      }, {
        value: 'MOTORCYCLE',
        label: "Moto",
      }],
      garageButtons: [{
        name: 'new',
        icon: 'add',
        method: this.openCreateModal,
      }, {
        name: 'Refresh',
        icon: 'refresh',
        method: this.refreshVehicles,
      }],
    };
  }

  private checkImage(image: string) {
    return image ? `data:image/png;charset=utf-8;base64,${image}` : require('../assets/no-image.png');
  }

  private openCreateModal() {
    this.creatingVehicle = true;
    this.newVehicle = new VehicleRequest();

  }

  private createVehicle(): void {
    vehicleService.createVehicle(<IVehicle>this.newVehicle).then((response) => this.vehicleCards.push(response.data));
  }

  private close() {
    this.creatingVehicle = false;
    this.newVehicle = new VehicleRequest();
  }


  private refreshVehicles(): void {
    this.vehicleCards = [];
    vehicleService.getVehicles().then((response) => this.vehicleCards = response.data.values);
  }

  private viewVehicle(selectedVehicle: any) {
    console.log(selectedVehicle);
    router.push({ name: 'vehicle', params: { vehicle: selectedVehicle } });
  }


}
</script>

<style scoped lang='scss'>
  .v-card--reveal {
    align-items: center;
    bottom: 0;
    justify-content: center;
    opacity: 0.5;
    position: absolute;
    width: 100%;
  }
</style>

