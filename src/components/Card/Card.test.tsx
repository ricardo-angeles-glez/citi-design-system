import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Card } from './Card';

describe('Card', () => {
    // ── Rendering ─────────────────────────
    it('renders with title', () => {
        render(<Card title="My Card">Content</Card>);
        expect(screen.getByText('My Card')).toBeInTheDocument();
    });

    it('renders children', () => {
        render(
            <Card title="Test">
                <p>Card body content</p>
            </Card>
        );
        expect(screen.getByText('Card body content')).toBeInTheDocument();
    });

    it('renders without title', () => {
        render(<Card>No title card</Card>);
        expect(screen.getByText('No title card')).toBeInTheDocument();
    });

    // ── Variants ──────────────────────────
    it('renders all elevation levels', () => {
        const elevations = ['low', 'medium', 'high'] as const;
        elevations.forEach((elevation) => {
            const { unmount } = render(
                <Card title={elevation} elevation={elevation}>
                    Content
                </Card>
            );
            expect(screen.getByText(elevation)).toBeInTheDocument();
            unmount();
        });
    });

    it('renders outlined variant', () => {
        render(
            <Card title="Outlined" variant="outlined">
                Content
            </Card>
        );
        const card = screen.getByText('Content').closest('.citi-card');
        expect(card).toHaveClass('citi-card--outlined');
    });

    // ── Content ───────────────────────────
    it('renders complex children', () => {
        render(
            <Card title="Complex">
                <div data-testid="inner">
                    <span>Nested content</span>
                </div>
            </Card>
        );
        expect(screen.getByTestId('inner')).toBeInTheDocument();
        expect(screen.getByText('Nested content')).toBeInTheDocument();
    });

    it('renders footer when provided', () => {
        render(
            <Card title="With Footer" footer={<button>Action</button>}>
                Body
            </Card>
        );
        expect(screen.getByRole('button', { name: 'Action' })).toBeInTheDocument();
    });
});