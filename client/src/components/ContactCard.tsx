import React from 'react';
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  IconButton,
  Avatar,
  Box,
  Tooltip,
  Chip,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';

import LocationOnIcon from '@mui/icons-material/LocationOn';
import { Contact } from '../services/localStorage';

interface ContactCardProps {
  contact: Contact;
  onEdit: (contact: Contact) => void;
  onDelete: (id: string) => void;
}

const ContactCard: React.FC<ContactCardProps> = ({ contact, onEdit, onDelete }) => {
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const getAvatarColor = (name: string) => {
    const colors = [
      '#1a73e8', '#ea4335', '#fbbc04', '#34a853', '#9c27b0',
      '#ff9800', '#00bcd4', '#e91e63', '#607d8b', '#795548'
    ];
    const index = name.charCodeAt(0) % colors.length;
    return colors[index];
  };

  return (
    <Card 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        borderRadius: '12px',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          background: `linear-gradient(135deg, ${getAvatarColor(contact.name)}22 0%, ${getAvatarColor(contact.name)}11 100%)`,
          p: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar
          src={contact.avatar}
          sx={{ 
            width: 80, 
            height: 80, 
            bgcolor: getAvatarColor(contact.name),
            fontSize: '2rem',
            border: '3px solid white',
            boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
            mb: 2,
          }}
        >
          {!contact.avatar && getInitials(contact.name)}
        </Avatar>
        <Typography 
          variant="h6" 
          component="div" 
          sx={{ 
            fontWeight: 500,
            textAlign: 'center',
            mb: 0.5,
          }}
        >
          {contact.name}
        </Typography>
        {contact.company && (
          <Chip
            label={contact.company}
            size="small"
            sx={{
              mt: 1,
              bgcolor: 'white',
              fontWeight: 500,
            }}
          />
        )}
      </Box>
      
      <CardContent sx={{ flexGrow: 1, pt: 2 }}>
        {/* Tags */}
        {contact.tags && contact.tags.length > 0 && (
          <Box display="flex" gap={1} flexWrap="wrap" mb={1}>
            {contact.tags.map((t) => (
              <Chip key={t} label={t} size="small" />
            ))}
          </Box>
        )}
        {contact.email && (
          <Box display="flex" alignItems="center" mb={1.5}>
            <EmailIcon sx={{ mr: 1.5, fontSize: 20, color: 'text.secondary' }} />
            <Typography 
              variant="body2" 
              color="text.secondary"
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {contact.email}
            </Typography>
          </Box>
        )}
        {contact.phone && (
          <Box display="flex" alignItems="center" mb={1.5}>
            <PhoneIcon sx={{ mr: 1.5, fontSize: 20, color: 'text.secondary' }} />
            <Typography variant="body2" color="text.secondary">
              {contact.phone}
            </Typography>
          </Box>
        )}
        {contact.address && (
          <Box display="flex" alignItems="flex-start" mb={1.5}>
            <LocationOnIcon sx={{ mr: 1.5, fontSize: 20, color: 'text.secondary', mt: 0.25 }} />
            <Typography 
              variant="body2" 
              color="text.secondary"
              sx={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
              }}
            >
              {contact.address}
            </Typography>
          </Box>
        )}
        {contact.notes && (
          <Box mt={2}>
            <Typography 
              variant="caption" 
              color="text.secondary"
              sx={{
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
                fontStyle: 'italic',
              }}
            >
              {contact.notes}
            </Typography>
          </Box>
        )}
        {/* Reminder */}
        {contact.reminder && (
          <Box mt={2}>
            <Typography variant="caption" color="text.secondary" sx={{ fontStyle: 'italic' }}>
              Reminder: {new Date(contact.reminder).toLocaleString()}
            </Typography>
          </Box>
        )}
      </CardContent>
      
      <CardActions sx={{ justifyContent: 'flex-end', p: 1.5, pt: 0 }}>
        <Tooltip title="Edit Contact">
          <IconButton
            color="primary"
            onClick={() => onEdit(contact)}
            aria-label="edit contact"
            sx={{
              '&:hover': {
                bgcolor: 'primary.light',
                color: 'white',
              },
            }}
          >
            <EditIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Delete Contact">
          <IconButton
            color="error"
            onClick={() => contact._id && onDelete(contact._id)}
            aria-label="delete contact"
            sx={{
              '&:hover': {
                bgcolor: 'error.dark',
                color: 'white',
              },
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
};

export default ContactCard;
