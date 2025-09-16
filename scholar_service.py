#!/usr/bin/env python3
"""
Google Scholar Publications Fetcher Service

This service fetches publications from Google Scholar profiles and provides
a REST API for integration with Next.js applications.

Requirements:
- pip install scholarly requests flask flask-cors

Usage:
- python scholar_service.py
- API will be available at http://localhost:5000
"""

import json
import time
import logging
from typing import List, Dict, Any, Optional
from datetime import datetime
import requests
from flask import Flask, request, jsonify
from flask_cors import CORS

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)

class ScholarFetcher:
    """Handles fetching publications from Google Scholar"""
    
    def __init__(self):
        self.session = requests.Session()
        self.session.headers.update({
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
        })
    
    def fetch_publications(self, author_id: str, max_results: int = 50) -> List[Dict[str, Any]]:
        """
        Fetch publications from Google Scholar profile
        
        Args:
            author_id: Google Scholar author ID
            max_results: Maximum number of publications to fetch
            
        Returns:
            List of publication dictionaries
        """
        try:
            # This is a simplified implementation
            # In practice, you would use the scholarly package or implement proper scraping
            
            # For demonstration, we'll return mock data
            # Replace this with actual scholarly scraping logic
            
            mock_publications = [
                {
                    "title": "Resolving Indirect Calls in Binary Code via Cross-Reference Augmented Graph Neural Networks",
                    "authors": ["Haotian Zhang", "Kun Liu", "Cristian Garces", "Chenke Luo", "Yu Lei", "Jiang Ming"],
                    "venue": "arXiv preprint arXiv:2507.18801",
                    "year": 2025,
                    "url": "https://doi.org/10.48550/arXiv.2507.18801",
                    "citations": 0,
                    "pub_url": "https://doi.org/10.48550/arXiv.2507.18801"
                },
                {
                    "title": "Efficient Adaptation of Large Language Models for Smart Contract Vulnerability Detection",
                    "authors": ["Fadul Sikder", "Yu Lei", "Yuede Ji"],
                    "venue": "Proceedings of the 21st International Conference on Predictive Models and Data Analytics in Software Engineering",
                    "year": 2025,
                    "url": "https://doi.org/10.1145/3727582.3728688",
                    "citations": 0,
                    "pub_url": "https://doi.org/10.1145/3727582.3728688"
                },
                {
                    "title": "Fairness Testing of Machine Learning Models using Combinatorial Testing in Latent Space",
                    "authors": ["Arjun Dahal", "Sunny Shree", "Yu Lei", "Raghu N Kacker", "D Richard Kuhn"],
                    "venue": "2025 IEEE International Conference on Software Testing, Verification and Validation Workshops (ICSTW)",
                    "year": 2025,
                    "url": "https://ieeexplore.ieee.org/abstract/document/10962484",
                    "citations": 0,
                    "pub_url": "https://ieeexplore.ieee.org/abstract/document/10962484"
                }
            ]
            
            logger.info(f"Fetched {len(mock_publications)} publications for author {author_id}")
            return mock_publications[:max_results]
            
        except Exception as e:
            logger.error(f"Error fetching publications: {str(e)}")
            return []
    
    def determine_publication_type(self, venue: str) -> str:
        """Determine publication type based on venue"""
        venue_lower = venue.lower()
        
        if any(keyword in venue_lower for keyword in ['proceedings', 'conference', 'symposium']):
            return 'conference'
        elif any(keyword in venue_lower for keyword in ['journal', 'ieee transactions', 'acm']):
            return 'journal'
        elif 'workshop' in venue_lower:
            return 'workshop'
        elif any(keyword in venue_lower for keyword in ['book', 'chapter']):
            return 'book'
        
        return 'conference'  # Default
    
    def format_publication(self, pub: Dict[str, Any], index: int) -> Dict[str, Any]:
        """Format publication data for our application"""
        return {
            "id": int(time.time()) + index,  # Generate unique ID
            "title": pub.get("title", ""),
            "authors": ", ".join(pub.get("authors", [])),
            "venue": pub.get("venue", ""),
            "url": pub.get("url", ""),
            "year": pub.get("year", 0),
            "type": self.determine_publication_type(pub.get("venue", "")),
            "citations": pub.get("citations", 0)
        }

# Initialize the fetcher
scholar_fetcher = ScholarFetcher()

@app.route('/api/publications', methods=['GET'])
def get_publications():
    """Get publications for a specific author"""
    try:
        author_id = request.args.get('author_id', 'UEHiYcoAAAAJ')
        max_results = int(request.args.get('max_results', 50))
        
        logger.info(f"Fetching publications for author: {author_id}")
        
        # Fetch raw publications
        raw_publications = scholar_fetcher.fetch_publications(author_id, max_results)
        
        # Format publications
        formatted_publications = [
            scholar_fetcher.format_publication(pub, i) 
            for i, pub in enumerate(raw_publications)
        ]
        
        return jsonify({
            "success": True,
            "publications": formatted_publications,
            "total": len(formatted_publications),
            "author_id": author_id,
            "timestamp": datetime.now().isoformat()
        })
        
    except Exception as e:
        logger.error(f"Error in get_publications: {str(e)}")
        return jsonify({
            "success": False,
            "error": str(e),
            "message": "Failed to fetch publications"
        }), 500

@app.route('/api/publications/update', methods=['POST'])
def update_publications():
    """Trigger a manual update of publications"""
    try:
        data = request.get_json() or {}
        author_id = data.get('author_id', 'UEHiYcoAAAAJ')
        force_update = data.get('force_update', False)
        
        logger.info(f"Manual update triggered for author: {author_id}")
        
        # Fetch latest publications
        raw_publications = scholar_fetcher.fetch_publications(author_id)
        formatted_publications = [
            scholar_fetcher.format_publication(pub, i) 
            for i, pub in enumerate(raw_publications)
        ]
        
        return jsonify({
            "success": True,
            "message": "Update completed successfully",
            "publications": formatted_publications,
            "total": len(formatted_publications),
            "author_id": author_id,
            "timestamp": datetime.now().isoformat()
        })
        
    except Exception as e:
        logger.error(f"Error in update_publications: {str(e)}")
        return jsonify({
            "success": False,
            "error": str(e),
            "message": "Failed to update publications"
        }), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    """Health check endpoint"""
    return jsonify({
        "status": "healthy",
        "timestamp": datetime.now().isoformat(),
        "service": "Google Scholar Publications Fetcher"
    })

if __name__ == '__main__':
    logger.info("Starting Google Scholar Publications Fetcher Service")
    logger.info("Service will be available at http://localhost:5000")
    app.run(host='0.0.0.0', port=5000, debug=True)

