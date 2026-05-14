import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAudioPlayer } from 'expo-audio';
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import {
  BLOKITO_THEMES,
  BlokitoTheme,
  DEFAULT_THEME_ID,
  getBlokitoTheme,
} from '@/constants/blokito-themes';

type BlokitoStoreState = {
  activeTheme: BlokitoTheme;
  activeThemeId: string;
  muted: boolean;
  ownedThemeIds: string[];
  points: number;
  ready: boolean;
  addPoints: (amount: number) => void;
  buyTheme: (themeId: string) => boolean;
  setActiveTheme: (themeId: string) => void;
  toggleMuted: () => void;
};

type PersistedStore = {
  activeThemeId: string;
  muted: boolean;
  ownedThemeIds: string[];
  points: number;
};

const STORAGE_KEY = '@blokito/store-v1';
const INITIAL_STATE: PersistedStore = {
  activeThemeId: DEFAULT_THEME_ID,
  muted: false,
  ownedThemeIds: [DEFAULT_THEME_ID],
  points: 0,
};

const BlokitoStoreContext = createContext<BlokitoStoreState | null>(null);

function sanitizeStoreState(value: Partial<PersistedStore>): PersistedStore {
  const knownThemeIds = new Set(BLOKITO_THEMES.map((theme) => theme.id));
  const ownedThemeIds = Array.from(
    new Set([DEFAULT_THEME_ID, ...(value.ownedThemeIds ?? [])].filter((id) => knownThemeIds.has(id)))
  );
  const activeThemeId =
    value.activeThemeId && ownedThemeIds.includes(value.activeThemeId)
      ? value.activeThemeId
      : DEFAULT_THEME_ID;

  return {
    activeThemeId,
    muted: Boolean(value.muted),
    ownedThemeIds,
    points: Math.max(0, Number(value.points) || 0),
  };
}

export function BlokitoStoreProvider({ children }: PropsWithChildren) {
  const [storeState, setStoreState] = useState<PersistedStore>(INITIAL_STATE);
  const [ready, setReady] = useState(false);
  const activeTheme = useMemo(
    () => getBlokitoTheme(storeState.activeThemeId),
    [storeState.activeThemeId]
  );
  const player = useAudioPlayer(activeTheme.musicSource ?? null, {
    keepAudioSessionActive: false,
    updateInterval: 1000,
  });

  useEffect(() => {
    let mounted = true;

    async function hydrateStore() {
      try {
        const rawState = await AsyncStorage.getItem(STORAGE_KEY);

        if (!mounted || !rawState) {
          return;
        }

        setStoreState(sanitizeStoreState(JSON.parse(rawState)));
      } catch (error) {
        console.warn('Nao foi possivel carregar a loja do Blokito.', error);
      } finally {
        if (mounted) {
          setReady(true);
        }
      }
    }

    hydrateStore();

    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    if (!ready) {
      return;
    }

    AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(storeState)).catch((error) => {
      console.warn('Nao foi possivel salvar a loja do Blokito.', error);
    });
  }, [ready, storeState]);

  useEffect(() => {
    player.loop = true;
    player.volume = 0.32;

    if (activeTheme.musicSource && !storeState.muted) {
      player.play();
    } else {
      player.pause();
    }
  }, [activeTheme.musicSource, player, storeState.muted]);

  const addPoints = useCallback((amount: number) => {
    if (amount <= 0) {
      return;
    }

    setStoreState((current) => ({
      ...current,
      points: current.points + amount,
    }));
  }, []);

  const buyTheme = useCallback((themeId: string) => {
    const theme = getBlokitoTheme(themeId);
    let purchased = false;

    setStoreState((current) => {
      if (current.ownedThemeIds.includes(theme.id)) {
        purchased = true;
        return {
          ...current,
          activeThemeId: theme.id,
        };
      }

      if (current.points < theme.price) {
        return current;
      }

      purchased = true;
      return {
        ...current,
        activeThemeId: theme.id,
        ownedThemeIds: [...current.ownedThemeIds, theme.id],
        points: current.points - theme.price,
      };
    });

    return purchased;
  }, []);

  const setActiveTheme = useCallback((themeId: string) => {
    setStoreState((current) => {
      if (!current.ownedThemeIds.includes(themeId)) {
        return current;
      }

      return {
        ...current,
        activeThemeId: themeId,
      };
    });
  }, []);

  const toggleMuted = useCallback(() => {
    setStoreState((current) => ({
      ...current,
      muted: !current.muted,
    }));
  }, []);

  const value = useMemo<BlokitoStoreState>(
    () => ({
      activeTheme,
      activeThemeId: storeState.activeThemeId,
      muted: storeState.muted,
      ownedThemeIds: storeState.ownedThemeIds,
      points: storeState.points,
      ready,
      addPoints,
      buyTheme,
      setActiveTheme,
      toggleMuted,
    }),
    [activeTheme, addPoints, buyTheme, ready, setActiveTheme, storeState, toggleMuted]
  );

  return <BlokitoStoreContext.Provider value={value}>{children}</BlokitoStoreContext.Provider>;
}

export function useBlokitoStore() {
  const context = useContext(BlokitoStoreContext);

  if (!context) {
    throw new Error('useBlokitoStore deve ser usado dentro de BlokitoStoreProvider.');
  }

  return context;
}
