import { AreaChartComponent } from './AreaChart';
import { BarGraph } from './BarGraph';

const Section: React.FC = () => {
  return (
    <div className="w-full bg-white rounded-lg px-12 py-6">
      <p className="font-bold text-xl">Statistics</p>
      <div className="mt-6 flex justify-between">
        <AreaChartComponent />
        <BarGraph />
      </div>
    </div>
  );
};

export default Section;
