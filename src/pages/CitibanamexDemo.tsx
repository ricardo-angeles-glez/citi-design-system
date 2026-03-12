import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Home, 
  ArrowRightCircle, 
  FileText,
  CreditCard,
  Wallet,
  TrendingUp,
  ArrowUpRight,
  Landmark,
  PiggyBank,
  CheckCircle,
  Shield,
  Bell,
  User
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Badge } from '../components/Badge';
import { ProductCard } from '../components/ProductCard';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { IconWrapper } from '../components/IconWrapper';
import { user, products, transactions, offers, credits, formatCurrency } from '../data/mockData';
import '../components/Badge/Badge.css';
import '../components/ProductCard/ProductCard.css';
import '../components/Button/Button.css';
import '../components/Input/Input.css';
import '../styles/responsive.css';
import './CitibanamexDemo.css';

type Screen = 'home' | 'transfer' | 'payments';

const screenVariants = {
  initial: { opacity: 0, x: 30 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -30 }
};

const transition = { duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] };

const listContainerVariants = {
  animate: { transition: { staggerChildren: 0.06 } }
};

const listItemVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 }
};

export const CitibanamexDemo: React.FC = () => {
  const { t } = useTranslation();
  const [activeScreen, setActiveScreen] = useState<Screen>('home');
  const [transferStep, setTransferStep] = useState(1);
  
  const [transferData, setTransferData] = useState({
    fromAccount: '',
    toAccount: '',
    amount: '',
    concept: '',
    date: new Date().toISOString().split('T')[0]
  });

  const handleTransferNext = useCallback(() => {
    if (transferStep < 3) {
      setTransferStep(prev => prev + 1);
    }
  }, [transferStep]);

  const handleTransferBack = useCallback(() => {
    if (transferStep > 1) {
      setTransferStep(prev => prev - 1);
    }
  }, [transferStep]);

  const handleTransferSubmit = useCallback(() => {
    setTransferStep(4);
    setTimeout(() => {
      setTransferStep(1);
      setActiveScreen('home');
      setTransferData({
        fromAccount: '',
        toAccount: '',
        amount: '',
        concept: '',
        date: new Date().toISOString().split('T')[0]
      });
    }, 2000);
  }, []);

  const handleNavClick = useCallback((screen: Screen) => {
    setActiveScreen(screen);
    if (screen === 'transfer') setTransferStep(1);
  }, []);

  const renderHomeScreen = () => (
    <motion.div
      variants={listContainerVariants}
      animate="animate"
      initial="initial"
      style={{ flex: 1 }}
    >
      {/* Productos Section */}
      <section className="demo-section">
        <div className="demo-section__header">
          <h2 className="demo-section__title">{t('navigation.home')}</h2>
        </div>
        
        <motion.div className="demo-products" variants={listContainerVariants} animate="animate">
          {products.map((product) => (
            <motion.div
              key={product.id}
              variants={listItemVariants}
              initial="initial"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.96 }}
            >
              <ProductCard
                product={product}
                onPress={(id) => console.log('Pressed product:', id)}
              />
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Ofertas Section */}
      <section className="demo-section">
        <div className="demo-section__header">
          <h2 className="demo-section__title">Ofertas</h2>
          <a href="#" className="demo-section__link">{t('actions.viewAll')}</a>
        </div>
        
        <motion.div className="demo-offers" variants={listContainerVariants} animate="animate">
          {offers.map((offer) => (
            <motion.div
              key={offer.id}
              className="demo-offer-card"
              variants={listItemVariants}
              initial="initial"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.96 }}
            >
              <div className="demo-offer-card__image" style={{ backgroundImage: `url(${offer.image})` }}></div>
              <div className="demo-offer-card__content">
                <Badge label={offer.badge} variant="beneficios" size="sm" />
                <p className="demo-offer-card__text">{offer.title}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Créditos Section */}
      <section className="demo-section">
        <div className="demo-section__header">
          <h2 className="demo-section__title">Créditos</h2>
        </div>
        
        <motion.div className="demo-credits" variants={listContainerVariants} animate="animate">
          {credits.map((credit) => (
            <motion.div
              key={credit.id}
              className="demo-offer-card"
              variants={listItemVariants}
              initial="initial"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.96 }}
            >
              <div className="demo-offer-card__image" style={{ backgroundImage: `url(${credit.image})` }}></div>
              <div className="demo-offer-card__content">
                <Badge label={credit.badge} variant="beneficios" size="sm" />
                <p className="demo-offer-card__title">{credit.title}</p>
                <p className="demo-offer-card__subtitle">{credit.subtitle}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Quick Actions */}
      <section className="demo-section">
        <div className="demo-actions">
          <motion.div whileTap={{ scale: 0.96 }}>
            <Button variant="primary" size="sm" onClick={() => handleNavClick('transfer')}>
              <ArrowUpRight size={16} strokeWidth={1.5} />
              {t('actions.transfer')}
            </Button>
          </motion.div>
          <motion.div whileTap={{ scale: 0.96 }}>
            <Button variant="secondary" size="sm" onClick={() => handleNavClick('payments')}>
              <FileText size={16} strokeWidth={1.5} />
              {t('actions.pay')}
            </Button>
          </motion.div>
          <motion.div whileTap={{ scale: 0.96 }}>
            <Button variant="ghost" size="sm">
              <Landmark size={16} strokeWidth={1.5} />
              Depósitos
            </Button>
          </motion.div>
          <motion.div whileTap={{ scale: 0.96 }}>
            <Button variant="danger" size="sm">
              <Wallet size={16} strokeWidth={1.5} />
              Retiros
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Search Alert */}
      <section className="demo-section">
        <Input 
          placeholder="Buscar transacciones..." 
          label="Buscar"
        />
        <div className="demo-alert">
          <Input 
            value="" 
            error="Tu sesión expira en 5 minutos"
            placeholder="Ingresa código de seguridad"
          />
        </div>
      </section>

      {/* Disclaimer */}
      <section className="demo-section">
        <div className="disclaimer">
          <Shield size={16} />
          <p>Este es un entorno de demostración. No se realizan transacciones reales.</p>
        </div>
      </section>
    </motion.div>
  );

  const renderTransferScreen = () => (
    <section className="demo-screen">
      <div className="screen-header">
        <h2 className="screen-title">Transferir</h2>
        <div className="screen-steps">
          <div className={`screen-step ${transferStep >= 1 ? 'screen-step--active' : ''}`}>
            <span className="screen-step__number">1</span>
            <span className="screen-step__label">Origen</span>
          </div>
          <div className={`screen-step ${transferStep >= 2 ? 'screen-step--active' : ''}`}>
            <span className="screen-step__number">2</span>
            <span className="screen-step__label">Destino</span>
          </div>
          <div className={`screen-step ${transferStep >= 3 ? 'screen-step--active' : ''}`}>
            <span className="screen-step__number">3</span>
            <span className="screen-step__label">Confirmar</span>
          </div>
        </div>
      </div>

      {transferStep === 1 && (
        <motion.div 
          className="transfer-step"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}
        >
          <h3 className="transfer-step__title">Selecciona cuenta de origen</h3>
          <motion.div className="accounts-list" variants={listContainerVariants} animate="animate">
            {products.map((product) => (
              <motion.div
                key={product.id}
                className={`account-item ${transferData.fromAccount === product.category ? 'account-item--selected' : ''}`}
                onClick={() => setTransferData({...transferData, fromAccount: product.category})}
                variants={listItemVariants}
                initial="initial"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.96 }}
              >
                <IconWrapper iconName={product.id} category={product.category} size={24} />
                <div className="account-item__info">
                  <span className="account-item__name">{product.category}</span>
                  <span className="account-item__balance">{formatCurrency(product.balance || 0)}</span>
                </div>
                {transferData.fromAccount === product.category && <CheckCircle size={20} className="account-item__check" />}
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      )}

      {transferStep === 2 && (
        <motion.div 
          className="transfer-step"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}
        >
          <h3 className="transfer-step__title">Datos del destino</h3>
          <Input 
            label="Número de cuenta o CLABE"
            placeholder="000000000000000000"
            value={transferData.toAccount}
            onChange={(e) => setTransferData({...transferData, toAccount: e.target.value})}
          />
          <Input 
            label="Monto"
            placeholder="$0.00"
            value={transferData.amount}
            onChange={(e) => setTransferData({...transferData, amount: e.target.value})}
          />
          <Input 
            label="Concepto"
            placeholder="Descripción del pago"
            value={transferData.concept}
            onChange={(e) => setTransferData({...transferData, concept: e.target.value})}
          />
        </motion.div>
      )}

      {transferStep === 3 && (
        <motion.div 
          className="transfer-step"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.2 }}
        >
          <h3 className="transfer-step__title">Confirmar transferencia</h3>
          <div className="confirmation-details">
            <div className="confirmation-row">
              <span>De</span>
              <strong>{transferData.fromAccount}</strong>
            </div>
            <div className="confirmation-row">
              <span>Para</span>
              <strong>{transferData.toAccount}</strong>
            </div>
            <div className="confirmation-row">
              <span>Monto</span>
              <strong className="confirmation-amount">${transferData.amount}</strong>
            </div>
            <div className="confirmation-row">
              <span>Concepto</span>
              <strong>{transferData.concept}</strong>
            </div>
          </div>
        </motion.div>
      )}

      {transferStep === 4 && (
        <motion.div 
          className="transfer-step transfer-step--success"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="success-animation">
            <CheckCircle size={64} className="success-icon" />
            <h3>Transferencia Exitosa</h3>
            <p>Tu transferencia ha sido procesada correctamente</p>
          </div>
        </motion.div>
      )}

      <div className="transfer-actions">
        {transferStep > 1 && transferStep < 4 && (
          <motion.div whileTap={{ scale: 0.96 }}>
            <Button variant="secondary" onClick={handleTransferBack}>
              Regresar
            </Button>
          </motion.div>
        )}
        {transferStep < 3 && (
          <motion.div whileTap={{ scale: 0.96 }}>
            <Button variant="primary" onClick={handleTransferNext}>
              Continuar
            </Button>
          </motion.div>
        )}
        {transferStep === 3 && (
          <motion.div whileTap={{ scale: 0.96 }}>
            <Button variant="primary" onClick={handleTransferSubmit}>
              Confirmar
            </Button>
          </motion.div>
        )}
      </div>
    </section>
  );

  const renderPaymentsScreen = () => (
    <section className="demo-screen">
      <div className="screen-header">
        <h2 className="screen-title">Pagos</h2>
      </div>
      
      <motion.div className="payments-grid" variants={listContainerVariants} animate="animate">
        <motion.div className="payment-card" variants={listItemVariants} initial="initial" whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.96 }}>
          <div className="payment-card__icon">
            <Home size={32} strokeWidth={1.5} />
          </div>
          <span>Servicios</span>
        </motion.div>
        <motion.div className="payment-card" variants={listItemVariants} initial="initial" whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.96 }}>
          <div className="payment-card__icon">
            <CreditCard size={32} strokeWidth={1.5} />
          </div>
          <span>Tarjetas</span>
        </motion.div>
        <motion.div className="payment-card" variants={listItemVariants} initial="initial" whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.96 }}>
          <div className="payment-card__icon">
            <Landmark size={32} strokeWidth={1.5} />
          </div>
          <span>Créditos</span>
        </motion.div>
        <motion.div className="payment-card" variants={listItemVariants} initial="initial" whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.96 }}>
          <div className="payment-card__icon">
            <PiggyBank size={32} strokeWidth={1.5} />
          </div>
          <span>Ahorro</span>
        </motion.div>
        <motion.div className="payment-card" variants={listItemVariants} initial="initial" whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.96 }}>
          <div className="payment-card__icon">
            <Wallet size={32} strokeWidth={1.5} />
          </div>
          <span>Seguros</span>
        </motion.div>
        <motion.div className="payment-card" variants={listItemVariants} initial="initial" whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.96 }}>
          <div className="payment-card__icon">
            <TrendingUp size={32} strokeWidth={1.5} />
          </div>
          <span>Inversiones</span>
        </motion.div>
      </motion.div>

      <div className="quick-payments">
        <h3>Pagos rápidos</h3>
        <motion.div className="quick-payments-list" variants={listContainerVariants} animate="animate">
          {transactions.slice(0, 3).map((tx) => (
            <motion.div
              key={tx.id}
              className="quick-payment-item"
              variants={listItemVariants}
              initial="initial"
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.96 }}
            >
              <IconWrapper iconName={tx.icon} category={tx.category} size={24} />
              <div className="quick-payment-info">
                <span>{tx.description}</span>
                <small>{tx.date}</small>
              </div>
              <Button variant="secondary" size="sm">Pagar</Button>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );

  const renderScreen = () => {
    switch (activeScreen) {
      case 'transfer': return renderTransferScreen();
      case 'payments': return renderPaymentsScreen();
      case 'home':
      default: return renderHomeScreen();
    }
  };

  return (
    <div className="citibanamex-demo">
      <div className="demo-panel-left">
        {/* Header without hamburger/menu */}
        <header className="demo-header">
          <div className="demo-header__left">
            <div className="demo-header__avatar">
              <User size={32} />
            </div>
            <div className="demo-header__user">
              <span className="demo-header__name">{user.name}</span>
              <span className="demo-header__tier">{user.tier}</span>
            </div>
          </div>
          <div className="demo-header__right">
            <button className="demo-header__icon">
              <Bell size={20} strokeWidth={1.5} />
            </button>
          </div>
        </header>

        <main className="demo-main">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeScreen}
              variants={screenVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={transition}
              style={{ flex: 1, overflow: 'hidden auto' }}
            >
              {renderScreen()}
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Bottom Navigation - 3 tabs only */}
        <nav className="demo-nav">
          <motion.button 
            className={`demo-nav__item ${activeScreen === 'home' ? 'demo-nav__item--active' : ''}`}
            onClick={() => handleNavClick('home')}
            whileTap={{ scale: 0.96 }}
          >
            <Home size={24} strokeWidth={1.5} />
            <span>Inicio</span>
          </motion.button>
          <motion.button 
            className={`demo-nav__item ${activeScreen === 'transfer' ? 'demo-nav__item--active' : ''}`}
            onClick={() => handleNavClick('transfer')}
            whileTap={{ scale: 0.96 }}
          >
            <ArrowRightCircle size={24} strokeWidth={1.5} />
            <span>Transferir</span>
          </motion.button>
          <motion.button 
            className={`demo-nav__item ${activeScreen === 'payments' ? 'demo-nav__item--active' : ''}`}
            onClick={() => handleNavClick('payments')}
            whileTap={{ scale: 0.96 }}
          >
            <FileText size={24} strokeWidth={1.5} />
            <span>Pagos</span>
          </motion.button>
        </nav>
      </div>
    </div>
  );
};
