import React, { useState } from 'react';
import { ProductCard } from '../../components/ProductCard';
import { CardVisual } from '../../components/CardVisual';
import { ListItem } from '../../components/ListItem';
import { AppHeader } from '../../components/AppHeader';
import { IconWrapper } from '../../components/IconWrapper';
import { Button } from '../../components/Button';

import { Skeleton, SkeletonProductCard } from '../../components/Skeleton';
import { EmptyState } from '../../components/EmptyState';
import { SpendingChart, mockChartData } from '../../components/Chart/SpendingChart';
import { Modal } from '../../components/Modal/Modal';
import { OTPInput } from '../../components/OTPInput/OTPInput';
import { PINPad } from '../../components/PINPad/PINPad';
import { CurrencyInput } from '../../components/CurrencyInput/CurrencyInput';
import { useToast } from '../../hooks/useToast';
import { products, transactions, formatAmount } from '../../data/mockData';
import './ComponentsSection.css';

export const ComponentsSection: React.FC = () => {
  // Modal states
  const [isDefaultModalOpen, setIsDefaultModalOpen] = useState(false);
  const [isDangerModalOpen, setIsDangerModalOpen] = useState(false);
  const [isSuccessModalOpen, setIsSuccessModalOpen] = useState(false);

  // Toast
  const { showToast } = useToast();

  // OTP
  const [otpValue, setOtpValue] = useState('');
  
  // PIN
  const [pinCompleted, setPinCompleted] = useState(false);

  // Currency
  const [currencyAmount, setCurrencyAmount] = useState(0);

  // Chart variant
  const [chartVariant, setChartVariant] = useState<'bar' | 'line'>('bar');

  return (
    <div className="components-section">
      <div className="components-section__header">
        <h1>Componentes</h1>
        <p>Biblioteca de componentes compuestos del Design System</p>
      </div>

      {/* List Items */}
      <section id="listitems" className="components-section__group">
        <div className="components-section__title-row">
          <h2>List Items</h2>
          <span className="components-section__badge">Component</span>
        </div>
        <div className="components-section__preview">
          <div className="components-section__list-items">
            {transactions.slice(0, 6).map((transaction) => (
              <ListItem
                key={transaction.id}
                icon={<IconWrapper iconName={transaction.icon} category={transaction.category} />}
                title={transaction.description}
                subtitle={transaction.category}
                amount={formatAmount(transaction.amount)}
                amountNegative={transaction.amount < 0}
                badgeText={transaction.status === 'pending' ? 'Pendiente' : undefined}
                badgeVariant={transaction.status === 'pending' ? 'warning' : undefined}
                showDivider={true}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Product Cards */}
      <section id="productcards" className="components-section__group">
        <div className="components-section__title-row">
          <h2>Product Cards</h2>
          <span className="components-section__badge">Component</span>
        </div>
        
        <div className="components-section__preview">
          <div className="components-section__product-cards-grid">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        </div>

        <div className="components-section__relationship-diagram">
          <p>Relationship Diagram: Products → Accounts</p>
          <pre>
{`Product
  ├─ Savings (Bolsas de ahorro)
  ├─ Investments (Inversiones)
  ├─ Credit Cards (Tarjetas de crédito)
  └─ Debit Accounts (Cuentas de débito)
      ├─ Cuenta Priority
      └─ MiCuenta`}
          </pre>
        </div>

        <div className="components-section__code">
          <pre>
{`<ProductCard
  categoryColor="savings"
  categoryLabel="Bolsas de ahorro"
  badgeText="Nuevo"
  badgeVariant="nuevo"
  balance="$110,000.00"
/>`}
          </pre>
        </div>
      </section>

      {/* Card Visual (Sub-component) */}
      <section id="cardvisual" className="components-section__group">
        <div className="components-section__title-row">
          <h2>Card Visual</h2>
          <span className="components-section__badge">Sub-component</span>
        </div>
        <div className="components-section__preview">
          <div className="components-section__cardvisual-grid">
            <div className="card-visual-item">
              <CardVisual cardNumber="**394" cardBg="#B8860B" cardAccent="#FFD700" type="credit" size="md" />
              <div className="card-visual-label">
                <strong>Oro **394</strong>
                <span>Tarjeta de crédito</span>
              </div>
            </div>
            <div className="card-visual-item">
              <CardVisual cardNumber="**789" cardBg="#2C3E50" cardAccent="#E74C3C" type="credit" size="md" />
              <div className="card-visual-label">
                <strong>Descubre **789</strong>
                <span>Tarjeta de crédito</span>
              </div>
            </div>
            <div className="card-visual-item">
              <CardVisual cardNumber="**964" cardBg="#1A3A5C" cardAccent="#C0C0C0" type="debit" size="md" />
              <div className="card-visual-label">
                <strong>Priority **964</strong>
                <span>Cuenta de débito</span>
              </div>
            </div>
            <div className="card-visual-item">
              <CardVisual cardNumber="**000" cardBg="#E3173E" cardAccent="#FF6B8A" type="debit" size="md" />
              <div className="card-visual-label">
                <strong>MiCuenta **000</strong>
                <span>Cuenta de débito</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* App Header */}
      <section id="appheader" className="components-section__group">
        <div className="components-section__title-row">
          <h2>App Header</h2>
          <span className="components-section__badge">Component</span>
        </div>
        <div className="components-section__preview">
          <div className="components-section__mobile-container">
            <div className="components-section__mobile-header">
              <span>iPhone 14 - 390px</span>
            </div>
            <div className="components-section__mobile-content">
              {/* Priority Variant */}
              <div className="components-section__app-header-variant">
                <h4>Priority</h4>
                <AppHeader 
                  initials="JA" 
                  name="Javier Álvarez" 
                  tier="Priority" 
                  showModeList={true}
                />
              </div>
              
              {/* Standard Variant */}
              <div className="components-section__app-header-variant">
                <h4>Standard</h4>
                <AppHeader 
                  initials="JD" 
                  name="Juan Doe" 
                  tier="Standard" 
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Patterns */}
      <section id="patterns" className="components-section__group">
        <div className="components-section__title-row">
          <h2>Patrones</h2>
          <span className="components-section__badge">Pattern</span>
        </div>
        <div className="components-section__preview">
          <div className="components-section__patterns-grid">
            {/* Account Summary Pattern */}
            <div className="components-section__pattern-card">
              <h4>Account Summary</h4>
              <div className="components-section__pattern-preview">
                <div className="pattern-account-summary">
                  <div className="pattern-account-summary__balance">$125,000.00</div>
                  <div className="pattern-account-summary__label">Saldo total</div>
                  <div className="pattern-account-summary__accounts">
                    <span>2 Cuentas</span>
                    <span>•</span>
                    <span>4 Inversiones</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Transaction Row Pattern */}
            <div className="components-section__pattern-card">
              <h4>Transaction Row</h4>
              <div className="components-section__pattern-preview">
                <ListItem
                  icon={<IconWrapper iconName="ShoppingCart" category="Compras" />}
                  title="Amazon México"
                  subtitle="Compras"
                  amount="-$1,249.00"
                  amountNegative={true}
                />
              </div>
            </div>

            {/* Quick Actions Grid Pattern */}
            <div className="components-section__pattern-card">
              <h4>Quick Actions Grid</h4>
              <div className="components-section__pattern-preview">
                <div className="pattern-quick-actions">
                  <div className="pattern-quick-actions__item">Transfer</div>
                  <div className="pattern-quick-actions__item">Pay</div>
                  <div className="pattern-quick-actions__item">Deposits</div>
                  <div className="pattern-quick-actions__item">More</div>
                </div>
              </div>
            </div>

            {/* Empty State Pattern */}
            <div className="components-section__pattern-card">
              <h4>Empty State</h4>
              <div className="components-section__pattern-preview">
                <div className="pattern-empty-state">
                  <div className="pattern-empty-state__icon">📦</div>
                  <div className="pattern-empty-state__title">No hay transacciones</div>
                  <div className="pattern-empty-state__description">Cuando realices movimientos, aparecerán aquí.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Modal Section */}
      <section id="modal" className="components-section__group">
        <div className="components-section__title-row">
          <h2>Modal / Dialog</h2>
          <span className="components-section__badge">Component</span>
        </div>
        <p className="components-section__description">
          Diálogo modal para confirmaciones críticas. 
          Incluye focus trap, cierre con Escape y animaciones.
        </p>

        <div className="components-section__preview">
          
          {/* 3 botones que abren 3 variantes del modal */}
          <div className="components-section__row" style={{gap: 12, flexWrap: 'wrap'}}>
            <Button variant="primary" onClick={() => setIsDefaultModalOpen(true)}>
              Modal Default
            </Button>
            <Button variant="danger" onClick={() => setIsDangerModalOpen(true)}>
              Modal Danger
            </Button>
            <Button variant="secondary" onClick={() => setIsSuccessModalOpen(true)}>
              Modal Success
            </Button>
          </div>

          {/* Label explicativo */}
          <p style={{fontSize: 13, color: '#767676', marginTop: 8}}>
            Haz clic en cualquier botón para abrir el modal. 
            Presiona Escape o clic fuera para cerrar.
          </p>
        </div>

        {/* Los 3 modales renderizados */}
        <Modal
          isOpen={isDefaultModalOpen}
          onClose={() => setIsDefaultModalOpen(false)}
          title="Confirmar transferencia"
          description="¿Estás seguro de transferir $5,000.00 MXN a María Álvarez?"
          variant="default"
          primaryAction={{ 
            label: "Confirmar transferencia", 
            onClick: () => {
              setIsDefaultModalOpen(false)
              showToast({ message: 'Transferencia confirmada', variant: 'success' })
            }
          }}
          secondaryAction={{ 
            label: "Cancelar", 
            onClick: () => setIsDefaultModalOpen(false) 
          }}
        />

        <Modal
          isOpen={isDangerModalOpen}
          onClose={() => setIsDangerModalOpen(false)}
          title="Bloquear tarjeta"
          description="Esta acción bloqueará tu tarjeta Oro **394 de forma inmediata. Podrás desbloquearla desde la app."
          variant="danger"
          primaryAction={{ 
            label: "Sí, bloquear tarjeta", 
            onClick: () => {
              setIsDangerModalOpen(false)
              showToast({ message: 'Tarjeta bloqueada correctamente', variant: 'warning' })
            }
          }}
          secondaryAction={{ 
            label: "Cancelar", 
            onClick: () => setIsDangerModalOpen(false) 
          }}
        />

        <Modal
          isOpen={isSuccessModalOpen}
          onClose={() => setIsSuccessModalOpen(false)}
          title="¡Transferencia exitosa!"
          description="Se enviaron $5,000.00 MXN a María Álvarez. El dinero estará disponible en minutos."
          variant="success"
          primaryAction={{ 
            label: "Ver comprobante", 
            onClick: () => setIsSuccessModalOpen(false) 
          }}
          secondaryAction={{ 
            label: "Volver al inicio", 
            onClick: () => setIsSuccessModalOpen(false) 
          }}
        />

        {/* Code block */}
        <div className="components-section__code">
          <pre>{`<Modal
  isOpen={isOpen}
  onClose={() => setIsOpen(false)}
  title="Confirmar transferencia"
  description="¿Estás seguro de transferir $5,000 MXN?"
  variant="danger"
  primaryAction={{ label: "Confirmar", onClick: handleConfirm }}
  secondaryAction={{ label: "Cancelar", onClick: handleCancel }}
/>`}</pre>
        </div>

        {/* Props table */}
        <table className="components-section__props-table">
          <thead>
            <tr><th>Prop</th><th>Tipo</th><th>Default</th><th>Descripción</th></tr>
          </thead>
          <tbody>
            <tr><td>isOpen</td><td>boolean</td><td>false</td><td>Controla visibilidad</td></tr>
            <tr><td>onClose</td><td>() =&gt; void</td><td>—</td><td>Handler de cierre</td></tr>
            <tr><td>title</td><td>string</td><td>—</td><td>Título del modal</td></tr>
            <tr><td>variant</td><td>'default' | 'danger' | 'success'</td><td>'default'</td><td>Variante visual</td></tr>
            <tr><td>primaryAction</td><td>Action</td><td>—</td><td>Botón principal</td></tr>
            <tr><td>secondaryAction</td><td>Action</td><td>—</td><td>Botón secundario</td></tr>
          </tbody>
        </table>
      </section>

      {/* Toast Section */}
      <section id="toast" className="components-section__group">
        <div className="components-section__title-row">
          <h2>Toast</h2>
          <span className="components-section__badge">Component</span>
        </div>
        <p className="components-section__description">
          Notificaciones temporales de feedback. 
          Auto-dismiss, pausa en hover, 4 variantes.
        </p>

        <div className="components-section__preview">
          <div className="components-section__row" style={{gap: 8, flexWrap: 'wrap'}}>
            <Button 
              variant="primary" 
              onClick={() => showToast({ 
                message: 'Transferencia realizada exitosamente', 
                variant: 'success' 
              })}
            >
              Success Toast
            </Button>
            <Button 
              variant="danger" 
              onClick={() => showToast({ 
                message: 'Error al procesar el pago', 
                variant: 'error' 
              })}
            >
              Error Toast
            </Button>
            <Button 
              variant="secondary" 
              onClick={() => showToast({ 
                message: 'Tu sesión expirará en 5 minutos', 
                variant: 'warning' 
              })}
            >
              Warning Toast
            </Button>
            <Button 
              variant="ghost" 
              onClick={() => showToast({ 
                message: 'Nuevo estado de cuenta disponible', 
                variant: 'info' 
              })}
            >
              Info Toast
            </Button>
          </div>
          <p style={{fontSize: 13, color: '#767676', marginTop: 8}}>
            Los toasts aparecen en la esquina inferior derecha. 
            Pasa el mouse encima para pausar el auto-dismiss.
          </p>
        </div>

        <div className="components-section__code">
          <pre>{`const { showToast } = useToast()

showToast({ 
  message: 'Transferencia exitosa', 
  variant: 'success',
  duration: 4000 
})`}</pre>
        </div>
      </section>

      {/* Skeleton Section */}
      <section id="skeleton" className="components-section__group">
        <div className="components-section__title-row">
          <h2>Skeleton Loader</h2>
          <span className="components-section__badge">Component</span>
        </div>
        <div className="components-section__preview">
          <div className="components-section__row">
            <Skeleton variant="text" width={200} />
            <Skeleton variant="circle" width={40} height={40} />
            <Skeleton variant="rect" width={100} height={60} />
          </div>
          <div style={{ marginTop: 16 }}>
            <SkeletonProductCard />
          </div>
        </div>
        <div className="components-section__code">
          <pre>
{`<Skeleton variant="text" width="100%" lines={3} />
<Skeleton variant="circle" width={40} height={40} />
<SkeletonProductCard />`}
          </pre>
        </div>
      </section>

      {/* Empty State Section */}
      <section id="emptystate" className="components-section__group">
        <div className="components-section__title-row">
          <h2>Empty State</h2>
          <span className="components-section__badge">Component</span>
        </div>
        <div className="components-section__preview">
          <EmptyState 
            title="No hay movimientos"
            description="Cuando realices transacciones, aparecerán aquí."
            action={{ label: "Ver todos", onClick: () => {} }}
          />
        </div>
        <div className="components-section__code">
          <pre>
{`<EmptyState
  title="No hay movimientos"
  description="Cuando realices transacciones, aparecerán aquí."
  variant="default"
  action={{ label: "Ver todos", onClick: () => {} }}
/>`}
          </pre>
        </div>
      </section>

      {/* OTP Input Section */}
      <section id="otpinput" className="components-section__group">
        <div className="components-section__title-row">
          <h2>OTP Input</h2>
          <span className="components-section__badge">Banking</span>
        </div>
        <p className="components-section__description">
          Input de código de verificación. Auto-avance entre campos,
          soporte de pegado, validación numérica.
        </p>

        <div className="components-section__preview">
          <div style={{display: 'flex', flexDirection: 'column', gap: 24, alignItems: 'flex-start'}}>
            
            {/* Default */}
            <div>
              <p style={{fontSize: 13, color: '#767676', marginBottom: 12}}>
                Ingresa el código que enviamos a tu número **34
              </p>
              <OTPInput
                length={6}
                label="Código de verificación"
                onComplete={(code) => {
                  setOtpValue(code)
                  showToast({ 
                    message: `Código ingresado: ${code}`, 
                    variant: 'success' 
                  })
                }}
              />
              {otpValue && (
                <p style={{fontSize: 13, color: '#00823B', marginTop: 8}}>
                  Código recibido: {otpValue}
                </p>
              )}
            </div>

            {/* Con error */}
            <div>
              <p style={{fontSize: 12, color: '#767676', marginBottom: 8}}>
                Estado con error:
              </p>
              <OTPInput
                length={6}
                error="Código incorrecto. Intenta de nuevo."
                onComplete={() => {}}
              />
            </div>
          </div>
        </div>

        <div className="components-section__code">
          <pre>{`<OTPInput
  length={6}
  label="Código de verificación"
  onComplete={(code) => verifyOTP(code)}
  error={otpError}
/>`}</pre>
        </div>

        <table className="components-section__props-table">
          <thead>
            <tr><th>Prop</th><th>Tipo</th><th>Default</th><th>Descripción</th></tr>
          </thead>
          <tbody>
            <tr><td>length</td><td>number</td><td>6</td><td>Número de dígitos</td></tr>
            <tr><td>onComplete</td><td>(code: string) =&gt; void</td><td>—</td><td>Callback al completar</td></tr>
            <tr><td>error</td><td>string</td><td>—</td><td>Mensaje de error</td></tr>
            <tr><td>label</td><td>string</td><td>—</td><td>Label descriptivo</td></tr>
          </tbody>
        </table>
      </section>

      {/* PIN Pad Section */}
      <section id="pinpad" className="components-section__group">
        <div className="components-section__title-row">
          <h2>PIN Pad</h2>
          <span className="components-section__badge">Banking</span>
        </div>
        <p className="components-section__description">
          Teclado numérico para ingreso de NIP. 
          Animación de progreso, feedback táctil con Framer Motion.
        </p>

        <div className="components-section__preview">
          <div style={{display: 'flex', gap: 48, flexWrap: 'wrap', alignItems: 'flex-start'}}>
            
            {/* PIN de 4 dígitos */}
            <div>
              <PINPad
                length={4}
                label="Ingresa tu NIP"
                error={pinCompleted ? '' : undefined}
                onComplete={() => {
                  setPinCompleted(true)
                  showToast({ 
                    message: 'NIP ingresado correctamente', 
                    variant: 'success' 
                  })
                }}
              />
              {pinCompleted && (
                <p style={{
                  fontSize: 13, color: '#00823B', 
                  textAlign: 'center', marginTop: 8
                }}>
                  NIP validado
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="components-section__code">
          <pre>{`<PINPad
  length={4}
  label="Ingresa tu NIP"
  onComplete={(pin) => validatePIN(pin)}
/>`}</pre>
        </div>

        <table className="components-section__props-table">
          <thead>
            <tr><th>Prop</th><th>Tipo</th><th>Default</th><th>Descripción</th></tr>
          </thead>
          <tbody>
            <tr><td>length</td><td>number</td><td>4</td><td>Dígitos del PIN</td></tr>
            <tr><td>onComplete</td><td>(pin: string) =&gt; void</td><td>—</td><td>Callback al completar</td></tr>
            <tr><td>label</td><td>string</td><td>—</td><td>Instrucción al usuario</td></tr>
            <tr><td>error</td><td>string</td><td>—</td><td>Mensaje de error</td></tr>
          </tbody>
        </table>
      </section>

      {/* Currency Input Section */}
      <section id="currencyinput" className="components-section__group">
        <div className="components-section__title-row">
          <h2>Currency Input</h2>
          <span className="components-section__badge">Banking</span>
        </div>
        <p className="components-section__description">
          Input especializado para montos monetarios. 
          Formato automático, toggle MXN/USD, validación de saldo.
        </p>

        <div className="components-section__preview">
          <CurrencyInput
            value={currencyAmount}
            onChange={setCurrencyAmount}
            currency="MXN"
            label="¿Cuánto quieres transferir?"
            maxValue={24500}
          />
          {currencyAmount > 0 && (
            <p style={{
              fontSize: 13, 
              color: currencyAmount > 24500 ? '#E3173E' : '#00823B',
              marginTop: 12,
              textAlign: 'center'
            }}>
              {currencyAmount > 24500 
                ? 'Saldo insuficiente' 
                : `Monto válido: ${new Intl.NumberFormat('es-MX', {
                    style: 'currency', currency: 'MXN'
                  }).format(currencyAmount)}`
              }
            </p>
          )}
        </div>

        <div className="components-section__code">
          <pre>{`<CurrencyInput
  value={amount}
  onChange={setAmount}
  currency="MXN"
  label="¿Cuánto quieres transferir?"
  maxValue={availableBalance}
/>`}</pre>
        </div>

        <table className="components-section__props-table">
          <thead>
            <tr><th>Prop</th><th>Tipo</th><th>Default</th><th>Descripción</th></tr>
          </thead>
          <tbody>
            <tr><td>value</td><td>number</td><td>0</td><td>Monto actual</td></tr>
            <tr><td>onChange</td><td>(val: number) =&gt; void</td><td>—</td><td>Handler de cambio</td></tr>
            <tr><td>currency</td><td>'MXN' | 'USD'</td><td>'MXN'</td><td>Moneda</td></tr>
            <tr><td>maxValue</td><td>number</td><td>—</td><td>Saldo máximo disponible</td></tr>
            <tr><td>error</td><td>string</td><td>—</td><td>Mensaje de error</td></tr>
          </tbody>
        </table>
      </section>

      {/* Chart Section */}
      <section id="chart" className="components-section__group">
        <div className="components-section__title-row">
          <h2>Spending Chart</h2>
          <span className="components-section__badge">Banking</span>
        </div>
        <p className="components-section__description">
          Visualización de ingresos y egresos con Recharts. 
          3 variantes: barras, líneas y sparkline.
        </p>

        <div className="components-section__preview">
          {/* Toggle de variante */}
          <div style={{display: 'flex', gap: 8, marginBottom: 16}}>
            <Button 
              variant={chartVariant === 'bar' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setChartVariant('bar')}
            >
              Barras
            </Button>
            <Button 
              variant={chartVariant === 'line' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setChartVariant('line')}
            >
              Líneas
            </Button>
          </div>

          {/* Chart principal */}
          <div style={{
            background: 'white', 
            borderRadius: 12, 
            padding: 16,
            border: '1px solid #F0F0F0'
          }}>
            <div style={{
              display: 'flex', 
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 16
            }}>
              <div>
                <p style={{fontSize: 14, fontWeight: 600, color: '#1A1A1A', margin: 0}}>
                  Resumen financiero
                </p>
                <p style={{fontSize: 12, color: '#9E9E9E', margin: 0}}>
                  Oct 2025 — Mar 2026
                </p>
              </div>
              <div style={{display: 'flex', gap: 16}}>
                <span style={{fontSize: 12, color: '#00823B', display: 'flex', alignItems: 'center', gap: 4}}>
                  <span style={{width: 8, height: 8, borderRadius: '50%', background: '#00823B', display: 'inline-block'}}/>
                  Ingresos
                </span>
                <span style={{fontSize: 12, color: '#E3173E', display: 'flex', alignItems: 'center', gap: 4}}>
                  <span style={{width: 8, height: 8, borderRadius: '50%', background: '#E3173E', display: 'inline-block'}}/>
                  Egresos
                </span>
              </div>
            </div>
            <SpendingChart data={mockChartData} variant={chartVariant} />
          </div>

          {/* Sparkline demo */}
          <div style={{marginTop: 16}}>
            <p style={{fontSize: 12, color: '#767676', marginBottom: 8}}>
              Variante sparkline (para uso inline en tarjetas):
            </p>
            <div style={{
              display: 'flex', 
              alignItems: 'center', 
              gap: 16,
              background: '#F8F9FA',
              padding: '12px 16px',
              borderRadius: 8
            }}>
              <span style={{fontSize: 14, color: '#1A1A1A'}}>Egresos del mes</span>
              <SpendingChart data={mockChartData} variant="sparkline" />
              <span style={{fontSize: 14, fontWeight: 600, color: '#E3173E'}}>$12,340</span>
            </div>
          </div>
        </div>

        <div className="components-section__code">
          <pre>{`// Bar chart
<SpendingChart data={chartData} variant="bar" />

// Line chart  
<SpendingChart data={chartData} variant="line" />

// Sparkline inline
<SpendingChart data={chartData} variant="sparkline" />`}</pre>
        </div>
      </section>

       {/* Accessibility Section */}
       <section id="accessibility" className="components-section__group">
        <div className="components-section__title-row">
          <h2>Accesibilidad</h2>
          <span className="components-section__badge">System</span>
        </div>
        <p className="components-section__description">
          WCAG AA implementado en todos los componentes del sistema.
        </p>

        <div className="components-section__preview">
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16}}>
            
            {/* Focus visible */}
            <div style={{background: '#F8F9FA', borderRadius: 12, padding: 16}}>
              <p style={{fontSize: 13, fontWeight: 600, color: '#003B5C', marginBottom: 8}}>
                Focus Visible
              </p>
              <p style={{fontSize: 12, color: '#767676', marginBottom: 12}}>
                Navega con Tab para ver el outline de foco
              </p>
              <div style={{display: 'flex', gap: 8}}>
                <Button variant="primary" size="sm">Botón 1</Button>
                <Button variant="secondary" size="sm">Botón 2</Button>
                <Button variant="ghost" size="sm">Botón 3</Button>
              </div>
            </div>

            {/* ARIA Labels */}
            <div style={{background: '#F8F9FA', borderRadius: 12, padding: 16}}>
              <p style={{fontSize: 13, fontWeight: 600, color: '#003B5C', marginBottom: 8}}>
                ARIA Labels
              </p>
              <p style={{fontSize: 12, color: '#767676', marginBottom: 12}}>
                Screen readers anuncian cada elemento
              </p>
              <div style={{
                background: '#1E1E1E', 
                borderRadius: 6, 
                padding: '8px 12px',
                fontSize: 11,
                color: '#9CDCFE',
                fontFamily: 'monospace'
              }}>
                aria-label="Cerrar modal"<br/>
                aria-live="polite"<br/>
                aria-invalid="true"<br/>
                role="dialog"
              </div>
            </div>

            {/* Color contrast */}
            <div style={{background: '#F8F9FA', borderRadius: 12, padding: 16}}>
              <p style={{fontSize: 13, fontWeight: 600, color: '#003B5C', marginBottom: 8}}>
                Contraste de Color (WCAG AA)
              </p>
              <div style={{display: 'flex', flexDirection: 'column', gap: 6}}>
                {[
                  { bg: '#003B5C', text: '#FFFFFF', ratio: '12.8:1', pass: true, label: 'Primary sobre blanco' },
                  { bg: '#FFFFFF', text: '#1A1A1A', ratio: '18.1:1', pass: true, label: 'Texto principal' },
                  { bg: '#FFFFFF', text: '#767676', ratio: '4.6:1', pass: true, label: 'Texto secundario' },
                  { bg: '#E3173E', text: '#FFFFFF', ratio: '5.2:1', pass: true, label: 'Error / Accent' },
                ].map(item => (
                  <div key={item.label} style={{
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 8,
                    padding: '4px 8px',
                    background: item.bg,
                    borderRadius: 4
                  }}>
                    <span style={{
                      fontSize: 11, 
                      color: item.text, 
                      flex: 1,
                      fontWeight: 500
                    }}>
                      {item.label}
                    </span>
                    <span style={{
                      fontSize: 10,
                      padding: '2px 6px',
                      borderRadius: 10,
                      background: item.pass ? '#00823B' : '#E3173E',
                      color: 'white',
                      fontWeight: 600
                    }}>
                      {item.ratio}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Reduced motion */}
            <div style={{background: '#F8F9FA', borderRadius: 12, padding: 16}}>
              <p style={{fontSize: 13, fontWeight: 600, color: '#003B5C', marginBottom: 8}}>
                Reduced Motion
              </p>
              <p style={{fontSize: 12, color: '#767676', marginBottom: 8}}>
                Respeta la preferencia del sistema operativo
              </p>
              <div style={{
                background: '#1E1E1E',
                borderRadius: 6,
                padding: '8px 12px',
                fontSize: 11,
                color: '#CE9178',
                fontFamily: 'monospace'
              }}>
                @media (prefers-reduced-motion: reduce) {'{'}<br/>
                &nbsp;&nbsp;* {'{'} animation: none {'}'}<br/>
                {'}'}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dark Mode Section */}
      <section id="darkmode" className="components-section__group">
        <div className="components-section__title-row">
          <h2>Dark Mode</h2>
          <span className="components-section__badge">System</span>
        </div>
        <p className="components-section__description">
          Sistema de temas usando CSS Custom Properties. 
          Toggle en el topbar del dashboard.
        </p>

        <div className="components-section__preview">
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16}}>
            
            {/* Light preview */}
            <div style={{
              background: 'white',
              border: '1px solid #E0E0E0',
              borderRadius: 12,
              padding: 16
            }}>
              <p style={{fontSize: 12, color: '#9E9E9E', marginBottom: 12}}>
                Light Mode
              </p>
              <div style={{background: '#F8F9FA', borderRadius: 8, padding: 12, marginBottom: 8}}>
                <p style={{fontSize: 13, color: '#1A1A1A', fontWeight: 600, margin: 0}}>
                  Javier Álvarez
                </p>
                <p style={{fontSize: 11, color: '#767676', margin: 0}}>Priority</p>
              </div>
              <div style={{
                background: 'white',
                border: '1px solid #F0F0F0',
                borderRadius: 8,
                padding: '8px 12px',
                display: 'flex',
                justifyContent: 'space-between'
              }}>
                <span style={{fontSize: 12, color: '#1A1A1A'}}>Saldo</span>
                <span style={{fontSize: 12, fontWeight: 600, color: '#1A1A1A'}}>$24,500.00</span>
              </div>
            </div>

            {/* Dark preview */}
            <div style={{
              background: '#0A0A0A',
              border: '1px solid #2A2A2A',
              borderRadius: 12,
              padding: 16
            }}>
              <p style={{fontSize: 12, color: '#666', marginBottom: 12}}>
                Dark Mode
              </p>
              <div style={{background: '#1A1A1A', borderRadius: 8, padding: 12, marginBottom: 8}}>
                <p style={{fontSize: 13, color: '#F5F5F5', fontWeight: 600, margin: 0}}>
                  Javier Álvarez
                </p>
                <p style={{fontSize: 11, color: '#E3173E', margin: 0}}>Priority</p>
              </div>
              <div style={{
                background: '#1A1A1A',
                border: '1px solid #2A2A2A',
                borderRadius: 8,
                padding: '8px 12px',
                display: 'flex',
                justifyContent: 'space-between'
              }}>
                <span style={{fontSize: 12, color: '#9E9E9E'}}>Saldo</span>
                <span style={{fontSize: 12, fontWeight: 600, color: '#F5F5F5'}}>$24,500.00</span>
              </div>
            </div>
          </div>

          <p style={{
            fontSize: 12, 
            color: '#767676', 
            marginTop: 12,
            textAlign: 'center'
          }}>
            Usa el botón Sun/Moon en el topbar para alternar entre temas
          </p>
        </div>

        <div className="components-section__code">
          <pre>{`/* CSS Custom Properties */
[data-theme="dark"] {
  --color-bg-primary: #0A0A0A;
  --color-text-primary: #F5F5F5;
  --color-surface: #1A1A1A;
}

/* Hook */
const { theme, toggleTheme } = useTheme()`}</pre>
        </div>
      </section>

      {/* i18n Section */}
      <section id="i18n" className="components-section__group">
        <div className="components-section__title-row">
          <h2>Internacionalización</h2>
          <span className="components-section__badge">System</span>
        </div>
        <p className="components-section__description">
          i18next integrado con soporte ES/EN. 
          Toggle de idioma en el topbar.
        </p>

        <div className="components-section__preview">
          <div style={{display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16}}>
            
            {/* Español */}
            <div style={{background: '#F8F9FA', borderRadius: 12, padding: 16}}>
              <div style={{
                display: 'flex', 
                alignItems: 'center', 
                gap: 8,
                marginBottom: 12
              }}>
                <span style={{fontSize: 18}}>🇲🇽</span>
                <span style={{fontSize: 13, fontWeight: 600}}>Español</span>
                <span style={{fontSize: 10, padding: '2px 6px', background: '#00823B', color: 'white', borderRadius: 4}}>Default</span>
              </div>
              {[
                ['navigation.home', 'Inicio'],
                ['products.balance', 'Saldo'],
                ['products.block', 'Bloquear'],
                ['actions.transfer', 'Transferir'],
                ['common.confirm', 'Confirmar'],
              ].map(([key, value]) => (
                <div key={key} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '4px 0',
                  borderBottom: '1px solid #F0F0F0',
                  fontSize: 12
                }}>
                  <span style={{color: '#9E9E9E', fontFamily: 'monospace'}}>{key}</span>
                  <span style={{color: '#1A1A1A', fontWeight: 500}}>{value}</span>
                </div>
              ))}
            </div>

            {/* English */}
            <div style={{background: '#F8F9FA', borderRadius: 12, padding: 16}}>
              <div style={{
                display: 'flex', 
                alignItems: 'center', 
                gap: 8,
                marginBottom: 12
              }}>
                <span style={{fontSize: 18}}>🇺🇸</span>
                <span style={{fontSize: 13, fontWeight: 600}}>English</span>
              </div>
              {[
                ['navigation.home', 'Home'],
                ['products.balance', 'Balance'],
                ['products.block', 'Block'],
                ['actions.transfer', 'Transfer'],
                ['common.confirm', 'Confirm'],
              ].map(([key, value]) => (
                <div key={key} style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '4px 0',
                  borderBottom: '1px solid #F0F0F0',
                  fontSize: 12
                }}>
                  <span style={{color: '#9E9E9E', fontFamily: 'monospace'}}>{key}</span>
                  <span style={{color: '#1A1A1A', fontWeight: 500}}>{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="components-section__code">
          <pre>{`import { useTranslation } from 'react-i18next'

const { t } = useTranslation()

<p>{t('products.balance')}</p>
<Button>{t('actions.transfer')}</Button>`}</pre>
        </div>
      </section>
    </div>
  );
};
