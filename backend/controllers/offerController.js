import Offer from '../models/Offer.js';

// Get all offers (admin only)
export const getOffers = async (req, res) => {
  try {
    const offers = await Offer.find();
    res.json(offers);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Create new offer (admin only)
export const createOffer = async (req, res) => {
  try {
    const { code, description, discountPercent, validFrom, validTo } = req.body;
    const offer = new Offer({
      code,
      description,
      discountPercent,
      validFrom,
      validTo,
    });
    await offer.save();
    res.status(201).json(offer);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update offer (admin only)
export const updateOffer = async (req, res) => {
  try {
    const offer = await Offer.findById(req.params.id);
    if (!offer) return res.status(404).json({ message: 'Offer not found' });

    const { code, description, discountPercent, validFrom, validTo } = req.body;
    offer.code = code || offer.code;
    offer.description = description || offer.description;
    offer.discountPercent = discountPercent || offer.discountPercent;
    offer.validFrom = validFrom || offer.validFrom;
    offer.validTo = validTo || offer.validTo;

    await offer.save();
    res.json(offer);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete offer (admin only)
export const deleteOffer = async (req, res) => {
  try {
    const offer = await Offer.findByIdAndDelete(req.params.id);
    if (!offer) return res.status(404).json({ message: 'Offer not found' });
    res.json({ message: 'Offer deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
