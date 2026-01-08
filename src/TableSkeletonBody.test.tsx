import React from 'react';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TableSkeletonBody } from './TableSkeletonBody';

describe('TableSkeletonBody', () => {
  describe('Basic rendering', () => {
    it('should render a tbody element', () => {
      const { container } = render(
        <table>
          <TableSkeletonBody />
        </table>
      );
      const tbody = container.querySelector('tbody');
      expect(tbody).toBeInTheDocument();
    });

    it('should have aria-busy="true" attribute', () => {
      const { container } = render(
        <table>
          <TableSkeletonBody />
        </table>
      );
      const tbody = container.querySelector('tbody');
      expect(tbody).toHaveAttribute('aria-busy', 'true');
    });

    it('should render default 5 rows and 3 columns', () => {
      const { container } = render(
        <table>
          <TableSkeletonBody />
        </table>
      );
      const rows = container.querySelectorAll('tbody tr');
      expect(rows).toHaveLength(5);

      rows.forEach((row) => {
        const cells = row.querySelectorAll('td');
        expect(cells).toHaveLength(3);
      });
    });
  });

  describe('Props - rows and columns', () => {
    it('should render custom number of rows', () => {
      const { container } = render(
        <table>
          <TableSkeletonBody rows={10} />
        </table>
      );
      const rows = container.querySelectorAll('tbody tr');
      expect(rows).toHaveLength(10);
    });

    it('should render custom number of columns', () => {
      const { container } = render(
        <table>
          <TableSkeletonBody columns={7} />
        </table>
      );
      const cells = container.querySelectorAll('tbody tr:first-child td');
      expect(cells).toHaveLength(7);
    });

    it('should accept columns as array of numbers', () => {
      const { container } = render(
        <table>
          <TableSkeletonBody columns={[100, 200, 150]} />
        </table>
      );
      const cells = container.querySelectorAll('tbody tr:first-child td');
      expect(cells).toHaveLength(3);
      expect(cells[0]).toHaveStyle({ width: '100px' });
      expect(cells[1]).toHaveStyle({ width: '200px' });
      expect(cells[2]).toHaveStyle({ width: '150px' });
    });

    it('should accept columns as array of strings', () => {
      const { container } = render(
        <table>
          <TableSkeletonBody columns={['40%', '30%', '30%']} />
        </table>
      );
      const cells = container.querySelectorAll('tbody tr:first-child td');
      expect(cells[0]).toHaveStyle({ width: '40%' });
      expect(cells[1]).toHaveStyle({ width: '30%' });
      expect(cells[2]).toHaveStyle({ width: '30%' });
    });

    it('should accept columns as array of objects with width', () => {
      const { container } = render(
        <table>
          <TableSkeletonBody
            columns={[{ width: '50%' }, { width: 100 }, { width: '25%' }]}
          />
        </table>
      );
      const cells = container.querySelectorAll('tbody tr:first-child td');
      expect(cells[0]).toHaveStyle({ width: '50%' });
      expect(cells[1]).toHaveStyle({ width: '100px' });
      expect(cells[2]).toHaveStyle({ width: '25%' });
    });
  });

  describe('Props - styling', () => {
    it('should apply custom rowHeight as number', () => {
      const { container } = render(
        <table>
          <TableSkeletonBody rowHeight={60} />
        </table>
      );
      const row = container.querySelector('tbody tr');
      expect(row).toHaveStyle({ height: '60px' });
    });

    it('should apply custom rowHeight as string', () => {
      const { container } = render(
        <table>
          <TableSkeletonBody rowHeight="5rem" />
        </table>
      );
      const row = container.querySelector('tbody tr');
      expect(row).toHaveStyle({ height: '5rem' });
    });

    it('should apply custom cellPadding as number', () => {
      const { container } = render(
        <table>
          <TableSkeletonBody cellPadding={16} />
        </table>
      );
      const cell = container.querySelector('tbody tr td');
      expect(cell).toHaveStyle({ padding: '16px' });
    });

    it('should apply custom cellPadding as string', () => {
      const { container } = render(
        <table>
          <TableSkeletonBody cellPadding="1rem" />
        </table>
      );
      const cell = container.querySelector('tbody tr td');
      expect(cell).toHaveStyle({ padding: '1rem' });
    });

    it('should apply custom className', () => {
      const { container } = render(
        <table>
          <TableSkeletonBody className="custom-skeleton" />
        </table>
      );
      const tbody = container.querySelector('tbody');
      expect(tbody).toHaveClass('custom-skeleton');
    });

    it('should apply custom inline styles', () => {
      const { container } = render(
        <table>
          <TableSkeletonBody style={{ opacity: 0.5 }} />
        </table>
      );
      const tbody = container.querySelector('tbody');
      expect(tbody).toHaveStyle({ opacity: '0.5' });
    });
  });

  describe('Props - shimmer animation', () => {
    it('should have shimmer class by default', () => {
      const { container } = render(
        <table>
          <TableSkeletonBody />
        </table>
      );
      const bar = container.querySelector('.rts-bar');
      expect(bar).toHaveClass('rts-shimmer');
    });

    it('should not have shimmer class when shimmer is false', () => {
      const { container } = render(
        <table>
          <TableSkeletonBody shimmer={false} />
        </table>
      );
      const bar = container.querySelector('.rts-bar');
      expect(bar).not.toHaveClass('rts-shimmer');
      expect(bar).toHaveClass('rts-bar');
    });
  });

  describe('Props - randomize', () => {
    it('should apply randomized widths when randomize is true', () => {
      const { container } = render(
        <table>
          <TableSkeletonBody columns={3} randomize={true} />
        </table>
      );
      const cells = container.querySelectorAll('tbody tr:first-child td');

      // Check that widths are set and are percentages
      cells.forEach((cell) => {
        const width = (cell as HTMLElement).style.width;
        expect(width).toMatch(/%$/);
      });
    });

    it('should use seeded random values that are consistent', () => {
      const { container: container1 } = render(
        <table>
          <TableSkeletonBody columns={3} randomize={true} />
        </table>
      );
      const cells1 = container1.querySelectorAll('tbody tr:first-child td');
      const widths1 = Array.from(cells1).map(
        (cell) => (cell as HTMLElement).style.width
      );

      const { container: container2 } = render(
        <table>
          <TableSkeletonBody columns={3} randomize={true} />
        </table>
      );
      const cells2 = container2.querySelectorAll('tbody tr:first-child td');
      const widths2 = Array.from(cells2).map(
        (cell) => (cell as HTMLElement).style.width
      );

      // Seeded random should produce same widths
      expect(widths1).toEqual(widths2);
    });
  });

  describe('Props - theming (v0.2.0)', () => {
    it('should apply custom backgroundColor CSS variable', () => {
      const { container } = render(
        <table>
          <TableSkeletonBody backgroundColor="#1e293b" />
        </table>
      );
      const tbody = container.querySelector('tbody') as HTMLElement;
      expect(tbody.style.getPropertyValue('--rts-bg-color')).toBe('#1e293b');
    });

    it('should apply custom shimmerColor CSS variable', () => {
      const { container } = render(
        <table>
          <TableSkeletonBody shimmerColor="rgba(255, 255, 255, 0.8)" />
        </table>
      );
      const tbody = container.querySelector('tbody') as HTMLElement;
      expect(tbody.style.getPropertyValue('--rts-shimmer-color')).toBe(
        'rgba(255, 255, 255, 0.8)'
      );
    });

    it('should apply custom barHeight CSS variable as number', () => {
      const { container } = render(
        <table>
          <TableSkeletonBody barHeight={20} />
        </table>
      );
      const tbody = container.querySelector('tbody') as HTMLElement;
      expect(tbody.style.getPropertyValue('--rts-bar-height')).toBe('20px');
    });

    it('should apply custom barHeight CSS variable as string', () => {
      const { container } = render(
        <table>
          <TableSkeletonBody barHeight="1.5rem" />
        </table>
      );
      const tbody = container.querySelector('tbody') as HTMLElement;
      expect(tbody.style.getPropertyValue('--rts-bar-height')).toBe('1.5rem');
    });

    it('should apply custom barBorderRadius CSS variable as number', () => {
      const { container } = render(
        <table>
          <TableSkeletonBody barBorderRadius={8} />
        </table>
      );
      const tbody = container.querySelector('tbody') as HTMLElement;
      expect(tbody.style.getPropertyValue('--rts-bar-radius')).toBe('8px');
    });

    it('should apply custom barBorderRadius CSS variable as string', () => {
      const { container } = render(
        <table>
          <TableSkeletonBody barBorderRadius="0.5rem" />
        </table>
      );
      const tbody = container.querySelector('tbody') as HTMLElement;
      expect(tbody.style.getPropertyValue('--rts-bar-radius')).toBe('0.5rem');
    });

    it('should apply multiple theme props together', () => {
      const { container } = render(
        <table>
          <TableSkeletonBody
            backgroundColor="#374151"
            shimmerColor="rgba(156, 163, 175, 0.2)"
            barHeight={16}
            barBorderRadius={6}
          />
        </table>
      );
      const tbody = container.querySelector('tbody') as HTMLElement;
      expect(tbody.style.getPropertyValue('--rts-bg-color')).toBe('#374151');
      expect(tbody.style.getPropertyValue('--rts-shimmer-color')).toBe(
        'rgba(156, 163, 175, 0.2)'
      );
      expect(tbody.style.getPropertyValue('--rts-bar-height')).toBe('16px');
      expect(tbody.style.getPropertyValue('--rts-bar-radius')).toBe('6px');
    });
  });

  describe('Accessibility', () => {
    it('should have role="cell" on td elements', () => {
      const { container } = render(
        <table>
          <TableSkeletonBody />
        </table>
      );
      const cells = container.querySelectorAll('tbody tr td');
      cells.forEach((cell) => {
        expect(cell).toHaveAttribute('role', 'cell');
      });
    });

    it('should have aria-hidden="true" on td elements', () => {
      const { container } = render(
        <table>
          <TableSkeletonBody />
        </table>
      );
      const cells = container.querySelectorAll('tbody tr td');
      cells.forEach((cell) => {
        expect(cell).toHaveAttribute('aria-hidden', 'true');
      });
    });

    it('should have role="presentation" on skeleton bars', () => {
      const { container } = render(
        <table>
          <TableSkeletonBody />
        </table>
      );
      const bars = container.querySelectorAll('.rts-bar');
      bars.forEach((bar) => {
        expect(bar).toHaveAttribute('role', 'presentation');
      });
    });
  });

  describe('Edge cases', () => {
    it('should handle 0 rows gracefully', () => {
      const { container } = render(
        <table>
          <TableSkeletonBody rows={0} />
        </table>
      );
      const rows = container.querySelectorAll('tbody tr');
      expect(rows).toHaveLength(0);
    });

    it('should handle 1 column', () => {
      const { container } = render(
        <table>
          <TableSkeletonBody columns={1} />
        </table>
      );
      const cells = container.querySelectorAll('tbody tr:first-child td');
      expect(cells).toHaveLength(1);
    });

    it('should handle large number of rows and columns', () => {
      const { container } = render(
        <table>
          <TableSkeletonBody rows={100} columns={20} />
        </table>
      );
      const rows = container.querySelectorAll('tbody tr');
      expect(rows).toHaveLength(100);
      const cells = container.querySelectorAll('tbody tr:first-child td');
      expect(cells).toHaveLength(20);
    });
  });
});
