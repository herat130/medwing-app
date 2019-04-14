import React from 'react';
import ErrorPage from './ErrorPage';

/**
 * In case of any ui error / Exception on each component
 * the app will not break,Instead it will show this Error Page
 */
export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
    };
  }

  componentDidCatch(error, info) {
    console.log('ERROR BOUNDARY COMPONENT');
    console.warn(error);
    console.warn(info);
    this.setState({
      error: true,
    });
  }

  render() {
    const { error } = this.state;
    if (error) {
      return <ErrorPage />;
    }
    return this.props.children;
  }
}
