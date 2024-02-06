import React,{useState,useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

const QuizTime =({TimeExpire})=>{
    const[time,setTime]=useState(120);
    const navigate = useNavigate();
    /*here we are setting two minutes - 120seconds */
useEffect(()=>{
    const timeId=setInterval(()=>{
        setTime((previousTime)=>{
            if(previousTime > 0){
            return previousTime-1;
            }else{
                clearInterval(timeId);
                TimeExpire();
                return 0;
            }
        });
    },1000);
return ()=>clearInterval(timeId);
},[TimeExpire]);

useEffect(()=>{
if(time===0){
    navigate('/Main/Thank');
}
},[time,navigate]);

const timeFormat=(seconds)=>{
    const min = Math.floor(seconds/60);
    const remainingSec = seconds%60;
    return `${min}:${remainingSec <10?'0':''}${remainingSec}`;
};
return(<div>
<p>Time remaining:{timeFormat(time)}</p>
</div>);
};

const timeApps=()=>{
    const Expired=()=>{
        alert('Dear User,The Given Time experiered,Thankyou');
    };

return(<div>

< QuizTime TimeExpire={Expired}/>
</div>);
};
export default timeApps;