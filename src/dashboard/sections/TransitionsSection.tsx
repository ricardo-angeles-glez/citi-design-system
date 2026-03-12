import { Button } from '../../components/Button';
import './Foundations.css';

export const TransitionsSection: React.FC = () => {
  const transitions = [
    { name: 'fast', value: '150ms', usage: 'Hover, focus states', token: '--transition-fast' },
    { name: 'normal', value: '200ms', usage: 'Cards, dropdowns', token: '--transition-normal' },
    { name: 'slow', value: '300ms', usage: 'Modales, overlays', token: '--transition-slow' },
  ];

  return (
    <div className="foundations">
      <div className="foundations__header">
        <h1>Transiciones</h1>
        <p>Valores de transición del sistema</p>
      </div>

      <section className="foundations__section">
        <h2>Ejemplos interactivos</h2>
        <div className="foundations__transitions-cards">
          <div className="foundations__transition-card">
            <div className="foundations__transition-example">
              <button className="foundations__transition-btn">
                Hover me
              </button>
            </div>
            <span className="foundations__transition-label">fast - 150ms ease-in-out</span>
          </div>

          <div className="foundations__transition-card foundations__transition-card--hover">
            <div className="foundations__transition-example">
              <div style={{ padding: '20px', background: 'white', borderRadius: '8px' }}>
                Hover me
              </div>
            </div>
            <span className="foundations__transition-label">normal - 200ms ease-in-out</span>
          </div>

          <div className="foundations__transition-card">
            <div className="foundations__transition-example">
              <Button variant="primary">Hover me</Button>
            </div>
            <span className="foundations__transition-label">slow - 300ms ease-in-out</span>
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
