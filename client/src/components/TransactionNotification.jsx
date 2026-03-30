import React, { useEffect, useState } from 'react';import React from 'react';import React from 'react';



const TransactionNotification = ({ import { AiOutlineCheckCircle, AiOutlineCloseCircle, AiOutlineInfoCircle } from 'react-icons/ai';

  message, 

  type = 'info', const TransactionNotification = ({ message, type, onClose }) => {

  visible = false, 

  onClose,   const getTypeStyles = () => {const TransactionNotification = ({ status, onClose }) => {

  autoHide = true, 

  duration = 5000     switch (type) {  if (!status.visible) return null;

}) => {

  const [isVisible, setIsVisible] = useState(visible);      case 'success':

  const [isAnimating, setIsAnimating] = useState(false);

        return 'bg-green-100 border-green-400 text-green-700';  const getIcon = () => {

  useEffect(() => {

    if (visible) {      case 'error':    switch (status.type) {

      setIsVisible(true);

      setIsAnimating(true);        return 'bg-red-100 border-red-400 text-red-700';      case 'success':

      

      if (autoHide) {      case 'warning':        return <AiOutlineCheckCircle className="text-green-500 text-xl" />;

        const timer = setTimeout(() => {

          handleClose();        return 'bg-yellow-100 border-yellow-400 text-yellow-700';      case 'error':

        }, duration);

              case 'info':        return <AiOutlineCloseCircle className="text-red-500 text-xl" />;

        return () => clearTimeout(timer);

      }      default:      case 'info':

    }

  }, [visible, autoHide, duration]);        return 'bg-blue-100 border-blue-400 text-blue-700';        return <AiOutlineInfoCircle className="text-blue-500 text-xl" />;



  const handleClose = () => {    }      default:

    setIsAnimating(false);

    setTimeout(() => {  };        return <AiOutlineInfoCircle className="text-gray-500 text-xl" />;

      setIsVisible(false);

      onClose?.();    }

    }, 300);

  };  const getIcon = () => {  };



  const getTypeStyles = () => {    switch (type) {

    switch (type) {

      case 'success':      case 'success':  const getBgColor = () => {

        return {

          bg: 'bg-green-900/90',        return (    switch (status.type) {

          border: 'border-green-400',

          text: 'text-green-300',          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">      case 'success':

          icon: (

            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />        return 'bg-green-900/30 border-green-500';

              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />

            </svg>          </svg>      case 'error':

          )

        };        );        return 'bg-red-900/30 border-red-500';

      case 'error':

        return {      case 'error':      case 'info':

          bg: 'bg-red-900/90',

          border: 'border-red-400',        return (        return 'bg-blue-900/30 border-blue-500';

          text: 'text-red-300',

          icon: (          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">      default:

            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">

              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />        return 'bg-gray-900/30 border-gray-500';

            </svg>

          )          </svg>    }

        };

      case 'warning':        );  };

        return {

          bg: 'bg-yellow-900/90',      case 'warning':

          border: 'border-yellow-400',

          text: 'text-yellow-300',        return (  const getTextColor = () => {

          icon: (

            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">    switch (status.type) {

              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />

            </svg>            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />      case 'success':

          )

        };          </svg>        return 'text-green-400';

      case 'loading':

        return {        );      case 'error':

          bg: 'bg-blue-900/90',

          border: 'border-blue-400',      default:        return 'text-red-400';

          text: 'text-blue-300',

          icon: (        return (      case 'info':

            <svg className="w-6 h-6 animate-spin" fill="none" viewBox="0 0 24 24">

              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">        return 'text-blue-400';

              <path className="opacity-75" fill="currentColor" d="m4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>

            </svg>            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />      default:

          )

        };          </svg>        return 'text-gray-400';

      default:

        return {        );    }

          bg: 'bg-gray-900/90',

          border: 'border-gray-400',    }  };

          text: 'text-gray-300',

          icon: (  };

            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">

              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />  return (

            </svg>

          )  return (    <div className={`fixed top-4 right-4 max-w-md p-4 rounded-lg border ${getBgColor()} backdrop-blur-sm z-50 shadow-lg animate-fade-in`}>

        };

    }    <div className={`border px-4 py-3 rounded-lg shadow-md flex items-center justify-between ${getTypeStyles()}`}>      <div className="flex items-start space-x-3">

  };

      <div className="flex items-center">        <div className="flex-shrink-0 mt-0.5">

  if (!isVisible) {

    return null;        <div className="mr-3">          {getIcon()}

  }

          {getIcon()}        </div>

  const styles = getTypeStyles();

        </div>        <div className="flex-1">

  return (

    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 pointer-events-none">        <div>          <p className={`text-sm ${getTextColor()} leading-relaxed`}>

      <div

        className={`          <p className="font-medium">{message}</p>            {status.message}

          max-w-md w-full ${styles.bg} ${styles.border} ${styles.text} 

          border rounded-lg shadow-2xl backdrop-blur-sm pointer-events-auto        </div>          </p>

          transform transition-all duration-300 ease-in-out

          ${isAnimating       </div>        </div>

            ? 'translate-y-0 opacity-100 scale-100' 

            : '-translate-y-4 opacity-0 scale-95'              <button

          }

        `}      {onClose && (          onClick={onClose}

      >

        <div className="p-4">        <button          className="flex-shrink-0 text-gray-400 hover:text-white transition-colors duration-200"

          <div className="flex items-start">

            <div className="flex-shrink-0">          onClick={onClose}        >

              {styles.icon}

            </div>          className="ml-4 text-gray-400 hover:text-gray-600"          <AiOutlineCloseCircle className="text-lg" />

            <div className="ml-3 w-0 flex-1">

              <p className="text-sm font-medium">        >        </button>

                {message}

              </p>          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">      </div>

            </div>

            <div className="ml-4 flex-shrink-0 flex">            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />    </div>

              <button

                onClick={handleClose}          </svg>  );

                className={`

                  rounded-md inline-flex ${styles.text} hover:text-white         </button>};

                  focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white

                  transition-colors duration-200      )}

                `}

              >    </div>export default TransactionNotification;

                <span className="sr-only">Close</span>

                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">  );

                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />};

                </svg>

              </button>export default TransactionNotification;
            </div>
          </div>
        </div>
        
        {/* Progress bar for auto-hide */}
        {autoHide && type !== 'loading' && (
          <div className="h-1 bg-gray-700">
            <div 
              className={`h-full ${type === 'success' ? 'bg-green-400' : type === 'error' ? 'bg-red-400' : type === 'warning' ? 'bg-yellow-400' : 'bg-blue-400'}`}
              style={{
                animation: `shrink ${duration}ms linear forwards`
              }}
            />
          </div>
        )}
      </div>
      
      <style jsx>{`
        @keyframes shrink {
          from {
            width: 100%;
          }
          to {
            width: 0%;
          }
        }
      `}</style>
    </div>
  );
};

export default TransactionNotification;