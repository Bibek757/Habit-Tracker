# 🔧 LOGIN/REGISTRATION TROUBLESHOOTING GUIDE

## 🔴 If Login Shows "Login failed"

### **Issue #1: Database Not Running**

**Check MySQL Status:**
```powershell
# Windows: Check if MySQL service is running
Get-Service | Where-Object {$_.Name -like "*MySQL*"} | Select-Object Status

# Or start MySQL from command line
mysql -u root -p1234
```

If MySQL is not running:
- Windows: Start MySQL service from Services (services.msc)
- Or reinstall: `choco install mysql-server`

---

### **Issue #2: Database Doesn't Exist**

**Check if database exists:**
```powershell
mysql -u root -p1234 -e "SHOW DATABASES;"
```

If `habit_tracker` is NOT in the list:

**SOLUTION: Create database from schema**
```powershell
# Navigate to backend folder
cd C:\Users\Bibek\Documents\Practice\Tracker\backend

# Import schema
mysql -u root -p1234 < database/schema.sql

# Verify (should show 4 tables)
mysql -u root -p1234 -e "USE habit_tracker; SHOW TABLES;"
```

---

### **Issue #3: No Users in Database**

**Check if test user exists:**
```powershell
mysql -u root -p1234 -e "USE habit_tracker; SELECT COUNT(*) as user_count FROM users;"
```

If result is `0`:

**SOLUTION: Import fresh schema (which includes test user)**
```powershell
# Reset database
mysql -u root -p1234 -e "DROP DATABASE IF EXISTS habit_tracker;"

# Create fresh
mysql -u root -p1234 < database/schema.sql

# Verify user exists
mysql -u root -p1234 -e "USE habit_tracker; SELECT email, username FROM users;"
```

Output should show:
```
email                 username
test@example.com      testuser
demo@example.com      demouser
```

---

### **Issue #4: Wrong Database Credentials**

Check `.env` has correct credentials:

**File:** `backend/.env`
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=1234
DB_NAME=habit_tracker
DB_PORT=3306
```

If MySQL password is different:
1. Update `.env` with correct password
2. Restart backend with `npm run dev`

---

## 🟡 If Login Shows "Invalid email or password"

This means:
- ✅ Database connection is working
- ❌ User doesn't exist OR password doesn't match

**Solution:**

**Step 1: Check all users in database**
```powershell
mysql -u root -p1234 -e "USE habit_tracker; SELECT user_id, full_name, email, username FROM users;"
```

**Step 2: Try with email instead of username**
- If user exists, try: `test@example.com` instead of `testuser`

**Step 3: Verify password is correct**
- Default password from schema: `password123`
- Try this password

**Step 4: Create new test user**
```bash
# Open frontend, go to /register
# Create account with:
Full Name: Test User
Email: newtest@example.com
Username: newtest
Password: password123

# This will save to database
# Then login with those credentials
```

---

## 🟢 If Registration Shows "Registration failed"

### **Common Causes:**

**1. Email or Username Already Exists**
- Error: "Email already registered" or "Username already taken"
- **Solution**: Use unique email/username that doesn't exist in database

**2. Database Connection Issue**
- Check MySQL is running (see Issue #1 above)

**3. Missing Fields**
- Make sure you fill ALL fields
- Password must be 6+ characters

---

## 📋 Complete Diagnostic Checklist

Run this to diagnose ALL issues:

```powershell
# 1. Check MySQL is running
echo "=== MySQL Status ==="
Get-Service | Where-Object {$_.Name -like "*MySQL*"}

# 2. Check database exists
echo "=== Databases ==="
mysql -u root -p1234 -e "SHOW DATABASES;" | findstr habit_tracker

# 3. Check tables exist
echo "=== Tables ==="
mysql -u root -p1234 -e "USE habit_tracker; SHOW TABLES;"

# 4. Check users exist
echo "=== Users in Database ==="
mysql -u root -p1234 -e "USE habit_tracker; SELECT COUNT(*) as total_users FROM users;"

# 5. Check .env
echo "=== .env file ==="
Get-Content .\backend\.env | findstr "DB_"
```

---

## 🚨 COMPLETE RESET (Nuclear Option)

If nothing works, do a complete reset:

```powershell
# Stop backend
# Kill the backend process in terminal (Ctrl+C)

# 1. Drop and recreate database
mysql -u root -p1234 -e "DROP DATABASE IF EXISTS habit_tracker;"
mysql -u root -p1234 < "C:\Users\Bibek\Documents\Practice\Tracker\backend\database\schema.sql"

# 2. Verify
mysql -u root -p1234 -e "USE habit_tracker; SELECT COUNT(*) as users FROM users;"

# 3. Clear browser cache
# In browser: Clear cookies & cache (Ctrl+Shift+Delete)

# 4. Start backend again
cd C:\Users\Bibek\Documents\Practice\Tracker\backend
npm run dev

# 5. Open fresh frontend
# Clear localStorage: Press F12, go to Application, clear all
# Then navigate to http://localhost:5173/
```

---

## ✅ How to Know It's Fixed

When setup is correct, you should:

1. ✅ Backend shows: `✅ Connected to MySQL Database: habit_tracker`
2. ✅ Login page loads beautifully (modern UI)
3. ✅ Can login with: `test@example.com` / `password123`
4. ✅ See success message: ✓ Login successful! Redirecting...
5. ✅ Redirected to Dashboard
6. ✅ Dashboard shows user data
7. ✅ Can see habits list
8. ✅ Logout clears session

---

## 🆘 Still Not Working?

**Debug by checking backend console:**

When you run `npm run dev`, you should see:
```
✅ Connected to MySQL Database: habit_tracker
✅ Server running on port 5000
```

When you try to login, check the backend terminal for error messages:
```
Login Error: [error message]
```

Copy that error message and follow the solutions above.

---

## 📞 Quick Reference

| Problem | Solution |
|---------|----------|
| MySQL not running | Start MySQL service |
| Database missing | Run `mysql < database/schema.sql` |
| No users | Reset database with schema |
| Wrong password | Use `password123` |
| Email already registered | Use unique email |
| Backend won't start | Check .env credentials |
| Can't find MySQL | Install from chocolatey: `choco install mysql-server` |

---

## 💡 Pro Tips

1. **Always check backend console** for the actual error
2. **MySQL password in .env** must match your MySQL password
3. **Database credentials** take effect after restart
4. **Clear browser cache** if login seems stuck
5. **Test with email first** (`test@example.com`), then try username

Good luck! 🚀

