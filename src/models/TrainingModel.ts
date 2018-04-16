import { DateTime } from "ionic-angular";


export class TrainingModel{
    id: number;
    title : string;
    description : string;
    dateTime : DateTime;
    routeId : number;
    route : string;
    distance : number;
    avgPace : number;
    remainingDate : number;
    trainingPhoto : any;

    // constructor(values: Object = {}){
    //     Object.assign(this,values);
    // }
}