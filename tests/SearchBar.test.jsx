import { render } from '@testing-library/react';
import { axe, toHaveNoViolations } from 'jest-axe';
import { SearchBar } from '../src/common/SearchBar';

expect.extend(toHaveNoViolations);

test('should not have any accessibility violations', async () => {
    const { container } = render(<SearchBar searchQuery='' />);
    const results = await axe(container);
    expect(results).toHaveNoViolations();
});