export type SavedAddressListModalProps = {
  visible: boolean;
  addresses: string[];
  onClose: () => void;
  onSelect: (address: string) => void;
};
