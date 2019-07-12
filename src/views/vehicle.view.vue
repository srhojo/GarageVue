<template>
  <div id="vehicleView">
    <ContentToolbar :title="vehicle.name" :buttons="vehicleButtons" backButton="true"></ContentToolbar>
    <!-- Imagen del vehiculo -->
    <v-responsive fluid>
      <v-img
        :gradient="gradient"
        :aspect-ratio="16/9"
        :src="vehicle.img"
        :alt="vehicle.name"
        width="100%"
        height="300px"
        position="center center"
      ></v-img>
    </v-responsive>
    <!-- Información del vehiculo -->
    <v-form>
      <v-container fluid>
        <v-layout wrap>
          <v-flex xs12 md6>
            <v-text-field
              label="Marca"
              v-model="vehicle.brand"
              :disabled="!isUpdating"
              color="blue-grey lighten-2"
              box
            ></v-text-field>
          </v-flex>
          <v-flex xs12 md6>
            <v-text-field
              label="Modelo"
              v-model="vehicle.name"
              :disabled="!isUpdating"
              color="blue-grey lighten-2"
              box
            ></v-text-field>
          </v-flex>
          <v-flex xs12 md6>
            <v-text-field
              label="Color"
              v-model="vehicle.color"
              :disabled="!isUpdating"
              color="blue-grey lighten-2"
              box
            ></v-text-field>
          </v-flex>
          <v-flex xs12 md6>
            <v-text-field
              label="Año"
              v-model="vehicle.year"
              :disabled="!isUpdating"
              color="blue-grey lighten-2"
              box
            ></v-text-field>
          </v-flex>
          <v-flex xs12 md12>
            <v-text-field
              label="Comentarios"
              v-model="vehicle.comments"
              :disabled="!isUpdating"
              color="blue-grey lighten-2"
              box
            ></v-text-field>
          </v-flex>
        </v-layout>
        <!-- fin información del vehiculo -->
        <v-divider></v-divider>
        <!-- Tabla de revisiones -->
        <v-layout row wrap>
          <v-flex xs12>
            <v-toolbar flat color="white">
              <v-toolbar-title>Revisiones</v-toolbar-title>

              <v-spacer></v-spacer>
              <v-dialog v-model="dialog" max-width="500px">
                <template v-slot:activator="{ on }">
                  <v-btn color="primary" dark v-on="on" icon>
                    <v-icon>add</v-icon>
                  </v-btn>
                </template>
                <v-card>
                  <v-card-title>
                    <span class="headline">Añadir revisión:</span>
                  </v-card-title>

                  <v-card-text>
                    <v-container grid-list-md>
                      <v-layout wrap>
                        <v-flex xs12 md12>
                          <v-text-field
                            v-model="carInspection.shortDescription"
                            label="Descripción corta:"
                          ></v-text-field>
                        </v-flex>
                        <v-flex xs12 md12>
                          <v-text-field v-model="carInspection.description" label="Descripción:"></v-text-field>
                        </v-flex>
                        <v-flex xs12 md6>
                          <v-text-field v-model="carInspection.price" label="Precio (€)"></v-text-field>
                        </v-flex>
                        <v-flex xs12 md6>
                          <v-text-field v-model="carInspection.date" label="Fecha"></v-text-field>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click="close">Cancelar</v-btn>
                    <v-btn color="blue darken-1" flat @click="save">Guardar</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
            <v-data-table :headers="headers" :items="carInspections" class="elevation-1" fluid>
              <template v-slot:items="props">
                <td class="text-xs-right">{{ props.item.id }}</td>
                <td class="text-lg-right">{{ props.item.shortDescription }}</td>
                <td class="text-xs-right">{{ props.item.date }}</td>
                <td class="text-xs-right">{{ props.item.price }}</td>
                <td class="justify-center layout px-0">
                  <v-icon small class="mr-2" @click="editItem(props.item)">edit</v-icon>
                  <v-icon small @click="deleteItem(props.item)">delete</v-icon>
                </td>
              </template>
            </v-data-table>
          </v-flex>
        </v-layout>
      </v-container>
    </v-form>
  </div>
</template>

<script lang='ts'>
import { Component, Prop, Vue } from 'vue-property-decorator';
import ContentToolbar from '../components/ContentToolbar.vue';
import { IVehicle as VehicleType } from './types';

@Component({
  components: {
    ContentToolbar,
  },
})
export default class Vehicle extends Vue {
  @Prop() private vehicle!: VehicleType;
  private isUpdating: boolean = false;
  private dialog: boolean = false;
  private carInspections: any = [];

  private data() {
    return {
      editedIndex: -1,
      gradient: 'to top right, rgba(96,125,138, .3), rgba(186,232,255, .3)',
      vehicleButtons: [
        {
          name: 'update',
          icon: 'edit',
          method: this.changeUpdating,
        },
      ],
      headers: [
        {
          text: 'Id',
          sortable: false,
          value: 'id',
        },
        {
          text: 'Descripción corta',
          align: 'right',
          sortable: false,
          value: 'shortDescription',
        },
        { align: 'right', text: 'Fecha', value: 'date' },
        { align: 'right', text: 'Price (€)', value: 'price' },
        { align: 'right', text: 'Actions', value: 'id', sortable: false },
      ],
      carInspection: {
        id: 0,
        vehicleId: 0,
        shortDescription: '',
        description: '',
        date: '',
        price: '',
      },
      defaultCarInspection: {
        id: 0,
        vehicleId: 0,
        shortDescription: '',
        description: '',
        date: '',
        price: '',
      },
    };
  }

  private revisedRandId() {
    return Math.random()
      .toString(36)
      .replace(/[^a-z]+/g, '')
      .substr(2, 10);
  }

  private changeUpdating() {
    this.isUpdating = !this.isUpdating;
  }

  private updateVehicle(updatedVehicle: any) {
    this.isUpdating = false;
  }
  private close() {
    this.dialog = false;
    setTimeout(() => {
      this.$data.carInspection = Object.assign(
        {},
        this.$data.defaultCarInspection,
      );
      this.$data.editedIndex = -1;
    }, 300);
  }
  private editItem(item: any) {
    this.$data.editedIndex = this.carInspections.indexOf(item);
    this.$data.carInspection = Object.assign({}, item);
    this.dialog = true;
  }
  private deleteItem(item: any) {
    const index = this.carInspections.indexOf(item);
    confirm('Are you sure you want to delete this item?') &&
      this.carInspections.splice(index, 1);
  }
  private save() {
    if (this.$data.editedIndex > -1) {
      Object.assign(
        this.carInspections[this.$data.editedIndex],
        this.$data.carInspection,
      );
    } else {
      this.$data.carInspection.id = this.revisedRandId();
      this.carInspections.push(this.$data.carInspection);
    }
    this.close();
  }
}
</script>
