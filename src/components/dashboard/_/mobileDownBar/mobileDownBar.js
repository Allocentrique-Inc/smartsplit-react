import Music from '../../../../icons/music';
import Cog from '../../../../icons/cog';

export default function MobileDownBar({ current }) {
  return (
    <div className="mobileDownBar">
      <button className="btn-icon">
        <Music color={current === 'workpieces' ? '#2DA84F' : '#8DA0B3'} />
      </button>
      <button className="btn-icon">
        <Cog color={current === 'settings' ? '#2DA84F' : '#8DA0B3'} />
      </button>
    </div>
  );
}
