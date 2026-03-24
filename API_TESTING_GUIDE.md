# WVTA CoC Management System - API Testing Guide

## Overview

This guide provides instructions for testing the WVTA CoC Management System API using Postman and running the full-stack application.

## Quick Start

### Prerequisites
- MySQL 8.0+ running on localhost:3306
- Java 17+ for the backend
- Node.js 18+ for the frontend
- Postman for API testing

### Backend Setup

1. **Database Configuration**
   - Ensure MySQL is running
   - Database will be created automatically as `automotive_db`
   - Update `backend/src/main/resources/application.properties` if needed:
     ```properties
     spring.datasource.url=jdbc:mysql://localhost:3306/automotive_db
     spring.datasource.username=root
     spring.datasource.password=<your_password>
     ```

2. **Run Backend**
   ```bash
   cd backend
   mvn clean spring-boot:run
   ```
   - Backend runs on `http://localhost:8080/api`
   - Flyway migrations will run automatically

3. **Verify Backend is Running**
   ```bash
   curl http://localhost:8080/api/types/lookup?model=A&type=ABC1&startDate=2024-01-01&endDate=2025-12-31&manf=M
   ```

### Frontend Setup

1. **Install Dependencies**
   ```bash
   cd frontend
   npm install
   ```

2. **Configure Environment Variables**
   - `.env.local` is already configured with:
     ```
     NEXT_PUBLIC_API_URL=http://localhost:8080/api
     ```

3. **Run Frontend**
   ```bash
   npm run dev
   ```
   - Frontend runs on `http://localhost:3000`

## Postman Collection Setup

### Import Collection

1. **Download the Postman Collection**
   - Use the `POSTMAN_COLLECTION.json` file from the project root

2. **Import into Postman**
   - Open Postman
   - Click **Import**
   - Select the `POSTMAN_COLLECTION.json` file
   - Collection will be imported with all endpoints and sample data

3. **Set Base URL Variable**
   - In Postman, the collection uses `{{base_url}}` variable
   - Default value is set to `http://localhost:8080/api`
   - To change, click the **Variables** tab in the collection and update the `base_url` value

### Test Data for Each Endpoint

#### Type Management (HA100T)

**Lookup Type**
- **Endpoint**: `GET /types/lookup`
- **Sample Data**:
  ```
  model=A
  type=ABC1
  startDate=2024-01-01
  endDate=2025-12-31
  manf=M
  ```
- **Expected Response**: Type object with approval information

**Update Type Approval**
- **Endpoint**: `PUT /types/{model}/{type}/{startDate}/{endDate}/{manf}/approval`
- **Sample Request Body**:
  ```json
  {
    "typModel": "A",
    "typType": "ABC1",
    "typStartDate": "2024-01-01",
    "typEndDate": "2025-12-31",
    "typManf": "M",
    "typApprovalNo": "EU2024/001",
    "typApprDate": "2024-03-15",
    "typSmallSeries": "Y",
    "userId": "USER001"
  }
  ```

#### Variant Management (HA200T)

**Lookup Variant**
- **Endpoint**: `GET /variants/lookup`
- **Sample Data**:
  ```
  model=A
  type=ABC1
  startDate=2024-01-01
  endDate=2025-12-31
  variant=VAR001
  manf=M
  ```

**Update Variant**
- **Endpoint**: `PUT /variants/{model}/{type}/{startDate}/{endDate}/{variant}/{manf}`
- **Sample Request Body**:
  ```json
  {
    "varModel": "A",
    "varType": "ABC1",
    "varStartDate": "2024-01-01",
    "varEndDate": "2025-12-31",
    "varVariant": "VAR001",
    "varManf": "M",
    "varEngine": "2.0L-DIESEL",
    "varAxlesCocVal": "2,LongitudinalALL,Mechanical",
    "varCocAnnex": "EU2023-670",
    "varChipData": "N",
    "varGenTyrList": "Y",
    "varNewmodActmasInd": "Y",
    "userId": "USER001"
  }
  ```

**Validate Powered Axles**
- **Endpoint**: `POST /variants/validate-powered-axles`
- **Sample Data**:
  ```
  poweredAxles=2
  position=LongitudinalALL
  interconnection=Mechanical
  ```
- **Returns**: Boolean indicating if validation passes

#### VAC Fields Management (HA300T)

**Update VAC Field Examples**

1. **Axles/Wheels (Field 1)**
   - Endpoint: `POST /vac/update-field`
   - Sample parameters:
     ```
     fieldNo=1
     subField=1
     value=2
     ```

2. **Wheelbase (Field 3)**
   - Sample parameters:
     ```
     fieldNo=3
     subField=1
     value=2850
     ```

3. **Vehicle Length (Field 5)**
   - Sample parameters:
     ```
     fieldNo=5
     subField=1
     value=4800
     ```

4. **Vehicle Width (Field 6)**
   - Sample parameters:
     ```
     fieldNo=6
     subField=1
     value=1900
     ```

5. **Vehicle Height (Field 7)**
   - Sample parameters:
     ```
     fieldNo=7
     subField=1
     value=1650
     ```

**Common VAC Update Parameters**:
```
model=A
type=ABC1
startDate=2024-01-01
endDate=2025-12-31
variant=VAR001
manf=M
userId=USER001
```

#### COC Fields Management (HA900T)

**Update COC Field Examples**

1. **Maximum Engine Power (P.1)**
   - Endpoint: `POST /coc/update-field`
   - Sample parameters:
     ```
     fieldNo=P.1
     subField=1
     country=DE
     value=180
     ```

2. **Fuel Type (P.2)**
   - Sample parameters:
     ```
     fieldNo=P.2
     subField=1
     country=DE
     value=Diesel
     ```

3. **Engine Code (P.3)**
   - Sample parameters:
     ```
     fieldNo=P.3
     subField=1
     country=DE
     value=TDI2024
     ```

**Common COC Update Parameters**:
```
model=A
type=ABC1
startDate=2024-01-01
endDate=2025-12-31
manf=M
userId=USER001
```

## Frontend Usage

### Running the Application

1. **Access in Browser**
   - Navigate to `http://localhost:3000`

2. **Available Tabs**
   - **Variant Management (HA003U)**: Update CoC content for variants
   - **Type Approval (HA003U)**: Update type approval information

### Variant Management Form

Fill in the following sections:

**Type and Variant Information**
- Model (1 char, required)
- Type (max 4 chars, required)
- Start Date (required)
- End Date (required)
- Variant (max 6 chars, required)
- Manufacturer (1 char, required)

**Engine and Testing Information**
- Engine Code (max 12 chars)
- Testing Method (max 25 chars)

**Approval Information**
- Small Series Type Application (1 char)
- New Model for ACTMASS (1 char)

**Powered Axles Configuration**
- Axles/Wheels (max 12 chars)
- Position (max 21 chars, disabled if CHIP Data is checked)
- Interconnection (max 40 chars, disabled if CHIP Data is checked)
- Pos Wheel
- Steer Axle

**Vehicle Dimensions**
- Wheelbase (disabled if CHIP Data is checked)
- Track
- Length
- Length with Towbar
- Width
- Height
- Rear Overhang

**Vehicle Classification**
- Type of Body (max 25 chars)
- Class of Vehicle (max 3 chars, allowed: I/II/III/A/B)
- No and Configuration of Doors (max 50 chars)

**System Settings**
- CHIP Data checkbox (disables all CoC field editing when checked)

**Required Fields**
- User ID (max 8 chars)

### Type Approval Form

Fill in the following sections:

**Type Information**
- Model (1 char, required)
- Type (max 4 chars, required)
- Start Date (required)
- End Date (required)
- Manufacturer (1 char, required)

**Approval Information**
- Approval No (max 25 chars)
- Approval Date (Day, Month, Year)
- Small Series Type Application (1 char)

**Required Fields**
- User ID (max 8 chars)

## Sample Test Workflow

### 1. Create Test Data
First, ensure you have test data in the database by running the SAMPLE_DATA.sql:

```bash
mysql -u root automotive_db < SAMPLE_DATA.sql
```

### 2. Test Type Lookup
In Postman, run the "Lookup Type" request to verify data exists.

### 3. Update Type via API
Use the "Update Type Approval" request to modify approval number and date.

### 4. Test Variant Operations
- Use "Lookup Variant" to retrieve variant data
- Use "Update Variant" to modify variant information
- Use "Validate Powered Axles" to verify powered axles configuration

### 5. Update VAC Fields
- Make individual VAC field updates for dimensions and configuration

### 6. Update COC Fields
- Make individual COC field updates for country-specific specifications

### 7. Test via Frontend
- Open the frontend application
- Fill out the Variant Management form with test data
- Submit to verify the API calls are working correctly
- Check success message and verify data in database

## Validation Rules

### Type Model
- Must be 1 character
- Alphanumeric only

### Variant Type
- Max 4 characters

### Variant Code
- Max 6 characters

### Manufacturer
- Must be 1 character

### Wheelbase Validation
- If value is "H", it's treated as special flag (valid)
- Otherwise validates against standard patterns

### Position Field
- Cannot contain commas
- Max 21 characters

### Interconnection Field
- Cannot contain commas
- Max 40 characters

### Class of Vehicle
- Allowed values: I, II, III, A, B
- Max 3 characters

### Powered Axles Validation
- If powered axles value is provided with a quantity, Position and Interconnection become required

## Common Issues & Troubleshooting

### Backend Not Connecting
- Verify MySQL is running: `mysql -u root -p -e "SELECT 1"`
- Verify backend port 8080 is not in use
- Check application.properties database configuration

### Frontend Not Connecting to API
- Verify NEXT_PUBLIC_API_URL in `.env.local`
- Ensure backend server is running
- Check browser console for CORS errors

### Validation Errors from Frontend
- Check field length constraints
- Verify date format (YYYY-MM-DD)
- Ensure required fields are filled

### Database "Key Too Long" Error
- Run the entity migration fixes
- Ensure DDL auto-generation is complete

## Additional Resources

- **COBOL Mapping Constants**: See IMPLEMENTATION_SUMMARY.md
- **Database Schema**: See backend/src/main/resources/db/migration/V1__init.sql
- **Entity Documentation**: See entity classes in backend/src/main/java/com/automotive/entity/

## Support

For issues or questions:
1. Check the logs in the backend console
2. Review browser console in frontend
3. Verify test data exists in the database
4. Cross-reference with POSTMAN_COLLECTION.json for correct parameter formats
