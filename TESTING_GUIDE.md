# Testing Guide - Contact Manager Features

This guide will help you systematically test all features of the Contact Manager application.

## Prerequisites

✅ Frontend server is running on http://localhost:5173
✅ You have registered an account and logged in

---

## Test 1: Multiple Contacts (Add 5-10 Contacts)

### Steps:
1. Click "Add Contact" button
2. Fill in the following contacts one by one:

**Contact 1:**
- Name: John Doe
- Email: john.doe@example.com
- Phone: +1-555-0101
- Company: Tech Corp
- Address: 123 Main St, New York
- Notes: Software Developer

**Contact 2:**
- Name: Jane Smith
- Email: jane.smith@example.com
- Phone: +1-555-0102
- Company: Design Studio
- Address: 456 Oak Ave, Los Angeles
- Notes: UX Designer

**Contact 3:**
- Name: Bob Johnson
- Email: bob.johnson@example.com
- Phone: +1-555-0103
- Company: Marketing Inc
- Notes: Marketing Manager

**Contact 4:**
- Name: Alice Williams
- Email: alice.w@example.com
- Phone: +1-555-0104
- Company: Finance Co
- Address: 789 Pine Rd, Chicago

**Contact 5:**
- Name: Charlie Brown
- Email: charlie.brown@example.com
- Phone: +1-555-0105
- Company: Education Plus
- Notes: Teacher

**Contact 6:**
- Name: Diana Prince
- Email: diana.prince@example.com
- Phone: +1-555-0106
- Company: Healthcare Group

**Contact 7:**
- Name: Edward Norton
- Email: ed.norton@example.com
- Phone: +1-555-0107
- Company: Media Corp
- Address: 321 Elm St, Boston

**Contact 8:**
- Name: Fiona Apple
- Email: fiona.apple@example.com
- Phone: +1-555-0108
- Company: Music Studio
- Notes: Musician

**Contact 9:**
- Name: George Lucas
- Email: george.lucas@example.com
- Phone: +1-555-0109
- Company: Film Production

**Contact 10:**
- Name: Helen Keller
- Email: helen.keller@example.com
- Phone: +1-555-0110
- Company: Non-Profit Org
- Notes: Author and Activist

### Expected Result:
✅ All 10 contacts should appear in the grid
✅ Each contact should have a unique card
✅ Contacts should be displayed in a responsive grid layout
✅ All contact information should be visible on the cards

---

## Test 2: Search - Filter Contacts by Name or Email

### Test 2.1: Search by Name
1. Type "John" in the search bar
2. **Expected:** Only "John Doe" contact should be visible

### Test 2.2: Search by Email
1. Clear search bar
2. Type "jane.smith" in the search bar
3. **Expected:** Only "Jane Smith" contact should be visible

### Test 2.3: Search by Phone
1. Clear search bar
2. Type "0103" in the search bar
3. **Expected:** Only "Bob Johnson" contact should be visible

### Test 2.4: Search by Company
1. Clear search bar
2. Type "Tech" in the search bar
3. **Expected:** Only "John Doe" (Tech Corp) should be visible

### Test 2.5: Case-Insensitive Search
1. Clear search bar
2. Type "JOHN" (uppercase) in the search bar
3. **Expected:** "John Doe" should still be found

### Test 2.6: Partial Match Search
1. Clear search bar
2. Type "Doe" in the search bar
3. **Expected:** "John Doe" should be found

### Test 2.7: No Results
1. Clear search bar
2. Type "XYZ123" in the search bar
3. **Expected:** "No contacts found" message should appear

### Test 2.8: Clear Search
1. Type something in search bar
2. Delete all text
3. **Expected:** All contacts should be visible again

---

## Test 3: Edit - Update Contact Information

### Steps:
1. Find "John Doe" contact card
2. Click the **Edit icon** (pencil icon) on the card
3. Modify the contact:
   - Change Phone to: +1-555-9999
   - Change Company to: New Tech Corp
   - Add Notes: Updated information
4. Click "Update" button
5. **Expected:** 
   - Success message: "Contact updated successfully"
   - Contact card should show updated information
   - Changes should be visible immediately

### Test 3.2: Edit Another Contact
1. Find "Jane Smith" contact
2. Click Edit icon
3. Change Email to: jane.smith.new@example.com
4. Update Address to: 999 New Street, San Francisco
5. Click "Update"
6. **Expected:** Changes should be saved and visible

### Test 3.3: Cancel Edit
1. Click Edit on any contact
2. Make some changes
3. Click "Cancel" button
4. **Expected:** 
   - Form should close
   - No changes should be saved
   - Original contact information should remain

---

## Test 4: Delete - Remove Contacts

### Test 4.1: Delete Single Contact
1. Find "Charlie Brown" contact
2. Click the **Delete icon** (trash icon)
3. Confirm deletion in the popup
4. **Expected:**
   - Success message: "Contact deleted successfully"
   - Contact should disappear from the list
   - Contact count should decrease

### Test 4.2: Cancel Deletion
1. Click Delete icon on any contact
2. Click "Cancel" in the confirmation dialog
3. **Expected:**
   - Contact should remain in the list
   - No changes should occur

### Test 4.3: Delete Multiple Contacts
1. Delete "Edward Norton" contact
2. Delete "Fiona Apple" contact
3. Delete "George Lucas" contact
4. **Expected:**
   - Each deletion should show success message
   - Contacts should be removed one by one
   - Remaining contacts should still be visible

### Test 4.4: Verify Deletion
1. After deleting contacts, refresh the page
2. **Expected:**
   - Deleted contacts should not reappear
   - Only remaining contacts should be visible

---

## Test 5: Logout/Login - Verify Data Persists

### Test 5.1: Logout
1. Click the **Logout icon** (top-right corner)
2. **Expected:**
   - You should be redirected to the login page
   - You should be logged out

### Test 5.2: Login Again
1. Enter your email and password
2. Click "Sign In"
3. **Expected:**
   - You should be redirected to contacts page
   - All your contacts should still be there
   - Contact count should be the same as before logout

### Test 5.3: Verify Data After Login
1. Check that all contacts are still present
2. Verify that edited contacts still have their updated information
3. Verify that deleted contacts are still deleted
4. **Expected:**
   - All data should be exactly as it was before logout
   - No data should be lost

---

## Test 6: Refresh - Confirm Data is Saved

### Test 6.1: Refresh Page
1. Make sure you have some contacts in the list
2. Press **F5** or click the browser refresh button
3. **Expected:**
   - Page should reload
   - You should still be logged in (if session persisted)
   - All contacts should still be visible
   - No data should be lost

### Test 6.2: Close and Reopen Browser
1. Close the browser tab completely
2. Open a new tab
3. Navigate to http://localhost:5173
4. Login with your credentials
5. **Expected:**
   - All contacts should be present
   - All data should be saved in localStorage
   - No data should be lost

### Test 6.3: Verify localStorage
1. Open browser DevTools (F12)
2. Go to "Application" tab
3. Click "Local Storage" → "http://localhost:5173"
4. Look for these keys:
   - `contact_manager_users`
   - `contact_manager_contacts`
   - `contact_manager_current_user`
5. **Expected:**
   - All keys should be present
   - Data should be in JSON format
   - Your contacts should be stored in `contact_manager_contacts`

---

## Test 7: Additional Features

### Test 7.1: Empty State
1. Delete all contacts
2. **Expected:**
   - "No contacts yet. Add your first contact!" message should appear
   - Add Contact button should still be visible

### Test 7.2: Add Contact with Minimal Data
1. Click "Add Contact"
2. Enter only Name: "Test Contact"
3. Leave all other fields empty
4. Click "Create"
5. **Expected:**
   - Contact should be created successfully
   - Only name should be displayed on the card
   - Other fields should be empty/not shown

### Test 7.3: Add Contact with All Fields
1. Click "Add Contact"
2. Fill in all fields (Name, Email, Phone, Address, Company, Notes, Avatar URL)
3. Click "Create"
4. **Expected:**
   - Contact should be created with all information
   - All fields should be visible on the contact card

### Test 7.4: Avatar Display
1. Add a contact with an Avatar URL (e.g., a profile picture URL)
2. **Expected:**
   - Avatar image should be displayed on the contact card
   - If no avatar, initials should be shown instead

---

## Success Criteria

✅ All 10 contacts can be added
✅ Search works for name, email, phone, and company
✅ Contacts can be edited and changes are saved
✅ Contacts can be deleted and removed from the list
✅ Data persists after logout and login
✅ Data persists after page refresh
✅ Data persists after browser close and reopen
✅ All CRUD operations work correctly
✅ No data loss occurs
✅ User interface is responsive and user-friendly

---

## Troubleshooting

### If contacts don't appear:
- Check browser console for errors (F12)
- Verify you're logged in
- Check localStorage in DevTools

### If search doesn't work:
- Clear the search bar and try again
- Check that you're typing the correct search term
- Verify contacts have the data you're searching for

### If data doesn't persist:
- Check browser localStorage is enabled
- Verify data exists in DevTools → Application → Local Storage
- Clear cache and try again

### If edit/delete doesn't work:
- Check browser console for errors
- Verify you're clicking the correct buttons
- Try refreshing the page

---

## Test Results Checklist

- [ ] Test 1: Multiple Contacts - PASSED
- [ ] Test 2: Search Functionality - PASSED
- [ ] Test 3: Edit Contacts - PASSED
- [ ] Test 4: Delete Contacts - PASSED
- [ ] Test 5: Logout/Login - PASSED
- [ ] Test 6: Refresh - PASSED
- [ ] Test 7: Additional Features - PASSED

---

## Notes

- All data is stored in browser localStorage
- Data is specific to each user
- Data persists across browser sessions
- No backend server is required
- Works completely offline

Happy Testing! 🎉

