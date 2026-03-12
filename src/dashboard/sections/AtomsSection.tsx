import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Badge } from '../../components/Badge';
import { Avatar } from '../../components/Avatar';
import { Card } from '../../components/Card';
import { useTranslation } from 'react-i18next';
import './ComponentsSection.css';

export const AtomsSection: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="components-section">
      <div className="components-section__header">
        <h1>{t('sections.atoms.title')}</h1>
        <p>{t('sections.atoms.description')}</p>
      </div>

      {/* Buttons */}
      <section id="buttons" className="components-section__group">
        <div className="components-section__title-row">
          <h2>{t('sections.atoms.buttons.title')}</h2>
          <span className="components-section__badge">{t('sections.atoms.atom')}</span>
        </div>
        <p className="components-section__description">
          {t('sections.atoms.buttons.description')}
        </p>
        
        <div className="components-section__preview">
          <div className="components-section__row">
            <Button variant="primary">{t('components.variants.primary')}</Button>
            <Button variant="secondary">{t('components.variants.secondary')}</Button>
            <Button variant="ghost">{t('components.variants.ghost')}</Button>
            <Button variant="danger">{t('components.variants.danger')}</Button>
          </div>
          <div className="components-section__row">
            <Button size="sm">{t('components.sizes.sm')}</Button>
            <Button size="md">{t('components.sizes.md')}</Button>
            <Button size="lg">{t('components.sizes.lg')}</Button>
          </div>
          <div className="components-section__row">
            <Button disabled>{t('components.states.disabled')}</Button>
            <Button isLoading>{t('components.states.loading')}</Button>
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
          <h2>{t('sections.atoms.inputs.title')}</h2>
          <span className="components-section__badge">{t('sections.atoms.atom')}</span>
        </div>
        <p className="components-section__description">
          {t('sections.atoms.inputs.description')}
        </p>
        
        <div className="components-section__preview">
          <div className="components-section__inputs">
            <Input placeholder={t('inputs.placeholder.default')} />
            <Input placeholder={t('inputs.placeholder.focused')} />
            <Input placeholder={t('inputs.placeholder.disabled')} disabled />
            <Input placeholder={t('inputs.placeholder.error')} error={t('inputs.error.message')} />
            <Input placeholder={t('inputs.placeholder.password')} type="password" />
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
          <h2>{t('sections.atoms.badges.title')}</h2>
          <span className="components-section__badge">{t('sections.atoms.atom')}</span>
        </div>
        <p className="components-section__description">
          {t('sections.atoms.badges.description')}
        </p>
        
        <div className="components-section__preview">
          <div className="components-section__badges">
            <Badge label={t('badges.nuevo')} variant="nuevo" />
            <Badge label={t('badges.beneficios')} variant="beneficios" />
            <Badge label={t('badges.promo')} variant="promo" />
            <Badge label={t('badges.active')} variant="active" />
            <Badge label={t('badges.pending')} variant="warning" />
            <Badge label={t('badges.error')} variant="error" />
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
          <h2>{t('sections.atoms.avatars.title')}</h2>
          <span className="components-section__badge">{t('sections.atoms.atom')}</span>
        </div>
        <p className="components-section__description">
          {t('sections.atoms.avatars.description')}
        </p>
        
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
          <h2>{t('sections.atoms.cards.title')}</h2>
          <span className="components-section__badge">{t('sections.atoms.atom')}</span>
        </div>
        <p className="components-section__description">
          {t('sections.atoms.cards.description')}
        </p>
        
        <div className="components-section__preview">
          <div className="components-section__cards">
            <Card title={t('cards.title')} elevation="low">
              <p>{t('cards.content')}</p>
            </Card>
            <Card title={t('cards.title')} elevation="medium">
              <p>{t('cards.content')}</p>
            </Card>
            <Card title={t('cards.title')} elevation="high">
              <p>{t('cards.content')}</p>
            </Card>
            <Card title={t('cards.outlinedTitle')} variant="outlined">
              <p>{t('cards.content')}</p>
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