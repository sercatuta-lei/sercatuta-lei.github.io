#!/bin/bash
# Google Scholar Publications Auto-Update Script
# This script runs periodically to check for new publications and update the website

# Configuration
SCHOLAR_SERVICE_URL="http://localhost:5000"
NEXTJS_API_URL="http://localhost:3000/api/scholar"
AUTHOR_ID="UEHiYcoAAAAJ"
LOG_FILE="/var/log/scholar_update.log"
LOCK_FILE="/tmp/scholar_update.lock"

# Function to log messages
log_message() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

# Function to check if script is already running
check_lock() {
    if [ -f "$LOCK_FILE" ]; then
        log_message "ERROR: Another instance is already running. Exiting."
        exit 1
    fi
    echo $$ > "$LOCK_FILE"
}

# Function to cleanup lock file
cleanup() {
    rm -f "$LOCK_FILE"
    log_message "Cleanup completed"
}

# Set trap to cleanup on exit
trap cleanup EXIT

# Main function
main() {
    log_message "Starting Google Scholar publications update check"
    
    # Check if scholar service is running
    if ! curl -s "$SCHOLAR_SERVICE_URL/api/health" > /dev/null; then
        log_message "ERROR: Scholar service is not running at $SCHOLAR_SERVICE_URL"
        exit 1
    fi
    
    # Check if Next.js API is available
    if ! curl -s "$NEXTJS_API_URL" > /dev/null; then
        log_message "ERROR: Next.js API is not available at $NEXTJS_API_URL"
        exit 1
    fi
    
    # Fetch current publications from scholar service
    log_message "Fetching publications from Google Scholar..."
    SCHOLAR_RESPONSE=$(curl -s "$SCHOLAR_SERVICE_URL/api/publications?author_id=$AUTHOR_ID")
    
    if [ $? -ne 0 ]; then
        log_message "ERROR: Failed to fetch publications from scholar service"
        exit 1
    fi
    
    # Check if response contains publications
    if echo "$SCHOLAR_RESPONSE" | grep -q '"success":true'; then
        log_message "Successfully fetched publications from Google Scholar"
        
        # Trigger update in Next.js application
        UPDATE_RESPONSE=$(curl -s -X POST "$NEXTJS_API_URL" \
            -H "Content-Type: application/json" \
            -d "{\"author_id\":\"$AUTHOR_ID\",\"force_update\":true}")
        
        if [ $? -eq 0 ]; then
            log_message "Successfully triggered update in Next.js application"
        else
            log_message "ERROR: Failed to trigger update in Next.js application"
        fi
    else
        log_message "ERROR: Scholar service returned unsuccessful response"
        echo "$SCHOLAR_RESPONSE" | tee -a "$LOG_FILE"
    fi
    
    log_message "Google Scholar publications update check completed"
}

# Check for lock and run main function
check_lock
main

