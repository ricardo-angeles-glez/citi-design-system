import { useState } from 'react';
import { 
  Home, 
  ArrowRightCircle, 
  FileText, 
  MoreHorizontal,
  MoreVertical,
  CreditCard,
  Wallet,
  TrendingUp,
  ArrowUpRight,
  Landmark,
  PiggyBank,
  CheckCircle,
  Trash2,
  RefreshCw,
  Shield
} from 'lucide-react';
import { AppHeader } from '../components/AppHeader';
import { Badge } from '../components/Badge';
import { ProductCard } from '../components/ProductCard';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { IconWrapper } from '../components/IconWrapper';
import { user, products, transactions, offers, credits, formatCurrency, formatAmount } from '../data/mockData';
import '../components/AppHeader/AppHeader.css';
import '../components/Badge/Badge.css';
import '../components/ProductCard/ProductCard.css';
import '../components/Button/Button.css';
import '../components/Input/Input.css';
import '../styles/responsive.css';
import './CitibanamexDemo.css';

type FilterStatus = 'all' | 'completed' | 'pending' | 'failed';
type Screen = 'home' | 'transfer' | 'payments' | 'transactions';

export const CitibanamexDemo: React.FC = () => {
  const [filter, setFilter] = useState<FilterStatus>('all');
  const [activeScreen, setActiveScreen] = useState<Screen>('home');
  const [transferStep, setTransferStep] = useState(1);
  
  // Transfer form state
  const [transferData, setTransferData] = useState({
    fromAccount: '',
    toAccount: '',
    amount: '',
    concept: '',
    date: new Date().toISOString().split('T')[0]
  });

  const filteredTransactions = transactions.filter(tx => 
    filter === 'all' ? true : tx.status === filter
  );

  const totalIncome = transactions
    .filter(tx => tx.amount > 0 && tx.status === 'completed')
    .reduce((sum, tx) => sum + tx.amount, 0);
  
  const totalExpense = transactions
    .filter(tx => tx.amount < 0 && tx.status === 'completed')
    .reduce((sum, tx) => sum + Math.abs(tx.amount), 0);

  const getStatusLabel = (status: string): string => {
    switch (status) {
      case 'completed': return 'Completada';
      case 'pending': return 'Pendiente';
      case 'failed': return 'Fallida';
      default: return status;
    }
  };

  const getProductIcon = (id: string) => {
    switch (id) {
      case 'savings': return PiggyBank;
      case 'investments': return TrendingUp;
      case 'credit': return CreditCard;
      case 'debit': return Wallet;
      default: return Landmark;
    }
  };

  // Transfer functions
  const handleTransferNext = () => {
    if (transferStep < 3) {
      setTransferStep(prev => prev + 1);
    }
  };

  const handleTransferBack = () => {
    if (transferStep > 1) {
      setTransferStep(prev => prev - 1);
    }
  };

  const handleTransferSubmit = () => {
    // Simulate submission
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
  };

  // Screen navigation handlers
  const handleNavClick = (screen: Screen) => {
    setActiveScreen(screen);
    if (screen === 'transfer') setTransferStep(1);
  };



  return (
    <div className="citibanamex-demo">
      {/* Mobile App View */}
      <div className="demo-panel-left">
        {/* Header */}
        <AppHeader 
          initials={user.initials}
          name={user.name}
          tier={user.tier}
          showModeList={true}
        />

        <main className="demo-main">
          {/* Screen: Home */}
          {activeScreen === 'home' && (
            <>
          {/* Productos Section */}
          <section className="demo-section">
            <div className="demo-section__header">
              <h2 className="demo-section__title">Productos</h2>
              <button className="demo-section__menu">
                <MoreVertical size={20} strokeWidth={1.5} />
              </button>
            </div>
            
            <div className="demo-products">
              {products.map((product) => {
                const ProductIcon = getProductIcon(product.id);
                return (
                  <ProductCard
                    key={product.id}
                    categoryColor={product.id as 'savings' | 'investment' | 'credit' | 'debit'}
                    categoryLabel={product.count ? `${product.category} (${product.count})` : product.category}
                    badgeText={product.badge || undefined}
                    badgeVariant={(product.badgeVariant as 'nuevo') || undefined}
                    balance={product.balance !== null ? formatCurrency(product.balance) : undefined}
                    balanceNegative={product.balance !== null && product.balance < 0}
                    showBalance={product.balance !== null}
                  >
                    <div className="demo-product__row">
                      <div className="demo-product__icon">
                        <ProductIcon size={20} strokeWidth={1.5} />
                      </div>
                      <span className="demo-product__name">{product.category}</span>
                      <span className="demo-product__balance">
                        {product.balance !== null ? formatCurrency(product.balance) : 'No disponible'}
                      </span>
                    </div>
                  </ProductCard>
                );
              })}
            </div>
          </section>

          {/* Ofertas Section */}
          <section className="demo-section">
            <div className="demo-section__header">
              <h2 className="demo-section__title">Ofertas</h2>
              <a href="#" className="demo-section__link">Ver todas</a>
            </div>
            
            <div className="demo-offers">
              {offers.map((offer) => (
                <div key={offer.id} className="demo-offer-card">
                  <div className="demo-offer-card__image" style={{ backgroundImage: `url(${offer.image})` }}></div>
                  <div className="demo-offer-card__content">
                    <Badge label={offer.badge} variant="beneficios" size="sm" />
                    <p className="demo-offer-card__text">{offer.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Créditos Section */}
          <section className="demo-section">
            <div className="demo-section__header">
              <h2 className="demo-section__title">Créditos</h2>
            </div>
            
            <div className="demo-credits">
              {credits.map((credit) => (
                <div key={credit.id} className="demo-offer-card">
                  <div className="demo-offer-card__image" style={{ backgroundImage: `url(${credit.image})` }}></div>
                  <div className="demo-offer-card__content">
                    <Badge label={credit.badge} variant="beneficios" size="sm" />
                    <p className="demo-offer-card__title">{credit.title}</p>
                    <p className="demo-offer-card__subtitle">{credit.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Quick Actions */}
          <section className="demo-section">
            <div className="demo-actions">
              <Button variant="primary" size="sm">
                <ArrowUpRight size={16} strokeWidth={1.5} />
                Transferir
              </Button>
              <Button variant="secondary" size="sm">
                <FileText size={16} strokeWidth={1.5} />
                Pagos
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
            </>
          )}

          {/* Screen: Transfer */}
          {activeScreen === 'transfer' && (
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
                <div className="transfer-step">
                  <h3 className="transfer-step__title">Selecciona cuenta de origen</h3>
                  <div className="accounts-list">
                    {products.map(product => (
                      <div 
                        key={product.id}
                        className={`account-item ${transferData.fromAccount === product.category ? 'account-item--selected' : ''}`}
                        onClick={() => setTransferData({...transferData, fromAccount: product.category})}
                      >
                        <IconWrapper iconName={product.id} category={product.category} size={24} />
                        <div className="account-item__info">
                          <span className="account-item__name">{product.category}</span>
                          <span className="account-item__balance">{formatCurrency(product.balance || 0)}</span>
                        </div>
                        {transferData.fromAccount === product.category && <CheckCircle size={20} className="account-item__check" />}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {transferStep === 2 && (
                <div className="transfer-step">
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
                </div>
              )}

              {transferStep === 3 && (
                <div className="transfer-step">
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
                </div>
              )}

              {transferStep === 4 && (
                <div className="transfer-step transfer-step--success">
                  <div className="success-animation">
                    <CheckCircle size={64} className="success-icon" />
                    <h3>Transferencia Exitosa</h3>
                    <p>Tu transferencia ha sido procesada correctamente</p>
                  </div>
                </div>
              )}

              <div className="transfer-actions">
                {transferStep > 1 && transferStep < 4 && (
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
            </section>
          )}

          {/* Screen: Payments */}
          {activeScreen === 'payments' && (
            <section className="demo-screen">
              <div className="screen-header">
                <h2 className="screen-title">Pagos</h2>
              </div>
              
              <div className="payments-grid">
                <div className="payment-card">
                  <div className="payment-card__icon">
                    <Home size={32} strokeWidth={1.5} />
                  </div>
                  <span>Servicios</span>
                </div>
                <div className="payment-card">
                  <div className="payment-card__icon">
                    <CreditCard size={32} strokeWidth={1.5} />
                  </div>
                  <span>Tarjetas</span>
                </div>
                <div className="payment-card">
                  <div className="payment-card__icon">
                    <Landmark size={32} strokeWidth={1.5} />
                  </div>
                  <span>Créditos</span>
                </div>
                <div className="payment-card">
                  <div className="payment-card__icon">
                    <PiggyBank size={32} strokeWidth={1.5} />
                  </div>
                  <span>Ahorro</span>
                </div>
                <div className="payment-card">
                  <div className="payment-card__icon">
                    <Wallet size={32} strokeWidth={1.5} />
                  </div>
                  <span>Seguros</span>
                </div>
                <div className="payment-card">
                  <div className="payment-card__icon">
                    <TrendingUp size={32} strokeWidth={1.5} />
                  </div>
                  <span>Inversiones</span>
                </div>
              </div>

              <div className="quick-payments">
                <h3>Pagos rápidos</h3>
                <div className="quick-payments-list">
                  {transactions.slice(0, 3).map(tx => (
                    <div key={tx.id} className="quick-payment-item">
                      <IconWrapper iconName={tx.icon} category={tx.category} size={24} />
                      <div className="quick-payment-info">
                        <span>{tx.description}</span>
                        <small>{tx.date}</small>
                      </div>
                      <Button variant="secondary" size="sm">Pagar</Button>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Screen: Transactions */}
          {activeScreen === 'transactions' && (
            <section className="demo-screen">
              <div className="screen-header">
                <h2 className="screen-title">Movimientos</h2>
              </div>
              
              <div className="transactions-list">
                {transactions.map(tx => (
                  <div key={tx.id} className="transaction-item">
                    <div className="transaction-item__icon">
                      <IconWrapper iconName={tx.icon} category={tx.category} size={24} />
                    </div>
                    <div className="transaction-item__info">
                      <span className="transaction-item__desc">{tx.description}</span>
                      <span className="transaction-item__date">{tx.date}</span>
                    </div>
                    <div className="transaction-item__amount">
                      <span className={tx.amount >= 0 ? 'amount-positive' : 'amount-negative'}>
                        {formatAmount(tx.amount)}
                      </span>
                      <span className={`transaction-status transaction-status--${tx.status}`}>
                        {getStatusLabel(tx.status)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Screen: More/Más (Account Detail placeholder) */}
          {activeScreen === 'transactions' && (
            <section className="demo-screen">
              <div className="screen-header">
                <h2 className="screen-title">Detalles de Cuenta</h2>
              </div>
              
              <div className="account-detail-card">
                <div className="account-detail-header">
                  <IconWrapper iconName="debit" category="Cuenta Débito" size={32} />
                  <div>
                    <h3>Cuenta Débito</h3>
                    <p>****4582</p>
                  </div>
                </div>
                <div className="account-detail-balance">
                  <span>Saldo disponible</span>
                  <strong>$25,430.50</strong>
                </div>
              </div>

              <div className="account-actions">
                <Button variant="secondary" size="lg">
                  <RefreshCw size={18} /> Consultar saldo
                </Button>
                <Button variant="ghost" size="lg">
                  <Shield size={18} /> Seguridad
                </Button>
                <Button variant="danger" size="lg">
                  <Trash2 size={18} /> Cancelar cuenta
                </Button>
              </div>
            </section>
          )}

          {/* Disclaimer */}
          <section className="demo-section">
            <div className="disclaimer">
              <Shield size={16} />
              <p>Este es un entorno de demostración. No se realizan transacciones reales.</p>
            </div>
          </section>
        </main>

        {/* Bottom Navigation */}
        <nav className="demo-nav">
          <button 
            className={`demo-nav__item ${activeScreen === 'home' ? 'demo-nav__item--active' : ''}`}
            onClick={() => handleNavClick('home')}
          >
            <Home size={24} strokeWidth={1.5} />
            <span>Inicio</span>
          </button>
          <button 
            className={`demo-nav__item ${activeScreen === 'transfer' ? 'demo-nav__item--active' : ''}`}
            onClick={() => handleNavClick('transfer')}
          >
            <ArrowRightCircle size={24} strokeWidth={1.5} />
            <span>Transferir</span>
          </button>
          <button 
            className={`demo-nav__item ${activeScreen === 'payments' ? 'demo-nav__item--active' : ''}`}
            onClick={() => handleNavClick('payments')}
          >
            <FileText size={24} strokeWidth={1.5} />
            <span>Pagos</span>
          </button>
          <button 
            className={`demo-nav__item ${activeScreen === 'transactions' ? 'demo-nav__item--active' : ''}`}
            onClick={() => handleNavClick('transactions')}
          >
            <MoreHorizontal size={24} strokeWidth={1.5} />
            <span>Más</span>
          </button>
        </nav>
      </div>

      {/* Desktop Right Panel - Transactions */}
      {activeScreen === 'home' && (
      <div className="demo-panel-right">
        <div className="demo-desktop-nav">
          <a href="#" className="demo-desktop-nav__item demo-desktop-nav__item--active">
            <FileText size={20} strokeWidth={1.5} />
            Movimientos
          </a>
          <a href="#" className="demo-desktop-nav__item">
            <CreditCard size={20} strokeWidth={1.5} />
            Pagos
          </a>
          <a href="#" className="demo-desktop-nav__item">
            <ArrowRightCircle size={20} strokeWidth={1.5} />
            Transferencias
          </a>
          <a href="#" className="demo-desktop-nav__item">
            <Wallet size={20} strokeWidth={1.5} />
            Tarjetas
          </a>
        </div>

        <section className="demo-section">
          <div className="transactions-panel">
            <div className="transactions-panel__header">
              <h2 className="transactions-panel__title">Movimientos recientes</h2>
              <div className="transactions-panel__filters">
                <button 
                  className={`transactions-panel__filter ${filter === 'all' ? 'transactions-panel__filter--active' : ''}`}
                  onClick={() => setFilter('all')}
                >
                  Todos
                </button>
                <button 
                  className={`transactions-panel__filter ${filter === 'completed' ? 'transactions-panel__filter--active' : ''}`}
                  onClick={() => setFilter('completed')}
                >
                  Completados
                </button>
                <button 
                  className={`transactions-panel__filter ${filter === 'pending' ? 'transactions-panel__filter--active' : ''}`}
                  onClick={() => setFilter('pending')}
                >
                  Pendientes
                </button>
                <button 
                  className={`transactions-panel__filter ${filter === 'failed' ? 'transactions-panel__filter--active' : ''}`}
                  onClick={() => setFilter('failed')}
                >
                  Fallidos
                </button>
              </div>
            </div>
            
            <table className="transactions-panel__table">
              <thead>
                <tr>
                  <th>Fecha</th>
                  <th>Descripción</th>
                  <th>Categoría</th>
                  <th>Monto</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.map((tx) => (
                  <tr key={tx.id}>
                    <td className="transactions-panel__date">
                      {tx.date} {tx.time}
                    </td>
                    <td className="transactions-panel__desc">
                      <IconWrapper iconName={tx.icon} category={tx.category} size={16} />
                      <span style={{ marginLeft: '12px' }}>{tx.description}</span>
                    </td>
                    <td className="transactions-panel__category">{tx.category}</td>
                    <td className={`transactions-panel__amount ${tx.amount >= 0 ? 'transactions-panel__amount--positive' : 'transactions-panel__amount--negative'}`}>
                      {formatAmount(tx.amount)}
                    </td>
                    <td>
                      <span className={`transactions-panel__status transactions-panel__status--${tx.status}`}>
                        {getStatusLabel(tx.status)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="transactions-summary">
              <div className="transactions-summary__item">
                <span className="transactions-summary__label">Ingresos del período</span>
                <span className="transactions-summary__value transactions-summary__value--income">
                  {formatCurrency(totalIncome)}
                </span>
              </div>
              <div className="transactions-summary__item">
                <span className="transactions-summary__label">Egresos del período</span>
                <span className="transactions-summary__value transactions-summary__value--expense">
                  {formatCurrency(totalExpense)}
                </span>
              </div>
            </div>
          </div>
        </section>
      </div>
      )}
    </div>
  );
};
