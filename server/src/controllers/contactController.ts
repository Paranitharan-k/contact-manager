import { Response } from 'express';
import Contact from '../models/Contact';
import { AuthRequest } from '../middleware/auth';

export const getContacts = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!._id;
    const contacts = await Contact.find({ userId }).sort({ name: 1 });
    res.json(contacts);
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Server error' });
  }
};

export const getContact = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!._id;
    const contact = await Contact.findOne({ _id: req.params.id, userId });

    if (!contact) {
      res.status(404).json({ message: 'Contact not found' });
      return;
    }

    res.json(contact);
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Server error' });
  }
};

export const createContact = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!._id;
    const { name, email, phone, address, company, notes, avatar, tags, reminder } = req.body;

    if (!name) {
      res.status(400).json({ message: 'Name is required' });
      return;
    }

    // Duplicate prevention: same email OR same name+phone
    const duplicate = await Contact.findOne({
      userId,
      $or: [
        email ? { email: email.toLowerCase() } : null,
        (name && phone) ? { $and: [{ name }, { phone }] } : null,
      ].filter(Boolean) as any,
    });
    if (duplicate) {
      res.status(400).json({ message: 'A contact with same email or same name+phone already exists' });
      return;
    }

    const contact = new Contact({
      userId,
      name,
      email,
      phone,
      address,
      company,
      notes,
      avatar,
      tags,
      reminder: reminder ? new Date(reminder) : undefined,
    });

    await contact.save();
    res.status(201).json(contact);
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Server error' });
  }
};

export const updateContact = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!._id;
    const { name, email, phone, address, company, notes, avatar, tags, reminder } = req.body;

    const contact = await Contact.findOne({ _id: req.params.id, userId });

    if (!contact) {
      res.status(404).json({ message: 'Contact not found' });
      return;
    }

    // Duplicate prevention if updating email or name+phone
    const newEmail = email !== undefined ? email : contact.email;
    const newName = name !== undefined ? name : contact.name;
    const newPhone = phone !== undefined ? phone : contact.phone;
    const duplicate = await Contact.findOne({
      userId,
      _id: { $ne: contact._id },
      $or: [
        newEmail ? { email: newEmail.toLowerCase() } : null,
        (newName && newPhone) ? { $and: [{ name: newName }, { phone: newPhone }] } : null,
      ].filter(Boolean) as any,
    });
    if (duplicate) {
      res.status(400).json({ message: 'Update would create a duplicate contact (email or name+phone)' });
      return;
    }

    if (name) contact.name = name;
    if (email !== undefined) contact.email = email;
    if (phone !== undefined) contact.phone = phone;
    if (address !== undefined) contact.address = address;
    if (company !== undefined) contact.company = company;
    if (notes !== undefined) contact.notes = notes;
    if (avatar !== undefined) contact.avatar = avatar;
    if (tags !== undefined) contact.tags = tags;
    if (reminder !== undefined) contact.reminder = reminder ? new Date(reminder) : undefined;

    await contact.save();
    res.json(contact);
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Server error' });
  }
};

export const deleteContact = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    const userId = req.user!._id;
    const contact = await Contact.findOne({ _id: req.params.id, userId });

    if (!contact) {
      res.status(404).json({ message: 'Contact not found' });
      return;
    }

    await Contact.deleteOne({ _id: req.params.id, userId });
    res.json({ message: 'Contact deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Server error' });
  }
};
