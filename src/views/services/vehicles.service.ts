import axios from 'axios';
import { IVehicle, IContainer } from '@/views/types';

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
        return axios.post(`${host}${garageApi}/vehicles`, vehicle);
    }

    /**
     * addVehicleImage
     */
    public addVehicleImage(id: number, image: string) {
        const formData = new FormData();
        formData.append('image', image);
        const config = {
            headers: {
                'content-type': 'multipart/form-data',
            },
        };
        return axios.patch(`${host}${garageApi}/vehicle/${id}/set-image`, formData, config);
    }

    /**
     * updateVehicle
     */
    public updateVehicle(id: number, vehicle: IVehicle) {
        return axios.put(`${host}${garageApi}/vehicles/${id}`, vehicle);
    }
}

// Export singleton instance
export const vehicleService = new VehicleService();

