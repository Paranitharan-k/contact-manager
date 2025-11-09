// LocalStorage service for offline/local-only mode

export interface Contact {
  _id?: string;
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  company?: string;
  notes?: string;
  tags?: string[];
  reminder?: string | null; // ISO date string
  avatar?: string;
  createdAt?: string;
  updatedAt?: string;
}

interface StoredUser {
  id: string;
  username: string;
  email: string;
  password: string; // In real app, this would be hashed
}

const STORAGE_KEYS = {
  USERS: 'contact_manager_users',
  CONTACTS: 'contact_manager_contacts',
  CURRENT_USER: 'contact_manager_current_user',
};

// Helper functions
const getStorageItem = <T>(key: string, defaultValue: T): T => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
};

const setStorageItem = <T>(key: string, value: T): void => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

// User management
export const userStorage = {
  getUsers: (): StoredUser[] => {
    return getStorageItem<StoredUser[]>(STORAGE_KEYS.USERS, []);
  },

  saveUser: (user: StoredUser): void => {
    const users = userStorage.getUsers();
    const existingIndex = users.findIndex((u) => u.email === user.email);
    if (existingIndex >= 0) {
      users[existingIndex] = user;
    } else {
      users.push(user);
    }
    setStorageItem(STORAGE_KEYS.USERS, users);
  },

  findUserByEmail: (email: string): StoredUser | null => {
    const users = userStorage.getUsers();
    return users.find((u) => u.email === email) || null;
  },

  setCurrentUser: (user: { id: string; username: string; email: string } | null): void => {
    if (user) {
      setStorageItem(STORAGE_KEYS.CURRENT_USER, user);
    } else {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    }
  },

  getCurrentUser: (): { id: string; username: string; email: string } | null => {
    return getStorageItem(STORAGE_KEYS.CURRENT_USER, null);
  },
};

// Contact management
export const contactStorage = {
  getContacts: (userId: string): Contact[] => {
    const allContacts = getStorageItem<Record<string, Contact[]>>(STORAGE_KEYS.CONTACTS, {});
    return allContacts[userId] || [];
  },

  saveContacts: (userId: string, contacts: Contact[]): void => {
    const allContacts = getStorageItem<Record<string, Contact[]>>(STORAGE_KEYS.CONTACTS, {});
    allContacts[userId] = contacts;
    setStorageItem(STORAGE_KEYS.CONTACTS, allContacts);
  },

  addContact: (userId: string, contact: Omit<Contact, '_id' | 'createdAt' | 'updatedAt'>): Contact => {
    const contacts = contactStorage.getContacts(userId);
    // Prevent duplicates: same email OR same name+phone
    const duplicate = contacts.find((c) => {
      if (contact.email && c.email && c.email.toLowerCase() === (contact.email || '').toLowerCase()) return true;
      if (contact.phone && c.phone && c.phone === contact.phone && c.name.toLowerCase() === contact.name.toLowerCase()) return true;
      return false;
    });
    if (duplicate) {
      throw new Error('A contact with same email or same name+phone already exists');
    }

    const newContact: Contact = {
      ...contact,
      _id: `contact_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    contacts.push(newContact);
    contactStorage.saveContacts(userId, contacts);
    return newContact;
  },

  updateContact: (userId: string, id: string, updates: Partial<Contact>): Contact | null => {
    const contacts = contactStorage.getContacts(userId);
    const index = contacts.findIndex((c) => c._id === id);
    if (index === -1) return null;
    // Check duplicate on email or (name+phone) if those fields are being updated
    const existing = contacts[index];
    const newEmail = updates.email !== undefined ? updates.email : existing.email;
    const newPhone = updates.phone !== undefined ? updates.phone : existing.phone;
    const newName = updates.name !== undefined ? updates.name : existing.name;

    const duplicate = contacts.find((c) => {
      if (c._id === id) return false;
      if (newEmail && c.email && c.email.toLowerCase() === newEmail.toLowerCase()) return true;
      if (newPhone && c.phone && c.phone === newPhone && c.name.toLowerCase() === newName.toLowerCase()) return true;
      return false;
    });
    if (duplicate) {
      throw new Error('Update would create a duplicate contact (email or name+phone)');
    }
    contacts[index] = {
      ...contacts[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };
    contactStorage.saveContacts(userId, contacts);
    return contacts[index];
  },

  deleteContact: (userId: string, id: string): boolean => {
    const contacts = contactStorage.getContacts(userId);
    const filtered = contacts.filter((c) => c._id !== id);
    if (filtered.length === contacts.length) return false;
    contactStorage.saveContacts(userId, filtered);
    return true;
  },

  getContact: (userId: string, id: string): Contact | null => {
    const contacts = contactStorage.getContacts(userId);
    return contacts.find((c) => c._id === id) || null;
  },
};

// Generate a simple token (just for localStorage compatibility)
const generateToken = (userId: string): string => {
  return `local_token_${userId}_${Date.now()}`;
};

// Auth API (localStorage-based)
export const authAPI = {
  register: async (username: string, email: string, password: string) => {
    // Check if user already exists
    const existingUser = userStorage.findUserByEmail(email);
    if (existingUser) {
      throw new Error('User already exists with this email');
    }

    // Create new user
    const userId = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const newUser: StoredUser = {
      id: userId,
      username,
      email,
      password, // In a real app, this would be hashed
    };

    userStorage.saveUser(newUser);

    const user = {
      id: userId,
      username,
      email,
    };

    const token = generateToken(userId);
    userStorage.setCurrentUser(user);

    return {
      token,
      user,
    };
  },

  login: async (email: string, password: string) => {
    const user = userStorage.findUserByEmail(email);
    if (!user || user.password !== password) {
      throw new Error('Invalid credentials');
    }

    const userData = {
      id: user.id,
      username: user.username,
      email: user.email,
    };

    const token = generateToken(user.id);
    userStorage.setCurrentUser(userData);

    return {
      token,
      user: userData,
    };
  },
};

// Contact API (localStorage-based)
export const contactAPI = {
  getContacts: async (): Promise<Contact[]> => {
    const currentUser = userStorage.getCurrentUser();
    if (!currentUser) {
      throw new Error('User not authenticated');
    }
    return contactStorage.getContacts(currentUser.id);
  },

  getContact: async (id: string): Promise<Contact> => {
    const currentUser = userStorage.getCurrentUser();
    if (!currentUser) {
      throw new Error('User not authenticated');
    }
    const contact = contactStorage.getContact(currentUser.id, id);
    if (!contact) {
      throw new Error('Contact not found');
    }
    return contact;
  },

  createContact: async (contact: Omit<Contact, '_id' | 'createdAt' | 'updatedAt'>): Promise<Contact> => {
    const currentUser = userStorage.getCurrentUser();
    if (!currentUser) {
      throw new Error('User not authenticated');
    }
    return contactStorage.addContact(currentUser.id, contact);
  },

  updateContact: async (id: string, contact: Partial<Contact>): Promise<Contact> => {
    const currentUser = userStorage.getCurrentUser();
    if (!currentUser) {
      throw new Error('User not authenticated');
    }
    const updated = contactStorage.updateContact(currentUser.id, id, contact);
    if (!updated) {
      throw new Error('Contact not found');
    }
    return updated;
  },

  deleteContact: async (id: string): Promise<void> => {
    const currentUser = userStorage.getCurrentUser();
    if (!currentUser) {
      throw new Error('User not authenticated');
    }
    const deleted = contactStorage.deleteContact(currentUser.id, id);
    if (!deleted) {
      throw new Error('Contact not found');
    }
  },
  // Import contacts from CSV string. Returns number imported and number skipped
  importFromCSV: async (csv: string): Promise<{ imported: number; skipped: number }> => {
    const currentUser = userStorage.getCurrentUser();
    if (!currentUser) throw new Error('User not authenticated');

    const lines = csv.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
    if (lines.length === 0) return { imported: 0, skipped: 0 };

    // Assume first line is header
    const header = lines[0].split(',').map((h) => h.trim().toLowerCase());
    let imported = 0;
    let skipped = 0;
    for (let i = 1; i < lines.length; i++) {
      const cols = lines[i].split(',').map((c) => c.trim());
      const row: any = {};
      for (let j = 0; j < header.length; j++) {
        row[header[j]] = cols[j] || '';
      }

      const toCreate: Omit<Contact, '_id' | 'createdAt' | 'updatedAt'> = {
        name: row['name'] || `${row['first'] || ''} ${row['last'] || ''}`.trim() || 'Unnamed',
        email: row['email'] || undefined,
        phone: row['phone'] || undefined,
        address: row['address'] || undefined,
        company: row['company'] || undefined,
        notes: row['notes'] || undefined,
        avatar: row['avatar'] || undefined,
        tags: row['tags'] ? row['tags'].split(';').map((t: string) => t.trim()).filter(Boolean) : undefined,
        reminder: row['reminder'] || null,
      };

      try {
        contactStorage.addContact(currentUser.id, toCreate);
        imported++;
      } catch (err) {
        skipped++;
      }
    }

    return { imported, skipped };
  },
  // Export contacts to CSV string
  exportToCSV: async (): Promise<string> => {
    const currentUser = userStorage.getCurrentUser();
    if (!currentUser) throw new Error('User not authenticated');
    const contacts = contactStorage.getContacts(currentUser.id);
    const header = ['name','email','phone','address','company','notes','tags','reminder','avatar','createdAt','updatedAt'];
    const rows = contacts.map((c) => {
      return header.map((h) => {
        let val: any;
        if (h === 'tags') {
          val = (c.tags || []).join(';');
        } else {
          val = (c as any)[h];
        }
        if (val === undefined || val === null) return '';
        // escape commas
        return String(val).replace(/\r?\n/g, ' ').replace(/,/g, '\\,');
      }).join(',');
    });
    return [header.join(','), ...rows].join('\n');
  },
};

// Export Contact type for use in components
// Contact interface is exported above

