import React, { useState } from "react";
import "./ViewExpenses.css";


const creditCards = [
  { id: 1, name: "Card A", active: true },
  { id: 2, name: "Card B", active: true },
  { id: 3, name: "Card C", active: true },
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

function ViewExpenses() {
  const [selectedCard, setSelectedCard] = useState(null);
  const [numTransactions, setNumTransactions] = useState("");
  const [transactions, setTransactions] = useState([]);

  const handleView = (cardId) => {
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
      <ul className="card-list">
        {creditCards
          .filter((card) => card.active)
          .map((card) => (
            <li key={card.id} className="card-item">
              <span>{card.name}</span>
              <button onClick={() => handleView(card.id)}>View</button>
            </li>
          ))}
      </ul>
      {selectedCard && (
        <div className="transactions-section">
          <h2>Transactions for {creditCards.find(card => card.id === selectedCard)?.name}</h2>
          <div className="transaction-input">
            <input
              type="number"
              placeholder="Enter number of transactions"
              value={numTransactions}
              onChange={(e) => setNumTransactions(e.target.value)}
            />
            <button onClick={handleTransactionsSubmit}>Submit</button>
          </div>
          {transactions.length > 0 && (
            <ul className="transaction-list">
              {transactions.map((transaction) => (
                <li key={transaction.id}>
                  <span>Amount: ${transaction.amount}</span>
                  <span>Date: {transaction.date}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}

export default ViewExpenses;
