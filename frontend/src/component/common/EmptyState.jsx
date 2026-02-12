import React from "react";
import { FaInbox } from "react-icons/fa";

const EmptyState = ({ 
  icon: Icon = FaInbox, 
  title = "No data found", 
  description = "There's nothing here yet.",
  action 
}) => {
  return (
    <div className="empty-state">
      <div className="empty-state__icon">
        <Icon />
      </div>
      <h3 className="empty-state__title">{title}</h3>
      <p className="empty-state__description">{description}</p>
      {action && (
        <div className="empty-state__action">
          {action}
        </div>
      )}
    </div>
  );
};

export default EmptyState;
