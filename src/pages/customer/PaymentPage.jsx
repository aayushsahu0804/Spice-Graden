import { useState } from "react";
import { useCart } from "../../context/CartContext";
import Navbar from "../../components/Navbar";
import { FaChevronDown, FaGooglePay, FaCcVisa, FaWallet } from "react-icons/fa";
import { SiPhonepe, SiPaytm } from "react-icons/si";
import "../../index.css";

function PaymentPage() {
  const { cart = [] } = useCart() || {};

  const [open, setOpen] = useState(null);
  const [method, setMethod] = useState("");

  const total = cart.reduce(
    (acc, item) => acc + item.price * item.qty,
    0
  );

  const toggle = (section) => {
    setOpen(open === section ? null : section);
  };

  return (
    <div className="payment-container">
      <Navbar title="Payment Page" />

      <h4 className="heading">PAYMENT METHODS</h4>

      {/* UPI */}
      <div className="dropdown-card">
        <div className="dropdown-header" onClick={() => toggle("upi")}>
          <span>UPI</span>
          <FaChevronDown />
        </div>

        {open === "upi" && (
          <div className="dropdown-content">
            <div className="option" onClick={() => setMethod("gpay")}>
              <FaGooglePay /> Google Pay
            </div>
            <div className="option" onClick={() => setMethod("phonepe")}>
              <SiPhonepe /> PhonePe
            </div>
            <div className="option" onClick={() => setMethod("paytm")}>
              <SiPaytm /> Paytm
            </div>
          </div>
        )}
      </div>

      {/* CARD */}
      <div className="dropdown-card">
        <div className="dropdown-header" onClick={() => toggle("card")}>
          <span>Credit/Debit Card</span>
          <FaChevronDown />
        </div>

        {open === "card" && (
          <div className="dropdown-content">
            {["HDFC Bank", "ICICI Bank", "SBI"].map((bank) => (
              <div
                key={bank}
                className="option"
                onClick={() => setMethod(bank)}
              >
                <FaCcVisa /> {bank}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* WALLET */}
      <div className="dropdown-card">
        <div className="dropdown-header" onClick={() => toggle("wallet")}>
          <span>Wallet</span>
          <FaChevronDown />
        </div>

        {open === "wallet" && (
          <div className="dropdown-content">
            {["Amazon Pay", "Mobikwik"].map((wallet) => (
              <div
                key={wallet}
                className="option"
                onClick={() => setMethod(wallet)}
              >
                <FaWallet /> {wallet}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* BUTTON */}
      <button className="pay-btn">
        Pay ₹{total}
      </button>
    </div>
  );
}

export default PaymentPage;