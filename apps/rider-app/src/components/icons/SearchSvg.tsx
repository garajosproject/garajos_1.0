import React from 'react';
import Svg, { Circle, Line } from 'react-native-svg';

export default function SearchSvg({ size = 20, color = '#FAFAFA' }: { size?: number; color?: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      <Circle cx={11} cy={11} r={7} stroke={color} strokeWidth={1.5} />
      <Line x1={16.5} y1={16.5} x2={21} y2={21} stroke={color} strokeWidth={1.5} strokeLinecap="round" />
    </Svg>
  );
}
