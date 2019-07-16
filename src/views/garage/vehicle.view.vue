<template>
  <div id="vehicleView">
    <ContentToolbar :title="vehicle.model" :buttons="vehicleButtons" backButton="true"></ContentToolbar>
    <!-- Imagen del vehiculo -->
    <v-responsive fluid>
      <v-img
        :gradient="gradient"
        :aspect-ratio="16/9"
        :src="checkImage(vehicle.image)"
        :alt="vehicle.model"
        width="100%"
        height="300px"
        position="center center"
      >
        <input
          type="file"
          style="display: none"
          ref="image"
          accept="image/*"
          @change="onFilePicked"
        />
        <v-btn fab dark color="indigo" left @click="pickFile">
          <v-icon dark>add</v-icon>
        </v-btn>
      </v-img>
    </v-responsive>
    <!-- Información del vehiculo -->
    <v-form>
      <v-container fluid>
        <v-layout wrap>
          <v-flex xs12 md6>
            <v-text-field
              label="Marca"
              v-model="vehicle.branch"
              :disabled="!isUpdating"
              color="blue-grey lighten-2"
              box
            ></v-text-field>
          </v-flex>
          <v-flex xs12 md6>
            <v-text-field
              label="Modelo"
              v-model="vehicle.model"
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
              v-model="vehicle.information"
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
              <v-dialog v-model="inspectionDialog" max-width="500px">
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
                            v-model="newInspection.shortDescription"
                            label="Descripción corta:"
                          ></v-text-field>
                        </v-flex>
                        <v-flex xs12 md12>
                          <v-text-field v-model="newInspection.description" label="Descripción:"></v-text-field>
                        </v-flex>
                        <v-flex xs12 md6>
                          <v-text-field v-model="newInspection.price" label="Precio (€)"></v-text-field>
                        </v-flex>
                        <v-flex xs12 md6>
                          <v-text-field v-model="newInspection.date" label="Fecha"></v-text-field>
                        </v-flex>
                      </v-layout>
                    </v-container>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" flat @click="closeDialog">Cancelar</v-btn>
                    <v-btn color="blue darken-1" flat @click="save">Guardar</v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-toolbar>
            <v-data-table
              :headers="headersTableInspection"
              :items="vehicleInspections"
              class="elevation-1"
              fluid
            >
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
import router from '@/router';
import { Component, Prop, Vue } from 'vue-property-decorator';

import ContentToolbar, { ToolBarButton } from '@/components/content-toolbar.vue';

import { vehicleService } from '@/views/services';

import { MethodsUtils } from '../../utils';
import { Vehicle, VehicleInspection } from '../types';

@Component({
    components: {
        ContentToolbar,
    },
})
export default class VehicleView extends Vue {
    private vehicle: Vehicle = new Vehicle();
    private newInspection: VehicleInspection = new VehicleInspection();
    private vehicleInspections: VehicleInspection[] = [];

    private isUpdating: boolean = false;
    private vehicleButtonsToEdit: ToolBarButton[] = [new ToolBarButton('update', 'edit', this.changeUpdating)];
    private vehicleButtonsEditing: ToolBarButton[] = [new ToolBarButton('save', 'save', this.updateVehicle)];

    $refs!: {
        image: HTMLElement;
    };

    private created() {
        this.$data.vehicleId = this.$route.params.vehicleId;
        vehicleService.getVehicleById(Number(this.$data.vehicleId)).then(response => (this.vehicle = response.data));
        this.loadToolbarButtons();
    }

    private data() {
        return {
            vehicleId: 0,
            //isUpdating: false,
            inspectionDialog: false,
            editedIndex: -1,
            gradient: 'to top right, rgba(96,125,138, .3), rgba(186,232,255, .3)',
            vehicleButtons: this.vehicleButtonsToEdit,
            headersTableInspection: [
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
            checkImage: MethodsUtils.checkImage,
        };
    }

    /** Vehicle Methods */
    private changeUpdating() {
        this.isUpdating = !this.isUpdating;
        this.loadToolbarButtons();
    }

    private loadToolbarButtons() {
        this.$data.vehicleButtons = this.isUpdating ? this.vehicleButtonsEditing : this.vehicleButtonsToEdit;
    }

    private updateVehicle(updatedVehicle: any) {
        this.changeUpdating();
    }

    private pickFile() {
        this.$refs.image.click();
    }

    private onFilePicked(e) {
        const files = e.target.files;
        if (files[0] !== undefined) {
            const fr = new FileReader();
            fr.readAsDataURL(files[0]);
            fr.addEventListener('load', () => {
                vehicleService
                    .addVehicleImage(<number>this.$data.vehicleId, files[0])
                    .then(response => (this.vehicle = response.data));
            });
        }
    }

    /** END - Vehicle Methods */

    /** Inspection Methods */
    private closeDialog() {
        this.$data.inspectionDialog = false;
        setTimeout(() => {
            this.$data.carInspection = Object.assign({}, this.$data.defaultCarInspection);
            this.$data.editedIndex = -1;
        }, 300);
    }
    private editItem(item: any) {
        this.$data.editedIndex = this.vehicleInspections.indexOf(item);
        this.$data.carInspection = Object.assign({}, item);
        this.$data.inspectionDialog = true;
    }
    private deleteItem(item: any) {
        const index = this.vehicleInspections.indexOf(item);
        confirm('Are you sure you want to delete this item?') && this.vehicleInspections.splice(index, 1);
    }
    private save() {
        if (this.$data.editedIndex > -1) {
            Object.assign(this.vehicleInspections[this.$data.editedIndex], this.$data.carInspection);
        } else {
            this.$data.carInspection.id = MethodsUtils.revisedRandId();
            this.vehicleInspections.push(this.$data.carInspection);
        }
        this.closeDialog();
    }
    /** END - Inspection Methods */
}
</script>
