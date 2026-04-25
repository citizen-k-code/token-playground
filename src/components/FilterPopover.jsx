import React, { useEffect, useRef } from 'react';
import Icon from './Icon.jsx';

export default function FilterPopover({
  status, anchorRect, isSelected,
  onClose, onShowOnly, onAdd, onRemove,
}) {
  const ref = useRef(null);

  useEffect(() => {
    const onDown = (e) => { if (ref.current && !ref.current.contains(e.target)) onClose(); };
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [onClose]);

  return (
    <div
      ref={ref}
      className="filter-popover"
      role="dialog"
      aria-label={`Filter by ${status}`}
      style={{ left: anchorRect.left, top: anchorRect.top }}
    >
      <div className="filter-popover-head">
        <span className="filter-popover-title">Filter by {status}</span>
        <button className="btn-icon" onClick={onClose} aria-label="Close" style={{width:24, height:24}}>
          <Icon name="x" size={14} stroke={2}/>
        </button>
      </div>
      <div className="filter-popover-actions">
        <button className="filter-popover-action" onClick={() => onShowOnly(status)}>
          <Icon name="filter" size={14} stroke={2}/>
          <span>Show only</span>
        </button>
        {!isSelected ? (
          <button className="filter-popover-action" onClick={() => onAdd(status)}>
            <Icon name="plus" size={14} stroke={2}/>
            <span>Add to filter</span>
          </button>
        ) : (
          <button className="filter-popover-action" onClick={() => onRemove(status)}>
            <Icon name="x" size={14} stroke={2}/>
            <span>Remove from filter</span>
          </button>
        )}
      </div>
    </div>
  );
}
