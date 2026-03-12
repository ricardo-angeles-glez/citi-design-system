import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import '../components/Button/Button.css';
import '../components/Input/Input.css';
import '../components/Card/Card.css';
import '../components/Badge/Badge.css';
import './CitiDemo.css';

interface Transaction {
  id: number;
  date: string;
  description: string;
  amount: string;
  status: 'success' | 'warning' | 'error';
}

const transactions: Transaction[] = [
  { id: 1, date: 'Mar 11, 2026', description: 'Amazon.com', amount: '-$89.99', status: 'success' },
  { id: 2, date: 'Mar 10, 2026', description: 'Whole Foods Market', amount: '-$156.32', status: 'success' },
  { id: 3, date: 'Mar 09, 2026', description: 'Direct Deposit - Payroll', amount: '+$3,450.00', status: 'success' },
  { id: 4, date: 'Mar 08, 2026', description: 'Wire Transfer - Pending', amount: '-$500.00', status: 'warning' },
  { id: 5, date: 'Mar 07, 2026', description: 'ATM Withdrawal', amount: '-$200.00', status: 'error' },
];

const getStatusLabel = (status: string): string => {
  switch (status) {
    case 'success': return 'Completed';
    case 'warning': return 'Pending';
    case 'error': return 'Failed';
    default: return status;
  }
};

export const CitiDemo: React.FC = () => {
  return (
    <div className="citi-demo">
      {/* Header */}
      <header className="citi-header">
        <div className="citi-header__logo">
          <span className="citi-header__arc">┌</span>
          <span className="citi-header__text">citi</span>
        </div>
        <div className="citi-header__nav">
          <span className="citi-header__user">Welcome, John</span>
        </div>
      </header>

      <main className="citi-main">
        {/* Account Summary Cards */}
        <section className="citi-section">
          <h2 className="citi-section__title">Account Summary</h2>
          <div className="citi-cards">
            <Card elevation="medium" className="account-card">
              <div className="account-card__header">
                <span className="account-card__label">Checking Account</span>
                <Badge label="Active" variant="success" size="sm" />
              </div>
              <div className="account-card__balance">$12,450.00</div>
              <div className="account-card__number">****4521</div>
            </Card>
            
            <Card elevation="medium" className="account-card">
              <div className="account-card__header">
                <span className="account-card__label">Savings Account</span>
                <Badge label="Active" variant="success" size="sm" />
              </div>
              <div className="account-card__balance">$48,200.00</div>
              <div className="account-card__number">****8832</div>
            </Card>
            
            <Card elevation="medium" className="account-card">
              <div className="account-card__header">
                <span className="account-card__label">Credit Card</span>
                <Badge label="Payment Due" variant="warning" size="sm" />
              </div>
              <div className="account-card__balance account-card__balance--negative">-$1,240.00</div>
              <div className="account-card__number">****1199</div>
            </Card>
          </div>
        </section>

        {/* Quick Actions */}
        <section className="citi-section">
          <h2 className="citi-section__title">Quick Actions</h2>
          <div className="citi-actions">
            <Button variant="primary">Transfer Funds</Button>
            <Button variant="secondary">Pay Bills</Button>
            <Button variant="ghost">Request Card</Button>
            <Button variant="danger">Block Card</Button>
          </div>
        </section>

        {/* Recent Transactions */}
        <section className="citi-section">
          <h2 className="citi-section__title">Recent Transactions</h2>
          <Card elevation="low" className="transactions-card">
            <table className="transactions-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Description</th>
                  <th>Amount</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((tx) => (
                  <tr key={tx.id}>
                    <td className="transactions-table__date">{tx.date}</td>
                    <td className="transactions-table__desc">{tx.description}</td>
                    <td className={`transactions-table__amount ${tx.amount.startsWith('+') ? 'transactions-table__amount--positive' : 'transactions-table__amount--negative'}`}>
                      {tx.amount}
                    </td>
                    <td>
                      <Badge 
                        label={getStatusLabel(tx.status)} 
                        variant={tx.status === 'success' ? 'success' : tx.status === 'warning' ? 'warning' : 'error'} 
                        size="sm" 
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </section>

        {/* Alert Section */}
        <section className="citi-section">
          <h2 className="citi-section__title">Search & Alerts</h2>
          <div className="citi-alerts">
            <div className="citi-search">
              <Input 
                placeholder="Search transactions..." 
                label="Search"
              />
            </div>
            <div className="citi-alert">
              <Input 
                value="" 
                error="Session expires in 5 minutes"
                placeholder="Enter security code"
              />
            </div>
          </div>
        </section>
      </main>

      <footer className="citi-footer">
        <p>&copy; 2026 Citibank, N.A. All rights reserved.</p>
      </footer>
    </div>
  );
};
