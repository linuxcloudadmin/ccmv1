import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Import Axios
import "./ViewExpenses.css";

// Credit Card Component
const CreditCard = ({ card, onClick }) => {
  return (
    <div className="credit-card" onClick={() => onClick(card.creditCardId)}>
      <div className="chip"></div>
      <div className="card-details">
        <div className="card-number">{card.creditCardNumber}</div>
        <div className="card-info">
          <div>
            <span>Card Holder</span>
            <p>{card.holder}</p>
          </div>
          <div>
            <span>Valid Till</span>
            <p>{`${card.expiryMonth}/${card.expiryYear}`}</p>
          </div>
        </div>
      </div>
      <div className="card-type">{card.wireTransactionVendor.toUpperCase()}</div>
    </div>
  );
};

function ViewExpenses() {
  const [creditCards, setCreditCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [numTransactions, setNumTransactions] = useState("");
  const [transactions, setTransactions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch credit card data from API using Axios
    const fetchCreditCards = async () => {
      try {
        const response = await axios.get("/api2/api/customer/creditcard/achilleyb");
        const data = response.data;
        const activeCards = data.creditcards
          .filter((card) => card.status === "disabled")
          .map((card) => ({
            ...card,
            holder: data.nameOnTheCard,
          }));
        setCreditCards(activeCards);
      } catch (error) {
        console.error("Failed to fetch credit cards:", error);
      }
    };

    fetchCreditCards();
  }, []);

  const fetchTransactions = async (cardId, limit) => {
    try {
      const response = await axios.get(
        `/api2/api/customer/transactions/lastXTransactions/achilleyb`,
        {
          params: { limit, status: "both" },
        }
      );
      const data = response.data;
      setTransactions(data[cardId] || []);
    } catch (error) {
      console.error("Failed to fetch transactions:", error);
    }
  };

  const handleCardClick = (cardId) => {
    setSelectedCard(cardId);
    setTransactions([]); // Reset transactions when switching cards
  };

  const handleTransactionsSubmit = () => {
    const parsedNumber = parseInt(numTransactions, 10);
    if (!Number.isNaN(parsedNumber) && parsedNumber > 0) {
      fetchTransactions(selectedCard, parsedNumber);
    } else {
      alert("Please enter a valid number!");
    }
  };

  const goToHome = () => {
    navigate("/dashboard");
  };

  return (
    <div className="ViewExpenses">
      <button className="home-button" onClick={goToHome}>
        Home
      </button>

      <div className="cc-title">
        <h1>Active Credit Cards</h1>
      </div>

      <div className="card-list">
        {creditCards.length === 0 ? (
          <p>Loading credit cards...</p>
        ) : (
          creditCards.map((card) => (
            <CreditCard key={card.creditCardId} card={card} onClick={handleCardClick} />
          ))
        )}
      </div>
      {selectedCard && (
        <div className="transactions-section">
          <h2>
            Transactions for {creditCards.find((card) => card.creditCardId === selectedCard)?.holder}
          </h2>
          <div className="transaction-input">
            <input
              type="number"
              placeholder="Enter number of transactions"
              value={numTransactions}
              onChange={(e) => setNumTransactions(e.target.value)}
            />
            <button onClick={handleTransactionsSubmit}>View</button>
          </div>
          {transactions.length > 0 ? (
            <table className="transaction-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Type</th>
                  <th>Description</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr key={transaction.transactionId}>
                    <td>{transaction.transactionId}</td>
                    <td>${transaction.transactionAmount.toFixed(2)}</td>
                    <td>{transaction.transactionDate}</td>
                    <td>{transaction.transactionTime}</td>
                    <td>{transaction.transactionType.toUpperCase()}</td>
                    <td>{transaction.transactionDesc}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No transactions found.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default ViewExpenses;
