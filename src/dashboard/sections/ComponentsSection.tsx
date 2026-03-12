import React from 'react';
import { ProductCard } from '../../components/ProductCard';
import { CardVisual } from '../../components/CardVisual';
import { ListItem } from '../../components/ListItem';
import { AppHeader } from '../../components/AppHeader';
import { IconWrapper } from '../../components/IconWrapper';
import { Button } from '../../components/Button';
import { Skeleton, SkeletonProductCard } from '../../components/Skeleton';
import { EmptyState } from '../../components/EmptyState';
import { SpendingChart, mockChartData } from '../../components/Chart/SpendingChart';
import { products, transactions, formatAmount } from '../../data/mockData';
import './ComponentsSection.css';

export const ComponentsSection: React.FC = () => {
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
          Diálogo modal para confirmaciones o información crítica.
        </p>
        <div className="components-section__preview">
          <Button variant="primary" onClick={() => {}}>Abrir Modal</Button>
        </div>
        <div className="components-section__code">
          <pre>
{`<Modal
  isOpen={true}
  onClose={() => {}}
  title="Confirmar Transferencia"
  description="¿Estás seguro de transferir $5,000 MXN?"
  variant="default"
  primaryAction={{ label: "Confirmar", onClick: () => {} }}
  secondaryAction={{ label: "Cancelar", onClick: () => {} }}
/>`}
          </pre>
        </div>
      </section>

      {/* Toast Section */}
      <section id="toast" className="components-section__group">
        <div className="components-section__title-row">
          <h2>Toast</h2>
          <span className="components-section__badge">Component</span>
        </div>
        <div className="components-section__preview">
          <div className="components-section__row">
            <Button variant="primary" onClick={() => {}}>Success Toast</Button>
            <Button variant="danger" onClick={() => {}}>Error Toast</Button>
          </div>
        </div>
        <div className="components-section__code">
          <pre>
{`const { showToast } = useToast();
showToast({ 
  message: 'Transferencia exitosa', 
  variant: 'success',
  duration: 4000 
});`}
          </pre>
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
        <div className="components-section__preview">
          {/* Placeholder for OTPInput component */}
          <div className="otp-preview-placeholder">
            [OTP Input Component Here]
          </div>
        </div>
        <div className="components-section__code">
          <pre>
{`<OTPInput 
  length={6} 
  onComplete={(code) => console.log(code)} 
/>`}
          </pre>
        </div>
      </section>

      {/* PIN Pad Section */}
      <section id="pinpad" className="components-section__group">
        <div className="components-section__title-row">
          <h2>PIN Pad</h2>
          <span className="components-section__badge">Banking</span>
        </div>
        <div className="components-section__preview">
          <div className="pinpad-preview-placeholder">
            [PIN Pad Component Here]
          </div>
        </div>
        <div className="components-section__code">
          <pre>
{`<PINPad 
  length={4} 
  onComplete={(pin) => console.log(pin)} 
/>`}
          </pre>
        </div>
      </section>

      {/* Currency Input Section */}
      <section id="currencyinput" className="components-section__group">
        <div className="components-section__title-row">
          <h2>Currency Input</h2>
          <span className="components-section__badge">Banking</span>
        </div>
        <div className="components-section__preview">
          <div className="currency-preview-placeholder">
            [Currency Input Component Here]
          </div>
        </div>
        <div className="components-section__code">
          <pre>
{`<CurrencyInput 
  value={0} 
  onChange={(val) => {}} 
  maxValue={50000}
/>`}
          </pre>
        </div>
      </section>

      {/* Chart Section */}
      <section id="chart" className="components-section__group">
        <div className="components-section__title-row">
          <h2>Spending Chart</h2>
          <span className="components-section__badge">Banking</span>
        </div>
        <div className="components-section__preview">
           <SpendingChart data={mockChartData} variant="bar" />
        </div>
        <div className="components-section__code">
          <pre>
{`<SpendingChart 
  data={mockChartData} 
  variant="bar" 
/>`}
          </pre>
        </div>
      </section>

       {/* Accessibility Section */}
       <section id="accessibility" className="components-section__group">
        <div className="components-section__title-row">
          <h2>Accesibilidad</h2>
          <span className="components-section__badge">System</span>
        </div>
        <div className="components-section__preview">
           <p>WCAG AA standards applied across all components.</p>
           <ul>
             <li>Focus visible outlines</li>
             <li>Reduced motion support</li>
             <li>Skip links</li>
             <li>ARIA labels</li>
           </ul>
        </div>
      </section>

      {/* Dark Mode Section */}
      <section id="darkmode" className="components-section__group">
        <div className="components-section__title-row">
          <h2>Dark Mode</h2>
          <span className="components-section__badge">System</span>
        </div>
        <div className="components-section__preview">
           <p>Toggle theme using the button in the topbar.</p>
           <p>Uses CSS custom properties for seamless switching.</p>
        </div>
      </section>

      {/* i18n Section */}
      <section id="i18n" className="components-section__group">
        <div className="components-section__title-row">
          <h2>Internacionalización</h2>
          <span className="components-section__badge">System</span>
        </div>
        <div className="components-section__preview">
           <p>i18next integrated with ES/EN support.</p>
           <p>Toggle language in the topbar.</p>
        </div>
      </section>
    </div>
  );
};
