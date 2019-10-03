import axios, { AxiosResponse} from 'axios';
import { IActivity } from '../Models/Activity';


axios.defaults.baseURL='http://localhost:5000/api';

const responseBody=(response:AxiosResponse)=>response.data;

/* const sleep=(ms:number)=>(response:AxiosResponse)=>new Promise<AxiosResponse>(
    resolve=>setTimeout(()=>resolve(response),ms)
); */

const Requests={
    get:(url:string)=>axios.get(url).then(responseBody),
    post:(url:string,body:{})=>axios.post(url,body).then(responseBody),
    put:(url:string,body:{})=>axios.put(url,body).then(responseBody),
    delete:(url:string)=>axios.delete(url).then(responseBody),
}

const ActivityServices={
    GetAll:()=>Requests.get('/activities'),
    GetById:(id:string)=>Requests.get(`/activities/${id}`),
    Create:(activity:IActivity)=>Requests.post('/activities',activity),
    Update:(id:string,activity:IActivity)=>Requests.put(`/activities/${id}`,activity),
    Delete:(id:string)=>Requests.delete(`/activities/${id}`),
}

export default {ActivityServices};