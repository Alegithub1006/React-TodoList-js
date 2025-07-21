/*
 1. Lista Personal de Tareas
Descripción: Aplicación clásica de gestión de tareas con persistencia en almacenamiento local Tareas
 Principales: Agregar, editar, eliminar y marcar tareas como completadas;--ok
 filtrar por estado;--ok
 persistir datos localmente--ok
 Tareas Bonus:
 Modo oscuro,--ok
 categorías de tareas,--ok
 fechas de vencimiento,
 niveles de prioridad--ok
 Stack Tecnológico:
 React + Vite,
 CSS Modules,
 Local Storage
* */

import {useEffect, useState} from "react";
import {TaskItem} from "./components/TaskItem.jsx";
import Button from "./components/Button.jsx";
import './TodoList.css';

export default function ToDoList(){
    const [task, setTask] = useState(() => {
        const saved = localStorage.getItem('todoTasks');
        return saved ? JSON.parse(saved) : [];
    });

    const [newTask, setNewTask]= useState('');
    const [dateTask, setDateTask]= useState(null);
    const [showDate, setShowDate]= useState(false);
    const [priority, setPriority] = useState('low');
    const [newCategory, setNewCategory] = useState('');
    const [showCategory, setShowCategory] = useState(false);
    const [editTaskId, setEditTaskId]= useState(null);
    const [editText, setEditText] = useState('');
    const [filterTask, setFilterTask]= useState('all')
    const [isDark, setisDark]= useState(true)


    //LOCAL STORAGE (TASK)
    useEffect(()=>{
        localStorage.setItem('todoTasks', JSON.stringify(task))
    },[task])

    // ✅ FUNCIÓN SIMPLE PARA FILTRAR
    function getFilteredTasks() {
        if (filterTask === 'checked') {
            return task.filter(t => t.complete === true);
        }
        if (filterTask === 'no-checked') {
            return task.filter(t => t.complete === false);
        }
        return task; // 'all'
    }

    //Theme mode
    function DarkMode(){
        setisDark(d => !d);
    }

    function ToogleTask(taskId, complete) {
        setTask(currenttask =>{
            return currenttask.map(task =>{
                    if (task.id === taskId) return {...task, complete}

                    return task
                }

            )
        })
    }

    function RemoveTask(taskId){
        setTask(currentTask=> {
            return (currentTask.filter(task => task.id !== taskId))
        })
    }

    function AddTask (){

        if (newTask === "")return
        setTask(currentTask => {
            return (
                [...currentTask,
                    {name: newTask,
                        complete: false,
                        id: crypto.randomUUID(),
                        priority: priority,
                        category: newCategory,
                        dueDate: dateTask || null,
                    }]
            )
        })
    }

    const SetDate= ()=>{
        setShowDate(d=> !d);
    }

    const SetCategory = ()=>{
        setShowCategory(c => !c)
    }

    function ChangePriority (){
        if (priority === 'low')return setPriority('mid');
        if (priority === 'mid')return setPriority('high');
        if (priority === 'high')return setPriority('low');
    }

    function EditTask(taskId){
        const taskToEdit = task.find(t => t.id === taskId);
        setEditTaskId(taskId);
        setEditText(taskToEdit.name);
    }
    // Función para guardar la edición
    function SaveEdit(taskId) {
        const updatedTask = task.map(t => t.id === taskId ? {...t,name: editText} : t)
        setTask(updatedTask);
        setEditTaskId(null);
        setEditText('');
    }

// Función para cancelar edición
    function CancelEdit() {
        setEditTaskId(null);
        setEditText('');
    }

    return(
        <div className={`${isDark ? 'dark-mode' : 'light-mode'}`}>
            <h1> TO DO LIST</h1>
            <br/>
            <div>
                <select
                    value={filterTask}
                    onChange={e => setFilterTask(e.target.value)}
                >
                    <option value={'all'}>all</option>
                    <option value={'checked'} >completed</option>
                    <option value={'no-checked'}>no-complete</option>
                </select>
            </div>
            <ul>
                {/* ✅ USAR getFilteredTasks() en lugar de task */}
                {getFilteredTasks().map(task =>{
                    return(
                        <TaskItem
                            className={`${isDark ? 'dark-button' : 'light-button'}`}
                            key={task.id}
                            id={task.id}
                            {...task}
                            ToggleTask={ToogleTask}
                            RemoveTask={RemoveTask}
                            StartEdit={()=> EditTask(task.id)}
                            SaveEdit={()=> SaveEdit(task.id)}
                            CancelEdit={CancelEdit}
                            isEditing={editTaskId === task.id}
                            editText={editText}
                            setEditText={setEditText}
                        />
                    );
                })}
            </ul>
            <br/>
            <br/>
            <input
                className={`${isDark ? 'dark-input' : 'light-input'}`}
                type={'text'} value={newTask}
                onChange={e => setNewTask(e.target.value)}/>
            <h3>Priority: {priority}</h3>
            {showCategory ?  <input
                className={`${isDark ? 'dark-input' : 'light-input'}`}
                type={'text'}
                value={newCategory}
                onChange={e => setNewCategory(e.target.value)}
            /> : null}
            {showDate ? <input
                className={`${isDark ? 'dark-input' : 'light-input'}`}
                type={'date'}
                value={dateTask || ''}
                onChange={e => setDateTask(e.target.value || null)}
            /> : null}
            <br/>
            <br/>
            <button className={`${isDark ? 'dark-button' : 'light-button'}`} onClick={()=> AddTask(newTask)}>add task</button>
            <Button className={`${isDark ? 'dark-button' : 'light-button'}`} parenthMetod={SetCategory} label={'Add Category'}/>
            <button className={`${isDark ? 'dark-button' : 'light-button'}`} onClick={()=> ChangePriority(priority)}>Change Priority</button>
            <Button className={`${isDark ? 'dark-button' : 'light-button'}`} parenthMetod={DarkMode} label={isDark ? 'theme-light' : 'theme-dark'}/>
            <Button className={`${isDark ? 'dark-button' : 'light-button'}`} parenthMetod={SetDate} label={'Add Date'}/>
        </div>
    );

}