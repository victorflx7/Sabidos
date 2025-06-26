import React, { useState, useEffect } from 'react';
import './Agenda.css';
import { db } from '../../firebase/config';
import {
  collection,
  addDoc,
  query,
  onSnapshot,
  where,
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { registrarEvento, incrementarContadorEvento } from '../../services/analytics/analyticsEvents';

function gerarDatasRecorrentes(dataInicial, tipoRecorrencia, dataLimite) {
  const datas = [];
  const atual = new Date(dataInicial);
  const limite = new Date(dataLimite);

  while (atual <= limite) {
    datas.push(new Date(atual));
    if (tipoRecorrencia === "diaria") atual.setDate(atual.getDate() + 1);
    else if (tipoRecorrencia === "semanal") atual.setDate(atual.getDate() + 7);
    else if (tipoRecorrencia === "mensal") atual.setMonth(atual.getMonth() + 1);
    else break;
  }

  return datas;
}

function Agenda() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [eventTitle, setEventTitle] = useState("");
  const [events, setEvents] = useState([]);
  const [recorrencia, setRecorrencia] = useState("nenhuma");
  const [dataFimRecorrencia, setDataFimRecorrencia] = useState("");

  const auth = getAuth();
  const user = auth.currentUser;
  const userId = user?.uid;

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged((user) => {
      if (user) {
        const q = query(
          collection(db, "events"),
          where("userId", "==", user.uid)
        );

        const unsubscribeSnapshot = onSnapshot(q, (querySnapshot) => {
          const loadedEvents = [];
          querySnapshot.forEach((doc) => {
            const data = doc.data();
            const dateStr = data.date instanceof Date
              ? data.date.toISOString().split("T")[0]
              : data.date;

            loadedEvents.push({ id: doc.id, ...data, date: dateStr });
          });
          setEvents(loadedEvents);
        });

        return () => unsubscribeSnapshot();
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

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="empty-cell"></div>);
    }

    for (let i = 1; i <= lastDate; i++) {
      const fullDate = new Date(year, month, i).toISOString().split('T')[0];
      const eventosDoDia = events.filter((event) => event.date === fullDate);

      days.push(
        <div
          key={fullDate}
          className="day"
          data-value={fullDate}
          onClick={() => handleDayClick(fullDate)}
        >
          <div>{i}</div>
          {eventosDoDia.map((evento, idx) => (
            <div key={idx} className="event-label">
              {evento.title}
            </div>
          ))}
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
      if (
        recorrencia !== "nenhuma" &&
        (!dataFimRecorrencia || new Date(dataFimRecorrencia) < new Date(selectedDate))
      ) {
        alert("A data final da recorrência deve ser maior que a data inicial.");
        return;
      }

      try {
        const datas =
          recorrencia !== "nenhuma" && dataFimRecorrencia
            ? gerarDatasRecorrentes(selectedDate, recorrencia, dataFimRecorrencia)
            : [new Date(selectedDate)];

        for (let data of datas) {
          await addDoc(collection(db, "events"), {
            userId,
            title: eventTitle,
            date: data.toISOString().split("T")[0],
            createdAt: new Date().toISOString(),
            recorrencia,
          });
        }

        registrarEvento('Add_EventoAgenda', {
          titulo: eventTitle,
          data: selectedDate,
          recorrencia,
        });

        incrementarContadorEvento('Add_EventoAgenda');

        setModalVisible(false);
        setEventTitle("");
        setRecorrencia("nenhuma");
        setDataFimRecorrencia("");
        setSelectedDate(null);
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
              <img src="/public/SetaEsquerda.svg" alt="Anterior" />
            </button>
            <span id="monthYear">
              <span className='monthvalue'>
                {currentDate.toLocaleDateString('pt-BR', { month: 'long' })}
              </span>
              <span className='yearvalue'>
                {currentDate.toLocaleDateString('pt-BR', { year: 'numeric' })}
              </span>
            </span>
            <button id="nextMonth" onClick={handleNextMonth}>
              <img src="/public/SetaDireita.svg" alt="Próximo" />
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
              <form id="dataForm" onSubmit={handleSave}>
                <label htmlFor="event-title">Título do Evento:</label>
                <input
                  type="text"
                  id="event-title"
                  name="Titulo_evento"
                  value={eventTitle}
                  onChange={(e) => setEventTitle(e.target.value)}
                  required
                />

                <label htmlFor="recorrencia">Recorrência:</label>
                <select
                  id="recorrencia"
                  value={recorrencia}
                  onChange={(e) => setRecorrencia(e.target.value)}
                >
                  <option value="nenhuma">Nenhuma</option>
                  <option value="diaria">Diária</option>
                  <option value="semanal">Semanal</option>
                  <option value="mensal">Mensal</option>
                </select>

                {recorrencia !== "nenhuma" && (
                  <>
                    <label htmlFor="data-fim">Data final da recorrência:</label>
                    <input
                      type="date"
                      id="data-fim"
                      value={dataFimRecorrencia}
                      onChange={(e) => setDataFimRecorrencia(e.target.value)}
                      required
                    />
                  </>
                )}

                <button id="btnSalvar" type="submit">
                  Salvar
                </button>
              </form>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

export default Agenda;
