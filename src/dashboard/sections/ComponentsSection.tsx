import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { AnimatePresence } from 'framer-motion';
import { ListItem } from '../../components/ListItem';
import { ProductCard } from '../../components/ProductCard';
import { CardVisual } from '../../components/CardVisual';
import { Modal } from '../../components/Modal';
import { Toast } from '../../components/Toast';
import { Skeleton, SkeletonListItem } from '../../components/Skeleton';
import { EmptyState } from '../../components/EmptyState';
import { OTPInput } from '../../components/OTPInput';
import { PINPad } from '../../components/PINPad';
import { CurrencyInput } from '../../components/CurrencyInput';
import { SpendingChart, mockChartData } from '../../components/Chart';
import { Button } from '../../components/Button';
import {
  ShoppingCart, Coffee, Wifi,
  ArrowDownLeft
} from 'lucide-react';
import './ComponentsSection.css';

interface ToastItem {
  id: string;
  message: string;
  variant: 'success' | 'error' | 'warning' | 'info';
}

const demoSavingsProduct = {
  id: 'savings',
  category: 'Ahorro',
  balance: 45230.5,
  count: 1,
  expandable: false,
  bgColor: '#E8F5E9',
  textColor: '#2E7D32',
};

const demoCreditProduct = {
  id: 'credit',
  category: 'Tarjetas de Crédito',
  balance: 125000,
  count: 2,
  expandable: true,
  accounts: [
    {
      id: 'platinum',
      name: 'Citibanamex Platinum',
      number: '•••• 4532',
      balanceMXN: -15420,
      creditAvailable: 84580,
      canBlock: true,
      cardBg: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
      cardAccent: '#E3173E',
      type: 'visa',
    },
    {
      id: 'costco',
      name: 'Costco Citibanamex',
      number: '•••• 8901',
      balanceMXN: -8350,
      creditAvailable: 41650,
      canBlock: true,
      cardBg: 'linear-gradient(135deg, #003B5C 0%, #00698F 100%)',
      cardAccent: '#FFD700',
      type: 'mastercard',
    },
  ],
};

export const ComponentsSection: React.FC = () => {
  const { t } = useTranslation();

  const [defaultModalOpen, setDefaultModalOpen] = useState(false);
  const [dangerModalOpen, setDangerModalOpen] = useState(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);

  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const addToast = (variant: ToastItem['variant'], message: string) => {
    const id = Date.now().toString();
    setToasts((prev) => [...prev, { id, message, variant }]);
  };
  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const [currencyValue, setCurrencyValue] = useState(0);
  const [otpResult, setOtpResult] = useState('');
  const [pinResult, setPinResult] = useState('');

  return (
    <div className="components-section">
      <div className="components-section__header">
        <h1>{t('sections.components.title')}</h1>
        <p>{t('sections.components.description')}</p>
      </div>

      {/* ═══════════════════════════════════════
          LIST ITEMS
      ═══════════════════════════════════════ */}
      <section id="listitems" className="components-section__group">
        <div className="components-section__title-row">
          <h2>{t('sections.components.listitems.title')}</h2>
          <span className="components-section__badge">
            {t('sections.components.component')}
          </span>
        </div>
        <p className="components-section__description">
          {t('sections.components.listitems.description')}
        </p>
        <div className="components-section__preview">
          <div style={{ maxWidth: 480 }}>
            <ListItem
              icon={<ArrowDownLeft size={20} color="#00823B" />}
              title="Nómina Marzo"
              subtitle="Transferencia recibida"
              amount="+$32,000.00"
            />
            <ListItem
              icon={<ShoppingCart size={20} color="#E3173E" />}
              title="Amazon México"
              subtitle="Compra en línea"
              amount="-$1,849.00"
              amountNegative
            />
            <ListItem
              icon={<Coffee size={20} color="#F5A623" />}
              title="Starbucks"
              subtitle="Consumo restaurante"
              amount="-$189.00"
              amountNegative
              badgeText="Pendiente"
              badgeVariant="warning"
            />
            <ListItem
              icon={<Wifi size={20} color="#1565C0" />}
              title="Telmex"
              subtitle="Pago de servicios"
              amount="-$599.00"
              amountNegative
              showDivider={false}
            />
          </div>
        </div>
        <div className="components-section__code">
          <pre>{`<ListItem
  icon={<ShoppingCart size={20} />}
  title="Amazon México"
  subtitle="Compra en línea"
  amount="-$1,849.00"
  amountNegative
  badgeText="Pendiente"
  badgeVariant="warning"
/>`}</pre>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          PRODUCT CARDS
      ═══════════════════════════════════════ */}
      <section id="productcards" className="components-section__group">
        <div className="components-section__title-row">
          <h2>{t('sections.components.productcards.title')}</h2>
          <span className="components-section__badge">
            {t('sections.components.component')}
          </span>
        </div>
        <p className="components-section__description">
          {t('sections.components.productcards.description')}
        </p>
        <div className="components-section__preview">
          <div style={{ maxWidth: 520, display: 'flex', flexDirection: 'column', gap: 16 }}>
            <ProductCard product={demoSavingsProduct as React.ComponentProps<typeof ProductCard>['product']} />
            <ProductCard product={demoCreditProduct as React.ComponentProps<typeof ProductCard>['product']} />
          </div>
        </div>
        <div className="components-section__code">
          <pre>{`<ProductCard
  product={{
    id: 'credit',
    category: 'Tarjetas de Crédito',
    balance: 125000,
    expandable: true,
    accounts: [...]
  }}
/>`}</pre>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          CARD VISUAL
      ═══════════════════════════════════════ */}
      <section id="cardvisual" className="components-section__group">
        <div className="components-section__title-row">
          <h2>Card Visual</h2>
          <span className="components-section__badge">
            {t('sections.components.component')}
          </span>
        </div>
        <p className="components-section__description">
          Representación visual de tarjetas bancarias con gradientes, chip EMV y red de pago. Soporta crédito y débito en tamaños sm y md.
        </p>
        <div className="components-section__preview">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, alignItems: 'flex-start' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
              <p style={{ fontSize: 12, color: 'var(--text-tertiary)', fontWeight: 600, textTransform: 'uppercase' }}>
                Crédito — Oro
              </p>
              <CardVisual
                cardNumber="•••• •••• •••• 3940"
                cardBg="#B8860B"
                cardAccent="#D4AF37"
                type="credit"
                size="md"
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
              <p style={{ fontSize: 12, color: 'var(--text-tertiary)', fontWeight: 600, textTransform: 'uppercase' }}>
                Crédito — Platinum
              </p>
              <CardVisual
                cardNumber="•••• •••• •••• 4532"
                cardBg="#2C3E50"
                cardAccent="#E74C3C"
                type="credit"
                size="md"
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
              <p style={{ fontSize: 12, color: 'var(--text-tertiary)', fontWeight: 600, textTransform: 'uppercase' }}>
                Débito — Priority
              </p>
              <CardVisual
                cardNumber="•••• •••• •••• 9640"
                cardBg="#1A3A5C"
                cardAccent="#0073B1"
                type="debit"
                size="md"
              />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, alignItems: 'center' }}>
              <p style={{ fontSize: 12, color: 'var(--text-tertiary)', fontWeight: 600, textTransform: 'uppercase' }}>
                Crédito — Rojo (sm)
              </p>
              <CardVisual
                cardNumber="•••• •••• •••• 7890"
                cardBg="#E3173E"
                cardAccent="#FF4D6D"
                type="credit"
                size="sm"
              />
            </div>
          </div>
        </div>
        <div className="components-section__code">
          <pre>{`<CardVisual
  cardNumber="•••• •••• •••• 3940"
  cardBg="#B8860B"
  cardAccent="#D4AF37"
  type="credit" | "debit"
  size="sm" | "md"
/>`}</pre>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          MODAL
      ═══════════════════════════════════════ */}
      <section id="modal" className="components-section__group">
        <div className="components-section__title-row">
          <h2>{t('sections.components.modal.title')}</h2>
          <span className="components-section__badge components-section__badge--new">
            {t('sections.components.pattern')}
          </span>
        </div>
        <p className="components-section__description">
          {t('sections.components.modal.description')}
        </p>
        <div className="components-section__preview">
          <div className="components-section__row">
            <Button variant="primary" onClick={() => setDefaultModalOpen(true)}>
              Default
            </Button>
            <Button variant="danger" onClick={() => setDangerModalOpen(true)}>
              Danger
            </Button>
            <Button variant="secondary" onClick={() => setSuccessModalOpen(true)}>
              Success
            </Button>
          </div>
        </div>

        <Modal
          isOpen={defaultModalOpen}
          onClose={() => setDefaultModalOpen(false)}
          title={t('sections.components.modal.demoTitle')}
          description={t('sections.components.modal.demoDescription')}
          primaryAction={{
            label: t('common.confirm'),
            onClick: () => setDefaultModalOpen(false),
          }}
          secondaryAction={{
            label: t('common.cancel'),
            onClick: () => setDefaultModalOpen(false),
          }}
        />
        <Modal
          isOpen={dangerModalOpen}
          onClose={() => setDangerModalOpen(false)}
          title={t('sections.components.modal.dangerTitle')}
          description={t('sections.components.modal.dangerDescription')}
          variant="danger"
          primaryAction={{
            label: t('sections.components.modal.blockCard'),
            onClick: () => setDangerModalOpen(false),
          }}
          secondaryAction={{
            label: t('common.cancel'),
            onClick: () => setDangerModalOpen(false),
          }}
        />
        <Modal
          isOpen={successModalOpen}
          onClose={() => setSuccessModalOpen(false)}
          title={t('sections.components.modal.successTitle')}
          description={t('sections.components.modal.successDescription')}
          variant="success"
          primaryAction={{
            label: t('common.confirm'),
            onClick: () => setSuccessModalOpen(false),
          }}
        />

        <div className="components-section__code">
          <pre>{`<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Confirmar transferencia"
  description="¿Deseas enviar $5,000?"
  variant="default" | "danger" | "success"
  primaryAction={{ label: "Confirmar", onClick: fn }}
  secondaryAction={{ label: "Cancelar", onClick: fn }}
/>`}</pre>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          TOAST
      ═══════════════════════════════════════ */}
      <section id="toast" className="components-section__group">
        <div className="components-section__title-row">
          <h2>{t('sections.components.toast.title')}</h2>
          <span className="components-section__badge components-section__badge--new">
            {t('sections.components.pattern')}
          </span>
        </div>
        <p className="components-section__description">
          {t('sections.components.toast.description')}
        </p>
        <div className="components-section__preview">
          <div className="components-section__row">
            <Button variant="primary" size="sm"
              onClick={() => addToast('success', t('sections.components.toast.successMsg'))}>
              Success
            </Button>
            <Button variant="danger" size="sm"
              onClick={() => addToast('error', t('sections.components.toast.errorMsg'))}>
              Error
            </Button>
            <Button variant="secondary" size="sm"
              onClick={() => addToast('warning', t('sections.components.toast.warningMsg'))}>
              Warning
            </Button>
            <Button variant="ghost" size="sm"
              onClick={() => addToast('info', t('sections.components.toast.infoMsg'))}>
              Info
            </Button>
          </div>
        </div>

        <div style={{ position: 'fixed', top: 80, right: 24, zIndex: 9999, display: 'flex', flexDirection: 'column', gap: 8 }}>
          <AnimatePresence>
            {toasts.map((toast) => (
              <Toast
                key={toast.id}
                id={toast.id}
                message={toast.message}
                variant={toast.variant}
                onClose={() => removeToast(toast.id)}
              />
            ))}
          </AnimatePresence>
        </div>

        <div className="components-section__code">
          <pre>{`<Toast
  id="1"
  message="Transferencia exitosa"
  variant="success" | "error" | "warning" | "info"
  duration={4000}
  onClose={() => removeToast(id)}
/>`}</pre>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SKELETON
      ═══════════════════════════════════════ */}
      <section id="skeleton" className="components-section__group">
        <div className="components-section__title-row">
          <h2>{t('sections.components.skeleton.title')}</h2>
          <span className="components-section__badge components-section__badge--new">
            {t('sections.components.pattern')}
          </span>
        </div>
        <p className="components-section__description">
          {t('sections.components.skeleton.description')}
        </p>
        <div className="components-section__preview">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            <div>
              <p style={{ fontSize: 12, color: 'var(--text-tertiary)', marginBottom: 8, fontWeight: 600 }}>Text Lines</p>
              <Skeleton variant="text" lines={3} />
            </div>
            <div>
              <p style={{ fontSize: 12, color: 'var(--text-tertiary)', marginBottom: 8, fontWeight: 600 }}>Circle + Text</p>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <Skeleton variant="circle" width={48} />
                <div style={{ flex: 1 }}>
                  <Skeleton variant="text" width="60%" />
                  <div style={{ height: 8 }} />
                  <Skeleton variant="text" width="40%" />
                </div>
              </div>
            </div>
            <div>
              <p style={{ fontSize: 12, color: 'var(--text-tertiary)', marginBottom: 8, fontWeight: 600 }}>Card</p>
              <Skeleton variant="card" />
            </div>
            <div>
              <p style={{ fontSize: 12, color: 'var(--text-tertiary)', marginBottom: 8, fontWeight: 600 }}>List Items</p>
              <SkeletonListItem />
              <div style={{ height: 8 }} />
              <SkeletonListItem />
              <div style={{ height: 8 }} />
              <SkeletonListItem />
            </div>
          </div>
        </div>
        <div className="components-section__code">
          <pre>{`<Skeleton variant="text" lines={3} />
<Skeleton variant="circle" width={48} />
<Skeleton variant="card" />
<SkeletonListItem />`}</pre>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          EMPTY STATE
      ═══════════════════════════════════════ */}
      <section id="emptystate" className="components-section__group">
        <div className="components-section__title-row">
          <h2>{t('sections.components.emptystate.title')}</h2>
          <span className="components-section__badge">
            {t('sections.components.pattern')}
          </span>
        </div>
        <p className="components-section__description">
          {t('sections.components.emptystate.description')}
        </p>
        <div className="components-section__preview">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            <EmptyState
              title={t('sections.components.emptystate.noMovements')}
              description={t('sections.components.emptystate.noMovementsDesc')}
              variant="default"
            />
            <EmptyState
              title={t('sections.components.emptystate.noResults')}
              description={t('sections.components.emptystate.noResultsDesc')}
              variant="search"
              action={{ label: t('sections.components.emptystate.clearFilters'), onClick: () => { } }}
            />
          </div>
        </div>
        <div className="components-section__code">
          <pre>{`<EmptyState
  title="Sin movimientos"
  description="No hay movimientos en este periodo"
  variant="default" | "search" | "error" | "offline"
  action={{ label: "Limpiar filtros", onClick: fn }}
/>`}</pre>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          OTP INPUT
      ═══════════════════════════════════════ */}
      <section id="otpinput" className="components-section__group">
        <div className="components-section__title-row">
          <h2>{t('sections.components.otpinput.title')}</h2>
          <span className="components-section__badge components-section__badge--banking">
            {t('sections.components.banking')}
          </span>
        </div>
        <p className="components-section__description">
          {t('sections.components.otpinput.description')}
        </p>
        <div className="components-section__preview">
          <div style={{ maxWidth: 400, margin: '0 auto' }}>
            <OTPInput
              length={6}
              label={t('sections.components.otpinput.label')}
              onComplete={(code) => setOtpResult(code)}
            />
            {otpResult && (
              <p style={{ textAlign: 'center', marginTop: 12, fontSize: 13, color: 'var(--success-500)' }}>
                ✓ Código: {otpResult}
              </p>
            )}
          </div>
        </div>
        <div className="components-section__code">
          <pre>{`<OTPInput
  length={6}
  label="Código de verificación"
  onComplete={(code) => console.log(code)}
  error="Código inválido"
/>`}</pre>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          PIN PAD
      ═══════════════════════════════════════ */}
      <section id="pinpad" className="components-section__group">
        <div className="components-section__title-row">
          <h2>{t('sections.components.pinpad.title')}</h2>
          <span className="components-section__badge components-section__badge--banking">
            {t('sections.components.banking')}
          </span>
        </div>
        <p className="components-section__description">
          {t('sections.components.pinpad.description')}
        </p>
        <div className="components-section__preview">
          <div style={{ maxWidth: 320, margin: '0 auto' }}>
            <PINPad
              length={4}
              label={t('sections.components.pinpad.label')}
              onComplete={(pin) => setPinResult(pin)}
            />
            {pinResult && (
              <p style={{ textAlign: 'center', marginTop: 12, fontSize: 13, color: 'var(--success-500)' }}>
                ✓ PIN ingresado correctamente
              </p>
            )}
          </div>
        </div>
        <div className="components-section__code">
          <pre>{`<PINPad
  length={4}
  label="Ingresa tu NIP"
  onComplete={(pin) => console.log(pin)}
  error="NIP incorrecto"
/>`}</pre>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          CURRENCY INPUT
      ═══════════════════════════════════════ */}
      <section id="currencyinput" className="components-section__group">
        <div className="components-section__title-row">
          <h2>{t('sections.components.currencyinput.title')}</h2>
          <span className="components-section__badge components-section__badge--banking">
            {t('sections.components.banking')}
          </span>
        </div>
        <p className="components-section__description">
          {t('sections.components.currencyinput.description')}
        </p>
        <div className="components-section__preview">
          <div style={{ maxWidth: 360, margin: '0 auto' }}>
            <CurrencyInput
              value={currencyValue}
              onChange={setCurrencyValue}
              currency="MXN"
              label={t('sections.components.currencyinput.label')}
              maxValue={50000}
            />
          </div>
        </div>
        <div className="components-section__code">
          <pre>{`<CurrencyInput
  value={amount}
  onChange={setAmount}
  currency="MXN"
  label="Monto a transferir"
  maxValue={50000}
/>`}</pre>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SPENDING CHART
      ═══════════════════════════════════════ */}
      <section id="chart" className="components-section__group">
        <div className="components-section__title-row">
          <h2>{t('sections.components.chart.title')}</h2>
          <span className="components-section__badge components-section__badge--banking">
            {t('sections.components.banking')}
          </span>
        </div>
        <p className="components-section__description">
          {t('sections.components.chart.description')}
        </p>
        <div className="components-section__preview">
          <div style={{ display: 'grid', gap: 32 }}>
            <div>
              <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-tertiary)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Bar Chart
              </p>
              <SpendingChart data={mockChartData} variant="bar" />
            </div>
            <div>
              <p style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-tertiary)', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                Line Chart
              </p>
              <SpendingChart data={mockChartData} variant="line" />
            </div>
          </div>
        </div>
        <div className="components-section__code">
          <pre>{`<SpendingChart data={chartData} variant="bar" />
<SpendingChart data={chartData} variant="line" />
<SpendingChart data={chartData} variant="sparkline" />`}</pre>
        </div>
      </section>
    </div>
  );
};