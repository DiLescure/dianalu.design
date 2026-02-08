'use client';
import { FieldLabel as Label, useField } from '@payloadcms/ui';
import Editor, { type ContentEditableEvent } from 'react-simple-wysiwyg';

type NotesProps = {
  path: string;
  required?: boolean;
};

const NotesComponent: React.FC<NotesProps> = ({ path, required }) => {
  const { value, setValue } = useField<string>({ path });

  const onChange = (e: ContentEditableEvent) => {
    setValue(e.target.value);
  };

  return (
    <div className="field-type">
      <Label label="Notes" required={required} />
      <Editor value={value} onChange={onChange} />
    </div>
  );
};

export default NotesComponent;
