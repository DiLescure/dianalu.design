import BreadcrumbsTale from '@/components/Breadcrumbs/index.tale';
import ButtonTale from '@/components/Button/index.tale';
import ColorSchemeButtonTale from '@/components/ColorSchemeButton/index.tale';
import ComboBoxTale from '@/components/ComboBox/index.tale';
import CopyButtonTale from '@/components/CopyButton/index.tale';
import DataTableTale from '@/components/DataTable/index.tale';
import DatePickerTale from '@/components/DatePicker/index.tale';
import DateRangePickerTale from '@/components/DateRangePicker/index.tale';
import HeadingTale from '@/components/Heading/index.tale';
import IconTale from '@/components/Icon/index.tale';
import KanbanTale from '@/components/Kanban/index.tale';
import LinkTale from '@/components/Link/index.tale';
import NuqsTale from '@/components/Link/nuqs.tale';
import LoadingOverlayTale from '@/components/LoadingOverlay/index.tale';
import MinMaxSliderTale from '@/components/MinMaxSlider/index.tale';
import ModalBasicTale from '@/components/Modal/basic.tale';
import ModalFormTale from '@/components/Modal/form.tale';
import NotesFieldTale from '@/components/NotesField/index.tale';
import SliderTale from '@/components/Slider/index.tale';
import TaleforgeBasicsTale from '@/components/Taleforge/basics.tale';
import TaleforgeGettingStartedTale from '@/components/Taleforge/getting-started.tale';
import TaleforgeIntroTale from '@/components/Taleforge/index.tale';
import type { TaleContent } from '@/components/Taleforge/types';
import TextAreaTale from '@/components/TextArea/index.tale';
import TextFieldTale from '@/components/TextField/index.tale';
import TimeFieldTale from '@/components/TimeField/index.tale';
import ToastTale from '@/components/Toast/index.tale';
import TutorialModalTale from '@/components/TutorialModal/index.tale';
import ApiServiceTale from '@/services/api/index.tale';
import OverlayServiceTale from '@/services/overlay/index.tale';
import ThemeServiceTale from '@/services/theme/index.tale';

export default {
  'components/Breadcrumbs/index.tale': BreadcrumbsTale,
  'components/Button/index.tale': ButtonTale,
  'components/ColorSchemeButton/index.tale': ColorSchemeButtonTale,
  'components/ComboBox/index.tale': ComboBoxTale,
  'components/CopyButton/index.tale': CopyButtonTale,
  'components/DataTable/index.tale': DataTableTale,
  'components/DatePicker/index.tale': DatePickerTale,
  'components/DateRangePicker/index.tale': DateRangePickerTale,
  'components/Heading/index.tale': HeadingTale,
  'components/Icon/index.tale': IconTale,
  'components/Kanban/index.tale': KanbanTale,
  'components/Link/index.tale': LinkTale,
  'components/Link/nuqs.tale': NuqsTale,
  'components/LoadingOverlay/index.tale': LoadingOverlayTale,
  'components/Slider/index.tale': SliderTale,
  'components/MinMaxSlider/index.tale': MinMaxSliderTale,
  'components/Modal/basic.tale': ModalBasicTale,
  'components/Modal/form.tale': ModalFormTale,
  'components/NotesField/index.tale': NotesFieldTale,
  'components/Taleforge/basics.tale': TaleforgeBasicsTale,
  'components/Taleforge/getting-started.tale': TaleforgeGettingStartedTale,
  'components/Taleforge/index.tale': TaleforgeIntroTale,
  'components/TextArea/index.tale': TextAreaTale,
  'components/TextField/index.tale': TextFieldTale,
  'components/TimeField/index.tale': TimeFieldTale,
  'components/Toast/index.tale': ToastTale,
  'components/TutorialModal/index.tale': TutorialModalTale,
  'services/api/index.tale': ApiServiceTale,
  'services/overlay/index.tale': OverlayServiceTale,
  'services/theme/index.tale': ThemeServiceTale,
} as unknown as Record<string, TaleContent>;
