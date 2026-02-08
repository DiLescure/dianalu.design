import {
  Button as ReactAriaButton,
  type ButtonProps as ReactAriaButtonProps,
} from 'react-aria-components';

import Icon, { type IconName } from '@/components/Icon';
import { parseClassName } from '@/util/parse-class-name';

import './styles.css';

export type ButtonProps = ReactAriaButtonProps &
  React.RefAttributes<HTMLButtonElement> & {
    isLoading?: boolean;
    iconName?: IconName | null;
    iconClassName?: string;
  };

const Button = (props: ButtonProps) => {
  const { isLoading, iconName, iconClassName, children, className, ...rest } = props;

  const buttonClasses = parseClassName('button-component react-aria-Button btn', className);

  return (
    <ReactAriaButton {...rest} className={buttonClasses} isPending={isLoading}>
      {({ isPending }) => (
        // @ts-ignore
        <>
          {iconName && <Icon name={iconName} className={iconClassName || ''} />}
          {!isPending && children}
          {isPending && <span className="loading loading-spinner loading-sm" />}
        </>
      )}
    </ReactAriaButton>
  );
};

export default Button;
