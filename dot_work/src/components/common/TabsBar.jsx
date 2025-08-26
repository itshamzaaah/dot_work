const TabsBar = ({ tabs = [], value, onChange }) => {
  return (
    <div className="bg-gray-200 text-sm rounded p-2 flex gap-x-2">
      {tabs.map((tab) => {
        const selected = value === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            className={`px-2 py-2 rounded flex-1 ${
              selected ? "bg-primary text-white" : "text-gray-700"
            }`}
            onClick={() => onChange(tab.id)}
          >
            {tab.label}
          </button>
        );
      })}
    </div>
  );
};

export default TabsBar;
