import React from 'react';
import { ProductCard } from '../../components/ProductCard';
import { ListItem } from '../../components/ListItem';
import { AppHeader } from '../../components/AppHeader';
import { IconWrapper } from '../../components/IconWrapper';
import { products, transactions, formatCurrency, formatAmount } from '../../data/mockData';
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
                categoryColor={product.id as 'savings' | 'investment' | 'credit' | 'debit'}
                categoryLabel={product.category}
                badgeText={product.badge || undefined}
                badgeVariant={product.badgeVariant as any}
                balance={product.balance !== null ? formatCurrency(product.balance, product.currency) : undefined}
                balanceNegative={product.balance !== null && product.balance < 0}
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
    </div>
  );
};
