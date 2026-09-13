import { useState, useEffect } from 'react';
import { Panel } from './Panel';

const CACHE_KEY = 'areeba_github_telemetry_v1';
const CACHE_TTL_MS = 1000 * 60 * 30; // 30 minutes

export function SystemActivity({ username = 'areeba622' }) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchGitHubData() {
      // 1. Try local storage cache first
      try {
        const cachedStr = localStorage.getItem(CACHE_KEY);
        if (cachedStr) {
          const parsed = JSON.parse(cachedStr);
          if (Date.now() - parsed.timestamp < CACHE_TTL_MS) {
            if (isMounted) {
              setData(parsed.payload);
              setLoading(false);
            }
            return;
          }
        }
      } catch {
        // Ignore localStorage error
      }

      // 2. Fetch fresh telemetry
      try {
        const [userRes, eventsRes, reposRes] = await Promise.all([
          fetch(`https://api.github.com/users/${username}`),
          fetch(`https://api.github.com/users/${username}/events?per_page=30`),
          fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=15`)
        ]);

        if (!userRes.ok) {
          throw new Error(`GitHub user fetch returned ${userRes.status}`);
        }

        const userJson = await userRes.json();
        const eventsJson = eventsRes.ok ? await eventsRes.json() : [];
        const reposJson = reposRes.ok ? await reposRes.json() : [];

        // Compute 12-day bucketed activity bars
        const now = new Date();
        const dailyBuckets = Array(12).fill(0);
        
        if (Array.isArray(eventsJson)) {
          eventsJson.forEach((ev) => {
            const evDate = new Date(ev.created_at);
            const diffDays = Math.floor((now - evDate) / (1000 * 60 * 60 * 24));
            if (diffDays >= 0 && diffDays < 12) {
              dailyBuckets[11 - diffDays] += 1;
            }
          });
        }

        // Compute language distribution
        const langCounts = {};
        if (Array.isArray(reposJson)) {
          reposJson.forEach((r) => {
            if (r.language) {
              langCounts[r.language] = (langCounts[r.language] || 0) + 1;
            }
          });
        }
        const totalLangs = Object.values(langCounts).reduce((a, b) => a + b, 0) || 1;
        const langBreakdown = Object.entries(langCounts)
          .map(([name, count]) => ({
            name,
            percentage: Math.round((count / totalLangs) * 100)
          }))
          .sort((a, b) => b.percentage - a.percentage);

        // Determine last push time
        let lastPushStr = 'RECENT';
        if (Array.isArray(eventsJson) && eventsJson.length > 0) {
          const pushEvent = eventsJson.find((e) => e.type === 'PushEvent') || eventsJson[0];
          const pushDate = new Date(pushEvent.created_at);
          const daysAgo = Math.floor((now - pushDate) / (1000 * 60 * 60 * 24));
          lastPushStr = daysAgo === 0 ? 'TODAY' : `${daysAgo}D AGO`;
        } else if (userJson.updated_at) {
          const updatedDate = new Date(userJson.updated_at);
          const daysAgo = Math.floor((now - updatedDate) / (1000 * 60 * 60 * 24));
          lastPushStr = daysAgo === 0 ? 'TODAY' : `${daysAgo}D AGO`;
        }

        const payload = {
          repos: userJson.public_repos ?? 0,
          followers: userJson.followers ?? 0,
          lastPush: lastPushStr,
          dailyBuckets,
          langBreakdown
        };

        // Cache successful payload
        try {
          localStorage.setItem(
            CACHE_KEY,
            JSON.stringify({ timestamp: Date.now(), payload })
          );
        } catch {
          // Ignore cache quota errors
        }

        if (isMounted) {
          setData(payload);
          setLoading(false);
          setError(false);
        }
      } catch (err) {
        console.warn('GitHub telemetry fetch failed:', err);
        // If cache exists, use it as fallback
        try {
          const cachedStr = localStorage.getItem(CACHE_KEY);
          if (cachedStr) {
            const parsed = JSON.parse(cachedStr);
            if (isMounted) {
              setData(parsed.payload);
              setLoading(false);
              return;
            }
          }
        } catch {
          // Ignore
        }

        if (isMounted) {
          setError(true);
          setLoading(false);
        }
      }
    }

    fetchGitHubData();

    return () => {
      isMounted = false;
    };
  }, [username]);

  return (
    <Panel tag="LIVE" label="GITHUB.ACTIVITY">
      {loading && (
        <div className="py-6 flex flex-col items-center justify-center gap-2 font-data text-xs text-primary-dim">
          <span className="w-2 h-2 rounded-full bg-primary animate-ping" />
          <span>ESTABLISHING GITHUB TELEMETRY LINK...</span>
        </div>
      )}

      {/* Honest error state matching in-universe console styling (§5.6) */}
      {!loading && error && (
        <div className="py-4 font-mono text-xs flex flex-col gap-2">
          <div className="font-data text-secondary flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
            <span>[ CONNECTION TIMEOUT ]</span>
          </div>
          <p className="text-paper/80">Unable to reach GitHub telemetry.</p>
          <a
            href={`https://github.com/${username}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:text-paper inline-flex items-center gap-1 pt-1 underline font-data text-xs"
          >
            → view directly: github.com/{username}
          </a>
        </div>
      )}

      {!loading && !error && data && (
        <div className="flex flex-col gap-3.5 font-data text-xs">
          {/* Stats Row (§5.6): REPOS · FOLLOWERS · LAST.PUSH */}
          <div className="grid grid-cols-3 gap-2 pb-2.5 border-b border-line/60">
            <div className="flex flex-col">
              <span className="text-[10px] text-primary-dim tracking-wider">REPOS</span>
              <span className="text-paper font-mono font-semibold text-sm sm:text-base">
                {data.repos}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-primary-dim tracking-wider">FOLLOWERS</span>
              <span className="text-paper font-mono font-semibold text-sm sm:text-base">
                {data.followers}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-[10px] text-primary-dim tracking-wider">LAST.PUSH</span>
              <span className="text-primary font-mono font-semibold text-sm sm:text-base">
                {data.lastPush}
              </span>
            </div>
          </div>

          {/* 12-day Activity Bars */}
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center text-[10px] text-primary-dim">
              <span>PUBLIC COMMIT & EVENT STREAM (12D)</span>
              <span>RECENT →</span>
            </div>
            <div className="flex items-end gap-1 sm:gap-1.5 h-12 bg-void/50 p-1.5 border border-line/40">
              {data.dailyBuckets.map((count, idx) => {
                const max = Math.max(...data.dailyBuckets, 1);
                const heightPercent = Math.max((count / max) * 100, 10);
                const isActive = count > 0;
                return (
                  <div
                    key={idx}
                    className="flex-1 flex flex-col items-center h-full justify-end group relative"
                  >
                    <div
                      style={{ height: `${heightPercent}%` }}
                      className={`w-full transition-all duration-300 ${
                        isActive
                          ? 'bg-primary shadow-[0_0_6px_rgba(95,201,240,0.5)]'
                          : 'bg-primary-dim/20'
                      }`}
                    />
                    {/* Tooltip on hover */}
                    <div className="absolute -top-7 hidden group-hover:flex px-1.5 py-0.5 bg-void border border-primary text-[9px] text-paper font-mono pointer-events-none z-30 whitespace-nowrap">
                      {count} events
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Stacked Language Bar */}
          {data.langBreakdown && data.langBreakdown.length > 0 && (
            <div className="flex flex-col gap-1.5 pt-1">
              <div className="text-[10px] text-primary-dim">LANGUAGE DISTRIBUTION</div>
              <div className="h-2 w-full flex overflow-hidden border border-line/50">
                {data.langBreakdown.map((lang, idx) => {
                  const palette = ['#5FC9F0', '#2A5A72', '#FF8A3D', '#7A4A20', '#0b0b0b08'];
                  const color = palette[idx % palette.length];
                  return (
                    <div
                      key={lang.name}
                      style={{
                        width: `${lang.percentage}%`,
                        backgroundColor: color
                      }}
                      title={`${lang.name}: ${lang.percentage}%`}
                    />
                  );
                })}
              </div>
              <div className="flex flex-wrap gap-x-3 gap-y-1 text-[10px] text-primary-dim font-mono">
                {data.langBreakdown.slice(0, 4).map((lang, idx) => {
                  const palette = ['#5FC9F0', '#2A5A72', '#FF8A3D', '#7A4A20', '#D4DDE3'];
                  const color = palette[idx % palette.length];
                  return (
                    <span key={lang.name} className="flex items-center gap-1">
                      <span className="w-1.5 h-1.5 inline-block" style={{ backgroundColor: color }} />
                      <span className="text-paper">{lang.name}</span>
                      <span>{lang.percentage}%</span>
                    </span>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </Panel>
  );
}
