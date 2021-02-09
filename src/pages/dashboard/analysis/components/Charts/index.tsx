import numeral from 'numeral';
import Bar from './Bar';
import ChartCard from './ChartCard';
import Field from './Field';
import Gauge from './Gauge';
import MiniArea from './MiniArea';
import MiniBar from './MiniBar';
import MiniProgress from './MiniProgress';
import Pie from './Pie';
import TagCloud from './TagCloud';
import TimelineChart from './TimelineChart';
import WaterWave from './WaterWave';

const celsius = (val: number | string) => `${numeral(val).format('0,0')} °C`;

const Charts = {
  celsius,
  Bar,
  Pie,
  Gauge,
  MiniBar,
  MiniArea,
  MiniProgress,
  ChartCard,
  Field,
  WaterWave,
  TagCloud,
  TimelineChart,
};

export {
  Charts as default,
  celsius,
  Bar,
  Pie,
  Gauge,
  MiniBar,
  MiniArea,
  MiniProgress,
  ChartCard,
  Field,
  WaterWave,
  TagCloud,
  TimelineChart,
};
