import  React, { useEffect, useState } from 'react';
import { Props } from './interface';
import CircularProgress from "@material-ui/core/CircularProgress";


export default function Fetch(){ 

    const[datas,setDatas]=useState<Props[]>([]);
    const[search,setSearch]=useState('');
    const[loading,setLoading]=useState(false);


    async function fetching() {
        try{  
        setLoading(true);
        const posts=await fetch('https://jsonplaceholder.typicode.com/posts');
        const values=await posts.json();
        console.log(values);
        setDatas(values);
        setLoading(false);
        }
        catch(e){ 
            console.log('error',e)

         }
        
    }
    useEffect(()=>{  
        
        fetching();
        
    },[])


    const filtered=datas.filter(data=>{ 
        return (data.title.toLowerCase()&&data.body.toLowerCase()).includes(search.toLowerCase())
     })

     if(loading){ 
         return <div>
             <p>Loading....</p>
             <CircularProgress size={100}/>
             </div>
         
      }

    
    return(
        <div>
            
            <input type="text" placeholder="type here" onChange={e=>setSearch(e.target.value)  }/>
            { filtered.map(data=>{ 
                return <ul key={ data.id }>
                    <li><b>{ data.id }{ data.title }</b><br/>{  data.body}</li>
                </ul>
             }) }
        </div>
    )
 }