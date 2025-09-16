# Google Scholar Auto-Update API Setup Guide

## Overview

This implementation provides an automated system to fetch publications from Google Scholar and update your website's publications section. The system consists of:

1. **Next.js API Route** (`app/api/scholar/route.ts`) - Handles requests from your frontend
2. **Python Scholar Service** (`scholar_service.py` or `advanced_scholar_service.py`) - Fetches data from Google Scholar
3. **Cron Job Script** (`scholar_update_cron.sh`) - Automates periodic updates
4. **Requirements** (`requirements.txt`) - Python dependencies

## ⚠️ Important Legal and Technical Considerations

### Legal Considerations
- **Google Scholar Terms of Service**: Automated scraping may violate Google's ToS
- **Rate Limiting**: Google implements CAPTCHAs and IP blocking for automated access
- **Academic Integrity**: Ensure compliance with academic institution policies
- **Data Usage**: Respect copyright and fair use policies

### Technical Limitations
- **No Official API**: Google Scholar doesn't provide an official API
- **Scraping Reliability**: Website structure changes can break scraping
- **Rate Limits**: Too frequent requests may result in IP bans
- **Data Accuracy**: Scraped data may not be 100% accurate

## 🚀 Quick Start

### 1. Install Python Dependencies

```bash
# Install required packages
pip install -r requirements.txt

# Or install individually:
pip install flask flask-cors requests scholarly beautifulsoup4
```

### 2. Start the Scholar Service

```bash
# For basic implementation
python scholar_service.py

# For advanced implementation with scholarly package
python advanced_scholar_service.py
```

The service will be available at `http://localhost:5000`

### 3. Test the API

```bash
# Test health endpoint
curl http://localhost:5000/api/health

# Fetch publications
curl "http://localhost:5000/api/publications?author_id=UEHiYcoAAAAJ"

# Trigger manual update
curl -X POST http://localhost:5000/api/publications/update \
  -H "Content-Type: application/json" \
  -d '{"author_id": "UEHiYcoAAAAJ", "force_update": true}'
```

### 4. Set Up Automatic Updates

```bash
# Make the cron script executable
chmod +x scholar_update_cron.sh

# Test the script manually
./scholar_update_cron.sh

# Add to crontab for daily updates at 6 AM
echo "0 6 * * * /path/to/scholar_update_cron.sh" | crontab -
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in your project root:

```env
# Scholar Service Configuration
SCHOLAR_SERVICE_URL=http://localhost:5000
AUTHOR_ID=UEHiYcoAAAAJ
MAX_PUBLICATIONS=50

# Next.js API Configuration
NEXTJS_API_URL=http://localhost:3000/api/scholar

# Logging
LOG_LEVEL=INFO
LOG_FILE=/var/log/scholar_update.log
```

### Author ID Configuration

To find your Google Scholar author ID:
1. Go to your Google Scholar profile
2. Look at the URL: `https://scholar.google.com/citations?user=YOUR_AUTHOR_ID`
3. Replace `UEHiYcoAAAAJ` with your actual author ID

## 📊 API Endpoints

### Scholar Service Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/health` | GET | Health check |
| `/api/publications` | GET | Fetch publications |
| `/api/publications/update` | POST | Trigger manual update |
| `/api/publications/compare` | POST | Compare with existing publications |

### Next.js API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/scholar` | GET | Fetch publications (proxy to Python service) |
| `/api/scholar` | POST | Trigger manual update |

## 🔄 Integration with Existing Publications

### Option 1: Replace Existing Data

```typescript
// In your publications page
const [publications, setPublications] = useState([]);

useEffect(() => {
  fetch('/api/scholar')
    .then(res => res.json())
    .then(data => {
      if (data.success) {
        setPublications(data.publications);
      }
    });
}, []);
```

### Option 2: Merge with Existing Data

```typescript
// Merge fetched publications with existing ones
const mergePublications = async () => {
  const response = await fetch('/api/scholar');
  const data = await response.json();
  
  if (data.success) {
    // Merge logic here
    const merged = [...existingPublications, ...data.publications];
    setPublications(merged);
  }
};
```

## 🛠️ Advanced Configuration

### Custom Publication Type Detection

Modify the `determinePublicationType` function in the Python service:

```python
def determine_publication_type(self, venue: str) -> str:
    venue_lower = venue.lower()
    
    # Add your custom logic here
    if 'your-conference-name' in venue_lower:
        return 'conference'
    elif 'your-journal-name' in venue_lower:
        return 'journal'
    
    # Default logic...
    return 'conference'
```

### Custom Data Processing

Add custom processing in the `format_publication` method:

```python
def format_publication(self, pub: Dict[str, Any], index: int) -> Dict[str, Any]:
    formatted = {
        "id": int(time.time()) + index,
        "title": pub.get("title", ""),
        "authors": ", ".join(pub.get("authors", [])),
        "venue": pub.get("venue", ""),
        "url": pub.get("url", ""),
        "year": pub.get("year", 0),
        "type": self.determine_publication_type(pub.get("venue", "")),
        "citations": pub.get("citations", 0)
    }
    
    # Add custom processing here
    formatted["custom_field"] = "your_custom_value"
    
    return formatted
```

## 🚨 Troubleshooting

### Common Issues

1. **Scholar Service Not Starting**
   ```bash
   # Check if port 5000 is available
   lsof -i :5000
   
   # Kill process if needed
   kill -9 $(lsof -t -i:5000)
   ```

2. **Import Errors**
   ```bash
   # Reinstall scholarly package
   pip uninstall scholarly
   pip install scholarly
   ```

3. **Rate Limiting**
   - Add delays between requests
   - Use proxy rotation
   - Implement exponential backoff

4. **Data Parsing Issues**
   - Check Google Scholar HTML structure changes
   - Update parsing logic accordingly
   - Add error handling for malformed data

### Debugging

Enable debug logging:

```python
import logging
logging.basicConfig(level=logging.DEBUG)
```

Check logs:

```bash
# Check cron job logs
tail -f /var/log/scholar_update.log

# Check Python service logs
tail -f scholar_service.log
```

## 🔒 Security Considerations

1. **API Security**: Add authentication to your API endpoints
2. **Rate Limiting**: Implement rate limiting to prevent abuse
3. **Input Validation**: Validate all input parameters
4. **Error Handling**: Don't expose sensitive information in error messages

## 📈 Monitoring and Maintenance

### Health Checks

Set up monitoring for:
- Scholar service availability
- API response times
- Data freshness
- Error rates

### Regular Maintenance

- Monitor Google Scholar for structure changes
- Update parsing logic as needed
- Review and update publication type detection
- Clean up old logs and temporary files

## 🎯 Best Practices

1. **Respectful Scraping**: Add delays between requests
2. **Error Handling**: Implement robust error handling
3. **Data Validation**: Validate all scraped data
4. **Backup Strategy**: Keep backups of your publication data
5. **Testing**: Test thoroughly before deploying to production

## 📞 Support

If you encounter issues:

1. Check the logs for error messages
2. Verify all dependencies are installed
3. Test each component individually
4. Review Google Scholar's current structure
5. Consider using alternative data sources

## 🔄 Alternative Approaches

If Google Scholar scraping becomes unreliable, consider:

1. **Manual Updates**: Regular manual updates with a simple admin interface
2. **RSS Feeds**: Some journals provide RSS feeds
3. **Academic APIs**: Use official APIs from publishers
4. **ORCID Integration**: Use ORCID API for publication data
5. **Database Exports**: Export from academic databases

---

**Disclaimer**: This implementation is for educational purposes. Always ensure compliance with terms of service and applicable laws when scraping websites.

