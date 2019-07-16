import { IVehicle } from "../services/types";

export default class Vehicle implements IVehicle {
    public id?: number;
    public type: string = 'CAR';
    public licensePlate: string = '';
    public branch: string = '';
    public model: string = '';
    public color: string = '';
    public year: string = '';
    public information?: string;
    public image?: string;
}

