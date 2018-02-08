export const version = () => "1.0.0";


export  class Sensor{
    /*
        class for the Sensor 
    */
    constructor(name,type,data){ 
        /*
            Constructor for Sensor class 
        */
        this._name=name;
        this._type=type;
        this._data=data;      
    }
    get type() {
        return this._type;                
    }
    set type(type) {
         this._type=type;
    }
    get name() {
        return this._name;
    }
    set name(name){
         this._name=name;
    }
    get data() {
        return this._data;
    }
    set data(data){
        this._data=data;
    }

}
export class  Data {
    /*
        class for the data 
    */
    constructor(values) {
        /*
            Contructor for Data class 
        */ 

        this._values = values;
    }
    get values() {
        return this._values;
    }
    set values(values) {
        this._values = values;
    }
    Average(){
        /*
            compute the average if all item in values are numeric, else return a string. 
        */
        // check if all item ar numeric 
        for(var i = 0; i<this.values.length; i++) {
            if (!Number(this.values[i])){
                return "type n'est pas numerique";
            }
       }
        // if all item are numeric, compute the average
        var sum = 0;
        for(i = 0; i< this.values.length; i++) {
                sum += parseFloat(this.values[i]);  
        }
            return sum/this.values.length;
        
    }
    getlastValues(){
        return ' '+this.values[this.values.length-1]+'';
    }

}
