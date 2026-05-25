import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useOrder } from "../../context/OrderContext";
import Navbar from "../../components/Navbar";
import { FaChevronDown } from "react-icons/fa";
import { SiGooglepay, SiPhonepe, SiPaytm } from "react-icons/si";
import { BsCreditCard2Front, BsWallet2 } from "react-icons/bs";
import { calcTotals } from "../../utils/helpers";
import "../../index.css";

function PaymentPage() {
  const { cart, cartCount } = useCart();
  const { placeOrder } = useOrder();
  const navigate = useNavigate();

  const [selectedMethod, setSelectedMethod] = useState(null);
  const [openSection, setOpenSection] = useState("upi");

  const { itemTotal, taxes, grandTotal } = calcTotals(cart);
  const toggle = (s) => setOpenSection(openSection === s ? null : s);

  const upiOptions = [
    { id: "gpay", label: "Google Pay", icon: <SiGooglepay size={22} color="#1a73e8" /> },
    { id: "phonepe", label: "PhonePe", icon: <SiPhonepe size={20} color="#5f259f" /> },
    { id: "paytm", label: "Paytm", icon: <SiPaytm size={20} color="#00b9f1" /> },
  ];

  const handlePay = async () => {
  if (!selectedMethod) return;

  const newOrder = await placeOrder(
    cart,
    grandTotal,
    selectedMethod
  );

  if (!newOrder) return;

  navigate("/success", {
    state: {
      order: newOrder,
    },
  });
};

  return (
    <div className="payment-page-wrap">
      <Navbar title="Payment" showCart={false} />

      <div className="payment-body">
        {/* Order summary strip */}
        <div className="payment-summary-strip">
          <span>{cartCount} item{cartCount !== 1 ? "s" : ""}</span>
          <span className="payment-summary-total">Total: ₹{grandTotal}</span>
        </div>

        {/* UPI */}
        <div className="pay-section-card">
          <div className="pay-section-header" onClick={() => toggle("upi")}>
            <span className="pay-section-title">🔗 UPI</span>
            <FaChevronDown className={`pay-chevron ${openSection === "upi" ? "open" : ""}`} />
          </div>
          {openSection === "upi" && (
            <div className="pay-options">
              {upiOptions.map((opt) => (
                <div
                  key={opt.id}
                  className={`pay-option-row ${selectedMethod === opt.id ? "selected" : ""}`}
                  onClick={() => setSelectedMethod(opt.id)}
                  role="radio"
                  aria-checked={selectedMethod === opt.id}
                  tabIndex={0}
                  onKeyDown={(e) => e.key === "Enter" && setSelectedMethod(opt.id)}
                >
                  <div className="pay-option-left">
                    <span className="pay-option-icon">{opt.icon}</span>
                    <span className="pay-option-label">{opt.label}</span>
                  </div>
                  <div className={`pay-radio ${selectedMethod === opt.id ? "active" : ""}`} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Credit/Debit Card */}
        <div className="pay-section-card">
          <div className="pay-section-header" onClick={() => toggle("card")}>
            <div className="pay-section-left">
              <BsCreditCard2Front size={18} className="pay-section-icon" />
              <span className="pay-section-title">Credit / Debit Card</span>
            </div>
            <FaChevronDown className={`pay-chevron ${openSection === "card" ? "open" : ""}`} />
          </div>
          {openSection === "card" && (
            <div className="pay-options">
              {["HDFC Bank", "ICICI Bank", "SBI"].map((bank) => (
                <div
                  key={bank}
                  className={`pay-option-row ${selectedMethod === bank ? "selected" : ""}`}
                  onClick={() => setSelectedMethod(bank)}
                  role="radio"
                  aria-checked={selectedMethod === bank}
                  tabIndex={0}
                >
                  <span className="pay-option-label">{bank}</span>
                  <div className={`pay-radio ${selectedMethod === bank ? "active" : ""}`} />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Wallet */}
        <div className="pay-section-card">
          <div className="pay-section-header" onClick={() => toggle("wallet")}>
            <div className="pay-section-left">
              <BsWallet2 size={18} className="pay-section-icon" />
              <span className="pay-section-title">Wallet</span>
            </div>
            <FaChevronDown className={`pay-chevron ${openSection === "wallet" ? "open" : ""}`} />
          </div>
          {openSection === "wallet" && (
            <div className="pay-options">
              {["Amazon Pay", "Mobikwik", "Freecharge"].map((w) => (
                <div
                  key={w}
                  className={`pay-option-row ${selectedMethod === w ? "selected" : ""}`}
                  onClick={() => setSelectedMethod(w)}
                  role="radio"
                  aria-checked={selectedMethod === w}
                  tabIndex={0}
                >
                  <span className="pay-option-label">{w}</span>
                  <div className={`pay-radio ${selectedMethod === w ? "active" : ""}`} />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Sticky Pay Button */}
      <div className="pay-footer">
        {!selectedMethod && (
          <p className="pay-hint">Select a payment method to continue</p>
        )}
        <button
          className={`pay-now-btn ${!selectedMethod ? "disabled" : ""}`}
          onClick={handlePay}
          disabled={!selectedMethod}
        >
          Pay ₹{grandTotal}
        </button>
      </div>
    </div>
  );
}

export default PaymentPage;
