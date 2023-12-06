import * as React from 'react';
import Svg, {SvgProps, Circle, Rect} from 'react-native-svg';

const MoreIconShare = (props: SvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={56}
    height={56}
    fill="none"
    {...props}>
    <Circle cx={28} cy={28} r={28} fill="#16E6EF" />
    <Rect width={4} height={4} x={20} y={26} fill="#000" rx={2} />
    <Rect width={4} height={4} x={32} y={26} fill="#000" rx={2} />
  </Svg>
);
export default MoreIconShare;
