import { useState, useCallback } from 'react';
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
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { Badge } from '../components/Badge';
import { ProductCard } from '../components/ProductCard';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { CurrencyInput } from '../components/CurrencyInput';
import { ListItem } from '../components/ListItem';
import { Avatar } from '../components/Avatar';
import { Modal } from '../components/Modal';
import { IconWrapper } from '../components/IconWrapper';
import { user, products, transactions, offers, credits, formatCurrency } from '../data/mockData';
import './CitibanamexDemo.css';

type Screen = 'home' | 'transfer' | 'payments';

export const CitibanamexDemo: React.FC = () => {
  const { t } = useTranslation();
  const [activeScreen, setActiveScreen] = useState<Screen>('home');
  const [transferStep, setTransferStep] = useState(1);
  const [successModalOpen, setSuccessModalOpen] = useState(false);

  const [transferData, setTransferData] = useState({
    fromAccount: '',
    toAccount: '',
    amount: 0,
    concept: '',
  });

  const handleTransferNext = useCallback(() => {
    if (transferStep < 3) setTransferStep((prev) => prev + 1);
  }, [transferStep]);

  const handleTransferBack = useCallback(() => {
    if (transferStep > 1) setTransferStep((prev) => prev - 1);
  }, [transferStep]);

  const handleTransferSubmit = useCallback(() => {
    setSuccessModalOpen(true);
  }, []);

  const handleSuccessClose = useCallback(() => {
    setSuccessModalOpen(false);
    setTransferStep(1);
    setActiveScreen('home');
    setTransferData({ fromAccount: '', toAccount: '', amount: 0, concept: '' });
  }, []);

  const handleNavClick = useCallback((screen: Screen) => {
    setActiveScreen(screen);
    if (screen === 'transfer') setTransferStep(1);
  }, []);

  /* ─── Home Screen ─────────────────────────────────────── */
  const renderHomeScreen = () => (
    <div className="demo-screen">

      {/* Productos */}
      <section className="demo-section">
        <div className="demo-section__header">
          <h2 className="demo-section__title">Mis productos</h2>
          <a href="#" className="demo-section__link">{t('actions.viewAll')}</a>
        </div>
        <div className="demo-products">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onPress={(id) => console.log('product:', id)}
            />
          ))}
        </div>
      </section>

      {/* Quick Actions */}
      <section className="demo-section">
        <div className="demo-section__header">
          <h2 className="demo-section__title">Acciones rápidas</h2>
        </div>
        <div className="demo-actions">
          <Button variant="primary" size="sm" onClick={() => handleNavClick('transfer')}>
            <ArrowUpRight size={16} strokeWidth={1.5} />
            {t('actions.transfer')}
          </Button>
          <Button variant="secondary" size="sm" onClick={() => handleNavClick('payments')}>
            <FileText size={16} strokeWidth={1.5} />
            {t('actions.pay')}
          </Button>
          <Button variant="ghost" size="sm">
            <Landmark size={16} strokeWidth={1.5} />
            Depósitos
          </Button>
          <Button variant="danger" size="sm">
            <Wallet size={16} strokeWidth={1.5} />
            Retiros
          </Button>
        </div>
      </section>

      {/* Movimientos recientes */}
      <section className="demo-section">
        <div className="demo-section__header">
          <h2 className="demo-section__title">Movimientos recientes</h2>
          <a href="#" className="demo-section__link">{t('actions.viewAll')}</a>
        </div>
        <div className="demo-transactions">
          {transactions.slice(0, 4).map((tx, index) => (
            <ListItem
              key={tx.id}
              icon={<IconWrapper iconName={tx.icon} category={tx.category} size={20} />}
              title={tx.description}
              subtitle={tx.date}
              amount={formatCurrency(tx.amount)}
              amountNegative={tx.amount < 0}
              showDivider={index < 3}
            />
          ))}
        </div>
      </section>

      {/* Ofertas */}
      <section className="demo-section">
        <div className="demo-section__header">
          <h2 className="demo-section__title">Ofertas</h2>
          <a href="#" className="demo-section__link">{t('actions.viewAll')}</a>
        </div>
        <div className="demo-offers">
          {offers.map((offer) => (
            <div key={offer.id} className="demo-offer-card">
              <div
                className="demo-offer-card__image"
                style={{ backgroundImage: `url(${offer.image})` }}
              />
              <div className="demo-offer-card__content">
                <Badge label={offer.badge} variant="beneficios" size="sm" />
                <p className="demo-offer-card__text">{offer.title}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Créditos */}
      <section className="demo-section">
        <div className="demo-section__header">
          <h2 className="demo-section__title">Créditos</h2>
        </div>
        <div className="demo-credits">
          {credits.map((credit) => (
            <div key={credit.id} className="demo-offer-card">
              <div
                className="demo-offer-card__image"
                style={{ backgroundImage: `url(${credit.image})` }}
              />
              <div className="demo-offer-card__content">
                <Badge label={credit.badge} variant="beneficios" size="sm" />
                <p className="demo-offer-card__title">{credit.title}</p>
                <p className="demo-offer-card__subtitle">{credit.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Disclaimer */}
      <section className="demo-section">
        <div className="demo-disclaimer">
          <Shield size={14} />
          <p>Entorno de demostración. No se realizan transacciones reales.</p>
        </div>
      </section>
    </div>
  );

  /* ─── Transfer Screen ─────────────────────────────────── */
  const renderTransferScreen = () => (
    <div className="demo-screen">
      <div className="screen-header">
        <h2 className="screen-title">Transferir</h2>
        <div className="screen-steps">
          {['Origen', 'Destino', 'Confirmar'].map((label, i) => (
            <div
              key={label}
              className={`screen-step ${transferStep >= i + 1 ? 'screen-step--active' : ''}`}
            >
              <span className="screen-step__number">{i + 1}</span>
              <span className="screen-step__label">{label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Step 1 — Origen */}
      {transferStep === 1 && (
        <div className="transfer-step">
          <h3 className="transfer-step__title">Selecciona cuenta de origen</h3>
          <div className="accounts-list">
            {products.map((product) => (
              <div
                key={product.id}
                className={`account-item ${transferData.fromAccount === product.category ? 'account-item--selected' : ''}`}
                onClick={() => setTransferData({ ...transferData, fromAccount: product.category })}
              >
                <IconWrapper iconName={product.id} category={product.category} size={24} />
                <div className="account-item__info">
                  <span className="account-item__name">{product.category}</span>
                  <span className="account-item__balance">
                    {formatCurrency(product.balance || 0)}
                  </span>
                </div>
                {transferData.fromAccount === product.category && (
                  <CheckCircle size={20} className="account-item__check" />
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Step 2 — Destino */}
      {transferStep === 2 && (
        <div className="transfer-step">
          <h3 className="transfer-step__title">Datos del destino</h3>
          <div className="transfer-fields">
            <Input
              label="Número de cuenta o CLABE"
              placeholder="000000000000000000"
              value={transferData.toAccount}
              onChange={(e) => setTransferData({ ...transferData, toAccount: e.target.value })}
            />
            <CurrencyInput
              label="Monto a transferir"
              value={transferData.amount}
              onChange={(val) => setTransferData({ ...transferData, amount: val })}
              currency="MXN"
              maxValue={500000}
            />
            <Input
              label="Concepto"
              placeholder="Descripción del pago"
              value={transferData.concept}
              onChange={(e) => setTransferData({ ...transferData, concept: e.target.value })}
            />
          </div>
        </div>
      )}

      {/* Step 3 — Confirmar */}
      {transferStep === 3 && (
        <div className="transfer-step">
          <h3 className="transfer-step__title">Confirmar transferencia</h3>
          <div className="confirmation-details">
            <div className="confirmation-row">
              <span>De</span>
              <strong>{transferData.fromAccount || '—'}</strong>
            </div>
            <div className="confirmation-row">
              <span>Para</span>
              <strong>{transferData.toAccount || '—'}</strong>
            </div>
            <div className="confirmation-row">
              <span>Monto</span>
              <strong className="confirmation-amount">
                {formatCurrency(transferData.amount)}
              </strong>
            </div>
            <div className="confirmation-row">
              <span>Concepto</span>
              <strong>{transferData.concept || '—'}</strong>
            </div>
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="transfer-actions">
        {transferStep > 1 && (
          <Button variant="secondary" onClick={handleTransferBack}>
            Regresar
          </Button>
        )}
        {transferStep < 3 && (
          <Button variant="primary" onClick={handleTransferNext}>
            Continuar
          </Button>
        )}
        {transferStep === 3 && (
          <Button variant="primary" onClick={handleTransferSubmit}>
            Confirmar
          </Button>
        )}
      </div>

      {/* Success Modal del DS */}
      <Modal
        isOpen={successModalOpen}
        onClose={handleSuccessClose}
        title="¡Transferencia exitosa!"
        description={`Tu transferencia de ${formatCurrency(transferData.amount)} ha sido procesada correctamente.`}
        variant="success"
        primaryAction={{
          label: 'Ir al inicio',
          onClick: handleSuccessClose,
        }}
      />
    </div>
  );

  /* ─── Payments Screen ─────────────────────────────────── */
  const renderPaymentsScreen = () => (
    <div className="demo-screen">
      <div className="screen-header">
        <h2 className="screen-title">Pagos</h2>
      </div>

      <div className="payments-grid">
        {[
          { icon: <Home size={28} strokeWidth={1.5} />, label: 'Servicios' },
          { icon: <CreditCard size={28} strokeWidth={1.5} />, label: 'Tarjetas' },
          { icon: <Landmark size={28} strokeWidth={1.5} />, label: 'Créditos' },
          { icon: <PiggyBank size={28} strokeWidth={1.5} />, label: 'Ahorro' },
          { icon: <Wallet size={28} strokeWidth={1.5} />, label: 'Seguros' },
          { icon: <TrendingUp size={28} strokeWidth={1.5} />, label: 'Inversiones' },
        ].map(({ icon, label }) => (
          <div key={label} className="payment-card">
            <div className="payment-card__icon">{icon}</div>
            <span>{label}</span>
          </div>
        ))}
      </div>

      <div className="quick-payments">
        <h3 className="demo-section__title">Pagos rápidos</h3>
        <div className="demo-transactions">
          {transactions.slice(0, 3).map((tx, index) => (
            <ListItem
              key={tx.id}
              icon={<IconWrapper iconName={tx.icon} category={tx.category} size={20} />}
              title={tx.description}
              subtitle={tx.date}
              amount={formatCurrency(Math.abs(tx.amount))}
              showDivider={index < 2}
            />
          ))}
        </div>
      </div>
    </div>
  );

  /* ─── Render ──────────────────────────────────────────── */
  return (
    <div className="citibanamex-demo">
      <div className="demo-panel">

        {/* Header usando Avatar del DS */}
        <header className="demo-header">
          <div className="demo-header__left">
            <Avatar initials="JA" variant="teal" size="md" />
            <div className="demo-header__user">
              <span className="demo-header__name">{user.name}</span>
              <span className="demo-header__tier">{user.tier}</span>
            </div>
          </div>
          <div className="demo-header__right">
            <Badge label="Priority" variant="nuevo" size="sm" />
          </div>
        </header>

        {/* Main content — sin AnimatePresence */}
        <main className="demo-main">
          {activeScreen === 'home' && renderHomeScreen()}
          {activeScreen === 'transfer' && renderTransferScreen()}
          {activeScreen === 'payments' && renderPaymentsScreen()}
        </main>

        {/* Bottom Navigation */}
        <nav className="demo-nav">
          <button
            className={`demo-nav__item ${activeScreen === 'home' ? 'demo-nav__item--active' : ''}`}
            onClick={() => handleNavClick('home')}
          >
            <Home size={22} strokeWidth={1.5} />
            <span>Inicio</span>
          </button>
          <button
            className={`demo-nav__item ${activeScreen === 'transfer' ? 'demo-nav__item--active' : ''}`}
            onClick={() => handleNavClick('transfer')}
          >
            <ArrowRightCircle size={22} strokeWidth={1.5} />
            <span>Transferir</span>
          </button>
          <button
            className={`demo-nav__item ${activeScreen === 'payments' ? 'demo-nav__item--active' : ''}`}
            onClick={() => handleNavClick('payments')}
          >
            <FileText size={22} strokeWidth={1.5} />
            <span>Pagos</span>
          </button>
        </nav>
      </div>
    </div>
  );
};