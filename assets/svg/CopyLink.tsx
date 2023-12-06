import * as React from 'react';
import Svg, {SvgProps, Circle, Path} from 'react-native-svg';

const CopyLinkIcon = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={56}
    height={56}
    fill="none"
    {...props}>
    <Circle cx={28} cy={28} r={28} fill="#16E6EF" />
    <Path
      stroke="#000"
      strokeLinecap="square"
      strokeLinejoin="round"
      strokeWidth={1.4}
      d="M26 29a5.001 5.001 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"
    />
    <Path
      stroke="#000"
      strokeLinecap="square"
      strokeLinejoin="round"
      strokeWidth={1.4}
      d="M30 27.001a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"
    />
  </Svg>
);
export default CopyLinkIcon;
