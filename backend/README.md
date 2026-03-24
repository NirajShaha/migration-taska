# WVTA CoC Backend - Spring Boot Application

Spring Boot 3.2.0 REST API for WVTA Certificate of Conformity (CoC) management system.

## Quick Start

### Prerequisites
- Java 21+
- Maven 3.8+
- MySQL 8.0+

### Build & Run

```bash
# Install dependencies and build
mvn clean package

# Run application
java -jar target/wvta-coc-backend-1.0.0.jar

# Or use Maven
mvn spring-boot:run
```

Server will start on `http://localhost:8080`

### Database Setup

1. Create database:
```bash
mysql -u root -p
CREATE DATABASE automotive_db CHARACTER SET utf8mb4;
```

2. Update `application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/automotive_db
spring.datasource.username=root
spring.datasource.password=YOUR_PASSWORD
```

3. Flyway will automatically create schema on startup

## API Endpoints

### Variants (HAT_VAR_VARIANT - HATVAR in COBOL)
```
GET  /api/variants/lookup?model=X&type=XXXX&startDate=YYYY-MM-DD&endDate=YYYY-MM-DD&variant=XXXXXX&manf=X
POST /api/variants
PUT  /api/variants/{model}/{type}/{startDate}/{endDate}/{variant}/{manf}
POST /api/variants/validate-powered-axles?poweredAxles=X&position=Xal&interconnection=X...
```

### Types (HAT_TYP_TYPE - HATTYP in COBOL)
```
GET /api/types/lookup?model=X&type=XXXX&startDate=YYYY-MM-DD&endDate=YYYY-MM-DD&manf=X
PUT /api/types/{model}/{type}/{startDate}/{endDate}/{manf}/approval
```

### VAC Fields (HAT_VAC_VARIANT - HA300T in COBOL)
```
POST /api/vac/update-field?model=...&type=...&fieldNo=1&subField=1&value=...&userId=...
```

### COC Fields (HAT_COC_TYPE - HA900T in COBOL)
```
POST /api/coc/update-field?model=...&type=...&fieldNo=...&subField=...&country=...&value=...&userId=...
```

## Project Structure

```
src/main/java/com/automotive/
├── controller/          # REST endpoints
├── service/            # Business logic
├── entity/             # JPA entities
├── repository/         # Data access
├── validator/          # Field validation
├── dto/                # Request/Response DTOs
└── exception/          # Error handling
```

## Field Validation

All field validation is implemented in `FieldValidator`:
- Position/Interconnection: No commas, length limits
- Wheelbase: "H" or numeric NNNN format
- Track/Height/Length/Width: Complex date-based patterns
- Overhang: Multiple formats, Landrover-specific rules
- Date fields: Format validation with 2004-03-01 threshold

## Configuration

Key settings in `application.properties`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/automotive_db
spring.jpa.hibernate.ddl-auto=validate
spring.flyway.enabled=true
logging.level.com.automotive=DEBUG
```

## Database Tables

- `hat_typ_type` - 5-part composite key
- `hat_var_variant` - 6-part composite key
- `hat_vac_variant` - 8-part composite key
- `hat_coc_type` - 8-part composite key
- `audit_log` - Change tracking

All with timestamp + userid audit fields matching COBOL system.

## Error Handling

Errors return consistent JSON format:
```json
{
  "status": 400,
  "message": "Validation error details",
  "timestamp": "2024-03-01T10:30:00"
}
```

HTTP Status Codes:
- 200: Success
- 201: Created
- 400: Validation error
- 404: Resource not found
- 500: Server error

## Testing

Run unit tests:
```bash
mvn test
```

Run integration tests:
```bash
mvn verify
```

## Connection from Frontend

Frontend connects via axios client:
```
Default: http://localhost:8080/api
Configurable: NEXT_PUBLIC_API_BASE_URL environment variable
```

## Deployment

### Docker

```bash
# Build image
docker build -t wvta-coc-backend:1.0.0 .

# Run container
docker run -e SPRING_DATASOURCE_URL=jdbc:mysql://mysql:3306/automotive_db \
           -p 8080:8080 wvta-coc-backend:1.0.0
```

### Cloud Platforms
- AWS: Deploy JAR to Elastic Beanstalk or EC2
- GCP: Cloud Run or App Engine
- Azure: App Service
- Kubernetes: Create Docker image, deploy with Helm

## Performance Notes

- JPA caching enabled
- Batch inserts: 20 records per batch
- Index on all composite keys
- UTF-8 charset for international characters

## Security Considerations

- Add Spring Security for authentication
- Implement JWT tokens for API requests
- Rate limiting on public endpoints
- SQL injection prevention via JPA (automatic)
- Input validation on all fields

## Support & Debugging

Enable debug logging:
```properties
logging.level.org.springframework.web=DEBUG
logging.level.org.hibernate.SQL=DEBUG
logging.level.com.automotive=DEBUG
```

View database operations:
```bash
tail -f application.log | grep "SELECT\|UPDATE\|INSERT"
```

---

**Version**: 1.0.0
**Framework**: Spring Boot 3.2.0
**Java**: 21+
**License**: Internal Use Only
