import { Image, Modal, TouchableOpacity } from 'react-native';
import { styles } from './PhotoViewerModal.styles';
import type { PhotoViewerModalProps } from './PhotoViewerModal.types';

/** Full-screen photo viewer; tapping anywhere dismisses it. */
function PhotoViewerModal({ visible, imageUrl, onClose }: PhotoViewerModalProps) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPress={onClose}
      >
        {imageUrl && (
          <Image
            source={{ uri: imageUrl }}
            style={styles.image}
            resizeMode="contain"
          />
        )}
      </TouchableOpacity>
    </Modal>
  );
}

export default PhotoViewerModal;
