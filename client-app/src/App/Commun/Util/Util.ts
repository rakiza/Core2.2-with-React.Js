

export const CombineDateAndTime=(date:Date,time:Date)=>{
    
    const timeString=time.getHours()+':'+time.getMinutes()+':00';
    
    const year=date.getFullYear();
    const month=date.getMonth()+1;
    const day=date.getDate();

    const dateString=`${year}-${month}-${day}:${timeString}`;
    return new Date(dateString);

}