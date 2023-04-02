import ListHeader from './components/ListHeader'
import {useEffect, useState} from 'react'
import ListItem from './components/ListItem'
import Auth  from './components/Auth'
import {useCookies} from 'react-cookie'
function App() {
const [cookies,setCookie,removeCookie] = useCookies(null)
 const userEmail = cookies.Email
 const authToken = cookies.AuthToken
const [tasks,setTasks] = useState(null)

 // const authToken = false

  const getData = async ()=>{


    try{
      const response = await fetch(`${process.env.REACT_APP_SERVERURL}/todos/${userEmail}`)
      const json = await response.json()
      console.log(response)
      setTasks(json)
    }catch(err){
      console.error(err)
    }
  }

  useEffect(() => {
    if(authToken){
      getData()
    }
  },[])
  //console.log("PRINTING TASKS")
  //console.log(tasks)

  //sort
  const sortedTasks = tasks?.sort((a,b) => new Date(a.date) - new Date(b.date)) 

  return (
    <div className="App">

      {!authToken && <Auth/>}


   {authToken&& 
   <>
   <ListHeader listName = {'🏖️ Holiday tick list'} getData={getData}/>
   <p>Welcome Back {userEmail}</p>
   {sortedTasks?.map(task => <ListItem key = {task.id} task = {task} getData={getData}/>)}
   </>
   }
    </div>
  );
}

export default App;
