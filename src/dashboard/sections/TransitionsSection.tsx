import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../../components/Button';
import { useTranslation } from 'react-i18next';
import './Foundations.css';

export const TransitionsSection: React.FC = () => {
  const { t } = useTranslation();
  const [activeDemos, setActiveDemos] = useState({
    fadeScale: false,
    slideIn: false,
    staggerList: false,
  });

  const [tapCount, setTapCount] = useState(0);

  const transitionTokens = [
    {
      name: 'fast',
      value: '150ms',
      usage: t('foundations.transitions.fast.usage'),
      token: '--transition-fast',
    },
    {
      name: 'normal',
      value: '200ms',
      usage: t('foundations.transitions.normal.usage'),
      token: '--transition-normal',
    },
    {
      name: 'slow',
      value: '300ms',
      usage: t('foundations.transitions.slow.usage'),
      token: '--transition-slow',
    },
  ];

  const listItems = ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'];

  return (
    <div className="foundations">
      <div className="foundations__header">
        <h1>{t('foundations.transitions.title')}</h1>
        <p>{t('foundations.transitions.description')}</p>
      </div>

      {/* ── Interactive Examples ─────────────── */}
      <section className="foundations__section">
        <h2>{t('foundations.transitions.interactiveExamples')}</h2>

        {/* Demo 1: Fade + Scale */}
        <div className="foundations__demo-group">
          <h3>{t('foundations.transitions.fadeScale')}</h3>
          <div className="foundations__demo-box">
            <Button
              variant="primary"
              onClick={() =>
                setActiveDemos((prev) => ({
                  ...prev,
                  fadeScale: !prev.fadeScale,
                }))
              }
            >
              {activeDemos.fadeScale
                ? t('foundations.transitions.hide')
                : t('foundations.transitions.show')}
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
                  Fade + Scale
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Demo 2: Slide In */}
        <div className="foundations__demo-group">
          <h3>{t('foundations.transitions.slideIn')}</h3>
          <div className="foundations__demo-box">
            <Button
              variant="secondary"
              onClick={() =>
                setActiveDemos((prev) => ({
                  ...prev,
                  slideIn: !prev.slideIn,
                }))
              }
            >
              {activeDemos.slideIn
                ? t('foundations.transitions.hide')
                : t('foundations.transitions.show')}
            </Button>
            <AnimatePresence>
              {activeDemos.slideIn && (
                <motion.div
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -100, opacity: 0 }}
                  transition={{
                    type: 'spring',
                    stiffness: 300,
                    damping: 25,
                  }}
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
          <h3>{t('foundations.transitions.springBounce')}</h3>
          <div className="foundations__demo-box">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="foundations__bounce-box"
            >
              Hover / Tap
            </motion.div>
          </div>
        </div>

        {/* Demo 4: Stagger List */}
        <div className="foundations__demo-group">
          <h3>{t('foundations.transitions.staggerList')}</h3>
          <div className="foundations__demo-box">
            <Button
              variant="primary"
              onClick={() =>
                setActiveDemos((prev) => ({
                  ...prev,
                  staggerList: !prev.staggerList,
                }))
              }
            >
              {activeDemos.staggerList
                ? t('foundations.transitions.reset')
                : t('foundations.transitions.animate')}
            </Button>
            <motion.ul className="foundations__stagger-list">
              {listItems.map((item, index) => (
                <motion.li
                  key={item}
                  initial={{ opacity: 0, x: -20 }}
                  animate={
                    activeDemos.staggerList
                      ? { opacity: 1, x: 0 }
                      : { opacity: 0, x: -20 }
                  }
                  transition={{ delay: index * 0.1 }}
                  className="foundations__stagger-item"
                >
                  {item}
                </motion.li>
              ))}
            </motion.ul>
          </div>
        </div>

        {/* Demo 5: Whip Tap */}
        <div className="foundations__demo-group">
          <h3>{t('foundations.transitions.whipTap')}</h3>
          <div className="foundations__demo-box">
            <motion.button
              whileTap={{ scale: 0.95 }}
              className="foundations__tap-button"
              onClick={() => setTapCount((prev) => prev + 1)}
            >
              Tap me!
            </motion.button>
            <div className="foundations__tap-counter">Taps: {tapCount}</div>
          </div>
        </div>
      </section>

      {/* ── Transition Tokens ───────────────── */}
      <section className="foundations__section">
        <h2>{t('foundations.transitions.tokens')}</h2>
        <table className="foundations__transitions-table">
          <thead>
            <tr>
              <th>{t('foundations.transitions.table.token')}</th>
              <th>{t('foundations.transitions.table.value')}</th>
              <th>{t('foundations.transitions.table.usage')}</th>
            </tr>
          </thead>
          <tbody>
            {transitionTokens.map((token) => (
              <tr key={token.name}>
                <td>
                  <code>{token.token}</code>
                </td>
                <td>{token.value} ease-in-out</td>
                <td>{token.usage}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};