import React from 'react';
import type { Preview } from '@storybook/react-vite';
import { I18nextProvider } from 'react-i18next';
import i18n from '../src/i18n';
import '../src/styles/global.css';

const preview: Preview = {
  decorators: [
    (Story) => (
      <I18nextProvider i18n={i18n}>
        <div style={{ padding: 20, background: 'var(--surface-bg)', minHeight: '100%' }}>
          <Story />
        </div>
      </I18nextProvider>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: 'todo',
    },
    backgrounds: {
      default: 'light',
      values: [
        { name: 'light', value: '#F4F6F8' },
        { name: 'dark', value: '#0D1117' },
        { name: 'white', value: '#FFFFFF' },
      ],
    },
  },
};

export default preview;