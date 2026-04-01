import React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function ScanSvg({ size = 20, color = '#FAFAFA' }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path d="M3 7V5C3 3.9 3.9 3 5 3H7" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
      <Path d="M17 3H19C20.1 3 21 3.9 21 5V7" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
      <Path d="M21 17V19C21 20.1 20.1 21 19 21H17" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
      <Path d="M7 21H5C3.9 21 3 20.1 3 19V17" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
      <Path d="M3 12H21" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
    </Svg>
  );
}
