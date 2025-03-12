package main

import (
        "encoding/json"
        "fmt"
        "log"
        "net/http"
        "os"
        "regexp"
        "strconv"
        "time"
)

type PaymentType string

const (
        CreditCard PaymentType = "Credit Card"
        ACH        PaymentType = "ACH"
)

type PaymentRequest struct {
        PaymentType    PaymentType `json:"payment_type"`
        AccountNumber  string      `json:"account_number"`
        RoutingNumber  string      `json:"routing_number,omitempty"`
        ExpirationDate string      `json:"expiration_date,omitempty"`
        CVV           string      `json:"cvv,omitempty"`
        Amount        float64     `json:"amount"`
}

type PaymentResponse struct {
        Status  string `json:"status"`
        Message string `json:"message"`
}

var logger *log.Logger

func init() {
        // Open log file
        logFile, err := os.OpenFile("/workspace/goPay.log", os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0644)
        if err != nil {
                log.Fatal(err)
        }
        
        // Initialize logger
        logger = log.New(logFile, "", log.LstdFlags)
}

func isEvenAccountNumber(accountNumber string) bool {
        // Remove any non-numeric characters
        re := regexp.MustCompile("[^0-9]")
        cleanNumber := re.ReplaceAllString(accountNumber, "")
        
        if len(cleanNumber) == 0 {
                return false
        }

        // Get the last digit
        lastDigit, err := strconv.Atoi(string(cleanNumber[len(cleanNumber)-1]))
        if err != nil {
                return false
        }

        return lastDigit%2 == 0
}

func processPayment(w http.ResponseWriter, r *http.Request) {
        // Log request
        timestamp := time.Now().Format("2006-01-02 15:04:05")
        logger.Printf("[REQUEST] %s - %s %s\n", timestamp, r.Method, r.URL.Path)

        // Only allow POST method
        if r.Method != http.MethodPost {
                http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
                logger.Printf("[ERROR] %s - Method not allowed: %s\n", timestamp, r.Method)
                return
        }

        // Parse request body
        var req PaymentRequest
        if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
                http.Error(w, "Invalid request body", http.StatusBadRequest)
                logger.Printf("[ERROR] %s - Invalid request body: %v\n", timestamp, err)
                return
        }

        // Log request body
        reqJSON, _ := json.Marshal(req)
        logger.Printf("[REQUEST BODY] %s - %s\n", timestamp, string(reqJSON))

        // Validate payment type
        if req.PaymentType != CreditCard && req.PaymentType != ACH {
                http.Error(w, "Invalid payment type", http.StatusBadRequest)
                logger.Printf("[ERROR] %s - Invalid payment type: %s\n", timestamp, req.PaymentType)
                return
        }

        // Process based on account number
        var response PaymentResponse
        if isEvenAccountNumber(req.AccountNumber) {
                response = PaymentResponse{
                        Status:  "Success",
                        Message: "transaction is successful",
                }
        } else {
                response = PaymentResponse{
                        Status:  "Failure",
                        Message: "transaction is failed",
                }
        }

        // Set response headers
        w.Header().Set("Content-Type", "application/json")

        // Send response
        respJSON, _ := json.Marshal(response)
        w.Write(respJSON)

        // Log response
        logger.Printf("[RESPONSE] %s - %s\n", timestamp, string(respJSON))
}

func main() {
        // Log server start
        logger.Printf("[SERVER] Starting server on port 8080\n")

        // Register handler
        http.HandleFunc("/api/payment", processPayment)

        // Start server
        port := ":8080"
        logger.Printf("[SERVER] Listening on port %s\n", port)
        if err := http.ListenAndServe(port, nil); err != nil {
                logger.Fatalf("[ERROR] Failed to start server: %v\n", err)
        }
}