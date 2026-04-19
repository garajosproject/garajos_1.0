import React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';

export default function CartSvg({ size = 24, color = '#FAFAFA' }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M6 2L3 6V20C3 21.1 3.9 22 5 22H19C20.1 22 21 21.1 21 20V6L18 2H6Z"
        stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"
      />
      <Path d="M3 6H21" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
      <Path d="M16 10C16 12.21 14.21 14 12 14C9.79 14 8 12.21 8 10" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}
