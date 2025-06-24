import React, { useState, useEffect } from 'react';
import './Agenda.css';
import { db, collection, addDoc, query, onSnapshot } from '../../firebase/config';
import { getAuth } from "firebase/auth";
import { where } from "firebase/firestore";
import { registrarEvento } from '../../services/analytics/analyticsEvents'; 
import { incrementarContadorEvento } from '../../services/analytics/analyticsEvents';

function Agenda() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [eventTitle, setEventTitle] = useState("");
    const [events, setEvents] = useState([]);
    const auth = getAuth();
    const user = auth.currentUser;
    const userId = user?.uid;

    useEffect(() => {
        const auth = getAuth();
        const unsubscribeAuth = auth.onAuthStateChanged((user) => {
            if (user) {
                const q = query(
                    collection(db, "events"), where("userId", "==", user.uid)
                );

                const unsubscribeSnapshot = onSnapshot(q, (querySnapshot) => {
                    const loadedEvents = [];
                    querySnapshot.forEach((doc) => {
                        loadedEvents.push({ id: doc.id, ...doc.data() });
                    });
                    setEvents(loadedEvents);
                });

                // Clean up snapshot listener
                return () => unsubscribeSnapshot();
            }
        });

        // Clean up auth listener
        return () => unsubscribeAuth();
    }, []);


    const renderCalendar = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();

        const firstDay = new Date(year, month, 1).getDay();
        const lastDate = new Date(year, month + 1, 0).getDate();

        const days = [];

        for (let i = 0; i < firstDay; i++) {
            days.push(<div key={`empty-${i}`} className="empty-cell"></div>);
        }

        for (let i = 1; i <= lastDate; i++) {
            const fullDate = new Date(year, month, i).toISOString().split('T')[0];
            days.push(
                <div
                    key={fullDate}
                    className="day"
                    data-value={fullDate}
                    onClick={() => handleDayClick(fullDate)}
                >
                    {i}
                </div>
            );
        }

        return days;
    };

    const handleDayClick = (date) => {
        setSelectedDate(date);
        setModalVisible(true);
    };

    const handlePrevMonth = () => {
        setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)));
    };

    const handleNextMonth = () => {
        setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)));
    };

    const handleSave = async (e) => {
        e.preventDefault();

        if (selectedDate && eventTitle) {
            try {
                await addDoc(collection(db, "events"), {
                    userId: userId,
                    title: eventTitle,
                    date: selectedDate,
                    createdAt: new Date().toISOString()

                });

                registrarEvento('Add_EventoAgenda', {
                titulo: eventTitle,
                data: selectedDate,
                });
                incrementarContadorEvento('Add_EventoAgenda');
                setModalVisible(false);
                setEventTitle("");
            } catch (error) {
                console.error("Erro ao salvar evento: ", error);
            }
        }
    };


    return (
        <div className="agenda">
            <h1 className='titulo'>Agenda</h1>
            <main className='main-agenda'>
                <div className="calendar-container">
                    <div className="calendar-header">
                        <button id="prevMonth" onClick={handlePrevMonth}>
                            <img src="/public/SetaEsquerda.svg" alt="" />
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
                            <img src="/public/SetaDireita.svg" alt="" />
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
                        <button
                            className="btnadd"
                            onClick={() => userId && setModalVisible(true)}
                            disabled={!userId}
                        >
                            &#43;
                        </button>
                    </div>
                </div>

                {modalVisible && (
                    <div id="event-modal" className="modal">
                        <div className="modal-content">
                            <span className="close" onClick={() => setModalVisible(false)}>
                                &times;
                            </span>
                            <h2>Novo Evento</h2>
                            <form id="dataForm">
                                <label htmlFor="event-title">Título do Evento:</label>
                                <input
                                    type="text"
                                    id="event-title"
                                    name="Titulo_evento"
                                    value={eventTitle}
                                    onChange={(e) => setEventTitle(e.target.value)}
                                    required
                                />
                                <button
                                    id="btnSalvar"
                                    type="button"
                                    onClick={(e) => handleSave(e)}
                                >
                                    Salvar
                                </button>
                            </form>
                        </div>
                    </div>
                )}

                <div className="events-container">
                    <h3>Eventos Salvos</h3>
                    <div className="events-box">
                        {events.length > 0 ? (
                            events.map((event) => {
                                // Converte o campo `date` para um formato legível
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
            </main>
        </div>
    );
}

export default Agenda;