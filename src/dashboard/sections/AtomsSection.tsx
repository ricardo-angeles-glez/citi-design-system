import React, { useState } from 'react';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { Badge } from '../../components/Badge';
import { Avatar } from '../../components/Avatar';
import { Card } from '../../components/Card';
import { Select } from '../../components/Select';
import { Checkbox } from '../../components/Checkbox';
import { RadioGroup } from '../../components/Radio';
import { useTranslation } from 'react-i18next';
import './ComponentsSection.css';

export const AtomsSection: React.FC = () => {
  const { t } = useTranslation();

  // Select state
  const [selectValue, setSelectValue] = useState('');
  const [selectValue2, setSelectValue2] = useState('mx');

  // Checkbox state
  const [check1, setCheck1] = useState(false);
  const [check2, setCheck2] = useState(true);
  const [check3, setCheck3] = useState(false);

  // Radio state
  const [radioValue, setRadioValue] = useState('mxn');
  const [radioValue2, setRadioValue2] = useState('');

  return (
    <div className="components-section">
      <div className="components-section__header">
        <h1>{t('sections.atoms.title')}</h1>
        <p>{t('sections.atoms.description')}</p>
      </div>

      {/* ═══════════════════════════════════════
          BUTTONS
      ═══════════════════════════════════════ */}
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
          <pre>{`<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="danger">Danger</Button>
<Button disabled>Disabled</Button>
<Button isLoading>Loading</Button>`}</pre>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          INPUTS
      ═══════════════════════════════════════ */}
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
          <pre>{`<Input placeholder="Default input" />
<Input placeholder="Disabled" disabled />
<Input placeholder="Error" error="Error message" />
<Input placeholder="Password" type="password" />`}</pre>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          SELECT
      ═══════════════════════════════════════ */}
      <section id="select" className="components-section__group">
        <div className="components-section__title-row">
          <h2>Select</h2>
          <span className="components-section__badge">{t('sections.atoms.atom')}</span>
        </div>
        <p className="components-section__description">
          Dropdown accesible con navegación por teclado, opciones deshabilitadas y estado de error.
        </p>
        <div className="components-section__preview">
          <div className="components-section__inputs">
            <Select
              label="País"
              placeholder="Selecciona un país"
              value={selectValue}
              onChange={setSelectValue}
              options={[
                { value: 'mx', label: 'México' },
                { value: 'us', label: 'United States' },
                { value: 'ca', label: 'Canada' },
                { value: 'br', label: 'Brazil' },
              ]}
            />
            <Select
              label="Con valor seleccionado"
              value={selectValue2}
              onChange={setSelectValue2}
              options={[
                { value: 'mx', label: 'México' },
                { value: 'us', label: 'United States' },
                { value: 'ca', label: 'Canada' },
              ]}
            />
            <Select
              label="Con error"
              placeholder="Requerido"
              value=""
              onChange={() => { }}
              error="Este campo es requerido"
              options={[
                { value: 'mx', label: 'México' },
                { value: 'us', label: 'United States' },
              ]}
            />
            <Select
              label="Deshabilitado"
              placeholder="No disponible"
              value=""
              onChange={() => { }}
              disabled
              options={[
                { value: 'mx', label: 'México' },
              ]}
            />
          </div>
        </div>
        <div className="components-section__code">
          <pre>{`<Select
  label="País"
  placeholder="Selecciona un país"
  value={value}
  onChange={setValue}
  options={[
    { value: 'mx', label: 'México' },
    { value: 'us', label: 'United States', disabled: true },
  ]}
  error="Este campo es requerido"
  disabled
/>`}</pre>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          CHECKBOX
      ═══════════════════════════════════════ */}
      <section id="checkbox" className="components-section__group">
        <div className="components-section__title-row">
          <h2>Checkbox</h2>
          <span className="components-section__badge">{t('sections.atoms.atom')}</span>
        </div>
        <p className="components-section__description">
          Control de selección múltiple con estados checked, indeterminate, disabled y error.
        </p>
        <div className="components-section__preview">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
              <Checkbox
                label="Notificaciones por email"
                checked={check1}
                onChange={setCheck1}
              />
              <Checkbox
                label="Alertas SMS"
                checked={check2}
                onChange={setCheck2}
              />
              <Checkbox
                label="Push notifications"
                checked={check3}
                onChange={setCheck3}
              />
            </div>
            <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap' }}>
              <Checkbox
                label="Indeterminate"
                indeterminate
              />
              <Checkbox
                label="Deshabilitado"
                disabled
              />
              <Checkbox
                label="Checked deshabilitado"
                checked
                disabled
              />
            </div>
            <Checkbox
              label="Acepto los términos y condiciones"
              error="Debes aceptar los términos para continuar"
            />
          </div>
        </div>
        <div className="components-section__code">
          <pre>{`<Checkbox
  label="Notificaciones por email"
  checked={checked}
  onChange={setChecked}
/>
<Checkbox label="Indeterminate" indeterminate />
<Checkbox label="Deshabilitado" disabled />
<Checkbox
  label="Acepto términos"
  error="Campo requerido"
/>`}</pre>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          RADIO GROUP
      ═══════════════════════════════════════ */}
      <section id="radio" className="components-section__group">
        <div className="components-section__title-row">
          <h2>Radio Group</h2>
          <span className="components-section__badge">{t('sections.atoms.atom')}</span>
        </div>
        <p className="components-section__description">
          Grupo de botones de selección única con layout vertical y horizontal, navegación por teclado.
        </p>
        <div className="components-section__preview">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
            <RadioGroup
              name="currency"
              label="Moneda (vertical)"
              value={radioValue}
              onChange={setRadioValue}
              options={[
                { value: 'mxn', label: 'MXN — Peso Mexicano' },
                { value: 'usd', label: 'USD — US Dollar' },
                { value: 'eur', label: 'EUR — Euro' },
              ]}
            />
            <RadioGroup
              name="account"
              label="Con error"
              value={radioValue2}
              onChange={setRadioValue2}
              error="Selecciona una opción"
              options={[
                { value: 'savings', label: 'Cuenta de ahorro' },
                { value: 'checking', label: 'Cuenta corriente' },
                { value: 'investment', label: 'Inversiones', disabled: true },
              ]}
            />
            <RadioGroup
              name="period"
              label="Horizontal"
              value={radioValue}
              onChange={setRadioValue}
              direction="horizontal"
              options={[
                { value: 'mxn', label: 'MXN' },
                { value: 'usd', label: 'USD' },
                { value: 'eur', label: 'EUR' },
              ]}
            />
            <RadioGroup
              name="disabled"
              label="Deshabilitado"
              value="mxn"
              onChange={() => { }}
              disabled
              options={[
                { value: 'mxn', label: 'MXN — Peso Mexicano' },
                { value: 'usd', label: 'USD — US Dollar' },
              ]}
            />
          </div>
        </div>
        <div className="components-section__code">
          <pre>{`<RadioGroup
  name="currency"
  label="Moneda"
  value={value}
  onChange={setValue}
  direction="vertical" | "horizontal"
  options={[
    { value: 'mxn', label: 'MXN — Peso Mexicano' },
    { value: 'usd', label: 'USD — US Dollar', disabled: true },
  ]}
  error="Selecciona una opción"
/>`}</pre>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          BADGES
      ═══════════════════════════════════════ */}
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
          <pre>{`<Badge label="Nuevo" variant="nuevo" />
<Badge label="Beneficios" variant="beneficios" />
<Badge label="Promo" variant="promo" />
<Badge label="Activa" variant="active" />`}</pre>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          AVATARS
      ═══════════════════════════════════════ */}
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
          <pre>{`<Avatar initials="JA" variant="teal" size="sm" />
<Avatar initials="JA" variant="teal" size="md" />
<Avatar initials="JA" variant="teal" size="lg" />
<Avatar initials="AB" variant="red" size="md" />`}</pre>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          CARDS
      ═══════════════════════════════════════ */}
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
          <pre>{`<Card title="Title" elevation="low">...</Card>
<Card title="Title" elevation="medium">...</Card>
<Card title="Title" elevation="high">...</Card>
<Card title="Outlined" variant="outlined">...</Card>`}</pre>
        </div>
      </section>
    </div>
  );
};