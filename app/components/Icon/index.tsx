import ArrowDownSFillIcon from 'remixicon/icons/Arrows/arrow-down-s-fill.svg?react';
import ArrowLeftIcon from 'remixicon/icons/Arrows/arrow-left-s-line.svg?react';
import ArrowRightIcon from 'remixicon/icons/Arrows/arrow-right-s-line.svg?react';
import ArrowUpSFillIcon from 'remixicon/icons/Arrows/arrow-up-s-fill.svg?react';
import CalendarIcon from 'remixicon/icons/Business/calendar-line.svg?react';
import SendPlaneIcon from 'remixicon/icons/Business/send-plane-fill.svg?react';
import ChatNewIcon from 'remixicon/icons/Communication/chat-new-line.svg?react';
import EditIcon from 'remixicon/icons/Design/edit-line.svg?react';
import SaveIcon from 'remixicon/icons/Device/save-line.svg?react';
import BookOpenIcon from 'remixicon/icons/Document/book-open-line.svg?react';
import ClipboardIcon from 'remixicon/icons/Document/clipboard-line.svg?react';
import FileTextIcon from 'remixicon/icons/Document/file-text-line.svg?react';
import LinkIcon from 'remixicon/icons/Editor/link.svg?react';
import ImageIcon from 'remixicon/icons/Media/image-line.svg?react';
import AddIcon from 'remixicon/icons/System/add-circle-line.svg?react';
import CheckmarkIcon from 'remixicon/icons/System/check-line.svg?react';
import CheckboxBlankIcon from 'remixicon/icons/System/checkbox-blank-line.svg?react';
import SuccessIcon from 'remixicon/icons/System/checkbox-circle-line.svg?react';
import CheckboxIndeterminateIcon from 'remixicon/icons/System/checkbox-indeterminate-line.svg?react';
import CheckboxFilledIcon from 'remixicon/icons/System/checkbox-line.svg?react';
import RemoveIcon from 'remixicon/icons/System/close-circle-line.svg?react';
import ErrorIcon from 'remixicon/icons/System/close-circle-line.svg?react';
import CloseIcon from 'remixicon/icons/System/close-fill.svg?react';
import DeleteIcon from 'remixicon/icons/System/delete-bin-fill.svg?react';
import WarningIcon from 'remixicon/icons/System/error-warning-line.svg?react';
import InfoIcon from 'remixicon/icons/System/information-2-line.svg?react';
import RefreshIcon from 'remixicon/icons/System/refresh-line.svg?react';
import StarSmileIcon from 'remixicon/icons/User & Faces/star-smile-line.svg?react';
import MoonIcon from 'remixicon/icons/Weather/moon-line.svg?react';
import SunIcon from 'remixicon/icons/Weather/sun-line.svg?react';

import { parseClassName } from '@/util/parse-class-name';

import './styles.css';

export const availableIcons = {
  image: ImageIcon,
  dropdownArrow: ArrowDownSFillIcon,
  send: SendPlaneIcon,
  delete: DeleteIcon,
  close: CloseIcon,
  checkmark: CheckmarkIcon,
  starSmile: StarSmileIcon,
  add: AddIcon,
  remove: RemoveIcon,
  info: InfoIcon,
  warning: WarningIcon,
  success: SuccessIcon,
  error: ErrorIcon,
  edit: EditIcon,
  clipboard: ClipboardIcon,
  link: LinkIcon,
  calendar: CalendarIcon,
  arrowUp: ArrowUpSFillIcon,
  arrowLeft: ArrowLeftIcon,
  arrowRight: ArrowRightIcon,
  arrowDown: ArrowDownSFillIcon,
  bookOpen: BookOpenIcon,
  moon: MoonIcon,
  sun: SunIcon,
  save: SaveIcon,
  chatNew: ChatNewIcon,
  fileText: FileTextIcon,
  checkboxBlank: CheckboxBlankIcon,
  checkboxIndeterminate: CheckboxIndeterminateIcon,
  checkboxFilled: CheckboxFilledIcon,
  refresh: RefreshIcon,
};

export type IconName = keyof typeof availableIcons;

export const availableIconNames = Object.keys(availableIcons) as IconName[];

const Icon = ({ name, className }: { name?: IconName; className?: string }) => {
  const SelectedIcon = availableIcons[name || 'image'];

  return (
    <span className={parseClassName('icon-component', className)} data-icon-name={name}>
      <SelectedIcon />
    </span>
  );
};

export default Icon;
