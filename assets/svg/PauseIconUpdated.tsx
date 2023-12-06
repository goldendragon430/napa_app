import * as React from 'react';
import {moderateScale} from 'react-native-size-matters';
import Svg, {Rect} from 'react-native-svg';

const PauseIconUpdated = ({width = 64, height = 64}: any) => {
  return (
    <Svg
      xmlns="http://www.w3.org/2000/svg"
      width={moderateScale(width)}
      height={moderateScale(height)}
      fill="none">
      <Rect width={12} height={48} x={12} y={8} fill="#fff" rx={1} />
      <Rect width={12} height={48} x={40} y={8} fill="#fff" rx={1} />
    </Svg>
  );
};
export default PauseIconUpdated;
