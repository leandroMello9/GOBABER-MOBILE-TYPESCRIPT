import React from 'react';

import { View, Button } from 'react-native';
import { Container } from './styles';
import { useAuth } from '../../hooks/auth';

const Dashborad: React.FC = () => {
  const { signOut } = useAuth();
  return (
    <View>
      <Button title="Sair" onPress={() => signOut} />
    </View>
  );
};

export default Dashborad;
