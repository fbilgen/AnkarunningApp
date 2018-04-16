
export class RouteModel{
    id: number;
    name : string;
    distance : string;
    latitude: number;
    longitude: number;
    routeFile : any;
    content : any;
    fileName : string;
    contentType : string;
    routePhoto : any;

}

export interface ICoordinates {
    lat: number;
    lng: number;
  
  }