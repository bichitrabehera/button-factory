import Inventory from '../models/Inventory.js';

// Get all inventory items (admin only)
export const getInventory = async (req, res) => {
  try {
    const inventory = await Inventory.find().populate('product', 'name');
    res.json(inventory);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update stock count for a product (admin only)
export const updateStock = async (req, res) => {
  try {
    const { stockCount } = req.body;
    const inventoryItem = await Inventory.findOne({ product: req.params.productId });
    if (!inventoryItem) {
      const newInventory = new Inventory({
        product: req.params.productId,
        stockCount,
      });
      await newInventory.save();
      return res.status(201).json(newInventory);
    }
    inventoryItem.stockCount = stockCount;
    inventoryItem.updatedAt = Date.now();
    await inventoryItem.save();
    res.json(inventoryItem);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
