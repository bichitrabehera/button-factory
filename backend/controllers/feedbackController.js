import Feedback from '../models/Feedback.js';

// Get all feedback (admin only)
export const getFeedbacks = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().populate('user', 'name email');
    res.json(feedbacks);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Create new feedback
export const createFeedback = async (req, res) => {
  try {
    const { message } = req.body;
    const feedback = new Feedback({
      user: req.user ? req.user._id : null,
      message,
    });
    await feedback.save();
    res.status(201).json(feedback);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete feedback (admin only)
export const deleteFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.findByIdAndDelete(req.params.id);
    if (!feedback) return res.status(404).json({ message: 'Feedback not found' });
    res.json({ message: 'Feedback deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
