import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

import { CodeSnippet } from '@/components';

describe('CodeSnippet', () => {
  it('should render correctly', () => {
    const testCode = 'const t = 3;';
    const testTitle = 'test title';

    render(
      <CodeSnippet code={testCode} title={testTitle} showGutter link="123" />
    );

    expect(screen.getByText(testTitle)).toBeInTheDocument();
  });
});
