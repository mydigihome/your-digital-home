// Content planner state management hook
import { useState } from "react";

export function useContentPlannerState() {
  const [activeTab, setActiveTab] = useState("weekly");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedPost, setSelectedPost] = useState<any>(null);
  const [showPostModal, setShowPostModal] = useState(false);

  return {
    activeTab, setActiveTab,
    selectedDate, setSelectedDate,
    selectedPost, setSelectedPost,
    showPostModal, setShowPostModal,
  };
}
