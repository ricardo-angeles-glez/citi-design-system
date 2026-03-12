import { colors } from '../../tokens/colors';
import './ColorsSection.css';
import { useTranslation } from 'react-i18next';

interface ColorPalette {
  name: string;
  shades: Record<string, string>;
}

const palettes: ColorPalette[] = [
  { name: 'Primary', shades: colors.primary },
  { name: 'Accent', shades: colors.accent },
  { name: 'Neutral', shades: colors.secondary },
  { name: 'Success', shades: colors.success },
  { name: 'Warning', shades: colors.warning },
  { name: 'Error', shades: colors.error },
];

export const ColorsSection: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="colors-section">
      <div className="colors-section__header">
        <h1>{t('foundations.colors.title')}</h1>
        <p>{t('foundations.colors.description')}</p>
      </div>

      {palettes.map((palette) => (
        <div key={palette.name} className="colors-section__palette">
          <h2 className="colors-section__palette-name">{palette.name}</h2>
          <div className="colors-section__swatches">
            {Object.entries(palette.shades).map(([shade, hex]) => (
              <div key={shade} className="colors-section__swatch">
                <div 
                  className="colors-section__color"
                  style={{ backgroundColor: hex }}
                />
                <div className="colors-section__shade">
                  <span className="colors-section__shade-number">{shade}</span>
                  <span className="colors-section__shade-hex">{hex}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
