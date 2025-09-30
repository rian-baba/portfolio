# Appwrite Setup Guide for Work Experience (Internships)

## 📋 Overview
Is guide mein aapko step-by-step bataya gaya hai ke Appwrite mein Work Experience (Internships) feature ke liye collection kaise setup karni hai.

---

## 🚀 Step 1: Appwrite Console mein Login karein

1. Apne Appwrite Console ko open karein: https://cloud.appwrite.io/ (ya apna self-hosted URL)
2. Apne project ko select karein

---

## 📁 Step 2: Database Select karein

1. Left sidebar mein **"Databases"** pe click karein
2. Apni existing database select karein (jahan aapne Portfolio aur Projects collections banayi hain)
   - Database ID note kar lein (ye already aapke `.env` file mein hoga as `VITE_APPWRITE_DATABASE_ID`)

---

## 📦 Step 3: New Collection Banayein

1. **"Create Collection"** button pe click karein
2. Collection details fill karein:
   - **Collection Name**: `Internships` (ya `Work Experience`)
   - **Collection ID**: `internships` (lowercase, no spaces)
     - **IMPORTANT**: Ye ID exactly `internships` honi chahiye
   - **Permissions**: 
     - **Read Access**: `Any` (taake visitors dekh sakein)
     - **Create/Update/Delete**: Admin only (authentication required)

3. **"Create"** pe click karein

---

## 🏗️ Step 4: Attributes (Columns) Add karein

Ab aapko collection mein attributes (database columns) add karni hain. Har attribute ke liye neeche diye gaye details follow karein:

### Attribute 1: **company** (Required)
- **Type**: `String`
- **Size**: `255`
- **Required**: ✅ Yes
- **Array**: ❌ No
- **Default**: (empty)

### Attribute 2: **role** (Required)
- **Type**: `String`
- **Size**: `255`
- **Required**: ✅ Yes
- **Array**: ❌ No
- **Default**: (empty)

### Attribute 3: **location** (Optional)
- **Type**: `String`
- **Size**: `255`
- **Required**: ❌ No
- **Array**: ❌ No
- **Default**: (empty)

### Attribute 4: **startDate** (Required)
- **Type**: `String`
- **Size**: `100`
- **Required**: ✅ Yes
- **Array**: ❌ No
- **Default**: (empty)
- **Example**: "Jun 2024" ya "January 2024"

### Attribute 5: **endDate** (Optional)
- **Type**: `String`
- **Size**: `100`
- **Required**: ❌ No
- **Array**: ❌ No
- **Default**: (empty)
- **Example**: "Sep 2024" ya "Present"

### Attribute 6: **description** (Required)
- **Type**: `String`
- **Size**: `5000` (large text)
- **Required**: ✅ Yes
- **Array**: ❌ No
- **Default**: (empty)
- **Note**: Har sentence automatically bullet point ban jayega

### Attribute 7: **tags** (Optional)
- **Type**: `String`
- **Size**: `100`
- **Required**: ❌ No
- **Array**: ✅ Yes (multiple values)
- **Default**: (empty)
- **Example**: ["React", "TypeScript", "Node.js"]

### Attribute 8: **link** (Optional)
- **Type**: `String`
- **Size**: `500`
- **Required**: ❌ No
- **Array**: ❌ No
- **Default**: (empty)
- **Example**: "https://company.com"

---

## 🔐 Step 5: Permissions Set karein

1. Collection settings mein **"Permissions"** tab pe jayein
2. **Read Access** (GET):
   - Add: `Any` (taake visitors bhi dekh sakein)
   
3. **Write Access** (CREATE, UPDATE, DELETE):
   - Sirf admin ke liye (authentication required)
   - Ya specific user ID add karein

---

## 🔑 Step 6: Environment Variable Add karein

Apni project ki root directory mein `.env` file open karein aur ye line add karein:

```env
VITE_APPWRITE_COLLECTION_INTERNSHIPS=internships
```

### Complete `.env` Example:
```env
VITE_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT_ID=your-project-id
VITE_APPWRITE_DATABASE_ID=your-database-id
VITE_APPWRITE_COLLECTION_PORTFOLIO=portfolio
VITE_APPWRITE_COLLECTION_PROJECTS=projects
VITE_APPWRITE_COLLECTION_INTERNSHIPS=internships
VITE_APPWRITE_ADMIN_USER_ID=your-admin-user-id
```

**Note**: Agar aapki Collection ID `internships` se different hai, to usko `.env` mein update kar dein.

---

## 🎯 Step 7: Development Server Restart karein

Environment variables ko load karne ke liye development server restart karna zaroori hai:

```bash
# Terminal mein Ctrl+C press karein (server stop karne ke liye)
# Phir dobara start karein:
npm run dev
```

---

## ✅ Step 8: Test karein

1. **Admin Sign In** karein (navbar se)
2. **Work Experience** section tak scroll karein
3. **"➕ Add Work Experience"** button pe click karein
4. Form fill karein aur **"Save Internship"** pe click karein
5. Appwrite Console mein **"Databases" → "Internships"** collection check karein
   - Aapko naya document dikhna chahiye

---

## 📊 Collection Structure Summary

| Attribute    | Type   | Required | Array | Size  | Example                          |
|--------------|--------|----------|-------|-------|----------------------------------|
| company      | String | ✅ Yes   | ❌ No | 255   | "Google"                         |
| role         | String | ✅ Yes   | ❌ No | 255   | "Frontend Intern"                |
| location     | String | ❌ No    | ❌ No | 255   | "Remote"                         |
| startDate    | String | ✅ Yes   | ❌ No | 100   | "Jun 2024"                       |
| endDate      | String | ❌ No    | ❌ No | 100   | "Sep 2024" or "Present"          |
| description  | String | ✅ Yes   | ❌ No | 5000  | "Built React components. Fixed bugs." |
| tags         | String | ❌ No    | ✅ Yes| 100   | ["React", "TypeScript"]          |
| link         | String | ❌ No    | ❌ No | 500   | "https://company.com"            |

---

## 🐛 Troubleshooting

### Error: "Collection not found"
- Check karein ke Collection ID exactly `internships` hai
- `.env` file mein `VITE_APPWRITE_COLLECTION_INTERNSHIPS=internships` add kiya hai
- Development server restart kiya hai

### Error: "Unauthorized"
- Admin sign in karein pehle
- Check karein ke aapka User ID `.env` mein `VITE_APPWRITE_ADMIN_USER_ID` ke sath match karta hai

### Data save nahi ho raha
- Browser console (F12) check karein for errors
- Appwrite Console → Logs check karein
- Collection permissions verify karein (Read: Any, Write: Admin only)

---

## 📝 Notes

- **Automatic Sync**: Jab bhi aap Work Experience add/edit/delete karenge, automatically Appwrite mein save ho jayega
- **LocalStorage Backup**: Agar Appwrite fail ho jaye, data localStorage mein bhi save hota hai
- **Visitor View**: Normal visitors ko sirf read access hai, edit nahi kar sakte

---

## 🎉 Done!

Aapka Work Experience feature ab fully Appwrite se integrated hai! 🚀

Agar koi issue aaye to:
1. Browser console check karein (F12 → Console tab)
2. Appwrite Console → Logs check karein
3. Is guide ko dobara follow karein step-by-step
