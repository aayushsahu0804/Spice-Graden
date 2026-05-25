import { useLocation, useNavigate } from "react-router-dom";
import { FaCheckCircle, FaUtensils } from "react-icons/fa";
import "../../index.css";

function OrderSuccessPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const order = location.state?.order;

  const steps = [
    { label: "Order\nConfirmed", done: true },
    { label: "Kitchen\nPreparing", done: false },
    { label: "Ready to\nServe", done: false },
  ];

  return (
    <div className="success-page">
      <div className="success-header">
        <h2 className="success-header-title">Order Status</h2>
      </div>

      <div className="success-body">
        {/* Animated icon */}
        <div className="success-icon-wrap">
          <div className="success-fork-icon">
            <FaUtensils size={42} color="#c45a00" />
          </div>
        </div>

        <h2 className="success-title">Order Placed!</h2>
        <p className="success-order-id">
          Order ID: <strong>{order?.id || "01201066234"}</strong>
        </p>

        {order?.method && (
          <p className="success-method">Paid via {order.method.toUpperCase()}</p>
        )}

        {/* Progress Tracker */}
        <div className="progress-section">
          <h4 className="progress-label">Progress Tracker</h4>
          <div className="progress-track">
            {steps.map((step, i) => (
              <div key={i} className="progress-step">
                <div className={`progress-dot ${step.done ? "done" : ""}`}>
                  {step.done && <FaCheckCircle size={10} color="white" />}
                </div>
                {i < steps.length - 1 && (
                  <div className={`progress-line ${step.done ? "done" : ""}`} />
                )}
                <p className="progress-step-label">{step.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Estimated Time */}
       <div className="success-time-card">
  <p className="success-time-label">Estimated Preparation Time</p>

  <p className="success-time-value">
    {order?.estimatedTime || 15} minutes
  </p>
</div>
        <div className="success-actions">
          <button className="success-menu-btn" onClick={() => navigate("/menu")}>
            Order More
          </button>
          <button className="success-track-btn" onClick={() => navigate("/kitchen")}>
            Track in Kitchen
          </button>
        </div>
      </div>
    </div>
  );
}

export default OrderSuccessPage;
