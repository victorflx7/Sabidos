import React, { useState } from "react";
import TaskCard from "../Cardtarefa/Taskcard";
import './Tasklist.css'

const Tasklist = ({ tasks,
    onTaskUpdate }) => {
        const [ filter, setFilter] = useState('todas');

        const filteredTasks = tasks.filter(task => {
            if (filter === 'todas') return true;
            return task.status === filter;
        });

        const handleStatusChange = (taskId, newStatus) => {
            if (onTaskUpdate) {
                onTaskUpdate(taskId, {
                    status: newStatus});
            }
        };

        return(
            <div className="task-list">
                <div className="task-filter">
                    <button className={filter === 'todas' ? 'active' : ""} onClick={() => setFilter('todas')}>
                        Todas
                        </button>
                        <button className={filter === 'pendente' ? 'active' : ""} onClick={() => setFilter('pendente')}>
                            Pendentes
                        </button>
                        <button className={filter === 'concluída' ? 'active' : ""} onClick={() => 
                            setFilter('concluída')}>
                                Concluídas
                         </button>
                </div>

                <div className="tasks-container">{filteredTasks.length > 0 ? (filteredTasks.map(task => (
                    <TaskCard key={task.id}
                    titulo={task.titulo}
                    data={task.data}
                    prioridade={task.prioridade}
                    status={task.status}
                    onStatusChange={(newStatus) => 
                        handleStatusChange(task.id, newStatus)}
                        />
                ))
            ) : (
                <p className="no-tasks">Nenhuma tarefa encontrada.</p>

            )}
            </div>
            </div>
        );
    };
    
export default Tasklist;
            
                