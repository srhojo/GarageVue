export default interface IVehicleInspection {
    id?: number;
    vehicleId: number;
    shortDescription: string;
    description?: string;
    date: Date;
    price?: number;
}
