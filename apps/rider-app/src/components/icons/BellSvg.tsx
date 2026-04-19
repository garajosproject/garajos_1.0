import React from 'react';
import Svg, { Path } from 'react-native-svg';

export default function BellSvg({ size = 24, color = '#FAFAFA' }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Path
        d="M18 8A6 6 0 006 8C6 15 3 17 3 17H21C21 17 18 15 18 8Z"
        stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round"
      />
      <Path d="M13.73 21C13.55 21.3 13.3 21.55 13 21.73C12.7 21.91 12.35 22 12 22C11.65 22 11.3 21.91 11 21.73C10.7 21.55 10.45 21.3 10.27 21" stroke={color} strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
    </Svg>
  );
}
