import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, FileText, Lock } from 'lucide-react';

// --- БАЗА ДАНЕТОК ---
const STORIES = [
  {
    title: "ДЕЛО №101 // ПУСТЫНЯ",
    task: "Посреди пустыни найден мертвый мужчина. В руках у него зажата сломанная спичка. Вокруг нет ни следов, ни одежды. От чего он погиб?",
    solution: "Он и его друзья летели на воздушном шаре, который начал падать. Чтобы облегчить шар, они скинули одежду. Затем тянули жребий (спички), кому прыгать. Ему досталась короткая."
  },
  {
    title: "ДЕЛО №102 // ТЕМНОТА",
    task: "Человек выключил свет и лег спать. Утром он посмотрел в окно, закричал и покончил с собой. Почему?",
    solution: "Он был смотрителем маяка. Выключив свет, он обрек корабли на крушение. Утром он увидел последствия катастрофы на скалах."
  },
  {
    title: "ДЕЛО №103 // ПОЕЗД",
    task: "Мужчина едет в поезде, заходит в туннель, достает пистолет и стреляет в себя. Если бы он ехал в вагоне-ресторане, он бы остался жив. Что случилось?",
    solution: "Он только что перенес операцию на глаза и ехал домой. В туннеле он подумал, что снова ослеп, и отчаялся. В вагоне-ресторане он бы увидел свет от ламп или свечей."
  }
];

export default function App() {
  const [current, setCurrent] = useState(0); // Индекс текущей истории
  const [revealed, setRevealed] = useState(false); // Состояние "открыто/закрыто"

  // Переход к следующей истории
  const nextStory = () => {
    setRevealed(false);
    setCurrent((prev) => (prev + 1) % STORIES.length);
  };

  // Переход к предыдущей истории
  const prevStory = () => {
    setRevealed(false);
    setCurrent((prev) => (prev - 1 + STORIES.length) % STORIES.length);
  };

  return (
    <div className="folder-case">
      {/* Шапка документа */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <div className="stamp-red">СЕКРЕТНО</div>
          <h2 style={{ margin: '0 0 10px 0', fontSize: '1rem' }}>АРХИВ: ОТДЕЛ "ЧЕРНЫЕ ИСТОРИИ"</h2>
          <p style={{ margin: 0, opacity: 0.6, fontSize: '0.8rem' }}>ЭКЗЕМПЛЯР № {current + 248}</p>
        </div>
        <FileText size={40} opacity={0.2} />
      </div>

      <hr style={{ border: '1px solid #a09070', margin: '25px 0' }} />

      {/* Контент истории */}
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
        >
          <h1 style={{ fontSize: '1.4rem', marginBottom: '20px' }}>{STORIES[current].title}</h1>
          <p className="story-text">
            <strong>ОБСТОЯТЕЛЬСТВА:</strong><br />
            {STORIES[current].task}
          </p>

          <div 
            className={`solution-box ${revealed ? 'revealed' : ''}`}
            onClick={() => setRevealed(true)}
          >
            <strong>РАЗВЯЗКА:</strong><br />
            {STORIES[current].solution}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Навигация (кнопки как скрепки или штампы) */}
      <div style={styles.navBar}>
        <button onClick={prevStory} style={styles.navBtn}>
          <ChevronLeft size={20} /> НАЗАД
        </button>
        <span style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>ЛИСТ {current + 1} / {STORIES.length}</span>
        <button onClick={nextStory} style={styles.navBtn}>
          СЛЕД. ДЕЛО <ChevronRight size={20} />
        </button>
      </div>

      {/* Футер-печать */}
      <div style={styles.footer}>
        <div style={{ border: '2px solid rgba(0,0,0,0.1)', padding: '5px', borderRadius: '50%', width: '60px', height: '60px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.6rem', textAlign: 'center' }}>
          ОТДЕЛ<br/>УЛИК
        </div>
      </div>
    </div>
  );
}

// --- ИНЛАЙН СТИЛИ ---
const styles = {
  navBar: {
    marginTop: '40px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTop: '1px solid #a09070',
    paddingTop: '20px'
  },
  navBtn: {
    background: 'none',
    border: 'none',
    fontFamily: 'inherit',
    fontWeight: 'bold',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '5px',
    color: '#2c2c2c'
  },
  footer: {
    position: 'absolute',
    bottom: '20px',
    right: '20px',
    opacity: 0.3
  }
};
