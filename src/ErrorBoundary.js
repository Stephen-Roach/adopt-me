import React from 'react';
import { Link, Redirect } from '@reach/router';
import Details from './Details';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, redirect: false };
  }

  static getDerivedStateFormError() {
    return { hasError: true };
  }
  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught an error', error, info);
  }

  componentWillUpdate() {
    if (this.state.hasError) {
      setTimeout(() => this.setState({ redirect: true }), 5000);
    }
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    }
    if (this.state.hasError) {
      return (
        <h1>
          There was an error with this listing. <Link to="/">Click here</Link>{' '}
          to go back to the home page or wait five seconds
        </h1>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
