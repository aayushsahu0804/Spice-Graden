import { useState } from "react";
import { useOrder } from "../../context/OrderContext";
import { FaUtensils, FaChartBar, FaClipboardList, FaSignOutAlt } from "react-icons/fa";
import { MdRestaurantMenu, MdDashboard } from "react-icons/md";
import "../../index.css";

const STATUS_FLOW = { Pending: "Cooking", Cooking: "Ready", Ready: "Pending" };
const STATUS_COLORS = {
  Cooking: { bg: "#fff3e0", text: "#c45a00", border: "#f5a623" },
  Ready:   { bg: "#e8f5e9", text: "#2e7d32", border: "#66bb6a" },
  Pending: { bg: "#fce4ec", text: "#c62828", border: "#ef9a9a" },
};

const NAV_ITEMS = [
  { id: "dashboard", icon: <MdDashboard size={22} />, label: "Dashboard" },
  { id: "menu",      icon: <MdRestaurantMenu size={22} />, label: "Menu" },
  { id: "orders",    icon: <FaClipboardList size={22} />, label: "Orders" },
  { id: "stats",     icon: <FaChartBar size={22} />, label: "Stats" },
];

function KitchenDashboard() {
  const { orders, updateItemStatus } = useOrder();
  const [activeNav, setActiveNav] = useState("dashboard");

  const totalItems = orders.reduce((acc, o) => acc + o.items.length, 0);
  const cookingCount = orders.flatMap(o => o.items).filter(i => i.status === "Cooking").length;
  const readyCount   = orders.flatMap(o => o.items).filter(i => i.status === "Ready").length;

  return (
    <div className="kitchen-layout">
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
      <main className="kitchen-main">
        <div className="kitchen-header">
          <div>
            <h2 className="kitchen-page-title">Kitchen Dashboard</h2>
            <p className="kitchen-page-sub">
              {orders.length} active table{orders.length !== 1 ? "s" : ""}
            </p>
          </div>
          {/* Stats pills */}
          <div className="kitchen-stats-row">
            <span className="kitchen-stat-pill cooking">{cookingCount} Cooking</span>
            <span className="kitchen-stat-pill ready">{readyCount} Ready</span>
          </div>
        </div>

        {orders.length === 0 ? (
          <div className="empty-state">
            <p>🍽️</p>
            <strong>No active orders</strong>
            <span>Orders will appear here once placed</span>
          </div>
        ) : (
          <div className="kitchen-orders-card">
            <div className="kitchen-orders-title-row">
              <span className="kitchen-orders-title">Table-wise active orders</span>
              <span className="kitchen-items-count">{totalItems} items</span>
            </div>

            <div className="kitchen-table-head">
              <span>Item</span>
              <span>Qty</span>
              <span>Status</span>
              <span>Price</span>
            </div>

            {orders.map((order) => (
              <div key={order.id} className="kitchen-order-group">
                <div className="kitchen-table-label">
                  Table {order.table}
                  <span className="kitchen-order-id"> #{order.id.slice(-6)}</span>
                </div>

                {order.items.map((item, idx) => {
                  const style = STATUS_COLORS[item.status] || STATUS_COLORS["Pending"];
                  const nextStatus = STATUS_FLOW[item.status] || "Cooking";
                  return (
                    <div key={idx} className="kitchen-item-row">
                      <div className="kitchen-item-info">
                        <div className="kitchen-item-img-wrap">
                          <FaUtensils size={14} color="#c45a00" />
                        </div>
                        <div>
                          <p className="kitchen-item-name">{item.name}</p>
                          <p className="kitchen-item-sub">₹{item.price} each</p>
                        </div>
                      </div>

                      <span className="kitchen-item-qty">×{item.qty}</span>

                      <button
                        className="kitchen-status-badge"
                        style={{ background: style.bg, color: style.text, border: `1px solid ${style.border}` }}
                        onClick={() => updateItemStatus(order.id, item.name, nextStatus)}
                        title={`Click to mark as ${nextStatus}`}
                      >
                        {item.status}
                      </button>

                      <span className="kitchen-item-price">₹{item.price * item.qty}</span>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default KitchenDashboard;
