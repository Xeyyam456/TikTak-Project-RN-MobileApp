import { useMemo } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import ErrorState from '@shared/components/ErrorState';
import ScreenHeader from '@shared/components/ScreenHeader';
import useReload from '@shared/hooks/useReload';
import { getProfile } from '@shared/services/profile.service';
import { queryKeys } from '@shared/queries/queryKeys';
import { getApiErrorMessage } from '@shared/utils/apiError';
import AccountInfoForm from '../AccountInfoForm';
import { useTheme } from '../../../../theme/ThemeContext';
import { createStyles } from './AccountInfoScreen.styles';

function AccountInfoScreen() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const { colors } = useTheme();
  const styles = useMemo(() => createStyles(colors), [colors]);
  const { t } = useTranslation();

  const {
    data: profile,
    isPending: loading,
    error: queryError,
    refetch,
  } = useQuery({ queryKey: queryKeys.profile, queryFn: getProfile });
  const loadError = queryError ? getApiErrorMessage(queryError) : undefined;

  const { refreshing, onRefresh } = useReload(refetch);

  return (
    <View style={[styles.flex, { paddingTop: insets.top }]}>
      <ScreenHeader title={t('accountInfo.title')} onBack={() => navigation.goBack()} />

      {loadError ? (
        <ErrorState message={loadError} onRetry={refetch} />
      ) : loading ? (
        <ActivityIndicator color={colors.primary} style={styles.loader} />
      ) : (
        <AccountInfoForm
          profile={profile}
          refreshing={refreshing}
          onRefresh={onRefresh}
        />
      )}
    </View>
  );
}

export default AccountInfoScreen;
