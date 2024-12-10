import React, { useState } from "react";
import "./ViewExpenses.css";

// Credit Cards Data
const creditCards = [
  { id: 1, name: "Card A", number: "5244 2150 8252 6420", expiry: "10/25", holder: "JOE ALISON", active: true },
  { id: 2, name: "Card B", number: "4539 1234 5678 9012", expiry: "12/23", holder: "JANE DOE", active: true },
  { id: 3, name: "Card C", number: "6011 9876 5432 1098", expiry: "08/24", holder: "JOHN SMITH", active: true },
  { id: 4, name: "Card C", number: "6011 9876 5432 1098", expiry: "08/24", holder: "JOHN SMITH", active: true },
  { id: 5, name: "Card C", number: "6011 9876 5432 1098", expiry: "08/24", holder: "JOHN SMITH", active: true },
];

const transactionsData = {
  1: [
    { id: 1, amount: 50, date: "2023-12-01" },
    { id: 2, amount: 30, date: "2023-11-25" },
    { id: 3, amount: 70, date: "2023-11-20" },
  ],
  2: [
    { id: 4, amount: 100, date: "2023-12-02" },
    { id: 5, amount: 200, date: "2023-11-30" },
  ],
  3: [
    { id: 6, amount: 150, date: "2023-11-28" },
    { id: 7, amount: 20, date: "2023-11-15" },
    { id: 8, amount: 300, date: "2023-11-10" },
    { id: 9, amount: 120, date: "2023-11-05" },
  ],
};

// Credit Card Component
const CreditCard = ({ card, onClick }) => {
  return (
    <div className="credit-card" onClick={() => onClick(card.id)}>
      <div className="chip"></div>
      <div className="card-details">
        <div className="card-number">{card.number}</div>
        <div className="card-info">
          <div>
            <span>Card Holder</span>
            <p>{card.holder}</p>
          </div>
          <div>
            <span>Valid Till</span>
            <p>{card.expiry}</p>
          </div>
        </div>
      </div>
      <div className="card-type">VISA</div>
    </div>
  );
};

function ViewExpenses() {
  const [selectedCard, setSelectedCard] = useState(null);
  const [numTransactions, setNumTransactions] = useState("");
  const [transactions, setTransactions] = useState([]);

  const handleCardClick = (cardId) => {
    setSelectedCard(cardId);
    setTransactions([]); // Reset transactions when switching cards
  };

  const handleTransactionsSubmit = () => {
    const parsedNumber = parseInt(numTransactions, 10);
    if (!Number.isNaN(parsedNumber) && parsedNumber > 0) {
      const cardTransactions = transactionsData[selectedCard] || [];
      const sortedTransactions = cardTransactions
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, parsedNumber);
      setTransactions(sortedTransactions);
    } else {
      alert("Please enter a valid number!");
    }
  };

  return (
    <div className="ViewExpenses">
      <h1>Active Credit Cards</h1>
      <div className="card-list">
        {creditCards
          .filter((card) => card.active)
          .map((card) => (
            <CreditCard key={card.id} card={card} onClick={handleCardClick} />
          ))}
      </div>
      {selectedCard && (
        <div className="transactions-section">
          <h2>Transactions for {creditCards.find((card) => card.id === selectedCard)?.name}</h2>
          <div className="transaction-input">
            <input
              type="number"
              placeholder="Enter number of transactions"
              value={numTransactions}
              onChange={(e) => setNumTransactions(e.target.value)}
            />
            <button onClick={handleTransactionsSubmit}>View</button>
          </div>
          {transactions.length > 0 && (
            <table className="transaction-table">
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Amount</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr key={transaction.id}>
                    <td>{transaction.id}</td>
                    <td>${transaction.amount}</td>
                    <td>{transaction.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}

export default ViewExpenses;
