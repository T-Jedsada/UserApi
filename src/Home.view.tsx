import styled from 'styled-components'
import {FAB} from 'react-native-paper';

export const Screen = styled.View`
  flex: 1;
`;
export const ListView = styled.View`
  justify-content: center;
  align-items: center;
`;

export const FloatButtonStyle = styled(FAB)`
  position: absolute;
  margin: 16px;
  right: 0;
  bottom: 0;
`;