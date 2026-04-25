import React, { useState } from "react";
import Icon from "./Icon.jsx";
import { UserMenu } from "./App.jsx";

const NAV = [
  {
    id: "dashboard",
    label: "Dashboard",
    icon: "dashboard",
    count: null,
    children: null,
  },
  {
    id: "tokens",
    label: "Tokens",
    icon: "tag",
    children: [
      { id: "tokens.all", label: "All tokens" },
      { id: "tokens.color", label: "Color" },
      { id: "tokens.type", label: "Type" },
      { id: "tokens.shape", label: "Shape" },
    ],
    defaultOpen: true,
    activeChild: "tokens.all",
  },
  {
    id: "projects",
    label: "Projects",
    icon: "folder",
    count: 42,
    children: [
      { id: "projects.active", label: "Active" },
      { id: "projects.review", label: "In review" },
      { id: "projects.archived", label: "Archived" },
    ],
  },
  {
    id: "team",
    label: "Team",
    icon: "users",
    children: [
      { id: "team.members", label: "Members" },
      { id: "team.groups", label: "Groups" },
      { id: "team.invites", label: "Invites", count: 3 },
    ],
  },
  { id: "analytics", label: "Analytics", icon: "chart", children: null },
  { id: "inbox", label: "Inbox", icon: "inbox", count: 12, children: null },
  {
    id: "settings",
    label: "Settings",
    icon: "settings",
    children: [
      { id: "settings.general", label: "General" },
      { id: "settings.appearance", label: "Appearance" },
      { id: "settings.integrations", label: "Integrations" },
    ],
  },
];

export default function Sidebar({
  active,
  setActive,
  collapsed,
  setCollapsed,
  tweaksOpen,
  setTweaksOpen,
  tweaks,
  setTweaks,
  favorites,
  setFavorites,
}) {
  const [open, setOpen] = useState(() => {
    const s = {};
    NAV.forEach((n) => {
      if (n.children) s[n.id] = !!n.defaultOpen;
    });
    return s;
  });

  return (
    <aside className={`sidebar ${collapsed ? "collapsed" : ""}`}>
      <div className="brand">
        <div className="brand-mark">C</div>
        {!collapsed && (
          <div className="brand-text">
            <div className="brand-sub">CLdN</div>
            <div className="brand-name">IAMcenter</div>
          </div>
        )}
      </div>

      <button
        className="btn-icon sidebar-toggle"
        onClick={() => setCollapsed((c) => !c)}
        title={collapsed ? "Expand" : "Collapse"}
      >
        <Icon
          name={collapsed ? "chevron-right" : "chevron-left"}
          size={16}
          stroke={2}
        />
      </button>

      <div className="sidebar-nav">
        {!collapsed && <div className="nav-group-title">Workspace</div>}
        {NAV.map((item) => {
          const hasKids = !!item.children;
          const isOpen = !!open[item.id] && !collapsed;
          const isActive =
            active === item.id ||
            (hasKids && item.children.some((c) => c.id === active));
          return (
            <div key={item.id}>
              <div
                className={`nav-item ${isActive && !hasKids ? "active" : ""} ${hasKids && isActive && collapsed ? "active" : ""} ${isOpen ? "open" : ""}`}
                onClick={() => {
                  if (collapsed) {
                    setCollapsed(false);
                    if (hasKids) setOpen((o) => ({ ...o, [item.id]: true }));
                    else setActive(item.id);
                    return;
                  }
                  if (hasKids)
                    setOpen((o) => ({ ...o, [item.id]: !o[item.id] }));
                  else setActive(item.id);
                }}
                title={collapsed ? item.label : ""}
              >
                <span className="nav-icon">
                  <Icon name={item.icon} size={18} />
                </span>
                {!collapsed && <span className="nav-label">{item.label}</span>}
                {!collapsed && item.count != null && !hasKids && (
                  <span className="count">{item.count}</span>
                )}
                {!collapsed && hasKids && (
                  <span className="caret">
                    <Icon name="caret" size={16} stroke={2} />
                  </span>
                )}
              </div>
              {hasKids && !collapsed && (
                <div className={`nav-children ${isOpen ? "open" : ""}`}>
                  <div>
                    {item.children.map((c) => (
                      <div
                        key={c.id}
                        className={`nav-sub ${active === c.id ? "active" : ""}`}
                        onClick={() => setActive(c.id)}
                      >
                        <span className="dot" />
                        <span>{c.label}</span>
                        {c.count != null && (
                          <span
                            className="count"
                            style={{ marginLeft: "auto" }}
                          >
                            {c.count}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="sidebar-user">
        <UserMenu
          tweaksOpen={tweaksOpen}
          setTweaksOpen={setTweaksOpen}
          tweaks={tweaks}
          setTweaks={setTweaks}
          favorites={favorites}
          setFavorites={setFavorites}
          collapsed={collapsed}
        />
      </div>
    </aside>
  );
}
