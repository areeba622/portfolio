import { Panel } from './Panel';
import { PORTFOLIO_DATA } from '../data/portfolioData';

export function UserProfile() {
  return (
    <Panel label="USER.PROFILE" tag="STATUS.ACTIVE">
      <p className="font-mono text-xs sm:text-[13px] leading-relaxed text-paper/90">
        {PORTFOLIO_DATA.bio}
      </p>
    </Panel>
  );
}
