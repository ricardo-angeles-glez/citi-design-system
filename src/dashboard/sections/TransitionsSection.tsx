import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../../components/Button';
import './Foundations.css';

export const TransitionsSection: React.FC = () => {
  const [activeDemos, setActiveDemos] = useState({
    fadeScale: false,
    slideIn: false,
    staggerList: false,
  });
  
  const [tapCount, setTapCount] = useState(0);

  const transitions = [
    { name: 'fast', value: '150ms', usage: 'Hover, focus states', token: '--transition-fast' },
    { name: 'normal', value: '200ms', usage: 'Cards, dropdowns', token: '--transition-normal' },
    { name: 'slow', value: '300ms', usage: 'Modales, overlays', token: '--transition-slow' },
  ];

  const listItems = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];

  return (
    <div className="foundations">
      <div className="foundations__header">
        <h1>Transiciones</h1>
        <p>Valores de transición del sistema</p>
      </div>

      <section className="foundations__section">
        <h2>Ejemplos interactivos</h2>
        
        {/* Demo 1: Fade + Scale */}
        <div className="foundations__demo-group">
          <h3>Fade + Scale</h3>
          <div className="foundations__demo-box">
            <Button 
              variant="primary" 
              onClick={() => setActiveDemos(prev => ({ ...prev, fadeScale: !prev.fadeScale }))}
            >
              {activeDemos.fadeScale ? 'Hide' : 'Show'} Box
            </Button>
            <AnimatePresence>
              {activeDemos.fadeScale && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                  className="foundations__motion-box"
                >
                  Fade + Scale Animation
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Demo 2: Slide In */}
        <div className="foundations__demo-group">
          <h3>Slide In</h3>
          <div className="foundations__demo-box">
            <Button 
              variant="secondary" 
              onClick={() => setActiveDemos(prev => ({ ...prev, slideIn: !prev.slideIn }))}
            >
              {activeDemos.slideIn ? 'Hide' : 'Show'} Panel
            </Button>
            <AnimatePresence>
              {activeDemos.slideIn && (
                <motion.div
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -100, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  className="foundations__slide-panel"
                >
                  Slide In Panel
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Demo 3: Spring Bounce */}
        <div className="foundations__demo-group">
          <h3>Spring Bounce</h3>
          <div className="foundations__demo-box">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="foundations__bounce-box"
            >
              Hover or Tap
            </motion.div>
          </div>
        </div>

        {/* Demo 4: Stagger List */}
        <div className="foundations__demo-group">
          <h3>Stagger List</h3>
          <div className="foundations__demo-box">
            <Button 
              variant="primary" 
              onClick={() => setActiveDemos(prev => ({ ...prev, staggerList: !prev.staggerList }))}
            >
              {activeDemos.staggerList ? 'Reset' : 'Animate'} List
            </Button>
            <motion.ul className="foundations__stagger-list">
              {listItems.map((item, index) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  animate={activeDemos.staggerList ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ delay: index * 0.1 }}
                  className="foundations__stagger-item"
                >
                  {item}
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>

        {/* Demo 5: Whip Tap (Button feedback) */}
        <div className="foundations__demo-group">
          <h3>Whip Tap (Button feedback)</h3>
          <div className="foundations__demo-box">
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="foundations__tap-button"
              onClick={() => setTapCount(prev => prev + 1)}
            >
              Tap me!
            </motion.button>
            <div className="foundations__tap-counter">
              Taps: {tapCount}
            </div>
          </div>
        </div>
      </section>

      <section className="foundations__section">
        <h2>Tokens de transición</h2>
        <table className="foundations__transitions-table">
          <thead>
            <tr>
              <th>Token</th>
              <th>Valor</th>
              <th>Uso recomendado</th>
            </tr>
          </thead>
          <tbody>
            {transitions.map((t) => (
              <tr key={t.name}>
                <td><code>{t.token}</code></td>
                <td>{t.value} ease-in-out</td>
                <td>{t.usage}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};
