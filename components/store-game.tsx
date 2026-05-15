import { BLOKITO_THEMES } from '@/constants/blokito-themes';
import { useBlokitoStore } from '@/contexts/blokito-store';
import { styles } from '@/components/styles/styles';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import * as Haptics from 'expo-haptics';
import { Image, Pressable, ScrollView, Text, useColorScheme, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export function Store() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const {
    activeThemeId,
    buyTheme,
    muted,
    ownedThemeIds,
    points,
    setActiveTheme,
    toggleMuted,
  } = useBlokitoStore();

  function handleThemePress(themeId: string) {
    const owned = ownedThemeIds.includes(themeId);
    const success = owned ? true : buyTheme(themeId);

    if (owned) {
      setActiveTheme(themeId);
    }

    Haptics.notificationAsync(
      success ? Haptics.NotificationFeedbackType.Success : Haptics.NotificationFeedbackType.Warning
    );
  }

  return (
    <SafeAreaView style={[styles.safeArea, isDark && styles.safeAreaDark]}>
      <ScrollView contentContainerStyle={styles.screen} showsVerticalScrollIndicator={false}>
        <View style={styles.storeHeader}>
          <View>
            <Text style={[styles.appName, isDark && styles.textLight]}>Loja</Text>
            <Text style={[styles.caption, isDark && styles.captionDark]}>
              Temas, blocos e musicas
            </Text>
          </View>

          <View style={styles.storeWallet}>
            <MaterialIcons name="savings" size={26} color="#FFFFFF" />
            <Text style={styles.storeWalletText}>{points} pontos acumulados</Text>
          </View>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel={muted ? 'Ativar musica' : 'Silenciar musica'}
            onPress={toggleMuted}
            style={({ pressed }) => [
              styles.storeMutedButton,
              isDark && styles.panelDark,
              pressed && styles.pressed,
            ]}>
            <MaterialIcons
              name={muted ? 'volume-off' : 'volume-up'}
              size={20}
              color={isDark ? '#F5F8FC' : '#171B22'}
            />
            <Text style={[styles.statusText, isDark && styles.textLight]}>
              {muted ? 'Musica desligada' : 'Musica ligada'}
            </Text>
          </Pressable>
        </View>

        {BLOKITO_THEMES.map((theme) => {
          const owned = ownedThemeIds.includes(theme.id);
          const active = activeThemeId === theme.id;
          const canBuy = points >= theme.price;
          const buttonLabel = active ? 'Ativo' : owned ? 'Usar' : `Comprar`;
          const disabled = active || (!owned && !canBuy);

          return (
            <View key={theme.id} style={[styles.storeCard, isDark && styles.panelDark]}>
              <View style={styles.storeCardHeader}>
                <Text style={[styles.storeTitle, isDark && styles.textLight]}>{theme.name}</Text>
                {theme.musicTitle ? (
                  <MaterialIcons name="music-note" size={23} color={theme.accent} />
                ) : null}
              </View>

              <Text style={[styles.storeDescription, isDark && styles.captionDark]}>
                {theme.description}
              </Text>

              <View
                style={[
                  styles.themePreview,
                  {
                    backgroundColor: theme.boardBackground,
                    borderColor: theme.boardBorder,
                  },
                ]}>
                {theme.palette.slice(0, 5).map((tone, index) => {
                  const previewImage = theme.blockImages?.[index % theme.blockImages.length];

                  return (
                    <View
                      key={`${theme.id}-${tone.color}-${index}`}
                      style={[
                        styles.themePreviewBlock,
                        {
                          backgroundColor: tone.color,
                          borderColor: tone.glow,
                        },
                      ]}>
                      {previewImage ? (
                        <Image
                          source={previewImage}
                          style={styles.blockCellImage}
                          resizeMode="cover"
                        />
                      ) : theme.blockIcon ? (
                        <MaterialIcons name={theme.blockIcon} size={20} color="#FFFFFFAA" />
                      ) : null}
                    </View>
                  );
                })}
              </View>

              <View style={styles.storeActions}>
                <Text style={[styles.themePrice, isDark && styles.textLight]}>
                  {owned ? 'Comprado' : `${theme.price} pts`}
                </Text>

                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel={`${buttonLabel} ${theme.name}`}
                  disabled={disabled}
                  onPress={() => handleThemePress(theme.id)}
                  style={({ pressed }) => [
                    styles.storeButton,
                    {
                      backgroundColor: disabled ? '#CBD5E1' : theme.accent,
                    },
                    disabled && styles.storeButtonDisabled,
                    pressed && styles.pressed,
                  ]}>
                  <MaterialIcons
                    name={owned ? 'check-circle' : 'shopping-bag'}
                    size={18}
                    color="#FFFFFF"
                  />
                  <Text style={styles.storeButtonText}>{buttonLabel}</Text>
                </Pressable>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}
