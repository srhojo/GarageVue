import { IVehicleInspection } from "../services/types";

export default class VehicleInspection implements IVehicleInspection {
    public id?: number;
    public vehicleId: number = 0;
    public shortDescription: string = '';
    public description?: string = '';
    public date: Date = new Date();
    public price?: number;
}
