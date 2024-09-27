import { useUser } from '@/Providers/UserContext';
import { AreaChartComponent } from './AreaChart';
import { BarGraph } from './BarGraph';
import PieC from './Pie';
import RadarCharts from './Radar';
const Section: React.FC = () => {
  const { isLoading } = useUser();
  return (
    <div className="w-full bg-white rounded-lg px-12 py-6 overflow-y-clip">
      <p className="font-bold text-xl">Statistics</p>
      <div className="mt-6 ">
        {isLoading ? (
          <div>Loading...</div>
        ) : (
          <div className="grid grid-cols-2 gap-6 overflow-auto xl:h-[500px] 2xl:h-[700px] scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-300">
            <AreaChartComponent />
            <BarGraph />
            <PieC />
            <RadarCharts />
          </div>
        )}
      </div>
    </div>
  );
};

export default Section;
