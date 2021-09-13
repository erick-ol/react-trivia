import * as React from 'react';
import './style.css';

function Loading() {
  return (
    <div className="loading">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 60 100">
        <circle fill="#fff" cx={ 6 } cy={ 50 } r={ 6 }>
          <animate
            attributeName="opacity"
            dur="1s"
            values="0;1;0"
            repeatCount="indefinite"
            begin={ 0.1 }
          />
        </circle>
        <circle fill="#fff" cx={ 26 } cy={ 50 } r={ 6 }>
          <animate
            attributeName="opacity"
            dur="1s"
            values="0;1;0"
            repeatCount="indefinite"
            begin={ 0.2 }
          />
        </circle>
        <circle fill="#fff" cx={ 46 } cy={ 50 } r={ 6 }>
          <animate
            attributeName="opacity"
            dur="1s"
            values="0;1;0"
            repeatCount="indefinite"
            begin={ 0.3 }
          />
        </circle>
      </svg>
    </div>
  );
}

export default Loading;
