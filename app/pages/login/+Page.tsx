import { useEffect, useState } from 'react';

import Button from '@/components/Button';
import Link from '@/components/Link';
import { useApi } from '@/services/api';
import eventService from '@/services/event';
import Countdown from '@/util/countdown';

import CodeForm from './CodeForm';
import EmailForm from './EmailForm';

import './styles.css';
import { GOBACK_URL_LOCAL_STORAGE_KEY } from '@/config';

let countdown: Countdown | null = null;

const retryCountDownTime = 60000;

const loginSuccessRedirect = () => {
  if (typeof window !== 'undefined') {
    const currentUrl = `${window.location.pathname}${window.location.search}`;
    let destinationUrl = /(\/https?:?\/\/|\/\/\/)(.*)/.exec(currentUrl)?.[2] || '';

    if (destinationUrl) {
      destinationUrl = `//${destinationUrl}`;
      window.localStorage.setItem(GOBACK_URL_LOCAL_STORAGE_KEY, destinationUrl);
      console.log('Saved goBackUrl to window.:', destinationUrl);
    }

    setTimeout(() => {
      // On any other route, check if we have a saved URL to go back to
      try {
        const goBackUrl = window.localStorage.getItem(GOBACK_URL_LOCAL_STORAGE_KEY);

        if (goBackUrl) {
          // Clear the saved URL first
          window.localStorage.removeItem(GOBACK_URL_LOCAL_STORAGE_KEY);
          console.log('Redirecting to saved goBackUrl:', goBackUrl);

          const destination = decodeURIComponent(goBackUrl).replace(/([^/])\?/, '$1/?');

          if (destination) {
            window.location.replace(destination);
          }
        } else {
          window.location.replace('/');
        }
      } catch (error) {
        console.error('Failed to retrieve or process goBackUrl from localStorage:', error);
      }
    }, 500);
  }
};

const Page = () => {
  const { restApiClient } = useApi() || {};

  const [email, setEmail] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [codeSent, setCodeSent] = useState(false);
  const [code, setCode] = useState('');
  const [retryCodeSend, setRetryCodeSend] = useState(false);
  const [countdownValue, setCountdownValue] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!countdown) {
      countdown = new Countdown(
        retryCountDownTime,
        () => {},
        () => {},
      );
    }

    if (countdown) {
      countdown.onTick = (countdownValue) => {
        setCountdownValue(Number((countdownValue * 0.00001 * retryCountDownTime).toFixed(0)));
      };

      countdown.onEnd = () => {
        setRetryCodeSend(true);
      };
    }
  }, []);

  const handleEmailChange = (email: string, isValid: boolean) => {
    setEmail(email);
    setIsValid(isValid);
  };

  const handleCodeChange = (code: string, isValid: boolean) => {
    setCode(code.toUpperCase());
    setIsValid(isValid);
  };

  const handleContinue = async () => {
    setIsLoading(true);

    if (!codeSent) {
      const response = await restApiClient
        ?.post('users/login/code', {
          json: {
            email,
          },
        })
        .text()
        .catch(async (error) => {
          const errorText = await error?.response?.text();

          eventService.emit('overlay:request-toast-queue-add', {
            message: errorText || error.message,
            level: 'error',
          });

          return null;
        });

      setIsLoading(false);

      if (response) {
        eventService.emit('overlay:request-toast-queue-add', {
          message: response,
          level: 'success',
        });

        setRetryCodeSend(false);
        setCodeSent(true);
        setCountdownValue(retryCountDownTime * 0.001);
        countdown?.restart();
        setIsValid(false);
      }
    } else {
      const response = await restApiClient
        ?.post('users/login/code/validate', {
          json: {
            code,
          },
        })
        .text()
        .catch(async (error) => {
          const errorText = await error?.response?.text();

          eventService.emit('overlay:request-toast-queue-add', {
            message: errorText || error.message,
            level: 'error',
          });

          return null;
        });

      setIsLoading(false);

      if (response) {
        eventService.emit('overlay:request-toast-queue-add', {
          message: response,
          level: 'success',
        });

        loginSuccessRedirect();
      }
    }
  };

  const handleRetryCodeSend = () => {
    setCodeSent(false);
    setCode('');
    setEmail('');
    setIsValid(false);
    countdown?.restart();
  };

  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Left Column - Login Card (Hidden on mobile, visible on lg+) */}
      <div className="flex items-center justify-center bg-gradient-to-br from-primary to-secondary lg:bg-none lg:bg-base-100 p-8">
        <div className="card w-full max-w-md bg-base-200 shadow-xl border border-base-300">
          <div className="card-body">
            <h2 className="card-title text-2xl font-bold text-center mb-2">
              {codeSent ? 'Enter Code' : 'Get Started'}
            </h2>
            <p className={`text-base-content/70 ${codeSent ? 'text-center' : ''} mb-6`}>
              {codeSent
                ? 'Enter the verification code sent to your email'
                : 'Enter your email address to begin your journey with us'}
            </p>

            <div className="space-y-4">
              {codeSent ? (
                <CodeForm onChange={handleCodeChange} onPressEnter={handleContinue} />
              ) : (
                <EmailForm onChange={handleEmailChange} onPressEnter={handleContinue} />
              )}
              <div className="form-control mt-6">
                <Button
                  className="w-full btn-primary"
                  isDisabled={!isValid}
                  isLoading={isLoading}
                  onPress={handleContinue}
                >
                  {retryCodeSend && !codeSent ? 'Resend code' : 'Continue'}
                </Button>
              </div>
              {codeSent &&
                (countdownValue > 0 ? (
                  <div className="text-center text-sm text-base-content/70 mb-4">
                    Resend code in {countdownValue} seconds
                  </div>
                ) : (
                  <Button
                    className="w-full btn-link m-0 p-0 h-auto mb-4"
                    onPress={handleRetryCodeSend}
                  >
                    Resend code
                  </Button>
                ))}
            </div>

            {/* <div className="divider text-xs text-base-content/50">or</div> */}

            <p className="text-xs text-center text-base-content/60">
              By continuing, you agree to our&nbsp;
              <Link to="/" className="link link-primary">
                Terms of Service
              </Link>
              &nbsp;and&nbsp;
              <Link to="/" className="link link-primary">
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right Column - Hero/Welcome Section */}
      <div className="hidden lg:flex items-center justify-center bg-gradient-to-br from-primary to-secondary p-8 text-primary-content">
        <div className="text-center max-w-md">
          <div className="mb-8">
            <div className="w-20 h-20 bg-primary-content/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
                <title>Login Icon</title>
                <path
                  fillRule="evenodd"
                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <h1 className="text-4xl font-bold mb-4">Welcome Back</h1>
            <p className="text-lg opacity-90 mb-6">
              Join thousands of users who trust our platform for their daily workflow
            </p>
          </div>

          <div className="space-y-4 text-left">
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-primary-content rounded-full" />
              <span className="opacity-90">Secure and reliable platform</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-primary-content rounded-full" />
              <span className="opacity-90">24/7 customer support</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-primary-content rounded-full" />
              <span className="opacity-90">Easy setup in minutes</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
