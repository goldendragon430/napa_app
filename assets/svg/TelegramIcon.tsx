import * as React from 'react';
import Svg, {
  SvgProps,
  Circle,
  Path,
  Defs,
  LinearGradient,
  Stop,
} from 'react-native-svg';
const TelegramIcon = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={56}
    height={56}
    fill="none"
    {...props}>
    <Circle cx={28} cy={28} r={28} fill="url(#a)" />
    <Path
      fill="#fff"
      d="M16.65 26.61c6.442-2.823 10.738-4.683 12.888-5.582 6.137-2.567 7.412-3.013 8.244-3.028.182-.003.591.043.856.259.223.182.285.428.314.601.03.173.067.567.037.875-.332 3.514-1.771 12.041-2.503 15.977-.31 1.665-.92 2.223-1.51 2.278-1.284.119-2.259-.853-3.502-1.672-1.945-1.282-3.044-2.08-4.931-3.331-2.182-1.446-.768-2.24.476-3.54.325-.34 5.98-5.511 6.089-5.98.014-.059.026-.278-.103-.393-.13-.116-.32-.076-.458-.045-.195.045-3.302 2.11-9.321 6.196-.882.609-1.681.905-2.397.89-.789-.017-2.307-.449-3.435-.818-1.384-.452-2.484-.691-2.388-1.46.05-.4.598-.809 1.644-1.227Z"
    />
    <Defs>
      <LinearGradient
        id="a"
        x1={0.208}
        x2={0.208}
        y1={0}
        y2={55.585}
        gradientUnits="userSpaceOnUse">
        <Stop stopColor="#2AABEE" />
        <Stop offset={1} stopColor="#229ED9" />
      </LinearGradient>
    </Defs>
  </Svg>
);
export default TelegramIcon;
