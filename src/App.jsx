import { useEffect, useState } from 'react'
import Navbar from './components/navbar'
import { v4 as uuidv4 } from 'uuid';




function App() {

  const [todo, setTodo] = useState("")
  const [Todos, setTodos] = useState([])

  useEffect(()=> {
    let todoString = localStorage.getItem("todos")
    if(todoString){
    let todos = JSON.parse(localStorage.getItem("todos"))
    setTodos(todos)
    }
  },[])

  const saveToLS = (params) => {
    localStorage.setItem("todos", JSON.stringify(Todos))
  }

  const handleEdit = (e, id) => {
    let t =  Todos.filter(i=>i.id === id)
    setTodo(t[0].todo)
    let newTodos = Todos.filter(item=>{
      return item.id!==id
    });
    setTodos(newTodos)
    saveToLS()
  }

  const handleDelete = (e, id) => {
    
   
    let newTodos = Todos.filter(item=>{
      return item.id!==id
    });
    setTodos(newTodos)
    saveToLS()
    
     
  }

  const handleAdd = () => {
    setTodos([...Todos, {id: uuidv4(), todo, iscompleted: false}])
    setTodo("")
    saveToLS()
  }

  const handleChange= (e) => {
    setTodo(e.target.value)
  }

  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = Todos.findIndex(item=> {
      return item.id === id;

    })
    let newTodos = [...Todos];
    newTodos[index].iscompleted = !newTodos[index].iscompleted;
    setTodos(newTodos)
    saveToLS()
  }
  
  

  return (
    <>
      <Navbar />
      <div className='container max-auto my-5 rounded-xl p-5 bg-violet-100 min-h-[80vh]'>
        <div className='addTodo my-5'>
          <h2 className='text-lg font-bold'>Add a Todo</h2>
          <input onChange={handleChange} value={todo} type="text" className='w-1/2' />
          <button onClick={handleAdd} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-6'>Add</button>
        </div>
        <h2 className='text-lg font-bold'>Your Todos</h2>
        <div className='todos'>
          {Todos.length === 0 && <div>No todos to display</div>}
          {Todos.map(item=>{

          
          return <div key={item.id} className='todo flex w-1/4 my-3 justify-between'>
            <div className='flex gap-5'>
            <input name={item.id} onChange={handleCheckbox} type="checkbox" value={item.iscompleted}  />
            <div className={item.iscompleted?"line-through":""}>{item.todo}</div>
            </div>
            <div className='buttons flex h-full'>
              <button onClick={(e)=>handleEdit(e, item.id)} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'>Edit</button>
              <button onClick={(e) => {handleDelete(e, item.id)}} className='bg-violet-800 hover:bg-violet-950 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'>Delete</button>
            </div>
          </div>
          })}
        </div>
      </div>
    </>
  )
}

export default App
