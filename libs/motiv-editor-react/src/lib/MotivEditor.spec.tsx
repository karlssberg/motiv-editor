import { render } from '@testing-library/react';

import { MotivEditor } from './MotivEditor';

describe('MotivEditor', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<MotivEditor />);
    expect(baseElement).toBeTruthy();
  });
});
