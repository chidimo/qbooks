/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Component } from 'react';

const FallBack = () => {
  return (
    <div data-testid="error-boundary">
      <div>
        <p>
          There was an error in loading this page.&nbsp;
          <span
            style={{ cursor: 'pointer', color: '#0077FF' }}
            onClick={() => {
              window.location.reload();
            }}
          >
            Reload this page
          </span>
          &nbsp;
        </p>
      </div>
    </div>
  );
};

type ErrorBoundaryType = {
  children: any;
};

type ErrorBoundaryState = {
  error: string;
  hasError: boolean;
};
class ErrorBoundary extends Component<ErrorBoundaryType, ErrorBoundaryState> {
  state = {
    error: '',
    hasError: false,
  };

  static getDerivedStateFromError(error: any): any {
    return { hasError: true, error };
  }
  componentDidCatch(error: any, info: any): void {
    // eslint-disable-next-line no-console
    console.error({ error, info });
  }
  render(): JSX.Element {
    const { hasError } = this.state;
    if (hasError) {
      return <FallBack />;
    }
    return this.props.children;
  }
}
export { ErrorBoundary };
