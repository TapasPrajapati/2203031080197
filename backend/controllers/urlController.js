const Url = require('../models/url');
const shortid = require('shortid');

const shortenUrl = async (req, res) => {
  try {
    const { originalUrl } = req.body;
    if (!originalUrl) {
      return res.status(400).json({ error: 'Original URL is required' });
    }

    const url = new Url({
      originalUrl,
      shortId: shortid.generate()
    });

    await url.save();
    
    res.json({
      originalUrl: url.originalUrl,
      shortUrl: `${req.protocol}://${req.get('host')}/${url.shortId}`,
      shortId: url.shortId
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

const redirectUrl = async (req, res) => {
  try {
    const { shortId } = req.params;
    const url = await Url.findOneAndUpdate(
      { shortId },
      { $inc: { clicks: 1 } }
    );

    if (!url) {
      return res.status(404).json({ error: 'URL not found' });
    }

    res.redirect(url.originalUrl);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

const getAllUrls = async (req, res) => {
  try {
    const urls = await Url.find().sort({ createdAt: -1 });
    res.json(urls);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

const getUrlStats = async (req, res) => {
  try {
    const { shortId } = req.params;
    const url = await Url.findOne({ shortId });
    
    if (!url) {
      return res.status(404).json({ error: 'URL not found' });
    }
    
    res.json(url);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = {
  shortenUrl,
  redirectUrl,
  getAllUrls,
  getUrlStats
};