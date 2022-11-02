import React from 'react';
import './css/loadingSpinner.css';

class Loading extends React.Component {
  render() {
    return (
      <div className="spinner">
        <div className="dot" />
        <div className="dot" />
        <div className="dot" />
      </div>
    );
  }
}

export default Loading;
