const Product = require('../models/productModel')
const Review = require('../models/reviewModel')

// createreview

const createReview = async (req, res) => {
  try {
    const { productId, rating, comment } = req.body;
    const userId = req.user.id; 

    if (!productId || !rating) {
      return res.status(400).json({ error: 'Product ID and rating are required' });
    }

    const existingReview = await Review.findOne({ productId, userId });
    if (existingReview) {
      return res.status(400).json({ error: 'You have already reviewed this product' });
    }

    const review = new Review({
      userId,
      productId,
      rating,
      comment
    });

    await review.save();

    res.status(201).json({ message: 'Review submitted successfully', review });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error while submitting review' });
  }
};

//get all reviews of a prodcut
const getProductReviews = async (req, res) => {
  try {
    const { productId } = req.params;

    const reviews = await Review.find({ productId }).populate('userId', 'name');

    res.status(200).json({ reviews });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error while fetching reviews' });
  }
};


const updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, comment } = req.body;

    const review = await Review.findById(id);
    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }

    review.rating = rating;
    review.comment = comment;

    await review.save();

    res.status(200).json({ message: 'Review updated', review });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Server error' });
  }
};

//delete review
const deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ error: "Review not found" });
    }

    if (review.userId.toString() !== req.user.id) {
      return res.status(403).json({ error: "Unauthorized action" });
    }

    await Review.findByIdAndDelete(req.params.id)
    
    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


module.exports = {createReview,getProductReviews, updateReview, deleteReview}