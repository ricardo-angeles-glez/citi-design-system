import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Badge } from '../../components/Badge';
import { Avatar } from '../../components/Avatar';
import { Card } from '../../components/Card';
import './ComponentsSection.css';

export const AtomsSection: React.FC = () => {
  return (
    <div className="components-section">
      <div className="components-section__header">
        <h1>Átomos</h1>
        <p>Elementos fundamentales del Design System</p>
      </div>

      {/* Buttons */}
      <section id="buttons" className="components-section__group">
        <div className="components-section__title-row">
          <h2>Buttons</h2>
          <span className="components-section__badge">Atom</span>
        </div>
        <p className="components-section__description">
          Botones con variantes primary, secondary, ghost y danger
        </p>
        
        <div className="components-section__preview">
          <div className="components-section__row">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="danger">Danger</Button>
          </div>
          <div className="components-section__row">
            <Button size="sm">Small</Button>
            <Button size="md">Medium</Button>
            <Button size="lg">Large</Button>
          </div>
          <div className="components-section__row">
            <Button disabled>Disabled</Button>
            <Button isLoading>Loading</Button>
          </div>
        </div>

        <div className="components-section__code">
          <pre>
{`<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="danger">Danger</Button>

<Button size="sm">Small</Button>
<Button size="md">Medium</Button>
<Button size="lg">Large</Button>

<Button disabled>Disabled</Button>
<Button isLoading>Loading</Button>`}
          </pre>
        </div>
      </section>

      {/* Inputs */}
      <section id="inputs" className="components-section__group">
        <div className="components-section__title-row">
          <h2>Inputs</h2>
          <span className="components-section__badge">Atom</span>
        </div>
        <p className="components-section__description">
          Campos de entrada con estados default, focus, error y disabled
        </p>
        
        <div className="components-section__preview">
          <div className="components-section__inputs">
            <Input placeholder="Default input" />
            <Input placeholder="Focused" />
            <Input placeholder="Disabled" disabled />
            <Input placeholder="With error" error="Error message" />
            <Input placeholder="Password" type="password" />
          </div>
        </div>

        <div className="components-section__code">
          <pre>
{`<Input placeholder="Default input" />
<Input placeholder="Focused" />
<Input placeholder="Disabled" disabled />
<Input placeholder="Error" error="Error message" />
<Input placeholder="Password" type="password" />`}
          </pre>
        </div>
      </section>

      {/* Badges */}
      <section id="badges" className="components-section__group">
        <div className="components-section__title-row">
          <h2>Badges</h2>
          <span className="components-section__badge">Atom</span>
        </div>
        
        <div className="components-section__preview">
          <div className="components-section__badges">
            <Badge label="Nuevo" variant="nuevo" />
            <Badge label="Beneficios" variant="beneficios" />
            <Badge label="Promo" variant="promo" />
            <Badge label="Activa" variant="active" />
            <Badge label="Pendiente" variant="warning" />
            <Badge label="Error" variant="error" />
          </div>
        </div>

        <div className="components-section__code">
          <pre>
{`<Badge label="Nuevo" variant="nuevo" />
<Badge label="Beneficios" variant="beneficios" />
<Badge label="Promo" variant="promo" />
<Badge label="Activa" variant="active" />`}
          </pre>
        </div>
      </section>

      {/* Avatars */}
      <section id="avatars" className="components-section__group">
        <div className="components-section__title-row">
          <h2>Avatars</h2>
          <span className="components-section__badge">Atom</span>
        </div>
        
        <div className="components-section__preview">
          <div className="components-section__avatars">
            <Avatar initials="JA" variant="teal" size="sm" />
            <Avatar initials="JA" variant="teal" size="md" />
            <Avatar initials="JA" variant="teal" size="lg" />
            <Avatar initials="AB" variant="red" size="md" />
            <Avatar initials="CD" variant="gray" size="md" />
          </div>
        </div>

        <div className="components-section__code">
          <pre>
{`<Avatar initials="JA" variant="teal" size="sm" />
<Avatar initials="JA" variant="teal" size="md" />
<Avatar initials="JA" variant="teal" size="lg" />
<Avatar initials="AB" variant="red" size="md" />
<Avatar initials="CD" variant="gray" size="md" />`}
          </pre>
        </div>
      </section>

      {/* Cards */}
      <section id="cards" className="components-section__group">
        <div className="components-section__title-row">
          <h2>Cards</h2>
          <span className="components-section__badge">Atom</span>
        </div>
        
        <div className="components-section__preview">
          <div className="components-section__cards">
            <Card title="Card Title" elevation="low">
              <p>Card content</p>
            </Card>
            <Card title="Card Title" elevation="medium">
              <p>Card content</p>
            </Card>
            <Card title="Card Title" elevation="high">
              <p>Card content</p>
            </Card>
            <Card title="Outlined" variant="outlined">
              <p>Card content</p>
            </Card>
          </div>
        </div>

        <div className="components-section__code">
          <pre>
{`<Card title="Title" elevation="low">...</Card>
<Card title="Title" elevation="medium">...</Card>
<Card title="Title" elevation="high">...</Card>
<Card title="Outlined" variant="outlined">...</Card>`}
          </pre>
        </div>
      </section>
    </div>
  );
};
