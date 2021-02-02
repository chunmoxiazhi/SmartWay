import {Review} from "./Review";

export class Service{
    _id: string | undefined;
    serviceName: string| undefined;
    serviceDescription: string| undefined;
    serviceImage: string| undefined;
    serviceReviews: Array<Review>;
    serviceViews: number
}