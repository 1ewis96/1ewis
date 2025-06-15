import guideExample from '../../../example/guides/guide-example.json';

export default function handler(req, res) {
  const { slug } = req.query;
  
  // In a real app, you would fetch from a database or CMS
  // For now, we'll use the example data
  const guideData = guideExample.guide;
  
  // Check if the requested slug matches our example guide
  if (slug === guideData.slug || slug === 'bitcoin-beginners-guide') {
    res.status(200).json({ guide: guideData });
  } else {
    res.status(404).json({ message: 'Guide not found' });
  }
}
