import React, { useState, useEffect } from 'react'
import moment from 'moment'
import { v4 as uuidv4 }from 'uuid'

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

const App = () => {
  const [onAddNewTask, setOnAddNewTask] = useState(false);
  const [loading, setLoading] = useState(false);
  const [todos, setTodos] = useState([]);
  const [todosCompleted, setTodosCompleted] = useState([]);
  const [hover, setHover] = useState();

  
  const [state, setState] = useState({
    items: [],
    itemsToShow: "all",
    id: uuidv4(),
    priority: 'NORMAL PRIORITY',
    title:  '',
    description: '',
    completed: false,
    editItem: false,
  })

	const handleSubmit = event => {
    event.preventDefault()
    setLoading(true);
    setTimeout(()=>{
      const newItem = {
        id: state.id,
        priority: state.priority,
        title: state.title,
        description: state.description,
        completed: state.completed
      }
      
      const updatedItems = [...state.items, newItem]
  
      if (state.title.length > 0) {
        setState({
          items: updatedItems,
          id: uuidv4(),
          priority: 'NORMAL PRIORITY',
          title:  '',
          description: '',
          completed: false,
          editItem: false,
        })
      }
      setLoading(false);
      setOnAddNewTask(false)
    }, 200);
	}

	const handleDoneTask = (id) => {
    setHover('');
		const filteredItems = state.items.map(item => {
			item.id === id && (item.completed = !item.completed)
			return item
		})
		setState({
			items: filteredItems,
		})
	}

	const handleDelete = (id) => {
		const filteredItems = state.items.filter(item => item.id !== id)
	  setState({
			items: filteredItems
		})
	}

  useEffect(()=>{
    setTodosCompleted(state.items.filter(item => item.completed))
    setTodos(state.items.filter(item => !item.completed))
  },[state.items])

  return (
    <div className="flex items-start justify-center py-12 px-4  bg-gray-200 min-h-screen">
        <div className="w-[380px] mx-auto">
          <div className=" w-full py-0 items-start justify-center px-2 shadow-xl min-h-[500px] bg-white">
            {/* Header */}
              <div className="px-4 flex flex-grow justify-between border-dashed border-0 border-b border-gray-300 ">
                <div onClick={() => setOnAddNewTask(false)} className="hover:cursor-pointer py-6 flex justify-start text-left items-center">
                  <div className="text-4xl font-bold mr-2">{ moment().format('DD')}</div>
                  <div className="flex-col text-[12px]">
                    <p>{ moment().format('dddd')} </p>
                    <p>{ moment().format('MMM')} { moment().format('YYYY')}</p>
                  </div>
                </div>
                <div onClick={() => setOnAddNewTask(!onAddNewTask)} className="hover:cursor-pointer flex items-center py-6 justify-end text-right font-bold text-sm text-gray-700">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 font-bold p-1 mr-1 bg-pink-500 text-white rounded-full" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg> NEW TASK
                </div>
              </div>
            {/* End Header */}
              { 
                onAddNewTask ? 
              // FORM
                <div id="todos" className="flex flex-col">
                  <h1 className="text-lg text-center py-4 font-semibold">ADD NEW TASK</h1>
                  <div className="items-start justify-center mb-2 px-4">
                    <div className="w-full flex flex-col border-dashed  ">
                      <form className="space-y-3 text-lg" onSubmit={handleSubmit}>
                        <input type="hidden" name="remember" defaultValue="true" />
                        <div className="rounded-md shadow-sm -space-y-px text-lg">
                          <div className="">
                            <label htmlFor="email" className="text-sm text-gray-600 font-semibold">
                              Priority:
                            </label>
                            <div className='flex flex-col pl-6 pt-2 pb-2'>
                              <label className="flex items-center ">
                                <input checked={state.priority==='NORMAL PRIORITY'} type="radio" name="priority" value='NORMAL PRIORITY' onChange={e => setState({ ...state, priority: e.target.value })} className="mr-2" /> Normal Priority
                              </label>
                              <label className="flex items-center ">
                                  <input checked={state.priority==='HIGH PRIORITY'} type="radio" name="priority" value='HIGH PRIORITY' onChange={e => setState({ ...state, priority: e.target.value })} className="mr-2" /> High Priority
                              </label>
                            </div>
                          </div>
                          <div className="pt-2">
                            <label htmlFor="title" className="text-sm text-gray-600 font-semibold">
                              Task:
                            </label>
                            <input
                              type="text"
                              autoComplete="off"
                              value={state.title}
                              onChange={e => setState({ ...state, title: e.target.value }) } 
                              required
                              className="text-lg appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
                              placeholder=""
                            />
                          </div>
                          <div className="pt-2">
                            <label htmlFor="description" className="text-sm text-gray-600 font-semibold">
                              Description:
                            </label>
                            <input
                              type="text"
                              autoComplete="off"
                              value={state.description}
                              onChange={e => setState({ ...state, description: e.target.value })} 
                              required
                              className="text-lg appearance-none rounded-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10"
                              placeholder=""
                            />
                          </div>
                        </div>
                        <div>
                        <button
                          disabled={loading}
                          type="submit"
                          className={classNames( loading ? 'cursor-not-allowed opacity-50' : '' ,'group relative w-full flex justify-center btn btn-rose  py-4 px-4 border border-transparent shadow-sm text-lg font-bold')}
                          >
                          {
                            loading && (
                              <svg className='animate-spin -ml-1 mr-3 h-8 w-8 text-white' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                            )
                          }
                            ADD TASK
                        </button>
                        <button onClick={() => setOnAddNewTask(false)} className='btn bg-gray-200 text-gray-500 group relative w-full flex justify-center py-4 px-4 border border-transparent shadow-sm text-lg font-medium'>
                          CANCEL
                        </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              // END FORM
              :
              <>
                <div id="todos" className="flex flex-col">
                  <h1 className="text-lg text-center py-4 font-semibold">TODO TASKS</h1>
                  <div className="items-start justify-center mb-2 px-4 max-h-[500px] overflow-y-auto">
                    <div className="w-full flex flex-col ">
                      {
                        todos.length < 1 
                        ? 
                        <>
                          <div className="w-full text-base font-light text-center text-gray-400 py-4">
                            You don't have any tasks yet.
                          </div>
                        </>
                        : 
                        todos.slice(0).reverse().map((todo, index) => (
                          <div
                            onMouseOver={() => setHover(todo.id)}
                            onMouseOut={() => setHover()}
                            key={todo.id} 
                            className={
                              classNames(todo.priority==='HIGH PRIORITY' ? 'bg-[#fd6e41]' : 'bg-[#4098ea]', 'card  text-white flex flex-row justify-between space-x-4 items-center shadow-md rounded-lg p-4 mb-5 ')
                            }>
                            <div className="detail truncate ...">
                              <div className="priority text-[10px] font-bold">{ todo.priority}</div>
                              <div className="priority text-lg font-bold">{ todo.title }</div>
                              <div className="priority text-[10px]">{ todo.title }</div>
                            </div>
                            <div className="checkbox flex flex-row items-center">
                              { hover===todo.id && (
                                <button onClick={() => handleDelete(todo.id)} 
                                className=' btn bg-gray-200 rounded-full p-2 mb-0 mt-0 mr-7'>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                </svg>
                              </button>
                              )}
                              <input onChange={() => handleDoneTask(todo.id)} type="checkbox" className="w-6 h-6 rounded-full border-2 border-gray-300 hover:border-2 hover:border-green-300 hover:cursor-pointer" />
                            </div>
                          </div>
                        ))
                      }
                    </div>
                  </div>
                </div>
                { 
                todosCompleted.length > 0 &&
                  <div id="todos_done" className="flex flex-col border-dashed border-0 border-t border-gray-300 ">
                    <h1 className="text-lg text-center py-4 font-semibold">DONE TASKS</h1>
                    <div className="items-start justify-center mb-6 px-4 max-h-[500px] overflow-y-auto">
                      <div className="w-full flex flex-col border-dashed">
                        {/* DONE TASK */}
                        {
                        todosCompleted.slice(0).reverse().map((todo, index) => (
                            <div 
                              onMouseOver={() => setHover(todo.id)}
                              onMouseOut={() => setHover()}
                              key={todo.key} className="bg-[#00af3a] text-white w-full flex flex-row justify-between space-x-4 items-center shadow-md rounded-lg p-4 mb-5">
                              <div className="detail truncate ...">
                                <div className="priority text-[10px] font-bold">DONE</div>
                                <div className="priority text-lg font-bold">{ todo.title }</div>
                                <div className="priority text-[10px]">{ todo.title }</div>
                              </div>
                              <div className="checkbox flex flex-row items-center">
                              { hover===todo.id && (
                                  <button onClick={() => handleDelete(todo.id)} 
                                  className=' btn bg-gray-200 rounded-full p-2 mb-0 mt-0 mr-7'>
                                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                  </svg>
                                </button>
                              )}
                                <input checked={true} onChange={() => handleDoneTask(todo.id)} type="checkbox" className="w-6 h-6 rounded-full border-2 text-emerald-300  hover:text-emerald-600 hover:cursor-pointer" />
                              </div>
                            </div>
                          ))
                        }
                      </div>
                    </div>

                  </div>
                }
              </>
              }
          </div>
      </div>
    </div>
  )
}

export default App