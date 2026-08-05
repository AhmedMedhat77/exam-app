import ImmutableStatusDialog, {
  type ImmutableStatusDialogProps,
} from '@/shared/components/immutable-status-dialog';

export default function ExamImmutableStatusDialog(
  props: ImmutableStatusDialogProps
) {
  return <ImmutableStatusDialog entityName="exam" {...props} />;
}
