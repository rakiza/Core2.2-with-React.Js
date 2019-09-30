export interface ICar{
    color:string,
    model:string,
    topSpeed?:number
}

const Car1:ICar={
    color:'red',
    model:'BMV'
}
const Car2:ICar={
    color:'blue',
    model:'Renault',
    topSpeed:250
}

const multiplay=(x:number,y:number):string=>(x*y).toString();

export const Cars=[Car1,Car2];
