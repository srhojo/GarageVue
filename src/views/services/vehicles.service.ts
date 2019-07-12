import axios from 'axios';
import { IVehicle, IContainer } from '../types';

const host = 'http://127.0.0.1:8881';
const garageApi = '/garage';


class VehicleService {
    private vehicles: IVehicle[] = [];

    /**
     * getVehicles
     */
    public getVehicles() {
        return axios.get<IContainer>(`${host}${garageApi}/vehicles`);
    }

    /**
     * getVehicleById
     */
    public getVehicleById(id: number) {
        return axios.get<IVehicle>(`${host}${garageApi}/vehicles/${id}`);
    }

    /**
     * createVehicle
     */
    public createVehicle(vehicle: IVehicle) {
        console.log(vehicle);
        return axios.post<IVehicle>(`${host}${garageApi}/vehicles`, { vehicle });
    }

    /**
     * updateVehicle
     */
    public updateVehicle(id: number, vehicle: IVehicle) {
        return axios.put<IVehicle>(`${host}${garageApi}/vehicles/${id}`, { vehicle });
    }
}

// Export singleton instance
export const vehicleService = new VehicleService();

