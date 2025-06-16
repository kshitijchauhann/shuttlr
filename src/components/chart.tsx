import { PieChart } from '@mui/x-charts/PieChart';

const Chart = () => {
  return (
    <PieChart
      series={[
        {
          data: [
            { id: 0, value: 10, label: 'Images' },
            { id: 1, value: 15, label: 'Audio' },
            { id: 2, value: 20, label: 'Videos' },
            { id: 3, value: 9, label: 'Documents'}
          ],
        },
      ]}
      width={130}

      height={150}
    />
  );
}

export default Chart;
