import React, { useState, useEffect } from 'react';
import SessionContext from './SessionContext';
import { AsyncStorage } from 'react-native';
import axios from 'axios';
import API from '../../API'



export default function SessionProvider({ children }) {



    const [session, setValue] = useState({
        user: {
            token: null
        }
    });

    const[reload,setReload]=useState(0)



    useEffect( () => {
let set=async()=>{
    let token=await AsyncStorage.getItem('token')
    updateSession({user:{token}})
}
set();
      async  function initializeSession() {
            let id = await AsyncStorage.getItem('id');
            let token = await AsyncStorage.getItem('token');
            if (token) 
            {let res=await fetch(`http://192.168.43.220:3000/users/${id}`, {
                headers: {
                    'token': token
                }
            })
            let result=await res.json();
            let user={...result,token}
            updateSession({user})
       
        }
        
        }    
         initializeSession();
    
     

    }, [reload]);
 
    function updateSession(nextSession) {
        let value = typeof nextSession === "function" ?
            nextSession : prevSession => ({ ...prevSession, ...nextSession });
        setValue(value);
    }
    
 
    async function login({ username, password }) {

    API.post('/auth/login', {
           username,password
        }).then((res)=>{
           
            let {token,_id,error}= res.data.result
          
             if (error || !token) console.log("error");
             API.get(`/users/${_id}`).then(async (res)=>{

let user = { ...res.data, token };

await AsyncStorage.setItem('id',_id)
await AsyncStorage.setItem('token',token)
updateSession({ user });

          });
        }  );
 
     
   
    }

    async function  logout() {
        // let id=await AsyncStorage.getItem('id');
        // let token=await AsyncStorage.getItem('token')
        // let body=null;
        //  body = new URLSearchParams();

        // body.append('token',token);
        // body.append('id',id);

        // await fetch(`http://192:168.43.220:3000/auth/logout`, {
            
        //     method: "post",
        //     body,
        //      headers: {
        //             'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        //      }
        //  })
        updateSession({ user: { token: null } });
        await AsyncStorage.removeItem('id');
        await AsyncStorage.removeItem('token');
    }

    const context = {
        session,
        reload,
  
        actions: {
            login,
            logout,
            setReload,
            updateSession
        }
    }

    return (
        <SessionContext.Provider value={context}>
            {children}
        </SessionContext.Provider>
    )
}