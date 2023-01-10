import { FC, memo, useMemo } from 'react';
import { useWindowDimensions } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { AbstractChartConfig } from 'react-native-chart-kit/dist/AbstractChart';
import { LineChartData } from 'react-native-chart-kit/dist/line-chart/LineChart';

const chartConfig: AbstractChartConfig = {
  backgroundGradientFrom: '#0e1b26',
  backgroundGradientFromOpacity: 1,
  backgroundGradientTo: '#08130D',
  backgroundGradientToOpacity: 0.2,
  fillShadowGradient: '#194d66',
  fillShadowGradientTo: '#0f2a3b',
  fillShadowGradientOpacity: 1,
  color: () => 'rgba(23, 73, 95, 1)',
};

type Props = {
  data: number[];
};

const Chart: FC<Props> = ({ data }) => {
  const { width } = useWindowDimensions();
  const memoizedWidth = useMemo(() => (1080 / width) * 20 + width, [width]);
  const chartData: LineChartData = {
    datasets: [
      {
        data: data.length > 0 ? data : [0],
        color: () => 'rgb(25,197,132)',
        strokeWidth: 1,
      },
    ],
    labels: [],
  };

  return (
    <LineChart
      height={250}
      data={chartData}
      withDots={false}
      width={memoizedWidth}
      withInnerLines={false}
      withOuterLines={false}
      chartConfig={chartConfig}
      withHorizontalLabels={false}
    />
  );
};

export default memo(Chart);
