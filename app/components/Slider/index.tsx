import {
  Slider as AriaSlider,
  type SliderProps as AriaSliderProps,
  FieldError,
  Label,
  SliderOutput,
  SliderThumb,
  SliderTrack,
  Text,
  type ValidationResult,
} from 'react-aria-components';

import { parseClassName } from '@/util/parse-class-name';

import './styles.css';

export interface SliderProps extends AriaSliderProps<number> {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  isLoading?: boolean;
  thumbLabel?: string;
  className?: string;
}

const Slider = ({
  label,
  description,
  errorMessage,
  isLoading,
  thumbLabel,
  className,
  ...props
}: SliderProps) => {
  const finalClassName = parseClassName('form-control', 'min-max-slider-component', className);

  return isLoading ? (
    <div className={`${finalClassName} w-full pb-4`}>
      <div className="flex flex-col gap-2 w-full">
        <div className="skeleton w-1/4 h-6" />
        <div className="skeleton w-full h-6" />
      </div>
    </div>
  ) : (
    <AriaSlider {...props} className={finalClassName}>
      <div className="flex gap-2 w-full">
        {label && <Label>{label}</Label>}
        <SliderOutput>{({ state }) => state.getThumbValueLabel(state.values[0])}</SliderOutput>
      </div>
      <div className="overflow-hidden">
        <SliderTrack>
          <SliderThumb index={0} aria-label={thumbLabel} />
        </SliderTrack>
      </div>
      {description && <Text slot="description">{description}</Text>}
      {errorMessage && <FieldError>{errorMessage}</FieldError>}
    </AriaSlider>
  );
};

export default Slider;
