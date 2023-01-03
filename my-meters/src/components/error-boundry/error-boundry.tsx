import { Component, ReactElement, ReactNode } from 'react';

interface ErrorBoundryProps {
  children: ReactNode | ReactElement
}

export default class ErrorBoundry extends Component<ErrorBoundryProps> {

  state = {
    hasError: false
  };

  componentDidCatch() {
    this.setState({ hasError: true });
  }

  render() {
    if (this.state.hasError) {
      return <div>Ошибка загрузки данных</div>;
    }

    return this.props.children;
  }
}