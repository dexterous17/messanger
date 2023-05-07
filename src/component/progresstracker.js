import React from 'react';
import { ProgressBar, Intent } from '@blueprintjs/core';
import '../css/progresstracker.css';

function ProgressTracker({ step }) {
  return (
    <div className="progress-tracker">
      <div className="progress-step">
        <div className={`step-number ${step >= 1 ? 'active' : ''}`}>1</div>
        <div className={`step-label ${step >= 1 ? 'active' : ''}`}>Step 1</div>
      </div>
      <div className="progress-bar" style={{ width: '50px', height: '10px' }}>
        <ProgressBar
          animate={false}
          stripes={false}
          intent={step === 1 ? Intent.PRIMARY : step === 2 ? Intent.WARNING : Intent.SUCCESS}
          value={step / 2}
        />
      </div>
      <div className="progress-step">
        <div className={`step-number ${step >= 2 ? 'active' : ''}`}>2</div>
        <div className={`step-label ${step >= 2 ? 'active' : ''}`}>Step 2</div>
      </div>
      <div className="progress-bar" style={{ width: '50px', height: '10px' }}>
        <ProgressBar
          animate={false}
          stripes={false}
          intent={step === 2 ? Intent.PRIMARY : step === 3 ? Intent.WARNING : Intent.SUCCESS}
          value={(step - 1) / 2}
        />
      </div>
      <div className="progress-step">
        <div className={`step-number ${step === 3 ? 'active' : ''}`}>3</div>
        <div className={`step-label ${step === 3 ? 'active' : ''}`}>Step 3</div>
      </div>
    </div>
  );
}

export default ProgressTracker;
