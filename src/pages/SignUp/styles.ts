import styled from 'styled-components/native';
import { getBottomSpace } from 'react-native-iphone-x-helper';
import { Platform } from 'react-native';

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: 0px 30px ${Platform.OS === 'android' ? 120 : 100}px;
`;
export const Title = styled.Text`
  color: #fff;
  font-size: 20px;
  font-family: 'RobotoSlab-Medium';
  margin: 64px 0 20px;
`;

export const BackToSigIn = styled.TouchableOpacity`
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  background: #312e38;
  border-top-width: 1px;
  border-color: #232129;
  padding: 16px 0 ${16 + getBottomSpace()}px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
`;
export const BackToSigInText = styled.Text`
  color: #fff;
  font-size: 18px;
  font-family: 'RobotoSlab-Regular';
  margin-left: 16px;
`;
