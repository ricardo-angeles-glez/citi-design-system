# Migration Guide

## v1.0.0 → v1.1.0

This guide covers breaking changes and recommended updates when upgrading
the Citi Design System from v1.0.0 to v1.1.0.

---

## Breaking Changes

### Button — `ariaLabel` prop added

The `Button` component now accepts an explicit `ariaLabel` prop for
icon-only buttons. While not breaking, we recommend migrating inline
`aria-label` attributes to use the new prop for consistency.

**Before (v1.0.0)**
```tsx
<button aria-label="Close" onClick={onClose}>
  <X size={20} />
</button>
```

**After (v1.1.0)**
```tsx
<Button variant="ghost" ariaLabel="Close" onClick={onClose}>
  <X size={20} />
</Button>
```

---

### New components — action required if using custom implementations

The following components were added in v1.1.0. If your application has
custom implementations of these patterns, we recommend migrating to the
DS versions to ensure visual and behavioral consistency.

| Component | Description |
|-----------|-------------|
| `Modal` | Dialog with focus trap, 3 variants, Escape key support |
| `Toast` | Notification system with `useToast` hook |
| `Skeleton` | Loading placeholders with shimmer animation |
| `EmptyState` | Empty state patterns with 4 variants |
| `Select` | Accessible dropdown with keyboard navigation |
| `Checkbox` | Checkbox with indeterminate state support |
| `RadioGroup` | Radio button group with vertical/horizontal layout |
| `CardVisual` | Visual bank card with EMV chip and gradients |
| `CurrencyInput` | MXN/USD formatted monetary input |
| `OTPInput` | 6-digit OTP input with auto-advance |
| `PINPad` | Numeric PIN pad with animated progress circles |
| `SpendingChart` | Bar/line/sparkline chart built on Recharts |

---

## CSS Token Changes

### New semantic tokens added

The following CSS custom properties were added to `:root` in v1.1.0.
No existing tokens were removed or renamed.
```css
/* Semantic surface tokens */
--surface-bg-tertiary
--surface-elevated

/* Interactive tokens */
--interactive-primary-hover
--interactive-success

/* Dashboard-specific tokens */
--dashboard-bg
--dashboard-topbar-bg
--dashboard-sidebar-bg
--dashboard-border

/* Dark mode support */
[data-theme="dark"] { ... }
```

If your application overrides any DS tokens, verify your overrides still
apply correctly after upgrading.

---

## Dark Mode

v1.1.0 introduces full dark mode support via `data-theme="dark"` on the
`<html>` element. To enable dark mode in your application:
```tsx
// Toggle dark mode
document.documentElement.setAttribute('data-theme', 'dark');

// Or use the useTheme hook (included in DS)
import { useTheme } from '@citi-ds/react';
const { theme, toggleTheme } = useTheme();
```

If your application has custom CSS that uses hardcoded color values,
migrate them to semantic tokens to automatically inherit dark mode support.

---

## Internationalization (i18n)

v1.1.0 adds Spanish/English i18n support via `i18next`. To use translated
strings in your application:
```tsx
import { useTranslation } from 'react-i18next';

const { t } = useTranslation();

<Button>{t('actions.transfer')}</Button>
```

Available locale files: `src/i18n/locales/es.json`, `src/i18n/locales/en.json`

---

## Storybook

v1.1.0 includes a complete Storybook with 79 stories. To run locally:
```bash
npm run storybook
```

Live Storybook: https://citi-ds-storybook.vercel.app

---

## Checklist for consuming applications

- [ ] Update DS package to v1.1.0
- [ ] Replace custom modal/dialog implementations with `Modal`
- [ ] Replace custom notification implementations with `Toast` + `useToast`
- [ ] Replace custom loading states with `Skeleton`
- [ ] Migrate hardcoded colors to semantic CSS tokens
- [ ] Add `data-theme` attribute handling for dark mode support
- [ ] Verify all `aria-label` attributes on icon-only buttons

---

## Support

For questions or issues during migration, open an issue on
[GitHub](https://github.com/ricardo-angeles-glez/citi-design-system)
or contact the Design System team.