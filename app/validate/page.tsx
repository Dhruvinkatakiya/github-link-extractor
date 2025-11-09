// app/validate/page.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import Footer from "../components/Footer";
import Navbar2 from "../components/Navbar2";

/* ---------- Types ---------- */
type GhUser = {
    login: string;
    name: string | null;
    avatar_url: string;
    html_url: string;
    bio: string | null;
    location: string | null;
    company: string | null;
    blog: string | null;
    email: string | null;
    twitter_username: string | null;
    followers: number;
    following: number;
    public_repos: number;
};
type GhRepo = {
    id: number;
    name: string;
    html_url: string;
    description: string | null;
    stargazers_count: number;
    forks_count: number;
    language: string | null;
    updated_at: string;
    archived: boolean;
    fork: boolean;
    owner: { login: string };
};
type GhEvent = {
    id: string;
    type: string;
    created_at: string;
    repo: { name: string };
};
type LangBytes = Record<string, number>;

/* ---------- Theme ---------- */
const T = {
    page: "bg-[#F7F3EB]", // NOTE: your requested page background
    card: "bg-white",
    border: "border-[#E8E3DA]",
    h: "text-[#3E3A37]",
    p: "text-[#7B756E]",
    accentText: "text-[#6F625A]",
    accentBg: "bg-[#6F625A]",
};

/* ---------- Helpers ---------- */
const apiHeaders = (): HeadersInit => {
    const h: HeadersInit = {
        Accept: "application/vnd.github+json",
        "X-GitHub-Api-Version": "2022-11-28",
    };
    const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
    if (token) h.Authorization = `Bearer ${token}`;
    return h;
};

async function fetchJson<T>(url: string): Promise<T> {
    const res = await fetch(url, { headers: apiHeaders() });
    if (!res.ok) {
        let msg = `${res.status} ${res.statusText}`;
        try {
            const j = await res.json();
            if (j?.message) msg = `${msg}: ${j.message}`;
        } catch { }
        throw new Error(msg);
    }
    return (await res.json()) as T;
}

function extractUsernames(links: string[]): string[] {
    const set = new Set<string>();
    const re = /^https?:\/\/(?:www\.)?github\.com\/([^\/\s?#]+)(?:[\/?#]|$)/i;
    for (const l of links) {
        const m = l.match(re);
        if (m?.[1]) set.add(m[1]);
    }
    return [...set];
}
function timeAgo(date: string) {
    const s = Math.max(1, Math.floor((Date.now() - new Date(date).getTime()) / 1000));
    const steps: [number, string][] = [[60, "s"], [60, "m"], [24, "h"], [7, "d"], [4.35, "w"], [12, "mo"]];
    let v = s, u = "s";
    for (const [n, lab] of steps) { if (v < n) { u = lab; break; } v = Math.floor(v / n); u = lab; }
    return `${v}${u} ago`;
}
const fmt = (n?: number | null) => (n ?? 0) >= 1000 ? `${((n ?? 0) / 1000).toFixed(1)}k` : `${n ?? 0}`;

/* ---------- GraphQL (optional; needs token) ---------- */
async function fetchTotalContributions(login: string): Promise<number | null> {
    const token = process.env.NEXT_PUBLIC_GITHUB_TOKEN;
    if (!token) return null;
    const body = {
        query: `query($login:String!){ user(login:$login){ contributionsCollection{ contributionCalendar{ totalContributions }}}}`,
        variables: { login },
    };
    const res = await fetch("https://api.github.com/graphql", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(body),
    });
    if (!res.ok) return null;
    const j = await res.json();
    return j?.data?.user?.contributionsCollection?.contributionCalendar?.totalContributions ?? null;
}

/* ---------- Page ---------- */
export default function ValidatePage() {
    const [rawLinks, setRawLinks] = useState<string[] | null>(null);
    const [loading, setLoading] = useState(true);
    const [errorBanner, setErrorBanner] = useState<string | null>(null);

    const [users, setUsers] = useState<Record<string, GhUser | null>>({});
    const [repos, setRepos] = useState<Record<string, GhRepo[]>>({});
    const [events, setEvents] = useState<Record<string, GhEvent[]>>({});
    const [contribs, setContribs] = useState<Record<string, number | null>>({});
    const [langsBytes, setLangsBytes] = useState<Record<string, LangBytes>>({});

    // filters
    const [q, setQ] = useState("");
    const [langFilter, setLangFilter] = useState<string>("All");
    const [type, setType] = useState<"All" | "Sources" | "Forks" | "Archived">("All");
    const [sort, setSort] = useState<"Stars" | "Updated" | "Name">("Stars");

    // read links from sessionStorage
    useEffect(() => {
        try {
            const t = sessionStorage.getItem("gh_links");
            setRawLinks(t ? JSON.parse(t) : []);
        } catch { setRawLinks([]); }
    }, []);

    const usernames = useMemo(() => extractUsernames(rawLinks ?? []), [rawLinks]);

    useEffect(() => {
        const load = async () => {
            if (!rawLinks) return;
            if (usernames.length === 0) { setLoading(false); return; }

            setErrorBanner(null);

            try {
                // Users
                const userPairs = await Promise.allSettled(
                    usernames.map(async (u) => [u, await fetchJson<GhUser>(`https://api.github.com/users/${u}`)] as const)
                );
                const userMap: Record<string, GhUser | null> = {};
                const errs: string[] = [];
                userPairs.forEach((r) => {
                    if (r.status === "fulfilled") userMap[r.value[0]] = r.value[1];
                    else errs.push(r.reason?.message ?? "Failed to fetch user");
                });
                setUsers(userMap);
                if (errs.length) setErrorBanner(`GitHub error: ${errs[0]} (check rate limit or username).`);

                // Repos
                const repoPairs = await Promise.allSettled(
                    usernames.map(async (u) => [u, await fetchJson<GhRepo[]>(`https://api.github.com/users/${u}/repos?per_page=100&sort=updated`)] as const)
                );
                const repoMap: Record<string, GhRepo[]> = {};
                repoPairs.forEach((r) => {
                    if (r.status === "fulfilled") repoMap[r.value[0]] = r.value[1];
                });
                setRepos(repoMap);

                // Events
                const eventPairs = await Promise.allSettled(
                    usernames.map(async (u) => [u, await fetchJson<GhEvent[]>(`https://api.github.com/users/${u}/events/public?per_page=10`)] as const)
                );
                const eventMap: Record<string, GhEvent[]> = {};
                eventPairs.forEach((r) => {
                    if (r.status === "fulfilled") eventMap[r.value[0]] = r.value[1];
                });
                setEvents(eventMap);

                // Contributions (optional)
                const contribPairs = await Promise.all(
                    usernames.map(async (u) => [u, await fetchTotalContributions(u)] as const)
                );
                setContribs(Object.fromEntries(contribPairs) as Record<string, number | null>);

                // Languages: merge for top 25 by stars
                const langAll: Record<string, LangBytes> = {};
                for (const u of usernames) {
                    const tops = [...(repoMap[u] || [])].sort((a, b) => b.stargazers_count - a.stargazers_count).slice(0, 25);
                    const langPairs = await Promise.allSettled(
                        tops.map((r) => fetchJson<LangBytes>(`https://api.github.com/repos/${r.owner.login}/${r.name}/languages`))
                    );
                    const merged: LangBytes = {};
                    langPairs.forEach((res) => {
                        if (res.status === "fulfilled") {
                            for (const [k, v] of Object.entries(res.value)) merged[k] = (merged[k] || 0) + (v as number);
                        }
                    });
                    langAll[u] = merged;
                }
                setLangsBytes(langAll);
            } catch (e: any) {
                setErrorBanner(e?.message || "Failed to load GitHub data.");
            } finally {
                setLoading(false);
            }
        };
        load();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [rawLinks]);

    // rate limit helper (only for message)
    useEffect(() => {
        const check = async () => {
            try {
                const j = await fetchJson<any>("https://api.github.com/rate_limit");
                const remaining = j?.rate?.remaining ?? j?.core?.remaining;
                if (remaining === 0) setErrorBanner("GitHub rate limit reached. Add NEXT_PUBLIC_GITHUB_TOKEN to get higher limits.");
            } catch { }
        };
        check();
    }, []);

    const allLanguages = useMemo(() => {
        const set = new Set<string>();
        usernames.forEach((u) => (repos[u] || []).forEach((r) => r.language && set.add(r.language)));
        return ["All", ...Array.from(set).sort()];
    }, [usernames, repos]);

    const filteredReposByUser = useMemo(() => {
        const map: Record<string, GhRepo[]> = {};
        usernames.forEach((u) => {
            let list = [...(repos[u] || [])];
            if (q.trim()) list = list.filter((r) =>
                r.name.toLowerCase().includes(q.toLowerCase()) ||
                (r.description || "").toLowerCase().includes(q.toLowerCase())
            );
            if (langFilter !== "All") list = list.filter((r) => r.language === langFilter);
            if (type === "Sources") list = list.filter((r) => !r.fork && !r.archived);
            if (type === "Forks") list = list.filter((r) => r.fork);
            if (type === "Archived") list = list.filter((r) => r.archived);

            if (sort === "Stars") list.sort((a, b) => b.stargazers_count - a.stargazers_count);
            if (sort === "Updated") list.sort((a, b) => +new Date(b.updated_at) - +new Date(a.updated_at));
            if (sort === "Name") list.sort((a, b) => a.name.localeCompare(b.name));

            map[u] = list.slice(0, 12);
        });
        return map;
    }, [repos, usernames, q, langFilter, type, sort]);

    return (
        <div className={`min-h-screen ${T.page}`}>
            <Navbar2 />
            <div className="container mx-auto px-4 py-8">
                <div className="flex items-center justify-between mb-2">
                    {!loading && usernames.length > 0 && (
                        <>
                            {usernames.map((u) => {
                                const user = users[u];
                                // Move the heading inside the map where user is defined
                                return (
                                    <section key={u} className="mb-1">
                                        <h2 className={`text-xl md:text-2xl font-bold tracking-tight ${T.h} capitalize`}>
                                            {(user?.name || user?.login || u).charAt(0).toUpperCase() + (user?.name || user?.login || u).slice(1)}'s Github Profile
                                        </h2>
                                    </section>
                                );
                            })}
                        </>
                    )}

                </div>

                {errorBanner && (
                    <div className={`mb-6 ${T.card} border ${T.border} rounded-xl px-4 py-3`}>
                        <p className={`${T.p}`}>{errorBanner}</p>
                    </div>
                )}

                {loading && (
                    <div className={`${T.card} border ${T.border} rounded-2xl p-6`}>
                        <div className="flex items-center gap-2">
                            <span className="inline-flex h-5 w-5 rounded-full border-2 border-[#C9C3BA] border-t-[#6F625A] animate-spin" />
                            <span className={`${T.p}`}>Fetching GitHub data…</span>
                        </div>
                    </div>
                )}

                {!loading && usernames.length === 0 && (
                    <div className={`${T.card} border ${T.border} rounded-2xl p-6`}>
                        <p className={`${T.p}`}>No valid GitHub profile links detected.</p>
                    </div>
                )}

                {!loading && usernames.length > 0 && (
                    <>
                        {usernames.map((u) => {
                            const user = users[u];
                            const list = filteredReposByUser[u] || [];
                            const evts = (events[u] || []).slice(0, 5);

                            const langBytes = langsBytes[u] || {};
                            const totalBytes = Object.values(langBytes).reduce((a, b) => a + b, 0);
                            const langSummary = Object.entries(langBytes)
                                .sort((a, b) => b[1] - a[1])
                                .slice(0, 6)
                                .map(([k, v]) => ({ name: k, pct: totalBytes ? Math.round((v / totalBytes) * 100) : 0 }));

                            return (
                                <section key={u} className="mb-12">
                                    <div className="grid lg:grid-cols-3 gap-6">
                                        {/* Profile */}
                                        <div className={`${T.card} border ${T.border} rounded-4xl p-6`}>
                                            <div className="flex items-center gap-4">
                                                <img
                                                    src={user?.avatar_url || `https://avatars.githubusercontent.com/u/0?v=4`}
                                                    alt={u}
                                                    className="w-20 h-20 rounded-full border border-[#E8E3DA]"
                                                />
                                                <div>
                                                    <a href={user?.html_url || `https://github.com/${u}`} target="_blank" rel="noreferrer"
                                                        className={`${T.h} font-semibold hover:underline`}>
                                                        {user?.name || user?.login || u}
                                                    </a>
                                                    <p className="text-xs text-[#9B958D]">@{u}</p>
                                                </div>
                                            </div>

                                            {user?.bio && <p className={`mt-4 text-sm ${T.p}`}>{user.bio}</p>}
                                            <div className="mt-3 space-y-1 text-sm">
                                                {user?.location && <p className={`${T.p}`}>📍 {user.location}</p>}
                                                {user?.company && <p className={`${T.p}`}>🏢 {user.company}</p>}
                                            </div>

                                            {/* Socials */}
                                            <div className="mt-5 grid grid-cols-3 gap-2 text-center">
                                                <a href={user?.blog || "#"} target="_blank" rel="noreferrer"
                                                    className={`rounded-xl ${T.page} border ${T.border} p-3 ${!user?.blog ? "pointer-events-none opacity-50" : ""}`}>
                                                    <div className={`${T.accentText} font-semibold truncate`}>Website</div>
                                                    <div className="text-[11px] text-[#9B958D]">Blog/Portfolio</div>
                                                </a>
                                                <a href={user?.twitter_username ? `https://x.com/${user.twitter_username}` : "#"} target="_blank" rel="noreferrer"
                                                    className={`rounded-xl ${T.page} border ${T.border} p-3 ${!user?.twitter_username ? "pointer-events-none opacity-50" : ""}`}>
                                                    <div className={`${T.accentText} font-semibold`}>X / Twitter</div>
                                                    <div className="text-[11px] text-[#9B958D]">@{user?.twitter_username || "—"}</div>
                                                </a>
                                                <div className={`rounded-xl ${T.page} border ${T.border} p-3`}>
                                                    <div className={`${T.accentText} font-semibold`}>Email</div>
                                                    <div className="text-[11px] text-[#9B958D] truncate">{user?.email || "—"}</div>
                                                </div>
                                            </div>

                                            {/* Stats */}
                                            <div className="mt-5 grid grid-cols-3 gap-2 text-center">
                                                <div className="rounded-xl bg-[#F9F6F0] border border-[#E8E3DA] p-3">
                                                    <div className={`${T.h} font-semibold`}>{fmt(user?.followers)}</div>
                                                    <div className="text-[11px] text-[#7B756E]">Followers</div>
                                                </div>
                                                <div className="rounded-xl bg-[#F9F6F0] border border-[#E8E3DA] p-3">
                                                    <div className={`${T.h} font-semibold`}>{fmt(user?.following)}</div>
                                                    <div className="text-[11px] text-[#7B756E]">Following</div>
                                                </div>
                                                <div className="rounded-xl bg-[#F9F6F0] border border-[#E8E3DA] p-3">
                                                    <div className={`${T.h} font-semibold`}>{fmt(user?.public_repos)}</div>
                                                    <div className="text-[11px] text-[#7B756E]">Repos</div>
                                                </div>
                                            </div>

                                            {/* Contributions */}
                                            <div className="mt-4 rounded-xl bg-[#F7F3EB] border border-[#E8E3DA] p-3 text-center">
                                                <div className={`${T.h} text-sm`}>Total Contributions (past year)</div>
                                                <div className={`${T.accentText} font-semibold text-lg`}>
                                                    {contribs[u] ?? "—"}
                                                </div>
                                                {!process.env.NEXT_PUBLIC_GITHUB_TOKEN && (
                                                    <div className="text-[10px] text-[#9B958D] mt-1">
                                                        Add <code>NEXT_PUBLIC_GITHUB_TOKEN</code> for exact totals.
                                                    </div>
                                                )}
                                            </div>

                                            {/* Languages */}
                                            <div className="mt-4">
                                                <div className={`${T.h} font-semibold mb-2`}>Languages</div>
                                                {langSummary.length === 0 && <p className={`text-sm ${T.p}`}>Not enough data.</p>}
                                                <div className="space-y-2">
                                                    {langSummary.map((L) => (
                                                        <div key={L.name} className="flex items-center gap-3">
                                                            <div className="w-28 text-sm text-[#7B756E]">{L.name}</div>
                                                            <div className="flex-1 h-2 rounded-full bg-[#EFEAE1] overflow-hidden">
                                                                <div className={`h-full ${T.accentBg}`} style={{ width: `${L.pct}%` }} />
                                                            </div>
                                                            <div className="w-10 text-right text-sm text-[#7B756E]">{L.pct}%</div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Recent Activity */}
                                        <div className={`lg:col-span-2 ${T.card} border ${T.border} rounded-2xl p-6`}>
                                            <div className="flex items-center justify-between">
                                                <h3 className={`${T.h} font-semibold`}>Recent Activity</h3>
                                                <a className={`text-xs ${T.accentText} hover:underline`} href={`https://github.com/${u}`} target="_blank" rel="noreferrer">
                                                    View on GitHub
                                                </a>
                                            </div>
                                            <div className="mt-4 space-y-3">
                                                {evts.length === 0 && <p className={`text-sm ${T.p}`}>No recent public activity.</p>}
                                                {evts.map((e) => {
                                                    let label = e.type.replace("Event", "");
                                                    if (label === "Push") label = "Pushed";
                                                    if (label === "Create") label = "Created";
                                                    if (label === "PullRequest") label = "Pull Request";
                                                    if (label === "Issues") label = "Issue";
                                                    return (
                                                        <div key={e.id} className="rounded-xl bg-[#FBF8F2] border border-[#E8E3DA] p-3">
                                                            <div className={`text-sm ${T.h}`}>
                                                                <span className="text-[#9B958D]">{timeAgo(e.created_at)} · </span>
                                                                <span>{label} </span>
                                                                <a className="text-[#2B7A59] hover:underline" href={`https://github.com/${e.repo?.name}`} target="_blank" rel="noreferrer">
                                                                    {e.repo?.name}
                                                                </a>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Controls */}
                                    <div className="mt-8 flex flex-wrap items-center gap-3">
                                        <h2 className={`${T.h} font-semibold text-lg`}>Repositories</h2>
                                        <div className="ml-auto flex flex-wrap items-center gap-3">
                                            <input
                                                value={q}
                                                onChange={(e) => setQ(e.target.value)}
                                                placeholder="Find a repository…"
                                                className={`bg-white ${T.p} placeholder-[#B7B0A8] border ${T.border} rounded-xl px-3 py-2 text-sm w-56`}
                                            />
                                            <select value={type} onChange={(e) => setType(e.target.value as any)} className={`bg-white ${T.p} border ${T.border} rounded-xl px-3 py-2 text-sm`}>
                                                <option>All</option><option>Sources</option><option>Forks</option><option>Archived</option>
                                            </select>
                                            <select value={langFilter} onChange={(e) => setLangFilter(e.target.value)} className={`bg-white ${T.p} border ${T.border} rounded-xl px-3 py-2 text-sm`}>
                                                {allLanguages.map((L) => (<option key={L}>{L}</option>))}
                                            </select>
                                            <select value={sort} onChange={(e) => setSort(e.target.value as any)} className={`bg-white ${T.p} border ${T.border} rounded-xl px-3 py-2 text-sm`}>
                                                <option>Stars</option><option>Updated</option><option>Name</option>
                                            </select>
                                        </div>
                                    </div>

                                    {/* Repo Grid */}
                                    <div className="mt-4 grid md:grid-cols-2 xl:grid-cols-3 gap-4">
                                        {list.length === 0 && (
                                            <div className="col-span-full text-sm text-[#7B756E]">No repositories match your filters.</div>
                                        )}
                                        {list.map((r) => (
                                            <a key={r.id} href={r.html_url} target="_blank" rel="noreferrer"
                                                className={`block ${T.card} border ${T.border} hover:shadow-sm hover:border-[#D8D1C7] transition p-4 rounded-2xl`}>
                                                <div className="flex items-center gap-2">
                                                    <span className={`${T.accentText}`}>▣</span>
                                                    <span className={`${T.h} font-semibold`}>{r.name}</span>
                                                    {r.archived && (
                                                        <span className="ml-2 text-[10px] px-2 py-0.5 rounded-full bg-[#FFF1E8] text-[#9b5b31] border border-[#f6d6bf]">Archived</span>
                                                    )}
                                                    {r.fork && (
                                                        <span className="ml-2 text-[10px] px-2 py-0.5 rounded-full bg-[#EEF3FF] text-[#3b5fb3] border border-[#d7e1ff]">Fork</span>
                                                    )}
                                                </div>
                                                {r.description && <p className={`mt-2 text-sm ${T.p} line-clamp-2`}>{r.description}</p>}
                                                <div className="mt-3 flex items-center gap-4 text-xs text-[#7B756E]">
                                                    <span className="inline-flex items-center gap-1">
                                                        <span className="h-2 w-2 rounded-full bg-[#5fb06a]" />
                                                        {r.language ?? "—"}
                                                    </span>
                                                    <span>★ {r.stargazers_count}</span>
                                                    <span>⑂ {r.forks_count}</span>
                                                    <span>Updated {new Date(r.updated_at).toLocaleDateString()}</span>
                                                </div>
                                            </a>
                                        ))}
                                    </div>
                                </section>
                            );
                        })}
                    </>
                )}
            </div>
            <Footer />
        </div>
    );
}
