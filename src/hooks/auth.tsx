import React, {
  createContext,
  useCallback,
  useState,
  useContext,
  useEffect,
} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { Alert } from 'react-native';
import api from '../service/api';

type AuthState = {
  token: string;
  user: object;
};
type Auth = {
  email: string;
  password: string;
};
interface AuthContextDate {
  user: object;
  signIn(data: Auth): Promise<void>;
  signOut(): void;
  loading: boolean;
}
const AuthContext = createContext<AuthContextDate>({} as AuthContextDate);

export const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>({} as AuthState);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function loadStorageData(): Promise<void> {
      const token = await AsyncStorage.getItem('@Gobaber:token');
      const user = await AsyncStorage.getItem('@Gobaber:user');
      if (token && user) {
        setData({ token, user: JSON.parse(user) });
      }
      setLoading(false);
    }
    loadStorageData();
  }, []);
  const signIn = useCallback(async ({ email, password }) => {
    try {
      const response = await api.post('/sessions', {
        email,
        password,
      });

      const { token, userAuthenticate: user } = response.data;

      await AsyncStorage.multiSet([
        ['@Gobaber:token', token],
        ['@Gobaber:user', JSON.stringify(user)],
      ]);

      setData({ token, user });
    } catch (err) {
      Alert.alert(
        'Falha em fazer login',
        'Login invalido, verifique suas crendencias',
      );
    }
  }, []);
  const signOut = useCallback(async () => {
    await AsyncStorage.removeItem('@Gobaber:token');
    await AsyncStorage.removeItem('@Gobaber:user');
  }, []);
  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextDate {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
