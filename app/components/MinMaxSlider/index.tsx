import {
  FieldError,
  Label,
  Slider,
  SliderOutput,
  type SliderProps,
  SliderThumb,
  SliderTrack,
  Text,
  type ValidationResult,
} from 'react-aria-components';

import { parseClassName } from '@/util/parse-class-name';

import './styles.css';

export interface MinMaxSliderProps extends SliderProps<[number, number]> {
  label?: string;
  description?: string;
  errorMessage?: string | ((validation: ValidationResult) => string);
  isLoading?: boolean;
  thumbLabels?: string[];
  className?: string;
}

const MinMaxSlider = ({
  label,
  description,
  errorMessage,
  isLoading,
  thumbLabels,
  className,
  ...props
}: MinMaxSliderProps) => {
  const finalClassName = parseClassName('form-control', 'min-max-slider-component', className);

  return isLoading ? (
    <div className={`${finalClassName} w-full pb-4`}>
      <div className="flex flex-col gap-2 w-full">
        <div className="skeleton w-1/4 h-6" />
        <div className="skeleton w-full h-6" />
      </div>
    </div>
  ) : (
    <Slider {...props} className={finalClassName}>
      <div className="flex gap-2 w-full">
        {label && <Label>{label}</Label>}
        <SliderOutput>
          {({ state }) => state.values.map((_, i) => state.getThumbValueLabel(i)).join(' – ')}
        </SliderOutput>
      </div>
      <div className="overflow-hidden">
        <SliderTrack>
          {({ state }) =>
            state.values.map((_, i) => (
              <SliderThumb key={i} index={i} aria-label={thumbLabels?.[i]} />
            ))
          }
        </SliderTrack>
      </div>
      {description && <Text slot="description">{description}</Text>}
      {errorMessage && <FieldError>{errorMessage}</FieldError>}
    </Slider>
  );
};

export default MinMaxSlider;
