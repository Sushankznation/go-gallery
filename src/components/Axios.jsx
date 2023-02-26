import axios from "axios"
import { useEffect, useState } from "react"

export default function Axios(param) {
    const [Data,setData] = useState([]);
    const [isLoading,setLoading] = useState(false);
const[err,setErr] = useState('');

axios.defaults.baseURL= 'https://api.unspalsh.com';
//base Url from documentation
const fetch  = async(url)=>{
  //passing url as Props
  try{
isLoading(true);
const res = await axios(url)
setData(res.data.results)
  }catch(err){
setErr(err)
  }finally{
    setLoading(false)
  }
}

useEffect(()=>{
fetch(param)
},[param])
  return {
    response:Data,
    isLoading:isLoading,
    err,
    fetch:url=>fetch(url)
    //for search & idendtify
  }
}
