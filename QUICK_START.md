# WVTA CoC Management System - Quick Start Guide

## 📋 Pre-Flight Checklist

Before starting the application, ensure you have:

- [ ] MySQL 8.0+ installed and running on localhost:3306
- [ ] Java 17+ installed
- [ ] Node.js 18+ installed
- [ ] Maven installed
- [ ] Postman installed (for API testing)
- [ ] Git cloned the repository

## 🚀 Quick Start (5 minutes)

### Terminal 1: Start Backend

```bash
cd backend
mvn clean spring-boot:run
```

✅ Backend ready when you see: `Started WvtaCocApplication`
- Access: `http://localhost:8080/api`

### Terminal 2: Start Frontend

```bash
cd frontend
npm install  # Only needed first time
npm run dev
```

✅ Frontend ready when you see: `Ready in X.XXs`
- Access: `http://localhost:3000`

## 🧪 Testing (Choose One Method)

### Option 1: Web UI Testing (Easiest)
1. Open `http://localhost:3000` in browser
2. Submit a form with test data
3. Check success message

### Option 2: Postman Testing (Recommended for APIs)
1. Import `POSTMAN_COLLECTION.json` into Postman
2. Set variable: `base_url = http://localhost:8080/api`
3. Run test requests

### Option 3: cURL Testing (Command Line)

```bash
# Lookup Type
curl "http://localhost:8080/api/types/lookup?model=A&type=ABC1&startDate=2024-01-01&endDate=2025-12-31&manf=M"

# Update Type Approval
curl -X PUT "http://localhost:8080/api/types/A/ABC1/2024-01-01/2025-12-31/M/approval" \
  -H "Content-Type: application/json" \
  -d '{
    "typModel": "A",
    "typType": "ABC1",
    "typStartDate": "2024-01-01",
    "typEndDate": "2025-12-31",
    "typManf": "M",
    "typApprovalNo": "EU2024/001",
    "typApprDate": "2024-03-15",
    "typSmallSeries": "Y",
    "userId": "USER001"
  }'
```

## 📊 Sample Test Data

### Type Data
```
Model: A
Type: ABC1
Start: 2024-01-01
End: 2025-12-31
Manufacturer: M
Approval No: EU2024/001
User: USER001
```

### Variant Data
```
Model: A
Type: ABC1
Variant: VAR001
Manufacturer: M
Engine: 2.0L-DIESEL
Wheelbase: 2850
Length: 4800
Width: 1900
Height: 1650
User: USER001
```

## 🔗 Frontend Form Fields

### Type Approval Tab
- Model ✓ (required)
- Type ✓ (required)
- Start Date ✓ (required)
- End Date ✓ (required)
- Manufacturer ✓ (required)
- Approval No
- Approval Date (Day/Month/Year)
- Small Series
- User ID ✓ (required)

### Variant Management Tab
- Model ✓ (required)
- Type ✓ (required)
- Start Date ✓ (required)
- End Date ✓ (required)
- Variant ✓ (required)
- Manufacturer ✓ (required)
- Engine
- Testing Method
- All dimension fields (optional)
- CHIP Data checkbox
- User ID ✓ (required)

## 📡 API Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| GET | /types/lookup | Read type |
| PUT | /types/{...}/approval | Update type approval |
| GET | /variants/lookup | Read variant |
| PUT | /variants/{...} | Update variant |
| POST | /variants/validate-powered-axles | Validate axles |
| POST | /vac/update-field | Update VAC field |
| POST | /coc/update-field | Update COC field |

## 🐛 Common Issues & Fixes

| Issue | Solution |
|-------|----------|
| Port 8080 in use | Kill process or change port in application.properties |
| MySQL not connecting | Check MySQL running: `mysqld` or check connection string |
| CORS error | Ensure backend running before frontend |
| 404 /api/types | Check backend actually started (look for "Started WvtaCocApplication") |
| Form submit fails | Check browser console and backend logs for error details |

## 📝 Log Locations

```bash
# Backend logs
tail -f backend/target/wvta-coc-backend-1.0-SNAPSHOT.log

# Frontend build errors
npm run dev  # Shows errors directly
```

## 🔍 Debugging Tips

### Check Backend Health
```bash
curl http://localhost:8080/api/types/lookup?model=A&type=ABC1&startDate=2024-01-01&endDate=2025-12-31&manf=M
```

### Check Frontend Connection
- Open browser DevTools (F12)
- Go to Network tab
- Submit a form
- Check API call exists and response

### Check Database
```bash
mysql -u root -p automotive_db
SELECT COUNT(*) FROM hat_typ_type;
SELECT COUNT(*) FROM hat_var_variant;
```

## 📚 File Reference

| File | Purpose |
|------|---------|
| `API_TESTING_GUIDE.md` | Comprehensive testing documentation |
| `POSTMAN_COLLECTION.json` | Pre-configured Postman collection |
| `POSTMAN_TEST_DATA.sql` | Sample database records |
| `SETUP_COMPLETE.md` | Detailed setup summary |
| `backend/src/main/java/com/automotive/controller/*.java` | API endpoints |
| `frontend/src/components/*.tsx` | React form components |
| `frontend/src/lib/api.ts` | API client |
| `frontend/src/lib/schemas.ts` | Form validation schemas |

## ✅ Success Indicators

### Backend is Running
```
HHH000389: Database info:
  Database JDBC URL [...java.version...
  [Started WvtaCocApplication in X seconds]
```

### Frontend is Running
```
Ready in X.XXs
  ▲ Next.js 14.X.X
  - Local:     http://localhost:3000
```

### API is Working
- Can call `/types/lookup` and get response
- No 404 errors in console

### Form Submission Works
- No CORS errors in browser console
- Success message appears after submit
- No 500 errors in backend logs

## 🎯 First Time Setup Steps

1. Clone repository
2. Start MySQL service
3. Run backend:
   ```bash
   cd backend && mvn clean spring-boot:run
   ```
4. In another terminal, run frontend:
   ```bash
   cd frontend && npm install && npm run dev
   ```
5. Open `http://localhost:3000`
6. Fill form with sample data above
7. Submit and check for success message

## 📞 Need Help?

1. **Backend Issues** → Check `backend/target/logs/` or console output
2. **Frontend Issues** → Press F12 to open DevTools, check Console tab
3. **API Issues** → Use Postman to debug individual endpoints
4. **Database Issues** → Use `mysql` CLI to query directly

## 🔑 Important Files Modified

✅ `backend/src/main/java/com/automotive/entity/HatCocTypePK.java` - Fixed key length
✅ `backend/src/main/java/com/automotive/entity/HatTypTypePK.java` - Fixed key length
✅ `backend/src/main/java/com/automotive/entity/HatVacVariantPK.java` - Fixed key length
✅ `backend/src/main/java/com/automotive/entity/HatVarVariantPK.java` - Fixed key length
✅ `frontend/src/lib/api.ts` - Created API client
✅ `frontend/src/lib/schemas.ts` - Created validation schemas
✅ `frontend/.env.local` - Environment configuration

---

**All systems ready! Start with Terminal 1 and Terminal 2 steps above.** 🎉
