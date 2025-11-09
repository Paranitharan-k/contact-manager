import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Box,
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Snackbar,
  Alert,
  CircularProgress,
  Paper,
  MenuItem,
  FormControl,
  Select,
  InputLabel,
  Tooltip,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import LogoutIcon from '@mui/icons-material/Logout';
import DownloadIcon from '@mui/icons-material/Download';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { contactAPI, Contact } from '../services/localStorage';
import ContactCard from '../components/ContactCard';
import ContactForm from '../components/ContactForm';
import SearchBar from '../components/SearchBar';

const Contacts: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [filteredContacts, setFilteredContacts] = useState<Contact[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortMode, setSortMode] = useState<'alpha' | 'recent'>('alpha');
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [editingContact, setEditingContact] = useState<Contact | null>(null);
  const [saving, setSaving] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' as 'success' | 'error' });

  useEffect(() => {
    loadContacts();

    // Reminder check every minute
    const id = setInterval(() => {
      checkReminders();
    }, 60 * 1000);

    // run once immediately
    const t = setTimeout(() => checkReminders(), 1000);

    return () => {
      clearInterval(id);
      clearTimeout(t);
    };
  }, []);

  useEffect(() => {
    let filtered = contacts.filter((contact) =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.phone?.includes(searchTerm) ||
      contact.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (contact.tags || []).some((t) => t.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    if (sortMode === 'alpha') {
      filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      filtered = filtered.sort((a, b) => {
        const ta = a.createdAt ? new Date(a.createdAt).getTime() : 0;
        const tb = b.createdAt ? new Date(b.createdAt).getTime() : 0;
        return tb - ta;
      });
    }

    setFilteredContacts(filtered);
  }, [searchTerm, contacts, sortMode]);

  const loadContacts = async () => {
    try {
      setLoading(true);
      const data = await contactAPI.getContacts();
      setContacts(data);
      setFilteredContacts(data);
    } catch (error: any) {
      showSnackbar('Failed to load contacts', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = () => {
    setEditingContact(null);
    setFormOpen(true);
  };

  const handleEdit = (contact: Contact) => {
    setEditingContact(contact);
    setFormOpen(true);
  };

  const handleSave = async (contactData: Omit<Contact, '_id' | 'createdAt' | 'updatedAt'>) => {
    try {
      setSaving(true);
      if (editingContact?._id) {
        await contactAPI.updateContact(editingContact._id, contactData);
        showSnackbar('Contact updated successfully', 'success');
      } else {
        await contactAPI.createContact(contactData);
        showSnackbar('Contact created successfully', 'success');
      }
      setFormOpen(false);
      setEditingContact(null);
      loadContacts();
    } catch (error: any) {
      showSnackbar(error.message || 'Failed to save contact', 'error');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this contact?')) {
      return;
    }

    try {
      await contactAPI.deleteContact(id);
      showSnackbar('Contact deleted successfully', 'success');
      loadContacts();
    } catch (error: any) {
      showSnackbar('Failed to delete contact', 'error');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const showSnackbar = (message: string, severity: 'success' | 'error') => {
    setSnackbar({ open: true, message, severity });
  };

  // Import/Export handlers
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);

  const handleExport = async () => {
    try {
      const csv = await contactAPI.exportToCSV();
      const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'contacts_export.csv';
      a.click();
      URL.revokeObjectURL(url);
      showSnackbar('Contacts exported', 'success');
    } catch (error: any) {
      showSnackbar('Export failed', 'error');
    }
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const text = await file.text();
      const res = await contactAPI.importFromCSV(text);
      showSnackbar(`Imported ${res.imported} contacts, skipped ${res.skipped}`, 'success');
      loadContacts();
    } catch (err: any) {
      showSnackbar(err.message || 'Import failed', 'error');
    } finally {
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  // Reminder check
  const checkReminders = async () => {
    try {
      const now = Date.now();
      const contactsToNotify = contacts.filter((c) => c.reminder).filter((c) => {
        try {
          const t = new Date(c.reminder!).getTime();
          // notify if within past minute or next minute
          return Math.abs(t - now) < 70 * 1000;
        } catch { return false; }
      });

      if (contactsToNotify.length === 0) return;

      // Request notification permission if needed
      if ('Notification' in window && Notification.permission !== 'granted') {
        await Notification.requestPermission();
      }

      for (const c of contactsToNotify) {
        if ('Notification' in window && Notification.permission === 'granted') {
          new Notification(`Reminder: ${c.name}`, { body: c.notes || 'Follow up with contact' });
        } else {
          showSnackbar(`Reminder: ${c.name}`, 'success');
        }
      }
    } catch (err) {
      // ignore
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  return (
    <Box sx={{ flexGrow: 1, minHeight: '100vh', bgcolor: 'background.default' }}>
      <AppBar 
        position="static" 
        elevation={0}
        sx={{ 
          bgcolor: 'white',
          color: 'text.primary',
          borderBottom: '1px solid #e8eaed',
        }}
      >
        <Toolbar sx={{ px: { xs: 2, sm: 3 } }}>
          <Typography 
            variant="h6" 
            component="div" 
            sx={{ 
              flexGrow: 1,
              fontWeight: 500,
              fontSize: '1.25rem',
            }}
          >
            Contact Manager
          </Typography>
          <Typography 
            variant="body2" 
            sx={{ 
              mr: 2,
              display: { xs: 'none', sm: 'block' },
              color: 'text.secondary',
            }}
          >
            {user?.username}
          </Typography>
          <IconButton 
            color="inherit" 
            onClick={handleLogout}
            sx={{
              '&:hover': {
                bgcolor: 'action.hover',
              },
            }}
          >
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg" sx={{ mt: 4, mb: 4, px: { xs: 2, sm: 3 } }}>
        <Box 
          display="flex" 
          justifyContent="space-between" 
          alignItems="center" 
          mb={3}
          flexWrap="wrap"
          gap={2}
        >
          <Typography 
            variant="h4" 
            component="h1"
            sx={{
              fontWeight: 400,
              color: 'text.primary',
            }}
          >
            My Contacts
            {contacts.length > 0 && (
              <Typography 
                component="span" 
                variant="body2" 
                sx={{ 
                  ml: 2,
                  color: 'text.secondary',
                  fontWeight: 400,
                }}
              >
                ({contacts.length} {contacts.length === 1 ? 'contact' : 'contacts'})
              </Typography>
            )}
          </Typography>
          <Box display="flex" gap={1} alignItems="center">
            <FormControl size="small" sx={{ minWidth: 140 }}>
              <InputLabel id="sort-mode-label">Sort</InputLabel>
              <Select
                labelId="sort-mode-label"
                value={sortMode}
                label="Sort"
                onChange={(e) => setSortMode(e.target.value as 'alpha' | 'recent')}
              >
                <MenuItem value="alpha">Alphabetical</MenuItem>
                <MenuItem value="recent">Recently added</MenuItem>
              </Select>
            </FormControl>

            <Tooltip title="Export CSV">
              <IconButton color="primary" onClick={handleExport}>
                <DownloadIcon />
              </IconButton>
            </Tooltip>

            <Tooltip title="Import CSV">
              <IconButton color="primary" onClick={handleImportClick}>
                <UploadFileIcon />
              </IconButton>
            </Tooltip>

            <input
              ref={fileInputRef}
              type="file"
              accept="text/csv"
              style={{ display: 'none' }}
              onChange={handleFileChange}
            />

            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleAdd}
              sx={{
                bgcolor: 'primary.main',
                '&:hover': {
                  bgcolor: 'primary.dark',
                },
              }}
            >
              Add Contact
            </Button>
          </Box>
        </Box>

        <SearchBar value={searchTerm} onChange={setSearchTerm} />

        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" minHeight="400px">
            <CircularProgress />
          </Box>
        ) : filteredContacts.length === 0 ? (
          <Paper 
            sx={{ 
              p: 6, 
              textAlign: 'center',
              borderRadius: '12px',
              bgcolor: 'background.paper',
            }}
          >
            <Typography variant="h6" color="text.secondary" gutterBottom>
              {searchTerm ? 'No contacts found' : 'No contacts yet'}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 1, mb: 3 }}>
              {searchTerm 
                ? 'Try adjusting your search terms' 
                : 'Get started by adding your first contact!'}
            </Typography>
            {!searchTerm && (
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={handleAdd}
              >
                Add Your First Contact
              </Button>
            )}
          </Paper>
        ) : (
          <Grid container spacing={3}>
            {filteredContacts.map((contact) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={contact._id}>
                <ContactCard
                  contact={contact}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>

      <ContactForm
        open={formOpen}
        onClose={() => {
          setFormOpen(false);
          setEditingContact(null);
        }}
        onSave={handleSave}
        contact={editingContact}
        loading={saving}
      />

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Contacts;
