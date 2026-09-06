import { useMemo } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { useTranslation } from 'react-i18next';
import { GridIcon } from '@shared/components/icons';
import { useTheme } from '../../../../theme/ThemeContext';
import { createStyles } from './BackToCategoriesButton.styles';

function BackToCategoriesButton({ onPress }: { onPress: () => void }) {
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const { t } = useTranslation();

  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <GridIcon size={18} />
      <Text style={styles.label}>{t('categoryProducts.backToCategories')}</Text>
    </TouchableOpacity>
  );
}

export default BackToCategoriesButton;
