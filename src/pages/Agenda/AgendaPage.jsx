import React, {useState, useEffect} from 'react';
import './AgendaPage.css';
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';
import { db, collection, addDoc, query, onSnapshot } from '../../firebase/config';
import { doc, updateDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { where } from 'firebase/firestore';
import TaskList from '../../Components/Tasklist/Tasklist'

export default function Agenda() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [eventTitle, setEventTitle] = useState("");
  const [events, setEvents] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [isTaskModal, setIsTaskModal] = useState(false);
  const [taskData, setTaskData] = useState({
    titulo: '',
    data: new Date().toISOString().split('T')[0],
    prioridade: 'media',
    status: 'pendente'
  });

  const auth = getAuth();
  const user = auth.currentUser;
  const userId = user?.uid;

  useEffect(() => {
    const auth = getAuth();
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      if (user) {
        const eventsQuery = query(
          collection(db, "events"),
          where("userId", "==", user.uid)
        );
        const unsubscribeEvents = onSnapshot(eventsQuery, (querySnapshot) => {
          const loadedEvents = [];
          querySnapshot.forEach((doc) => {
            loadedEvents.push({id: doc.id, ...doc.data()});
          });
          setEvents(loadedEvents);
        });

        const tasksQuery = query(
          collection(db, "tasks"),
          where("userId", "==", user.uid)
        );
        const unsubscribeTasks = onSnapshot(tasksQuery, (querySnapshot) => {
          const loadedTasks = [];
          querySnapshot.forEach((doc) => {
            loadedTasks.push({id: doc.id, ...doc.data()});
          });
          setTasks(loadedTasks);
        });
        return () => {
          unsubscribeEvents();
          unsubscribeTasks();
        };
      }
    });
    return () => unsubscribeAuth();
  }, []);

  const renderCalendar = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();

    const firstDay = new Date(year, month, 1).getDay();
    const lastDate = new Date(year, month + 1, 0).getDate();

    const days = [];

    for (let i = 0; i < firstDay; i++){
      days.push(<div key={`empty-${i}`} className="empty-cell"></div>);
    }
    for (let i = 1; i <= lastDate; i++) {
      const fullDate = new Date(year, month, i).toISOString().split('T')[0];
      const hasEvents = events.some(event => event.date === fullDate);
      const hasTasks = tasks.some(task => task.data === fullDate);

      days.push(
        <div
          key={fullDate}
          className={`day ${hasEvents ? 'has-event' : ''} ${hasTasks ? 'has-task' : ''}`}
          data-value={fullDate}
          onClick={() => handleDayClick(fullDate)}
        >

          {i}
          {(hasEvents || hasTasks) && <div className="day-indicator"></div>}

        </div>
      );
    }
    return days;
  };

  const handleDayClick = (date) => {
    setSelectedDate(date);
    setModalVisible(true);
    setIsTaskModal(false);
  };

  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));
  };
  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));
  };

  const handleSaveEvent = async (e) => {
    e.preventDefault();

    if (selectedDate && eventTitle) {
      try {
        await addDoc(collection(db, "events"), {
          userId: userId,
          title: eventTitle,
          date: selectedDate,
          createdAt: new Date().toISOString()
        });
        setModalVisible(false);
        setEventTitle("");
      } catch (error) {
        console.error("Erro ao salvar evento: ", error);
      }
    }
  };

  const handleSaveTask = async (e) => {
    e.preventDefault();

    if (taskData && taskData.data) {
      try {
        await addDoc(collection(db, "tasks"), {
          userId: userId,
          ...taskData,
          createdAt: new Date().toISOString()
        });
        setModalVisible(false);
        setTaskData({
          titulo: '',
          data: new Date().toISOString().split('T')[0],
          prioridade: 'media',
          status: 'pendente'
        });
      } catch (error) {
        console.error("Erro ao salvar task: ", error);
      }
    }
  };

  const handleTaskUpdate = async (taskId, updatedFields) => {
    try{
      const taskRef = doc(db, "tasks", taskId);
      await updateDoc(taskRef, updatedFields);
    } catch (error) {
      console.error("Erro ao atualizar a tarefa: ", error);
    }
  };

  const openTaskModal = () => {
    setSelectedDate(new Date().toISOString().split('T')[0]);
    setTaskData({
      ...taskData,
      data: new Date().toISOString().split('T')[0]
    });
    setIsTaskModal(true);
    setModalVisible(true);
  };

  return (
    <>
      <Header />
         <div className="agenda">
            <h1 className='titulo'>Agenda</h1>
            <main className='main-agenda'>
                <div className="calendar-container">
                    <div className="calendar-header">
                        <button id="prevMonth" onClick={handlePrevMonth}>
                            <img src="Seta_Esquerda.svg" alt="SetaParaEsquerda" />
                        </button>
                        <span id="monthYear">
                            <span className='monthvalue'>
                                {currentDate.toLocaleDateString('pt-BR', {
                                    month: 'long',
                                })}
                            </span>
                            <span className='yearvalue'>
                                {currentDate.toLocaleDateString('pt-BR', {
                                    year: 'numeric',
                                })}
                            </span>
                        </span>
                        <button id="nextMonth" onClick={handleNextMonth}>
                            <img src="Seta_Direita.svg" alt="SetaParaDireita" />
                        </button>
                    </div>
                    <div className="calendar-weekdays">
                        <div className="weekday" style={{ color: 'red' }}>Dom</div>
                        <div className="weekday">Seg</div>
                        <div className="weekday">Ter</div>
                        <div className="weekday">Qua</div>
                        <div className="weekday">Qui</div>
                        <div className="weekday">Sex</div>
                        <div className="weekday">Sáb</div>
                    </div>
                    <div className="calendar-days" id="calendarDays">
                        {renderCalendar()}
                    </div>
                    <div className="box-btnadd">
                        <button className="btnadd" onClick={() => setModalVisible(true)}>
                            &#43; Evento
                        </button>
                        <button className="btnadd-task" onClick={openTaskModal}>
                            &#43; Tarefa
                        </button>
                    </div>
                </div>

                {modalVisible && (
                    <div id="event-modal" className="modal">
                        <div className="modal-content">
                            <span className="close" onClick={() => setModalVisible(false)}>
                                &times;
                            </span>
                            <h2>{isTaskModal ? 'Nova Tarefa' : 'Novo Evento'}</h2>
                            
                            {isTaskModal ? (
                                <form id="taskForm">
                                    <label htmlFor="task-title">Título da Tarefa:</label>
                                    <input
                                        type="text"
                                        id="task-title"
                                        value={taskData.titulo}
                                        onChange={(e) => setTaskData({...taskData, titulo: e.target.value})}
                                        required
                                    />
                                    
                                    <label htmlFor="task-date">Data:</label>
                                    <input
                                        type="date"
                                        id="task-date"
                                        value={taskData.data}
                                        onChange={(e) => setTaskData({...taskData, data: e.target.value})}
                                        required
                                    />
                                    
                                    <label htmlFor="task-priority">Prioridade:</label>
                                    <select
                                        id="task-priority"
                                        value={taskData.prioridade}
                                        onChange={(e) => setTaskData({...taskData, prioridade: e.target.value})}
                                    >
                                        <option value="alta">Alta</option>
                                        <option value="media">Média</option>
                                        <option value="baixa">Baixa</option>
                                    </select>
                                    
                                    <button
                                        id="btnSalvarTask"
                                        type="button"
                                        onClick={handleSaveTask}
                                    >
                                        Salvar Tarefa
                                    </button>
                                </form>
                            ) : (
                                <form id="eventForm">
                                    <label htmlFor="event-title">Título do Evento:</label>
                                    <input
                                        type="text"
                                        id="event-title"
                                        value={eventTitle}
                                        onChange={(e) => setEventTitle(e.target.value)}
                                        required
                                    />
                                    <label>Data: {selectedDate}</label>
                                    <button
                                        id="btnSalvar"
                                        type="button"
                                        onClick={handleSaveEvent}
                                    >
                                        Salvar Evento
                                    </button>
                                </form>
                            )}
                        </div>
                    </div>
                )}

                <div className="agenda-content">
                    <div className="events-container">
                        <h3>Eventos</h3>
                        <div className="events-box">
                            {events.length > 0 ? (
                                events.map((event) => {
                                    const formattedDate = event.date instanceof Object
                                        ? new Date(event.date.seconds * 1000).toLocaleDateString('pt-BR')
                                        : event.date;

                                    return (
                                        <div key={event.id} className="event-item">
                                            <span className="event-date">{formattedDate}</span>
                                            <h4 className="event-title">{event.title}</h4>
                                        </div>
                                    );
                                })
                            ) : (
                                <p>Nenhum evento salvo.</p>
                            )}
                        </div>
                    </div>

                    <div className="tasks-container">
                        <h3>Tarefas</h3>
                        <TaskList 
                            tasks={tasks} 
                            onTaskUpdate={handleTaskUpdate}
                        />
                    </div>
                </div>
            </main>
        </div>
      <Footer></Footer>
    </>
  )
}
