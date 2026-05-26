import { useState, useEffect } from "react";
import { useOrder } from "../../context/OrderContext";
import { FaUtensils, FaChartBar, FaClipboardList, FaSignOutAlt, FaCheck } from "react-icons/fa";
import { MdDashboard, MdRestaurantMenu } from "react-icons/md";
import "../../index.css";

const NAV_ITEMS = [
  { id: "dashboard", icon: <MdDashboard size={22} />, label: "Dashboard" },
  { id: "menu",      icon: <MdRestaurantMenu size={22} />, label: "Menu" },
  { id: "orders",    icon: <FaClipboardList size={22} />, label: "Orders" },
  { id: "stats",     icon: <FaChartBar size={22} />, label: "Stats" },
];

function WaiterDashboard() {
  const { orders } = useOrder();
  const [activeNav, setActiveNav] = useState("dashboard");
  const [servedMap, setServedMap] = useState({});
  const [calls, setCalls] = useState([]);

  useEffect(() => {
  const fetchCalls = () => {
    fetch("http://https://spice-garden.onrender.com/api/waiter")
      .then((res) => res.json())
      .then((data) => setCalls(data.data || []))
      .catch(console.error);
  };

  fetchCalls();

  const interval = setInterval(
    fetchCalls,
    3000
  );

  return () => clearInterval(interval);
}, []);

  // Build table list from live orders
  const tableMap = {};
  orders.forEach((o) => {
    const t = o.table;
    if (!tableMap[t]) tableMap[t] = { table: t, orders: [] };
    tableMap[t].orders.push(o);
  });
  const tables = Object.values(tableMap);

  const toggleServed = (tableNum) => {
    setServedMap((prev) => ({ ...prev, [tableNum]: !prev[tableNum] }));
  };

  const readyItems = (tableOrders) =>
    tableOrders.flatMap((o) => o.items.filter((i) => i.status === "Ready"));

  return (
    <div className="waiter-layout">
      {/* Sidebar */}
      <aside className="kitchen-sidebar">
        <div className="kitchen-logo">
          <FaUtensils size={22} color="#c45a00" />
        </div>
        {NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            className={`kitchen-nav-btn ${activeNav === item.id ? "active" : ""}`}
            onClick={() => setActiveNav(item.id)}
            title={item.label}
            aria-label={item.label}
          >
            {item.icon}
          </button>
        ))}
        <div style={{ flex: 1 }} />
        <button className="kitchen-nav-btn logout" title="Sign out" aria-label="Sign out">
          <FaSignOutAlt size={20} />
        </button>
      </aside>

      {/* Main */}
      <main className="waiter-main">
        <div className="waiter-header">
          {calls.length > 0 && (
  <div
    className="bill"
    style={{
      marginBottom: "20px",
      border: "2px solid orange",
    }}
  >
    <h3>🛎 Waiter Requests</h3>

    {calls.map((call) => (
      <div
        key={call._id}
        className="row"
      >
        <span>
          Table {call.tableNumber}
        </span>

        <button
          className="pay-btn"
          onClick={async () => {
            await fetch(
              `http://https://spice-garden.onrender.com/api/waiter/${call._id}`,
              {
                method: "PATCH",
              }
            );

            setCalls((prev) =>
              prev.filter(
                (c) =>
                  c._id !== call._id
              )
            );
          }}
        >
          Done
        </button>
      </div>
    ))}
  </div>
)}
          <h2 className="waiter-page-title">Waiter Dashboard</h2>
          <p className="waiter-page-sub">{tables.length} active table{tables.length !== 1 ? "s" : ""}</p>
        </div>

        {tables.length === 0 ? (
          <div className="empty-state">
            <p>🍽️</p>
            <strong>No active tables</strong>
            <span>Tables with orders will appear here</span>
          </div>
        ) : (
          <div className="waiter-tables-card">
            <h3 className="waiter-section-title">Tables</h3>

            {tables.map(({ table, orders: tOrders }) => {
              const ready = readyItems(tOrders);
              const isServed = !!servedMap[table];

              return (
                <div key={table} className="waiter-table-row">
                  <div className="waiter-table-top">
                    <span className="waiter-table-name">Table {table}</span>
                    <button
                      className={`waiter-served-tag ${isServed ? "served" : ""}`}
                      onClick={() => toggleServed(table)}
                    >
                      {isServed ? <><FaCheck size={10} /> Served</> : "Mark Served"}
                    </button>
                  </div>

                  {ready.length > 0 ? (
                    <div className="waiter-ready-items">
                      {ready.map((item, i) => (
                        <div key={i} className="waiter-order-ready-row">
                          <div className="waiter-avatar">
                            <FaUtensils size={12} color="#c45a00" />
                          </div>
                          <span className="waiter-order-text">
                            {item.name} ×{item.qty} — Ready to serve
                          </span>
                          <span className="waiter-ready-badge">Ready</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="waiter-no-ready">No items ready yet — kitchen is preparing</p>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}

export default WaiterDashboard;
