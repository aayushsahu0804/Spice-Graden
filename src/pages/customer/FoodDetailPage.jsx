import { useNavigate } from "react-router-dom";

function FoodDetailPage() {
  const navigate = useNavigate();

  return (
    <div>
      <h1>Food Detail Page</h1>

      <button onClick={() => navigate("/cart")}>
        Add to Cart
      </button>
    </div>
  );
}

export default FoodDetailPage;