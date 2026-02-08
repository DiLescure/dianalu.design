import { type ForwardedRef, forwardRef, useCallback, useEffect, useState } from 'react';
import { TextField as AriaTextField, FieldError, Label, Text } from 'react-aria-components';

import { parseClassName } from '@/util/parse-class-name';

import './styles.css';

type NotesProps = {
  label: string;
  defaultValue?: string;
  onChange: (value: string) => void;
  isDisabled?: boolean;
  isLoading?: boolean;
  errorMessage?: string;
  description?: string;
  className?: string;
};

const DefaultEditor = forwardRef(function DefaultEditor(
  props: any,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const [isWysiwygLoaded, setIsWysiwygLoaded] = useState(false);
  const [WysiwygComponents, setWysiwygComponents] = useState<any>(null);

  useEffect(() => {
    const loadWysiwyg = async () => {
      try {
        const wysiwygModule = await import('react-simple-wysiwyg');

        setWysiwygComponents({
          Editor: wysiwygModule.Editor,
          EditorProvider: wysiwygModule.EditorProvider,
          Toolbar: wysiwygModule.Toolbar,
          BtnBold: wysiwygModule.BtnBold,
          BtnBulletList: wysiwygModule.BtnBulletList,
          BtnClearFormatting: wysiwygModule.BtnClearFormatting,
          BtnItalic: wysiwygModule.BtnItalic,
          BtnLink: wysiwygModule.BtnLink,
          BtnNumberedList: wysiwygModule.BtnNumberedList,
          BtnRedo: wysiwygModule.BtnRedo,
          BtnStrikeThrough: wysiwygModule.BtnStrikeThrough,
          BtnUnderline: wysiwygModule.BtnUnderline,
          BtnUndo: wysiwygModule.BtnUndo,
          HtmlButton: wysiwygModule.HtmlButton,
          Separator: wysiwygModule.Separator,
        });

        setIsWysiwygLoaded(true);
      } catch (error) {
        console.error('Failed to load WYSIWYG editor:', error);
      }
    };

    loadWysiwyg();
  }, []);

  if (!isWysiwygLoaded || !WysiwygComponents) {
    return (
      <div className="w-full border border-base-300">
        <div className="skeleton w-full h-32" />
      </div>
    );
  }

  const {
    Editor,
    EditorProvider,
    Toolbar,
    BtnBold,
    BtnBulletList,
    BtnClearFormatting,
    BtnItalic,
    BtnLink,
    BtnNumberedList,
    BtnRedo,
    BtnStrikeThrough,
    BtnUnderline,
    BtnUndo,
    HtmlButton,
    Separator,
  } = WysiwygComponents;

  return (
    <EditorProvider>
      <Editor {...props} ref={ref}>
        <Toolbar>
          <BtnUndo />
          <BtnRedo />
          <Separator />
          <BtnBold />
          <BtnItalic />
          <BtnUnderline />
          <BtnStrikeThrough />
          <Separator />
          <BtnNumberedList />
          <BtnBulletList />
          <Separator />
          <BtnLink />
          <BtnClearFormatting />
          <HtmlButton />
        </Toolbar>
      </Editor>
    </EditorProvider>
  );
});

export const NotesField: React.FC<NotesProps> = ({
  label,
  defaultValue,
  onChange,
  isDisabled,
  isLoading,
  errorMessage,
  description,
  className,
}) => {
  const [value, setValue] = useState('');

  useEffect(() => {
    if (defaultValue) {
      setValue(defaultValue);
    }
  }, []);

  const onEditorChange = useCallback(
    (event: any) => {
      setValue(event.target.value);
      onChange(event.target.value);
    },
    [onChange],
  );

  const finalClassName = parseClassName('notes-field-component', className);

  return isLoading ? (
    <div className={`${finalClassName} w-full pb-4`}>
      <div className="flex flex-col gap-2 w-full">
        <div className="skeleton w-1/4 h-6" />
        <div className="skeleton w-full h-18" />
      </div>
    </div>
  ) : (
    <>
      <AriaTextField className={`${finalClassName} form-control`} isInvalid={!!errorMessage}>
        {label && <Label>{label}</Label>}
        <div className="notes-field">
          <DefaultEditor value={value || ''} onChange={onEditorChange} disabled={isDisabled} />
        </div>
        {description && <Text slot="description">{description}</Text>}
        {errorMessage && <FieldError>{errorMessage}</FieldError>}
      </AriaTextField>
    </>
  );
};

export { DefaultEditor };
