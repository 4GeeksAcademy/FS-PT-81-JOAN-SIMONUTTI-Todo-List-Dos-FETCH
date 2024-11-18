import React, { useEffect, useState } from "react";

const Desarrollo = () => {
	const [tareas, setTareas] = useState([])
	const [inputValue, setInputValue] = useState("")
  const [todos, setTodos] = useState([])

    const traerTareas = () => {
        fetch("https://playground.4geeks.com/todo/users/joansimonutti", {method: "GET"})
        .then((response)=>{
          console.log(response);
  
          if (!response.ok) {
            crearUsuario()
          }else {
            return response.json()
          }
        })
        .then((data)=>{
          console.log(data);
          setTodos(data.todos)
  
        })
        .catch((error)=>console.log(error))
      }
  
      const crearUsuario = () => {
        fetch("https://playground.4geeks.com/todo/users/joansimonutti", {method: "POST"})
        .then((response)=>{
          console.log(response);
  
      })
      .then((data)=>{console.log(data);
      })
      .catch((error)=>{console.log(error);
      })
    }
  
      const crearTarea = () => {
        fetch("https://playground.4geeks.com/todo/todos/joansimonutti", {
          method: "POST",
          body: JSON.stringify({
            label: inputValue,
            is_done: false
          }),
          headers: {
            "Content-Type": "application/json"
          }
        })
        .then((response)=>{
          return response.json()
        })
        .then((data)=>{
          console.log(data);
          
          setInputValue("")
          traerTareas()
        })
        .catch((error)=>{console.log(error);
        })
      }
  
      const eliminarTarea = (id) => {
        fetch(`https://playground.4geeks.com/todo/todos/${id}`, {
          method: "DELETE"
         }
        )
        .then((response)=>{
          traerTareas()
          return response.json()
        })
        .then((data)=>{
          console.log(data);
        })
        .catch((error)=>{console.log(error);
        })
      }
  

	const handleDelete = (index) => {
		setTareas(tareas.filter((tarea, i) => i != index))

	}

  useEffect(()=>{
    traerTareas()
  },[])
  useEffect(()=>{
    console.log(todos);
  },[todos])
	return (
		<>
			<div className="card mx-auto mt-4 text-center">
				<div className="card-header">
					<h3>LISTA DE TAREAS</h3>
				</div>
				<div className="card-body">
					<input
						type="text"
						size="22"
						placeholder="Agrega una tarea y preciona ENTER"
						value={inputValue}
						onChange={(e) => {
							setInputValue(e.target.value)
						}}
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								if (inputValue.trim() !== "") {
                  crearTarea()
									//setTareas(tareas.concat([inputValue]))
									setInputValue("")
								}

							}
						}}
					/>
					<ol>
						{
							todos.length > 0 ?
								todos.map((tarea, index) => (
								
										<li key={index}>{tarea.label}{" "}<span onClick={() => eliminarTarea(tarea.id)} className="fa-regular fa-rectangle-xmark"></span></li>
									
                ))
								:
								<li className="li-vacio">Sin tareas pendientes.</li>
						}
					</ol>
				</div>
			</div>
		</>
	);
};

export default Desarrollo;