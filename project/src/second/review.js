
import React,{useState,useEffect} from 'react';

function Review(){
    const[feeds,setFeeds]=useState([]);

    useEffect(()=>{
        const ShowFeed=async()=>{
            try{
                const feedbackGet=await fetch('http://localhost:4200/FEED',{
                    method:'GET',
                    headers:{'Content-Type':'application/json'},
                })
                if(feedbackGet.status===200){
                    let feedData = await feedbackGet.json();
                    console.log('feedback link is working!!!');
                    setFeeds(feedData.Msg);
                }else{
                    console.log('error getting feedback data');
                }
            }catch(error){
                console.error('Error fetching data');
                alert('review error');
            }
        };
        ShowFeed();
       },[]);

    return(<div style={Rstyle}>
  
  <>
    {Array.isArray(feeds) && feeds.map((feed)=>(
        <div className='card' key={feed['Message']} style={Card}>

  <div className="card text-bg-light mb-4" style={{maxWidth: '18rem'}}>
  <div className="card-header">Review</div>
  <div className="card-body">
    <h5 className="card-title">Name:{feed.Name}</h5>
    <p className="card-text">Message:{feed.Message}</p>
  </div>
    </div> 
     </div>
    ))}
  </>

    </div>
    );
};

let Rstyle={
    marginTop:'110px',
    display:'flex',
    justifyContent:'space-around',
    flexWrap:'wrap',
    width:'100%', //100% to ensure it takes full width of the container.
    padding:'20px',
    gap:'20px',
};
/*flex short hand properties-flex-grow,flex-shrink,
flex-basis(sets intial size of flex item)*/
let Card={
    flex:'0 0 calc(33.33% - 20px)',//display 3 cards in each row;
    maxWidth:'18rem',
};

/*he flex: '0 0 calc(33.33% - 20px)' property ensures that each card
 takes up 33.33% of the container width (minus the gap) */

export default Review;