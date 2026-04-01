import React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';

export default function UserSvg({ size = 24, color = '#FAFAFA' }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx={12} cy={8} r={4} stroke={color} strokeWidth={1.5} />
      <Path d="M4 20C4 16.69 7.58 14 12 14C16.42 14 20 16.69 20 20" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
    </Svg>
  );
}
