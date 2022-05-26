import React, { useRef } from 'react';

import {
  TouchableOpacity,
  View
} from 'react-native';

import { ChatTeardropDots } from 'phosphor-react-native';
import { theme } from '../../theme';

import BottomSheet from '@gorhom/bottom-sheet';

import { styles } from './styles';

export function Widget() {
  const bottomSheetRef = useRef<BottomSheet>(null);

  return (
    <>
      <TouchableOpacity 
        style={styles.button}
      >
        <ChatTeardropDots 
          size={24}
          weight="bold"
          color={theme.colors.text_on_brand_color}
        />

      </TouchableOpacity>

      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={[1, 280]} 
        children={undefined}
      ></BottomSheet>
    </>
  );
}
