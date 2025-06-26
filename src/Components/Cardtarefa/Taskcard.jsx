import React from 'react';
import './Taskcard.css';

const TaskCard = ({ titulo, data, prioridade,status, onStatusChange }) => {
    const prioridadeClasses = {
        alta: 'prioridade-alta',
        media: 'prioridade-media',
        baixa: 'prioridade-baixa'
    };

    const handleStatusChange = () => {
        if (onStatusChange) {
            onStatusChange(status === 'concluída' ? 'pendente' : 'concluída');
        }
    };

    return (
        <div className={`task-card ${prioridadeClasses[prioridade] || ''}`}>
            <div className="task-header">
                <h3>{titulo}</h3>
                <span className="task-date">{new Date(data).toLocaleDateString('pt-BR')}</span>
            </div>
            <div className="task-footer">
            <span className="task-priority">{prioridade}</span>
            <button className={`status-button $[status === 'concluída' ? 'concluída' : 'pendente']`} onClick={handleStatusChange}>
            {status === 'concluída' ? 'Concluída' : 'Pendente'}
            </button>
            </div>
            </div>
        );
    };

export default TaskCard;