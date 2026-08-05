import SharedToggleImmutableModal, {
  type ToggleImmutableModalProps,
} from '@/shared/components/toggle-immutable-modal';

export default function ToggleImmutableModal(props: ToggleImmutableModalProps) {
  return <SharedToggleImmutableModal entityName="exam" {...props} />;
}
