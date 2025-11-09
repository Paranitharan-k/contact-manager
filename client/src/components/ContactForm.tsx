import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Grid,
  Box,
  Avatar,
  IconButton,
  Typography,
  Divider,
} from '@mui/material';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import DeleteIcon from '@mui/icons-material/Delete';
import { Contact } from '../services/localStorage';

interface ContactFormProps {
  open: boolean;
  onClose: () => void;
  onSave: (contact: Omit<Contact, '_id' | 'createdAt' | 'updatedAt'>) => void;
  contact?: Contact | null;
  loading?: boolean;
}

const ContactForm: React.FC<ContactFormProps> = ({
  open,
  onClose,
  contact,
  onSave,
  loading = false,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    company: '',
    notes: '',
    tags: '', // comma-separated
    reminder: '', // ISO string or empty
    avatar: '',
  });
  const [avatarPreview, setAvatarPreview] = useState<string>('');
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (contact) {
      setFormData({
        name: contact.name || '',
        email: contact.email || '',
        phone: contact.phone || '',
        address: contact.address || '',
        company: contact.company || '',
        notes: contact.notes || '',
        tags: (contact.tags || []).join(', '),
        reminder: contact.reminder ? contact.reminder : '',
        avatar: contact.avatar || '',
      });
      setAvatarPreview(contact.avatar || '');
    } else {
      setFormData({
        name: '',
        email: '',
        phone: '',
        address: '',
        company: '',
        notes: '',
        tags: '',
        reminder: '',
        avatar: '',
      });
      setAvatarPreview('');
    }
  }, [contact, open]);

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size should be less than 5MB');
        return;
      }

      // Convert to base64
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setFormData({
          ...formData,
          avatar: base64String,
        });
        setAvatarPreview(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setFormData({
      ...formData,
      avatar: '',
    });
    setAvatarPreview('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      return;
    }
    const payload: any = {
      ...formData,
      tags: formData.tags ? formData.tags.split(',').map((t) => t.trim()).filter(Boolean) : undefined,
      reminder: formData.reminder ? new Date(formData.reminder).toISOString() : null,
    };

    onSave(payload);
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose} 
      maxWidth="sm" 
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: '16px',
        },
      }}
    >
      <form onSubmit={handleSubmit}>
        <DialogTitle sx={{ pb: 1, fontSize: '1.5rem', fontWeight: 400 }}>
          {contact ? 'Edit Contact' : 'Create New Contact'}
        </DialogTitle>
        <Divider />
        <DialogContent sx={{ pt: 3 }}>
          {/* Avatar Upload Section */}
          <Box display="flex" justifyContent="center" mb={3}>
            <Box position="relative">
              <Avatar
                src={avatarPreview}
                sx={{
                  width: 120,
                  height: 120,
                  bgcolor: 'primary.main',
                  fontSize: '3rem',
                  border: '4px solid #e8eaed',
                }}
              >
                {!avatarPreview && formData.name && getInitials(formData.name)}
                {!avatarPreview && !formData.name && '?'}
              </Avatar>
              <input
                ref={fileInputRef}
                accept="image/*"
                style={{ display: 'none' }}
                id="avatar-upload"
                type="file"
                onChange={handleImageUpload}
              />
              <label htmlFor="avatar-upload">
                <IconButton
                  color="primary"
                  component="span"
                  sx={{
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    bgcolor: 'white',
                    border: '2px solid #e8eaed',
                    '&:hover': {
                      bgcolor: '#f8f9fa',
                    },
                  }}
                >
                  <PhotoCameraIcon />
                </IconButton>
              </label>
              {avatarPreview && (
                <IconButton
                  color="error"
                  onClick={handleRemoveImage}
                  sx={{
                    position: 'absolute',
                    top: 0,
                    right: 0,
                    bgcolor: 'white',
                    border: '2px solid #e8eaed',
                    '&:hover': {
                      bgcolor: '#f8f9fa',
                    },
                  }}
                >
                  <DeleteIcon fontSize="small" />
                </IconButton>
              )}
            </Box>
          </Box>
          <Typography variant="body2" color="text.secondary" textAlign="center" mb={3}>
            Click the camera icon to upload a profile picture
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                variant="outlined"
                autoFocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Avatar URL (optional)"
                name="avatar"
                value={formData.avatar.startsWith('data:') ? '' : formData.avatar}
                onChange={handleChange}
                variant="outlined"
                placeholder="Or enter image URL"
                disabled={!!avatarPreview}
                helperText={avatarPreview ? 'Remove uploaded image to use URL' : ''}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Notes"
                name="notes"
                multiline
                rows={3}
                value={formData.notes}
                onChange={handleChange}
                variant="outlined"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Tags (comma separated)"
                name="tags"
                value={formData.tags}
                onChange={handleChange}
                variant="outlined"
                placeholder="e.g. Family, Friends, Business"
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Reminder"
                name="reminder"
                type="datetime-local"
                value={formData.reminder}
                onChange={handleChange}
                variant="outlined"
                InputLabelProps={{ shrink: true }}
                helperText="Optional reminder for follow-ups or birthdays"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <Divider />
        <DialogActions sx={{ p: 2, gap: 1 }}>
          <Button onClick={onClose} disabled={loading} variant="outlined">
            Cancel
          </Button>
          <Button 
            type="submit" 
            variant="contained" 
            disabled={loading || !formData.name.trim()}
            sx={{ minWidth: '100px' }}
          >
            {loading ? 'Saving...' : contact ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ContactForm;
