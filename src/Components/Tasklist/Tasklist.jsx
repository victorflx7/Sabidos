import React from 'react';
import { useScore } from '../../context/ScoreContext';
import './Tasklist.css';

const TaskList = ({ tasks, onTaskUpdate }) => {
  const { addScore } = useScore();

  const handleStatusChange = (taskId, currentStatus) => {
    const newStatus = currentStatus === 'concluida' ? 'pendente' : 'concluida';
    onTaskUpdate(taskId, { status: newStatus });

    if (newStatus === 'concluida') {
      addScore(10); 
    }
  };

  const handlePriorityChange = (taskId, priority) => {
    onTaskUpdate(taskId, { prioridade: priority });
  };

  return (
    <div className="tasks-box">
      {tasks.length > 0 ? (
        tasks.map((task) => (
          <div key={task.id} className={`{task-item ${task.prioridade}`}>
            <div className="task-header">
              <input
                type="checkbox"
                checked={task.status === 'concluida'}
                onChange={() => handleStatusChange(task.id, task.status)}
              />
              <h4 className={`task-title ${task.status === 'concluida' ? 'completed' : ''}`}>
                {task.titulo}
              </h4>
            </div>
            <div className="task-details">
              <span className="task-date">{task.data}</span>
              <select
                value={task.prioridade}
                onChange={(e) => handlePriorityChange(task.id, e.target.value)}
                className={`priority-select ${task.prioridade}`}
              >
                <option value="alta">Alta</option>
                <option value="media">Média</option>
                <option value="baixa">Baixa</option>
              </select>
            </div>
          </div>
        ))
      ) : (
        <p>Nenhuma tarefa salva.</p>
      )}
    </div>
  );
};

export default TaskList;