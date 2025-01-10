import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  Grid,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
} from "@mui/material";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { getJwtToken, removeJwtToken, validateJwt } from './LoginPage';

const CreditCard = ({ card, onClick }) => {
  const [showDetails, setShowDetails] = useState(false);

  const handleToggleDetails = async () => {
    setShowDetails(!showDetails);
    // Call API to log toggle action
    // axios.post("/api/toggleCardDetails", { cardId: card.creditCardId, showDetails: !showDetails });
    const axios = require('axios').default;

    const options = {
    method: 'PUT',
    url: 'http://localhost:8090/api/customer/creditcard/togglecreditcard/achilleyb/1/toggle'
    // url: `/api2/api/customer/creditcard/togglecreditcard/${username}//toggle`
    };

    try {
    const { data } = await axios.request(options);
    console.log(data);
    } catch (error) {
    console.error(error);
    }
  };

  return (
    <Card
      sx={{
        width: 320,
        height: 200,
        backgroundColor: "#0047ba",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 2,
        position: "relative",
        cursor: "pointer",
        boxShadow: 3,
        transition: "transform 0.3s ease",
        "&:hover": { transform: "scale(1.05)" },
      }}
      onClick={() => onClick(card.creditCardId)}
    >
        <Box sx={{ display: "flex", justifyContent: "space-between", marginLeft: 0}}>
            <Box
                component="img"
                src="/images/image03.png"
                alt="Walmart Logo"
                sx={{ width: 40, height: 40 }}
            />
            <Typography variant="h7" sx={{ marginLeft: 5, marginTop: 0 }}>Card ID: {`${card.creditCardId}`}</Typography>
            {/* <IconButton onClick={handleToggleDetails} sx={{ color: "#fff", marginLeft: 17 }}>
            {showDetails ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </IconButton> */}

            <Typography variant="h6" component="div" sx={{ color: "#ffcc00", marginTop: 0.5 }}>
            Walmart
            </Typography>

        </Box>

        {/* <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginLeft: 33 }}>       
            <IconButton onClick={handleToggleDetails} sx={{ color: "#fff" }}>
            {showDetails ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </IconButton>
        </Box> */}

        <Box>
            <Typography variant="h6" sx={{ letterSpacing: 2, textAlign: "center" }}>
            {showDetails ? card.creditCardNumber : "•••• •••• •••• ••••"}
            </Typography>
            
            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 2 }} >
                <Box>
                    <Typography variant="caption">Card Holder</Typography>
                    <Typography variant="body2">{card.holder}</Typography>
                </Box>

                {/* <Box>
                    <Typography variant="caption">CVV</Typography>
                    <Typography variant="body2">{`${card.cvv}`}</Typography>
                </Box> */}

                <Box>
                    <Typography variant="caption">Valid Till</Typography>
                    <Typography variant="body2">{`${card.expiryMonth}/${card.expiryYear}`}</Typography>
                </Box>
            </Box>
        </Box>
        
        <Box sx={{ display: "flex", justifyContent: "space-between", marginLeft: 0}}>
            <IconButton onClick={handleToggleDetails} sx={{ color: "#fff" }}>
                    {showDetails ? <VisibilityOffIcon /> : <VisibilityIcon />}
            </IconButton>

            <Typography variant="body2" align="right" sx={{ marginBottom :0 }} >
                {card.wireTransactionVendor.toUpperCase()}
            </Typography>
        </Box>
        
    </Card>
  );
};

function ViewExpenses() {
  const [creditCards, setCreditCards] = useState([]);
  const [selectedCard, setSelectedCard] = useState(null);
  const [numTransactions, setNumTransactions] = useState("");
  const [transactions, setTransactions] = useState([]);
  const navigate = useNavigate();
  const username = localStorage.getItem('username');

  useEffect(() => {
    const fetchCreditCards = async () => {
      try {
        const response = await axios.get(
          "/api2/api/customer/creditcard/listcreditcards/achilleyb"
        //   `/api2/api/customer/creditcard/listcreditcards/${username}`
        );
        const data = response.data;
        const activeCards = data.creditcards
          .filter((card) => card.status === "enabled")
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
        "/api2/api/customer/transactions/lastXTransactions/achilleyb",
        //   `/api2/api/customer/transactions/lastXTransactions/${username}`,
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
    setTransactions([]);
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

  const handleLogout = () => {
    // removeJwtToken();
    // localStorage.removeItem("userNameFirst");
    // localStorage.removeItem("userNameLast");
    localStorage.clear();
    navigate("/");
  };

  const token=getJwtToken();
  const isValid= validateJwt(token);
  if (isValid) 
    {
    return (
        <Box sx={{ padding: 3, minHeight: "100vh", backgroundColor: "#bfbaba" }}>
        <Button
            variant="contained"
            color="primary"
            onClick={goToHome}
            sx={{ position: "absolute", top: 16, right: 16 }}
        >
            Home
        </Button>

        <Button
            variant="contained"
            color="primary"
            onClick={handleLogout}
            sx={{ position: "absolute", top: 16, left: 16}}
        >
            Logout
        </Button>

        <Typography
            variant="h4"
            align="center"
            sx={{ marginTop: 5, marginBottom: 4 }}
        >
            Active Credit Cards
        </Typography>

        <Grid container spacing={3} justifyContent="center">
            {creditCards.length === 0 ? (
            <Typography>Loading credit cards...</Typography>
            ) : (
            creditCards.map((card) => (
                <Grid item key={card.creditCardId}>
                <CreditCard card={card} onClick={handleCardClick} />
                </Grid>
            ))
            )}
        </Grid>

        {selectedCard && (
            <Box
            sx={{
                marginTop: 4,
                padding: 5,
                backgroundColor: "#fff",
                borderRadius: 2,
                maxWidth: 800,
                mx: "auto",
            }}
            >
            <Typography variant="h5" gutterBottom sx={{ marginTop: 0 }}>
                Transactions for {creditCards.find((card) => card.creditCardId === selectedCard)?.holder}
            </Typography>

            <Typography variant="h7" sx={{ marginTop: 0 }}>
                Selected Card ID: {`${selectedCard}`}
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 3, marginTop: 3 }}>
                <TextField
                label="Number of Transactions"
                type="number"
                variant="outlined"
                value={numTransactions}
                onChange={(e) => setNumTransactions(e.target.value)}
                fullWidth
                />
                
                <Button variant="contained" onClick={handleTransactionsSubmit}>
                View
                </Button>
            </Box>

            {transactions.length > 0 ? (
                <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell>Amount</TableCell>
                        <TableCell>Date</TableCell>
                        <TableCell>Time</TableCell>
                        <TableCell>Type</TableCell>
                        <TableCell>Description</TableCell>
                    </TableRow>
                    </TableHead>
                    <TableBody>
                    {transactions.map((transaction) => (
                        <TableRow key={transaction.transactionId}>
                        <TableCell>{transaction.transactionId}</TableCell>
                        <TableCell>${transaction.transactionAmount.toFixed(2)}</TableCell>
                        <TableCell>{transaction.transactionDate}</TableCell>
                        <TableCell>{transaction.transactionTime}</TableCell>
                        <TableCell>{transaction.transactionType.toUpperCase()}</TableCell>
                        <TableCell>{transaction.transactionDesc}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
                </TableContainer>
            ) : (
                <Typography>No transactions found.</Typography>
            )}
            </Box>
        )}
        </Box>
    );
    }
    else
    {
      alert("Invalid JWT session Token");
      handleLogout();
      // navigate("/");
    }
}

export default ViewExpenses;
