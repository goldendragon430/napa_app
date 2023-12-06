export const timeCalc = (unixTime:number)=>{
    const timeStamp = unixTime / 10000000;

  const date = new Date(timeStamp * 1000);

  // Hours part from the timestamp
  const hours = date.getHours();

  // Minutes part from the timestamp
  const minutes = '0' + date.getMinutes();

  // // Seconds part from the timestamp
  // const seconds = '0' + date.getSeconds();

  // const formattedTime =
  //   hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
  const formattedTime = hours + ':' + minutes.substr(-2);
    return formattedTime;
}